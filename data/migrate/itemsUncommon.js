export const itemsUncommon = [
	// --- VERBESSERTE AUSRÜSTUNG (Uncommon / Grün) ---
	{
		slug: 'gehärteter_lederharnisch',
		name: { de: 'Gehärteter Lederharnisch', en: 'Hardened Leather Cuirass' },
		type: 'armor',
		rarity: 'uncommon',
		description: { 
			de: 'In kochendem Wachs und Öl gehärtetes Leder. Bietet bemerkenswerten Schutz, ohne die Beweglichkeit zu stark einzuschränken.', 
			en: 'Leather hardened in boiling wax and oil. Offers remarkable protection without restricting mobility too much.' 
		},
		value: 120,
		stats: { weight: 4.0, armor: 4, evasion_bonus: 1 }
	},
	{
		slug: 'verstärkte_armschienen',
		name: { de: 'Verstärkte Armschienen', en: 'Reinforced Bracers' },
		type: 'armor',
		rarity: 'uncommon',
		description: { 
			de: 'Lederarmschienen, die mit dünnen Stahlplatten verstärkt wurden. Ideal zum Abwehren von Hieben.', 
			en: 'Leather bracers reinforced with thin steel plates. Ideal for parrying strikes.' 
		},
		value: 65,
		stats: { weight: 1.0, armor: 2, parry_bonus: 1 }
	},

	// --- MEISTERHAFTE WAFFEN (Uncommon / Grün) ---
	{
		slug: 'geschärftes_langschwert',
		name: { de: 'Geschärftes Langschwert', en: 'Sharpened Longsword' },
		type: 'weapon',
		rarity: 'uncommon',
		description: { 
			de: 'Die Klinge wurde von einem fähigen Schmied feingeschliffen und liegt perfekt ausbalanciert in der Hand.', 
			en: 'The blade has been fine-honed by a skilled smith and is perfectly balanced in the hand.' 
		},
		value: 210,
		stats: { weight: 1.4, damage: '1d8+2', weapon_type: 'schwerter', accuracy_bonus: 1 }
	},
	{
		slug: 'eschenbogen_der_feynir',
		name: { de: 'Eschenbogen der Feynir', en: 'Feynir Ash Bow' },
		type: 'weapon',
		rarity: 'uncommon',
		description: { 
			de: 'Ein Langbogen aus dem biegsamen Holz der Feynir-Wälder. Seine Reichweite ist legendär unter Grenzläufern.', 
			en: 'A longbow made from the supple wood of the Feynir forests. Its range is legendary among rangers.' 
		},
		value: 185,
		stats: { weight: 0.8, damage: '1d6+3', weapon_type: 'bogen', range: 50 }
	},

	// --- ALCHEMIE & TRÄNKE (Uncommon / Grün) ---
	{
		slug: 'geringer_heiltrank',
		name: { de: 'Geringer Heiltrank', en: 'Lesser Healing Potion' },
		type: 'consumable',
		rarity: 'uncommon',
		description: { 
			de: 'Eine rot leuchtende Flüssigkeit, die nach Beeren und Eisen schmeckt. Schließt Fleischwunden fast augenblicklich.', 
			en: 'A glowing red liquid that tastes of berries and iron. Closes flesh wounds almost instantly.' 
		},
		value: 50,
		stats: { weight: 0.2, heal_amount: 15, instant: true }
	},
	{
		slug: 'wetzstein_des_gesellen',
		name: { de: 'Wetzstein des Gesellen', en: 'Journeyman’s Whetstone' },
		type: 'consumable',
		rarity: 'uncommon',
		description: { 
			de: 'Ein besonders feinkörniger Stein. Erhöht kurzzeitig die Schärfe einer Klinge.', 
			en: 'A particularly fine-grained stone. Briefly increases the sharpness of a blade.' 
		},
		value: 35,
		stats: { weight: 0.3, temp_dmg_buff: 2, duration_fights: 3 }
	},

	// --- BESONDERE WERKZEUGE ---
	{
		slug: 'hochwertiges_schlosserbesteck',
		name: { de: 'Hochwertiges Schlosserbesteck', en: 'High-Quality Lockpicks' },
		type: 'misc',
		rarity: 'uncommon',
		description: { 
			de: 'Gefertigt aus flexiblem Federstahl. Diese Werkzeuge biegen sich, wo andere brechen würden.', 
			en: 'Made of flexible spring steel. These tools bend where others would break.' 
		},
		value: 75,
		stats: { weight: 0.1, lockpicking_bonus: 3, durability: 5 }
	}
];