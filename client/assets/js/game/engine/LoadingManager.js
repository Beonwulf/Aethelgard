/**
 * LoadingManager – zentraler Fortschritts-Tracker für den Ladescreen.
 * 
 * Verwendung:
 *   loadingManager.addTask('terrain')
 *   loadingManager.completeTask('terrain', 'Terrain geladen')
 *   loadingManager.finish()  → Fade-Out
 */
export class LoadingManager {
	constructor() {
		this._screen  = document.getElementById('loading-screen');
		this._bar     = document.getElementById('loading-bar');
		this._status  = document.getElementById('loading-status');
		this._tasks   = new Map();  // name → done
		this._total   = 0;
		this._done    = 0;
	}

	/** Task registrieren (vor dem Laden aufrufen) */
	addTask($name) {
		this._tasks.set($name, false);
		this._total++;
		this._update();
	}

	/** Task als erledigt markieren */
	completeTask($name, $statusText = '') {
		if (!this._tasks.has($name)) return;
		if (this._tasks.get($name)) return; // Bereits erledigt
		this._tasks.set($name, true);
		this._done++;
		if ($statusText) this._setStatus($statusText);
		this._update();
	}

	/** Ladebalken auf 100% setzen und Screen ausblenden */
	finish($statusText = 'Bereit') {
		this._setStatus($statusText);
		this._setProgress(100);
		setTimeout(() => {
			this._screen?.classList.add('fade-out');
			// Nach Fade-Out komplett entfernen
			setTimeout(() => this._screen?.remove(), 900);
		}, 400);
	}

	_update() {
		if (this._total === 0) return;
		const pct = Math.round((this._done / this._total) * 95); // max 95% – finish() macht 100%
		this._setProgress(pct);
	}

	_setProgress($pct) {
		if (this._bar) this._bar.style.width = `${$pct}%`;
	}

	_setStatus($text) {
		if (this._status) this._status.textContent = $text;
	}
}
