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

async function debugTable() {
	try {
		const columnInfo = await db('professions').columnInfo();
		console.log('Spalten in professions:', Object.keys(columnInfo));
	} catch (err) {
		console.error('Fehler:', err);
	} finally {
		db.destroy();
	}
}

debugTable();
