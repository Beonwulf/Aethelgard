import * as THREE from 'three';


export class WaterManager {


	constructor(scene) {
		this.scene = scene;
		this.water = null;
		
		this.init();
	}


	init() {
		// Einfache Horizont-Plane – nur sichtbar wo keine Terrain-Chunks geladen sind.
		// Der eigentliche Wasser-Shader läuft im Terrain-Shader (vHeight < 0).
		const geometry = new THREE.PlaneGeometry(200000, 200000);
		const material = new THREE.MeshBasicMaterial({
			color: 0x003a55,
			depthWrite: false,
		});
		this.water = new THREE.Mesh(geometry, material);
		this.water.rotation.x = -Math.PI / 2;
		this.water.position.y = -0.5;
		this.water.renderOrder = -1;
		this.scene.add(this.water);
	}


	update() {
		// Horizon-Plane ist statisch – kein Update nötig
	}


}