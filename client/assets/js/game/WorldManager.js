import * as THREE from 'three';

export class WorldManager {
    constructor(scene, camera, environment, shaderCode) {
        this.scene = scene;
        this.camera = camera;
        this.shaderCode = shaderCode;
        this.environment = environment;
        this.basePath = './assets/world/heightmaps/mallorca_smooth/';
        this.metadata = null;
        this.chunks = new Map(); 
        this.heightData = new Map(); // NEU: Speichert die Höhendaten für die CPU (Float32Arrays)
        
        this.chunkSize = 1920;
        this.tileSize = 512;
        this.segments = 256;
        this.renderDistance = 2;
        this.pixelToMeter = 3.75;
        this.heightScale = 1445.0;

        this.init();
    }

    // Hilfsfunktion: Wandelt Weltkoordinaten in die exakte Höhe um
    getHeightAt($x, $z) {
        // Berechne, in welchem Chunk wir uns befinden
        const cx = Math.floor($x / this.chunkSize);
        const cz = Math.floor($z / this.chunkSize);
        const key = `${cz}_${cx}`;

        const data = this.heightData.get(key);
        if (!data) return 0; // Falls der Chunk noch lädt oder nicht existiert

        // Relative Position innerhalb des Chunks (0.0 bis 1.0)
        // Wir nutzen Modulo, um die Position innerhalb der 1920m zu finden
        let relX = ($x % this.chunkSize) / this.chunkSize;
        let relZ = ($z % this.chunkSize) / this.chunkSize;
        
        // Korrektur für negative Koordinaten
        if (relX < 0) relX += 1;
        if (relZ < 0) relZ += 1;

        // Umrechnung in Pixel-Indizes (0 bis 511)
        const px = Math.floor(relX * (this.tileSize - 1));
        const pz = Math.floor(relZ * (this.tileSize - 1));

        // Index im 1D-Array berechnen
        const index = pz * this.tileSize + px;
        const rawHeight = data[index]; // Dies ist der normalisierte Wert (0 bis 1)

        return rawHeight * this.heightScale;
    }

    async init() {
        this.textureLoader = new THREE.TextureLoader();
        const texPath = './assets/textures/terrain/';
        this.biomeTextures = {
            sand: this.textureLoader.load(texPath + 'island_sand_d.jpg'),
            grass: this.textureLoader.load(texPath + 'grass_green_d.jpg'),
            forest: this.textureLoader.load(texPath + 'mntn_forest_d.jpg'),
            rock: this.textureLoader.load(texPath + 'mntn_dark_d.jpg')
        };
        Object.values(this.biomeTextures).forEach(t => {
            t.wrapS = t.wrapT = THREE.RepeatWrapping;
        });

        const response = await fetch(`${this.basePath}metadata.json`);
        this.metadata = await response.json();
        console.log("🌍 Welt-Metadaten geladen:", this.metadata);
        
        this.update();
    }

    getMeshes() {
        return Array.from(this.chunks.values());
    }

    update(deltaTime, elapsedTime, sunDir) {
        if (!this.metadata) return;
        this.chunks.forEach(mesh => {
            mesh.material.uniforms.fogColor.value = this.environment.scene.fog.color;
            mesh.material.uniforms.fogDensity.value = this.environment.scene.fog.density;
        });

        const playerX = Math.floor(this.camera.position.x / this.chunkSize);
        const playerZ = Math.floor(this.camera.position.z / this.chunkSize);
        const visibleChunks = new Set();

        for (let dz = -this.renderDistance; dz <= this.renderDistance; dz++) {
            for (let dx = -this.renderDistance; dx <= this.renderDistance; dx++) {
                const cx = playerX + dx;
                const cz = playerZ + dz;
                if (cx >= 0 && cx < this.metadata.chunksX && cz >= 0 && cz < this.metadata.chunksY) {
                    const key = `${cz}_${cx}`;
                    visibleChunks.add(key);
                    if (!this.chunks.has(key)) {
                        this.loadChunk(cx, cz);
                    }
                }
            }
        }

        for (const [key, mesh] of this.chunks) {
            if (!visibleChunks.has(key)) {
                this.scene.remove(mesh);
                mesh.geometry.dispose();
                mesh.material.dispose();
                this.chunks.delete(key);
                this.heightData.delete(key); // Speicher freigeben
            }
        }
    }

    loadChunk(x, y) {
        const key = `${y}_${x}`;
        
        // Wir laden das Bild über ein HTML-Image, um an die Pixeldaten zu kommen
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = `${this.basePath}tile_${y}_${x}.png`;

        img.onload = () => {
            // 1. Pixeldaten für CPU extrahieren (Canvas-Trick)
            const canvas = document.createElement('canvas');
            canvas.width = this.tileSize;
            canvas.height = this.tileSize;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            
            const imageData = ctx.getImageData(0, 0, this.tileSize, this.tileSize).data;
            const floatData = new Float32Array(this.tileSize * this.tileSize);

            // Da das PNG als Graustufenbild für die Höhe dient, 
            // nehmen wir den Rot-Kanal (Index 0, 4, 8...)
            for (let i = 0; i < imageData.length; i += 4) {
                floatData[i / 4] = imageData[i] / 255.0;
            }
            this.heightData.set(key, floatData);

            // 2. GPU Textur erstellen (wie bisher)
            const heightTexture = new THREE.Texture(img);
            heightTexture.magFilter = THREE.LinearFilter;
            heightTexture.minFilter = THREE.LinearMipmapLinearFilter;
            heightTexture.wrapS = heightTexture.wrapT = THREE.ClampToEdgeWrapping;
            heightTexture.type = THREE.HalfFloatType; 
            heightTexture.needsUpdate = true;

            // 3. Mesh & Material erstellen (unverändert)
            const geometry = new THREE.PlaneGeometry(this.chunkSize, this.chunkSize, this.segments, this.segments);
            geometry.rotateX(-Math.PI / 2);

            const material = new THREE.ShaderMaterial({
                uniforms: {
                    tSand: { value: this.biomeTextures.sand },
                    tGrass: { value: this.biomeTextures.grass },
                    tForest: { value: this.biomeTextures.forest },
                    tRock: { value: this.biomeTextures.rock },
                    tHeight: { value: heightTexture },
                    tHeightSize: { value: new THREE.Vector2(this.tileSize, this.tileSize) },
                    displacementScale: { value: this.heightScale },
                    sunDirection: { value: this.environment.sun.position },
                    fogColor: { value: this.environment.scene.fog.color },
                    fogDensity: { value: this.environment.scene.fog.density }
                },
                vertexShader: this.shaderCode.vert,
                fragmentShader: this.shaderCode.frag
            });

            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(x * this.chunkSize, 0, y * this.chunkSize);

            this.scene.add(mesh);
            this.chunks.set(key, mesh);
        };
    }
}