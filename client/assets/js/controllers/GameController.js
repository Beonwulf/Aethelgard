import { BaseController } from './BaseController.js';
import { Aethelgard } from '../game/Aethelgard.js';

export class GameController extends BaseController {
    constructor($app) {
        super('game', $app);
        this.game = null;
    }

    // We override init, because we don't load a JSON view
    async init() {
        // Do nothing
    }

    // We override render to load the game.html and start the game engine
    async render(targetElement, worldData) {
        try {
            const response = await fetch('/game.html');
            if (!response.ok) {
                throw new Error(`Failed to load game.html: ${response.statusText}`);
            }
            const html = await response.text();
            targetElement.innerHTML = html;

            // Now that the canvas is in the DOM, start the game
            this.game = new Aethelgard();
            await this.game.ignite(worldData);

            this.onReady();
        } catch (error) {
            console.error("Failed to render game:", error);
            // Optionally, display an error message to the user
            targetElement.innerHTML = `<p>Error loading game. Please try again later.</p>`;
        }
    }

    onReady() {
        console.log("🎮 GameController is ready.");
    }

    destroy() {
        if (this.game) {
            this.game.shutdown();
        }
        super.destroy();
    }
}
