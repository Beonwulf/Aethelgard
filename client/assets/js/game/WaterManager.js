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
		const textureLoader = new THREE.TextureLoader();
		const noiseTex = textureLoader.load('./assets/textures/perlin-noise.png');
		noiseTex.wrapS = noiseTex.wrapT = THREE.RepeatWrapping;
		noiseTex.wrapT = THREE.RepeatWrapping;
		noiseTex.magFilter = THREE.LinearFilter;
		noiseTex.minFilter = THREE.LinearMipmapLinearFilter;
		noiseTex.generateMipmaps = true;

		const geometry = new THREE.PlaneGeometry(12000, 12000); // Kamera-folgend, Nebel bedeckt den Rand
		
		this.material = new THREE.ShaderMaterial({
			uniforms: {
				uTime:       { value: 0 },
				uFogColor:   { value: this.scene.fog.color },
				uSunDir:     { value: new THREE.Vector3() },
				uWaterColor: { value: new THREE.Color(0x004466) },
				uCameraPos:  { value: this.camera.position },
				uNoiseTex:   { value: noiseTex }
			},
			vertexShader:   this.shaderCode.vert,
			fragmentShader: this.shaderCode.frag,
			transparent: true,
			side: THREE.DoubleSide,
			// Stencil: nur rendern wo kein Land-Pixel markiert (stencil=0)
			stencilWrite: false,
			stencilRef:   1,
			stencilFunc:  THREE.NotEqualStencilFunc,
		});

		this.water = new THREE.Mesh(geometry, this.material);
		this.water.rotation.x = -Math.PI / 2;
		this.water.position.y = 0.25; 
		this.scene.add(this.water);
	}


	update(deltaTime, elapsedTime, sunDir) {
		this.material.uniforms.uTime.value = elapsedTime;
		this.material.uniforms.uSunDir.value.copy(sunDir);
		this.material.uniforms.uFogColor.value.copy(this.scene.fog.color);
		this.material.uniforms.uCameraPos.value.copy(this.camera.position);

		// Das Wasser folgt der Kamera diskret im 100m-Raster, 
		// um Textur-Jittering zu vermeiden
		this.water.position.x = Math.floor(this.camera.position.x / 100) * 100;
		this.water.position.z = Math.floor(this.camera.position.z / 100) * 100;
	}


}