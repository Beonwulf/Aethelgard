import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET;

// Hilfsfunktionen (ausgelagert aus der alten Rune)
async function parseBody($req) {
	return new Promise(($resolve) => {
		let body = '';
		$req.on('data', $chunk => body += $chunk.toString());
		$req.on('end', () => $resolve(JSON.parse(body || '{}')));
	});
}

function sendJSON($res, $data, $status = 200) {
	$res.writeHead($status, { 'Content-Type': 'application/json' });
	$res.end(JSON.stringify($data));
}

function validateUser($user) {
	return /^[a-zA-Z0-9]{3,16}$/.test($user);
}

function validateEmail($email) {
	if (!$email) return true;
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($email);
}

function validatePassword($pass) {
	return $pass && $pass.length >= 6;
}

export default function($bifrost, $db) {

	// 1. REGISTRIERUNG
	$bifrost.post('/api/register', async ($req, $res) => {
		let { username, password, email } = $req.body || await parseBody($req);
		const hashedPassword = await bcrypt.hash(password, 10);
		console.log('AuthRouter::register', username, email);

		if (!email) email = null;

		if (!username || username === '' || !password || password === '') {
			return sendJSON($res, { error: "login.err_empty" }, 201);
		}

		let error = null;
		if (!validateUser(username)) error = 'login.err_invalid_user';
		if (!validateEmail(email)) error = error ? error + ', login.err_invalid_email' : 'login.err_invalid_email';
		if (!validatePassword(password)) error = error ? error + ', login.err_invalid_pass' : 'login.err_invalid_pass';

		if (error !== null) {
			return sendJSON($res, { error: error }, 201);
		}

		try {
			await $db('users').insert({ username, password: hashedPassword, email });
			return sendJSON($res, { message: "login.msg_registered", success: true }, 201);
		} catch ($err) {
			return sendJSON($res, { error: "register.err_exists" }, 400);
		}
	});

	// 2. LOGIN
	$bifrost.post('/api/login', async ($req, $res) => {
		const { username, password } = $req.body || await parseBody($req);

		if (!username || username === '' || !password || password === '') {
			return sendJSON($res, { error: "login.err_empty" }, 201);
		}

		const user = await $db('users').where({ username }).first();

		if (user && await bcrypt.compare(password, user.password)) {
			// Token gültig für 100 Tage
			const token = jwt.sign({ id: user.uuid, name: user.username, role: user.role }, SECRET_KEY, { expiresIn: '2400h' });
			return sendJSON($res, { token: token, user: user.username, id: user.uuid, role: user.role });
		}
		return sendJSON($res, { error: "err_invalid" }, 401);
	});

	// 3. VALIDATE Token
	$bifrost.post('/api/auth/validate', async ($req, $res) => {
		const authHeader = $req.headers.authorization;
		const token = authHeader && authHeader.split(' ')[1];

		if (!token) return sendJSON($res, { valid: false }, 401);

		jwt.verify(token, SECRET_KEY, async ($err, $user) => {
			if ($err) return sendJSON($res, { valid: false }, 403);

			// NEU: Datenbank-Check! Prüfe, ob der User nach einem DB-Reset noch existiert.
			// ACHTUNG: Der Payload in login (oben) nutzt user.uuid als 'id' und user.username als 'name'.
			const userDb = await $db('users').where({ uuid: $user.id }).first();
			
			if (!userDb) {
				return sendJSON($res, { valid: false, error: 'User existiert nicht mehr' }, 401);
			}

			const payload = { id: userDb.uuid, name: userDb.username, role: userDb.role };
			const newToken = jwt.sign(payload, SECRET_KEY, { expiresIn: '2400h' });
			
			sendJSON($res, { valid: true, newToken: newToken, user: userDb.username, id: userDb.uuid, role: userDb.role });
		});
	});
}
