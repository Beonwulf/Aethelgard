export const npcsBeasts = [
	// --- WALD & WIESE (Startgebiete) ---
	{
		slug: 'grauwolf',
		name: { de: 'Grauwolf', en: 'Grey Wolf' },
		faction_slug: null,
		type: 'enemy',
		base_stats: { 
			level: 5, hp: 60, atk: 12, def: 5, speed: 15 
		},
		loot_pool_slug: 'beast_low_wolf', // Fell, Zähne
		description: { 
			de: 'Ein hungriger Jäger, der meist im Rudel angreift.', 
			en: 'A hungry hunter that usually attacks in packs.' 
		}
	},
	{
		slug: 'wildschwein',
		name: { de: 'Wildschwein', en: 'Wild Boar' },
		faction_slug: null,
		type: 'enemy',
		base_stats: { 
			level: 8, hp: 120, atk: 18, def: 12, speed: 10 
		},
		loot_pool_slug: 'beast_low_boar', // Fleisch, Borsten
		description: { 
			de: 'Ein aggressives Tier mit dicker Haut und gefährlichen Hauern.', 
			en: 'An aggressive animal with thick hide and dangerous tusks.' 
		}
	},

	// --- HOCHGEBIRGE & NORDLANDE (Härtere Fauna) ---
	{
		slug: 'hoehlenbaer',
		name: { de: 'Höhlenbär', en: 'Cave Bear' },
		faction_slug: null,
		type: 'enemy',
		base_stats: { 
			level: 20, hp: 450, atk: 35, def: 25, speed: 8 
		},
		loot_pool_slug: 'beast_mid_bear', // Bärenfell, Tatzen
		description: { 
			de: 'Ein massives Raubtier, das sein Revier verbissen verteidigt.', 
			en: 'A massive predator that fiercely defends its territory.' 
		}
	},
	{
		slug: 'schnee_leopard',
		name: { de: 'Schnee-Leopard', en: 'Snow Leopard' },
		faction_slug: null,
		type: 'enemy',
		base_stats: { 
			level: 18, hp: 220, atk: 40, def: 15, speed: 25 
		},
		loot_pool_slug: 'beast_mid_cat',
		description: { 
			de: 'Ein lautloser Jäger aus den Frostzahn-Bergen.', 
			en: 'A silent hunter from the Frostfang Mountains.' 
		}
	},

	// --- MYTHISCHE BESTIEN (Elite / Mini-Bosse) ---
	{
		slug: 'schatten_pirscher',
		name: { de: 'Schatten-Pirscher', en: 'Shadow Stalker' },
		faction_slug: null,
		type: 'elite',
		base_stats: { 
			level: 35, hp: 600, mp: 100, atk: 55, def: 30, speed: 30 
		},
		loot_pool_slug: 'beast_high_shadow', // Schattenessenz
		description: { 
			de: 'Ein Wesen, das halb aus Materie und halb aus Albtraum besteht.', 
			en: 'A creature made half of matter and half of nightmare.' 
		}
	},
	{
		slug: 'frost_wyrm_jungtier',
		name: { de: 'Frost-Wyrm Jungtier', en: 'Frost Wyrm Hatchling' },
		faction_slug: null,
		type: 'elite',
		base_stats: { 
			level: 40, hp: 850, mp: 250, atk: 70, def: 50, speed: 15 
		},
		loot_pool_slug: 'beast_high_dragon', // Drachenschuppen
		description: { 
			de: 'Selbst als Jungtier atmet diese Kreatur den eisigen Tod von Hela-Ka.', 
			en: 'Even as a hatchling, this creature breathes the icy death of Hela-Ka.' 
		}
	}
];