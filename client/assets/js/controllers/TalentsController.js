import { BaseController } from './BaseController.js';

const TALENT_CATEGORIES = [
	{
		slug: 'kampf', icon: '⚔️', color: '#c0392b',
		skills: ['Schwertkampf', 'Hiebwaffen', 'Zweihandwaffen', 'Schildführung', 'Bogenschießen', 'Armbrustschießen', 'Wurfwaffen'],
	},
	{
		slug: 'koerper', icon: '🏃', color: '#27ae60',
		skills: ['Klettern', 'Schwimmen', 'Springen', 'Schleichen', 'Verstecken', 'Taschendiebstahl'],
	},
	{
		slug: 'gesellschaft', icon: '🗣️', color: '#8e44ad',
		skills: ['Überreden', 'Einschüchtern', 'Feilschen', 'Lügen', 'Anführen', 'Taktik'],
	},
	{
		slug: 'wissen', icon: '📚', color: '#2980b9',
		skills: ['Heilkunde', 'Alchemie', 'Tierkunde', 'Pflanzenkunde', 'Runenkunde', 'Arkanwissen', 'Zauberkunde'],
	},
	{
		slug: 'handwerk', icon: '🔨', color: '#d35400',
		skills: ['Schmieden', 'Waffenbau', 'Rüstungsbau', 'Runenschmieden', 'Navigation', 'Seemannschaft', 'Kartographie', 'Brauen'],
	},
];

const PROGRESSION = [
	{ range: '0',    label: 'Unwissender',    note: 'Noch keine Ausbildung.' },
	{ range: '1–4',  label: 'Anfänger',       note: 'Grundausbildung beim Talentlehrer. Einführungsquest erforderlich.' },
	{ range: '5–6',  label: 'Lehrling',       note: 'Beruf wird nutzbar. XP durch Anwendung.' },
	{ range: '7–10', label: 'Geselle',        note: 'Fortgeschrittene Fertigkeiten. Meister-NPCs verfügbar.' },
	{ range: '11–14',label: 'Altgeselle',     note: 'Spezialisierungen öffnen sich.' },
	{ range: '15–18',label: 'Fachmann',       note: 'Legendary-Quests zugänglich.' },
	{ range: '19–22',label: 'Meister',        note: 'Meisterprüfung erforderlich.' },
	{ range: '23+',  label: 'Großmeister',    note: 'Weltweit begrenzt. Höchste Auszeichnung.' },
];

const TEACHERS = [
	{ name: 'Wachmeister Aldric',          location: 'Æthelhafen – Kaserne',            icon: '⚔️', cat: 'kampf',       skills: ['Schwertkampf', 'Schildführung', 'Hiebwaffen'] },
	{ name: 'Bogenschützin Lyris',         location: 'Goldstrand – Küstenwache',         icon: '🏹', cat: 'kampf',       skills: ['Bogenschießen', 'Armbrustschießen', 'Wurfwaffen'] },
	{ name: 'Skjaldar-Krieger Björnulf',   location: 'Solarien-Bucht – Zum Sturmbrecher',icon: '⚔️', cat: 'kampf',       skills: ['Schwertkampf', 'Zweihandwaffen'], note: 'Ab Lehrling (Stufe 5)' },
	{ name: 'Trainerin Mira',              location: 'Goldstrand – Marktplatz',          icon: '🏃', cat: 'koerper',     skills: ['Klettern', 'Schwimmen', 'Schleichen'] },
	{ name: 'Niemand',                     location: 'Schattenwald – Verborgene Lichtung',icon: '🌑', cat: 'koerper',    skills: ['Schleichen', 'Verstecken', 'Taschendiebstahl'], note: 'Ab Lehrling (Stufe 5)' },
	{ name: 'Händlerin Selene',            location: 'Æthelhafen – Großer Markt',        icon: '🗣️', cat: 'gesellschaft', skills: ['Überreden', 'Feilschen', 'Lügen'] },
	{ name: 'Hauptmann Caelus',            location: 'Æthelhafen – Rathaus',             icon: '🎖️', cat: 'gesellschaft', skills: ['Anführen', 'Einschüchtern', 'Taktik'] },
	{ name: 'Archivar Theodas',            location: 'Æthelhafen – Große Bibliothek',    icon: '📚', cat: 'wissen',      skills: ['Heilkunde', 'Alchemie', 'Tierkunde'] },
	{ name: 'Runenleserin Syra',           location: 'Silberthal – Kleines Heiligtum',   icon: '᚛',  cat: 'wissen',      skills: ['Runenkunde', 'Arkanwissen', 'Zauberkunde'] },
	{ name: 'Einsiedler Vorn',             location: 'Frostfang-Kamm – Turm der Stürme', icon: '⚡', cat: 'wissen',      skills: ['Runenkunde', 'Arkanwissen', 'Elementarmagie'], note: 'Ab Lehrling (Stufe 5)' },
	{ name: 'Schmied Borak Felsenherz',    location: 'Æthelhafen – Schmiede am Südtor',  icon: '🔨', cat: 'handwerk',    skills: ['Schmieden', 'Waffenbau', 'Rüstungsbau'] },
	{ name: 'Meisterschmied Durak Tiefenstein', location: 'Frostfang-Kamm – Mine Eisenzahn', icon: '⚒️', cat: 'handwerk', skills: ['Schmieden', 'Runenschmieden'], note: 'Ab Lehrling (Stufe 5)' },
	{ name: 'Kräuterhexe Moira',           location: 'Schattenwald – Hütte am Silberstrom', icon: '🌿', cat: 'handwerk', skills: ['Alchemie', 'Pflanzenkunde', 'Brauen'] },
	{ name: 'Kapitän Varros',              location: 'Königsbucht – Hafen',              icon: '⚓', cat: 'handwerk',    skills: ['Navigation', 'Seemannschaft', 'Kartographie'] },
	{ name: 'Heilerin Asha',               location: 'Goldstrand – Tempel der Valeria',  icon: '💚', cat: 'wissen',      skills: ['Heilkunde', 'Chirurgie', 'Erste Hilfe'], note: 'Ab Lehrling (Stufe 5)' },
];

const CAT_COLORS = { kampf: '#c0392b', koerper: '#27ae60', gesellschaft: '#8e44ad', wissen: '#2980b9', handwerk: '#d35400' };

export class TalentsController extends BaseController {
	constructor(app) {
		super('talents', app);
	}

	async init() {
		await super.init();
	}

	onReady() {
		this._buildCategories();
		this._buildProgression();
		this._buildTeachers();
	}

	_buildCategories() {
		const grid = this.container.querySelector('#talents-categories');
		if (!grid) return;
		const lang = this.lang?.talents || {};
		const catNames = lang.categories || {};
		TALENT_CATEGORIES.forEach(cat => {
			const card = document.createElement('div');
			card.className = 'talent-cat-card';
			card.style.setProperty('--cat-color', cat.color);
			const name = catNames[cat.slug] || cat.slug;
			card.innerHTML = `
				<div class="talent-cat-header">
					<span class="talent-cat-icon">${cat.icon}</span>
					<span class="talent-cat-name">${name}</span>
				</div>
				<div class="talent-cat-skills">
					${cat.skills.map(s => `<span class="talent-skill-tag">${s}</span>`).join('')}
				</div>`;
			grid.appendChild(card);
		});
	}

	_buildProgression() {
		const tbody = this.container.querySelector('#talents-prog-tbody');
		if (!tbody) return;
		PROGRESSION.forEach(p => {
			const tr = document.createElement('tr');
			tr.innerHTML = `<td class="prog-range">${p.range}</td><td class="prog-label">${p.label}</td><td class="prog-note">${p.note}</td>`;
			tbody.appendChild(tr);
		});
	}

	_buildTeachers() {
		const grid = this.container.querySelector('#talents-teachers');
		if (!grid) return;
		TEACHERS.forEach(t => {
			const card = document.createElement('div');
			card.className = 'teacher-card';
			card.style.setProperty('--cat-color', CAT_COLORS[t.cat] || '#888');
			const noteHtml = t.note ? `<div class="teacher-note">${t.note}</div>` : '';
			card.innerHTML = `
				<div class="teacher-icon">${t.icon}</div>
				<div class="teacher-info">
					<div class="teacher-name">${t.name}</div>
					<div class="teacher-location">📍 ${t.location}</div>
					<div class="teacher-skills">${t.skills.map(s => `<span class="talent-skill-tag small">${s}</span>`).join('')}</div>
					${noteHtml}
				</div>`;
			grid.appendChild(card);
		});
	}

	handleCultures()  { this.app.stageManager.load('cultures'); }
	handleCalling()   { this.app.stageManager.load('calling'); }
	handleWorld()     { this.app.stageManager.load('world'); }
	handleBack()      { this.app.stageManager.load('landing'); }
}

