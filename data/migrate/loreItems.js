export const loreItems = [
	{
		slug: 'verkohlte_chronik',
		name: { de: 'Verkohlte Chronik von Oakhaven', en: 'Charred Chronicle of Oakhaven' },
		type: 'lore', // Typ 'lore' für Dokumente/Codex-Freischaltungen
		rarity: 'uncommon',
		description: { 
			de: 'Die Ränder sind zu schwarzem Glas geschmolzen. Man kann noch lesen: "...die Hitze kam nicht von oben, sie stieg aus den Schatten empor. Die Brunnen begannen zu singen, bevor sie verdampften."', 
			en: 'The edges are melted into black glass. You can still read: "...the heat did not come from above, it rose from the shadows. The wells began to sing before they evaporated."' 
		},
		lore_trigger: 'surtr_myth_1',
		value: 15, // Sammlerwert
		stats: { weight: 0.5 }
	},
	{
		slug: 'instabile_runenscherbe',
		name: { de: 'Instabile Runenscherbe', en: 'Unstable Rune Shard' },
		type: 'artifact', // Hochwertiger Typ
		rarity: 'rare',
		description: { 
			de: 'Ein Splitter eines Mimir-Obelisken. Er pulsiert in einem unnatürlichen Orange. Wenn man ihn ans Ohr hält, hört man das Knistern eines unendlichen Feuers.', 
			en: 'A shard of a Mimir obelisk. It pulses in an unnatural orange. Holding it to your ear, you hear the crackling of an infinite fire.' 
		},
		lore_trigger: 'mimir_lost_runes',
		value: 150,
		// Hier nutzen wir 'stats' für den Schaden-Effekt
		stats: { 
			weight: 0.1,
			on_touch_damage: 1, 
			damage_type: 'fire' 
		},
		// Taint-Potential durch die Nähe zu Surtrs Energie
		taint_source: 'surtr',
		taint_effects: { corruption_potential: 2 }
	},
	{
		slug: 'altes_siegel_akademie',
		name: { de: 'Zerbrochenes Akademie-Siegel', en: 'Broken Academy Seal' },
		type: 'valuable',
		rarity: 'rare',
		description: { 
			de: 'Ein Siegel aus der Zeit vor der Schism-Nacht. Es zeigt Magier und Kleriker, die gemeinsam ein Portal schließen. Ein Symbol für eine verlorene Einheit.', 
			en: 'A seal from the time before the Schism Night. It shows mages and clerics together closing a portal. A symbol of lost unity.' 
		},
		lore_trigger: 'schism_history',
		value: 300,
		stats: { weight: 0.2, ch_bonus: 1 } // Ein Prestige-Item
	}
];