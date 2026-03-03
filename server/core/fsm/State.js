export class State {


	constructor() {
		this.parent = null; // Wird von der FSM gesetzt
	}


	broadcast( $evt ) {
		this.parent.broadcast( $evt );
	}


	onEnter( $prevState ) {}


	onMessage( $evtopic, $data ) { return false; }


	onExit() {}


}