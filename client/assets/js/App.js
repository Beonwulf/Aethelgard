import { AuthService } from './services/AuthService.js';
import { ApiService } from './services/ApiService.js';
import { AdminService } from './services/AdminService.js';
import { Lang } from './utils/Lang.js';
import { StageManager } from './core/StageManager.js';

class BeonClient {

	static #instance = null;
	static getInstance() {
		if( this.#instance === null ) {
			this.#instance = new BeonClient();
		}
		return this.#instance;
	}

	constructor() {
		// 1. Kern-Module initialisieren
		this.lang = Lang;
		this.auth = new AuthService();
		this.api = new ApiService(this);
		this.admin = new AdminService(this);

		// Platzhalter für später
		this.stageManager = null; // Der StageManager bekommt die App-Instanz
		this.socket = null;
		this.user = null;

		this.config = {
			defaultLang: 'de',
			apiBase: '/api'
		};
	}

	get stage() { return this.stageManager; }

	/**
	 * Das Herzstück: Startet die gesamte Client-Logik
	 */
	async ignite() {
		console.log("🚀 Bifröst-System wird initialisiert...");
		try {
			console.log("⚡ Bifröst Client erwacht...");

			// 1. Sprache laden (Initial)
			await this.lang.load(this.config.defaultLang);

			// 2. Prüfen, ob wir noch ein gültiges Token haben (Auto-Login)
			const savedToken = localStorage.getItem('bifrost_token');
			let controller = 'login';
			if (savedToken) {
				console.log("🔑 Token gefunden, validiere Sitzung...");
				const sessionData = await this.auth.validateToken();
				if (sessionData && sessionData.valid) {
					console.log("✅ Sitzung gültig.");
					this.user = {
						name: sessionData.user,
						id: sessionData.id,
						role: sessionData.role
					};
					controller = 'char-select';
				} else {
					console.warn("⚠️ Sitzung abgelaufen.");
					localStorage.removeItem('bifrost_token');
				}
			}

			// 3. StageManager initialisieren (Der das UI-Handling übernimmt)
			this.stageManager = new StageManager(this);

			console.log("⚔️ Midgard-Portal ist bereit.");

			// 4. Start-Szene laden (z.B. Login)
			this.stageManager.setup(document.getElementById('app-root'))
			this.stageManager.load(controller);

		} catch (error) {
			console.error("⏱ Kritischer Fehler beim Start:", error);
		}
	}

	/**
	 * Initialisiert die Socket-Verbindung, sobald ein Charakter gewählt wurde
	 */
	connectWorld(charUuid) {
		if (this.socket) { this.socket.disconnect(); }

		this.socket = io({
			auth: {
				token: this.auth.getToken(),
				charUuid: charUuid
			}
		});

		this.socket.on('connect', () => {
			console.log("🌍 Verbindung zur Welt herstellt.");
		});

		this.socket.on('world.welcome', ($data) => {
			console.log("👋 Willkommen in Aethelgard!", $data);
			this.startGame($data);
		});

		this.socket.on('connect_error', (err) => {
			console.error("🚫 Bifröst-Zutritt verweigert:", err.message);
		});
	}

	startGame(worldData) {
		// Hier wechseln wir die "Bühne" und laden das eigentliche Spiel
		this.stage.load('game', worldData);
	}
}

// Als Singleton exportieren
export const App = BeonClient.getInstance();
