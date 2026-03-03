export class BasicCharacterControllerProxy {


	#animations = null;


	constructor( $animations ) {
		this.#animations = $animations;
	}


	get animations() {
		return this.#animations;
	}


	getAction($animName) {
		return this.#animations[$animName].action;
	}	


}