import { BaseController } from './BaseController.js';

const PANTHEON = [
	{ name: 'Solan',    icon: '☀️', aspect: 'Licht & Gerechtigkeit', focus: 'Wahrheit & Recht',   bonus: 'MU+1, Rechtskunde, Überzeugen',   color: '#f1c40f' },
	{ name: 'Valeria',  icon: '⚡', aspect: 'Sturm & Ehre',           focus: 'Kampf & Seefahrt',   bonus: 'KK+1, Schwerter, Schwimmen',      color: '#3498db' },
	{ name: 'Mercuris', icon: '🎲', aspect: 'Listen & Handel',        focus: 'Glück & Geschick',   bonus: 'IN+1, Feilschen, Schlösser',      color: '#2ecc71' },
	{ name: 'Yldra',    icon: '🌿', aspect: 'Erde & Heilung',         focus: 'Leben & Natur',      bonus: 'KO+1, Heilkunde, Pflanzenkunde',  color: '#27ae60' },
	{ name: 'Mornir',   icon: '💀', aspect: 'Tod & Stille',           focus: 'Ahnen & Übergang',   bonus: 'MU+1, Selbstbeherrschung, Sagen', color: '#95a5a6' },
	{ name: 'Skadi',    icon: '🏹', aspect: 'Jagd & Wildnis',         focus: 'Überleben',           bonus: 'GE+1, Bogen, Orientierung',       color: '#e67e22' },
	{ name: 'Mimir',    icon: '📚', aspect: 'Wissen & Runen',         focus: 'Weisheit & Magie',   bonus: 'KL+1, Magiekunde, Rechnen',       color: '#9b59b6' },
	{ name: 'Lokh',     icon: '🔥', aspect: 'Wandel & Feuer',         focus: 'Chaos & Energie',    bonus: 'IN+1, Überreden, Alchimie',       color: '#e74c3c' },
];

const ADVERSARIES = [
	{
		name: 'Fenrisul', icon: '🐺', title: 'Der Weltenfresser',
		rival: 'Solan', rivalDesc: 'Hunger vs. Licht',
		gift: 'Bestialischer Zorn', giftBonus: 'KK+3, MU+1',
		flaw: 'CH-2, KL-2 – Die Züge werden bestialisch, die Sprache verkommt zum Knurren.',
		color: '#8e44ad',
	},
	{
		name: 'Hela-Ka', icon: '❄️', title: 'Die Frostkönigin',
		rival: 'Yldra', rivalDesc: 'Stasis vs. Wachstum',
		gift: 'Eisherz', giftBonus: 'KO+3, Kälteresistenz',
		flaw: 'IN-2 – Totale emotionale Kälte; Verlust von Empathie und Mitgefühl.',
		color: '#3498db',
	},
	{
		name: 'Vorthos', icon: '👁️', title: 'Der Lügenweber',
		rival: 'Mimir', rivalDesc: 'Irrlicht vs. Erkenntnis',
		gift: 'Flüsternde Runen', giftBonus: 'Mana+15',
		flaw: 'Sinnesschärfe-4 – Die Realität wird von tausend lügenden Stimmen überlagert.',
		color: '#9b59b6',
	},
	{
		name: 'Surtr', icon: '⚔️', title: 'Der Weltenbrand',
		rival: 'Valeria', rivalDesc: 'Zerstörung vs. Ehre',
		gift: 'Blutfeuer', giftBonus: 'Schwerter/Hiebwaffen+3',
		flaw: 'Selbstbeherrschung-5 – Im Kampfrausch ist weder Rückzug noch Gnade möglich.',
		color: '#e74c3c',
	},
	{
		name: 'Xal-Atath', icon: '🖐️', title: 'Die Leere Hand',
		rival: '-', rivalDesc: '',
		gift: 'Diebsgeschick', giftBonus: 'FF+3, Schlösser+3',
		flaw: 'Gold zerrinnt buchstäblich zwischen den Fingern. Reichtum ist unerreichbar.',
		color: '#f39c12',
	},
	{
		name: 'Nidhogg', icon: '🐍', title: 'Der Wurzelnager',
		rival: '-', rivalDesc: '',
		gift: 'Fäulnisschutz', giftBonus: 'Gift-Immunität, Schmerzresistenz',
		flaw: 'Der Körper beginnt bereits zu Lebzeiten zu verwesen.',
		color: '#27ae60',
	},
	{
		name: 'Skoll', icon: '🌑', title: 'Der Sonnenjäger',
		rival: '-', rivalDesc: '',
		gift: 'Schattenschritt', giftBonus: 'GE+3, Unsichtbarkeit in Schatten',
		flaw: 'Erblindung im göttlichen Sonnenlicht.',
		color: '#2c3e50',
	},
	{
		name: 'Malakor', icon: '🗿', title: 'Der ewige Stillstand',
		rival: '-', rivalDesc: '',
		gift: 'Steinerne Haut', giftBonus: 'Rüstungsschutz+5',
		flaw: 'Die Glieder versteifen. Jede Flinkheit wird geraubt.',
		color: '#7f8c8d',
	},
];

const LOCATIONS = [
	{
		name: 'Æthelhafen',
		subtitle: 'Hauptstadt des Kaiserreichs',
		icon: '🏛️',
		culture: 'Kaiserliche',
		desc: 'Das Herz Aethelgards. Hier residiert Hochkönig Alaric der Standhafte und der Sonnen-Konvent. Prächtige Straßen, kaiserliche Garde – und unter der Oberfläche die Schattenhände.',
		danger: 1,
	},
	{
		name: 'Aetherwacht',
		subtitle: 'Sitz der Silbernen Akademie',
		icon: '🔮',
		culture: 'Lichtalben',
		desc: 'Eine schwebende Zitadelle über den Ätherwinden. Hier lehrt Hochmagister Elion die Geheimnisse der Runen. Zwischen Akademie und Konvent brodelt ein uralter Konflikt.',
		danger: 2,
	},
	{
		name: 'Fjordheim',
		subtitle: 'Heimat der Freien Jarls',
		icon: '⚓',
		culture: 'Skjaldar',
		desc: 'Sturmumtoste Hafenstadt am nördlichen Meer. Jarl Ragnhild Sturmbringer hält hier Hof. Stärke entscheidet – Gesetze sind das, was der stärkste Jarl gerade sagt.',
		danger: 2,
	},
	{
		name: 'Tiefenfels',
		subtitle: 'Zwergenfestung & Handelszentrum',
		icon: '⛏️',
		culture: 'Felsenzwerge',
		desc: 'Eine Festungsstadt tief im Fels gebaut. Sitz des Eisenzahn-Bunds. Die besten Schmiede der Welt arbeiten hier – und hüten Geheimnisse, die tiefer reichen als ihre Minen.',
		danger: 2,
	},
	{
		name: 'Solanspracht',
		subtitle: 'Heilige Stadt des Sonnen-Konvents',
		icon: '☀️',
		culture: 'Kaiserliche',
		desc: 'Die heiligste Stadt Aethelgards. Hier betet man zu Solan, hier werden Ketzer verurteilt. Erzbischof Valerius regiert mit eiserner Hand – im Namen des Lichts.',
		danger: 1,
	},
	{
		name: 'Goldstrand',
		subtitle: 'Startpunkt für Neulinge',
		icon: '🌅',
		culture: 'Alle',
		desc: 'Eine ruhige Küstenstadt, wo viele Abenteurer ihre Geschichte beginnen. Die Herberge "Zum rostigen Anker" ist der erste sichere Hafen – bevor die Welt die Helden prüft.',
		danger: 1,
	},
	{
		name: 'Die Gläserne Öde',
		subtitle: 'Mahnmal der Ära der Asche',
		icon: '🔥',
		culture: '-',
		desc: 'Vor 500 Jahren schuf Surtrs Zorn diese unbewohnbare Wüste aus schwarzem Glas. Kein Gras, kein Wasser, kein Leben. Nur der Wind – und die Stimmen derer, die hier starben.',
		danger: 5,
	},
	{
		name: 'Yldras Hain',
		subtitle: 'Heiliges Waldgebiet der Wurzelvolk',
		icon: '🌿',
		culture: 'Wurzelvolk',
		desc: 'Ein uralter Wald, der älter ist als jede menschliche Zivilisation. Die Wurzelvolk wachen hier seit Äonen. Wer ohne Einladung eintritt, findet den Ausgang nicht mehr.',
		danger: 3,
	},
	{
		name: 'Schattenmarkt',
		subtitle: 'Geheimzentrale der Schattenhände',
		icon: '🗡️',
		culture: 'Nachtalben',
		desc: 'Kein Mensch kennt seinen genauen Standort. Er taucht auf, wo man ihn nicht erwartet. Die Namenlose soll hier residieren. Wer sucht, wird nicht gefunden.',
		danger: 4,
	},
];

const DANGER_LABELS = ['', 'Friedlich', 'Gefährlich', 'Bedrohlich', 'Tödlich', 'Verdammt'];
const DANGER_COLORS = ['', '#27ae60', '#f39c12', '#e67e22', '#c0392b', '#8e44ad'];

const TIMELINE = [
	{ year: 'Vor 500 J.', icon: '🔥', title: 'Die Ära der Asche',       desc: 'Surtrs Flammenheere reißen einen Riss ins Gefüge. Drei Provinzen schmelzen zu Glas. Die Götter schmieden das Siegel – um den Preis ihrer vollen Kraft.' },
	{ year: 'Vor 120 J.', icon: '❄️', title: 'Der Frost-Winter',         desc: 'Hela-Ka lässt die nördlichen Meere gefrieren. Die Skjaldar fliehen nach Süden und prägen die Küstenstädte bis heute.' },
	{ year: 'Vor 30 J.',  icon: '📜', title: 'Die Schism-Nacht',          desc: 'Akademie und Sonnen-Konvent zerstreiten sich öffentlich über die Nutzung von Runen-Magie. Der Konflikt schwelt noch heute.' },
	{ year: 'Heute',      icon: '⚡', title: 'Thermische Resonanz',       desc: 'Hochmagister Elion misst in den Ätherwinden Schwingungen wie kurz vor der Ära der Asche. Die Prophezeiung scheint sich zu erfüllen.' },
];

export class WorldController extends BaseController {

	constructor(app) {
		super('world', app);
	}

	handleBack()        { this.app.stage.load('landing'); }
	handleCultures()    { this.app.stage.load('cultures'); }
	handleCalling() { this.app.stage.load('calling'); }

	onReady() {
		this._buildLocations();
		this._buildPantheon();
		this._buildAdversaries();
		this._buildTimeline();
	}

	_buildPantheon() {
		const grid = this.container.querySelector('#pantheon-grid');
		if (!grid) return;
		PANTHEON.forEach(g => {
			const card = document.createElement('div');
			card.className = 'pantheon-card';
			card.style.setProperty('--god-color', g.color);
			card.innerHTML = `
				<div class="god-icon">${g.icon}</div>
				<div class="god-body">
					<h3 class="god-name">${g.name}</h3>
					<span class="god-aspect">${g.aspect}</span>
					<span class="god-focus">${g.focus}</span>
					<span class="god-bonus"><em>Bonus:</em> ${g.bonus}</span>
				</div>
			`;
			grid.appendChild(card);
		});
	}

	_buildAdversaries() {
		const grid = this.container.querySelector('#adversaries-grid');
		if (!grid) return;
		ADVERSARIES.forEach(a => {
			const card = document.createElement('div');
			card.className = 'adversary-card';
			card.style.setProperty('--adv-color', a.color);
			const rival = a.rival !== '-'
				? `<span class="adv-rival">Gegenspieler: <em>${a.rival}</em> – ${a.rivalDesc}</span>`
				: '';
			card.innerHTML = `
				<div class="adv-header">
					<span class="adv-icon">${a.icon}</span>
					<div>
						<h3 class="adv-name">${a.name}</h3>
						<span class="adv-title">${a.title}</span>
					</div>
				</div>
				${rival}
				<div class="adv-gift">
					<span class="adv-gift-label">⬆ Gabe: ${a.gift}</span>
					<span class="adv-gift-bonus">${a.giftBonus}</span>
				</div>
				<div class="adv-flaw">⬇ Makel: ${a.flaw}</div>
			`;
			grid.appendChild(card);
		});
	}

	_buildLocations() {
		const grid = this.container.querySelector('#locations-grid');
		if (!grid) return;

		LOCATIONS.forEach(loc => {
			const card = document.createElement('div');
			card.className = 'location-card';

			const dangerColor = DANGER_COLORS[loc.danger];
			const dangerLabel = DANGER_LABELS[loc.danger];
			const dots = Array.from({length: 5}, (_, i) =>
				`<span class="danger-dot ${i < loc.danger ? 'filled' : ''}" style="${i < loc.danger ? `background:${dangerColor}` : ''}"></span>`
			).join('');

			card.innerHTML = `
				<div class="loc-header">
					<span class="loc-icon">${loc.icon}</span>
					<div class="loc-title-wrap">
						<h3 class="loc-name">${loc.name}</h3>
						<span class="loc-subtitle">${loc.subtitle}</span>
					</div>
				</div>
				<p class="loc-desc">${loc.desc}</p>
				<div class="loc-footer">
					<span class="loc-culture">Kultur: <em>${loc.culture}</em></span>
					<span class="loc-danger" title="${dangerLabel}">${dots}<em style="color:${dangerColor}">${dangerLabel}</em></span>
				</div>
			`;
			grid.appendChild(card);
		});
	}

	_buildTimeline() {
		const list = this.container.querySelector('#chronicles-timeline');
		if (!list) return;
		TIMELINE.forEach((e, i) => {
			const item = document.createElement('div');
			item.className = 'timeline-item';
			item.innerHTML = `
				<div class="timeline-dot">${e.icon}</div>
				<div class="timeline-content">
					<span class="timeline-year">${e.year}</span>
					<h4 class="timeline-title">${e.title}</h4>
					<p class="timeline-desc">${e.desc}</p>
				</div>`;
			list.appendChild(item);
		});
	}

	destroy() { super.destroy(); }

	handleTalents()  { this.app.stageManager.load('talents'); }
}
