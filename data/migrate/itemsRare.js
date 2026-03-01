export const itemsRare = [
	// --- ERLESENE RÜSTUNG (Rare / Blau) ---
	{
		slug: 'zwergenstahl_haubert',
		name: { de: 'Zwergenstahl-Haubert', en: 'Dwarven Steel Hauberk' },
		type: 'armor',
		rarity: 'rare',
		description: { 
			de: 'Ein Kettenhemd aus einer speziellen zwergischen Legierung. Es ist leichter als Eisen und bricht fast nie.', 
			en: 'A chainmail shirt made from a special dwarven alloy. It is lighter than iron and almost never breaks.' 
		},
		value: 850,
		stats: { weight: 8.0, armor: 8, damage_reduction_physical: 2, durability_infinite: true }
	},
	{
		slug: 'umhang_der_schattenwacht',
		name: { de: 'Umhang der Schattenwacht', en: 'Cloak of the Shadow Watch' },
		type: 'armor',
		rarity: 'rare',
		description: { 
			de: 'Ein tiefschwarzer Umhang, der das Licht in seiner Umgebung förmlich zu schlucken scheint.', 
			en: 'A deep black cloak that seems to literally swallow the light around it.' 
		},
		value: 620,
		stats: { weight: 0.5, armor: 1, stealth_bonus: 5, shadow_res: 10 }
	},

	// --- MAGISCH BERÜHRTE WAFFEN (Rare / Blau) ---
	{
		slug: 'klinge_des_lichtbringers',
		name: { de: 'Klinge des Lichtbringers', en: 'Blade of the Lightbringer' },
		type: 'weapon',
		rarity: 'rare',
		description: { 
			de: 'Ein Kurzschwert, das in der Nähe von Dienern der Widersacher sanft blau leuchtet.', 
			en: 'A shortsword that glows faintly blue in the presence of servants of the adversaries.' 
		},
		value: 1200,
		stats: { weight: 1.0, damage: '1d6+5', weapon_type: 'schwerter', bonus_dmg_undead: 4, light_radius: 5 }
	},
	{
		slug: 'streitkolben_der_gerechten',
		name: { de: 'Streitkolben der Gerechten', en: 'Mace of the Righteous' },
		type: 'weapon',
		rarity: 'rare',
		description: { 
			de: 'Dieser schwere Streitkolben wurde im Namen Solans geweiht. Er zertrümmert nicht nur Knochen, sondern auch dunkle Magie.', 
			en: 'This heavy mace was consecrated in the name of Solan. It shatters not only bone but also dark magic.' 
		},
		value: 1150,
		stats: { weight: 3.5, damage: '1d8+4', weapon_type: 'hiebwaffen', stun_chance: 15, dispel_chance: 5 }
	},

	// --- STARKER KONSUM & ARTEFAKTE (Rare / Blau) ---
	{
		slug: 'elixier_des_mimirs',
		name: { de: 'Elixier des Mimirs', en: 'Mimir’s Elixir' },
		type: 'consumable',
		rarity: 'rare',
		description: { 
			de: 'Ein Gebräu, das den Geist öffnet. Es stellt Mana wieder her und schärft die Konzentration.', 
			en: 'A brew that opens the mind. It restores mana and sharpens concentration.' 
		},
		value: 250,
		stats: { weight: 0.2, mana_restore: 40, kl_buff: 2, duration_rounds: 10 }
	},
	{
		slug: 'amulett_des_gluecks',
		name: { de: 'Amulett des Glücks', en: 'Amulet of Luck' },
		type: 'trinket',
		rarity: 'rare',
		description: { 
			de: 'Ein silbernes Amulett mit einem eingelassenen Saphir. Mercuris scheint über den Träger zu wachen.', 
			en: 'A silver amulet with an embedded sapphire. Mercuris seems to watch over the wearer.' 
		},
		value: 950,
		stats: { weight: 0.1, loot_chance_bonus: 5, critical_hit_chance: 3 }
	},

	// --- WISSEN & LORE (Rare / Blau) ---
	{
		slug: 'runenbeschlagene_schatulle',
		name: { de: 'Runenbeschlagene Schatulle', en: 'Rune-Bound Casket' },
		type: 'lore',
		rarity: 'rare',
		description: { 
			de: 'Eine Schatulle, die sich nur mit Wissen über die alten Runen öffnen lässt. Sie enthält Fragmente verlorener Geschichte.', 
			en: 'A casket that can only be opened with knowledge of the old runes. It contains fragments of lost history.' 
		},
		value: 500,
		lore_trigger: 'mimir_secret_records',
		stats: { weight: 2.0 }
	}
];