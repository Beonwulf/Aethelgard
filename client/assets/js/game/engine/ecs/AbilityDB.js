/**
 * Alle Abilities des Spiels.
 * Jede Ability ist ein reines Datenobjekt.
 * Das AbilitySystem referenziert diese per ID.
 */
export const AbilityDB = {

    'fireball': {
        id: 'fireball',
        name: 'Feuerball',
        icon: '🔥',
        cd: 3.0,        // Individuelle CD in Sekunden
        mpCost: 20,
        gcdTrigger: true,
        castTime: 0,    // 0 = instant
        tooltip: 'Schleudert einen Feuerball auf das Ziel.',
    },

    'heal': {
        id: 'heal',
        name: 'Heilung',
        icon: '💚',
        cd: 8.0,
        mpCost: 35,
        gcdTrigger: true,
        castTime: 0,
        tooltip: 'Heilt dich oder dein Ziel.',
    },

    'shield': {
        id: 'shield',
        name: 'Schild',
        icon: '🛡️',
        cd: 15.0,
        mpCost: 0,
        gcdTrigger: false,  // Off-GCD
        castTime: 0,
        tooltip: 'Aktiviert einen Schutzschild. Löst keinen GCD aus.',
    },

    'dash': {
        id: 'dash',
        name: 'Sturmangriff',
        icon: '⚡',
        cd: 12.0,
        mpCost: 10,
        gcdTrigger: false,
        castTime: 0,
        tooltip: 'Sprint zum Ziel.',
    },

    'iceblast': {
        id: 'iceblast',
        name: 'Eissplitter',
        icon: '❄️',
        cd: 6.0,
        mpCost: 25,
        gcdTrigger: true,
        castTime: 0,
        tooltip: 'Verlangsamt das Ziel.',
    },

    'stealth': {
        id: 'stealth',
        name: 'Verstecken',
        icon: '👁️',
        cd: 20.0,
        mpCost: 0,
        gcdTrigger: false,
        castTime: 0,
        tooltip: 'Du wirst unsichtbar.',
    },

    'arrow': {
        id: 'arrow',
        name: 'Pfeilschuss',
        icon: '🏹',
        cd: 0,
        mpCost: 0,
        gcdTrigger: true,
        castTime: 0,
        tooltip: 'Normaler Fernkampf-Angriff.',
    },

    'taunt': {
        id: 'taunt',
        name: 'Provokation',
        icon: '😡',
        cd: 8.0,
        mpCost: 0,
        gcdTrigger: true,
        castTime: 0,
        tooltip: 'Zwingt das Ziel dich anzugreifen.',
    },

};
