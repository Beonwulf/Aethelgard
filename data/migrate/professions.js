export const professions = [
	{ 
		slug: 'krieger', 
		name: { de: 'Krieger', en: 'Warrior' },
		description: {
			de: 'Ein Meister des Stahls, geschult in den Hallen der Ehre. Krieger sind das Schild Aethelgards gegen die Dunkelheit.',
			en: 'A master of steel, trained in the halls of honor. Warriors are the shield of Aethelgard against the darkness.'
		},
		energy_type: null, 
		energy_base: 0, 
		attr_mods: { MU: 1, KK: 1, KO: 1 }, 
		start_skills: { schwerter: 5, selbstbeherrschung: 4 } 
	},
	{ 
		slug: 'magier', 
		name: { de: 'Magier', en: 'Mage' },
		description: {
			de: 'Gelehrte der arkanen Künste, die das Gefüge der Welt verstehen und Mana durch ihren Willen formen.',
			en: 'Scholars of the arcane arts who understand the fabric of the world and shape mana through their will.'
		},
		requirements: { min_attributes: { KL: 11, IN: 11 } }, 
		energy_type: 'Mana', 
		energy_base: 20, 
		attr_mods: { KL: 2, IN: 1 }, 
		start_skills: { magiekunde: 6, sagen_legenden: 5 } 
	},
	{ 
		slug: 'runenmeister', 
		name: { de: 'Runenmeister', en: 'Runemaster' },
		description: {
			de: 'Zwergische Handwerker, die uralte Runen in Metall und Stein binden, um die Kraft der Berge zu entfesseln.',
			en: 'Dwarven artisans who bind ancient runes into metal and stone to unleash the power of the mountains.'
		},
		requirements: { allowed_cultures: ['felsenzwerge', 'tiefenzwerge'], min_attributes: { KL: 12 } },
		energy_type: 'Mana', 
		energy_base: 15, 
		attr_mods: { KL: 1, KK: 1, KO: 1 },
		start_skills: { grobschmied: 5, magiekunde: 4, sagen_legenden: 5 }
	},
	{ 
		slug: 'streuner', 
		name: { de: 'Streuner', en: 'Rogue' },
		description: {
			de: 'Flinke Überlebenskünstler der Schatten. Sie verlassen sich auf ihren Instinkt, ihr Geschick und ein loses Mundwerk.',
			en: 'Nimble survivalists of the shadows. They rely on their instincts, their skill, and a quick wit.'
		},
		energy_type: null, 
		energy_base: 0, 
		attr_mods: { IN: 1, GE: 1, CH: 1 }, 
		start_skills: { ueberreden: 5, gassenwissen: 5, schloesser_knacken: 3 } 
	},
	{ 
		slug: 'zwergensoldat', 
		name: { de: 'Zwergensoldat', en: 'Dwarven Soldier' },
		description: {
			de: 'Die unerschütterliche Garde der Tiefenreiche. Schwer gepanzert und unnachgiebig wie massiver Fels.',
			en: 'The unwavering guard of the deep realms. Heavily armored and relentless as solid rock.'
		},
		requirements: { allowed_cultures: ['felsenzwerge', 'tiefenzwerge'], min_attributes: { KO: 12, KK: 12 } }, 
		energy_type: null, 
		energy_base: 0, 
		attr_mods: { KO: 2, KK: 2, GE: -1 }, 
		start_skills: { hiebwaffen: 6, grobschmied: 4, selbstbeherrschung: 4 }
	},
	{ 
		slug: 'entdecker', 
		name: { de: 'Entdecker', en: 'Explorer' },
		description: {
			de: 'Pioniere der Wildnis, die vergessene Pfade finden und die Geheimnisse unberührter Lande lüften.',
			en: 'Pioneers of the wilderness who find forgotten paths and unveil the secrets of untouched lands.'
		},
		energy_type: null, 
		energy_base: 0, 
		attr_mods: { KL: 1, IN: 1, KO: 1 }, 
		start_skills: { orientierung: 6, geographie: 5, klettern: 4 }
	},
	{ 
		slug: 'kleriker', 
		name: { de: 'Kleriker', en: 'Cleric' },
		description: {
			de: 'Diener der himmlischen Mächte. Sie nutzen die Gunst der Götter, um Wunden zu heilen und das Böse zu bannen.',
			en: 'Servants of the celestial powers. They use the favor of the gods to heal wounds and banish evil.'
		},
		requirements: { min_attributes: { MU: 12 } }, 
		energy_type: 'Gunst', 
		energy_base: 20, 
		attr_mods: { MU: 1, IN: 1, CH: 1 }, 
		start_skills: { goetter_kulte: 6, menschenkunde: 4, heilkunde_wunden: 3 }
	},
	{ 
		slug: 'bauer', 
		name: { de: 'Bauer', en: 'Farmer' },
		description: {
			de: 'Das Rückgrat Aethelgards. Ein Leben voller harter Arbeit hat dich zäh gemacht und dir Wissen über die Natur geschenkt.',
			en: 'The backbone of Aethelgard. A life of hard work has made you resilient and gifted you with knowledge of nature.'
		},
		energy_type: null, 
		energy_base: 0, 
		attr_mods: { KO: 2, KK: 1, KL: -1 }, 
		start_skills: { tierkunde: 5, pflanzenkunde: 5, selbstbeherrschung: 3 } 
	},
	{ 
		slug: 'bettler', 
		name: { de: 'Bettler', en: 'Beggar' },
		description: {
			de: 'Ein unscheinbarer Beobachter der Gassen. Was anderen als Armut erscheint, ist deine Tarnung in den Schatten der Stadt.',
			en: 'An inconspicuous observer of the alleys. What others see as poverty is your camouflage in the shadows of the city.'
		},
		energy_type: null, 
		energy_base: 0, 
		attr_mods: { IN: 2, CH: 1, KO: -1 }, 
		start_skills: { gassenwissen: 6, menschenkunde: 5, ueberreden: 4, sinnesschaerfe: 3 } 
	},
	{ 
		slug: 'haendler', 
		name: { de: 'Händler', en: 'Merchant' },
		description: {
			de: 'Wortgewandte Reisende, die Waren und Informationen über ganz Aethelgard bewegen. Jeder hat seinen Preis.',
			en: 'Eloquent travelers who move goods and information across Aethelgard. Everyone has a price.'
		},
		energy_type: null, 
		energy_base: 0, 
		attr_mods: { KL: 1, IN: 1, CH: 2 }, 
		start_skills: { ueberreden: 6, geographie: 4, rechnen: 5, menschenkunde: 3 } 
	},
	{ 
		slug: 'schmied', 
		name: { de: 'Schmied', en: 'Blacksmith' },
		description: {
			de: 'Meister von Feuer und Amboss. Du weißt, wie man sprödes Eisen in legendäre Klingen verwandelt.',
			en: 'Master of fire and anvil. You know how to transform brittle iron into legendary blades.'
		},
		energy_type: null, 
		energy_base: 0,
		attr_mods: { KK: 2, FF: 1, KO: 1 },
		start_skills: { grobschmied: 6, holzbearbeitung: 3, stoffbearbeitung: 2 }
	},
	{
		slug: 'paladin', 
        name: { de: 'Paladin', en: 'Paladin' },
        description: {
            de: 'Ein heiliger Ritter, der Schild und Glauben vereint, um als Bollwerk gegen die Dunkelheit zu dienen.',
            en: 'A holy knight combining shield and faith to serve as a bulwark against the darkness.'
        },
        requirements: { min_attributes: { MU: 13, KO: 12 } }, 
        energy_type: 'Göttliche Macht', 
        energy_base: 15, 
        attr_mods: { MU: 1, KO: 1, KK: 1 }, 
        start_skills: { schilde: 5, schwerter: 4, goetter_kulte: 4 }
	},
	{
		slug: 'druide', 
        name: { de: 'Druide', en: 'Druid' },
        description: {
            de: 'Wächter des Gleichgewichts, die die Lebenskraft Yldras kanalisieren und mit der Wildnis eins sind.',
            en: 'Guardians of balance who channel Yldra\'s life force and are one with the wilderness.'
        },
        requirements: { min_attributes: { IN: 13 } }, 
        energy_type: 'Göttliche Macht', 
        energy_base: 25, 
        attr_mods: { IN: 2, KL: 1 }, 
        start_skills: { pflanzenkunde: 6, tierkunde: 6, orientierung: 4 }
	},
	{
		slug: 'schamane', 
        name: { de: 'Schamane', en: 'Shaman' },
        description: {
            de: 'Mittler zwischen den Welten, die die Kraft der Ahnen beschwören und Geister besänftigen.',
            en: 'Mediators between worlds who summon the power of ancestors and appease spirits.'
        },
        requirements: { min_attributes: { MU: 12, IN: 12 } }, 
        energy_type: 'Göttliche Macht', 
        energy_base: 20, 
        attr_mods: { MU: 1, IN: 1, KO: 1 }, 
        start_skills: { sagen_legenden: 6, spiritismus: 5, heilkunde_gift: 4 }
	},
	{
		slug: 'priester', 
        name: { de: 'Priester', en: 'Priest' },
        description: {
            de: 'Ein Diener der Götter, der durch Gebete stärkt und die spirituelle Führung in den Tempeln übernimmt.',
            en: 'A servant of the gods who strengthens through prayer and provides spiritual leadership in the temples.'
        },
        requirements: { min_attributes: { IN: 12, CH: 12 } }, 
        energy_type: 'Göttliche Macht', 
        energy_base: 30, 
        attr_mods: { IN: 1, CH: 2 }, 
        start_skills: { goetter_kulte: 7, menschenkunde: 6, ueberreden: 4 }
	},
	// --- DIE DUNKLE PROFESSION ---
	{
		slug: 'kultist', 
        name: { de: 'Kultist', en: 'Cultist' },
        description: {
            de: 'Ein Anhänger der Widersacher, der verbotene Macht um den Preis seiner geistigen Reinheit sucht.',
            en: 'A follower of the adversaries seeking forbidden power at the price of their mental purity.'
        },
        requirements: { min_attributes: { MU: 11, KL: 11 } }, 
        energy_type: 'Göttliche Macht', // Auch dunkle Macht nutzt diese Ressource
        energy_base: 25, 
        attr_mods: { MU: 1, KL: 1, IN: 1 }, 
        start_skills: { magiekunde: 5, ueberreden: 5, gassenwissen: 4 }
	}
];