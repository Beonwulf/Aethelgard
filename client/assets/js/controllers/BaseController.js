import { cE } from '../utils/cE.js';


export class BaseController {
	constructor(name, app) {
		this.name = name; // z.B. 'login'
		this.app = app;   // Zugriff auf Socket/AuthService
		this.container = null;
		this.viewData = null; // Die cE-Struktur aus JSON
	}


	get view() { return this.container; }


	async load() {
		// Parallel laden: Texte und UI-Struktur
		const [langData, uiStructure] = await Promise.all([
			fetch(`/assets/lang/${this.app.lang.currentLang}/${this.name}.json`).then(r => r.json()),
			fetch(`/assets/views/${this.name}.json`).then(r => r.json())
		]);

		this.app.lang.add(langData);
		return uiStructure;
	}


	async init() {
		// 1. JSON-Struktur der View laden
		const rawStructure = await this.load();
		// 2. Platzhalter {{...}} durch Lang-Texte ersetzen
		this.viewData = this.translateStructure(rawStructure);
	}


	translateStructure(node) {
		// Wenn es ein String ist, prüfen wir auf Platzhalter
		if (typeof node === 'string') {
			return node.replace(/\{\{(.+?)\}\}/g, (match, key) => {
				const cleanKey = key.trim();
				const result = this.app.lang.get(cleanKey);
				return result;
			});
        }

		// Wenn es ein Array ist (z.B. $childs), jeden Eintrag übersetzen
		if (Array.isArray(node)) {
			return node.map(item => this.translateStructure(item));
		}

		// Wenn es ein Objekt ist, alle Values rekursiv prüfen
		if (typeof node === 'object' && node !== null) {
			const newNode = {};
			for (const [key, value] of Object.entries(node)) {
				newNode[key] = this.translateStructure(value);
			}
			return newNode;
		}

		return node;
	}


	/**
	 * Wenn du zur Laufzeit einen Text mit Parametern ändern willst,
	 * nutzt du direkt deine lang.get Methode am Element:
	 */
	updateDynamicText(selector, key, params) {
		const el = this.container.querySelector(selector);
		if (el) {
			el.textContent = this.app.lang.get(key, params);
		}
	}


	render(targetElement) {
		this.viewData = { ...this.viewData, controller: this };
		this.container = cE(this.viewData, this);
		targetElement.innerHTML = '';
		targetElement.appendChild(this.container);
		this.onReady(); // Lifecycle Hook
	}


	onReady() { /* Wird in Subklassen überschrieben */ }
	

	destroy() {
		if(this.container) this.container.remove();
	}


}