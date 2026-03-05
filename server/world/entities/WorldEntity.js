export class WorldEntity {
    constructor($charData) {
        this.id = $charData.uuid;
        this.characterData = $charData;
        this.position = { x: 45 * 2395, y: 0, z: 20 * 2395 }; // Start position
        this.rotation = { x: 0, y: 0, z: 0, w: 1 };
        this.state = 'idle';
    }

    get broadcastable() {
        return {
            id: this.id,
            position: this.position,
            rotation: this.rotation,
            state: this.state,
            name: this.characterData.name,
            legacyName: this.characterData.legacy_name,
            race: this.characterData.race,
            gender: this.characterData.gender,
        };
    }
}
