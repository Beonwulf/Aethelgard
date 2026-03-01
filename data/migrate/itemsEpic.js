export const itemsEpic = [
	// --- HEROISCHE RÜSTUNG (Epic / Lila) ---
	{
		slug: 'panzer_des_sonnen_vindicators',
		name: { de: 'Plattenpanzer des Sonnen-Vindicators', en: 'Plate of the Sun Vindicator' },
		type: 'armor',
		rarity: 'epic',
		description: { 
			de: 'Dieser goldglänzende Harnisch wurde in den heiligen Schmieden von Solanspracht gefertigt. Er strahlt eine Aura der Unbeugsamkeit aus.', 
			en: 'This golden-shining armor was crafted in the holy forges of Solanspracht. It radiates an aura of indomitability.' 
		},
		value: 4500,
		stats: { 
			weight: 15.0, 
			armor: 15, 
			mu_bonus: 3, 
			fire_res: 25,
			ability_aura_bravery: true // Verbündete in der Nähe erhalten MU+2
		},
		lore_trigger: 'solan_vindicators_history'
	},
	{
		slug: 'gewand_des_aether_webers',
		name: { de: 'Gewand des Äther-Webers', en: 'Garb of the Ether Weaver' },
		type: 'armor',
		rarity: 'epic',
		description: { 
			de: 'Ein seidiges Gewand, das aus reinem, verfestigtem Mana gewebt zu sein scheint. Es vibriert vor magischer Energie.', 
			en: 'A silky garment that seems woven from pure, solidified mana. It vibrates with magical energy.' 
		},
		value: 3800,
		stats: { 
			weight: 1.0, 
			armor: 3, 
			mana_regen_bonus: 5, 
			kl_bonus: 4,
			spell_cooldown_reduction: 15 
		}
	},

	// --- LEGENDÄRE KAMPFGERÄTE (Epic / Lila) ---
	{
		slug: 'sturmbringer_axt',
		name: { de: 'Sturmbringer-Axt', en: 'Stormbringer Axe' },
		type: 'weapon',
		rarity: 'epic',
		description: { 
			de: 'Die Axt von Jarl Ragnhild. Blaue Blitze zucken über die Schneide, sobald sie aus der Scheide gezogen wird.', 
			en: 'The axe of Jarl Ragnhild. Blue lightning flickers across the blade as soon as it is unsheathed.' 
		},
		value: 5200,
		stats: { 
			weight: 4.5, 
			damage: '2d8+6', 
			weapon_type: 'hiebwaffen', 
			bonus_dmg_lightning: 8,
			on_hit_chain_lightning_chance: 10 
		},
		lore_trigger: 'ragnhild_stormbringer_legend'
	},
	{
		slug: 'schattenlied_bogen',
		name: { de: 'Schattenlied-Langbogen', en: 'Shadowsong Longbow' },
		type: 'weapon',
		rarity: 'epic',
		description: { 
			de: 'Ein Bogen aus schwarzem Eibenholz, dessen Sehne beim Abschuss einen klagenden Ton von sich gibt.', 
			en: 'A bow made of black yew wood, whose string emits a wailing sound when fired.' 
		},
		value: 4900,
		stats: { 
			weight: 1.2, 
			damage: '1d10+8', 
			weapon_type: 'bogen', 
			in_bonus: 3,
			ignore_armor_percent: 20 
		}
	},

	// --- MÄCHTIGE ARTEFAKTE (Epic / Lila) ---
	{
		slug: 'herz_des_wintersturms',
		name: { de: 'Herz des Wintersturms', en: 'Heart of the Winterstorm' },
		type: 'trinket',
		rarity: 'epic',
		description: { 
			de: 'Ein ewig kalter Saphir, in dem ein winziger Schneesturm tobt. Ein Relikt aus Yldras tiefstem Schlaf.', 
			en: 'An eternally cold sapphire in which a tiny blizzard rages. A relic from Yldra\'s deepest sleep.' 
		},
		value: 6000,
		stats: { 
			weight: 0.2, 
			frost_res: 50, 
			on_being_hit_freeze_attacker_chance: 5,
			mana_pool_bonus: 25 
		}
	},
	{
		slug: 'zepter_der_dominanz',
		name: { de: 'Zepter der Dominanz', en: 'Scepter of Dominance' },
		type: 'weapon',
		rarity: 'epic',
		description: { 
			de: 'Ein Herrschaftssymbol aus dem alten Kaiserreich. Wer es führt, dem beugen sich die Schwachen.', 
			en: 'A symbol of rule from the old Empire. Those who wield it, the weak bow before them.' 
		},
		value: 7500,
		stats: { 
			weight: 2.0, 
			damage: '1d6+2', 
			ch_bonus: 5, 
			intimidation_bonus: 10,
			special_ability: 'command_weak_minded' 
		}
	}
];