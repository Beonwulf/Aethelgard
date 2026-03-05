import 'dotenv/config';
import knex from 'knex';

const db = knex({
	client: 'pg',
	connection: {
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME,
		port: process.env.DB_PORT || 5432
	}
});

const tables = [
	'pantheon', 'adversaries', 'users', 'organizations', 'characters',
	'items', 'inventory', 'skills', 'cultures', 'professions',
	'character_skills', 'character_taints', 'character_buffs',
	'character_reputation', 'world_state', 'quests', 'character_quests',
	'guilds', 'guild_members', 'npcs', 'loot_pools', 'loot_pool_items'
];

async function checkDatabase() {
	try {
		console.log('🔍 Überprüfe den Datenbank-Status von Aethelgard...');
		let missingTables = [];
		
		for (const table of tables) {
			const exists = await db.schema.hasTable(table);
			if (exists) {
				const count = await db(table).count('* as count').first();
				console.log(`✅ Tabelle '${table}': ${count.count} Einträge`);
			} else {
				console.log(`❌ Tabelle '${table}': FEHLT!`);
				missingTables.push(table);
			}
		}

		if (missingTables.length > 0) {
			console.log('⚠️ Warnung: Es fehlen Tabellen. Du solltest womöglich die Migration (npm run infra:migrate) ausführen.');
		} else {
			console.log('✨ Alle Struktur-Tabellen sind vorhanden.');
		}

	} catch (err) {
		console.error('❌ Fehler beim Prüfen der Datenbank:', err);
	} finally {
		db.destroy();
	}
}

checkDatabase();
