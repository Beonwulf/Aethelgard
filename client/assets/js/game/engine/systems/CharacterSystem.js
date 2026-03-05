import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


export class CharacterSystem {


    constructor($scene, $ecs) {
        this.scene = $scene;
        this.ecs = $ecs;
        this.mixer = null;
        this.fsm = null;
        this.animations = {};
        this.blobShadow = null;
    }


    async loadForEntity($entityTag, $modelPath) {
        const entity = this.ecs.getEntityByTag($entityTag);
        if (entity === undefined) return;

        const loader = new GLTFLoader();
        const gltf = await loader.loadAsync($modelPath);

        const model = gltf.scene;
        // Mixamo/Blender cm → Three.js Meter: 0.018 ≈ 1.8m Körpergröße
        model.scale.setScalar(0.018);
        model.traverse(child => {
            if (child.isMesh) child.castShadow = true;
        });
        this.scene.add(model);

        // Blob-Shadow: dunkle transparente Scheibe direkt unter dem Charakter
        // (ShaderMaterial kann keine Three.js Shadow Maps empfangen)
        const shadowGeo = new THREE.CircleGeometry(0.6, 16);
        shadowGeo.rotateX(-Math.PI / 2);
        const shadowMat = new THREE.MeshBasicMaterial({
            color: 0x000000,
            transparent: true,
            opacity: 0.35,
            depthWrite: false,
        });
        this.blobShadow = new THREE.Mesh(shadowGeo, shadowMat);
        this.scene.add(this.blobShadow);

        // mesh-Komponente ins ECS
        this.ecs.addComponent(entity, 'mesh', { object3d: model });

        // AnimationMixer aufsetzen
        this.mixer = new THREE.AnimationMixer(model);
        gltf.animations.forEach(clip => {
            this.animations[clip.name] = {
                clip,
                action: this.mixer.clipAction(clip)
            };
        });

        console.log('🎭 Animationen geladen:', Object.keys(this.animations));

        // Erste verfügbare Animation als Idle abspielen
        const firstClip = Object.values(this.animations)[0];
        if (firstClip) firstClip.action.play();
    }


    update($dt) {
        if (this.mixer) this.mixer.update($dt);

        const player = this.ecs.getEntityByTag('player');
        if (player === undefined) return;

        const pos = this.ecs.getComponent(player, 'position');
        const rot = this.ecs.getComponent(player, 'rotation');
        const meshComp = this.ecs.getComponent(player, 'mesh');

        if (!pos || !meshComp) return;
        const obj = meshComp.object3d;

        // pos.y = Fußhöhe. Mixamo-Ursprung liegt an den Hüften (~0.9m über Füßen)
        // → Mesh nach OBEN verschieben damit Füße auf dem Boden stehen
        obj.position.set(pos.x, pos.y + 0.9, pos.z);
        if (rot) obj.rotation.y = rot.y;

        // Blob-Shadow direkt auf Bodenhöhe
        if (this.blobShadow) {
            this.blobShadow.position.set(pos.x, pos.y + 0.05, pos.z);
        }
    }

}
