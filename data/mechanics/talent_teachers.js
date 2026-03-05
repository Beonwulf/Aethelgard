/**
 * Talentlehrer von Aethelgard.
 * 
 * Koordinatensystem: tile_{y}_{x} → world_x = tile_x * 512, world_z = tile_y * 512
 * Ursprung (0,0) = Nord-West-Ecke der Map.
 * 
 * Aufstiegsregeln (aus DOCS_MECHANICS.md):
 *   Stufe 0→1: Einführungsquest beim Talentlehrer
 *   Stufe 1→2: Quest ODER Talentlehrer bezahlen
 *   Stufe 2→4: Talentlehrer aufsuchen + bezahlen
 *   Stufe 5+:  XP durch Nutzung + optionales Training
 */
export const talentTeachers = [

	// ═══════════════════════════════════════════
	// KAMPF (Combat Skills)
	// ═══════════════════════════════════════════

	{
		id: 'teacher_kampf_grundlagen',
		name: { de: 'Wachmeister Aldric', en: 'Watchmaster Aldric' },
		location: 'Æthelhafen – Kaserne der Stadtwache',
		tile: 'tile_32_10',
		world: { x: 5220, y: 0, z: 16500 }, // Æthelhafen, leicht versetzt zur Kaserne
		skills: ['schwertkampf', 'schildführung', 'hiebwaffen'],
		max_teach_level: 4,
		cost_per_level: { 1: 0, 2: 50, 3: 150, 4: 300 }, // Silber
		intro_quest: 'quest_kampf_erstprüfung',
		description: {
			de: 'Ein alter Veteran der kaiserlichen Legionen. Vernarbt, aber ungebrochen. Er lehrt die Grundlagen des Überlebens.',
			en: 'A veteran of the imperial legions. Scarred but unbroken. He teaches the basics of survival.'
		}
	},
	{
		id: 'teacher_fernkampf',
		name: { de: 'Bogenschützin Lyris', en: 'Archer Lyris' },
		location: 'Goldstrand – Küstenwache',
		tile: 'tile_20_45',
		world: { x: 23100, y: 0, z: 10300 },
		skills: ['bogenschießen', 'armbrustschießen', 'wurfwaffen'],
		max_teach_level: 4,
		cost_per_level: { 1: 0, 2: 40, 3: 120, 4: 250 },
		intro_quest: 'quest_fernkampf_zielübung',
		description: {
			de: 'Eine Küstenwächterin mit scharfem Auge. Sie hat schon manchen Schmugglerkai verteidigt.',
			en: 'A coastal guard with a sharp eye. She has defended many a smuggler\'s dock.'
		}
	},
	{
		id: 'teacher_kampf_meister',
		name: { de: 'Skjaldar-Krieger Björnulf', en: 'Skjaldar Warrior Björnulf' },
		location: 'Solarien-Bucht – Hafen-Taverne "Zum Sturmbrecher"',
		tile: 'tile_35_05',
		world: { x: 2660, y: 0, z: 17980 },
		skills: ['schwertkampf', 'zweihandwaffen', 'hiebwaffen', 'schildführung'],
		max_teach_level: 10, // Kann bis Geselle ausbilden
		cost_per_level: { 5: 500, 6: 800, 7: 1200, 8: 1800, 9: 2500, 10: 3500 },
		intro_quest: null, // Kein Quest – muss bereits Lehrling sein
		min_level_required: 5,
		description: {
			de: 'Ein Skjaldar-Reisender, der seinen Weg als Söldner gefunden hat. Wer ihn im Duell bestehen kann, lernt von den Besten.',
			en: 'A Skjaldar wanderer who found his way as a mercenary. Those who can stand against him in a duel learn from the best.'
		}
	},

	// ═══════════════════════════════════════════
	// KÖRPER (Athletics / Physical Skills)
	// ═══════════════════════════════════════════

	{
		id: 'teacher_koerper_grundlagen',
		name: { de: 'Trainerin Mira', en: 'Trainer Mira' },
		location: 'Goldstrand – Marktplatz',
		tile: 'tile_20_45',
		world: { x: 23000, y: 0, z: 10180 },
		skills: ['klettern', 'schwimmen', 'springen', 'schleichen'],
		max_teach_level: 4,
		cost_per_level: { 1: 0, 2: 30, 3: 100, 4: 200 },
		intro_quest: 'quest_koerper_grundprüfung',
		description: {
			de: 'Eine ehemalige Gauklerin. Ihr Körper ist ihr Werkzeug – und sie versteht ihr Handwerk.',
			en: 'A former acrobat. Her body is her tool – and she knows her craft.'
		}
	},
	{
		id: 'teacher_schleichen_fortgeschritten',
		name: { de: 'Niemand', en: 'Nobody' }, // Wahrer Name unbekannt
		location: 'Schattenwald – Verborgene Lichtung (Westwald)',
		tile: 'tile_25_10',
		world: { x: 5300, y: 0, z: 12950 },
		skills: ['schleichen', 'verstecken', 'taschendiebstahl'],
		max_teach_level: 10,
		cost_per_level: { 5: 400, 6: 700, 7: 1100, 8: 1600, 9: 2200, 10: 3000 },
		intro_quest: null,
		min_level_required: 5,
		description: {
			de: 'Niemand weiß seinen echten Namen. Er taucht nur auf, wenn er will – und er will nur die Besten lehren.',
			en: 'Nobody knows his real name. He only appears when he wants to – and he only wants to teach the best.'
		}
	},

	// ═══════════════════════════════════════════
	// GESELLSCHAFT (Social Skills)
	// ═══════════════════════════════════════════

	{
		id: 'teacher_gesellschaft_grundlagen',
		name: { de: 'Händlerin Selene vom Südbund', en: 'Merchant Selene of the Southbound' },
		location: 'Æthelhafen – Großer Markt',
		tile: 'tile_32_10',
		world: { x: 5080, y: 0, z: 16320 },
		skills: ['überreden', 'einschüchtern', 'feilschen', 'lügen'],
		max_teach_level: 4,
		cost_per_level: { 1: 0, 2: 60, 3: 180, 4: 400 },
		intro_quest: 'quest_gesellschaft_verhandlung',
		description: {
			de: 'Eine Händlerin aus dem Südbund mit einem Lächeln, das Gold wert ist – und einer Zunge, die noch mehr wert ist.',
			en: 'A merchant from the Southbound with a smile worth gold – and a tongue worth even more.'
		}
	},
	{
		id: 'teacher_fuehrung',
		name: { de: 'Hauptmann Caelus', en: 'Captain Caelus' },
		location: 'Æthelhafen – Rathaus',
		tile: 'tile_32_10',
		world: { x: 5150, y: 0, z: 16400 },
		skills: ['anführen', 'einschüchtern', 'taktik'],
		max_teach_level: 4,
		cost_per_level: { 1: 0, 2: 80, 3: 220, 4: 500 },
		intro_quest: 'quest_fuehrung_befehlsprüfung',
		description: {
			de: 'Ein kaiserlicher Offizier im Ruhestand. Wer seine Stimme erhebt, soll wissen warum.',
			en: 'A retired imperial officer. Those who raise their voice should know why.'
		}
	},

	// ═══════════════════════════════════════════
	// WISSEN (Knowledge Skills)
	// ═══════════════════════════════════════════

	{
		id: 'teacher_wissen_grundlagen',
		name: { de: 'Archivar Theodas', en: 'Archivist Theodas' },
		location: 'Æthelhafen – Große Bibliothek',
		tile: 'tile_32_10',
		world: { x: 5050, y: 0, z: 16250 },
		skills: ['heilkunde', 'alchemie', 'tierkunde', 'pflanzenkunde'],
		max_teach_level: 4,
		cost_per_level: { 1: 0, 2: 70, 3: 200, 4: 450 },
		intro_quest: 'quest_wissen_bibliothekstest',
		description: {
			de: 'Ein alter Gelehrter, umgeben von Stapeln verstaubter Bücher. Er weiß von allem ein bisschen – und von manchen Dingen zu viel.',
			en: 'An old scholar surrounded by stacks of dusty books. He knows a little about everything – and too much about some things.'
		}
	},
	{
		id: 'teacher_magie_grundlagen',
		name: { de: 'Runenleserin Syra', en: 'Rune Reader Syra' },
		location: 'Silberthal – Kleines Heiligtum',
		tile: 'tile_15_12',
		world: { x: 6200, y: 0, z: 7800 },
		skills: ['runenkunde', 'arkanwissen', 'zauberkunde'],
		max_teach_level: 4,
		cost_per_level: { 1: 0, 2: 100, 3: 300, 4: 700 },
		intro_quest: 'quest_magie_runenlesen',
		description: {
			de: 'Eine ruhige Frau, die in den alten Steinen von Silberthal liest wie andere in Büchern.',
			en: 'A quiet woman who reads the old stones of Silberthal like others read books.'
		}
	},
	{
		id: 'teacher_magie_fortgeschritten',
		name: { de: 'Einsiedler Vorn', en: 'Hermit Vorn' },
		location: 'Frostfang-Kamm – Turm der Stürme',
		tile: 'tile_05_15',
		world: { x: 7800, y: 620, z: 2700 }, // y erhöht wegen Bergposition
		skills: ['runenkunde', 'arkanwissen', 'zauberkunde', 'elementarmagie'],
		max_teach_level: 14,
		cost_per_level: { 5: 800, 6: 1200, 7: 2000, 8: 3000, 9: 4500, 10: 6000 },
		intro_quest: null,
		min_level_required: 5,
		description: {
			de: 'Ein Mann, der seit Jahrzehnten allein am höchsten Gipfel des Frostfang-Kamms lebt. Wer ihn findet, hat schon bewiesen, dass er es verdient.',
			en: 'A man who has lived alone on the highest peak of the Frostfang Ridge for decades. Those who find him have already proved they deserve it.'
		}
	},

	// ═══════════════════════════════════════════
	// HANDWERK (Crafting Skills)
	// ═══════════════════════════════════════════

	{
		id: 'teacher_schmied_grundlagen',
		name: { de: 'Schmied Borak Felsenherz', en: 'Smith Borak Stoneheart' },
		location: 'Æthelhafen – Schmiede am Südtor',
		tile: 'tile_32_10',
		world: { x: 5180, y: 0, z: 16600 },
		skills: ['schmieden', 'waffenbau', 'rüstungsbau'],
		max_teach_level: 4,
		cost_per_level: { 1: 0, 2: 50, 3: 150, 4: 350 },
		intro_quest: 'quest_schmied_feuerprobe',
		description: {
			de: 'Ein Felsenzwerg, der in Æthelhafen seine Schmiede aufgeschlagen hat. Sein Hammer trifft genau einmal – und dann sitzt alles.',
			en: 'A rock dwarf who set up his forge in Æthelhafen. His hammer strikes exactly once – and then everything fits.'
		}
	},
	{
		id: 'teacher_schmied_meister',
		name: { de: 'Meisterschmied Durak Tiefenstein', en: 'Master Smith Durak Deepstone' },
		location: 'Frostfang-Kamm – Zwergenmine "Eisenzahn"',
		tile: 'tile_08_18',
		world: { x: 9300, y: 380, z: 4200 },
		skills: ['schmieden', 'waffenbau', 'rüstungsbau', 'runenschmieden'],
		max_teach_level: 22,
		cost_per_level: { 5: 600, 6: 1000, 7: 1500, 8: 2200, 9: 3200, 10: 4500 },
		intro_quest: null,
		min_level_required: 5,
		description: {
			de: 'Der beste Schmied der bekannten Welt – zumindest glaubt er das. Und nach allem was man sieht, hat er recht.',
			en: 'The best smith in the known world – at least he believes so. And from what one can see, he is right.'
		}
	},
	{
		id: 'teacher_alchemie',
		name: { de: 'Kräuterhexe Moira', en: 'Herb Witch Moira' },
		location: 'Schattenwald – Hütte am Silberstrom',
		tile: 'tile_28_20',
		world: { x: 10350, y: 0, z: 14450 },
		skills: ['alchemie', 'pflanzenkunde', 'brauen', 'gifte'],
		max_teach_level: 4,
		cost_per_level: { 1: 0, 2: 45, 3: 130, 4: 280 },
		intro_quest: 'quest_alchemie_kräutersammeln',
		description: {
			de: 'Eine alte Frau, die behauptet, keine Hexe zu sein. Alle Nachbarn im Umkreis von drei Meilen sind anderer Meinung.',
			en: 'An old woman who claims she is not a witch. All neighbors within three miles disagree.'
		}
	},
	{
		id: 'teacher_seefahrt',
		name: { de: 'Kapitän Varros', en: 'Captain Varros' },
		location: 'Königsbucht – Hafen',
		tile: 'tile_38_38',
		world: { x: 19500, y: 0, z: 19600 },
		skills: ['navigation', 'seemannschaft', 'angeln', 'kartographie'],
		max_teach_level: 4,
		cost_per_level: { 1: 0, 2: 40, 3: 110, 4: 240 },
		intro_quest: 'quest_seefahrt_erste_fahrt',
		description: {
			de: 'Ein alter Seebär, dessen Karten jeden Hafen der bekannten Küste zeigen. Und einige, die niemand kennen sollte.',
			en: 'An old sea dog whose maps show every port on the known coast. And some that nobody should know about.'
		}
	},
	{
		id: 'teacher_heilkunde_fortgeschritten',
		name: { de: 'Heilerin Asha', en: 'Healer Asha' },
		location: 'Goldstrand – Tempel der Valeria',
		tile: 'tile_20_45',
		world: { x: 22900, y: 0, z: 10150 },
		skills: ['heilkunde', 'chirurgie', 'erste_hilfe'],
		max_teach_level: 10,
		cost_per_level: { 5: 450, 6: 750, 7: 1100, 8: 1600, 9: 2200, 10: 3000 },
		intro_quest: null,
		min_level_required: 5,
		description: {
			de: 'Eine Priesterin der Valeria. Wer zu ihr kommt, kommt entweder um zu lernen – oder um geheilt zu werden. Manchmal beides.',
			en: 'A priestess of Valeria. Those who come to her, come either to learn – or to be healed. Sometimes both.'
		}
	},

];
