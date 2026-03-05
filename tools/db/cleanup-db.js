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

async function clearOutdated() {
	try {
		console.log('🧹 Lösche veraltete Tabellen, um Platz für das neue Schema zu machen...');
		
		// Wir müssen character_skills zuerst löschen, da es einen Foreign Key auf skills hat
		await db.schema.dropTableIfExists('character_skills');
		await db.schema.dropTableIfExists('skills');
		await db.schema.dropTableIfExists('professions');
		await db.schema.dropTableIfExists('cultures');
		
		console.log('✅ Tabellen entfernt. Starte jetzt die frische Migration...');
	} catch (err) {
		console.error('❌ Fehler beim Aufräumen:', err);
	} finally {
		db.destroy();
	}
}

clearOutdated();
