export class FiniteStateMachine {


	constructor( $onEvent ) {
		this.currentState = null;
		this.onEvent = $onEvent;
	}


	get state() {
		return this.currentState;
	}


	broadcast( $evt ) {
		this.onEvent( $evt );
	}


	onMessage( $topic, $data ) {
		if (!this.currentState) return false;
		return this.currentState.onMessage( $topic, $data );
	}


	setState( $newState ) {
		const prevState = this.currentState;

		if( prevState ) {
			prevState.onExit();
		}


		this.currentState = $newState;
		this.currentState.parent = this; // Verknüpfung für den Broadcast
		this.currentState.onEnter(prevState);
	}


}