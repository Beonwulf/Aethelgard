import { world_entity} from '../../src/world-entity.mjs';
import { world_client} from '../../src/world-client.mjs';
import { quat, vec3 } from 'gl-matrix';
import { defs } from '../../../client/shared/defs.mjs';


export class MonsterSpawner {


	constructor(params) {
		this.parent_ = params.parent;
		this.grid_ = this.parent_.grid_;
		this.terrain_ = this.parent_.terrain_;
		this.pos_ = params.pos;
		this.pos_[1] = this.terrain_.Get(...params.pos)[0];
		this.params_ = params;
	}


	spawn() {
		// Hack
		const e = new world_entity.WorldEntity({
			id: this.parent_.ids_++,
			position: vec3.clone(this.pos_),
			rotation: quat.fromValues(0, 0, 0, 1),
			grid: this.grid_,
			character: {
				definition: defs.CHARACTER_MODELS[this.params_.class],
				class: this.params_.class,
			},
			account: {accountName: defs.CHARACTER_MODELS[this.params_.class].name},
		});

		const wc = new world_client.WorldAIClient(e, this.terrain_, () => {
			this.entity_ = null;
			console.log('entity gone, spawner making now one soon');
		});

		this.parent_.addMonster(wc);

		this.entity_ = wc;
	}


	update(timeElapsed) {
		if (!this.entity_) {
			this.spawn();
		}
	}


}