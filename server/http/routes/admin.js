/**
 * Admin Routen für Game Master
 */
export default function($bifrost, $db, $guildService) {

	// Middleware (Rune) simulieren oder prüfen
	async function checkAdmin($req, $res) {
		if (!$req.user) {
			$res.error('Nicht eingeloggt.', 401);
			return false;
		}

		const userDb = await $db('users').where({ id: $req.user.id }).first();
		if (!userDb || (userDb.role !== 'admin' && userDb.role !== 'moderator')) {
			$res.error('Zugriff verweigert.', 403);
			return false;
		}
		return true;
	}

	// Stats & World
	$bifrost.get('/api/admin/stats', async ($req, $res) => {
		if (!(await checkAdmin($req, $res))) return;

		try {
		        const usersCount = await $db('users').count('id as count').first();
		        const charsCount = await $db('characters').count('id as count').first();
		        const guildsCount = await $db('guilds').count('id as count').first();
		        const culturesCount = await $db('cultures').count('id as count').first();
		        const professionsCount = await $db('professions').count('id as count').first();

		        $res.json({
		                success: true,
		                data: {
		                        users: parseInt(usersCount.count),
		                        characters: parseInt(charsCount.count),
		                        guilds: parseInt(guildsCount.count),
		                        cultures: parseInt(culturesCount.count),
		                        professions: parseInt(professionsCount.count),
		                        uptime: process.uptime(),
		                        memory: process.memoryUsage()
		                }
		        });

		} catch ($err) {
			console.error($err);
			$res.error('Fehler beim Laden der Stats.', 500);
		}
	});

	// Users
	$bifrost.get('/api/admin/users', async ($req, $res) => {
		if (!(await checkAdmin($req, $res))) return;

		try {
			const users = await $db('users').select('id', 'username', 'legacy_name', 'role', 'email', 'created_at');
			$res.json({ success: true, data: users });
		} catch ($err) {
			console.error($err);
			$res.error('Fehler beim Laden der Benutzer.', 500);
		}
	});

	$bifrost.post('/api/admin/users/role', async ($req, $res) => {
		if (!(await checkAdmin($req, $res))) return;

		const { userId, role } = $req.body;
		if (!userId || !role) return $res.error('Fehlende Daten.', 400);

		try {
			await $db('users').where('id', userId).update({ role });
			$res.json({ success: true, message: 'Rolle aktualisiert.' });
		} catch ($err) {
			console.error($err);
			$res.error('Fehler beim Ändern der Rolle.', 500);
		}
	});

	// Characters
	$bifrost.get('/api/admin/characters', async ($req, $res) => {
		if (!(await checkAdmin($req, $res))) return;

		try {
			const characters = await $db('characters')
				.join('users', 'characters.user_id', 'users.id')
				.select('characters.*', 'users.username as owner_name');
			$res.json({ success: true, data: characters });
		} catch ($err) {
			console.error($err);
			$res.error('Fehler beim Laden der Charaktere.', 500);
		}
	});

	$bifrost.delete('/api/admin/characters/:uuid', async ($req, $res) => {
		if (!(await checkAdmin($req, $res))) return;

		const { uuid } = $req.params;
		try {
			await $db('characters').where({ uuid }).del();
			$res.json({ success: true, message: 'Charakter gelöscht.' });
		} catch ($err) {
			console.error($err);
			$res.error('Fehler beim Löschen des Charakters.', 500);
		}
	});

	// Guilds
	$bifrost.get('/api/admin/guilds', async ($req, $res) => {
		if (!(await checkAdmin($req, $res))) return;

		try {
			const guilds = await $guildService.getGuilds();
			$res.json({ success: true, data: guilds });
		} catch ($err) {
			console.error($err);
			$res.error('Fehler beim Laden der Gilden.', 500);
		}
	});

	$bifrost.post('/api/admin/guilds', async ($req, $res) => {
		if (!(await checkAdmin($req, $res))) return;

		const { name, tag } = $req.body;
		if (!name || !tag) return $res.error('Fehlende Daten.', 400);

		try {
			const newGuild = await $guildService.createGuild(name, tag);
			$res.json({ success: true, data: newGuild });
		} catch ($err) {
			console.error($err);
			$res.error('Fehler beim Erstellen der Gilde.', 500);
		}
	});

	$bifrost.delete('/api/admin/guilds/:id', async ($req, $res) => {
		if (!(await checkAdmin($req, $res))) return;

		const { id } = $req.params;
		if (!id) return $res.error('Fehlende Gilden-ID.', 400);

		try {
			await $guildService.deleteGuild(id);
			$res.json({ success: true, message: 'Gilde gelöscht.' });
		} catch ($err) {
			console.error($err);
			$res.error('Fehler beim Löschen der Gilde.', 500);
		}
	});

	// Database
	$bifrost.get('/api/admin/database/tables', async ($req, $res) => {
		if (!(await checkAdmin($req, $res))) return;

		try {
			const tables = [
				'users', 'characters', 'guilds', 'guild_members', 'items', 'npcs', 'quests', 'skills', 'character_skills',
				'professions', 'cultures', 'pantheon', 'adversaries', 'organizations'
			];
			const stats = [];

			for (const table of tables) {
				const count = await $db(table).count('id as count').first();
				stats.push({ name: table, rows: parseInt(count.count) });
			}

			$res.json({ success: true, data: stats });
		} catch ($err) {
			console.error($err);
			$res.error('Fehler beim Laden der Tabellen-Stats.', 500);
		}
	});

	$bifrost.get('/api/admin/database/table/:name', async ($req, $res) => {
		if (!(await checkAdmin($req, $res))) return;

		const { name } = $req.params;
		const allowedTables = [
			'users', 'characters', 'guilds', 'guild_members', 'items', 'npcs', 'quests', 'skills', 'character_skills',
			'professions', 'cultures', 'pantheon', 'adversaries', 'organizations'
		];
		
		if (!allowedTables.includes(name)) {
			return $res.error('Tabelle nicht erlaubt.', 400);
		}

		try {
			const rows = await $db(name).select('*').limit(100);
			$res.json({ success: true, data: rows });
		} catch ($err) {
			console.error($err);
			$res.error(`Fehler beim Laden der Tabelle ${name}.`, 500);
		}
	});
}
