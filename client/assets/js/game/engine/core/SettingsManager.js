export class SettingsManager {
	constructor() {
		this.keybinds = {
			// Bewegung
			'MOVE_FORWARD':  'KeyW',
			'MOVE_BACKWARD': 'KeyS',
			'MOVE_LEFT':     'KeyA',
			'MOVE_RIGHT':    'KeyD',
			'JUMP':          'Space',
			'SPRINT':        'ShiftLeft',

			// Teleport
			'TELEPORT_1':    'Digit1',
			'TELEPORT_2':    'Digit2',
			'TELEPORT_3':    'Digit3',
			'TELEPORT_4':    'Digit4',

			// Action Bar Slots (1-0, -, =)
			'ABILITY_1':     'Digit1',
			'ABILITY_2':     'Digit2',
			'ABILITY_3':     'Digit3',
			'ABILITY_4':     'Digit4',
			'ABILITY_5':     'Digit5',
			'ABILITY_6':     'Digit6',
			'ABILITY_7':     'Digit7',
			'ABILITY_8':     'Digit8',
			'ABILITY_9':     'Digit9',
			'ABILITY_10':    'Digit0',
			'ABILITY_11':    'Minus',
			'ABILITY_12':    'Equal',

			// GUI
			'MAP_TOGGLE':    'KeyM',
		};
		this.load();
	}

	getCode($action) {
		return this.keybinds[$action] || null;
	}

	save() {
		localStorage.setItem('aethelgard_keys', JSON.stringify(this.keybinds));
	}

	load() {
		const saved = localStorage.getItem('aethelgard_keys');
		if (saved) this.keybinds = { ...this.keybinds, ...JSON.parse(saved) };
	}
}