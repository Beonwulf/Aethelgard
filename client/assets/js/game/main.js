import { Aethelgard } from './Aethelgard.js';

window.addEventListener('DOMContentLoaded', async () => {
    try {
        const game = new Aethelgard();

        // Test-WorldData fuer direkten Engine-Test (ohne Server)
        const worldData = {
            playerId: 'test_player',
            players: [{
                id: 'test_player',
                position: { x: 45 * 2395, y: 200, z: 20 * 2395 }
            }]
        };

        await game.ignite(worldData);

        window.aethelgard = game;
        console.log("Aethelgard erfolgreich gestartet!");
    } catch (error) {
        console.error("Fehler beim Starten von Aethelgard:", error);
    }
});