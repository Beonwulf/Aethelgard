import 'dotenv/config';
import knex from 'knex';
import { cultures } from './data/migrate/cultures.js';
import { professions } from './data/migrate/professions.js';
import { skills } from './data/migrate/skills.js';
import { pantheon } from './data/migrate/pantheon.js';
import { adversaries } from './data/migrate/adversaries.js';
import { loreItems } from './data/migrate/loreItems.js';
import { itemsGrey } from './data/migrate/itemsGrey.js';
import { itemsStandard } from './data/migrate/itemsStandard.js';
import { itemsUncommon } from './data/migrate/itemsUncommon.js';
import { itemsRare } from './data/migrate/itemsRare.js';
import { itemsEpic } from './data/migrate/itemsEpic.js';
import { itemsLegendary } from './data/migrate/itemsLegendary.js';
import { itemsArtifact } from './data/migrate/itemsArtifact.js';
import { organizations } from './data/migrate/organizations.js';
import { npcsLegends } from './data/migrate/npcsLegends.js';
import { npcsCivilized } from './data/migrate/npcsCivilized.js';
import { npcsBeasts } from './data/migrate/npcsBeasts.js';
import { npcsAntagonists } from './data/migrate/npcsAntagonists.js';
import { npcsTrainers } from './data/migrate/npcsTrainers.js';


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

const seedData = {
	cultures,
	professions,
	skills,
	pantheon,
	adversaries,
	organizations,
	items: [
		...loreItems, ...itemsGrey, ...itemsStandard, ...itemsUncommon,
		...itemsRare, ...itemsEpic, ...itemsLegendary, ...itemsArtifact
	],
	npcs: [ ...npcsLegends, ...npcsCivilized, ...npcsBeasts, ...npcsAntagonists, ...npcsUndead, ...npcsTrainers ]
};


async function seedGameData(db) {
	console.log('🌱 Starte das Einsegnen der Welt-Daten von Aethelgard...');
	const clearTable = async () => {};
	const fillTable = async () => {};


	try {
		// Löschen in der richtigen Reihenfolge (Kinder zuerst)
		await db('items').del();
		await db('adversaries').del();
		await db('pantheon').del();
		await db('skills').del();
		await db('cultures').del();
		await db('professions').del();
		await db('organizations').del();
		await db('npcs').del();
		
		// Einfügen
		await db('pantheon').insert(seedData.pantheon);
		await db('adversaries').insert(seedData.adversaries);
		await db('professions').insert(seedData.professions);
		await db('cultures').insert(seedData.cultures);
		await db('skills').insert(seedData.skills);
		await db('items').insert(seedData.items);
		await db('organizations').insert(seedData.organizations);
		await db('npcs').insert(seedData.npcs);
	} catch (err) {
		console.error('❌ Fehler beim Seeden:', err);
	}
}

async function setupDatabase() {
	try {
		console.log('🐘 Kontaktiere die Postgres-Ebene...');

		// 1. PANTHEON (Muss früh existieren wegen Foreign Keys)
		if (!await db.schema.hasTable('pantheon')) {
			await db.schema.createTable('pantheon', table => {
				table.increments('id').primary();
				table.string('slug').unique().notNullable(); 
				table.jsonb('name').notNullable();        
				table.jsonb('title').notNullable();       
				table.jsonb('description').notNullable(); 
				table.string('aspect');                   
				table.jsonb('bonuses').defaultTo({});    
				table.string('color');                    
				table.timestamps(true, true);
			});
			console.log('✅ Tabelle "pantheon" geschmiedet.');
		}

		// 2. ADVERSARIES
		if (!await db.schema.hasTable('adversaries')) {
			await db.schema.createTable('adversaries', table => {
				table.increments('id').primary();
				table.string('slug').unique().notNullable();
				table.string('opposes_deity').references('slug').inTable('pantheon').onDelete('SET NULL');
				table.jsonb('name');
				table.jsonb('title');
				table.jsonb('description');
				table.jsonb('taint_gift');
				table.timestamps(true, true);
			});
			console.log('✅ Tabelle "adversaries" geschmiedet.');
		}

		// 3. USERS
		if (!await db.schema.hasTable('users')) {
			await db.schema.createTable('users', table => {
				table.increments('id').primary();
				table.uuid('uuid').defaultTo(db.raw('gen_random_uuid()')).unique();
				table.string('username').unique().notNullable();
				table.string('email').unique().nullable();
				table.string('password').notNullable();
				table.timestamps(true, true);
			});
			console.log('✅ Tabelle "users" geschmiedet.');
		}


		if (!await db.schema.hasTable('organizations')) {
			await db.schema.createTable('organizations', table => {
				table.increments('id').primary();
				table.string('slug').unique().notNullable();
				table.jsonb('name').notNullable();
				/* 'region', 'faction' (Götter/Neutral), 'enemy_faction' (Widersacher) */
				table.string('type').defaultTo('faction');
				table.string('leader').nullable();
				table.string('alignment').nullable();
				/* Verknüpfungen */
				table.string('associated_culture').nullable();	/* Optionaler Link zu Kulturen */
				table.string('associated_god').nullable();		/* Neu: Link zu den Göttern */
				table.string('associated_adversary').nullable();/* Neu: Link zu den Widersachern */
				table.jsonb('description').nullable();
				table.timestamps(true, true);
			});
			console.log('✅ Tabelle "organizations" (Fraktionen) geschmiedet.');
		}


		// 4. CHARACTERS
		if (!await db.schema.hasTable('characters')) {
			await db.schema.createTable('characters', table => {
				table.increments('id').primary();
				table.uuid('uuid').defaultTo(db.raw('gen_random_uuid()')).unique();
				table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
				table.string('name').unique().notNullable();
				table.integer('level').defaultTo(1);
				table.string('culture').nullable(); 
				table.string('profession').nullable(); 
				table.string('deity_slug').nullable(); // Verweis auf pantheon.slug
				table.integer('ap_total').defaultTo(0);
				table.integer('ap_used').defaultTo(0);
				table.jsonb('attributes').defaultTo({ MU: 8, KL: 8, IN: 8, CH: 8, FF: 8, GE: 8, KO: 8, KK: 8 });
				table.jsonb('derived_stats').defaultTo({ LeP: 30, Mana: 0, RS: 0, GS: 8 });
				table.string('energy_type').nullable();
				table.jsonb('position').defaultTo({ x: 0, y: 0, z: 0 });
				table.jsonb('rotation').defaultTo({ x: 0, y: 0, z: 0 });
				table.integer('taint_level').defaultTo(0); // NEU
				table.string('taint_slug').nullable();    // NEU
				table.timestamps(true, true);
			});
			console.log('✅ Tabelle "characters" geschmiedet.');
		}

		// 5. ITEMS
		if (!await db.schema.hasTable('items')) {
			await db.schema.createTable('items', table => {
				table.increments('id').primary();
				table.string('slug').unique().notNullable();
				table.jsonb('name');
				table.jsonb('description');
				// Typ-Kategorisierung
				// 'weapon', 'armor', 'consumable', 'lore', 'quest', 'valuable', 'misc'
				table.string('type').defaultTo('misc');
				// Seltenheit für den Loot-Algorithmus
				// 'common', 'uncommon', 'rare', 'epic', 'legendary', 'artifact'
				table.string('rarity').defaultTo('common');
				// Mechanische Werte
				table.jsonb('stats').defaultTo({}); // z.B. { dmg: '1d6', armor: 2, weight: 1.5 }
				// Lore-Trigger & Wissen (Wichtig für dein Codex-System)
				table.string('lore_trigger').nullable(); // Slug eines Eintrags in der Wissens-DB
				// Korruption & Taint
				table.string('taint_source').nullable(); // z.B. 'surtr'
				table.jsonb('taint_effects').nullable(); // z.B. { corruption_gain: 5, fire_res: -2 }
				table.integer('value').defaultTo(0); // Handelswert in Kupferstücken
				table.timestamps(true, true);
			});
			console.log('✅ Tabelle "items" mit Rarity & Lore-Supportgeschmiedet.');
		}

		// 6. INVENTORY
		if (!await db.schema.hasTable('inventory')) {
			await db.schema.createTable('inventory', table => {
				table.increments('id').primary();
				table.integer('character_id').unsigned().references('id').inTable('characters').onDelete('CASCADE');
				table.integer('item_id').unsigned().references('id').inTable('items').onDelete('CASCADE');
				table.integer('slot').nullable();
				table.integer('quantity').defaultTo(1);
				table.boolean('is_equipped').defaultTo(false);
				table.timestamps(true, true);
			});
			console.log('✅ Tabelle "inventory" geschmiedet.');
		}

		// 7. SKILLS
		if (!await db.schema.hasTable('skills')) {
			await db.schema.createTable('skills', table => {
				table.increments('id').primary();
				table.string('slug').unique().notNullable();
				table.jsonb('name'); // NEU: Lokalisiert
				table.string('category').defaultTo('talent');
				table.string('attr_check').defaultTo('MU/IN/GE');
				table.jsonb('description').nullable();
				table.timestamps(true, true);
			});
			console.log('✅ Tabelle "skills" erstellt.');
		}

		// 8. CULTURES
		if (!await db.schema.hasTable('cultures')) {
			await db.schema.createTable('cultures', table => {
				table.increments('id').primary();
				table.string('slug').unique().notNullable();
				table.jsonb('name'); // NEU
				table.jsonb('attr_mods').defaultTo({});
				table.jsonb('base_stats').defaultTo({ LeP: 30 });
				table.jsonb('description').nullable();
				table.timestamps(true, true);
			});
			console.log('✅ Tabelle "cultures" geschmiedet.');
		}

		// 9. PROFESSIONS
		if (!await db.schema.hasTable('professions')) {
			await db.schema.createTable('professions', table => {
				table.increments('id').primary();
				table.string('slug').unique().notNullable();
				table.jsonb('name'); // NEU
				table.string('energy_type').nullable();
				table.integer('energy_base').defaultTo(0);
				table.jsonb('attr_mods').defaultTo({});
				table.jsonb('start_skills').defaultTo({});
				table.jsonb('requirements').defaultTo({});
				table.jsonb('description').nullable();
				table.timestamps(true, true);
			});
			console.log('✅ Tabelle "professions" geschmiedet.');
		}

		// 10. CHARACTER_SKILLS (Muss nach Skills und Characters kommen)
		if (!await db.schema.hasTable('character_skills')) {
			await db.schema.createTable('character_skills', table => {
				table.increments('id').primary();
				table.integer('character_id').unsigned().references('id').inTable('characters').onDelete('CASCADE');
				table.integer('skill_id').unsigned().references('id').inTable('skills').onDelete('CASCADE');
				table.integer('value').defaultTo(0);
				table.timestamps(true, true);
			});
			console.log('✅ Tabelle "character_skills" geschmiedet.');
		}


		if (!await db.schema.hasTable('character_taints')) {
			await db.schema.createTable('character_taints', table => {
				table.increments('id').primary();
				table.integer('character_id').unsigned().references('id').inTable('characters').onDelete('CASCADE');
				table.string('adversary_slug').references('slug').inTable('adversaries');
				table.integer('level').defaultTo(1);
				table.jsonb('active_effects'); // Speichert, welche spezifischen Vor/Nachteile gerade wirken
				table.timestamps(true, true);
			});
			console.log('✅ Tabelle "character_taints" (Die dunklen Gaben) geschmiedet.');
		}


		if (!await db.schema.hasTable('character_buffs')) {
			await db.schema.createTable('character_buffs', table => {
				table.increments('id').primary();
				table.integer('character_id').unsigned().references('id').inTable('characters').onDelete('CASCADE');
				table.string('source_type'); // 'deity_blessing', 'potion', 'spell', 'adversary_curse'
				table.jsonb('effects');      // { attr_mods: { KK: 2 }, skill_mods: { schwerter: 1 } }
				table.timestamp('expires_at').nullable(); // Wann läuft der Effekt ab? (null = permanent)
				table.timestamps(true, true);
			});
			console.log('✅ Tabelle "character_buffs" (Segen & Flüche) geschmiedet.');
		}


		if (!await db.schema.hasTable('character_reputation')) {
			await db.schema.createTable('character_reputation', table => {
				table.increments('id').primary();
				table.integer('character_id').unsigned().references('id').inTable('characters').onDelete('CASCADE');
				table.string('faction_slug'); // 'solan_church', 'fenris_cult', 'dwarf_clans'
				table.integer('value').defaultTo(0); // -100 (Erzfeind) bis +100 (Heiliger)
				table.timestamps(true, true);
			});
			console.log('✅ Tabelle "character_reputation" (Ruf & Fraktionen) geschmiedet.');
		}


		if (!await db.schema.hasTable('world_state')) {
			await db.schema.createTable('world_state', table => {
				table.string('key').primary();
				table.jsonb('value').notNullable();
				table.timestamps(true, true);
			});
			console.log('✅ Tabelle "world_state" erstellt.');
		}


		if (!await db.schema.hasTable('quests')) {
			await db.schema.createTable('quests', table => {
				table.increments('id').primary();
				table.string('title').notNullable();
				table.text('description');
				table.jsonb('requirements').defaultTo({}); // { min_level: 5, pre_quest_id: 10 }
				table.jsonb('rewards').defaultTo({});      // { exp: 500, gold: 100, item_id: 5 }
				table.timestamps(true, true);
			});
			console.log('✅ Tabelle "quests" geschmiedet.');
		}


		if (!await db.schema.hasTable('character_quests')) {
			await db.schema.createTable('character_quests', table => {
				table.increments('id').primary();
				table.integer('character_id').unsigned().references('id').inTable('characters').onDelete('CASCADE');
				table.integer('quest_id').unsigned().references('id').inTable('quests').onDelete('CASCADE');
				table.string('status').defaultTo('active'); // active, completed, failed
				table.jsonb('progress').defaultTo({});      // { kills: 5, needed: 10 }
				table.timestamps(true, true);
			});
			console.log('✅ Tabelle "character_quests" geschmiedet.');
		}


		if (!await db.schema.hasTable('guilds')) {
			await db.schema.createTable('guilds', table => {
				table.increments('id').primary();
				table.string('name').unique().notNullable();
				table.string('tag', 5).unique().notNullable();
				table.string('slug').unique().notNullable();
				table.text('description').nullable();
				table.integer('leader_id').unsigned().references('id').inTable('characters').onDelete('SET NULL');
				table.timestamps(true, true);
			});
			console.log('✅ Tabelle "guilds" geschmiedet.');
		}


		if (!await db.schema.hasTable('guild_members')) {
			await db.schema.createTable('guild_members', table => {
				table.increments('id').primary();
				table.integer('guild_id').unsigned().references('id').inTable('guilds').onDelete('CASCADE');
				table.integer('character_id').unsigned().references('id').inTable('characters').onDelete('CASCADE');
				table.string('rank').defaultTo('member'); // 'leader', 'officer', 'member'
				table.timestamps(true, true);
			});
			console.log('✅ Tabelle "guild_members" geschmiedet.');
		}


		if (!await db.schema.hasTable('npcs')) {
			await db.schema.createTable('npcs', table => {
				table.increments('id').primary();
				table.string('slug').unique().notNullable();
				table.jsonb('name');
				table.string('faction_slug').nullable();
				table.string('type').defaultTo('neutral'); // 'boss', 'enemy', 'merchant', 'questgiver', 'trainer'
				table.jsonb('base_stats');
				table.jsonb('description').nullable();
				table.string('loot_pool_slug').nullable();
				// Trainer-spezifische Felder
				table.jsonb('location').nullable();          // { name, tile, world: {x,y,z} }
				table.jsonb('teaches').nullable();           // ['schwerter', 'hiebwaffen']
				table.integer('max_teach_level').nullable();
				table.jsonb('cost_per_level').nullable();    // { '1': 0, '2': 50, ... }
				table.string('intro_quest').nullable();
				table.integer('min_level_required').defaultTo(0);
				table.timestamps(true, true);
			});
			console.log('✅ Tabelle "npcs" für die Bewohner Aethelgards erstellt.');
		} else {
			// Trainer-Spalten nachrüsten falls Tabelle schon existiert
			const hasLocation = await db.schema.hasColumn('npcs', 'location');
			if (!hasLocation) {
				await db.schema.alterTable('npcs', table => {
					table.jsonb('location').nullable();
					table.jsonb('teaches').nullable();
					table.integer('max_teach_level').nullable();
					table.jsonb('cost_per_level').nullable();
					table.string('intro_quest').nullable();
					table.integer('min_level_required').defaultTo(0);
				});
				console.log('✅ Trainer-Spalten zur "npcs"-Tabelle nachgerüstet.');
			}
		}


		if (!await db.schema.hasTable('loot_pools')) {
			await db.schema.createTable('loot_pools', table => {
				table.increments('id').primary();
				table.string('slug').unique().notNullable();
				table.jsonb('items').notNullable(); // Speichert das Array mit Chancen und Mengen
				table.string('description').nullable();
			});
			console.log('✅ Tabelle "loot_pools" geschmiedet.');
		}


		if (!await db.schema.hasTable('loot_pool_items')) {
			await db.schema.createTable('loot_pool_items', table => {
				table.increments('id').primary();
				table.integer('loot_pool_id').references('id').inTable('loot_pools').onDelete('CASCADE');
				table.integer('item_id').references('id').inTable('items').onDelete('CASCADE');
				// Chance in Prozent (0.01 bis 100.00)
				table.decimal('drop_chance', 5, 2).defaultTo(100.00);
				table.integer('min_quantity').defaultTo(1);
				table.integer('max_quantity').defaultTo(1);
			});
			console.log('✅ Loot-Pool-System erfolgreich integriert.');
		}


		// Seeden der Daten
		await seedGameData(db);

		console.log('✨ Aethelgard ist bereit für seine ersten Helden!');
		process.exit(0);
	} catch (err) {
		console.error('❌ Fehler beim Schmieden der Datenbank:', err);
		process.exit(1);
	}
}

setupDatabase();