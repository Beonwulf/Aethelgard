export class SettingsManager {
	constructor() {
		this.keybinds = {
			'MOVE_FORWARD': 'KeyW',
			'MOVE_BACKWARD': 'KeyS',
			'MOVE_LEFT': 'KeyA',
			'MOVE_RIGHT': 'KeyD',
			'JUMP': 'Space'
		};
		this.load();
	}

	save() {
		localStorage.setItem('aethelgard_keys', JSON.stringify(this.keybinds));
	}

	load() {
		const saved = localStorage.getItem('aethelgard_keys');
		if (saved) this.keybinds = { ...this.keybinds, ...JSON.parse(saved) };
	}
}