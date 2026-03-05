import { LoginController } from '../controllers/LoginController.js';
import { CharSelectController } from '../controllers/CharSelectController.js';
import { CharCreatorController } from '../controllers/CharCreatorController.js';
import { GMPanelController } from '../controllers/AdminController.js';
import { GameController } from '../controllers/GameController.js';
import { LandingController } from '../controllers/LandingController.js';
import { CulturesController } from '../controllers/CulturesController.js';
import { CallingController } from '../controllers/CallingController.js';
import { WorldController } from '../controllers/WorldController.js';
import { TalentsController } from '../controllers/TalentsController.js';


export class StageManager {


	constructor(app) {
		this.app = app;
		this.root = null;
		this.currentController = null;

		// Map von Namen zu Klassen
		this.registry = {
			'landing': LandingController,
			'cultures': CulturesController,
			'calling': CallingController,
			'talents': TalentsController,
			'world': WorldController,
			'login': LoginController,
			'char-select': CharSelectController,
			'char-creator': CharCreatorController,
			'gm-panel': GMPanelController,
			'game': GameController,
			//'world': WorldController
		};
	}

	// Web-Szenen zeigen die Landingpage/Infoseiten (Scrolling erlaubt)
	static WEB_SCENES = new Set(['landing', 'cultures', 'calling', 'talents', 'world']);

	setup(rootElement) {
		this.root = rootElement;
		// Spinner einmalig erstellen
		this._spinner = document.createElement('div');
		this._spinner.id = 'stage-spinner';
		this._spinner.innerHTML = '<div class="spinner-ring"></div>';
		document.body.appendChild(this._spinner);
	}

	_showSpinner() { this._spinner.classList.add('visible'); }
	_hideSpinner() { this._spinner.classList.remove('visible'); }

	_applyWebMode(sceneName) {
		const isWeb = StageManager.WEB_SCENES.has(sceneName);
		document.body.classList.toggle('web', isWeb);
		document.documentElement.classList.toggle('web', isWeb);
	}

	async load(sceneName, data) {
		console.log(`🎭 Wechsel zu Szene: ${sceneName}`);

		// 1. Alten Controller aufräumen
		if (this.currentController && this.currentController.destroy) {
			this.currentController.destroy();
		}

		// 2. Web-Modus setzen + Spinner anzeigen
		this._applyWebMode(sceneName);
		this._showSpinner();

		// 3. Neuen Controller instanziieren
		const ControllerClass = this.registry[sceneName];
		if (!ControllerClass) throw new Error(`Szene ${sceneName} unbekannt.`);

		this.currentController = new ControllerClass(this.app);

		// 4. Controller-Daten laden (JSON & Lang)
		await this.currentController.init();

		// DEV: Spinner-Test – entfernen vor Release
		// await new Promise(r => setTimeout(r, 1500));

		// 5. Spinner ausblenden + rendern
		this._hideSpinner();
		this.currentController.render(this.root, data);
		
		// 6. Lifecycle Hook aufrufen
		if (this.currentController.onReady) {
			this.currentController.onReady();
		}
	}


}
