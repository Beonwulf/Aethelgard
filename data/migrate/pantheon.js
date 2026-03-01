export const pantheon = [
	{
		slug: 'solan',
		aspect: 'Licht & Gerechtigkeit',
		color: '#FFD700',
		name: { de: 'Solan', en: 'Solan' },
		title: { de: 'Der Lichtbringer', en: 'The Lightbringer' },
		description: { 
			de: 'Gott der Sonne und der Wahrheit. Seine Anhänger dulden keine Lüge.', 
			en: 'God of the sun and truth. His followers tolerate no lies.' 
		},
		bonuses: {
			skill_mods: { rechtskunde: 2, ueberzeugen: 1 },
			attr_mods: { MU: 1 } // Mut der Gerechten
		}
	},
	{
		slug: 'valeria',
		aspect: 'Sturm & Ehre',
		color: '#B22222',
		name: { de: 'Valeria', en: 'Valeria' },
		title: { de: 'Die Sturmmaid', en: 'The Storm Maiden' },
		description: { 
			de: 'Patronin der Krieger und Seefahrer. Sie schenkt Kraft im Angesicht des Sturms.', 
			en: 'Patron of warriors and seafarers. She grants strength in the face of the storm.' 
		},
		bonuses: {
			skill_mods: { schwerter: 1, schwimmen: 2 },
			attr_mods: { KK: 1 } // Kraft der Brandung
		}
	},
	{
		slug: 'mercuris',
		aspect: 'Listen & Handel',
		color: '#708090',
		name: { de: 'Mercuris', en: 'Mercuris' },
		title: { de: 'Der Schattenhändler', en: 'The Shadow Trader' },
		description: { 
			de: 'Gott des Glücks und der flinken Finger. Er begünstigt den kühnen Tausch.', 
			en: 'God of luck and nimble fingers. He favors the bold trade.' 
		},
		bonuses: {
			skill_mods: { feilschen: 2, schloesser_knacken: 1 },
			attr_mods: { IN: 1 } // Intuition des Händlers
		}
	},
	{
		slug: 'yldra',
		aspect: 'Erde & Heilung',
		color: '#228B22',
		name: { de: 'Yldra', en: 'Yldra' },
		title: { de: 'Die Weltenmutter', en: 'The World Mother' },
		description: { 
			de: 'Die gütige Bewahrerin des Lebens. Ihr Segen lässt Wunden schneller schließen.', 
			en: 'The benevolent preserver of life. Her blessing allows wounds to close faster.' 
		},
		bonuses: {
			skill_mods: { heilkunde_wunden: 2, pflanzenkunde: 1 },
			attr_mods: { KO: 1 } // Ausdauer der Erde
		}
	},
	{
        slug: 'mornir',
        aspect: 'Tod & Stille',
        color: '#2F4F4F', // Dark Slate Gray (Grabesstille)
        name: { de: 'Mornir', en: 'Mornir' },
        title: { de: 'Der Seelenhirte', en: 'The Soul Shepherd' },
        description: { 
            de: 'Gott des Endes und des ewigen Friedens. Er geleitet die Seelen der Verstorbenen über den gefrorenen Fluss in die Hallen der Ahnen.', 
            en: 'God of the end and eternal peace. He guides the souls of the deceased across the frozen river into the halls of the ancestors.' 
        },
        bonuses: {
            skill_mods: { selbstbeherrschung: 2, sagen_legenden: 1 },
            attr_mods: { MU: 1 } // Die Furchtlosigkeit vor dem Ende
        }
    },
    {
        slug: 'skadi',
        aspect: 'Jagd & Wildnis',
        color: '#E0FFFF', // Light Cyan (Eis/Schnee)
        name: { de: 'Skadi', en: 'Skadi' },
        title: { de: 'Herrin des Frosts', en: 'Mistress of Frost' },
        description: { 
            de: 'Göttin der Jagd und der ungezähmten Natur. Sie wacht über jene, die in der eisigen Wildnis überleben müssen.', 
            en: 'Goddess of the hunt and untamed nature. She watches over those who must survive in the icy wilderness.' 
        },
        bonuses: {
            skill_mods: { orientierung: 2, bogen: 1 },
            attr_mods: { GE: 1 } // Die Flinkheit der Jägerin
        }
    },
    {
        slug: 'mimir',
        aspect: 'Wissen & Runen',
        color: '#4169E1', // Royal Blue (Geist/Magie)
        name: { de: 'Mimir', en: 'Mimir' },
        title: { de: 'Der Hüter der Quellen', en: 'Guardian of the Wells' },
        description: { 
            de: 'Gott der Weisheit und der verborgenen Runen. Er verlangt Opfer für wahre Erkenntnis.', 
            en: 'God of wisdom and hidden runes. He demands sacrifices for true insight.' 
        },
        bonuses: {
            skill_mods: { magiekunde: 2, rechnen: 1 },
            attr_mods: { KL: 1 } // Ein scharfer Verstand
        }
    },
    {
        slug: 'lokh', // Oder ein ähnlicher Name wie 'Lokh'
        aspect: 'Wandel & Feuer',
        color: '#FF4500', // OrangeRed (Zerstörung/Energie)
        name: { de: 'Lokh', en: 'Lokh' },
        title: { de: 'Der Funkenbringer', en: 'The Spark Bringer' },
        description: { 
            de: 'Gott des Feuers, des Chaos und der Veränderung. Er ist weder gut noch böse, sondern der notwendige Funke für Neues.', 
            en: 'God of fire, chaos, and change. He is neither good nor evil, but the necessary spark for something new.' 
        },
        bonuses: {
            skill_mods: { ueberreden: 2, alchimie: 1 },
            attr_mods: { IN: 1 } // Die Geistesgegenwart des Feuers
        }
    }
];