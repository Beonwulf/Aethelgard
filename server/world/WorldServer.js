import { performance } from 'perf_hooks';
//import { WorldManager } from './WorldManager.js';

export class WorldServer {


	#worldMgr = null;


	constructor($io, $db) {
		this.io = $io;
		this.db = $db;
		this.#worldMgr = null; // Todo: WorldManager implementieren und hier instanziieren
		this.setupIO($io);
	}


	setupIO($io) {
		$io.on('connection', socket => {
			console.log("🟢 Ein Held ist im WorldServer verbunden:", socket.user.username);
			
			// Hier übergeben wir den Socket (der jetzt durch die Middleware den User und Char hat) 
			// an den WorldManager
			this.onLogin(socket, { 
				user: socket.user, 
				charUuid: socket.charUuid 
			});

			socket.on('disconnect', () => {
				console.log("🔴 Held hat Aethelgard verlassen:", socket.user.username);
				// this.worldMgr_.remove(socket); // TODO: Implementieren im WorldManager
			});
		});
	}

	onLogin($client, $params) {
		//this.worldMgr_.add($client, $params);
	}

	run() {
		let t1 = performance.now();
		this.schedule(t1);
	}

	schedule($t1) {
		setTimeout(() => {
			let t2 = performance.now();
			this.update((t2 - $t1) * 0.001);
			this.schedule(t2);
		});
	}

	update($timeElapsed) {
		//this.worldMgr_.update($timeElapsed);
	}

}
