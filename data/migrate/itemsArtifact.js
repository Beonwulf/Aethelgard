export const itemsArtifact = [
	// --- VERDERBTE WAFFEN (Artifact / Orange) ---
	{
		slug: 'surtrs_splitter',
		name: { de: 'Surtrs Splitter', en: 'Shard of Surtr' },
		type: 'weapon',
		rarity: 'artifact',
		description: { 
			de: 'Ein glühendes Fragment der Klinge des Feuerriesen. Es brennt sich durch Stahl und Fleisch gleichermaßen, doch die Hitze zehrt am Verstand des Trägers.', 
			en: 'A glowing fragment of the Fire Giant\'s blade. It burns through steel and flesh alike, but the heat gnaws at the wielder\'s sanity.' 
		},
		value: 40000,
		stats: { 
			weight: 3.0, 
			damage: '4d12+20', 
			weapon_type: 'zweihänder', 
			fire_penetration: 50,
			special_effect: 'immolate_on_crit' 
		},
		taint_source: 'surtr',
		taint_effects: { 
			corruption_per_swing: 1, 
			max_hp_reduction: -10,
			fire_vulnerability: 20 
		},
		lore_trigger: 'surtr_awakening'
	},
	{
		slug: 'hela_kas_kuss',
		name: { de: 'Hela-Kas Kuss', en: 'Hela-Ka’s Kiss' },
		type: 'weapon',
		rarity: 'artifact',
		description: { 
			de: 'Ein Dolch aus schwarzem Eis, das niemals schmilzt. Jede Wunde, die er schlägt, entzieht dem Opfer die Lebenskraft und speist den Träger – doch die Seele wird dabei kalt und leer.', 
			en: 'A dagger of black ice that never melts. Every wound it inflicts drains the victim\'s life force and feeds the wielder – but the soul becomes cold and empty.' 
		},
		value: 35000,
		stats: { 
			weight: 0.4, 
			damage: '2d6+15', 
			weapon_type: 'dolche', 
			lifesteal_percent: 25,
			freeze_chance: 20 
		},
		taint_source: 'hela_ka',
		taint_effects: { 
			corruption_per_kill: 5, 
			empathy_loss: -10, // Beeinflusst CH-Proben positiv (Einschüchterung) / negativ (Diplomatie)
			frost_touch: true 
		}
	},

	// --- GEFÄHRLICHE RELIKTE (Artifact / Orange) ---
	{
		slug: 'das_leere_buch',
		name: { de: 'Das Leere Buch', en: 'The Empty Tome' },
		type: 'trinket',
		rarity: 'artifact',
		description: { 
			de: 'Ein Buch ohne Seiten. Wer hineinstarrt, sieht die Leere zwischen den Welten. Es verleiht unendliches Wissen, fordert aber Erinnerungen als Tribut.', 
			en: 'A book without pages. Whoever stares into it sees the void between worlds. It grants infinite knowledge but demands memories as tribute.' 
		},
		value: 55000,
		stats: { 
			weight: 2.5, 
			kl_bonus: 15, 
			mana_pool_bonus: 100,
			spell_echo_chance: 30 
		},
		taint_source: 'vorthos',
		taint_effects: { 
			random_skill_loss_chance: 1, // Chance, XP in einem zufälligen Skill zu verlieren
			insanity_gain: 5 
		},
		lore_trigger: 'void_whispers'
	},

	// --- INSTABILE RÜSTUNG ---
	{
		slug: 'mantel_des_weltenbrandes',
		name: { de: 'Mantel des Weltenbrandes', en: 'Cloak of the Worldfire' },
		type: 'armor',
		rarity: 'artifact',
		description: { 
			de: 'Fetzen eines Banners, das während der Kernschmelze verbrannte. Es schützt vor Magie, indem es sie einfach verzehrt.', 
			en: 'Tatters of a banner that burned during the meltdown. It protects against magic by simply consuming it.' 
		},
		value: 48000,
		stats: { 
			weight: 1.0, 
			magic_resistance: 75, 
			reflect_spell_chance: 15 
		},
		taint_source: 'surtr',
		taint_effects: { 
			burn_nearby_allies: true, // Schadet NPCs/Gefährten in der Nähe
			corruption_over_time: 2 
		}
	}
];