import { State } from './State.js';


export class IdleState extends State {


	constructor($fsm) {
		super($fsm);
		this.timeInState = 0;
	}


	get name() { return 'idle'; }


	// Hilfsmethode für Zufallszahlen im Bereich [min, max]
	getRandomTime( $min, $max ) {
		return Math.random() * ($max - $min) + $min;
	}


	onEnter( $prevState ) {
		this.timeInState = 0;
		// Setze das nächste Ereignis zufällig zwischen 8 und 22 Sekunden
		this.nextIdleTrigger = this.getRandomTime(8, 22);
		//console.log('Entering idle state from', $prevState);
		const idleAction = this.fsm.proxy.getAction('idle');
		if( $prevState ) {
			const prevAction = this.fsm.proxy.getAction($prevState);
			idleAction.reset();
			idleAction.enabled = true;
			idleAction.setEffectiveTimeScale(1.0);
			idleAction.setEffectiveWeight(1.0);
			idleAction.crossFadeFrom(prevAction, 0.25, true);
			idleAction.play();
		}
		else {
			idleAction.play();
		}
	}


	onExit() {
		//console.log('Exiting idle state');
	}


	triggerRandomIdle() {
		// Zufällig zwischen 'hot' und 'boring' entscheiden
		const randomChoice = Math.random() > 0.5 ? 'idle_boring' : 'idle_hot';
		// Hier den Zustandswechsel deiner FSM aufrufen
		// Ich nehme an, die Methode heißt setState oder changeState
		this.fsm.setState(randomChoice);
	}


	onUpdate($delta, $input) {
		// Zeit akkumulieren ($delta ist üblicherweise in Sekunden bei Three.js)
        this.timeInState += $delta;
		// Hier könnte man z.B. Animationen abspielen oder auf Eingaben warten, um in einen anderen Zustand zu wechseln
		if( this.timeInState > this.nextIdleTrigger ) {
			this.triggerRandomIdle();
		}
	}


}