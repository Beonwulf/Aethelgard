export const skills = [
	// --- KÖRPERLICHE TALENTE ---
	{ 
		slug: 'selbstbeherrschung', category: 'koerper', attr_check: 'MU/KO/KK',
		name: { de: 'Selbstbeherrschung', en: 'Self-Control' },
		description: { de: 'Widerstehe Schmerz, Erschöpfung und der Versuchung, in Panik zu geraten.', en: 'Resist pain, exhaustion, and the temptation to panic.' }
	},
	{ 
		slug: 'sinnesschaerfe', category: 'koerper', attr_check: 'KL/IN/IN',
		name: { de: 'Sinnesschärfe', en: 'Perception' },
		description: { de: 'Bemerke verborgene Gefahren, höre leise Geräusche oder entdecke Geheimtüren.', en: 'Notice hidden dangers, hear faint noises, or discover secret doors.' }
	},
	{ 
		slug: 'klettern', category: 'koerper', attr_check: 'MU/GE/KK',
		name: { de: 'Klettern', en: 'Climbing' },
		description: { de: 'Überwinde steile Felswände, Mauern oder Bäume.', en: 'Scale steep cliffs, walls, or trees.' }
	},
	{ 
		slug: 'fesseln', category: 'koerper', attr_check: 'KL/FF/KK',
		name: { de: 'Fesseln', en: 'Binding' },
		description: { de: 'Knoten binden, Gefangene sichern oder Segel festmachen.', en: 'Tie knots, secure prisoners, or fasten sails.' }
	},
	{ 
		slug: 'schwimmen', category: 'koerper', attr_check: 'GE/KO/KK',
		name: { de: 'Schwimmen', en: 'Swimming' },
		description: { de: 'Sicheres Bewegen in tiefem Wasser oder starken Strömungen.', en: 'Safe movement in deep water or strong currents.' }
	},
	{ 
		slug: 'koerperbeherrschung', category: 'koerper', attr_check: 'GE/GE/KO',
		name: { de: 'Körperbeherrschung', en: 'Body Control' },
		description: { de: 'Akrobatik, Balance und die Fähigkeit, Angriffen geschmeidig auszuweichen.', en: 'Acrobatics, balance, and the ability to fluidly evade attacks.' }
	},
	{ 
		slug: 'reiten', category: 'koerper', attr_check: 'CH/GE/KK',
		name: { de: 'Reiten', en: 'Riding' },
		description: { de: 'Das Führen von Pferden oder anderen Reittieren, auch im Kampf.', en: 'Guiding horses or other mounts, even in combat.' }
	},

	// --- GESELLSCHAFTLICHE TALENTE ---
	{ 
		slug: 'ueberreden', category: 'gesellschaft', attr_check: 'MU/IN/CH',
		name: { de: 'Überreden', en: 'Fast-Talk' },
		description: { de: 'Jemanden kurzfristig manipulieren, belügen oder zu einer Handlung drängen.', en: 'Briefly manipulate, lie to, or urge someone into an action.' }
	},
	{ 
		slug: 'menschenkunde', category: 'gesellschaft', attr_check: 'KL/IN/CH',
		name: { de: 'Menschenkunde', en: 'Empathy' },
		description: { de: 'Erkenne die wahren Absichten oder Gefühle deines Gegenübers.', en: 'Recognize the true intentions or feelings of your counterpart.' }
	},
	{ 
		slug: 'betoeren', category: 'gesellschaft', attr_check: 'IN/CH/CH',
		name: { de: 'Betören', en: 'Seduction' },
		description: { de: 'Charmantes Auftreten, um Zuneigung oder Gefallen zu gewinnen.', en: 'Charming demeanor to win affection or favors.' }
	},
	{ 
		slug: 'gassenwissen', category: 'gesellschaft', attr_check: 'KL/IN/CH',
		name: { de: 'Gassenwissen', en: 'Streetwise' },
		description: { de: 'Sich in Städten zurechtfinden und Kontakte zur Unterwelt knüpfen.', en: 'Find your way around cities and establish contacts with the underworld.' }
	},
	{ 
		slug: 'ueberzeugen', category: 'gesellschaft', attr_check: 'MU/KL/CH',
		name: { de: 'Überzeugen', en: 'Persuasion' },
		description: { de: 'Durch Logik und glaubhafte Argumente eine dauerhafte Einstellungsänderung bewirken.', en: 'Effect a lasting change in attitude through logic and credible arguments.' }
	},
	{ 
		slug: 'feilschen', category: 'gesellschaft', attr_check: 'MU/IN/CH',
		name: { de: 'Feilschen', en: 'Haggling' },
		description: { de: 'Preise drücken oder den eigenen Gewinn beim Handel maximieren.', en: 'Lower prices or maximize your own profit when trading.' }
	},
	{ 
		slug: 'einschuechtern', category: 'gesellschaft', attr_check: 'MU/IN/CH',
		name: { de: 'Einschüchtern', en: 'Intimidation' },
		description: { de: 'Jemanden durch Drohungen oder imposantes Auftreten gefügig machen.', en: 'Make someone submissive through threats or an imposing presence.' }
	},

	// --- WISSENSTALENTE ---
	{ 
		slug: 'sagen_legenden', category: 'wissen', attr_check: 'KL/KL/IN',
		name: { de: 'Sagen & Legenden', en: 'Myths & Legends' },
		description: { de: 'Wissen über alte Geschichten, Mythen von Aethelgard und vergessene Helden.', en: 'Knowledge of old stories, myths of Aethelgard, and forgotten heroes.' }
	},
	{ 
		slug: 'orientierung', category: 'wissen', attr_check: 'KL/IN/IN',
		name: { de: 'Orientierung', en: 'Orientation' },
		description: { de: 'Bestimmung der Himmelsrichtung und Finden des Weges in der Wildnis.', en: 'Determining cardinal directions and finding paths in the wilderness.' }
	},
	{ 
		slug: 'magiekunde', category: 'wissen', attr_check: 'KL/KL/IN',
		name: { de: 'Magiekunde', en: 'Arcane Lore' },
		description: { de: 'Theoretisches Wissen über magische Phänomene, Artefakte und Runen.', en: 'Theoretical knowledge of magical phenomena, artifacts, and runes.' }
	},
	{ 
		slug: 'tierkunde', category: 'wissen', attr_check: 'MU/KL/IN',
		name: { de: 'Tierkunde', en: 'Animal Lore' },
		description: { de: 'Verhalten von Tieren verstehen, Fährten lesen und Gefahren einschätzen.', en: 'Understand animal behavior, read tracks, and assess dangers.' }
	},
	{ 
		slug: 'pflanzenkunde', category: 'wissen', attr_check: 'KL/IN/FF',
		name: { de: 'Pflanzenkunde', en: 'Plant Lore' },
		description: { de: 'Bestimmen von Kräutern, Giftpflanzen und essbaren Beeren.', en: 'Identify herbs, poisonous plants, and edible berries.' }
	},
	{ 
		slug: 'rechnen', category: 'wissen', attr_check: 'KL/KL/IN',
		name: { de: 'Rechnen', en: 'Arithmetic' },
		description: { de: 'Mathematische Probleme lösen, Buchführung und Handelsbilanzen.', en: 'Solve mathematical problems, bookkeeping, and trade balances.' }
	},
	{ 
		slug: 'rechtskunde', category: 'wissen', attr_check: 'KL/KL/IN',
		name: { de: 'Rechtskunde', en: 'Law' },
		description: { de: 'Wissen über die Gesetze der Kaiserlichen und lokale Bräuche.', en: 'Knowledge of Imperial laws and local customs.' }
	},
	{ 
		slug: 'geographie', category: 'wissen', attr_check: 'KL/KL/IN',
		name: { de: 'Geographie', en: 'Geography' },
		description: { de: 'Wissen über Länder, Städte, Flüsse und Handelsrouten.', en: 'Knowledge of countries, cities, rivers, and trade routes.' }
	},
	{ 
		slug: 'goetter_kulte', category: 'wissen', attr_check: 'KL/KL/IN',
		name: { de: 'Götter & Kulte', en: 'Gods & Cults' },
		description: { de: 'Wissen über die Lichtbringer, das Pantheon und religiöse Rituale.', en: 'Knowledge of the Lightbringers, the pantheon, and religious rituals.' }
	},

	// --- KAMPF ---
	{ 
		slug: 'schwerter', category: 'kampf', attr_check: 'GE/KK',
		name: { de: 'Schwerter', en: 'Swords' },
		description: { de: 'Umgang mit einhändigen Klingenwaffen.', en: 'Handling of one-handed bladed weapons.' }
	},
	{ 
		slug: 'dolche', category: 'kampf', attr_check: 'GE/FF',
		name: { de: 'Dolche', en: 'Daggers' },
		description: { de: 'Führen von kurzen Klingen und Wurfmessern.', en: 'Wielding short blades and throwing knives.' }
	},
	{ 
		slug: 'hiebwaffen', category: 'kampf', attr_check: 'GE/KK',
		name: { de: 'Hiebwaffen', en: 'Maces & Axes' },
		description: { de: 'Umgang mit Äxten, Keulen und Streitkolben.', en: 'Handling of axes, clubs, and maces.' }
	},
	{ 
		slug: 'stangenwaffen', category: 'kampf', attr_check: 'GE/KK',
		name: { de: 'Stangenwaffen', en: 'Polearms' },
		description: { de: 'Kampf mit Speeren, Lanzen und Hellebarden.', en: 'Combat with spears, lances, and halberds.' }
	},
	{ 
		slug: 'zweihandschwerter', category: 'kampf', attr_check: 'MU/GE/KK',
		name: { de: 'Zweihandschwerter', en: 'Two-Handed Swords' },
		description: { de: 'Umgang mit großen Schlachtschwertern und Zweihändern.', en: 'Handling of large greatswords and two-handers.' }
	},
	{ 
		slug: 'bogen', category: 'kampf', attr_check: 'FF/GE/KK',
		name: { de: 'Bogen', en: 'Bows' },
		description: { de: 'Fernkampf mit Kurz- und Langbögen.', en: 'Ranged combat with short and long bows.' }
	},
	{ 
		slug: 'armbrust', category: 'kampf', attr_check: 'FF/GE/KK',
		name: { de: 'Armbrust', en: 'Crossbows' },
		description: { de: 'Zielen und Schießen mit der Armbrust.', en: 'Aiming and firing with the crossbow.' }
	},
	{ 
		slug: 'raufen', category: 'kampf', attr_check: 'MU/GE/KK',
		name: { de: 'Raufen', en: 'Brawling' },
		description: { de: 'Waffenloser Kampf mit Fäusten, Tritten und Ringgriffen.', en: 'Unarmed combat with fists, kicks, and grappling.' }
	},

	// --- HANDWERK ---
	{ 
		slug: 'alchimie', category: 'handwerk', attr_check: 'MU/KL/FF',
		name: { de: 'Alchimie', en: 'Alchemy' },
		description: { de: 'Brauen von Tränken, Elixieren und das Mischen von Giften.', en: 'Brewing potions, elixirs, and mixing poisons.' }
	},
	{ 
		slug: 'stoffbearbeitung', category: 'handwerk', attr_check: 'KL/FF/FF',
		name: { de: 'Stoffbearbeitung', en: 'Tailoring' },
		description: { de: 'Nähen, Weben und Reparieren von Kleidung.', en: 'Sewing, weaving, and repairing clothes.' }
	},
	{ 
		slug: 'lederbearbeitung', category: 'handwerk', attr_check: 'FF/GE/KO',
		name: { de: 'Lederbearbeitung', en: 'Leatherworking' },
		description: { de: 'Herstellen von Rüstungen, Sätteln und Beuteln aus Leder.', en: 'Crafting armor, saddles, and pouches from leather.' }
	},
	{ 
		slug: 'grobschmied', category: 'handwerk', attr_check: 'FF/KO/KK',
		name: { de: 'Grobschmied', en: 'Smithing' },
		description: { de: 'Bearbeiten von glühendem Eisen zu Waffen, Werkzeugen oder Hufeisen.', en: 'Working glowing iron into weapons, tools, or horseshoes.' }
	},
	{ 
		slug: 'kochen', category: 'handwerk', attr_check: 'IN/FF/FF',
		name: { de: 'Kochen', en: 'Cooking' },
		description: { de: 'Zubereiten nahrhafter Mahlzeiten, auch unter freiem Himmel.', en: 'Preparing nutritious meals, even under the open sky.' }
	},
	{ 
		slug: 'heilkunde_wunden', category: 'handwerk', attr_check: 'KL/FF/KO',
		name: { de: 'Heilkunde Wunden', en: 'Treat Wounds' },
		description: { de: 'Erste Hilfe, Versorgen von Schnittwunden und Schienen von Brüchen.', en: 'First aid, treating cuts, and splinting fractures.' }
	},
	{ 
		slug: 'schloesser_knacken', category: 'handwerk', attr_check: 'IN/FF/FF',
		name: { de: 'Schlösser knacken', en: 'Lockpicking' },
		description: { de: 'Öffnen von Türen und Truhen ohne den passenden Schlüssel.', en: 'Opening doors and chests without the proper key.' }
	},
	{ 
		slug: 'fischen_angeln', category: 'handwerk', attr_check: 'IN/FF/KK',
		name: { de: 'Fischen & Angeln', en: 'Fishing' },
		description: { de: 'Fang von Speisefischen in Bächen, Seen und Meeren.', en: 'Catching food fish in streams, lakes, and seas.' }
	},
	{ 
		slug: 'ackerbau', category: 'handwerk', attr_check: 'IN/FF/KO',
		name: { de: 'Ackerbau', en: 'Farming' },
		description: { de: 'Bestellen von Feldern, Ernten und Wissen über Bodenqualität.', en: 'Tilling fields, harvesting, and knowledge of soil quality.' }
	},
	{ 
		slug: 'holzbearbeitung', category: 'handwerk', attr_check: 'KL/FF/KK',
		name: { de: 'Holzbearbeitung', en: 'Woodworking' },
		description: { de: 'Schnitzen, Zimmern und Herstellen von Pfeilen oder Möbeln.', en: 'Carving, carpentry, and making arrows or furniture.' }
	}
];