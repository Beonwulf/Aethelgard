export const cultures = [
	{
		slug: 'kaiserliche',
		name: { de: 'Kaiserliche', en: 'Imperials' },
		description: {
			de: 'Die Erben der alten Reiche im Zentrum Aethelgards. Diszipliniert, stolz und dem Gesetz des Lichtbringers treu.',
			en: 'The heirs of the old realms in central Aethelgard. Disciplined, proud, and loyal to the law of the Lightbringer.'
		},
		attr_mods: {}, 
		base_stats: { LeP: 30 }
	},
	{
		slug: 'skjaldar',
		name: { de: 'Skjaldar', en: 'Skjaldar' },
		description: {
			de: 'Kinder der Stürme und Fjorde. Ein Volk von Seefahrern, die den Tod nicht fürchten, solange sie mit dem Schwert in der Hand fallen.',
			en: 'Children of the storms and fjords. A people of seafarers who do not fear death as long as they fall with a sword in hand.'
		},
		attr_mods: { KO: 2, KK: 1, MU: 1, KL: -1 }, 
		base_stats: { LeP: 35 }
	},
	{
		slug: 'zahiri',
		name: { de: 'Zahiri', en: 'Zahiri' },
		description: {
			de: 'Wanderer der ewigen Dünen. Sie hüten das Wissen der Sterne und beherrschen die flüsternde Magie des Sandes.',
			en: 'Wanderers of the eternal dunes. They guard the knowledge of the stars and master the whispering magic of the sands.'
		},
		attr_mods: { IN: 1, CH: 1, KL: 1, KO: -1 }, 
		base_stats: { LeP: 28, Mana: 5 } 
	},
	{
		slug: 'felsenzwerge', // Ehemalig Ambosszwerge
		name: { de: 'Felsenzwerge', en: 'Rock Dwarves' },
		description: {
			de: 'Tief in den Wurzeln der Welt schmieden sie den besten Stahl Aethelgards. Starrköpfig wie der Stein, in dem sie leben.',
			en: 'Deep in the roots of the world, they forge the finest steel in Aethelgard. Stubborn as the stone they live in.'
		},
		attr_mods: { KO: 2, KK: 1, GE: -1, CH: -1 }, 
		base_stats: { LeP: 35 }
	},
	{
		slug: 'tiefenzwerge', // Ehemalig Erzzwerge
		name: { de: 'Tiefenzwerge', en: 'Deep Dwarves' },
		description: {
			de: 'Die Bewahrer der Runen und der Geschichte. Sie graben tiefer als alle anderen nach den Geheimnissen der Erde.',
			en: 'Guardians of runes and history. They dig deeper than any other for the secrets of the earth.'
		},
		attr_mods: { KO: 1, KK: 1, KL: 1, GE: -1 }, 
		base_stats: { LeP: 32 }
	},
	{
		slug: 'feynir', // Ehemalig Waldelfen / Nivesen Hybrid
		name: { de: 'Feynir', en: 'Feynir' },
		description: {
			de: 'Ein Naturvolk der weiten Steppen und Wälder. Sie bewegen sich wie Schatten und sprechen die Sprache der Wölfe.',
			en: 'A nomadic people of the vast steppes and forests. They move like shadows and speak the language of wolves.'
		},
		attr_mods: { IN: 2, GE: 1, KK: -1 }, 
		base_stats: { LeP: 30 }
	},
	{
		slug: 'lichtalben', // Ehemalig Hochelfen
		name: { de: 'Lichtalben', en: 'Light Elves' },
		description: {
			de: 'Einstige Herrscher über die Ätherwinde. Ihre Aura ist strahlend, doch ihre Herzen sind oft so kühl wie das Sternenlicht.',
			en: 'Former rulers of the ether winds. Their aura is radiant, but their hearts are often as cool as starlight.'
		},
		attr_mods: { KL: 2, IN: 1, CH: 1, KO: -2 }, 
		base_stats: { LeP: 26, Mana: 15 } 
	},
	{
		slug: 'nachtalben', // Ehemalig Dunkelelfen
		name: { de: 'Nachtalben', en: 'Night Elves' },
		description: {
			de: 'Sie wählten die Dunkelheit unter den Bergen und die verbotenen Pfade der Magie. Gejagt, gefürchtet und gnadenlos.',
			en: 'They chose the darkness beneath the mountains and the forbidden paths of magic. Hunted, feared, and merciless.'
		},
		attr_mods: { MU: 1, KL: 1, GE: 2, CH: -2 }, 
		base_stats: { LeP: 28, Mana: 10 }
	},
	{
        slug: 'nordfolk',
        name: { de: 'Nordfolk', en: 'Northfolk' },
        description: { de: 'Abgehärtet durch den ewigen Winter.', en: 'Hardened by eternal winter.' },
        attr_mods: { KO: 1, KK: 1 },
        base_stats: { LeP: 32 },
    },
    {
        slug: 'suedbund',
        name: { de: 'Südbund', en: 'Southbound' },
        description: { de: 'Zentrum der Gelehrsamkeit und des Handels.', en: 'Center of scholarship and trade.' },
        attr_mods: { KL: 1, CH: 1 },
        base_stats: { LeP: 28 },
    },
    {
        slug: 'wurzelvolk',
        name: { de: 'Wurzelvolk', en: 'Root Folk' },
        description: {
            de: 'Uralte lebende Baumwesen, die seit Äonen die Wälder von Yldra bewachen. Wer einem Wurzelvolk begegnet, erzählt davon noch seinen Enkeln.',
            en: 'Ancient living tree beings who have guarded the forests of Yldra for aeons. Those who meet one of the Root Folk tell their grandchildren about it.'
        },
        attr_mods: { KO: 3, KK: 2, GE: -2, CH: -1 },
        base_stats: { LeP: 40 },
    },
    {
        slug: 'gnomolk',
        name: { de: 'Gnomolk', en: 'Gnomolk' },
        description: {
            de: 'Kleine bipedale Eisbärwesen, kaum einen Meter groß, mit einem Hang zu Dampfmaschinen, Getrieben und unbeirrbarem Selbstvertrauen. Niemand weiß, woher sie kommen.',
            en: 'Small bipedal polar bear creatures, barely a meter tall, with a penchant for steam engines, gears, and unshakeable self-confidence. Nobody knows where they come from.'
        },
        attr_mods: { KL: 3, FF: 2, IN: 1, KK: -2, KO: -1 },
        base_stats: { LeP: 26 },
    },
];