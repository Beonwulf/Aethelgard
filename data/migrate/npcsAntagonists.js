export const npcsAntagonists = [
	// --- DER ZIRKEL DER ASCHE (Diener von Surtr) ---
	{
		slug: 'asche_kultist',
		name: { de: 'Kultist des Zirkels', en: 'Circle Cultist' },
		faction_slug: 'zirkel_der_asche',
		type: 'enemy',
		base_stats: { 
			level: 15, hp: 180, mp: 100, atk: 22, def: 12, 
			resistances: { fire: 50 } 
		},
		loot_pool_slug: 'cultist_low_loot',
		description: { 
			de: 'Ein Fanatiker, der seinen Körper mit Brandnarben verziert hat.', 
			en: 'A fanatic who has decorated his body with burn scars.' 
		}
	},
	{
		slug: 'surtr_feuerbringer',
		name: { de: 'Surtr-Feuerbringer', en: 'Surtr Firebringer' },
		faction_slug: 'zirkel_der_asche',
		type: 'elite',
		base_stats: { 
			level: 30, hp: 550, mp: 300, atk: 45, def: 30,
			abilities: ['fireball', 'immolate']
		},
		loot_pool_slug: 'cultist_high_loot',
		description: { 
			de: 'Ein mächtiger Pyromant, dessen Augen wie glühende Kohlen leuchten.', 
			en: 'A powerful pyromancer whose eyes glow like burning coals.' 
		}
	},

	// --- DIE BESTIEN-HORDEN (Diener von Fenrisul) ---
	{
		slug: 'bestien_krieger',
		name: { de: 'Bestien-Krieger', en: 'Beast Warrior' },
		faction_slug: 'bestien_horden',
		type: 'enemy',
		base_stats: { 
			level: 22, hp: 350, atk: 38, def: 15, 
			taint_level: 20 
		},
		loot_pool_slug: 'beast_warrior_loot',
		description: { 
			de: 'Ein korrumpierter Nordmann, der halb Mensch, halb Wolf zu sein scheint.', 
			en: 'A corrupted Northman who seems to be half man, half wolf.' 
		}
	},

	// --- DIE FROST-GEZEICHNETEN (Diener von Hela-Ka) ---
	{
		slug: 'frost_untoter',
		name: { de: 'Frost-Eisiger Wiedergänger', en: 'Frost-Iced Revenant' },
		faction_slug: null, // Sie dienen Hela-Ka direkt
		type: 'enemy',
		base_stats: { 
			level: 25, hp: 400, atk: 30, def: 40, 
			resistances: { frost: 100, fire: -50 } 
		},
		loot_pool_slug: 'undead_frost_loot',
		description: { 
			de: 'Eine Leiche, die durch das Eisherz der Frostkönigin animiert wurde.', 
			en: 'A corpse animated by the ice heart of the Frost Queen.' 
		}
	},

	// --- LEEREN-SCHERGEN (Diener von Xal-Atath / Vorthos) ---
	{
		slug: 'leeren_fluesperer',
		name: { de: 'Leeren-Flüsterer', en: 'Void Whisperer' },
		faction_slug: null,
		type: 'elite',
		base_stats: { 
			level: 40, hp: 450, mp: 800, atk: 25, def: 20,
			abilities: ['mind_blast', 'void_step'] 
		},
		loot_pool_slug: 'void_essence_loot',
		description: { 
			de: 'Ein Wesen ohne Gesicht, das Wahnsinn in die Köpfe der Sterblichen pflanzt.', 
			en: 'A faceless being that plants madness into the minds of mortals.' 
		}
	}
];