import 'dotenv/config';
import pg from 'pg';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';


async function setup() {
	// 1. Passwort interaktiv abfragen
	const rl = readline.createInterface({ input, output });
	const rootName = await rl.question('🔑 Bitte das Namen von PG-Root eingeben: ');
	const rootPw = await rl.question('🔑 Bitte das PG-Root-Passwort eingeben: ');
	rl.close();


	const rootClient = new pg.Client({
		host: process.env.DB_HOST,
		port: process.env.DB_PORT || 5432,
		user: rootName,
		password: rootPw, // Das eingegebene Passwort nutzen
		// database: 'postgres'
	});

	try {
		await rootClient.connect();
		console.log('🐘 Verbindung zum Kern steht...');

		// 1. User anlegen
		const userCheck = await rootClient.query("SELECT 1 FROM pg_roles WHERE rolname=$1", [process.env.DB_USER]);
		if (userCheck.rowCount === 0) {
			await rootClient.query(`CREATE USER ${process.env.DB_USER} WITH PASSWORD '${process.env.DB_PASS}'`);
			console.log(`👤 User '${process.env.DB_USER}' erschaffen.`);
		}
		// 2. Datenbank anlegen
		const dbCheck = await rootClient.query("SELECT 1 FROM pg_database WHERE datname=$1", [process.env.DB_NAME]);
		if (dbCheck.rowCount === 0) {
			await rootClient.query(`CREATE DATABASE ${process.env.DB_NAME} OWNER ${process.env.DB_USER}`);
			console.log(`🧱 Datenbank '${process.env.DB_NAME}' gemauert.`);
			// 3. Rechte finalisieren
			await rootClient.query(`GRANT ALL PRIVILEGES ON DATABASE ${process.env.DB_NAME} TO ${process.env.DB_USER}`);

			console.log('✨ Infrastruktur steht! Client und Bifrost sind bereit.');
		}
	} catch (err) {
		console.error('❌ Zugriff verweigert:', err.message);
	} finally {
		await rootClient.end();
	}
}


setup();