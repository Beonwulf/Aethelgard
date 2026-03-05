/**
 * Zentrale Definitionen aller ECS-Komponenten.
 * Jede Komponente ist ein reines Datenobjekt (POJO).
 */

export const Components = {

    // Basis-Positionierung
    position:  () => ({ x: 0, y: 0, z: 0 }),
    rotation:  () => ({ x: 0, y: 0, z: 0 }),
    velocity:  () => ({ x: 0, y: 0, z: 0 }),

    // Spieler-Kamera
    camera: () => ({
        distance: 10,
        phi: 1.2,
        theta: -Math.PI / 2,  // Von hinten starten (0° wäre seitlich)
        targetHeight: 1.7,
        smoothSpeed: 0.1
    }),

    // 3D-Mesh Referenz
    mesh: () => ({ object3d: null }),

    // Vitals: HP, Mana, Level
    stats: () => ({
        hp: 100,    maxHp: 100,
        mp: 100,    maxMp: 100,
        level: 1,
        xp: 0,      xpNext: 1000,
    }),

    // Fähigkeiten-Slots (12 Slots = eine ActionBar)
    abilities: () => ({
        slots: new Array(12).fill(null),  // null = leer, sonst AbilityDef-ID
        gcd: 0,         // aktueller GCD-Countdown (Sekunden)
        gcdMax: 1.5,    // Standard-GCD
        cooldowns: {},  // { abilityId: verbleibende Sekunden }
    }),

    // Netzwerk: wird vom NetworkSystem gesynct
    network: () => ({
        entityId: null,     // Server-seitige ID
        dirty: false,       // true = muss gesynct werden
        lastSync: 0,        // Timestamp letzter Sync
        interpolating: false,
        serverPos: null,    // Letzte Server-Position für Interpolation
    }),

    // GUI-Mapping: welche DOM-Elemente gehören zu diesem Entity
    gui: () => ({
        healthBar: null,    // DOM-Referenz
        manaBar: null,
        nameplate: null,
        tracked: true,      // Wird vom GUISystem aktualisiert
    }),

};
