import { ThreeEngine } from './engine/ThreeEngine.js';
import { Environment } from './Environment.js';
import { WorldManager } from './WorldManager.js';
import { WaterManager } from './WaterManager.js';
import { ShaderLoader } from './ShaderLoader.js';
import { EntityManager } from './engine/ecs/EntityManager.js';
import { SettingsManager } from './engine/core/SettingsManager.js';
import { InputManager } from './engine/core/InputManager.js';
import { ThirdPersonCameraSystem } from './engine/systems/ThirdPersonCameraSystem.js';
import { MovementSystem } from './engine/systems/MovementSystem.js';


class GUIManager {
	constructor() {}
	update( $pos, $chunkSize ) {
		document.getElementById('pos').innerText = 
			`${Math.round($pos.x)}, ${Math.round($pos.y)}, ${Math.round($pos.z)}`;
		document.getElementById('chunks').innerText = $chunkSize;
	}
}


export class Aethelgard {


	constructor() {
		this.engine = new ThreeEngine('#game-canvas');
		this.environment = null
		this.worldManager = null;
		this.waterManager = null;
		this.settings = new SettingsManager();
		this.input = new InputManager(this.settings);
		this.gui = new GUIManager(); // Hier später dein GUI-Manager (Svelte/React/Vanilla)
		this.ecs = new EntityManager(); // Hier später dein ECS-Kern
		this.cameraSystem = null;
	}


	async ignite(worldData) {
		// 1. Assets laden
		const shaderLoader = new ShaderLoader();
		// Alle Shader parallel laden für maximale Performance
		const [terrainShader, waterShader] = await Promise.all([
			shaderLoader.loadProgram('terrain', './assets/shaders/'),
			shaderLoader.loadProgram('water', './assets/shaders/')
		]);

		// 2. Environment (Licht, Nebel, Sonne)
		this.environment = new Environment(this.engine.scene);
		this.environment.init();
		this.engine.environment = this.environment; // Damit die Engine Zugriff auf die Sonne hat (für Helpers etc.)
		this.engine.init();

		// 3. WorldManager initialisieren
		this.worldManager = new WorldManager(this.engine.scene, this.engine.camera, this.environment, terrainShader);
        
        // Wait for the world manager to be ready
        await this.worldManager.init();

		// 4. WaterdManager initialisieren
		this.waterManager = new WaterManager( this.engine.scene, this.engine.camera,  waterShader );
		
		this.movementSystem = new MovementSystem(this.ecs, this.input, this.worldManager);
		this.cameraSystem = new ThirdPersonCameraSystem(this.engine.camera, this.ecs, this.worldManager);

        // 5. Player and other entities
        this.spawnPlayers(worldData);

		// 6. Game-Loop starten
		this.engine.render((dt, et) => this.update(dt, et));
	}

    spawnPlayers(worldData) {
        const { playerId, players } = worldData;

        for(const playerData of players) {
            const isLocalPlayer = playerData.id === playerId;
            const entity = this.ecs.createEntity(isLocalPlayer ? 'player' : `player_${playerData.id}`);
            
            const spawnPosition = {
                x: playerData.position.x,
                y: playerData.position.y,
                z: playerData.position.z,
            };

            // Get height from terrain
            spawnPosition.y = this.worldManager.getHeightAt(spawnPosition.x, spawnPosition.z) + 2.0;

            this.ecs.addComponent(entity, 'position', spawnPosition);
            this.ecs.addComponent(entity, 'rotation', { y: 0 });

            if(isLocalPlayer) {
                this.ecs.addComponent(entity, 'camera', {
                    distance: 10,
                    phi: 1.2,
                    theta: 0,
                    targetHeight: 1.7,
                    smoothSpeed: 0.1
                });
                this.playerSpawn(spawnPosition.x, spawnPosition.y, spawnPosition.z);
            }

            // TODO: Add a visual component to the entity (e.g. a 3D model)
            console.log(`${isLocalPlayer ? 'Local player' : 'Remote player'} spawned at`, spawnPosition);
        }
    }


	playerSpawn( $x, $y, $z) {
		this.engine.camera.position.set($x, $y + 5, $z - 10);
		this.engine.controls.target.set($x, $y, $z);
		this.engine.controls.update();
	}


	update($deltaTime, elapsedTime) {
		if (this.movementSystem) this.movementSystem.update($deltaTime);
		if (this.cameraSystem) this.cameraSystem.update($deltaTime);
		// Update-Reihenfolge ist wichtig!
		// 1. Sonne & Atmosphäre berechnen
        this.environment.update($deltaTime, elapsedTime);
        
        // 2. Die aktuelle Sonnenrichtung für die Shader holen
        const sunDir = this.environment.sun.position.clone().normalize();

		// 3. Welt & Wasser updaten
        this.worldManager.update($deltaTime, elapsedTime, sunDir);
        this.waterManager.update($deltaTime, elapsedTime, sunDir);

		// 4. GUI updaten (z.B. Spielerposition, Chunk-Info)
		this.gui.update(this.engine.camera.position, this.worldManager.chunks.size);
        
        // Hier käme später: this.ecs.update(deltaTime);
	}
    
    shutdown() {
        this.engine.stop();
    }
}
