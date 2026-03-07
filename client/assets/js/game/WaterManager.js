import * as THREE from 'three';


export class WaterManager {


	constructor(scene, camera, shaderCode) {
		this.scene = scene;
		this.camera = camera;
		this.shaderCode = shaderCode;
		this.water = null;
		
		this.init();
	}


	init() {
		const noiseTex = new THREE.TextureLoader().load('./assets/textures/perlin-noise.png');
		noiseTex.wrapS = noiseTex.wrapT = THREE.RepeatWrapping;
		noiseTex.magFilter = THREE.LinearFilter;
		noiseTex.minFilter = THREE.LinearMipmapLinearFilter;
		noiseTex.generateMipmaps = true;

		// Kamera-folgende Plane – Depth-Test erledigt Küsten-Clipping ohne Stencil
		const geometry = new THREE.PlaneGeometry(14000, 14000, 4, 4);

		this.material = new THREE.ShaderMaterial({
			uniforms: {
				uTime:       { value: 0 },
				uFogColor:   { value: this.scene.fog?.color ?? new THREE.Color(0xaaccff) },
				uSunDir:     { value: new THREE.Vector3(0.5, 1.0, 0.5).normalize() },
				uSunColor:   { value: new THREE.Color(0xffffff) },
				uSunIntensity: { value: 1.5 },
				uWaterColor: { value: new THREE.Color(0x0055aa) },
				uCameraPos:  { value: this.camera.position },
				uNoiseTex:   { value: noiseTex },
				uFogDensity: { value: 0.00015 },
			},
			vertexShader:   this.shaderCode.vert,
			fragmentShader: this.shaderCode.frag,
			transparent: true,
			depthWrite:  false,
			side:        THREE.DoubleSide,
		});

		this.water = new THREE.Mesh(geometry, this.material);
		this.water.rotation.x = -Math.PI / 2;
		this.water.position.y = 0.3;
		this.scene.add(this.water);
	}


	update(deltaTime, elapsedTime, sunDir, sunColor, sunIntensity, fogColor, fogDensity) {
		const u = this.material.uniforms;
		u.uTime.value = elapsedTime ?? 0;
		if (sunDir)      u.uSunDir.value.copy(sunDir);
		if (sunColor)    u.uSunColor.value.copy(sunColor);
		if (sunIntensity !== undefined) u.uSunIntensity.value = sunIntensity;
		if (fogColor)    u.uFogColor.value.copy(fogColor);
		if (fogDensity !== undefined) u.uFogDensity.value = fogDensity;

		// Kamera diskret folgen (100m-Raster verhindert Textur-Jittering)
		this.water.position.x = Math.floor(this.camera.position.x / 100) * 100;
		this.water.position.z = Math.floor(this.camera.position.z / 100) * 100;
	}


}