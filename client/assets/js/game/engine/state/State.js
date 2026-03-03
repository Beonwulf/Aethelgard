export class State {


	constructor($fsm) {
		this.fsm = $fsm;
	}


	get name() { throw new Error('get name() muss in der Unterklasse implementiert werden'); }

	onEnter($prevState) {}
	onUpdate($timeElapsed, $input) {}
	onExit() {}


}