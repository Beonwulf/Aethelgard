import { BaseController } from './BaseController.js';

const PROFESSIONS = [
	{
		slug: 'krieger', name: 'Krieger', icon: '⚔️',
		energy: '-', attrs: 'MU, KK, KO',
		restriction: null,
		desc: 'Meister des Stahls und der Schlachtfeldtaktik. Der Krieger verlässt sich auf rohe Kraft, Ausdauer und jahrelanges Training. Kein Beruf überlebt länger auf dem Schlachtfeld.',
		tags: ['Kampf', 'Nahkampf'],
	},
	{
		slug: 'magier', name: 'Magier', icon: '🔮',
		energy: 'Mana 20', attrs: 'KL, IN',
		restriction: 'Erfordert KL 11, IN 11',
		desc: 'Die Gelehrten der arkanen Künste. Mächtig, aber zerbrechlich. Ein Magier kann eine ganze Armee aufhalten – oder an einem einzigen Schwerthieb sterben.',
		tags: ['Magie', 'Wissen'],
	},
	{
		slug: 'runenmeister', name: 'Runenmeister', icon: '᚛',
		energy: 'Mana 15', attrs: 'KL, KK, KO',
		restriction: 'Nur für Zwerge',
		desc: 'Die Verschmelzung von Handwerk und Magie. Runenmeister gravieren uralte Zeichen in Metall und Stein, die Waffen zum Leben erwecken und Rüstungen undurchdringlich machen.',
		tags: ['Magie', 'Handwerk', 'Zwerge'],
	},
	{
		slug: 'kleriker', name: 'Kleriker', icon: '✝️',
		energy: 'Gunst 20', attrs: 'MU, IN, CH',
		restriction: null,
		desc: 'Diener der Götter, ausgerüstet mit göttlicher Gunst. Sie heilen, bannen und richten – im Namen Solans oder Valerias. Zwischen Kampf und Glaube ist kein Widerspruch.',
		tags: ['Göttlich', 'Heilung', 'Kampf'],
	},
	{
		slug: 'paladin', name: 'Paladin', icon: '🛡️',
		energy: 'Gunst 15', attrs: 'MU, KK, CH',
		restriction: null,
		desc: 'Ritter des Strahlenden Lichts. Ein Paladin ist Krieger und Glaubensträger zugleich. Im Namen Solans oder Skadis tritt er gegen Korruption und Dunkelheit an.',
		tags: ['Göttlich', 'Kampf', 'Schutz'],
	},
	{
		slug: 'druide', name: 'Druide', icon: '🌿',
		energy: 'Gunst 15', attrs: 'IN, KO, CH',
		restriction: null,
		desc: 'Diener Yldras, der Erdgöttin. Druiden sprechen mit der Natur, heilen Wunden durch Kräuter und können in extremen Fällen die Kraft des Lebens selbst als Waffe einsetzen.',
		tags: ['Göttlich', 'Natur', 'Heilung'],
	},
	{
		slug: 'streuner', name: 'Streuner', icon: '🗡️',
		energy: '-', attrs: 'IN, GE, CH',
		restriction: null,
		desc: 'Überlebenskünstler, Diebe und Schattenläufer. Der Streuner gewinnt durch List, nicht durch Kraft. Ideal für alle, die lieber im Verborgenen agieren.',
		tags: ['Schatten', 'Geschick'],
	},
	{
		slug: 'entdecker', name: 'Entdecker', icon: '🧭',
		energy: '-', attrs: 'KL, IN, KO',
		restriction: null,
		desc: 'Pioniere der Wildnis und Kartographen unbekannter Länder. Ein Entdecker kennt jeden Pfad, jede Pflanze und jede Gefahr – und überlebt dort, wo andere scheitern.',
		tags: ['Wildnis', 'Wissen'],
	},
	{
		slug: 'schmied', name: 'Schmied', icon: '🔨',
		energy: '-', attrs: 'KK, FF, KO',
		restriction: null,
		desc: 'Meister von Feuer und Amboss. Was ein Schmied fertigt, hält ein Leben lang. Im Krieg sind die besten Waffen oft wertvoller als die tapfersten Krieger.',
		tags: ['Handwerk'],
	},
	{
		slug: 'haendler', name: 'Händler', icon: '💰',
		energy: '-', attrs: 'KL, IN, CH',
		restriction: null,
		desc: 'Eloquent, reisend und immer mit einem Angebot zur Hand. Händler bewegen sich frei zwischen Fraktionen und verdienen an Konflikten, die andere fürchten.',
		tags: ['Gesellschaft', 'Wissen'],
	},
	{
		slug: 'bauer', name: 'Bauer', icon: '🌾',
		energy: '-', attrs: 'KO, KK',
		restriction: null,
		desc: 'Zäh, geerdet und unterschätzt. Ein Bauer kennt das Land wie seinen eigenen Körper. Aus ihren Reihen kommen oft die härtesten Krieger – weil Überleben ihr Alltag ist.',
		tags: ['Überleben'],
	},
	{
		slug: 'bettler', name: 'Bettler', icon: '🎭',
		energy: '-', attrs: 'IN, CH',
		restriction: null,
		desc: 'Meister der Tarnung im Schatten der Gesellschaft. Ein Bettler sieht alles, hört alles und kostet nichts. Wer sie unterschätzt, bereut es.',
		tags: ['Schatten', 'Gesellschaft'],
	},
];

const TAG_COLORS = {
	'Kampf':      '#c0392b',
	'Magie':      '#8e44ad',
	'Göttlich':   '#f39c12',
	'Handwerk':   '#7f8c8d',
	'Wildnis':    '#27ae60',
	'Natur':      '#27ae60',
	'Schatten':   '#2c3e50',
	'Heilung':    '#16a085',
	'Wissen':     '#2980b9',
	'Gesellschaft':'#d35400',
	'Überleben':  '#795548',
	'Geschick':   '#6c5ce7',
	'Nahkampf':   '#c0392b',
	'Schutz':     '#34495e',
	'Zwerge':     '#a0522d',
};

export class CallingController extends BaseController {

	constructor(app) {
		super('calling', app);
	}

	handleBack()        { this.app.stage.load('landing'); }
	handleCultures()    { this.app.stage.load('cultures'); }
	handleWorld()       { this.app.stage.load('world'); }

	onReady() {
		this._buildCards();
	}

	_buildCards() {
		const grid = this.container.querySelector('#calling-grid');
		if (!grid) return;

		PROFESSIONS.forEach(p => {
			const card = document.createElement('div');
			card.className = 'profession-card';

			const tags = p.tags.map(t => {
				const color = TAG_COLORS[t] || '#555';
				return `<span class="prof-tag" style="background:${color}22;border-color:${color}55;color:${color}">${t}</span>`;
			}).join('');

			const restriction = p.restriction
				? `<div class="prof-restriction">⚠ ${p.restriction}</div>`
				: '';

			card.innerHTML = `
				<div class="prof-icon">${p.icon}</div>
				<div class="prof-body">
					<h3 class="prof-name">${p.name}</h3>
					<div class="prof-tags">${tags}</div>
					<p class="prof-desc">${p.desc}</p>
					<div class="prof-meta">
						<span class="prof-meta-item"><em>Attribute:</em> ${p.attrs}</span>
						<span class="prof-meta-item"><em>Energie:</em> ${p.energy}</span>
					</div>
					${restriction}
				</div>
			`;
			grid.appendChild(card);
		});
	}

	destroy() {
		super.destroy();
	}

	handleTalents()  { this.app.stageManager.load('talents'); }
}
