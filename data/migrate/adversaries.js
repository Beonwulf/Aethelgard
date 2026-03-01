export const adversaries = [
	{
		slug: 'fenrisul',
		name: { de: 'Fenrisul', en: 'Fenrisul' },
		title: { de: 'Der Weltenfresser', en: 'The World Eater' },
		opposes_deity: 'solan', // vs. Gerechtigkeit/Licht
		description: { de: 'Verkörperung des blinden Hungers.', en: 'Embodiment of blind hunger.' },
		taint_gift: {
			name: { de: 'Bestialischer Zorn', en: 'Bestial Rage' },
			bonus: { attr_mods: { KK: 3, MU: 1 } },
			penalty: { attr_mods: { KL: -2, CH: -2 }, description: 'Dein Aussehen wird wilder.' }
		}
	},
	{
		slug: 'hela-ka',
		name: { de: 'Hela-Ka', en: 'Hela-Ka' },
		title: { de: 'Die Frostkönigin', en: 'The Frost Queen' },
		opposes_deity: 'yldra', // vs. Leben/Heilung
		description: { de: 'Herrin der ewigen Kälte.', en: 'Mistress of eternal cold.' },
		taint_gift: {
			name: { de: 'Eisherz', en: 'Ice Heart' },
			bonus: { attr_mods: { KO: 3 }, resistance: 'Kälte' },
			penalty: { attr_mods: { IN: -2 }, description: 'Deine Empathie stirbt.' }
		}
	},
	{
		slug: 'vorthos',
		name: { de: 'Vorthos', en: 'Vorthos' },
		title: { de: 'Der Lügenweber', en: 'The Lie Weaver' },
		opposes_deity: 'mimir', // vs. Wissen/Wahrheit
		description: { de: 'Ein Wesen aus tausend Stimmen.', en: 'A being of a thousand voices.' },
		taint_gift: {
			name: { de: 'Flüsternde Runen', en: 'Whispering Runes' },
			bonus: { energy_mods: { Mana: 15 } },
			penalty: { skill_mods: { sinnesschaerfe: -4 }, description: 'Du hörst ständig Stimmen.' }
		}
	},
	{
		slug: 'surtr',
		name: { de: 'Surtr', en: 'Surtr' },
		title: { de: 'Der Weltenbrand', en: 'The World Burner' },
		opposes_deity: 'valeria', // vs. Ehre/Sturm
		description: { de: 'Ein Ur-Riese aus den Flammenreichen.', en: 'A primordial giant.' },
		taint_gift: {
			name: { de: 'Blutfeuer', en: 'Bloodfire' },
			bonus: { skill_mods: { schwerter: 3, hiebwaffen: 3 } },
			penalty: { skill_mods: { selbstbeherrschung: -5 }, description: 'Kein Rückzug, keine Gnade.' }
		}
	},
	{
		slug: 'xal-atath',
		name: { de: 'Xal-Atath', en: 'Xal-Atath' },
		title: { de: 'Die Leere Hand', en: 'The Void Hand' },
		opposes_deity: 'mercuris', // vs. Handel/Glück
		description: { de: 'Die Gier, die nie gesättigt wird. Er stiehlt nicht nur Gold, sondern das Glück selbst.', en: 'The greed that never sates. He steals not just gold, but luck itself.' },
		taint_gift: {
			name: { de: 'Diebesfluch', en: 'Thief\'s Curse' },
			bonus: { skill_mods: { taschendiebstahl: 5, schloesser_knacken: 2 } },
			penalty: { attr_mods: { CH: -4 }, description: 'Unglück folgt dir; Gold zerrinnt dir zwischen den Fingern.' }
		}
	},
	{
		slug: 'nidhogg',
		name: { de: 'Nidhogg', en: 'Nidhogg' },
		title: { de: 'Der Wurzelnager', en: 'The Root Gnawer' },
		opposes_deity: 'mornir', // vs. Tod/Stille/Frieden
		description: { de: 'Ein Drache, der die Totenruhe stört und Seelen schändet.', en: 'A dragon that disturbs the peace of the dead and defiles souls.' },
		taint_gift: {
			name: { de: 'Untoter Atem', en: 'Undead Breath' },
			bonus: { resistance: 'Gift', attr_mods: { KO: 2 } },
			penalty: { derived_stats: { LeP_regen: -2 }, description: 'Dein Körper fängt an, bei lebendigem Leibe zu verwesen.' }
		}
	},
	{
		slug: 'skoll',
		name: { de: 'Skoll', en: 'Skoll' },
		title: { de: 'Der Sonnenjäger', en: 'The Sun Hunter' },
		opposes_deity: 'skadi', // vs. Jagd/Wildnis (Ordnung der Natur)
		description: { de: 'Ein Wolf, der das Licht jagen will, um die Welt in ewige Finsternis zu stürzen.', en: 'A wolf hunting the light to plunge the world into eternal darkness.' },
		taint_gift: {
			name: { de: 'Schattenpirsch', en: 'Shadow Stalk' },
			bonus: { skill_mods: { schleichen: 4, orientierung: 2 } },
			penalty: { skill_mods: { fernkampf: -4 }, description: 'Du erblindest im hellen Sonnenlicht.' }
		}
	},
	{
		slug: 'malakor',
		name: { de: 'Malakor', en: 'Malakor' },
		title: { de: 'Der ewige Stillstand', en: 'The Eternal Stasis' },
		opposes_deity: 'lokh', // vs. Wandel/Feuer/Chaos
		description: { de: 'Ein Wesen aus grauem Staub, das jegliche Veränderung und jeden Funken Kreativität erstickt.', en: 'A being of gray dust that smothers all change and every spark of creativity.' },
		taint_gift: {
			name: { de: 'Steinerne Haut', en: 'Stone Skin' },
			bonus: { derived_stats: { RS: 4 } },
			penalty: { attr_mods: { GE: -3 }, description: 'Deine Glieder werden schwer und steif wie Stein.' }
		}
	}
];