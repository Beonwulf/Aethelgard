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
        if (player === undefined) return;  // 0 ist eine gültige Entity-ID!

        const pos = this.ecs.getComponent(player, 'position');
        const cam = this.ecs.getComponent(player, 'camera');
        
        if (!pos || !cam) return;

        // 1. Bewegung berechnen (WASD)
        // Shift = Turbo (×15) für schnelles Erkunden
        const turbo = this.input.isPressed('SPRINT');
        const speed = turbo ? 2250.0 : 150.0;
        const moveDir = new THREE.Vector3();

        if (this.input.isPressed('MOVE_FORWARD')) moveDir.z += 1;
        if (this.input.isPressed('MOVE_BACKWARD')) moveDir.z -= 1;
        if (this.input.isPressed('MOVE_LEFT')) moveDir.x += 1;
        if (this.input.isPressed('MOVE_RIGHT')) moveDir.x -= 1;

        if (moveDir.length() > 0) {
            moveDir.normalize();
            
            // Laufrichtung an Char-Rotation anpassen (rotation.y gesetzt durch RMB)
            // Falls keine Rotation vorhanden, Kamera-Theta als Fallback
            const rotation = this.ecs.getComponent(player, 'rotation');
            const angle = rotation ? rotation.y : cam.theta;
            moveDir.applyAxisAngle(new THREE.Vector3(0, 1, 0), angle);
            
            pos.x += moveDir.x * speed * $dt;
            pos.z += moveDir.z * speed * $dt;
        }

        // 2. Bodenhöhe ermitteln
        const groundY = this.world.getHeightAt(pos.x, pos.z);
        
        // null = Chunk noch nicht geladen → Y-Position einfrieren
        if (groundY === null) return;

        const targetY = groundY + 0.05;
        const diff = targetY - pos.y;
        if (Math.abs(diff) > 0.001) {
            const t = 1.0 - Math.pow(0.0001, $dt);
            pos.y += diff * t;
        } else {
            pos.y = targetY;
        }
    }
}