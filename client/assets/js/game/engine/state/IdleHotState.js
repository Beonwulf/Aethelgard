import { State } from './State.js';
import { LoopOnce } from 'three';


export class IdleHotState extends State {


	constructor($fsm) {
		super($fsm);
		this.action = null;
		this.finishedCallback = () => {
			this.finished();
		}
	}


	get name() { return 'idle_hot'; }


	onEnter( $prevState ) {
		console.log('Entering idle_hot state from', $prevState);
		this.action = this.fsm.proxy.getAction('idle_hot');
		this.action.getMixer().addEventListener('finished', this.finishedCallback);
		if( $prevState ) {
			this.action.reset();
			const prevAction = this.fsm.proxy.getAction($prevState);
			this.action.setLoop(LoopOnce, 1);
			this.action.clampWhenFinished = true;
			this.action.crossFadeFrom(prevAction, 0.4, true);
			this.action.play();
		}
		else {
			this.action.setLoop(LoopOnce, 1);
			this.action.clampWhenFinished = true;
			this.action.play();
		}
	}


	finished() {
		this.cleanup();
		this.fsm.setState('idle');
	}


	cleanup() {
		if( this.action ) {
			this.action.getMixer().removeEventListener('finished', this.finishedCallback);
		}
	}


	onExit() {
		console.log('Exiting idle_hot state');
	}


	onUpdate($timeElapsed, $input) {
		// Hier könnte man z.B. Animationen abspielen oder auf Eingaben warten, um in einen anderen Zustand zu wechseln
	}


}