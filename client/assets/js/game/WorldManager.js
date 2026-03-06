import * as THREE from 'three';
import { TextureAtlas } from './engine/rendering/TextureAtlas.js';
import { ChunkWorkerPool } from './engine/rendering/ChunkWorkerPool.js';

export class WorldManager {
	constructor(scene, camera, environment, shaderCode) {
		this.scene = scene;
		this.camera = camera;
		this.shaderCode = shaderCode;
		this.environment = environment;
		this.basePath = './assets/world/heightmaps/blender/';
		this.metadata = null;
		this.chunks = new Map(); 
		this.skirts = new Map();
		this.heightData = new Map();
		this._loading = new Set(); // Chunks die gerade geladen werden (Race-Condition Guard)
		
		this.chunkSize = 2395;  // 512px × 4.677m/px (GeoTIFF-Ausdehnung: 124.5km / 26624px)
		this.tileSize = 512;
		this.renderDistance = 2;
		this.pixelToMeter = 4.677;
		this.heightScale = 1456.0;  // Gesamtbereich in Metern (0..65535)
		this.seaLevel    = 0.2;     // Normalisierter Meeresspiegel (20% = uint16 13107)
		// Formel: worldY = (rawNorm - seaLevel) * heightScale
		// → rawNorm 0.2 = 0m (Wasser), 1.0 = +1165m, 0.0 = -291m

		// LOD: Segmente abhängig von Chunk-Distanz zum Spieler
		// Distanz 0 (direkt darunter) → 256, 1 → 128, 2+ → 64
		this.lodSegments = [256, 128, 64];

		this._workerPool = new ChunkWorkerPool(2, this.tileSize);
	}

	// Lädt den Chunk für (worldX, worldZ) falls nötig, gibt dann Höhe zurück.
	// Nützlich beim Spawnen bevor der Render-Loop den Chunk geladen hat.
	async preloadHeightAt($worldX, $worldZ) {
		const cx = Math.floor($worldX / this.chunkSize);
		const cz = Math.floor($worldZ / this.chunkSize);
		const key = `${cz}_${cx}`;
		if (this.heightData.has(key)) return this.getHeightAt($worldX, $worldZ);

		try {
			const response = await fetch(`${this.basePath}tile_${cz}_${cx}.bin`);
			if (!response.ok) throw new Error(`HTTP ${response.status}`);
			const arrayBuffer = await response.arrayBuffer();
			const u16 = new Uint16Array(arrayBuffer);
			const count = (this.tileSize + 1) * (this.tileSize + 1);
			const floatData = new Float32Array(count);
			for (let i = 0; i < count; i++) floatData[i] = u16[i] / 65535.0;
			if (!this.heightData.has(key)) this.heightData.set(key, floatData);
		} catch (e) {
			console.warn(`preloadHeightAt: ${e.message}`);
			return null;
		}
		return this.getHeightAt($worldX, $worldZ);
	}

	// Hilfsfunktion: Wandelt Weltkoordinaten in die exakte Höhe um
	getHeightAt($x, $z) {
		const cx = Math.floor($x / this.chunkSize);
		const cz = Math.floor($z / this.chunkSize);
		const key = `${cz}_${cx}`;

		const data = this.heightData.get(key);
		if (!data) return null;

		let relX = ($x % this.chunkSize) / this.chunkSize;
		let relZ = ($z % this.chunkSize) / this.chunkSize;
		if (relX < 0) relX += 1;
		if (relZ < 0) relZ += 1;

		// Bilineare Interpolation – genau wie der GPU-Shader (texture2D mit LinearFilter)
		const tileW = this.tileSize + 1; // 513
		const fx = relX * this.tileSize;
		const fz = relZ * this.tileSize;
		const px0 = Math.min(Math.floor(fx), this.tileSize - 1);
		const pz0 = Math.min(Math.floor(fz), this.tileSize - 1);
		const px1 = Math.min(px0 + 1, this.tileSize);
		const pz1 = Math.min(pz0 + 1, this.tileSize);
		const tx = fx - px0;
		const tz = fz - pz0;

		const h00 = data[pz0 * tileW + px0];
		const h10 = data[pz0 * tileW + px1];
		const h01 = data[pz1 * tileW + px0];
		const h11 = data[pz1 * tileW + px1];
		const rawHeight = h00 * (1 - tx) * (1 - tz)
		                + h10 * tx       * (1 - tz)
		                + h01 * (1 - tx) * tz
		                + h11 * tx       * tz;

		return (rawHeight - this.seaLevel) * this.heightScale;
	}

	async init() {
		const texPath = './assets/textures/terrain/';
		this.atlas = new TextureAtlas(512);
		await this.atlas.load([
			texPath + 'island_sand_d.jpg',   // layer 0 – Sand
			texPath + 'grass_green_d.jpg',   // layer 1 – Gras
			texPath + 'mntn_forest_d.jpg',   // layer 2 – Wald
			texPath + 'mntn_dark_d.jpg',     // layer 3 – Fels
		]);

		const response = await fetch(`${this.basePath}metadata.json`);
		this.metadata = await response.json();
		// Dynamisch berechnete Werte aus terrain_fantasy.py übernehmen
		if (this.metadata.heightScale) this.heightScale = this.metadata.heightScale;
		if (this.metadata.seaLevel    != null) this.seaLevel = this.metadata.seaLevel;
		console.log("🌍 Welt-Metadaten geladen:", this.metadata, `→ heightScale=${this.heightScale}, seaLevel=${this.seaLevel}`);
		
		this.update();
	}

	getMeshes() {
		return Array.from(this.chunks.values());
	}

	update(deltaTime, elapsedTime, sunDir) {
		if (!this.metadata) return;
		this.chunks.forEach(mesh => {
			if (mesh.material.uniforms) {
				mesh.material.uniforms.fogColor.value = this.environment.scene.fog.color;
				mesh.material.uniforms.fogDensity.value = this.environment.scene.fog.density;
			}
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
					const dist = Math.max(Math.abs(dx), Math.abs(dz)); // Chebyshev-Distanz
					visibleChunks.add(key);
					if (!this.chunks.has(key) && !this._loading.has(key)) {
						this.loadChunk(cx, cz, dist);
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

	loadChunk(x, y, dist = 0) {
		const key = `${y}_${x}`;
		this._loading.add(key);
		const segments = this.lodSegments[Math.min(dist, this.lodSegments.length - 1)];
		const url = new URL(`${this.basePath}tile_${y}_${x}.bin`, window.location.href).href;

		this._workerPool.decode(url, key).then(floatData => {
			if (!this._loading.has(key)) return;

			this.heightData.set(key, floatData);

			// GPU DataTexture direkt aus floatData – kein zweiter Fetch nötig
			// Tile ist (tileSize+1)×(tileSize+1) mit Overlap-Pixel
			const texSize = this.tileSize + 1;
			const heightTexture = new THREE.DataTexture(
				floatData,
				texSize, texSize,
				THREE.RedFormat,
				THREE.FloatType
			);
			heightTexture.magFilter = THREE.LinearFilter;
			heightTexture.minFilter = THREE.LinearFilter;
			heightTexture.wrapS = heightTexture.wrapT = THREE.ClampToEdgeWrapping;
			heightTexture.needsUpdate = true;

			// Geometry: exakt chunkSize × chunkSize, zentriert → Position bei Chunk-Mittelpunkt
			const geometry = new THREE.PlaneGeometry(this.chunkSize, this.chunkSize, segments, segments);
			geometry.rotateX(-Math.PI / 2);

			const shared = this.environment.shared;
			// Fallback wenn SharedUniforms noch nicht bereit
			const su = shared ?? {
				sunDir:           { value: new THREE.Vector3(0.5, 1, 0.5).normalize() },
				moonDir:          { value: new THREE.Vector3(-0.5, -1, -0.5).normalize() },
				sunColor:         { value: new THREE.Color(0xffffff) },
				moonColor:        { value: new THREE.Color(0x2244aa) },
				sunIntensity:     { value: 1.5 },
				moonIntensity:    { value: 0.0 },
				ambientColor:     { value: new THREE.Color(0x77aaff) },
				ambientIntensity: { value: 0.4 },
				fogColor:         { value: this.scene.fog?.color ?? new THREE.Color(0xaaccff) },
				fogDensity:       { value: 0.00015 },
			};
			const material = new THREE.ShaderMaterial({
				uniforms: {
					tAtlas:            { value: this.atlas.texture },
					tHeight:           { value: heightTexture },
					tHeightSize:       { value: new THREE.Vector2(texSize, texSize) },
					displacementScale:  { value: this.heightScale },
					seaLevel:           { value: this.seaLevel },
					sunDir:            su.sunDir,
					sunColor:          su.sunColor,
					sunIntensity:      su.sunIntensity,
					moonDir:           su.moonDir,
					moonColor:         su.moonColor,
					moonIntensity:     su.moonIntensity,
					ambientColor:      su.ambientColor,
					ambientIntensity:  su.ambientIntensity,
					fogColor:          su.fogColor,
					fogDensity:        su.fogDensity,
				},
				vertexShader:   this.shaderCode.vert,
				fragmentShader: this.shaderCode.frag
			});

			const mesh = new THREE.Mesh(geometry, material);
			// PlaneGeometry ist um (0,0,0) zentriert → Mittelpunkt des Chunks
			mesh.position.set(x * this.chunkSize + this.chunkSize / 2, 0, y * this.chunkSize + this.chunkSize / 2);
			this.scene.add(mesh);
			this.chunks.set(key, mesh);
			this._loading.delete(key);

			const skirt = this._buildSkirt(x, y, floatData);
			this.scene.add(skirt);
			this.skirts.set(key, skirt);

		}).catch((err) => {
			console.warn(`⚠️ Chunk ${key} Ladefehler:`, err);
			this._loading.delete(key);
		});
	}

	// Baut eine dunkle Erdwand an allen 4 Tile-Kanten, die Spalten zwischen Tiles verdeckt
	_buildSkirt(cx, cy, floatData) {
		const W  = this.chunkSize;
		const T  = this.tileSize;
		const TW = T + 1;       // Stride des floatData-Arrays (513, mit Overlap-Pixel)
		const H  = this.heightScale;
		const SL = this.seaLevel;
		const BOTTOM = -80;
		const STEP = 8;

		const h2world = (h) => (h - SL) * H;

		// Chunk beginnt bei cx*W, endet bei (cx+1)*W
		const ox = cx * W;
		const oz = cy * W;

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
			left.push([ox, h2world(floatData[pz * TW]), oz + (pz / T) * W]);
		left.push([ox, h2world(floatData[(T - 1) * TW]), oz + W]);
		addStrip(left);

		const right = [];
		for (let pz = 0; pz < T; pz += STEP)
			right.push([ox + W, h2world(floatData[pz * TW + T]), oz + (pz / T) * W]);
		right.push([ox + W, h2world(floatData[(T - 1) * TW + T]), oz + W]);
		addStrip(right);

		const top = [];
		for (let px = 0; px < T; px += STEP)
			top.push([ox + (px / T) * W, h2world(floatData[px]), oz]);
		top.push([ox + W, h2world(floatData[T - 1]), oz]);
		addStrip(top);

		const bottom = [];
		for (let px = 0; px < T; px += STEP)
			bottom.push([ox + (px / T) * W, h2world(floatData[(T - 1) * TW + px]), oz + W]);
		bottom.push([ox + W, h2world(floatData[(T - 1) * TW + T - 1]), oz + W]);
		addStrip(bottom);

		const geo = new THREE.BufferGeometry();
		geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
		geo.setIndex(indices);
		const mat = new THREE.MeshBasicMaterial({ color: 0x3d2b1f, side: THREE.DoubleSide });
		return new THREE.Mesh(geo, mat);
	}
}