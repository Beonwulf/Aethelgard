export const itemsLegendary = [
	// --- GÖTTLICHE WAFFEN (Legendary / Gold) ---
	{
		slug: 'solans_gerechtigkeit',
		name: { de: 'Solans Gerechtigkeit', en: 'Solan’s Justice' },
		type: 'weapon',
		rarity: 'legendary',
		description: { 
			de: 'Das legendäre Großschwert des Ersten Vindicators. Die Klinge besteht aus purem Sonnenlicht, das in Gold gefasst wurde. Sie verbrennt das Unreine allein durch ihre Präsenz.', 
			en: 'The legendary greatsword of the First Vindicator. The blade consists of pure sunlight encased in gold. It burns the impure simply by its presence.' 
		},
		value: 25000,
		stats: { 
			weight: 6.0, 
			damage: '3d10+12', 
			weapon_type: 'zweihänder', 
			holy_dmg: 15,
			passive_effect: 'holy_radiance', // Schwächt Untote im Umkreis
			active_ability: 'judgment_of_the_sun' 
		},
		lore_trigger: 'legend_of_solan'
	},
	{
		slug: 'mercuris_würfel',
		name: { de: 'Die Schicksalswürfel des Mercuris', en: 'The Fate Dice of Mercuris' },
		type: 'trinket',
		rarity: 'legendary',
		description: { 
			de: 'Zwei Würfel aus unzerstörbarem Elfenbein. Wer sie wirft, fordert das Schicksal selbst heraus. Doch Mercuris liebt nur die Wagemutigen.', 
			en: 'Two dice made of indestructible ivory. He who throws them challenges fate itself. But Mercuris only loves the bold.' 
		},
		value: 18000,
		stats: { 
			weight: 0.1, 
			ge_bonus: 5,
			special_mechanic: 'fate_roll', // Chance auf automatischen Erfolg bei Proben
			crit_multiplier: 3.0
		},
		lore_trigger: 'mercuris_gambit'
	},

	// --- GÖTTLICHER SCHUTZ (Legendary / Gold) ---
	{
		slug: 'yldras_träne',
		name: { de: 'Yldras Träne', en: 'Yldra’s Tear' },
		type: 'armor',
		rarity: 'legendary',
		description: { 
			de: 'Ein Amulett, das einen Tropfen des Ur-Eises enthält. Es heißt, Yldra vergoss ihn, als der Weltenbrand die ersten Wälder fraß. Es schützt vor jeglicher Hitze.', 
			en: 'An amulet containing a drop of the primordial ice. It is said Yldra shed it when the Worldfire consumed the first forests. It protects against all heat.' 
		},
		value: 22000,
		stats: { 
			weight: 0.2, 
			fire_immunity: true, 
			frost_dmg_reflection: 20,
			auto_resurrect_cooldown: '24h' 
		}
	},
	{
		slug: 'mimirs_auge',
		name: { de: 'Mimirs Auge', en: 'Mimir’s Eye' },
		type: 'trinket',
		rarity: 'legendary',
		description: { 
			de: 'Ein Monokel aus einem geschliffenen Sternendiamanten. Es erlaubt dem Träger, die Fäden des Äthers zu sehen und die Gedanken anderer zu lesen.', 
			en: 'A monocle made from a cut star diamond. It allows the wearer to see the threads of the ether and read the thoughts of others.' 
		},
		value: 30000,
		stats: { 
			weight: 0.1, 
			kl_bonus: 10, 
			true_sight: true,
			mana_cost_reduction: 50 
		},
		lore_trigger: 'mimir_ascension'
	},

	// --- SYMBOL DER HERRSCHAFT ---
	{
		slug: 'krone_des_ersten_kaisers',
		name: { de: 'Krone des Ersten Kaisers', en: 'Crown of the First Emperor' },
		type: 'armor',
		rarity: 'legendary',
		description: { 
			de: 'Das Symbol der Einheit Aethelgards. Wer sie trägt, spricht mit der Autorität der Götter und dem Willen des Volkes.', 
			en: 'The symbol of Aethelgard’s unity. He who wears it speaks with the authority of the gods and the will of the people.' 
		},
		value: 50000,
		stats: { 
			weight: 2.0, 
			armor: 5, 
			ch_bonus: 12, 
			faction_reputation_gain_mult: 2.0,
			leadership_aura: true 
		}
	}
];