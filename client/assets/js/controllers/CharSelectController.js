import { BaseController } from './BaseController.js';
import { cE } from '../utils/cE.js';

export class CharSelectController extends BaseController {
	constructor($app) {
		super('char-select', $app);
		this.characters = [];
		this.legacy = null;
		this.legacyNames = [
			'Nebelkrähe', 'Eisenfaust', 'Löwenherz', 'Wolfsblut', 'Frostwache', 
			'Sturmbringer', 'Schattenweber', 'Drachenzahn', 'Runenlied', 'Blattläufer',
			'Sternenschmied', 'Feuerbrand', 'Nachtgeist', 'Felsenhauer', 'Aethelschild',
			'Silberklinge', 'Eisensang', 'Goldfeder', 'Dunkelmond', 'Lichtbringer'
		];
	}

	async onReady() {
		const listContainer = this.container.querySelector('#char-list');
		const legacyContainer = this.container.querySelector('#legacy-creation-container');
		const selectContainer = this.container.querySelector('#char-select-container');
		const legacyTitle = this.container.querySelector('#legacy-title');
		
		listContainer.innerHTML = '';

		try {
			// This will either return an array of chars (if legacy is implicitly there but we don't know it),
			// or we can expect the server to send { characters: [], legacy: "Name" }.
			// For now, let's assume if there are no characters, we don't have a legacy.
			// Or better: Assume the server will be updated to send { characters: [], legacy: string|null }.
			const responseData = await this.app.auth.getCharacters();

			if (responseData && responseData.error) {
				console.warn("Die Götter verweigern den Zutritt:", responseData.error);
				this.logout();
				return;
			}

			// Support for both old (array) and new (object with legacy) API responses
			if (Array.isArray(responseData)) {
				this.characters = responseData;
				this.legacy = null; // Assume no legacy object if array
			} else if (responseData && typeof responseData === 'object') {
				this.characters = responseData.characters || [];
				this.legacy = responseData.legacy || null;
			}

			// If no legacy and no characters, show legacy creator
			if (!this.legacy && this.characters.length === 0) {
				selectContainer.classList.add('hidden');
				legacyContainer.classList.remove('hidden');
				return;
			}

			// If we have legacy, show it in the title
			if (this.legacy) {
				legacyTitle.textContent = "Vermächtnis: " + this.legacy;
			}

			// Admin/GM Button
			if (this.app.user && (this.app.user.role === 'admin' || this.app.user.role === 'moderator')) {
				const gmBtn = this.container.querySelector('#gm-btn');
				if (gmBtn) gmBtn.classList.remove('hidden');
			}

			if (this.characters.length === 0) {
				listContainer.appendChild(cE({
					$el: 'p',
					$class: 'no-chars-message',
					$text: this.app.lang.get('char.no_chars_found')
				}));
				return;
			}

			this.characters.forEach(($char, $index) => {
				const charCard = this.renderCharacterCard($char, $index);
				listContainer.appendChild(charCard);
			});

		} catch ($err) {
			console.error("Fehler beim Laden der Helden:", $err);
		}
	}

	generateLegacyName() {
		const input = this.container.querySelector('#legacy-name');
		const randomIndex = Math.floor(Math.random() * this.legacyNames.length);
		input.value = this.legacyNames[randomIndex];
	}

	async createLegacy() {
		const input = this.container.querySelector('#legacy-name');
		const legacyName = input.value.trim();

		if (legacyName.length < 3) {
			alert("Dein Vermächtnis muss mindestens 3 Zeichen lang sein!");
			return;
		}

		try {
			// Sende Vermächtnis an den Server
			const res = await this.app.api.post('/characters/legacy', { legacy: legacyName });
			
			if (res && res.success) {
				this.legacy = legacyName;
				
				const legacyContainer = this.container.querySelector('#legacy-creation-container');
				const selectContainer = this.container.querySelector('#char-select-container');
				const legacyTitle = this.container.querySelector('#legacy-title');

				legacyContainer.classList.add('hidden');
				selectContainer.classList.remove('hidden');
				legacyTitle.textContent = "Vermächtnis: " + this.legacy;

				// Leere Liste neu rendern
				const listContainer = this.container.querySelector('#char-list');
				listContainer.innerHTML = '';
				listContainer.appendChild(cE({
					$el: 'p',
					$class: 'no-chars-message',
					$text: this.app.lang.get('char.no_chars_found')
				}));
			} else {
				alert(res.error || "Fehler beim Gründen des Vermächtnisses.");
			}
		} catch ($err) {
			console.error("Kritischer Fehler bei der Vermächtnisgründung:", $err);
			alert("Ein Fehler ist aufgetreten.");
		}
	}

	renderCharacterCard($char, $index) {
		const levelText = this.app.lang.get('char.level') || 'Stufe';
		const charClass = $char.class || $char.profession || 'abenteurer';
		const classKey = 'char.classes.' + charClass;
		const classText = this.app.lang.get(classKey);
		
		const displayClass = (classText === classKey) ? (charClass.charAt(0).toUpperCase() + charClass.slice(1)) : classText;
		const charName = $char.name || 'Unbekannt';

		const card = cE({
			$el: 'div',
			$class: ['select-card', 'fade-in', 'select-card-dynamic'],
			$onclick: () => this.selectCharacter($char.uuid),
			$childs: [
				{ 
					$el: 'div', 
					$class: 'char-avatar',
					$text: charName.charAt(0).toUpperCase() 
				},
				{
					$el: 'div',
					$class: 'char-info',
					$childs: [
						{ $el: 'span', $class: 'card-title', $text: charName + (this.legacy ? (' ' + this.legacy) : '') },
						{ $el: 'small', $class: ['card-desc', 'text-muted'], $text: levelText + ' ' + ($char.level || 1) + ' - ' + displayClass }
					]
				},
				{
					$el: 'div',
					$class: 'char-action',
					$childs: [
						{ $el: 'span', $class: 'char-action-icon', $text: '▶' }
					]
				}
			]
		});

		// Dynamic animation delay via element.style is safer than attribute string for CSP
		card.style.animationDelay = ($index * 0.15) + 's';

		return card;
	}

	async selectCharacter($uuid) {
		console.log("Held gewählt:", $uuid);
		this.app.connectWorld($uuid);
		await this.app.stage.load('world');
	}

	logout() {
		localStorage.removeItem('bifrost_token');
		this.app.stage.load('login');
	}

	goToCreator() {
		this.app.stage.load('char-creator');
	}

	goToGMArea() {
		this.app.stage.load('gm-panel');
	}
}
