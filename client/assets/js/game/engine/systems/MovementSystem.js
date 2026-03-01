import * as THREE from 'three';

export class MovementSystem {
    constructor($ecs, $inputManager, $worldManager) {
        this.ecs = $ecs;
        this.input = $inputManager;
        this.world = $worldManager;
        
        // Da wir kein Raycasting mehr nutzen, brauchen wir Raycaster & DownVector nicht mehr.
        // Das spart CPU-Zyklen!
    }

    update($dt) {
        const player = this.ecs.getEntityByTag('player');
        if (player === undefined) return;

        const pos = this.ecs.getComponent(player, 'position');
        const cam = this.ecs.getComponent(player, 'camera');
        
        if (!pos || !cam) return;

        // 1. Bewegung berechnen (WASD)
        const speed = 25.0; 
        const moveDir = new THREE.Vector3();

        if (this.input.isPressed('MOVE_FORWARD')) moveDir.z -= 1;
        if (this.input.isPressed('MOVE_BACKWARD')) moveDir.z += 1;
        if (this.input.isPressed('MOVE_LEFT')) moveDir.x -= 1;
        if (this.input.isPressed('MOVE_RIGHT')) moveDir.x += 1;

        if (moveDir.length() > 0) {
            moveDir.normalize();
            
            // Laufrichtung an Kamera-Theta anpassen
            const angle = cam.theta + Math.PI / 2;
            moveDir.applyAxisAngle(new THREE.Vector3(0, 1, 0), angle);
            
            pos.x += moveDir.x * speed * $dt;
            pos.z += moveDir.z * speed * $dt;
        }

        // 2. Bodenhöhe ermitteln (Mathematisch statt Raycasting)
        // Wir holen uns die Höhe direkt aus dem WorldManager
        const groundY = this.world.getHeightAt(pos.x, pos.z);
        
        // 3. Höhenanpassung & "Smoothing"
        // Wir wollen, dass der Charakter nicht sofort teleportiert, 
        // sondern geschmeidig über Unebenheiten gleitet.
        const playerHeightOffset = 0.0; // pos.y repräsentiert hier die Füße
        const targetY = groundY + playerHeightOffset;

        // Wenn der Höhenunterschied sehr klein ist, direkt setzen (verhindert Zittern)
        // Wenn er größer ist, sanft gleiten (Damping)
        const diff = targetY - pos.y;
        if (Math.abs(diff) > 0.001) {
            // Schnelleres Damping für das Movement (0.0001 statt 0.001), 
            // damit es sich direkter anfühlt als die Kamera.
            const t = 1.0 - Math.pow(0.0001, $dt);
            pos.y += diff * t;
        } else {
            pos.y = targetY;
        }
    }
}