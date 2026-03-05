import * as THREE from 'three';


export class ThirdPersonCameraSystem {
	constructor($camera, $ecs, $worldManager, $input) {
		this.camera = $camera;
		this.ecs = $ecs;
		this.world = $worldManager;
		this.input = $input;
		
		this._currentPosition = new THREE.Vector3();
		this._currentLookat = new THREE.Vector3();

		this.isLeftMouseDown = false;
		this.isRightMouseDown = false;
		this.mouseDeltaX = 0;
		this.mouseDeltaY = 0;

		// Wie lange seit letzter Mausbewegung (für Auto-Return)
		this._timeSinceMouseMove = 0;
		// Verzögerung in Sekunden bevor Kamera zurückschnappt
		this._returnDelay = 1.5;

		this.raycaster = new THREE.Raycaster();
		this.cameraCollisionDirection = new THREE.Vector3();
		
		this.initEvents();
	}

	initEvents() {
		window.addEventListener('mousedown', ($e) => {
			if ($e.button === 0) this.isLeftMouseDown = true;
			if ($e.button === 2) this.isRightMouseDown = true;
		});
		window.addEventListener('mouseup', ($e) => {
			if ($e.button === 0) this.isLeftMouseDown = false;
			if ($e.button === 2) this.isRightMouseDown = false;
		});
		window.addEventListener('contextmenu', ($e) => $e.preventDefault());
		window.addEventListener('mousemove', ($e) => {
			if (this.isLeftMouseDown || this.isRightMouseDown) {
				this.mouseDeltaX += $e.movementX;
				this.mouseDeltaY += $e.movementY;
				this._timeSinceMouseMove = 0; // Timer zurücksetzen bei Mausbewegung
			}
		});
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

	_calculateIdealOffset($pos, $rotation, $cam) {
		// Offset hinter + über dem Charakter – per applyQuaternion mit Charakterrotation mitdrehen
		const offset = new THREE.Vector3(0, $cam.distance * 0.4, -$cam.distance);
		const quat = new THREE.Quaternion().setFromEuler(
			new THREE.Euler(0, $rotation ? $rotation.y : 0, 0, 'YXZ')
		);
		// Phi (vertikaler Winkel) per separater Quaternion
		const phiQuat = new THREE.Quaternion().setFromAxisAngle(
			new THREE.Vector3(1, 0, 0), $cam.phi - Math.PI * 0.3
		);
		offset.applyQuaternion(phiQuat);
		offset.applyQuaternion(quat);
		offset.add(new THREE.Vector3($pos.x, $pos.y, $pos.z));

		// Terrain-Boden via getHeightAt (O(1), kein Raycaster nötig)
		const groundY = this.world.getHeightAt(offset.x, offset.z);
		if (groundY !== null) offset.y = Math.max(offset.y, groundY + 1.5);

		return offset;
	}

	_calculateIdealLookat($pos, $rotation, $cam) {
		const lookat = new THREE.Vector3(0, 0, $cam.distance * 0.15);
		const quat = new THREE.Quaternion().setFromEuler(
			new THREE.Euler(0, $rotation ? $rotation.y : 0, 0, 'YXZ')
		);
		lookat.applyQuaternion(quat);
		lookat.add(new THREE.Vector3($pos.x, $pos.y + ($cam.targetHeight || 1.7), $pos.z));
		return lookat;
	}

	update($dt) {
		const player = this.ecs.getEntityByTag('player');
		if (player === undefined) return;

		const pos = this.ecs.getComponent(player, 'position');
		const cam = this.ecs.getComponent(player, 'camera');
		const rotation = this.ecs.getComponent(player, 'rotation');

		if (!pos || !cam) return;

		// Smooth-Faktor (Simon Dev Ansatz: framerate-unabhängig)
		const t = 1.0 - Math.pow(0.001, $dt);

		// Maus-Rotation verarbeiten
		const sensitivity = 0.003;
		cam.theta -= this.mouseDeltaX * sensitivity;
		cam.phi -= this.mouseDeltaY * sensitivity;
		cam.phi = Math.max(0.05, Math.min(Math.PI * 0.45, cam.phi));

		// Rechtsklick dreht Charakter mit
		if (this.isRightMouseDown && rotation) {
			rotation.y = cam.theta + Math.PI / 2;
		}

		// Auto-Return: Kamera schnappt hinter den Char zurück wenn Spieler sich bewegt
		// und die Maus eine Weile nicht bewegt wurde
		const isMoving = this.input && (
			this.input.isPressed('MOVE_FORWARD') ||
			this.input.isPressed('MOVE_BACKWARD') ||
			this.input.isPressed('MOVE_LEFT') ||
			this.input.isPressed('MOVE_RIGHT')
		);
		if (isMoving && !this.isLeftMouseDown && !this.isRightMouseDown) {
			this._timeSinceMouseMove += $dt;
		} else if (!isMoving || this.isLeftMouseDown || this.isRightMouseDown) {
			this._timeSinceMouseMove = 0;
		}

		if (this._timeSinceMouseMove > this._returnDelay && rotation) {
			// Sanft theta Richtung "hinter dem Char" lerpen
			const targetTheta = rotation.y - Math.PI / 2;
			// Kürzesten Weg um den Kreis nehmen
			let diff = targetTheta - cam.theta;
			while (diff > Math.PI)  diff -= Math.PI * 2;
			while (diff < -Math.PI) diff += Math.PI * 2;
			cam.theta += diff * Math.min(1, $dt * 3.0);
		}

		// Ideale Position & LookAt berechnen
		// Nutze theta für horizontale Kamera-Rotation (unabhängig vom Charakter bei Linksklick)
		const rotY = this.isRightMouseDown && rotation ? rotation.y : cam.theta + Math.PI / 2;
		const fakeRotation = { y: rotY };

		const idealOffset = this._calculateIdealOffset(pos, fakeRotation, cam);
		const idealLookat = this._calculateIdealLookat(pos, fakeRotation, cam);

		// Sanftes Lerp (wie Simon Dev)
		this._currentPosition.lerp(idealOffset, t);
		this._currentLookat.lerp(idealLookat, t);

		this.camera.position.copy(this._currentPosition);
		this.camera.lookAt(this._currentLookat);

		this.mouseDeltaX = 0;
		this.mouseDeltaY = 0;
	}
}