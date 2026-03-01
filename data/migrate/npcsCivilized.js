export const npcsCivilized = [
	// --- OAKHAVEN (Kaiserreich Kernland) ---
	{
		slug: 'wirt_barnabas',
		name: { de: 'Wirt Barnabas', en: 'Innkeeper Barnabas' },
		faction_slug: 'kaiserreich_aethelgard',
		type: 'merchant',
		base_stats: { 
			level: 10, hp: 120, atk: 5, def: 5 
		},
		loot_pool_slug: 'common_food_drink',
		description: { 
			de: 'Besitzer der Taverne "Zum schlafenden Eber". Er weiß mehr über die Schattenhände, als er zugibt.', 
			en: 'Owner of the "Sleeping Boar" tavern. He knows more about the Shadow Hands than he lets on.' 
		}
	},
	{
		slug: 'schmied_haldor',
		name: { de: 'Meisterschmied Haldor', en: 'Master Smith Haldor' },
		faction_slug: 'kaiserreich_aethelgard',
		type: 'merchant',
		base_stats: { 
			level: 25, hp: 300, atk: 25, def: 20 
		},
		loot_pool_slug: 'standard_weapons_armor',
		description: { 
			de: 'Ein kräftiger Mann, dessen Vorfahren schon für den Ersten Kaiser schmiedeten.', 
			en: 'A burly man whose ancestors already forged for the First Emperor.' 
		}
	},
	{
		slug: 'stadtwache_oakhaven',
		name: { de: 'Stadtwache von Oakhaven', en: 'Oakhaven City Guard' },
		faction_slug: 'kaiserreich_aethelgard',
		type: 'neutral',
		base_stats: { 
			level: 15, hp: 200, atk: 15, def: 15 
		},
		loot_pool_slug: 'guard_equipment',
		description: { 
			de: 'Ein pflichtbewusster Soldat in der polierten Rüstung des Sonnen-Konvents.', 
			en: 'A dutiful soldier in the polished armor of the Sun Convent.' 
		}
	},

	// --- FJORDHEIM (Nordlande) ---
	{
		slug: 'shamanin_skala',
		name: { de: 'Schamanin Skala', en: 'Shaman Skala' },
		faction_slug: 'die_freien_fjorde',
		type: 'questgiver',
		base_stats: { 
			level: 30, hp: 180, mp: 400, atk: 10, def: 10 
		},
		loot_pool_slug: 'herbalist_supplies',
		description: { 
			de: 'Eine weise Frau der Skjaldar, die die Zeichen im Eis deutet.', 
			en: 'A wise Skjaldar woman who interprets signs in the ice.' 
		}
	},

	// --- TIEFENFELS (Zwergenreich) ---
	{
		slug: 'zwergen_waechter',
		name: { de: 'Schildwache von Tiefenfels', en: 'Shield Guard of Deeprock' },
		faction_slug: 'tiefenreich_mimir',
		type: 'neutral',
		base_stats: { 
			level: 25, hp: 450, atk: 25, def: 40 
		},
		loot_pool_slug: 'dwarven_soldier_loot',
		description: { 
			de: 'Unbeugsam wie der Stein, den er bewacht.', 
			en: 'Unyielding as the stone he guards.' 
		}
	},

	// --- ALLGEMEINE REISENDE ---
	{
		slug: 'fahrender_haendler',
		name: { de: 'Fahrender Händler', en: 'Traveling Merchant' },
		faction_slug: 'suedbund',
		type: 'merchant',
		base_stats: { 
			level: 12, hp: 100, atk: 8, def: 5 
		},
		loot_pool_slug: 'random_exotic_goods',
		description: { 
			de: 'Er hat Waren aus ganz Aethelgard im Karren – und einige illegale Dinge unter dem Sitz.', 
			en: 'He has goods from all over Aethelgard in his cart – and some illegal things under the seat.' 
		}
	}
];