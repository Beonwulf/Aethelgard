import { ThreeEngine } from './engine/ThreeEngine.js';
import { Environment } from './Environment.js';
import { WorldManager } from './WorldManager.js';
import { WaterManager } from './WaterManager.js';
import { ShaderLoader } from './ShaderLoader.js';
import { EntityManager } from './engine/ecs/EntityManager.js';
import { Components } from './engine/ecs/Components.js';
import { SettingsManager } from './engine/core/SettingsManager.js';
import { InputManager } from './engine/core/InputManager.js';
import { LoadingManager } from './engine/LoadingManager.js';
import { ThirdPersonCameraSystem } from './engine/systems/ThirdPersonCameraSystem.js';
import { MovementSystem } from './engine/systems/MovementSystem.js';
import { CharacterSystem } from './engine/systems/CharacterSystem.js';
import { AbilitySystem } from './engine/systems/AbilitySystem.js';
import { GUISystem } from './engine/systems/GUISystem.js';
import { NetworkSystem } from './engine/systems/NetworkSystem.js';
import { SoundManager } from './engine/systems/SoundManager.js';


export class Aethelgard {

	constructor() {
		this.engine = new ThreeEngine('#game-canvas');
		this.loading = new LoadingManager();
		this.environment = null;
		this.worldManager = null;
		this.waterManager = null;
		this.settings = new SettingsManager();
		this.input = new InputManager(this.settings);
		this.ecs = new EntityManager();
		this.cameraSystem = null;
		this.movementSystem = null;
		this.characterSystem = null;
		this.abilitySystem = null;
		this.guiSystem = null;
		this.networkSystem = null;
	}


	async ignite(worldData) {
		window.aethelgard = this;

		// Sounds vorab laden
		SoundManager.preload('levelup', './assets/sounds/item_gem_01.ogg');

		this.loading.addTask('shaders');
		this.loading.addTask('world');
		this.loading.addTask('player');

		// 1. Shader laden
		this.loading._setStatus('Lade Shader...');
		const shaderLoader = new ShaderLoader();
		const [terrainShader, waterShader] = await Promise.all([
			shaderLoader.loadProgram('terrain', './assets/shaders/'),
			shaderLoader.loadProgram('water', './assets/shaders/')
		]);
		this.loading.completeTask('shaders', 'Shader geladen');

		// 2. Environment
		this.environment = new Environment(this.engine.scene);
		// init() wird bereits im Konstruktor aufgerufen
		this.engine.environment = this.environment;
		this.engine.init();

		// 3. WorldManager
		this.loading._setStatus('Lade Terrain...');
		this.worldManager = new WorldManager(this.engine.scene, this.engine.camera, this.environment, terrainShader);
		await this.worldManager.init();
		this.loading.completeTask('world', 'Terrain geladen');

		// 4. WaterManager
		this.waterManager = new WaterManager(this.engine.scene, this.engine.camera, waterShader);

		this.movementSystem = new MovementSystem(this.ecs, this.input, this.worldManager);
		this.cameraSystem = new ThirdPersonCameraSystem(this.engine.camera, this.ecs, this.worldManager, this.input);
		this.characterSystem = new CharacterSystem(this.engine.scene, this.ecs);
		this.abilitySystem = new AbilitySystem(this.ecs, this.input);
		this.networkSystem = new NetworkSystem(this.ecs);

		// 5. Spieler spawnen
		this.loading._setStatus('Lade Spieler...');
		await this.spawnPlayers(worldData);

        // GUI initialisieren (nach spawnPlayers damit ECS-Komponenten existieren)
        this.guiSystem = new GUISystem(this.ecs);
        this.guiSystem.init(this.input);

        // Demo-Abilities in Slots laden
        this._loadDemoAbilities();

        // Dummy-Modell laden → auf Fertigstellung warten für Loading-Screen
        // Kultur des Spielers aus playerData lesen (kommt vom Server), Fallback: dummy.glb
        const culture = null; // TODO: playerData?.culture wenn Server mitschickt
        await this.characterSystem.loadForEntity('player', culture ? null : './assets/models/dummy.glb', culture);
        this.loading.completeTask('player', 'Spieler geladen');
        this.loading.finish('Willkommen in Aethelgard!');

		// 6. Teleport via InputManager (nicht mehr hardcoded)
		this.teleportPoints = [
			{ name: 'Goldstrand',   x: 45 * 2395, z: 18 * 2395 },
			{ name: 'Aethelhafen', x: 28 * 2395, z: 26 * 2395 },
			{ name: 'Frostfang',   x: 26 * 2395, z: 44 * 2395 },
			{ name: 'Wächter-Kap', x: 48 * 2395, z: 46 * 2395 },
		];
		['TELEPORT_1','TELEPORT_2','TELEPORT_3','TELEPORT_4'].forEach((action, i) => {
			this.input.on(action, () => this.teleportTo(this.teleportPoints[i]));
		});

		// 7. Game-Loop starten
		this.engine.render((dt, et) => this.update(dt, et));
	}

    async spawnPlayers(worldData) {
        const { playerId, players } = worldData;

        for(const playerData of players) {
            const isLocalPlayer = playerData.id === playerId;
            const entity = this.ecs.createEntity(isLocalPlayer ? 'player' : `player_${playerData.id}`);
            
            const spawnPosition = {
                x: playerData.position.x,
                y: playerData.position.y,
                z: playerData.position.z,
            };

            // Spawn-Chunk sicher laden bevor wir die Höhe abfragen
            const groundY = await this.worldManager.preloadHeightAt(spawnPosition.x, spawnPosition.z);
            // +100m Sicherheitsabstand, damit der Char immer ÜBER dem Terrain startet
            spawnPosition.y = (groundY ?? 500) + 100.0;
            console.log(`🧍 Spawn groundY=${groundY?.toFixed(2)} → spawnY=${spawnPosition.y.toFixed(2)} @ (${spawnPosition.x}, ${spawnPosition.z})`);

            this.ecs.addComponent(entity, 'position', spawnPosition);
            this.ecs.addComponent(entity, 'rotation', { y: 0 });
            this.ecs.addComponent(entity, 'network', { entityId: playerData.id, dirty: false, lastSync: 0 });

            if(isLocalPlayer) {
                this.ecs.addComponent(entity, 'camera', {
                    distance: 10, phi: 1.2, theta: 0, targetHeight: 1.7, smoothSpeed: 0.1
                });
                // Stats & Abilities nur für lokalen Spieler
                this.ecs.addComponent(entity, 'stats', {
                    hp: 100, maxHp: 100, mp: 100, maxMp: 100,
                    level: 1, xp: 0, xpNext: 1000
                });
                this.ecs.addComponent(entity, 'abilities', {
                    slots: new Array(12).fill(null),
                    gcd: 0, gcdMax: 1.5, cooldowns: {}
                });
                this.playerSpawn(spawnPosition.x, spawnPosition.y, spawnPosition.z);
            }

            console.log(`${isLocalPlayer ? '🧍 Local' : '👤 Remote'} player spawned at`, spawnPosition);
        }
    }


	teleportTo($point) {
		const player = this.ecs.getEntityByTag('player');
		if (player === undefined) return;  // 0 ist eine gültige Entity-ID!
		const pos = this.ecs.getComponent(player, 'position');
		if (!pos) return;
		pos.x = $point.x;
		pos.z = $point.z;
		pos.y = (this.worldManager.getHeightAt($point.x, $point.z) ?? 100) + 2.0;
		// Kamera sofort snappen (kein Lerp-Nachlauf über halbe Karte)
		this.engine.camera.position.set(pos.x, pos.y + 12, pos.z - 20);
		if (this.cameraSystem) {
			// _currentPosition/Lookat sofort setzen damit kein Lerp von (0,0,0) startet
			this.cameraSystem._currentPosition.set(pos.x, pos.y + 12, pos.z - 20);
			this.cameraSystem._currentLookat.set(pos.x, pos.y + 1.7, pos.z);
		}
		// Chunks an neuem Ort sofort starten laden
		this.worldManager.update(0, 0, null);
		console.log(`📍 Teleport → ${$point.name} (${Math.round(pos.x)}, ${Math.round(pos.z)})`);
	}


	_loadDemoAbilities() {
		const demoSlots = ['fireball','heal','shield','dash','iceblast','stealth','arrow','taunt',
		                   null, null, null, null];
		const player = this.ecs.getEntityByTag('player');
		if (player === undefined) return;
		const abilities = this.ecs.getComponent(player, 'abilities');
		if (!abilities) return;
		demoSlots.forEach((id, i) => { abilities.slots[i] = id; });
		// GUI-Slots neu aufbauen
		if (this.guiSystem) {
			demoSlots.forEach((id, i) => { if (id) this.guiSystem.setSlotAbility(i, id); });
		}
	}


	playerSpawn($x, $y, $z) {
		this.engine.camera.position.set($x, $y + 5, $z - 10);
		this.engine.camera.lookAt($x, $y, $z);
	}


	update($deltaTime, elapsedTime) {
		// Systems in der richtigen Reihenfolge
		if (this.movementSystem)  this.movementSystem.update($deltaTime);
		if (this.cameraSystem)    this.cameraSystem.update($deltaTime);
		if (this.characterSystem) this.characterSystem.update($deltaTime);
		if (this.abilitySystem)   this.abilitySystem.update($deltaTime);
		if (this.networkSystem)   this.networkSystem.update($deltaTime);
		if (this.guiSystem)       this.guiSystem.update();

		// Ping an StatsPanel weiterleiten
		if (this.networkSystem && this.engine.stats) {
			this.engine.stats.setPing(this.networkSystem.latencyMs);
		}

		// Umgebung & Welt
        this.environment.update($deltaTime, elapsedTime);
        this.worldManager.update($deltaTime, elapsedTime, null);
        const sunDir = this.environment.shared?.sunDir?.value ?? this.environment.sun.position.clone().normalize();
        this.waterManager.update($deltaTime, elapsedTime, sunDir);

		// Debug-HUD
		const camPos = this.engine.camera.position;
		const posEl = document.getElementById('pos');
		const chunkEl = document.getElementById('chunks');
		if (posEl) posEl.textContent = `${Math.round(camPos.x)}, ${Math.round(camPos.y)}, ${Math.round(camPos.z)}`;
		if (chunkEl) chunkEl.textContent = this.worldManager.chunks.size;
	}

    shutdown() {
        this.engine.stop();
    }
}
