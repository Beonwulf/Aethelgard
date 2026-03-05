export const npcsTrainers = [

	// ════════════════════════════════════════════════════════════════════════════
	// ÆTHELHAFEN  ·  tile_32_10  ·  Kaiserliches Kernland
	// ════════════════════════════════════════════════════════════════════════════

	{
		slug: 'trainer_schwerter_friedhold',
		name: { de: 'Waffenmeister Friedhold Stahlguss', en: 'Weaponmaster Friedhold Steelcast' },
		type: 'trainer',
		faction_slug: 'kaiserreich_aethelgard',
		location: {
			name: { de: 'Æthelhafen – Kaserne des Sonnen-Konvents', en: 'Æthelhafen – Sun Convent Barracks' },
			tile: 'tile_32_10',
			world: { x: 5180, y: 0, z: 16310 }
		},
		teaches: ['schwerter', 'hiebwaffen'],
		max_teach_level: 4,
		cost_per_level: { '1': 0, '2': 50, '3': 150, '4': 300 },
		intro_quest: 'quest_schwert_grundlagen',
		min_level_required: 0,
		base_stats: { level: 18, hp: 220, atk: 18, def: 14 },
		description: {
			de: 'Friedhold hat dreißig Jahre in der kaiserlichen Armee gedient und trägt noch immer die Narben der Ersten Schwarzen Flut. Er bringt Rekruten bei, wie man eine Klinge hält – ohne sie in die eigene Hand zu rammen.',
			en: 'Friedhold served thirty years in the imperial army and still carries the scars of the First Black Tide. He teaches recruits how to hold a blade – without driving it into their own hand.'
		}
	},
	{
		slug: 'trainer_fernkampf_marta',
		name: { de: 'Bogenschützin Marta Zielklar', en: 'Archer Marta Clearsight' },
		type: 'trainer',
		faction_slug: 'kaiserreich_aethelgard',
		location: {
			name: { de: 'Æthelhafen – Schießplatz am Hafenwall', en: 'Æthelhafen – Harbour Wall Range' },
			tile: 'tile_32_10',
			world: { x: 5270, y: 0, z: 16420 }
		},
		teaches: ['bogen', 'armbrust'],
		max_teach_level: 4,
		cost_per_level: { '1': 0, '2': 50, '3': 150, '4': 300 },
		intro_quest: 'quest_bogenschiessen_anfaenger',
		min_level_required: 0,
		base_stats: { level: 15, hp: 160, atk: 14, def: 8 },
		description: {
			de: 'Marta war früher Grenzschützin im Östlichen Forst. Seit dem Verlust ihres Zeigefingers – abgehackt von einem Ghul – trainiert sie stattdessen die nächste Generation. Ihre Augen sind schärfer als je zuvor.',
			en: 'Marta was once a border scout in the Eastern Wood. Since losing her index finger – chopped off by a ghoul – she trains the next generation instead. Her eyes are sharper than ever.'
		}
	},
	{
		slug: 'trainer_rhetorik_cornelius',
		name: { de: 'Rhetor Cornelius Feder', en: 'Rhetor Cornelius Quill' },
		type: 'trainer',
		faction_slug: 'kaiserreich_aethelgard',
		location: {
			name: { de: 'Æthelhafen – Kaiserliche Akademie', en: 'Æthelhafen – Imperial Academy' },
			tile: 'tile_32_10',
			world: { x: 5140, y: 0, z: 16480 }
		},
		teaches: ['ueberreden', 'ueberzeugen'],
		max_teach_level: 4,
		cost_per_level: { '1': 0, '2': 50, '3': 150, '4': 300 },
		intro_quest: 'quest_erste_worte_der_ueberzeugung',
		min_level_required: 0,
		base_stats: { level: 12, hp: 110, atk: 6, def: 6 },
		description: {
			de: 'Cornelius hat Grafen überredet, Kriege abzusagen, und Händler überzeugt, Schulden zu erlassen. Seine Vorlesungen sind trocken wie Pergament – aber wer zuhört, verändert die Welt mit Worten.',
			en: 'Cornelius has persuaded counts to call off wars, and convinced merchants to forgive debts. His lectures are as dry as parchment – but those who listen change the world with words.'
		}
	},
	{
		slug: 'trainer_recht_sigismund',
		name: { de: 'Rechtsgelehrter Sigismund Goldsiegel', en: 'Legal Scholar Sigismund Goldseal' },
		type: 'trainer',
		faction_slug: 'kaiserreich_aethelgard',
		location: {
			name: { de: 'Æthelhafen – Kaiserliche Akademie', en: 'Æthelhafen – Imperial Academy' },
			tile: 'tile_32_10',
			world: { x: 5155, y: 0, z: 16495 }
		},
		teaches: ['rechtskunde', 'rechnen'],
		max_teach_level: 4,
		cost_per_level: { '1': 0, '2': 50, '3': 150, '4': 300 },
		intro_quest: 'quest_gesetz_und_ordnung',
		min_level_required: 0,
		base_stats: { level: 10, hp: 100, atk: 4, def: 5 },
		description: {
			de: 'Sigismund kennt jeden Paragraphen des Kaiserlichen Codex auswendig und trägt immer ein Tintenfass bei sich. Er sagt, Zahlen und Gesetze seien zwei Seiten desselben Siegels.',
			en: 'Sigismund has memorised every paragraph of the Imperial Codex and always carries an inkpot. He says numbers and laws are two sides of the same seal.'
		}
	},
	{
		slug: 'trainer_kartograph_emmerich',
		name: { de: 'Hofkartograph Emmerich Westwend', en: 'Court Cartographer Emmerich Westwind' },
		type: 'trainer',
		faction_slug: 'kaiserreich_aethelgard',
		location: {
			name: { de: 'Æthelhafen – Kaiserliche Akademie', en: 'Æthelhafen – Imperial Academy' },
			tile: 'tile_32_10',
			world: { x: 5165, y: 0, z: 16510 }
		},
		teaches: ['geographie', 'orientierung'],
		max_teach_level: 4,
		cost_per_level: { '1': 0, '2': 50, '3': 150, '4': 300 },
		intro_quest: 'quest_karte_lesen',
		min_level_required: 0,
		base_stats: { level: 11, hp: 105, atk: 5, def: 5 },
		description: {
			de: 'Emmerich hat sämtliche Küsten Aethelgards kartiert und dabei zweimal Schiffbruch erlitten. Heute weiß er genau, wo man hinfährt – und wohin man besser nie fährt.',
			en: 'Emmerich has mapped all of Aethelgard\'s coastlines and survived two shipwrecks doing so. Today he knows exactly where to go – and where you are much better off never going.'
		}
	},
	{
		slug: 'trainer_chronistin_benedikta',
		name: { de: 'Hofchronistin Benedikta Tintenhand', en: 'Court Chronicler Benedikta Inkhand' },
		type: 'trainer',
		faction_slug: 'kaiserreich_aethelgard',
		location: {
			name: { de: 'Æthelhafen – Tempel des Lichts', en: 'Æthelhafen – Temple of Light' },
			tile: 'tile_32_10',
			world: { x: 5210, y: 0, z: 16540 }
		},
		teaches: ['sagen_legenden', 'goetter_kulte'],
		max_teach_level: 4,
		cost_per_level: { '1': 0, '2': 50, '3': 150, '4': 300 },
		intro_quest: 'quest_alte_geschichten',
		min_level_required: 0,
		base_stats: { level: 13, hp: 115, atk: 5, def: 7 },
		description: {
			de: 'Benediktas linke Hand ist durch jahrzehntelanges Schreiben dauerhaft mit Tinte gefärbt. Sie kennt die Ursprungsmythen aller zwölf Lichtbringer und streitet leidenschaftlich darüber, welcher der älteste ist.',
			en: 'Benedikta\'s left hand is permanently stained with ink from decades of writing. She knows the origin myths of all twelve Lightbringers and argues passionately about which one is oldest.'
		}
	},
	{
		slug: 'trainer_schneiderin_hildegard',
		name: { de: 'Meisterschneiderin Hildegard Goldnadel', en: 'Master Tailor Hildegard Goldneedle' },
		type: 'trainer',
		faction_slug: 'kaiserreich_aethelgard',
		location: {
			name: { de: 'Æthelhafen – Tuchhändlerviertel', en: 'Æthelhafen – Cloth Merchants\' Quarter' },
			tile: 'tile_32_10',
			world: { x: 5300, y: 0, z: 16230 }
		},
		teaches: ['stoffbearbeitung'],
		max_teach_level: 4,
		cost_per_level: { '1': 0, '2': 50, '3': 150, '4': 300 },
		intro_quest: 'quest_nadel_und_faden',
		min_level_required: 0,
		base_stats: { level: 10, hp: 100, atk: 4, def: 4 },
		description: {
			de: 'Hildegard kleidet die Hälfte des Kaiserlichen Hofes ein und erkennt den Rang eines Mannes an seiner Naht. Wer bei ihr lernt, versteht: Stoff ist Rüstung, die niemand für eine Rüstung hält.',
			en: 'Hildegard dresses half the Imperial Court and can judge a man\'s rank by his seams. Those who learn from her understand: fabric is armour that nobody mistakes for armour.'
		}
	},

	// --- Æthelhafen · Fortgeschrittene Trainer ---

	{
		slug: 'trainer_schwerter_alaric',
		name: { de: 'Hauptmann Alaric von Eisenwall', en: 'Captain Alaric of Ironwall' },
		type: 'trainer',
		faction_slug: 'kaiserreich_aethelgard',
		location: {
			name: { de: 'Æthelhafen – Kaserne des Sonnen-Konvents', en: 'Æthelhafen – Sun Convent Barracks' },
			tile: 'tile_32_10',
			world: { x: 5190, y: 0, z: 16290 }
		},
		teaches: ['schwerter'],
		max_teach_level: 14,
		cost_per_level: {
			'1': 0,   '2': 50,   '3': 150,  '4': 300,
			'5': 500, '6': 800,  '7': 1200, '8': 1800,
			'9': 2500, '10': 3500, '11': 5000, '12': 7000,
			'13': 9500, '14': 12000
		},
		min_level_required: 5,
		base_stats: { level: 35, hp: 480, atk: 40, def: 32 },
		description: {
			de: 'Alaric überlebte das Massaker am Eisernen Pass, indem er allein drei Sturmtrolle mit der Klinge stellte. Er lacht über Anfänger – und macht aus ihnen Meister, die selbst lachen werden.',
			en: 'Alaric survived the Iron Pass Massacre by holding off three storm trolls with his blade alone. He laughs at beginners – and turns them into masters who will laugh too.'
		}
	},
	{
		slug: 'trainer_bogen_leandra',
		name: { de: 'Meisterschützin Leandra Pfeilflug', en: 'Master Archer Leandra Arrowflight' },
		type: 'trainer',
		faction_slug: 'kaiserreich_aethelgard',
		location: {
			name: { de: 'Æthelhafen – Schießplatz am Hafenwall', en: 'Æthelhafen – Harbour Wall Range' },
			tile: 'tile_32_10',
			world: { x: 5280, y: 0, z: 16400 }
		},
		teaches: ['bogen'],
		max_teach_level: 10,
		cost_per_level: {
			'1': 0,   '2': 50,  '3': 150, '4': 300,
			'5': 500, '6': 800, '7': 1200, '8': 1800,
			'9': 2500, '10': 3500
		},
		min_level_required: 5,
		base_stats: { level: 28, hp: 280, atk: 30, def: 16 },
		description: {
			de: 'Leandra schoss einst auf dreihundert Schritte einen Befehlsring vom Finger eines Orkhauptmanns. Er verlor drei Finger dabei. Sie betrachtet das als Kollateralschaden.',
			en: 'Leandra once shot a command ring off an orc chief\'s finger from three hundred paces. He lost three fingers in the process. She considers it acceptable collateral damage.'
		}
	},
	{
		slug: 'trainer_alchimie_theobald',
		name: { de: 'Magister Theobald Aschenhand', en: 'Magister Theobald Ashhand' },
		type: 'trainer',
		faction_slug: 'kaiserreich_aethelgard',
		location: {
			name: { de: 'Æthelhafen – Alchimistenviertel', en: 'Æthelhafen – Alchemists\' Quarter' },
			tile: 'tile_32_10',
			world: { x: 5120, y: 0, z: 16600 }
		},
		teaches: ['alchimie'],
		max_teach_level: 14,
		cost_per_level: {
			'1': 0,   '2': 50,   '3': 150,  '4': 300,
			'5': 500, '6': 800,  '7': 1200, '8': 1800,
			'9': 2500, '10': 3500, '11': 5000, '12': 7000,
			'13': 9500, '14': 12000
		},
		min_level_required: 5,
		base_stats: { level: 30, hp: 240, atk: 18, def: 12 },
		description: {
			de: 'Theobalds rechte Hand ist bis zum Ellbogen grau wie Asche – das Ergebnis eines Experiments mit Drachen-Gallenflüssigkeit. Er nennt es seinen "Berufsunfall" und benutzt die Hand noch immer.',
			en: 'Theobald\'s right hand is grey as ash up to the elbow – the result of an experiment with dragon bile. He calls it his "occupational accident" and still uses the hand.'
		}
	},
	{
		slug: 'trainer_heilkunde_serena',
		name: { de: 'Wundheilerin Serena Silberhand', en: 'Wound Healer Serena Silverhand' },
		type: 'trainer',
		faction_slug: 'kaiserreich_aethelgard',
		location: {
			name: { de: 'Æthelhafen – Heiligenhospiz zum Weißen Licht', en: 'Æthelhafen – White Light Hospice' },
			tile: 'tile_32_10',
			world: { x: 5230, y: 0, z: 16560 }
		},
		teaches: ['heilkunde_wunden'],
		max_teach_level: 14,
		cost_per_level: {
			'1': 0,   '2': 50,   '3': 150,  '4': 300,
			'5': 500, '6': 800,  '7': 1200, '8': 1800,
			'9': 2500, '10': 3500, '11': 5000, '12': 7000,
			'13': 9500, '14': 12000
		},
		min_level_required: 5,
		base_stats: { level: 25, hp: 220, atk: 10, def: 15 },
		description: {
			de: 'Serena hat mehr Sterbende zurück ins Leben gezogen als die meisten Krieger je getötet haben. Ihre Schüler lernen: Es gibt keinen Unterschied zwischen einem Schlachtfeld-Verbandstisch und einem Operationstisch – nur die Messerschärfe.',
			en: 'Serena has pulled more dying souls back to the living than most warriors have ever killed. Her students learn: there is no difference between a battlefield dressing table and an operating table – only the sharpness of the knife.'
		}
	},

	// ════════════════════════════════════════════════════════════════════════════
	// GOLDSTRAND / SPAWN  ·  tile_20_45  ·  Kaiserliches Kernland (Neulingen)
	// ════════════════════════════════════════════════════════════════════════════

	{
		slug: 'trainer_raufen_oswald',
		name: { de: 'Wächter Oswald Graubart', en: 'Watchman Oswald Greybeard' },
		type: 'trainer',
		faction_slug: 'kaiserreich_aethelgard',
		location: {
			name: { de: 'Goldstrand – Wachposten am Stadttor', en: 'Goldstrand – Gatehouse Watch Post' },
			tile: 'tile_20_45',
			world: { x: 22950, y: 0, z: 10180 }
		},
		teaches: ['raufen'],
		max_teach_level: 4,
		cost_per_level: { '1': 0, '2': 50, '3': 150, '4': 300 },
		intro_quest: 'quest_erste_schritte_im_kampf',
		min_level_required: 0,
		base_stats: { level: 12, hp: 150, atk: 12, def: 10 },
		description: {
			de: 'Oswald hat in dreißig Jahren Dienst keine einzige Klinge gezogen – er hat jeden Streit mit Fäusten und gelegentlich mit seinem Knie gelöst. Er ist überzeugt, das sei die ehrlichste Form der Diplomatie.',
			en: 'Oswald has not drawn a single blade in thirty years of service – he has settled every dispute with fists and the occasional knee. He is convinced that is the most honest form of diplomacy.'
		}
	},
	{
		slug: 'trainer_gesellschaft_agathe',
		name: { de: 'Hofmeisterin Agathe Seidenzunge', en: 'Stewardess Agathe Silktongue' },
		type: 'trainer',
		faction_slug: 'kaiserreich_aethelgard',
		location: {
			name: { de: 'Goldstrand – Gasthaus "Zum Goldenen Anker"', en: 'Goldstrand – "The Golden Anchor" Inn' },
			tile: 'tile_20_45',
			world: { x: 23020, y: 0, z: 10260 }
		},
		teaches: ['menschenkunde', 'betoeren'],
		max_teach_level: 4,
		cost_per_level: { '1': 0, '2': 50, '3': 150, '4': 300 },
		intro_quest: 'quest_menschen_lesen',
		min_level_required: 0,
		base_stats: { level: 14, hp: 130, atk: 6, def: 8 },
		description: {
			de: 'Agathe erkennt Lügner an ihren Augenbrauen und Verliebte an ihrer Stimme. Sie war zwanzig Jahre Hofmeisterin in der Hauptstadt und weiß, dass jedes Geheimnis ein Preis hat.',
			en: 'Agathe spots liars by their eyebrows and the lovestruck by their voice. She was the Emperor\'s stewardess for twenty years and knows that every secret has a price.'
		}
	},
	{
		slug: 'trainer_haendlerin_miriam',
		name: { de: 'Händlerin Miriam Klüger', en: 'Merchant Miriam Shrewd' },
		type: 'trainer',
		faction_slug: 'suedbund',
		location: {
			name: { de: 'Goldstrand – Marktplatz der Winde', en: 'Goldstrand – Windswept Market Square' },
			tile: 'tile_20_45',
			world: { x: 23080, y: 0, z: 10310 }
		},
		teaches: ['feilschen', 'gassenwissen'],
		max_teach_level: 4,
		cost_per_level: { '1': 0, '2': 50, '3': 150, '4': 300 },
		intro_quest: 'quest_erster_handel',
		min_level_required: 0,
		base_stats: { level: 11, hp: 110, atk: 7, def: 5 },
		description: {
			de: 'Miriam hat in jeder größeren Stadt Aethelgards einen Stand betrieben und kennt die schmutzigen Geheimnisse aller Zollstationen. Sie lehrt, was keine Schule lehrt: wo das echte Geld liegt.',
			en: 'Miriam has run a stall in every major city of Aethelgard and knows the dirty secrets of every customs post. She teaches what no school teaches: where the real money is.'
		}
	},
	{
		slug: 'trainer_heiler_anselm',
		name: { de: 'Bruder Anselm Weißbinde', en: 'Brother Anselm Whitebandage' },
		type: 'trainer',
		faction_slug: 'kaiserreich_aethelgard',
		location: {
			name: { de: 'Goldstrand – Kapelle des Lichts', en: 'Goldstrand – Chapel of Light' },
			tile: 'tile_20_45',
			world: { x: 22980, y: 0, z: 10350 }
		},
		teaches: ['heilkunde_wunden'],
		max_teach_level: 4,
		cost_per_level: { '1': 0, '2': 50, '3': 150, '4': 300 },
		intro_quest: 'quest_erste_hilfe',
		min_level_required: 0,
		base_stats: { level: 10, hp: 120, atk: 4, def: 8 },
		description: {
			de: 'Anselm behandelt jeden, egal ob Mensch, Zwerg oder entlaufener Sklave. Er fragt nicht nach Namen, nicht nach Geld – nur nach dem Leid. Sein Verband sitzt immer perfekt.',
			en: 'Anselm treats everyone, regardless of whether they are human, dwarf, or runaway slave. He asks for no names, no money – only about the pain. His bandages always sit perfectly.'
		}
	},
	{
		slug: 'trainer_koechin_marjolein',
		name: { de: 'Küchenchefin Marjolein Löffelschwung', en: 'Head Cook Marjolein Ladle-Swing' },
		type: 'trainer',
		faction_slug: 'kaiserreich_aethelgard',
		location: {
			name: { de: 'Goldstrand – Taverne "Zum Fetten Keiler"', en: 'Goldstrand – "The Fat Boar" Tavern' },
			tile: 'tile_20_45',
			world: { x: 23050, y: 0, z: 10200 }
		},
		teaches: ['kochen', 'ackerbau'],
		max_teach_level: 4,
		cost_per_level: { '1': 0, '2': 50, '3': 150, '4': 300 },
		intro_quest: 'quest_erste_mahlzeit',
		min_level_required: 0,
		base_stats: { level: 10, hp: 105, atk: 5, def: 4 },
		description: {
			de: 'Marjolein versorgt seit zwanzig Jahren die halbe Stadt und weiß genau, in welchem Boden welches Gemüse am besten gedeiht. Wer bei ihr lernt, überlebt auch den härtesten Winter.',
			en: 'Marjolein has been feeding half the city for twenty years and knows exactly in which soil which vegetable thrives best. Those who learn from her survive even the hardest winter.'
		}
	},
	{
		slug: 'trainer_alchimie_gregor',
		name: { de: 'Alchimist Gregor Rauchglas', en: 'Alchemist Gregor Smokeglass' },
		type: 'trainer',
		faction_slug: 'kaiserreich_aethelgard',
		location: {
			name: { de: 'Goldstrand – Apotheke "Zum Roten Tropfen"', en: 'Goldstrand – "The Red Drop" Apothecary' },
			tile: 'tile_20_45',
			world: { x: 23100, y: 0, z: 10390 }
		},
		teaches: ['alchimie'],
		max_teach_level: 4,
		cost_per_level: { '1': 0, '2': 50, '3': 150, '4': 300 },
		intro_quest: 'quest_erste_brauerei',
		min_level_required: 0,
		base_stats: { level: 12, hp: 115, atk: 8, def: 6 },
		description: {
			de: 'Gregors Werkstatt riecht nach Schwefel und verbrannten Hoffnungen. Er verkauft Tränke zweiter Klasse, aber seine Grundausbildung ist solide – kein Schüler hat bisher explodiert.',
			en: 'Gregor\'s workshop smells of sulphur and burned hopes. He sells second-rate potions, but his basic instruction is solid – no student has exploded yet.'
		}
	},

	// ════════════════════════════════════════════════════════════════════════════
	// FROSTFANG-KAMM  ·  tile_05_15  ·  Skjaldar-Nordlande
	// ════════════════════════════════════════════════════════════════════════════

	{
		slug: 'trainer_sinne_runa',
		name: { de: 'Seherin Runa Traumwandlerin', en: 'Seeress Runa Dreamwalker' },
		type: 'trainer',
		faction_slug: 'skjaldar',
		location: {
			name: { de: 'Frostfang-Kamm – Runensteinkreis der Weisen', en: 'Frostfang Ridge – Wise-Ones\' Runestone Circle' },
			tile: 'tile_05_15',
			world: { x: 7640, y: 490, z: 2590 }
		},
		teaches: ['selbstbeherrschung', 'sinnesschaerfe'],
		max_teach_level: 4,
		cost_per_level: { '1': 0, '2': 50, '3': 150, '4': 300 },
		intro_quest: 'quest_sinne_schaerfen',
		min_level_required: 0,
		base_stats: { level: 22, hp: 190, atk: 12, def: 14 },
		description: {
			de: 'Runa schläft nie wirklich – sie wandert in Träumen durch Zeiten, die noch nicht geschehen sind. Sie lehrt, den eigenen Schmerz zu bändigen und zu hören, was der Frost flüstert.',
			en: 'Runa never truly sleeps – she wanders in dreams through times that have not yet come. She teaches how to bridle one\'s own pain and to hear what the frost whispers.'
		}
	},
	{
		slug: 'trainer_kueste_ulf',
		name: { de: 'Seefahrer Ulf Salzwasser', en: 'Seafarer Ulf Saltwater' },
		type: 'trainer',
		faction_slug: 'skjaldar',
		location: {
			name: { de: 'Frostfang-Kamm – Anlegesteg der Drachenboote', en: 'Frostfang Ridge – Dragonboat Pier' },
			tile: 'tile_05_15',
			world: { x: 7750, y: 420, z: 2680 }
		},
		teaches: ['schwimmen', 'fesseln'],
		max_teach_level: 4,
		cost_per_level: { '1': 0, '2': 50, '3': 150, '4': 300 },
		intro_quest: 'quest_in_die_fluten',
		min_level_required: 0,
		base_stats: { level: 16, hp: 170, atk: 14, def: 10 },
		description: {
			de: 'Ulf ist dreimal ertrunken und dreimal aufgewacht. Er sagt, das Meer habe ihn nicht gewollt. Er unterrichtet Schwimmen und die Kunst des Knotens – weil beides Leben rettet, wenn man vor dem Erfrieren steht.',
			en: 'Ulf has drowned three times and woken up three times. He says the sea did not want him. He teaches swimming and the art of knotting – because both save lives when you are staring at hypothermia.'
		}
	},
	{
		slug: 'trainer_stangenwaffen_sigrun',
		name: { de: 'Schildmaid Sigrun Walkürenblut', en: 'Shield Maiden Sigrun Valkyrie-blood' },
		type: 'trainer',
		faction_slug: 'skjaldar',
		location: {
			name: { de: 'Frostfang-Kamm – Kriegshalle der Jarl', en: 'Frostfang Ridge – Jarl\'s War Hall' },
			tile: 'tile_05_15',
			world: { x: 7820, y: 510, z: 2760 }
		},
		teaches: ['stangenwaffen'],
		max_teach_level: 4,
		cost_per_level: { '1': 0, '2': 50, '3': 150, '4': 300 },
		intro_quest: 'quest_speer_erste_lektion',
		min_level_required: 0,
		base_stats: { level: 20, hp: 240, atk: 20, def: 18 },
		description: {
			de: 'Sigrun behauptet, von einer Walküre abstammen, und niemand, der ihr Speer gesehen hat, zweifelt ernsthaft daran. Sie lehrt den Speer nicht als Werkzeug – sondern als Verlängerung des Willens.',
			en: 'Sigrun claims to be descended from a Valkyrie, and nobody who has seen her spear work seriously doubts it. She teaches the spear not as a tool – but as an extension of the will.'
		}
	},
	{
		slug: 'trainer_schmied_thordar',
		name: { de: 'Schmied Thordar Feuerfunke', en: 'Smith Thordar Firespark' },
		type: 'trainer',
		faction_slug: 'skjaldar',
		location: {
			name: { de: 'Frostfang-Kamm – Schmiede unter dem Felsdach', en: 'Frostfang Ridge – Smith Under the Rock Shelf' },
			tile: 'tile_05_15',
			world: { x: 7960, y: 460, z: 2850 }
		},
		teaches: ['grobschmied'],
		max_teach_level: 4,
		cost_per_level: { '1': 0, '2': 50, '3': 150, '4': 300 },
		intro_quest: 'quest_hammer_und_amboss',
		min_level_required: 0,
		base_stats: { level: 18, hp: 200, atk: 16, def: 14 },
		description: {
			de: 'Thordar schmiedet Waffen aus Meteoreisen, das er im Frostfang-Gletscher findet. Sein Amboss steht seit vier Generationen am selben Platz. Er verlangt von Schülern, dass sie selbst Kohle hacken, bevor sie den Hammer anfassen dürfen.',
			en: 'Thordar forges weapons from meteor iron he finds in the Frostfang glacier. His anvil has stood in the same spot for four generations. He requires students to chop their own coal before they are allowed to touch the hammer.'
		}
	},
	{
		slug: 'trainer_zweihand_bjornulf',
		name: { de: 'Jarl-Krieger Björnulf Eisensturm', en: 'Jarl-Warrior Björnulf Ironstorm' },
		type: 'trainer',
		faction_slug: 'skjaldar',
		location: {
			name: { de: 'Frostfang-Kamm – Kriegshalle der Jarl', en: 'Frostfang Ridge – Jarl\'s War Hall' },
			tile: 'tile_05_15',
			world: { x: 7800, y: 520, z: 2740 }
		},
		teaches: ['zweihandschwerter'],
		max_teach_level: 18,
		cost_per_level: {
			'1': 0,   '2': 50,   '3': 150,  '4': 300,
			'5': 500, '6': 800,  '7': 1200, '8': 1800,
			'9': 2500, '10': 3500, '11': 5000, '12': 7000,
			'13': 9500, '14': 12000, '15': 15000, '16': 20000,
			'17': 25000, '18': 32000
		},
		intro_quest: 'quest_zweihaender_einweihung',
		min_level_required: 0,
		base_stats: { level: 45, hp: 720, atk: 55, def: 38 },
		description: {
			de: 'Björnulf hat seinen Zweihänder "Sturmbrüller" in dreizehn Schlachten getragen und nie jemanden zweimal schlagen müssen. Er ist der einzige lebende Meister der alten Skjaldar-Klingentänze und nimmt nur jene als Schüler an, die seinen Blick nicht senken.',
			en: 'Björnulf has carried his greatsword "Stormroar" through thirteen battles and has never needed to strike anyone twice. He is the only living master of the ancient Skjaldar blade-dances and only accepts as students those who do not lower their gaze before him.'
		}
	},
	{
		slug: 'trainer_jagd_freydis',
		name: { de: 'Jägerin Freydis Weitblick', en: 'Huntress Freydis Farsight' },
		type: 'trainer',
		faction_slug: 'skjaldar',
		location: {
			name: { de: 'Frostfang-Kamm – Jägercamp am Gletscherrand', en: 'Frostfang Ridge – Hunter\'s Camp at the Glacier\'s Edge' },
			tile: 'tile_05_15',
			world: { x: 7680, y: 650, z: 2920 }
		},
		teaches: ['bogen', 'tierkunde'],
		max_teach_level: 14,
		cost_per_level: {
			'1': 0,   '2': 50,   '3': 150,  '4': 300,
			'5': 500, '6': 800,  '7': 1200, '8': 1800,
			'9': 2500, '10': 3500, '11': 5000, '12': 7000,
			'13': 9500, '14': 12000
		},
		min_level_required: 5,
		base_stats: { level: 32, hp: 320, atk: 34, def: 20 },
		description: {
			de: 'Freydis liest Tierspuren wie andere Menschen Bücher – und Bücher hat sie nie gelesen. Sie weiß, welcher Adler ein Auge auf einen trägt und warum die Rentiere plötzlich westwärts laufen. Das bedeutet meist, dass etwas Schlimmeres aus dem Osten kommt.',
			en: 'Freydis reads animal tracks the way other people read books – and she has never read a book. She knows which eagle has an eye on you and why the reindeer are suddenly running west. That usually means something worse is coming from the east.'
		}
	},
	{
		slug: 'trainer_kampf_ragnar',
		name: { de: 'Speerwurf-Meister Ragnar Lanzenarm', en: 'Spear-throw Master Ragnar Lancearm' },
		type: 'trainer',
		faction_slug: 'skjaldar',
		location: {
			name: { de: 'Frostfang-Kamm – Kriegshalle der Jarl', en: 'Frostfang Ridge – Jarl\'s War Hall' },
			tile: 'tile_05_15',
			world: { x: 7810, y: 505, z: 2755 }
		},
		teaches: ['stangenwaffen', 'hiebwaffen'],
		max_teach_level: 10,
		cost_per_level: {
			'1': 0,   '2': 50,  '3': 150, '4': 300,
			'5': 500, '6': 800, '7': 1200, '8': 1800,
			'9': 2500, '10': 3500
		},
		min_level_required: 5,
		base_stats: { level: 30, hp: 380, atk: 32, def: 24 },
		description: {
			de: 'Ragnars Arm ist der Legende nach von Odin selbst gestärkt worden. Er kann einen Speer hundert Schritte weit in ein Eichenholztor rammen. Er lehrt keine Finesse – er lehrt Wucht.',
			en: 'Ragnar\'s arm is said by legend to have been strengthened by Odin himself. He can drive a spear a hundred paces into an oak gate. He teaches no finesse – he teaches force.'
		}
	},

	// ════════════════════════════════════════════════════════════════════════════
	// SCHATTENWALD  ·  tile_25_10  ·  Feynir / Alben Nacht
	// ════════════════════════════════════════════════════════════════════════════

	{
		slug: 'trainer_waldlaeufer_aelindra',
		name: { de: 'Feynir-Waldläuferin Aelindra Windschritt', en: 'Feynir Ranger Aelindra Windstep' },
		type: 'trainer',
		faction_slug: 'feynir',
		location: {
			name: { de: 'Schattenwald – Feynir-Grenzposten Immergrün', en: 'Shadowwood – Feynir Border Post Evergreen' },
			tile: 'tile_25_10',
			world: { x: 5080, y: 0, z: 12780 }
		},
		teaches: ['klettern', 'koerperbeherrschung'],
		max_teach_level: 4,
		cost_per_level: { '1': 0, '2': 50, '3': 150, '4': 300 },
		intro_quest: 'quest_erster_aufstieg',
		min_level_required: 0,
		base_stats: { level: 20, hp: 200, atk: 18, def: 14 },
		description: {
			de: 'Aelindra bewegt sich durch den Wald wie ein Schatten durch Wasser. Sie lehrt nicht mit Worten, sondern mit Beispielen – und wer nicht aufpasst, findet sich plötzlich fünfzehn Meter hoch in einem Ast.',
			en: 'Aelindra moves through the forest like a shadow through water. She does not teach with words but with examples – and those who are not paying attention suddenly find themselves fifteen metres up in a branch.'
		}
	},
	{
		slug: 'trainer_kraeuterhexe_thessalyn',
		name: { de: 'Kräuterhexe Thessalyn Mondblatt', en: 'Herb-witch Thessalyn Moonleaf' },
		type: 'trainer',
		faction_slug: 'feynir',
		location: {
			name: { de: 'Schattenwald – Heilige Lichtung der Alten Eiche', en: 'Shadowwood – Sacred Clearing of the Old Oak' },
			tile: 'tile_25_10',
			world: { x: 5190, y: 0, z: 12860 }
		},
		teaches: ['pflanzenkunde', 'tierkunde'],
		max_teach_level: 4,
		cost_per_level: { '1': 0, '2': 50, '3': 150, '4': 300 },
		intro_quest: 'quest_kraeuter_sammeln',
		min_level_required: 0,
		base_stats: { level: 18, hp: 165, atk: 10, def: 12 },
		description: {
			de: 'Thessalyn trägt immer ein Dutzend lebende Käfer in ihren Taschen, zur Studie. Sie weiß, welche Pilze töten und welche heilen – oft ist es die Dosis. Tiere meiden sie, weil sie ihre Sprache spricht.',
			en: 'Thessalyn always carries a dozen live beetles in her pockets, for study. She knows which mushrooms kill and which heal – often it is the dose. Animals avoid her because she speaks their language.'
		}
	},
	{
		slug: 'trainer_schleicher_shadryn',
		name: { de: 'Schleicher Shadryn Nachtfinger', en: 'Skulker Shadryn Nightfinger' },
		type: 'trainer',
		faction_slug: 'alben_nacht',
		location: {
			name: { de: 'Schattenwald – Versteck im Hohlen Baum', en: 'Shadowwood – Hideout in the Hollow Tree' },
			tile: 'tile_25_10',
			world: { x: 5340, y: 0, z: 13050 }
		},
		teaches: ['schloesser_knacken', 'dolche'],
		max_teach_level: 4,
		cost_per_level: { '1': 0, '2': 50, '3': 150, '4': 300 },
		intro_quest: 'quest_verbotene_tuer',
		min_level_required: 0,
		base_stats: { level: 17, hp: 155, atk: 16, def: 10 },
		description: {
			de: 'Shadryn hat neun von zehn Schlössern in Aethelgard bereits geöffnet. Das zehnte öffnet er nächste Woche. Er fragt nie, warum jemand lernen will, eine Tür zu öffnen – aber er fragt immer, welche Tür.',
			en: 'Shadryn has already opened nine out of ten locks in Aethelgard. He will open the tenth next week. He never asks why someone wants to learn to open a door – but he always asks which door.'
		}
	},
	{
		slug: 'trainer_einschuechtern_varek',
		name: { de: 'Schwarzfaust Varek Schattenklinge', en: 'Blackfist Varek Shadowblade' },
		type: 'trainer',
		faction_slug: 'alben_nacht',
		location: {
			name: { de: 'Schattenwald – Taverne "Zur Blinden Laterne"', en: 'Shadowwood – "The Blind Lantern" Tavern' },
			tile: 'tile_25_10',
			world: { x: 5460, y: 0, z: 13150 }
		},
		teaches: ['einschuechtern'],
		max_teach_level: 4,
		cost_per_level: { '1': 0, '2': 50, '3': 150, '4': 300 },
		intro_quest: 'quest_drohung_und_statur',
		min_level_required: 0,
		base_stats: { level: 22, hp: 260, atk: 22, def: 16 },
		description: {
			de: 'Varek redet selten. Wenn er redet, hören alle zu. Er lehrt nicht, laut zu brüllen – er lehrt, wie man eine Stille füllt, bis sie schwerer ist als Blei.',
			en: 'Varek rarely speaks. When he speaks, everyone listens. He does not teach shouting loudly – he teaches how to fill a silence until it is heavier than lead.'
		}
	},
	{
		slug: 'trainer_magie_cyrindel',
		name: { de: 'Waldmagier Cyrindel Sternenruf', en: 'Forest Mage Cyrindel Starcall' },
		type: 'trainer',
		faction_slug: 'feynir',
		location: {
			name: { de: 'Schattenwald – Magierturm Silberdorn', en: 'Shadowwood – Mage Tower Silverthorn' },
			tile: 'tile_25_10',
			world: { x: 5020, y: 0, z: 12720 }
		},
		teaches: ['magiekunde'],
		max_teach_level: 22,
		cost_per_level: {
			'1': 0,    '2': 50,   '3': 150,  '4': 300,
			'5': 500,  '6': 800,  '7': 1200, '8': 1800,
			'9': 2500, '10': 3500, '11': 5000, '12': 7000,
			'13': 9500, '14': 12000, '15': 15000, '16': 20000,
			'17': 25000, '18': 32000, '19': 40000, '20': 50000,
			'21': 65000, '22': 80000
		},
		intro_quest: 'quest_erste_runen',
		min_level_required: 0,
		base_stats: { level: 55, hp: 850, atk: 60, def: 45 },
		description: {
			de: 'Cyrindel ist uralt – niemand weiß, wie alt. Sein Turm existiert im Schattenwald seit vor der Reichsgründung. Er ist der einzige bekannte lebende Lehrer für echte Magiekunde und nimmt nur Schüler an, die er selbst im Traum aufsucht.',
			en: 'Cyrindel is ancient – nobody knows how old. His tower has existed in the Shadowwood since before the Empire\'s founding. He is the only known living teacher of true Arcane Lore and only accepts students whom he visits himself in dreams.'
		}
	},
	{
		slug: 'trainer_schatten_kiyra',
		name: { de: 'Schattenschleicherin Kiyra Nebelschritt', en: 'Shadow Stalker Kiyra Mistfoot' },
		type: 'trainer',
		faction_slug: 'alben_nacht',
		location: {
			name: { de: 'Schattenwald – Versteck im Hohlen Baum', en: 'Shadowwood – Hideout in the Hollow Tree' },
			tile: 'tile_25_10',
			world: { x: 5350, y: 0, z: 13060 }
		},
		teaches: ['dolche', 'schloesser_knacken'],
		max_teach_level: 14,
		cost_per_level: {
			'1': 0,   '2': 50,   '3': 150,  '4': 300,
			'5': 500, '6': 800,  '7': 1200, '8': 1800,
			'9': 2500, '10': 3500, '11': 5000, '12': 7000,
			'13': 9500, '14': 12000
		},
		min_level_required: 5,
		base_stats: { level: 33, hp: 310, atk: 36, def: 22 },
		description: {
			de: 'Kiyra hat noch niemanden getötet, der es nicht verdient hätte – sagt sie. Sie lehrt den Dolch als Präzisionsinstrument, nicht als Schlachtwaffe. Und Schlösser sind für sie Rätsel, die der Hersteller bereits gelöst hat.',
			en: 'Kiyra has never killed anyone who did not deserve it – so she says. She teaches the dagger as a precision instrument, not a slaughter weapon. And locks are to her merely puzzles that the manufacturer has already solved.'
		}
	},

	// ════════════════════════════════════════════════════════════════════════════
	// SILBERTHAL  ·  tile_15_12  ·  Nordfolk / Kaiserreich Grenzland
	// ════════════════════════════════════════════════════════════════════════════

	{
		slug: 'trainer_gerber_kaspar',
		name: { de: 'Gerber Kaspar Braunhand', en: 'Tanner Kaspar Brownhand' },
		type: 'trainer',
		faction_slug: 'nordfolk',
		location: {
			name: { de: 'Silberthal – Gerberei am Fluss', en: 'Silvervale – Tannery by the River' },
			tile: 'tile_15_12',
			world: { x: 6050, y: 0, z: 7650 }
		},
		teaches: ['lederbearbeitung'],
		max_teach_level: 4,
		cost_per_level: { '1': 0, '2': 50, '3': 150, '4': 300 },
		intro_quest: 'quest_erstes_fell',
		min_level_required: 0,
		base_stats: { level: 12, hp: 130, atk: 10, def: 8 },
		description: {
			de: 'Kaspars Hände sind dauerhaft bräunlich gefärbt von der Lohe, und er riecht nach gerbsäure. Seine Lederwaren halten ein Leben lang – und er besteht darauf, das zu beweisen, indem er noch die Stücke seines Großvaters trägt.',
			en: 'Kaspar\'s hands are permanently stained brown from the tanbark, and he smells of tannin. His leatherwork lasts a lifetime – and he insists on proving it by still wearing pieces made by his grandfather.'
		}
	},
	{
		slug: 'trainer_zimmermann_gottfried',
		name: { de: 'Zimmermann Gottfried Birkmann', en: 'Carpenter Gottfried Birchman' },
		type: 'trainer',
		faction_slug: 'nordfolk',
		location: {
			name: { de: 'Silberthal – Schreinerei am Marktplatz', en: 'Silvervale – Joinery at the Market Square' },
			tile: 'tile_15_12',
			world: { x: 6180, y: 0, z: 7720 }
		},
		teaches: ['holzbearbeitung'],
		max_teach_level: 4,
		cost_per_level: { '1': 0, '2': 50, '3': 150, '4': 300 },
		intro_quest: 'quest_erstes_schnitzwerk',
		min_level_required: 0,
		base_stats: { level: 11, hp: 120, atk: 9, def: 7 },
		description: {
			de: 'Gottfried hat den halben Ort gebaut – die Brücke, die Mühle, den Glockenturm. Er sagt, Holz sei lebendig, und man müsse zuhören, was es werden will. Wer das versteht, schnitzt keine Pfeile. Er schafft Kunstwerke.',
			en: 'Gottfried built half of the settlement – the bridge, the mill, the bell tower. He says wood is alive and one must listen to what it wants to become. Those who understand that do not carve arrows. They create works of art.'
		}
	},
	{
		slug: 'trainer_fischer_erwin',
		name: { de: 'Fischer Erwin Angelhaken', en: 'Fisherman Erwin Hookline' },
		type: 'trainer',
		faction_slug: 'nordfolk',
		location: {
			name: { de: 'Silberthal – Fischeranlegesteg am Silbersee', en: 'Silvervale – Fisherman\'s Pier at Silverlake' },
			tile: 'tile_15_12',
			world: { x: 6280, y: 0, z: 7950 }
		},
		teaches: ['fischen_angeln'],
		max_teach_level: 4,
		cost_per_level: { '1': 0, '2': 50, '3': 150, '4': 300 },
		intro_quest: 'quest_erster_fang',
		min_level_required: 0,
		base_stats: { level: 10, hp: 100, atk: 6, def: 5 },
		description: {
			de: 'Erwin ist ein geduldiger Mann. Sehr geduldig. Er kann stundenlang schweigen und warten, bis der Fisch beißt. Er verlangt dasselbe von seinen Schülern – und die meisten gehen innerhalb der ersten Stunde.',
			en: 'Erwin is a patient man. Very patient. He can sit in silence for hours waiting for the fish to bite. He demands the same from his students – and most leave within the first hour.'
		}
	},
	{
		slug: 'trainer_reitlehrer_konrad',
		name: { de: 'Reitmeister Konrad Steigbügel', en: 'Riding Master Konrad Stirrupfoot' },
		type: 'trainer',
		faction_slug: 'kaiserreich_aethelgard',
		location: {
			name: { de: 'Silberthal – Reitschule am Weißen Feld', en: 'Silvervale – Riding School at White Field' },
			tile: 'tile_15_12',
			world: { x: 6120, y: 0, z: 7820 }
		},
		teaches: ['reiten'],
		max_teach_level: 4,
		cost_per_level: { '1': 0, '2': 50, '3': 150, '4': 300 },
		intro_quest: 'quest_erstes_reiterlebnis',
		min_level_required: 0,
		base_stats: { level: 14, hp: 140, atk: 12, def: 9 },
		description: {
			de: 'Konrad spricht mehr mit Pferden als mit Menschen und behauptet, erstere seien die besseren Gesprächspartner. Er hat noch jeden Sturm seiner Reitstunde überlebt – wenngleich mit Prellungen.',
			en: 'Konrad speaks more to horses than to people and claims the former are the better conversationalists. He has survived every riding lesson thunderstorm so far – albeit with bruises.'
		}
	},
	{
		slug: 'trainer_bard_silvanus',
		name: { de: 'Wanderbard Silvanus Silberzunge', en: 'Wandering Bard Silvanus Silvertongue' },
		type: 'trainer',
		faction_slug: 'kaiserreich_aethelgard',
		location: {
			name: { de: 'Silberthal – Gasthaus "Zur Tanzenden Flamme"', en: 'Silvervale – "The Dancing Flame" Inn' },
			tile: 'tile_15_12',
			world: { x: 6200, y: 0, z: 7790 }
		},
		teaches: ['sagen_legenden', 'menschenkunde'],
		max_teach_level: 10,
		cost_per_level: {
			'1': 0,   '2': 50,  '3': 150, '4': 300,
			'5': 500, '6': 800, '7': 1200, '8': 1800,
			'9': 2500, '10': 3500
		},
		min_level_required: 5,
		base_stats: { level: 26, hp: 230, atk: 14, def: 14 },
		description: {
			de: 'Silvanus war bei der Belagerung von Eisenmeer-Festung dabei, hat die Drachenjagd von 842 überlebt und kennt jeden Jahrmarkt zwischen den Freien Fjorden und dem Südbund. Er singt Geschichten – und jede ist wahr, auch die unglaublichsten.',
			en: 'Silvanus was at the siege of Ironshore Fortress, survived the Dragon Hunt of 842, and knows every fair between the Free Fjords and the Southern League. He sings stories – and every one is true, even the most unbelievable.'
		}
	},

	// ════════════════════════════════════════════════════════════════════════════
	// KÖNIGSBUCHT  ·  tile_38_38  ·  Zahiri / Südbund
	// ════════════════════════════════════════════════════════════════════════════

	{
		slug: 'trainer_haendler_tarek',
		name: { de: 'Kaufmann Tarek al-Salim', en: 'Merchant Tarek al-Salim' },
		type: 'trainer',
		faction_slug: 'zahiri',
		location: {
			name: { de: 'Königsbucht – Zahiri-Handelsviertel am Pier', en: 'King\'s Bay – Zahiri Trade Quarter at the Pier' },
			tile: 'tile_38_38',
			world: { x: 19320, y: 0, z: 19450 }
		},
		teaches: ['feilschen', 'gassenwissen'],
		max_teach_level: 4,
		cost_per_level: { '1': 0, '2': 50, '3': 150, '4': 300 },
		intro_quest: 'quest_stadtflucht',
		min_level_required: 0,
		base_stats: { level: 13, hp: 120, atk: 8, def: 7 },
		description: {
			de: 'Tarek ist in acht Städten geboren – je nachdem, wen man fragt. Er kennt die Gassen von Königsbucht besser als die Stadtwache und weiß, wann man mit dem Preis hochgeht und wann man das Weite sucht.',
			en: 'Tarek was born in eight different cities – depending on whom you ask. He knows the alleys of King\'s Bay better than the city guard and knows when to raise the price and when to make yourself scarce.'
		}
	},
	{
		slug: 'trainer_haendlerin_amara',
		name: { de: 'Händlerfürstin Amara al-Rashida', en: 'Merchant Princess Amara al-Rashida' },
		type: 'trainer',
		faction_slug: 'zahiri',
		location: {
			name: { de: 'Königsbucht – Kontor der Goldenen Waage', en: 'King\'s Bay – Counting House of the Golden Scale' },
			tile: 'tile_38_38',
			world: { x: 19500, y: 0, z: 19600 }
		},
		teaches: ['feilschen', 'ueberzeugen'],
		max_teach_level: 14,
		cost_per_level: {
			'1': 0,   '2': 50,   '3': 150,  '4': 300,
			'5': 500, '6': 800,  '7': 1200, '8': 1800,
			'9': 2500, '10': 3500, '11': 5000, '12': 7000,
			'13': 9500, '14': 12000
		},
		min_level_required: 5,
		base_stats: { level: 30, hp: 260, atk: 16, def: 18 },
		description: {
			de: 'Amara kontrolliert den Gewürzhandel in drei Küstenprovinzen und hat bereits zwei Handelskriege verhindert – durch das richtige Wort zum richtigen Moment. Sie lehrt, dass Überzeugung keine Manipulation ist. Es ist Architektur.',
			en: 'Amara controls the spice trade in three coastal provinces and has already prevented two trade wars – through the right word at the right moment. She teaches that persuasion is not manipulation. It is architecture.'
		}
	},
	{
		slug: 'trainer_wahrsagerin_jasmine',
		name: { de: 'Wahrsagerin Jasmine bint-Mira', en: 'Soothsayer Jasmine bint-Mira' },
		type: 'trainer',
		faction_slug: 'zahiri',
		location: {
			name: { de: 'Königsbucht – Zelt der tausend Sterne', en: 'King\'s Bay – Tent of a Thousand Stars' },
			tile: 'tile_38_38',
			world: { x: 19420, y: 0, z: 19680 }
		},
		teaches: ['betoeren', 'gassenwissen'],
		max_teach_level: 10,
		cost_per_level: {
			'1': 0,   '2': 50,  '3': 150, '4': 300,
			'5': 500, '6': 800, '7': 1200, '8': 1800,
			'9': 2500, '10': 3500
		},
		min_level_required: 5,
		base_stats: { level: 24, hp: 200, atk: 12, def: 14 },
		description: {
			de: 'Jasmine liest keine Karten – sie liest Menschen. Ein Lächeln, eine zögernde Hand, ein zu lautes Lachen: Sie kennt die Sprache der Schwäche und lehrt, sie zum eigenen Vorteil zu nutzen.',
			en: 'Jasmine reads no cards – she reads people. A smile, a hesitant hand, a laugh that is too loud: she knows the language of weakness and teaches how to use it to one\'s own advantage.'
		}
	},
	{
		slug: 'trainer_kartograph_rashid',
		name: { de: 'Kartograph Rashid ibn Kalil', en: 'Cartographer Rashid ibn Kalil' },
		type: 'trainer',
		faction_slug: 'zahiri',
		location: {
			name: { de: 'Königsbucht – Kontor der Goldenen Waage', en: 'King\'s Bay – Counting House of the Golden Scale' },
			tile: 'tile_38_38',
			world: { x: 19550, y: 0, z: 19560 }
		},
		teaches: ['geographie', 'orientierung'],
		max_teach_level: 10,
		cost_per_level: {
			'1': 0,   '2': 50,  '3': 150, '4': 300,
			'5': 500, '6': 800, '7': 1200, '8': 1800,
			'9': 2500, '10': 3500
		},
		min_level_required: 5,
		base_stats: { level: 22, hp: 190, atk: 10, def: 12 },
		description: {
			de: 'Rashids Karten sind die genauesten im ganzen Reich – er hat jede Küstenlinie persönlich vermessen. Er weiß auch, welche Gebiete auf offiziellen Karten fehlen, und warum.',
			en: 'Rashid\'s maps are the most accurate in the entire Empire – he has personally surveyed every coastline. He also knows which territories are missing from official maps, and why.'
		}
	},
	{
		slug: 'trainer_dolch_nasim',
		name: { de: 'Dolchkämpfer Nasim al-Saif', en: 'Dagger Fighter Nasim al-Saif' },
		type: 'trainer',
		faction_slug: 'zahiri',
		location: {
			name: { de: 'Königsbucht – Zahiri-Handelsviertel am Pier', en: 'King\'s Bay – Zahiri Trade Quarter at the Pier' },
			tile: 'tile_38_38',
			world: { x: 19360, y: 0, z: 19500 }
		},
		teaches: ['dolche'],
		max_teach_level: 18,
		cost_per_level: {
			'1': 0,   '2': 50,   '3': 150,  '4': 300,
			'5': 500, '6': 800,  '7': 1200, '8': 1800,
			'9': 2500, '10': 3500, '11': 5000, '12': 7000,
			'13': 9500, '14': 12000, '15': 15000, '16': 20000,
			'17': 25000, '18': 32000
		},
		min_level_required: 5,
		base_stats: { level: 40, hp: 520, atk: 48, def: 30 },
		description: {
			de: 'Nasim trägt immer sieben Dolche an sich – und der Gegner findet immer nur sechs davon. Er lehrt die Zahiri Klingentanzkunst al-Sharifat, ein System aus Finte, Tempo und der Kunst, unsichtbar zu töten.',
			en: 'Nasim always carries seven daggers on him – and the opponent always finds only six. He teaches the Zahiri blade-dance art al-Sharifat, a system of feint, speed, and the art of killing invisibly.'
		}
	},

	// ════════════════════════════════════════════════════════════════════════════
	// EISENZAHN-MINE  ·  tile_08_18  ·  Zwerge der Felsenberge
	// ════════════════════════════════════════════════════════════════════════════

	{
		slug: 'trainer_schmied_durgin',
		name: { de: 'Meisterschmied Durgin Felsenhammer', en: 'Master Smith Durgin Rockehammer' },
		type: 'trainer',
		faction_slug: 'zwerge_felsen',
		location: {
			name: { de: 'Eisenzahn-Mine – Große Schmiede der Tiefen', en: 'Irontooth Mine – Great Forge of the Depths' },
			tile: 'tile_08_18',
			world: { x: 9180, y: 380, z: 4060 }
		},
		teaches: ['grobschmied'],
		max_teach_level: 22,
		cost_per_level: {
			'1': 0,    '2': 50,   '3': 150,  '4': 300,
			'5': 500,  '6': 800,  '7': 1200, '8': 1800,
			'9': 2500, '10': 3500, '11': 5000, '12': 7000,
			'13': 9500, '14': 12000, '15': 15000, '16': 20000,
			'17': 25000, '18': 32000, '19': 40000, '20': 50000,
			'21': 65000, '22': 80000
		},
		min_level_required: 5,
		base_stats: { level: 50, hp: 900, atk: 55, def: 60 },
		description: {
			de: 'Durgin hat den legendären Hammer "Weltenschlag" geschmiedet, der dreihundert Jahre alten Meteorstein verarbeitet. Er ist der letzte lebende Meister der Dritten Zwergenepoche und nimmt höchstens drei Schüler im Jahrhundert an.',
			en: 'Durgin forged the legendary hammer "Worldstrike", which incorporates three-hundred-year-old meteorite. He is the last living master of the Third Dwarf Epoch and accepts at most three students per century.'
		}
	},
	{
		slug: 'trainer_priester_bramdar',
		name: { de: 'Steinpriester Bramdar Erdenherz', en: 'Stone Priest Bramdar Earthheart' },
		type: 'trainer',
		faction_slug: 'zwerge_felsen',
		location: {
			name: { de: 'Eisenzahn-Mine – Tempel des Ersten Steins', en: 'Irontooth Mine – Temple of the First Stone' },
			tile: 'tile_08_18',
			world: { x: 9380, y: 395, z: 4250 }
		},
		teaches: ['goetter_kulte'],
		max_teach_level: 10,
		cost_per_level: {
			'1': 0,   '2': 50,  '3': 150, '4': 300,
			'5': 500, '6': 800, '7': 1200, '8': 1800,
			'9': 2500, '10': 3500
		},
		min_level_required: 5,
		base_stats: { level: 28, hp: 350, atk: 20, def: 28 },
		description: {
			de: 'Bramdar kennt die zwergenische Göttertradition von vor der Ersten Kaiserzeit und hält wenig von den "Lichtbringern der Hochmenschen". Er lehrt, dass alle Götter aus dem Stein kommen – und in den Stein zurückkehren.',
			en: 'Bramdar knows the dwarven deity traditions from before the First Imperial Age and thinks little of the "Lightbringers of the High Men". He teaches that all gods come from the stone – and return to the stone.'
		}
	}

];
