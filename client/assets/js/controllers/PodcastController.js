import { BaseController } from './BaseController.js';

export class PodcastController extends BaseController {

	constructor(app) {
		super('podcast', app);
		this.podcasts = [];
		this.current  = null;
	}

	async init() {
		// Podcast-Daten + View/Lang parallel laden
		const [, podcasts] = await Promise.all([
			super.init(),
			fetch('/assets/data/podcasts.json').then(r => r.json())
		]);
		this.podcasts = podcasts;
		this.current  = podcasts[0] ?? null; // Erste Episode als Default
	}

	handleBack() {
		this.app.stage.load('landing');
	}

	onReady() {
		if (!this.current) return;
		this._applyMeta();
		this._buildVideo();
		this._buildSpeakers();
		this._buildChapters();
	}

	_lang(obj) {
		// Holt den richtigen Sprachstring aus {de:'…', en:'…'}
		const l = this.app?.lang?.currentLang ?? 'de';
		return obj[l] ?? obj['de'] ?? '';
	}

	_applyMeta() {
		const p = this.current;
		const set = (sel, text) => {
			const el = this.container.querySelector(sel);
			if (el) el.textContent = text;
		};
		set('.podcast-title',    this._lang(p.title));
		set('.podcast-subtitle', this._lang(p.subtitle));
		set('.podcast-meta-item:nth-child(1)', p.duration);
		set('.podcast-meta-item:nth-child(3)', `Episode ${p.episode}`);
	}

	_buildVideo() {
		const container = this.container.querySelector('#podcast-video-container');
		if (!container) return;

		if (this.current.youtube) {
			const iframe = document.createElement('iframe');
			iframe.src = this.current.youtube;
			iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
			iframe.allowFullscreen = true;
			iframe.frameBorder = '0';
			container.appendChild(iframe);
		} else {
			const ph = document.createElement('div');
			ph.className = 'podcast-video-placeholder';
			ph.innerHTML = '<span>Video folgt in Kürze auf YouTube</span>';
			container.appendChild(ph);
		}
	}

	_buildSpeakers() {
		const box = this.container.querySelector('.podcast-speakers-box');
		if (!box) return;

		// Vorhandene Platzhalter-Sprecher entfernen, dynamisch neu aufbauen
		box.querySelectorAll('.podcast-speaker').forEach(el => el.remove());

		this.current.speakers.forEach(sp => {
			const item = document.createElement('div');
			item.className = 'podcast-speaker';

			const dot = document.createElement('span');
			dot.className = 'podcast-speaker-dot';
			dot.style.background  = sp.color;
			dot.style.boxShadow   = `0 0 6px ${sp.color}80`;

			const info = document.createElement('div');
			const name = document.createElement('strong');
			name.textContent = this._lang(sp.name);
			const role = document.createElement('p');
			role.className = 'podcast-speaker-role';
			role.textContent = this._lang(sp.role);

			info.appendChild(name);
			info.appendChild(role);
			item.appendChild(dot);
			item.appendChild(info);
			box.appendChild(item);
		});
	}

	_buildChapters() {
		const list = this.container.querySelector('#podcast-chapters');
		if (!list) return;

		this.current.chapters.forEach(ch => {
			const item = document.createElement('li');
			item.className = 'podcast-chapter-item';

			const time = document.createElement('span');
			time.className = 'podcast-chapter-time';
			time.textContent = ch.time;

			const title = document.createElement('span');
			title.className = 'podcast-chapter-title';
			title.textContent = this._lang(ch.title);

			item.appendChild(time);
			item.appendChild(title);
			list.appendChild(item);
		});
	}
}

