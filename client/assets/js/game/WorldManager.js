import * as THREE from 'three';

export class WorldManager {
    constructor(scene, camera, environment, shaderCode) {
        this.scene = scene;
        this.camera = camera;
        this.shaderCode = shaderCode;
        this.environment = environment;
        this.basePath = './assets/world/heightmaps/mallorca/';
        //this.basePath = './assets/world/heightmaps/mallorca/';
        this.metadata = null;
        this.chunks = new Map(); 
        this.skirts = new Map();
        this.heightData = new Map();
        this._loading = new Set(); // Chunks die gerade geladen werden (Race-Condition Guard)
        
        this.chunkSize = 2395;  // 512px × 4.677m/px (GeoTIFF-Ausdehnung: 124.5km / 26624px)
        this.tileSize = 512;
        this.segments = 256;
        this.renderDistance = 2;
        this.pixelToMeter = 4.677;
        this.heightScale = 1456.0;  // 65535/45 = exakt aus worldStitcher Scale

    }

    // Lädt den Chunk für (worldX, worldZ) falls nötig, gibt dann Höhe zurück.
    // Nützlich beim Spawnen bevor der Render-Loop den Chunk geladen hat.
    preloadHeightAt($worldX, $worldZ) {
        const cx = Math.floor($worldX / this.chunkSize);
        const cz = Math.floor($worldZ / this.chunkSize);
        const key = `${cz}_${cx}`;
        if (this.heightData.has(key)) return Promise.resolve(this.getHeightAt($worldX, $worldZ));
        return new Promise((resolve) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.src = `${this.basePath}tile_${cz}_${cx}.png`;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = this.tileSize;
                canvas.height = this.tileSize;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                const imageData = ctx.getImageData(0, 0, this.tileSize, this.tileSize).data;
                const floatData = new Float32Array(this.tileSize * this.tileSize);
                for (let i = 0; i < imageData.length; i += 4) {
                    floatData[i / 4] = imageData[i] / 255.0 + imageData[i + 1] / 65025.0;
                }
                canvas.width = 0; canvas.height = 0;
                if (!this.heightData.has(key)) this.heightData.set(key, floatData);
                resolve(this.getHeightAt($worldX, $worldZ));
            };
            img.onerror = () => resolve(null);
        });
    }

    // Hilfsfunktion: Wandelt Weltkoordinaten in die exakte Höhe um
    getHeightAt($x, $z) {
        // Berechne, in welchem Chunk wir uns befinden
        const cx = Math.floor($x / this.chunkSize);
        const cz = Math.floor($z / this.chunkSize);
        const key = `${cz}_${cx}`;

        const data = this.heightData.get(key);
        if (!data) return null; // Chunk noch nicht geladen

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
        const rawHeight = data[index]; // normalisiert (0..1), kein S-Kurven-Transform

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
                    // Nur laden wenn weder fertig noch gerade am Laden
                    if (!this.chunks.has(key) && !this._loading.has(key)) {
                        this.loadChunk(cx, cz);
                    }
                }
            }
        }

        for (const [key, mesh] of this.chunks) {
            if (!visibleChunks.has(key)) {
                this.scene.remove(mesh);
                mesh.geometry.dispose();
                mesh.material.uniforms.tHeight?.value?.dispose();
                mesh.material.dispose();
                this.chunks.delete(key);
                this.heightData.delete(key);
                this._loading.delete(key);
                // Skirt mitentfernen
                const skirt = this.skirts.get(key);
                if (skirt) {
                    this.scene.remove(skirt);
                    skirt.geometry.dispose();
                    skirt.material.dispose();
                    this.skirts.delete(key);
                }
            }
        }
        // Laufende Ladevorgänge für nicht mehr sichtbare Chunks abbrechen
        for (const key of this._loading) {
            if (!visibleChunks.has(key)) this._loading.delete(key);
        }
    }

    loadChunk(x, y) {
        const key = `${y}_${x}`;
        this._loading.add(key);
        
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = `${this.basePath}tile_${y}_${x}.png`;

        img.onload = () => {
            // Falls der Chunk inzwischen aus dem Sichtfeld verschwunden ist → abbrechen
            if (!this._loading.has(key)) return;

            // 1. Pixeldaten für CPU extrahieren
            const canvas = document.createElement('canvas');
            canvas.width = this.tileSize;
            canvas.height = this.tileSize;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            
            const imageData = ctx.getImageData(0, 0, this.tileSize, this.tileSize).data;
            const floatData = new Float32Array(this.tileSize * this.tileSize);

            // 16-bit PNG: R=high byte, G=low byte → wie im Vertex-Shader h.r + h.g/255
            for (let i = 0; i < imageData.length; i += 4) {
                floatData[i / 4] = imageData[i] / 255.0 + imageData[i + 1] / 65025.0;
            }
            // Canvas sofort freigeben (Memory Leak vermeiden)
            canvas.width = 0; canvas.height = 0;

            this.heightData.set(key, floatData);

            // 2. GPU Textur erstellen
            const heightTexture = new THREE.Texture(img);
            heightTexture.magFilter = THREE.LinearFilter;
            heightTexture.minFilter = THREE.LinearMipmapLinearFilter;
            heightTexture.wrapS = heightTexture.wrapT = THREE.ClampToEdgeWrapping;
            heightTexture.type = THREE.HalfFloatType; 
            heightTexture.needsUpdate = true;

            // 3. Mesh & Material erstellen
            // Overlap: Tiles überlappen sich um 'overlap' Meter an jeder Kante.
            // Das versteckt Höhen-Diskontinuitäten die durch per-Tile-Blur entstehen.
            // Die UV-Range erweitert sich um delta; ClampToEdge wiederholt den letzten Pixel.
            const overlap = 8; // Meter Überlappung pro Seite (≈2 Pixel bei 3.75m/px)
            const geoSize = this.chunkSize + overlap * 2;
            const uvDelta = overlap / this.chunkSize; // UV-Ausdehnung über 0..1 hinaus

            const geometry = new THREE.PlaneGeometry(geoSize, geoSize, this.segments, this.segments);
            geometry.rotateX(-Math.PI / 2);

            // UV von [-delta .. 1+delta] statt [0..1]: Edge-Pixel werden wiederholt
            const uvAttr = geometry.attributes.uv;
            for (let i = 0; i < uvAttr.count; i++) {
                uvAttr.setXY(i,
                    uvAttr.getX(i) * (1 + 2 * uvDelta) - uvDelta,
                    uvAttr.getY(i) * (1 + 2 * uvDelta) - uvDelta
                );
            }
            uvAttr.needsUpdate = true;

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
            this._loading.delete(key); // Laden abgeschlossen

            // 4. Skirt: Dunkle Erdwände an allen 4 Kanten → kein sichtbarer Spalt
            const skirt = this._buildSkirt(x, y, floatData);
            this.scene.add(skirt);
            this.skirts.set(key, skirt);
        };

        img.onerror = () => {
            this._loading.delete(key);
        };
    }

    // Baut eine dunkle Erdwand an allen 4 Tile-Kanten, die Spalten zwischen Tiles verdeckt
    _buildSkirt(cx, cy, floatData) {
        const W = this.chunkSize;
        const T = this.tileSize;
        const H = this.heightScale;
        const BOTTOM = -80;
        const STEP = 8;

        // Kein S-Kurven-Transform – konsistent mit dem Vertex-Shader
        const h2world = (h) => h * H;

        const ox = cx * W - W / 2;
        const oz = cy * W - W / 2;

        const positions = [];
        const indices = [];
        let vi = 0;

        const addStrip = (pts) => {
            const base = vi;
            for (const [wx, wh, wz] of pts) {
                positions.push(wx, wh, wz);
                positions.push(wx, BOTTOM, wz);
                vi += 2;
            }
            for (let i = 0; i < pts.length - 1; i++) {
                const a = base + i * 2;
                indices.push(a, a + 1, a + 2,  a + 1, a + 3, a + 2);
            }
        };

        const left = [];
        for (let pz = 0; pz < T; pz += STEP)
            left.push([ox, h2world(floatData[pz * T]), oz + (pz / (T - 1)) * W]);
        left.push([ox, h2world(floatData[(T - 1) * T]), oz + W]);
        addStrip(left);

        const right = [];
        for (let pz = 0; pz < T; pz += STEP)
            right.push([ox + W, h2world(floatData[pz * T + T - 1]), oz + (pz / (T - 1)) * W]);
        right.push([ox + W, h2world(floatData[(T - 1) * T + T - 1]), oz + W]);
        addStrip(right);

        const top = [];
        for (let px = 0; px < T; px += STEP)
            top.push([ox + (px / (T - 1)) * W, h2world(floatData[px]), oz]);
        top.push([ox + W, h2world(floatData[T - 1]), oz]);
        addStrip(top);

        const bottom = [];
        for (let px = 0; px < T; px += STEP)
            bottom.push([ox + (px / (T - 1)) * W, h2world(floatData[(T - 1) * T + px]), oz + W]);
        bottom.push([ox + W, h2world(floatData[(T - 1) * T + T - 1]), oz + W]);
        addStrip(bottom);

        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geo.setIndex(indices);
        const mat = new THREE.MeshBasicMaterial({ color: 0x3d2b1f, side: THREE.DoubleSide });
        return new THREE.Mesh(geo, mat);
    }
}