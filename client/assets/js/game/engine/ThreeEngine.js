import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls';


export class ThreeEngine {
	constructor(canvasId) {
		this.environment = null;
		this.canvas = document.querySelector(canvasId);

		const options = {
			antialias: true,
			powerPreference: "high-performance"
		};
		if( this.canvas ) {
			options.canvas = this.canvas;
		}
		this.renderer = new THREE.WebGLRenderer(options);
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 50000);
		this.clock = new THREE.Clock();
		this.controls = new OrbitControls(this.camera, this.renderer.domElement); // Hier später deine Kamerasteuerung (z.B. OrbitControls oder eigene Third-Person-Kamera)
		this.controls.enabled = false; // Startet deaktiviert, bis die Welt geladen ist

		if( !this.canvas ) {
			document.body.appendChild(this.renderer.domElement);
		}
		
		//this.init();
	}

	init() {
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		this.renderer.shadowMap.enabled = true;

		// Standard-Kameraposition (hoch oben, um die Insel zu finden)
        this.camera.position.set(45 * 1920, 500, 20 * 1920);
		this.controls.target.set(0,0,0);

		/**
		 * Debug-Hilfen, um die Orientierung zu behalten. Kann später entfernt werden.
		 * Gerade bei einer großen, offenen Welt ist es leicht, die Orientierung zu verlieren.
		 * Ein einfaches Achsenkreuz und ein Licht-Helper können hier Wunder wirken.
		 *//**
		// Zeigt die X, Y, Z Achsen (Rot, Grün, Blau)
		const axesHelper = new THREE.AxesHelper(5000);
		this.scene.add(axesHelper);

		// Zeigt an, wo die Sonne steht
		const helper = new THREE.DirectionalLightHelper(this.environment.sun, 500);
		this.scene.add(helper);/**/

		window.addEventListener('resize', () => this.onResize());
	}

	onResize() {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
	}

	render(onUpdate) {
		const loop = () => {
			requestAnimationFrame(loop);
			const deltaTime = this.clock.getDelta();
			const elapsedTime = this.clock.getElapsedTime();

			this.controls.update();

			if (onUpdate) onUpdate(deltaTime, elapsedTime); // Hier wird die Game-Logik aufgerufen
			this.renderer.render(this.scene, this.camera);
		};
		loop();
	}
}