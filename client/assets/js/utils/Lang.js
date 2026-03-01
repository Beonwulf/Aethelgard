export class Language {


	static #instance = null;


	static getInstance() {
		if( this.#instance === null ) {
			this.#instance = new Language();
		}
		return this.#instance;
	}


	#translations = {};
	#currentLocale = 'de';
	#defaultLocale = 'de';
	#availbleLocales = ['de', 'en'];



	constructor(defaultLocale = 'de') {
		this.#currentLocale = defaultLocale;
		this.detectBrowserLanguage();

		this.add({"login":{"title":"Willkommen in Midgard"}});
	}


	get currentLang() { return this.#currentLocale; }


	/**
	 * Lädt Übersetzungsdaten (z.B. aus einem JSON)
	 * @param {string} locale - z.B. 'de' oder 'en'
	 * @param {Object} data - Die Key-Value Paare
	 */
	load(locale, data) {
		this.#translations[locale] = { ...this.#translations[locale], ...data };
		return this;
	}
	add(data) {
		this.#translations[this.#currentLocale] = { ...this.#translations[this.#currentLocale], ...data };
		return this;
	}


	/**
	 * Setzt die aktive Sprache
	 */
	setLocale(locale) {
		if (this.#translations[locale]) {
			this.#currentLocale = locale;
		} else {
			console.warn(`Sprache ${locale} nicht geladen. Bleibe bei ${this.#currentLocale}`);
		}
	}

	/**
	 * Die Hauptmethode zum Übersetzen
	 * @param {string} key - Der Pfad zur Übersetzung (z.B. 'ui.welcome')
	 * @param {Object} params - Platzhalter (z.B. { name: 'Thor' })
	 */
	get(key, params = {}) {
		const translation = this.#getNestedValue(this.#translations[this.#currentLocale], key) || key;

		// Ersetzt Platzhalter wie {{name}} durch die Werte in params
		return translation.replace(/{{(.*?)}}/g, (match, p1) => {
			return params[p1.trim()] !== undefined ? params[p1.trim()] : match;
		});
	}


	#getNestedValue(obj, path) {
		return path.split('.').reduce((prev, curr) => prev && prev[curr], obj);
	}


	/**
	 * Erkennt die Browsersprache und stellt sie ein
	 */
	detectBrowserLanguage() {
		const lang = navigator.language.split('-')[0];
		if( this.#availbleLocales.includes(lang) ) {
				this.#currentLocale = lang;
		}
		else {
			this.#currentLocale = this.#defaultLocale;
		}
	}


}


export const Lang = Language.getInstance();