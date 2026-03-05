import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DummyFSM } from '../game/engine/state/DummyFSM.js';
import { BasicCharacterControllerProxy } from '../game/engine/state/BasicCharacterControllerProxy.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const BONE_MAP = {
    'pelvis': 'mixamorig1Hips',
    'spine_01': 'mixamorig1Spine',
    'spine_02': 'mixamorig1Spine1',
    'spine_03': 'mixamorig1Spine2',
    'neck_01': 'mixamorig1Neck',
    'Head': 'mixamorig1Head',
    // Links
    'clavicle_l': 'mixamorig1LeftShoulder',
    'upperarm_l': 'mixamorig1LeftArm',
    'lowerarm_l': 'mixamorig1LeftForeArm',
    'hand_l': 'mixamorig1LeftHand',
    'thigh_l': 'mixamorig1LeftUpLeg',
    'calf_l': 'mixamorig1LeftLeg',
    'foot_l': 'mixamorig1LeftFoot',
    // Rechts
    'clavicle_r': 'mixamorig1RightShoulder',
    'upperarm_r': 'mixamorig1RightArm',
    'lowerarm_r': 'mixamorig1RightForeArm',
    'hand_r': 'mixamorig1RightHand',
    'thigh_r': 'mixamorig1RightUpLeg',
    'calf_r': 'mixamorig1RightLeg',
    'foot_r': 'mixamorig1RightFoot',
    // Finger (Beispielhaft für Index - Rest analog erweiterbar)
    'index_01_l': 'mixamorig1LeftHandIndex1',
    'index_02_l': 'mixamorig1LeftHandIndex2',
    'index_03_l': 'mixamorig1LeftHandIndex3',
};

const haitStyles = {
	path: '/assets/models/basecharacter/UniversalBaseCharacters/Hairstyles/RiggedtoHeadBone/glTF/',
	eyebrows: 'Eyebrows_Regular.gltf',
	hairBeard: 'Hair_Beard.gltf',
	hairBuns: 'Hair_Buns.gltf',
	hairLong: 'Hair_Long.gltf',
	hairBuzzed: 'Hair_Buzzed.gltf',
	hairSimpleParted: 'Hair_SimpleParted.gltf',
};


const findAnimation = ($glb, $animName, $mixer) => {
	for (let i = 0; i < $glb.animations.length; i++) {
		if ($glb.animations[i].name.includes($animName)) {
			const clip = $glb.animations[i];
			const action = $mixer.clipAction(clip);
			return {
				clip: clip,
				action: action
			}
		}
	}
	return null;
};

export class CharacterCreater3d {


	constructor( $canvasId, $view ) {
		this.canvas = $view.querySelector(`#${$canvasId}`);
		if (!this.canvas) return;

		this.parent = this.canvas.parentElement;

		this.init();
	}


	init() {
		this.clock = new THREE.Clock();
		this.animations = {};
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(60, this.parent.clientWidth / this.parent.clientHeight, 0.1, 10);

		this.renderer = new THREE.WebGLRenderer({ canvas:this.canvas, alpha: true, antialias: true });
		this.renderer.setSize(this.parent.clientWidth, this.parent.clientHeight);
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

		window.addEventListener('resize', this.resizeHandler.bind(this));

		// 1. Licht initialisieren
		this.initLight();

		// 2. Modell laden
		this.initModel();

		// 4. Loop starten
		this.renderLoop();
	}


	initControls() {
		this.controls = new OrbitControls(this.camera, this.renderer.domElement);

		const modelPos = this.model.position;
		this.desiredTarget   = new THREE.Vector3(modelPos.x, modelPos.y + 0.6, modelPos.z);
		this.desiredCamPos   = new THREE.Vector3(modelPos.x, modelPos.y + 0.6, modelPos.z + 3.5);
		this.controls.target.copy(this.desiredTarget);
		this.camera.position.copy(this.desiredCamPos);

		this.controls.enablePan = false;
		this.controls.enableDamping = true;
		this.controls.dampingFactor = 0.05;

		this.controls.minDistance = 0.3;
		this.controls.maxDistance = 8.0;

		this.controls.minPolarAngle = 0;
		this.controls.maxPolarAngle = Math.PI * 0.55;

		this.controls.update();
	}


	initModel() {
		// Modell laden
		const loader = new GLTFLoader();

		loader.load('/assets/models/dummy.glb', (gltf) => {
			this.model = gltf.scene;
			console.log("3D-Modell erfolgreich geladen:", gltf);
			this.model.scale.setScalar(0.01);
			// Das Modell leicht nach unten und vorne rotieren für eine bessere Präsentation
			this.model.position.set(0, -2, 2);

			this.bones = {};
			this.model.traverse((child) => {
				child.castShadow = true;
				child.receiveShadow = true;
				if(child.skeleton) {
					for( let bone of child.skeleton.bones ) {
						this.bones[bone.name] = bone;
					}
				}
				if( child.material && child.material.map ) {
					child.material.map.colorSpace = 'srgb';
				}
				if( child.isMesh && child.name.toLowerCase().includes('head') ) {
					child.visible = false;
				}
				if( child.isMesh ) {
					console.log( child );
				}

				//if (child.isBone) { this.bones[child.name] = child; }
			});
			if( this.$quaterniusHead ) {
				this.attachHead();
			}

			const noneNames = Object.keys(this.bones).filter(name => name === '');
			if( noneNames.length > 0 ) {
				console.warn('Es gibt Knochen ohne Namen:', noneNames);
			}
			//console.log('bones:', Object.keys(this.bones));

			this.mixer = new THREE.AnimationMixer( this.model );

			//console.log(gltf.animations);
			//if( gltf.animations && gltf.animations.length > 0 ) { this.mixer.clipAction( gltf.animations[0] ).play(); }
			const find = ['Idle', 'Idle_boring', 'Idle_hot'];
			for( let animName of find ) {
				this.animations[animName.toLocaleLowerCase()] = findAnimation( gltf, animName, this.mixer);
			}
			//this.animations['idle'] = findAnimation( gltf, 'Idle', this.mixer);
			//this.animations['idle_boring'] = findAnimation( gltf, 'Idle_boring', this.mixer);

			//console.log("Gefundene Animationen:", this.animations);

			this.model.visible = true;

			this.stateMachine = new DummyFSM(new BasicCharacterControllerProxy(this.animations));
			this.stateMachine.setState('idle_hot');

			this.scene.add(this.model);
			this.model.position.set(0, 2.5, -2);
			//this.camera.position.set(0, -1.8, 12);
			this.initControls();
			//this.camera.lookAt(this.model.position);
			/*
			const $body = this.model.getObjectByName('Ch36');
			if ($body) $body.visible = false;
			loader.load('/assets/models/basecharacter/male2.glb', (glb) => {
				this.applyOutfitToDummy( glb.scene );
			});*/
			loader.load('assets/models/hair/eyebrows.glb', ($glb) => {
				const eyebrows = $glb.scene.getObjectByName('Eyebrows_Regular');
				if( eyebrows.isSkinnedMesh ) { eyebrows.bindMode = 'attached'; }
				if( eyebrows.material.map ) eyebrows.material.map.colorSpace = 'srgb';
				eyebrows.castShadow = true;
				if( eyebrows ) {
					const staticEyebrows = new THREE.Mesh( eyebrows.geometry, eyebrows.material );
					if( staticEyebrows.material.map ) staticEyebrows.material.map.colorSpace = 'srgb';
					staticEyebrows.castShadow = true;

					const headBone = this.bones['mixamorig1Head'];
					if( headBone ) {
						staticEyebrows.scale.setScalar(4);
						staticEyebrows.position.set(0, 0, 0);
						staticEyebrows.rotation.set(0, 0, 0);
						//headBone.add(staticEyebrows);
					}
					this.scene.add(staticEyebrows);
				}
				/*
				// Den Kopf-Knochen deines Dummies finden
				const headBone = this.bones['mixamorig1Head'];
				if( headBone ) {
					
					// Wichtig: Da dein Dummy scale(0.01) hat, muss das Haar 
					// im Verhältnis zum Knochen skaliert werden (oft x100)
					//eyebrows.scale.setScalar(1);

					// Position und Rotation nullen, damit es exakt am Bone sitzt
					eyebrows.position.set(0, 0, 0);
					eyebrows.rotation.set(0, 0, 0);

					// Das Haar wird nun ein Kind des Knochens
					headBone.add(eyebrows);
					console.log('Eyebrows loaded and attached to head bone:', eyebrows);
				}*/
				//this.eyebrows = eyebrows;//.getObjectByName('Eyebrows_Regular');

				//this.scene.add(this.eyebrows)
				//this.camera.lookAt(this.eyebrows.position);
			});
		}, undefined, (error) => {
			console.error("Fehler beim Laden des 3D-Modells:", error);
		});
	}


	focusOn($part) {
		if (!this.controls || !this.model) return;

		const modelPos = this.model.position;
		let targetOffsetY = 1.3;
		let zoomDist      = 3.5;

		switch ($part) {
			case 'head':
				targetOffsetY = 1.85;
				zoomDist = 0.8;
				break;
			case 'torso':
				targetOffsetY = 1.2;
				zoomDist = 1.2;
				break;
			case 'legs':
				targetOffsetY = 0.4;
				zoomDist = 1.5;
				break;
			default: // body – volle Ansicht, Basis wie legs aber weiter raus
				targetOffsetY = 0.6;
				zoomDist = 3.5;
				break;
		}

		this.desiredTarget.set(modelPos.x, modelPos.y + targetOffsetY, modelPos.z);
		this.desiredCamPos.set(modelPos.x, modelPos.y + targetOffsetY, modelPos.z + zoomDist);
	}


	applyOutfitToDummy($outfitScene) {
		$outfitScene.traverse(($child) => {
			if ($child.isSkinnedMesh) {
				// 1. Die Knochen des Outfits neu zuordnen
				const $newBones = [];
				const $skeleton = $child.skeleton;

				for (let $i = 0; $i < $skeleton.bones.length; $i++) {
					const $oldBone = $skeleton.bones[$i];
					const $mappedName = BONE_MAP[$oldBone.name];
					if( !$mappedName ) { continue;}

					// Wir suchen den Knochen in der Instanz deines Dummies (this.model)
					//console.log('Mapping bone:', $oldBone.name, 'to:', $mappedName);
					let $targetBone = this.model.getObjectByName($mappedName);

					if (!$targetBone) {
						// 1. Versuch: Hat der Knochen einen Parent, den wir kennen?
						if ($oldBone.parent && $BONE_MAP[$oldBone.parent.name]) {
							$targetBone = this.model.getObjectByName($BONE_MAP[$oldBone.parent.name]);
						}
						// 2. Versuch: Wenn immer noch nichts, dann als Anker die Hüfte
						if (!$targetBone) {
							$targetBone = this.model.getObjectByName('mixamorig1Hips');
						}
					}
					if ($targetBone) {
						$newBones.push($targetBone);
					} else {
						// Fallback: Wenn Knochen nicht gemappt (z.B. Finger-Blätter), 
						// nehmen wir den Parent-Knochen oder das Pelvis
						$newBones.push(this.model.getObjectByName('mixamorig1Hips'));
					}
				}

				// 2. Das Mesh dem Dummy-Skelett zuweisen
				$child.bind(new THREE.Skeleton($newBones, $skeleton.boneInverses), $child.bindMatrix);

				// 3. WICHTIG: Die Skalierung anpassen. 
				// Wenn der Dummy scale(0.01) hat, muss das Outfit das kompensieren.
				//$child.scale.setScalar(100);

				// 4. Zur Szene oder direkt zum Model hinzufügen
				this.model.add($child);

				// Textur-Fix (wie besprochen)
				if ($child.material.map) $child.material.map.colorSpace = 'srgb';
			}
		});
	}


	initLight() {
		// Beleuchtung
		const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
		this.scene.add(ambientLight);

		const dirLight = new THREE.DirectionalLight(0xffeedd, 1);
		dirLight.position.set(2, 5, 3);
		this.scene.add(dirLight);
	}


	resizeHandler() {
		this.camera.aspect = this.parent.clientWidth / this.parent.clientHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(this.parent.clientWidth, this.parent.clientHeight);
	}


	renderLoop() {
		if (!this.renderer) return;
		this.animationId = requestAnimationFrame(this.renderLoop.bind(this));

		if (this.model) {
			// getDelta() gibt die vergangene Zeit seit dem letzten Aufruf zurück.
			// ACHTUNG: getElapsedTime() und getDelta() rufen intern beide Date.now() auf.
			// Wenn man getElapsedTime aufruft, wird die "oldTime" der Clock nicht geupdatet,
			// bei getDelta aber schon. Man sollte nur eins von beiden für das Tick-Update nutzen.
			const delta = this.clock.getDelta();
			
			// Leichtes Drehen zur Präsentation
			//this.model.rotation.y += 0.005;
			if( this.eyebrows) this.eyebrows.rotation.y += 0.005;

			if( this.stateMachine ) {
				this.stateMachine.update(delta, null);
			}
			if( this.mixer ) {
				this.mixer.update(delta);
			}
		}

		if (this.controls) {
			// Target und Kamera direkt zur gewünschten Position lerpen
			this.controls.target.lerp(this.desiredTarget, 0.05);
			this.camera.position.lerp(this.desiredCamPos, 0.05);
			this.controls.update();
		}

		this.renderer.render(this.scene, this.camera);
	}


	destroy() {
		cancelAnimationFrame(this.animationId);
		this.renderer.dispose();
		this.scene.clear();
	}


}