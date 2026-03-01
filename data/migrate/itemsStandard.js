export const itemsStandard = [
	// --- GRUNDAUSRÜSTUNG (Standard / Weiß) ---
	{
		slug: 'leinenhemd_einfach',
		name: { de: 'Einfaches Leinenhemd', en: 'Simple Linen Shirt' },
		type: 'armor',
		rarity: 'standard',
		description: { 
			de: 'Ein schlichtes Gewand aus grobem Leinen. Schützt kaum vor Schwertern, aber vor dem Wind.', 
			en: 'A simple garment made of coarse linen. Offers little protection against swords, but keeps out the wind.' 
		},
		value: 15,
		stats: { weight: 0.5, armor: 1 }
	},
	{
		slug: 'lederstiefel_reise',
		name: { de: 'Reiselederstiefel', en: 'Leather Traveling Boots' },
		type: 'armor',
		rarity: 'standard',
		description: { 
			de: 'Gut eingelaufene Stiefel für lange Märsche auf den Straßen des Kaiserreichs.', 
			en: 'Well-worn boots for long marches on the roads of the Empire.' 
		},
		value: 45,
		stats: { weight: 1.2, armor: 2 }
	},

	// --- NAHKAMPFWAFFEN (Standard / Weiß) ---
	{
		slug: 'eisendolch',
		name: { de: 'Eisendolch', en: 'Iron Dagger' },
		type: 'weapon',
		rarity: 'standard',
		description: { 
			de: 'Eine einfache Klinge aus gewöhnlichem Eisen. Funktional und verlässlich.', 
			en: 'A simple blade made of ordinary iron. Functional and reliable.' 
		},
		value: 80,
		stats: { weight: 0.5, damage: '1d4+1', weapon_type: 'dolche' }
	},
	{
		slug: 'knüppel_holz',
		name: { de: 'Holzknüppel', en: 'Wooden Club' },
		type: 'weapon',
		rarity: 'standard',
		description: { 
			de: 'Ein schweres Stück Hartholz. Nicht elegant, aber effektiv.', 
			en: 'A heavy piece of hardwood. Not elegant, but effective.' 
		},
		value: 10,
		stats: { weight: 2.0, damage: '1d6', weapon_type: 'hiebwaffen' }
	},

	// --- VERBRAUCHSGEGENSTÄNDE (Standard / Weiß) ---
	{
		slug: 'heilkräuter_bündel',
		name: { de: 'Bündel Heilkräuter', en: 'Bundle of Healing Herbs' },
		type: 'consumable',
		rarity: 'standard',
		description: { 
			de: 'Getrocknete Blätter, die helfen, leichte Wunden zu schließen.', 
			en: 'Dried leaves that help close minor wounds.' 
		},
		value: 20,
		stats: { weight: 0.1, heal_amount: 5 }
	},
	{
		slug: 'reiseration',
		name: { de: 'Reiseration', en: 'Travel Rations' },
		type: 'consumable',
		rarity: 'standard',
		description: { 
			de: 'Trockenfleisch, Käse und hartes Brot. Sättigend, aber geschmacklos.', 
			en: 'Dried meat, cheese, and hard bread. Filling, but tasteless.' 
		},
		value: 5,
		stats: { weight: 0.5, hunger_restore: 20 }
	},

	// --- WERKZEUG ---
	{
		slug: 'dietrich',
		name: { de: 'Dietrich', en: 'Lockpick' },
		type: 'misc',
		rarity: 'standard',
		description: { 
			de: 'Ein einfaches Werkzeug zum Öffnen von Schlössern. Bricht leicht bei unsachgemäßer Handhabung.', 
			en: 'A simple tool for picking locks. Breaks easily if handled improperly.' 
		},
		value: 15,
		stats: { weight: 0.05, lockpicking_bonus: 0 }
	}
];