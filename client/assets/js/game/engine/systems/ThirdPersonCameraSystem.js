import * as THREE from 'three';


export class ThirdPersonCameraSystem {
	constructor($camera, $ecs, $worldManager) {
		this.camera = $camera;
		this.ecs = $ecs;
		this.world = $worldManager;
		
		// Wichtig: Diese Vektoren müssen initialisiert sein
		this.currentLookAt = new THREE.Vector3();
		
		this.isLeftMouseDown = false;
		this.isRightMouseDown = false;
		
		// Wir speichern das Delta für das Update
		this.mouseDeltaX = 0;
		this.mouseDeltaY = 0;

		this.raycaster = new THREE.Raycaster();
        this.cameraCollisionDirection = new THREE.Vector3();
		
		this.initEvents();
	}

	initEvents() {
		// Mausklicks tracken
		window.addEventListener('mousedown', ($e) => {
			if ($e.button === 0) this.isLeftMouseDown = true;
			if ($e.button === 2) this.isRightMouseDown = true;
		});

		window.addEventListener('mouseup', ($e) => {
			if ($e.button === 0) this.isLeftMouseDown = false;
			if ($e.button === 2) this.isRightMouseDown = false;
		});

		// Kontextmenü beim Rechtsklick unterdrücken
		window.addEventListener('contextmenu', ($e) => $e.preventDefault());

		window.addEventListener('mousemove', ($e) => {
			if (this.isLeftMouseDown || this.isRightMouseDown) {
				// Wir summieren das Delta auf, falls mehrere Events pro Frame kommen
				this.mouseDeltaX += $e.movementX;
				this.mouseDeltaY += $e.movementY;
			}
		});

		// Zoom-Funktion
		window.addEventListener('wheel', ($e) => {
			const player = this.ecs.getEntityByTag('player');
			if (player === undefined) return;
			const cam = this.ecs.getComponent(player, 'camera');
			if (cam) {
				cam.distance += $e.deltaY * 0.02;
				cam.distance = Math.max(2, Math.min(100, cam.distance));
			}
		}, { passive: true });
	}

	update($dt) {
		const player = this.ecs.getEntityByTag('player');
		if (player === undefined) return;

		const pos = this.ecs.getComponent(player, 'position');
		const cam = this.ecs.getComponent(player, 'camera');
		const rotation = this.ecs.getComponent(player, 'rotation');

		if (!pos || !cam) return;

		// 1. Damping Faktor berechnen
		const t = 1.0 - Math.pow(0.001, $dt);

		// 2. Rotation verarbeiten
		const sensitivity = 0.003;
		cam.theta -= this.mouseDeltaX * sensitivity;
		cam.phi -= this.mouseDeltaY * sensitivity;

		// Winkel einschränken (nicht direkt unter/über den Spieler schauen)
		cam.phi = Math.max(0.1, Math.min(Math.PI * 0.48, cam.phi));

		// WoW-Spezial: Rechtsklick dreht Charakter (und damit die Vorwärts-Richtung)
		if (this.isRightMouseDown && rotation) {
			rotation.y = cam.theta + Math.PI / 2;
		}

		// 3. Sphärische Berechnung der Zielposition
		const offX = cam.distance * Math.sin(cam.phi) * Math.cos(cam.theta);
		const offY = cam.distance * Math.cos(cam.phi);
		const offZ = cam.distance * Math.sin(cam.phi) * Math.sin(cam.theta);

		const idealPos = new THREE.Vector3(
			pos.x + offX,
			pos.y + offY,
			pos.z + offZ
		);

		const idealLookAt = new THREE.Vector3(
			pos.x,
			pos.y + (cam.targetHeight || 1.7),
			pos.z
		);

        // 4. Terrain Collision
        this.cameraCollisionDirection.subVectors(idealPos, idealLookAt).normalize();
        this.raycaster.set(idealLookAt, this.cameraCollisionDirection);
        this.raycaster.far = cam.distance;

        const terrainMeshes = this.world.getMeshes();
        const intersects = this.raycaster.intersectObjects(terrainMeshes);

        let finalPos = idealPos;
        if (intersects.length > 0) {
            finalPos = intersects[0].point.add(this.cameraCollisionDirection.multiplyScalar(-0.5));
        }

		// 5. Anwendung mit Lerp
		this.camera.position.lerp(finalPos, t);
		this.currentLookAt.lerp(idealLookAt, t);
		this.camera.lookAt(this.currentLookAt);

		// Input für diesen Frame verbraucht
		this.mouseDeltaX = 0;
		this.mouseDeltaY = 0;
	}
}