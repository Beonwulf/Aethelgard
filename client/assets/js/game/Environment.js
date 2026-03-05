import * as THREE from 'three';


const ATMOSPHERE_PRESETS = {
	MIDDAY: {
		sunColor: 0xffffff,
		sunIntensity: 1.5,
		fogColor: 0xaaccff,
		fogDensity: 0.00015,
		ambientColor: 0x77aaff,
		ambientIntensity: 0.4,
		sunPos: [5000, 30000, 8000]
	},
	SUNSET: {
		sunColor: 0xff7700,
		sunIntensity: 2.0,
		fogColor: 0x442233,
		fogDensity: 0.00025,
		ambientColor: 0x221144,
		ambientIntensity: 0.2,
		sunPos: [-20000, 2000, -5000]
	},
	STORM: {
		sunColor: 0xaaaaaa,
		sunIntensity: 0.5,
		fogColor: 0x333333,
		fogDensity: 0.0008,
		ambientColor: 0x111111,
		ambientIntensity: 0.1,
		sunPos: [0, 20000, 0]
	}
};


export class Environment {
	constructor(scene) {
		this.scene = scene;
		this.currentPreset = 'MIDDAY';
		// Wir speichern den aktuellen Zustand als editierbare Werte
		this.currentState = {
			sunColor: new THREE.Color(),
			fogColor: new THREE.Color(0x00aaff),
			ambientColor: new THREE.Color(),
			sunIntensity: 1.0,
			fogDensity: 0.00015,
			sunPos: new THREE.Vector3()
		};
		this.targetPreset = null;
		this.transitionSpeed = 0.5; // Wie schnell wird gewechselt (0.1 = langsam, 2.0 = schnell)
		
		this.sun = null;
		this.ambient = null;
		this.time = 0; // 0 bis 24 (Spielstunden)
		
		this.init();
	}


	init() {
		// 1. Sonne (Hauptlicht)
		this.sun = new THREE.DirectionalLight();
		this.sun.position.set(10000, 20000, 10000);
		this.scene.add(this.sun);

		// 2. Umgebungslicht (hellt Schatten auf)
		this.ambient = new THREE.AmbientLight(0x606070, 0.8);
		this.scene.add(this.ambient);

		// 3. Nebel-Initialisierung
		this.scene.fog = new THREE.FogExp2();
		this.scene.background = new THREE.Color();

		// Mit Standard-Preset starten
		this.setPreset(ATMOSPHERE_PRESETS.MIDDAY, true);
	}


	applyPreset(p, instant = false) {
		// Lichtfarben & Intensität
		this.sun.color.setHex(p.sunColor);
		this.sun.intensity = p.sunIntensity;
		this.sun.position.set(...p.sunPos);

		this.ambient.color.setHex(p.ambientColor);
		this.ambient.intensity = p.ambientIntensity;

		// Nebel & Hintergrund
		this.scene.fog.color.setHex(p.fogColor);
		this.scene.fog.density = p.fogDensity;
		this.scene.background.setHex(p.fogColor);
	}


	setPreset(name, instant = false) {
		const p = ATMOSPHERE_PRESETS[name];
		if (!p) return;

		if (instant) {
			this.targetPreset = p;
			this.currentState.sunColor.setHex(p.sunColor);
			this.currentState.fogColor.setHex(p.fogColor);
			this.currentState.sunIntensity = p.sunIntensity;
			this.currentState.fogDensity = p.fogDensity;
			this.currentState.sunPos.set(...p.sunPos);
			this.applyToScene();
		} else {
			this.targetPreset = p;
		}
	}


	update(deltaTime, elapsedTime) {
		const cycleDuration = 600; // Ein Tag dauert 10 Minuten (600 Sek)
		// Berechne den Fortschritt des Tages (0.0 bis 1.0)
		const dayProgress = (elapsedTime % cycleDuration) / cycleDuration;

		// Winkel berechnen (wir fangen morgens an)
		const angle = dayProgress * Math.PI * 2;

		// 1. Sonnenposition im Kreis berechnen (X-Z Ebene für die Bahn, Y für die Höhe)
		const radius = 25000;
		const x = Math.cos(angle) * radius;
		const y = Math.sin(angle) * radius; // Geht unter 0 bei Nacht!
		const z = 10000; // Leichter Versatz für schräge Schatten

		this.currentState.sunPos.set(x, y, z);

		// 2. Automatischer Preset-Wechsel basierend auf der Höhe (Y)
		if (y > 5000) {
			this.setPreset('MIDDAY');
		} else if (y <= 5000 && y > -2000) {
			this.setPreset('SUNSET');
		} else if (y <= -2000) {
			this.setPreset('STORM'); // Hier könnten wir ein 'NIGHT' Preset einfügen
		}

		// 3. Bestehendes Lerping ausführen
		this.processLerp(deltaTime);
		this.applyToScene();
	}


	processLerp(deltaTime) {
		if (!this.targetPreset) return;
		// Die Magie des Lerp: Aktueller Wert + (Ziel - Aktuell) * Geschwindigkeit
		const t = deltaTime * this.transitionSpeed;

		// Farben interpolieren
		this.currentState.sunColor.lerp(new THREE.Color(this.targetPreset.sunColor), t);
		this.currentState.fogColor.lerp(new THREE.Color(this.targetPreset.fogColor), t);
		
		// Werte interpolieren
		this.currentState.sunIntensity += (this.targetPreset.sunIntensity - this.currentState.sunIntensity) * t;
		this.currentState.fogDensity += (this.targetPreset.fogDensity - this.currentState.fogDensity) * t;
	}


	applyToScene() {
		this.sun.color.copy(this.currentState.sunColor);
		this.sun.intensity = this.currentState.sunIntensity;
		this.sun.position.copy(this.currentState.sunPos);

		this.scene.fog.color.copy(this.currentState.fogColor);
		this.scene.fog.density = this.currentState.fogDensity;
		this.scene.background.copy(this.currentState.fogColor);
		
		// Ambient Light synchronisieren
		this.ambient.color.copy(this.currentState.fogColor).multiplyScalar(0.5);
	}


}