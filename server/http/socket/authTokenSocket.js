import jwt from 'jsonwebtoken';


const SECRET_KEY =process.env.JWT_SECRET;


export function authTokenSocket(socket, next) {
	const token = socket.handshake.auth.token;

	try {
		const decoded = jwt.verify(token, SECRET_KEY);
		socket.userId = decoded.id; // Wir speichern die User-ID direkt am Socket
		next();
	} catch (err) {
		next(new Error("Zutritt verweigert: Ungültiges Siegel!"));
	}
}