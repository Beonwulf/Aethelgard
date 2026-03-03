import { FiniteStateMachine } from './FiniteStateMachine.js';
import { IdleState } from './IdleState.js';
import { IdleHotState } from './IdleHotState.js';
import { IdleBoringState } from './IdleBoringState.js';


export class DummyFSM extends FiniteStateMachine {

	constructor( $proxy ) {
		super();
		this.proxy = $proxy;
		this.init();
	}


	init() {
		this.addState('idle', IdleState);
		this.addState('idle_hot', IdleHotState);
		this.addState('idle_boring', IdleBoringState);
	}


}