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

async function runMigrations() {
	try {
		console.log('📜 Überprüfe Datenbank-Schema auf neue Erweiterungen...');
		
		// 1. Biography Spalte (alte Migration)
		const hasBioColumn = await db.schema.hasColumn('characters', 'biography');
		if (!hasBioColumn) {
			await db.schema.alterTable('characters', table => {
				table.jsonb('biography').defaultTo([]);
			});
			console.log('✅ Spalte "biography" erfolgreich zur Tabelle "characters" hinzugefügt.');
		}

		// 2. Vermächtnis (Legacy) für Accounts (Option B)
		const hasLegacyColumn = await db.schema.hasColumn('users', 'legacy_name');
		if (!hasLegacyColumn) {
			await db.schema.alterTable('users', table => {
				table.string('legacy_name').nullable().unique(); // Der Vermächtnisname ist einzigartig über alle Spieler hinweg
			});
			console.log('✅ Spalte "legacy_name" erfolgreich zur Tabelle "users" hinzugefügt.');
		}

		// 3. User Roles (Admin / GM Bereich)
		const hasRoleColumn = await db.schema.hasColumn('users', 'role');
		if (!hasRoleColumn) {
			await db.schema.alterTable('users', table => {
				table.string('role').defaultTo('player'); // player, moderator, admin
			});
			console.log('✅ Spalte "role" erfolgreich zur Tabelle "users" hinzugefügt.');
		}

		// 4. Guilds Tabelle
		const hasGuildsTable = await db.schema.hasTable('guilds');
		if (!hasGuildsTable) {
			await db.schema.createTable('guilds', table => {
				table.increments('id').primary();
				table.string('name').unique().notNullable();
				table.string('tag', 5).nullable();
				table.integer('leader_id').unsigned().references('id').inTable('characters').onDelete('SET NULL');
				table.timestamp('created_at').defaultTo(db.fn.now());
			});
			console.log('✅ Tabelle "guilds" erfolgreich erstellt.');
		}

		// 5. Guild Members Tabelle
		const hasGuildMembersTable = await db.schema.hasTable('guild_members');
		if (!hasGuildMembersTable) {
			await db.schema.createTable('guild_members', table => {
				table.integer('guild_id').unsigned().references('id').inTable('guilds').onDelete('CASCADE');
				table.integer('character_id').unsigned().references('id').inTable('characters').onDelete('CASCADE');
				table.string('guild_role').defaultTo('member'); // member, officer, master
				table.timestamp('joined_at').defaultTo(db.fn.now());
				table.primary(['guild_id', 'character_id']);
			});
			console.log('✅ Tabelle "guild_members" erfolgreich erstellt.');
		}

		console.log('✨ Alle Migrationen abgeschlossen.');

	} catch (err) {
		console.error('❌ Fehler beim Ändern der Tabelle:', err);
	} finally {
		db.destroy();
	}
}

runMigrations();
