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
    'loot_pool_items', 'loot_pools', 'npcs', 'guild_members', 'guilds',
    'character_quests', 'quests', 'world_state', 'character_reputation',
    'character_buffs', 'character_taints', 'character_skills', 'inventory',
    'items', 'characters', 'users', 'professions', 'cultures', 'skills',
    'adversaries', 'pantheon', 'organizations'
];

async function nuclearCleanup() {
	try {
		console.log('🚀 Starte vollständigen Datenbank-Reset für Aethelgard...');
		for (const table of tables) {
			await db.schema.dropTableIfExists(table);
			console.log(`  - ${table} entfernt.`);
		}
		console.log('✅ Datenbank ist leer. Starte jetzt die frische Migration...');
	} catch (err) {
		console.error('❌ Fehler beim Cleanup:', err);
	} finally {
		db.destroy();
	}
}

nuclearCleanup();
