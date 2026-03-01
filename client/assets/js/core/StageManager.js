import { LoginController } from '../controllers/LoginController.js';
import { CharSelectController } from '../controllers/CharSelectController.js';
import { CharCreatorController } from '../controllers/CharCreatorController.js';
import { GMPanelController } from '../controllers/AdminController.js';
import { GameController } from '../controllers/GameController.js';
//import { WorldController } from '../controllers/WorldController.js';


export class StageManager {


	constructor(app) {
		this.app = app;
		this.root = null;
		this.currentController = null;

		// Map von Namen zu Klassen
		this.registry = {
			'login': LoginController,
			'char-select': CharSelectController,
			'char-creator': CharCreatorController,
			'gm-panel': GMPanelController,
			'game': GameController,
			//'world': WorldController
		};
	}

	setup(rootElement) {
		this.root = rootElement;
	}


	async load(sceneName, data) {
		console.log(`🎭 Wechsel zu Szene: ${sceneName}`);

		// 1. Alten Controller aufräumen
		if (this.currentController && this.currentController.destroy) {
			this.currentController.destroy();
		}

		// 2. Neuen Controller instanziieren
		const ControllerClass = this.registry[sceneName];
		if (!ControllerClass) throw new Error(`Szene ${sceneName} unbekannt.`);

		this.currentController = new ControllerClass(this.app);

		// 3. Controller-Daten laden (JSON & Lang)
		await this.currentController.init();

		// 4. In den Root-Container rendern
		//this.root.innerHTML = ''; // Vorher leeren
		//this.root.appendChild(this.currentController.view);
		this.currentController.render(this.root, data);
		
		// 5. Lifecycle Hook aufrufen
		if (this.currentController.onReady) {
			this.currentController.onReady();
		}
	}


}