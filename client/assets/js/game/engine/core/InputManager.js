export class InputManager {
	constructor($settings) {
		this.settings = $settings;
		this.states = {};
		
		// Alle Aktionen initialisieren
		Object.keys(this.settings.keybinds).forEach($action => {
			this.states[$action] = false;
		});

		this.initEvents();
	}

	initEvents() {
		window.addEventListener('keydown', ($e) => this.updateKey($e.code, true));
		window.addEventListener('keyup', ($e) => this.updateKey($e.code, false));
	}

	updateKey($code, $isPressed) {
		for (const [$action, $boundCode] of Object.entries(this.settings.keybinds)) {
			if ($code === $boundCode) {
				this.states[$action] = $isPressed;
			}
		}
	}

	isPressed($action) {
		return this.states[$action] || false;
	}
}