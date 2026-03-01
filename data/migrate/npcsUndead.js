export const npcsUndead = [
	// --- KLASSISCHE GRABWÄCHTER (Physisch) ---
	{
		slug: 'skelett_krieger',
		name: { de: 'Skelett-Krieger', en: 'Skeleton Warrior' },
		faction_slug: null,
		type: 'enemy',
		base_stats: { 
			level: 12, hp: 100, atk: 20, def: 15, speed: 10,
			resistances: { piercing: 50, slashing: 20, bludgeoning: -30 } 
		},
		loot_pool_slug: 'undead_low_bones',
		description: { 
			de: 'Ein klapperndes Gerippe, das noch immer sein rostiges Schwert führt.', 
			en: 'A rattling skeleton still wielding its rusty sword.' 
		}
	},
	{
		slug: 'verrottender_zombie',
		name: { de: 'Verrottender Zombie', en: 'Decaying Zombie' },
		faction_slug: null,
		type: 'enemy',
		base_stats: { 
			level: 10, hp: 180, atk: 15, def: 5, speed: 5,
			taint_level: 10 // Wegen Nidhogg-Einfluss
		},
		loot_pool_slug: 'undead_low_flesh',
		description: { 
			de: 'Ein unermüdlicher Leichnam, angetrieben von dunkler Magie.', 
			en: 'A restless corpse driven by dark magic.' 
		}
	},

	// --- GEISTERWESEN (Ätherisch) ---
	{
		slug: 'ruheloser_geist',
		name: { de: 'Ruheloser Geist', en: 'Restless Spirit' },
		faction_slug: null,
		type: 'enemy',
		base_stats: { 
			level: 18, hp: 80, mp: 100, atk: 25, def: 0, speed: 20,
			resistances: { physical: 80, magic: -20 } 
		},
		loot_pool_slug: 'undead_mid_ectoplasm',
		description: { 
			de: 'Ein schwebendes Echo eines Verstorbenen, das die Wärme aus der Luft saugt.', 
			en: 'A floating echo of the deceased, draining the warmth from the air.' 
		}
	},

	// --- ELITE & VAMPIRE (Intelligent) ---
	{
		slug: 'blut_aristokrat',
		name: { de: 'Blut-Aristokrat', en: 'Blood Aristocrat' },
		faction_slug: 'zirkel_der_asche', // Vampire passen gut als geheime Unterwanderer des Adels
		type: 'elite',
		base_stats: { 
			level: 35, hp: 600, mp: 400, atk: 45, def: 30, speed: 25,
			abilities: ['life_drain', 'mist_form'] 
		},
		loot_pool_slug: 'vampire_high_loot',
		description: { 
			de: 'Ein eleganter, aber tödlicher Untoter, der nach dem Blut der Lebenden dürstet.', 
			en: 'An elegant but deadly undead, thirsting for the blood of the living.' 
		}
	},
	{
		slug: 'gruftlord',
		name: { de: 'Gruftlord von Mornir', en: 'Crypt Lord of Mornir' },
		faction_slug: null,
		type: 'boss',
		base_stats: { 
			level: 45, hp: 1500, mp: 300, atk: 60, def: 50, speed: 8 
		},
		loot_pool_slug: 'ancient_tomb_treasures',
		description: { 
			de: 'Ein uralter Wächter, der die Totenruhe eines vergessenen Königs schützt.', 
			en: 'An ancient guardian protecting the peace of a forgotten king.' 
		}
	}
];