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

async function fixTables() {
	try {
		console.log('🛠️ Repariere Tabellen...');
		
		if (!await db.schema.hasColumn('professions', 'description')) {
			await db.schema.table('professions', table => {
				table.jsonb('description').nullable();
			});
			console.log('✅ Spalte "description" zu "professions" hinzugefügt.');
		}

		if (!await db.schema.hasColumn('cultures', 'description')) {
			await db.schema.table('cultures', table => {
				table.jsonb('description').nullable();
			});
			console.log('✅ Spalte "description" zu "cultures" hinzugefügt.');
		}

	} catch (err) {
		console.error('❌ Fehler beim Reparieren:', err);
	} finally {
		db.destroy();
	}
}

fixTables();
