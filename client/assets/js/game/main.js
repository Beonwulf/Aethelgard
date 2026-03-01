import { Aethelgard } from './Aethelgard.js';


// Wir warten, bis das DOM geladen ist
window.addEventListener('DOMContentLoaded', async () => {
    try {
        // Die Game-Engine initialisieren
        const game = new Aethelgard();
        
        // Den asynchronen Startprozess (Shader laden etc.) aufrufen
        await game.start();
		game.playerSpawn( 45 * 1920, 200, 20 * 1920 ); // Startposition über dem Boden

        // Optional: Globaler Zugriff für Debugging in der Konsole
        window.aethelgard = game;
        
        console.log("✨ Aethelgard erfolgreich gestartet!");
    } catch (error) {
        console.error("💥 Fehler beim Starten von Aethelgard:", error);
    }
});
/**
const shaderLoader = new ShaderLoader();
let terrainShaderCode;

let scene, camera, renderer, controls, worldManager;

const CHUNK_SIZE_METERS = 1920;
const LORE_LOCATIONS = {
    '1': { name: 'Goldstrand (Spawn)', x: 45 * 1920, z: 20 * 1920, h: 200 },
    '2': { name: 'Aethelhafen (Palma)', x: 10 * 1920, z: 32 * 1920, h: 300 },
    '3': { name: 'Frostfang-Gipfel (Tramuntana)', x: 15 * 1920, z: 5 * 1920, h: 1500 },
    '4': { name: 'Wächter-Kap (Formentor)', x: 38 * 1920, z: 2 * 1920, h: 400 }
};

async function init() {
	// 1. Shader laden
    terrainShaderCode = await shaderLoader.loadProgram('terrain', './assets/shaders/');
    console.log("✅ Shader erfolgreich geladen");

	// 1. Scene & Camera
	scene = new THREE.Scene();
	const fogColor = 0xaaccff; 
	scene.fog = new THREE.FogExp2(fogColor, 0.00015); // Sehr geringe Dichte für weite Sicht
	scene.background = new THREE.Color(fogColor);
	//scene.background = new THREE.Color(0x87ceeb); // Himmelblau

	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 50000);
	// Wir starten etwas über dem Boden
	camera.position.set(256, 500, 256); 

	// 2. Renderer
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(window.devicePixelRatio);
	document.body.appendChild(renderer.domElement);

	// 3. Licht (Wichtig für die 16-Bit Höhen-Details)
	const sun = new THREE.DirectionalLight(0xffffff, 1.5);
	// Positioniere sie weit oben und schräg
	sun.position.set(10000, 20000, 10000);
	sun.target.position.set(45 * 1920, 0, 20 * 1920); // Zielt auf den Spawn/Goldstrand
	scene.add(sun);
	scene.add(sun.target);

	const ambient = new THREE.AmbientLight(0x404040, 0.6);
	scene.add(ambient);

	// 4. Controls
	controls = new OrbitControls(camera, renderer.domElement);

	const spawnX = 45 * CHUNK_SIZE_METERS; // Dein X-Tile * ChunkSize
	const spawnZ = 20 * CHUNK_SIZE_METERS; // Dein Y-Tile * ChunkSize
	const startHeight = 250; // Etwas über dem Boden, bis wir Collision haben

	camera.position.set(spawnX, startHeight, spawnZ);
	controls.target.set(spawnX + 10, 0, spawnZ + 10); // Schaut leicht Richtung Inselinneres
	
	// 5. World Manager initialisieren
	worldManager = new WorldManager(scene, camera, terrainShaderCode);

	addWater(scene);

	window.addEventListener('resize', onWindowResize);
	animate();
}

function addWater(scene) {
    const waterGeometry = new THREE.PlaneGeometry(50000, 50000); // Riesige Fläche
    const waterMaterial = new THREE.MeshStandardMaterial({
        color: 0x0077be,
        transparent: true,
        opacity: 0.6,
        roughness: 0.1
    });
    const water = new THREE.Mesh(waterGeometry, waterMaterial);
    water.rotateX(-Math.PI / 2);
    water.position.y = 1.2; // Wasserspiegel leicht über 0
    scene.add(water);
}


function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
	requestAnimationFrame(animate);
	
	if (worldManager) {
		worldManager.update();
		
		// UI Update
		document.getElementById('pos').innerText = 
			`${Math.round(camera.position.x)}, ${Math.round(camera.position.y)}, ${Math.round(camera.position.z)}`;
		document.getElementById('chunks').innerText = worldManager.chunks.size;
	}

	controls.update();
	renderer.render(scene, camera);
}

window.addEventListener('keydown', (event) => {
    const loc = LORE_LOCATIONS[event.key];
    
    if (loc) {
        console.log(`✨ Teleportiere nach: ${loc.name}...`);
        
        // Kamera versetzen
        camera.position.set(loc.x, loc.h, loc.z);
        
        // Controls neu ausrichten (schaut Richtung Zentrum des Chunks)
        controls.target.set(loc.x + 100, 0, loc.z + 100);
        controls.update();
        
        // Dem WorldManager sagen, dass er sofort Chunks prüfen soll
        if (worldManager) worldManager.update();
    }
	
	if (e.key === '5') this.environment.setPreset('MIDDAY');
    if (e.key === '6') this.environment.setPreset('SUNSET');
    if (e.key === '7') this.environment.setPreset('STORM');
});


init();
/**/