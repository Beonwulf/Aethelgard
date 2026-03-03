export class FiniteStateMachine {

    constructor() {
        this.states = {};
        this.currentState = null;
    }

    addState(name, state) {
        this.states[name] = state;
    }


    setState($name) {
        const prevState = this.currentState ? this.currentState.name : null;
        if (this.currentState) {
            if (this.currentState.name == $name) {
                return;
            }
            this.currentState.onExit();
        }
        this.currentState = new this.states[$name](this);
        this.currentState.onEnter(prevState);
    }


    update($timeElapsed, $input=null) {
        if (this.currentState) {
            this.currentState.onUpdate($timeElapsed, $input);
        }
    }

}