export const reputationRanks = [
	// --- NEGATIVER RUF (Feindschaft) ---
	{
		name: { de: 'Erzfeind', en: 'Arch-Nemesis' },
		min: -10000, max: -7501,
		effect: 'Attack on Sight (Wachen greifen sofort an), Kopfgeldjäger werden entsandt.'
	},
	{
		name: { de: 'Geächteter', en: 'Outlaw' },
		min: -7500, max: -4001,
		effect: 'Handel verweigert, NPCs rufen nach Wachen.'
	},
	{
		name: { de: 'Unwillkommen', en: 'Unwelcome' },
		min: -4000, max: -1001,
		effect: 'Preise +50%, keine Quests verfügbar.'
	},

	// --- NEUTRALER RUF ---
	{
		name: { de: 'Fremder', en: 'Stranger' },
		min: -1000, max: 1000,
		effect: 'Standardpreise, Basis-Quests verfügbar.'
	},

	// --- POSITIVER RUF (Ansehen) ---
	{
		name: { de: 'Sympathisant', en: 'Sympathizer' },
		min: 1001, max: 3000,
		effect: 'Preise -5%, Zugang zu einfachen Fraktions-Items.'
	},
	{
		name: { de: 'Verbündeter', en: 'Ally' },
		min: 3001, max: 6000,
		effect: 'Preise -15%, Zugang zu Offiziers-Quests.'
	},
	{
		name: { de: 'Held der Fraktion', en: 'Hero of the Faction' },
		min: 6001, max: 9000,
		effect: 'Preise -25%, Zugriff auf seltene Ausrüstung (Rare/Epic).'
	},
	{
		name: { de: 'Heiliger / Champion', en: 'Paragon / Champion' },
		min: 9001, max: 10000,
		effect: 'Maximaler Rabatt, Zugriff auf legendäre Artefakte, NPCs verneigen sich.'
	}
];