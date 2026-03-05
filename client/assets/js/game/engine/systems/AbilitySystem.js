import { AbilityDB } from '../ecs/AbilityDB.js';


export class AbilitySystem {

    constructor($ecs, $inputManager) {
        this.ecs = $ecs;
        this.input = $inputManager;
        this.pressed = new Set();

        // Ability-Slots über InputManager registrieren
        for (let i = 1; i <= 12; i++) {
            const action = `ABILITY_${i}`;
            const slot = i - 1;
            this.input.on(action, () => this.pressed.add(slot));
        }
    }


    update($dt) {
        const player = this.ecs.getEntityByTag('player');
        if (player === undefined) return;

        const abilities = this.ecs.getComponent(player, 'abilities');
        const stats     = this.ecs.getComponent(player, 'stats');
        if (!abilities) return;

        // 1. GCD herunterzählen
        if (abilities.gcd > 0) {
            abilities.gcd = Math.max(0, abilities.gcd - $dt);
        }

        // 2. Individuelle CDs herunterzählen
        for (const id in abilities.cooldowns) {
            abilities.cooldowns[id] = Math.max(0, abilities.cooldowns[id] - $dt);
        }

        // 3. Keypresses verarbeiten (nur einmal pro Keydown, nicht per-Frame)
        for (const slot of this.pressed) {
            this.pressed.delete(slot); // consume
            this._tryActivate(slot, abilities, stats);
        }
    }


    _tryActivate($slot, $abilities, $stats) {
        const abilityId = $abilities.slots[$slot];
        if (!abilityId) return;

        const def = AbilityDB[abilityId];
        if (!def) return;

        // GCD-Check (Off-GCD Abilities ignorieren GCD)
        if (def.gcdTrigger && $abilities.gcd > 0) {
            console.log(`⏳ GCD aktiv (${$abilities.gcd.toFixed(1)}s)`);
            return;
        }

        // Individuelle CD-Check
        const cd = $abilities.cooldowns[abilityId] || 0;
        if (cd > 0) {
            console.log(`⏳ ${def.name} on CD (${cd.toFixed(1)}s)`);
            return;
        }

        // Mana-Check
        if ($stats && def.mpCost > 0 && $stats.mp < def.mpCost) {
            console.log(`🔵 Zu wenig Mana für ${def.name}`);
            return;
        }

        // Aktivieren!
        if (def.gcdTrigger) $abilities.gcd = $abilities.gcdMax;
        if (def.cd > 0) $abilities.cooldowns[abilityId] = def.cd;
        if ($stats && def.mpCost > 0) $stats.mp = Math.max(0, $stats.mp - def.mpCost);

        console.log(`✨ ${def.name} aktiviert!`);

        // Event für andere Systeme (z.B. NetworkSystem, AnimationSystem)
        this.ecs.notify(this.ecs.getEntityByTag('player'), 'ability_used', {
            abilityId,
            def,
        });
    }


    // Hilfsmethode: GCD-Fortschritt 0..1 für GUI
    getGcdProgress($abilities) {
        if (!$abilities || $abilities.gcdMax === 0) return 1;
        return 1 - ($abilities.gcd / $abilities.gcdMax);
    }

}
