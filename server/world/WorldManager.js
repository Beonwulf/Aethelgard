import { MonsterSpawner } from './spawner/MonsterSpawner.js';
import { WorldEntity } from './entities/WorldEntity.js';
import { WorldClient } from './clients/WorldClient.js';

const _TICK_RATE = 0.1;

export class WorldManager {

	constructor($parent) {
		this.parent = $parent;
		this.ids_ = 0;
		this.entities_ = [];
		// Später: SpatialHashGrid für unser eigenes System
		
		this.spawners_ = [];
		this.tickTimer_ = 0.0;
	}

	addMonster($e) {
		this.entities_.push($e);
	}

	async add($client, $params) {
		console.log("Held betritt die Welt-Simulation:", $params.user.username);

		// TODO: Lade Charakter-Daten aus this.parent.db anhand $params.charUuid
		const characterData = await this.parent.db.getCharacterByUuid($params.charUuid);
		
		if (!characterData) {
			console.error(`Konnte Charakter mit UUID ${$params.charUuid} nicht laden.`);
			$client.disconnect();
			return;
		}

		const entity = new WorldEntity(characterData);
		const worldClient = new WorldClient($client, entity);

		this.entities_.push(entity);
		
		// Sende dem neuen Spieler seine Daten und die der anderen Spieler
		worldClient.send('world.welcome', {
			playerId: entity.id,
			players: this.entities_.map(e => e.broadcastable)
		});

		// Sende den anderen Spielern die Daten des neuen Spielers
		this.broadcastToAllExcept(worldClient, 'world.player.spawn', entity.broadcastable);
	}

	broadcastToAllExcept($exceptClient, $event, $data) {
		for (const entity of this.entities_) {
			if (entity.client && entity.client !== $exceptClient) {
				entity.client.send($event, $data);
			}
		}
	}

	remove($client) {
		// TODO: Entferne WorldEntity und WorldClient, wenn der Spieler die Verbindung trennt
	}

	update($timeElapsed) {
		this.tickClientState($timeElapsed);
		this.updateEntities($timeElapsed);
		this.updateSpawners($timeElapsed);
	}

	tickClientState($timeElapsed) {
		this.tickTimer_ += $timeElapsed;
		if (this.tickTimer_ < _TICK_RATE) {
			return;
		}
		this.tickTimer_ = 0.0;

		/*
		for (let i = 0; i < this.entities_.length; ++i) {
			this.entities_[i].UpdateClientState_();
		}
		for (let i = 0; i < this.entities_.length; ++i) {
			this.entities_[i].entity_.events_ = [];
		}
		*/
	}

	updateSpawners($timeElapsed) {
		for (let i = 0; i < this.spawners_.length; ++i) {
			this.spawners_[i].update($timeElapsed);
		}
	}

	updateEntities($timeElapsed) {
		/*
		const dead = [];
		const alive = [];

		for (let i = 0; i < this.entities_.length; ++i) {
			const e = this.entities_[i];
			e.Update($timeElapsed);

			if (e.IsDead) {
				dead.push(e);
			} else {
				alive.push(e);
			}
		}

		this.entities_ = alive;

		for (let d of dead) {
			d.OnDeath();
			d.Destroy();
		}
		*/
	}

}
