import { BaseController } from './BaseController.js';

const CULTURES = [
	{ slug: 'kaiserliche', name: 'Kaiserliche',  img: 'imperial.png',      desc: 'Disziplin, Ordnung, Erbe.' },
	{ slug: 'skjaldar',    name: 'Skjaldar',     img: 'skjaldar.png',      desc: 'Sturm, Wildheit, Ehre im Kampf.' },
	{ slug: 'zahiri',      name: 'Zahiri',        img: 'zahiri002.png',     desc: 'Mystik, Sternenlicht, Sandmagie.' },
	{ slug: 'felsenzwerge',name: 'Felsenzwerge',  img: 'rockdwarf.png',     desc: 'Unbeugsamkeit, Schmiedekunst, Stein.' },
	{ slug: 'tiefenzwerge',name: 'Tiefenzwerge',  img: 'deepdwarf.png',     desc: 'Wissen, Runen, Tiefe.' },
	{ slug: 'feynir',      name: 'Feynir',        img: 'feynir.png',        desc: 'Naturgeister, Schnelligkeit, Wölfe.' },
	{ slug: 'lichtalben',  name: 'Lichtalben',    img: 'lightelf.png',      desc: 'Arroganz, Äther, Sternenlicht.' },
	{ slug: 'nachtalben',  name: 'Nachtalben',    img: 'darknightelf.png',  desc: 'Verbotene Magie, Abgrund, Überleben.' },
	{ slug: 'nordfolk',    name: 'Nordfolk',      img: 'nordfolk.png',      desc: 'Kälte, Überlebenswille, Kargheit.' },
	{ slug: 'suedbund',    name: 'Südbund',       img: 'suedbund.png',      desc: 'Handel, Wissen, Diplomatie.' },
	{ slug: 'wurzelvolk',  name: 'Wurzelvolk',    img: 'wurzelvolk.png',    desc: 'Uralte Baumwesen, weise, fast unsterblich.' },
	{ slug: 'gnomolk',     name: 'Gnomolk',       img: 'gnomolk.png',       desc: 'Steampunk-Tüftler, Eisbärwesen, Herkunft unbekannt.' },
];

export class LandingController extends BaseController {

	constructor(app) {
		super('landing', app);
	}

	handlePlay() {
		document.body.classList.remove('web');
		if (this.app.user) {
			this.app.stage.load('char-select');
		} else {
			this.app.stage.load('login');
		}
	}

	handleLogin() {
		document.body.classList.remove('web');
		this.app.stage.load('login');
	}

	handleCultures()    { this.app.stage.load('cultures'); }
	handleCalling() { this.app.stage.load('calling'); }
	handleWorld()       { this.app.stage.load('world'); }
	handlePodcast()     { this.app.stage.load('podcast'); }

	onReady() {
		this._buildTopnavActions();
		this._buildCultureCards();
	}

	_buildTopnavActions() {
		const actions = this.container.querySelector('#topnav-actions');
		if (!actions) return;

		if (this.app.user) {
			const greeting = document.createElement('span');
			greeting.className = 'topnav-greeting';
			greeting.textContent = `${this.app.user.name}`;
			actions.appendChild(greeting);

			const playBtn = document.createElement('button');
			playBtn.className = 'btn-wow btn-topnav-play';
			playBtn.textContent = '▶ Jetzt spielen';
			playBtn.onclick = () => this.handlePlay();
			actions.appendChild(playBtn);
		} else {
			const loginBtn = document.createElement('button');
			loginBtn.className = 'btn-wow-outline btn-topnav';
			loginBtn.textContent = 'Einloggen';
			loginBtn.onclick = () => this.handleLogin();
			actions.appendChild(loginBtn);

			const registerBtn = document.createElement('button');
			registerBtn.className = 'btn-wow btn-topnav';
			registerBtn.textContent = 'Registrieren';
			registerBtn.onclick = () => this.handleLogin();
			actions.appendChild(registerBtn);
		}
	}

	_buildCultureCards() {
		const grid = this.container.querySelector('#cultures-grid');
		if (!grid) return;

		CULTURES.forEach(culture => {
			const card = document.createElement('div');
			card.className = 'culture-card';

			const img = document.createElement('img');
			img.src = `/assets/images/cultures/${culture.img}`;
			img.alt = culture.name;
			img.className = 'culture-card-img';
			img.loading = 'lazy';

			const info = document.createElement('div');
			info.className = 'culture-card-info';

			const name = document.createElement('h3');
			name.className = 'culture-card-name';
			name.textContent = culture.name;

			const desc = document.createElement('p');
			desc.className = 'culture-card-desc';
			desc.textContent = culture.desc;

			info.appendChild(name);
			info.appendChild(desc);
			card.appendChild(img);
			card.appendChild(info);
			grid.appendChild(card);
		});
	}

	handleTalents()  { this.app.stageManager.load('talents'); }
}
