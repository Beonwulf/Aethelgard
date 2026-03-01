export const npcsLegends = [
	// --- DIE LICHTBRINGER (Helden der Ordnung) ---
	{
		slug: 'hochkoenig_alaric',
		name: { de: 'Hochkönig Alaric der Standhafte', en: 'High King Alaric the Steadfast' },
		faction_slug: 'kaiserreich_aethelgard',
		type: 'questgiver',
		base_stats: { 
			hp: 850, 
			atk: 35, 
			def: 50, 
			level: 50,
			special: 'solans_shield_aura' // Erhöht Verteidigung von Verbündeten
		},
		loot_pool_slug: 'royal_armory',
		description: { de: 'Der Herrscher über das Zentralreich. Er trägt den legendären Sonnenschild.', en: 'Ruler of the central realm. He wields the legendary Sun Shield.' }
	},
	{
		slug: 'erzbischof_valerius',
		name: { de: 'Erzbischof Valerius', en: 'Archbishop Valerius' },
		faction_slug: 'sonnen_konvent',
		type: 'boss', // Kann je nach Entscheidung des Spielers zum Gegner werden
		base_stats: { 
			hp: 600, 
			mp: 300, 
			atk: 20, 
			def: 30, 
			level: 45,
			divine_favor: 25 
		},
		loot_pool_slug: 'convent_relics',
		description: { de: 'Oberhaupt des Sonnen-Konvents. Er sieht in Magie den Keim des Wahnsinns.', en: 'Head of the Sun Convent. He sees the seeds of madness in magic.' }
	},
	{
		slug: 'jarl_ragnhild',
		name: { de: 'Jarl Ragnhild Sturmbringer', en: 'Jarl Ragnhild Stormbringer' },
		faction_slug: 'die_freien_fjorde',
		type: 'questgiver',
		base_stats: { 
			hp: 750, 
			atk: 45, 
			def: 35, 
			level: 48,
			resistance_frost: 100 
		},
		loot_pool_slug: 'nordfolk_legendary',
		description: { de: 'Herrin von Fjordheim. Sie einte die Stämme gegen die Frostkönigin.', en: 'Lady of Fjordheim. She united the tribes against the Frost Queen.' }
	},
	{
		slug: 'hochmagister_elion',
		name: { de: 'Hochmagister Elion', en: 'High Magister Elion' },
		faction_slug: 'silberne_akademie',
		type: 'merchant', // Verkauft High-End Zauber/Runen
		base_stats: { 
			hp: 350, 
			mp: 1500, 
			atk: 10, 
			def: 20, 
			level: 55 
		},
		loot_pool_slug: 'academy_treasures',
		description: { de: 'Rektor der Silbernen Akademie. Er misst die Thermische Resonanz des Weltenbrandes.', en: 'Rector of the Silver Academy. He measures the thermal resonance of the Worldfire.' }
	},

	// --- DIE GEZEICHNETEN (Agenten der Korruption) ---
	{
		slug: 'vargr_der_hungernde',
		name: { de: 'Vargr der Hungernde', en: 'Vargr the Hungry' },
		faction_slug: 'bestien_horden',
		type: 'boss',
		base_stats: { 
			hp: 1200, 
			atk: 60, 
			def: 25, 
			level: 42,
			taint_level: 85 
		},
		loot_pool_slug: 'fenrisul_gifts',
		description: { de: 'Ein einstiger Jäger, der nun die Bestien-Horden für Fenrisul anführt.', en: 'A former hunter who now leads the beast hordes for Fenrisul.' }
	},
	{
		slug: 'die_bleiche_lady',
		name: { de: 'Die Bleiche Lady (Slythara)', en: 'The Pale Lady (Slythara)' },
		faction_slug: 'zirkel_der_asche', // Oder eigene Fraktion 'frost_cult'
		type: 'boss',
		base_stats: { 
			hp: 900, 
			mp: 800, 
			atk: 30, 
			def: 40, 
			level: 52,
			taint_level: 70 
		},
		loot_pool_slug: 'hela_ka_artifacts',
		description: { de: 'Eine ehemalige Magierin, die ihr Herz gegen einen Splitter aus ewigem Eis tauschte.', en: 'A former mage who traded her heart for a shard of eternal ice.' }
	},

	// --- DIE SCHATTEN ---
	{
		slug: 'die_namenlose',
		name: { de: 'Die Namenlose', en: 'The Nameless One' },
		faction_slug: 'schattenhaende',
		type: 'questgiver',
		base_stats: { 
			hp: 400, 
			atk: 55, 
			def: 30, 
			level: 50,
			stealth: 100 
		},
		loot_pool_slug: 'shadow_hands_cache',
		description: { de: 'Anführerin der Schattenhände. Ihr Gesicht ist unter einer Kapuze aus lebendigem Schatten verborgen.', en: 'Leader of the Shadow Hands. Her face is hidden beneath a hood of living shadow.' }
	}
];