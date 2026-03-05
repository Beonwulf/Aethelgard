export class InputManager {
	constructor($settings) {
		this.settings = $settings;
		this.states = {};       // Hält-gedrückt Status (WASD etc.)
		this._justPressed = {}; // Einmalig feuernde Events (M, Teleport etc.)
		this._callbacks = {};   // Action → [callbacks]
		
		Object.keys(this.settings.keybinds).forEach($action => {
			this.states[$action] = false;
		});

		this.initEvents();
	}

	initEvents() {
		window.addEventListener('keydown', ($e) => {
			if ($e.repeat) return; // Kein Key-Repeat für justPressed
			this.updateKey($e.code, true);
		});
		window.addEventListener('keyup', ($e) => {
			this.updateKey($e.code, false);
		});
	}

	updateKey($code, $isPressed) {
		for (const [$action, $boundCode] of Object.entries(this.settings.keybinds)) {
			if ($code === $boundCode) {
				this.states[$action] = $isPressed;
				// Einmalig feuern bei keydown
				if ($isPressed) {
					this._justPressed[$action] = true;
					// Callbacks aufrufen
					this._callbacks[$action]?.forEach(cb => cb());
				}
			}
		}
	}

	isPressed($action) {
		return this.states[$action] || false;
	}

	// Einmalig feuern (pro Frame konsumieren)
	wasPressed($action) {
		const v = this._justPressed[$action] || false;
		this._justPressed[$action] = false;
		return v;
	}

	// Callback bei Tastendruck registrieren
	on($action, $callback) {
		if (!this._callbacks[$action]) this._callbacks[$action] = [];
		this._callbacks[$action].push($callback);
	}
}