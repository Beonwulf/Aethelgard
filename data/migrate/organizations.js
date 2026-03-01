export const organizations = [
    // --- NATIONEN & REGIONEN (type: 'region') ---
    {
        slug: 'kaiserreich_aethelgard',
        name: { de: 'Kaiserreich Aethelgard', en: 'Empire of Aethelgard' },
        type: 'region',
        leader: 'Hochkönig Alaric',
        alignment: 'Lawful Neutral',
        associated_culture: 'kaiserliche'
    },
    {
        slug: 'die_freien_fjorde',
        name: { de: 'Die Freien Fjorde', en: 'The Free Fjords' },
        type: 'region',
        leader: 'Jarl Ragnhild Sturmbringer',
        alignment: 'Chaotic Neutral',
        associated_culture: 'skjaldar'
    },
    {
        slug: 'tiefenreich_mimir',
        name: { de: 'Tiefenreich von Mimir', en: 'Deep Realm of Mimir' },
        type: 'region',
        leader: 'Ratsherr Durin',
        alignment: 'Lawful Neutral',
        associated_culture: 'felsenzwerge'
    },

    // --- DIE ORDEN & ZIRKEL DER GÖTTER (type: 'faction') ---
    {
        slug: 'orden_des_solan',
        name: { de: 'Orden des Strahlenden Lichts', en: 'Order of Radiant Light' },
        type: 'faction',
        associated_god: 'Solan',
        description: { de: 'Paladine und Inquisitoren, die für Gerechtigkeit und die Vernichtung der Schatten kämpfen.', en: 'Paladins and inquisitors fighting for justice and the destruction of shadows.' }
    },
    {
        slug: 'schwesternschaft_der_valeria',
        name: { de: 'Schwesternschaft der Gnade', en: 'Sisterhood of Mercy' },
        type: 'faction',
        associated_god: 'Valeria',
        description: { de: 'Ein Orden von Heilerinnen und Diplomaten, die den Schutz der Schwachen über alles stellen.', en: 'An order of healers and diplomats who prioritize the protection of the weak.' }
    },
    {
        slug: 'gilde_des_mercuris', // Schattenhände
        name: { de: 'Die Schattenhände', en: 'The Shadow Hands' },
        type: 'faction',
        associated_god: 'Mercuris',
        description: { de: 'Diebe, Spione und Händler, die den freien Fluss von Gold und Informationen ehren.', en: 'Thieves, spies, and merchants honoring the free flow of gold and information.' }
    },
    {
        slug: 'zirkel_der_yldra',
        name: { de: 'Wächter des Weltenbaums', en: 'Wardens of the Worldtree' },
        type: 'faction',
        associated_god: 'Yldra',
        description: { de: 'Druiden und Waldläufer, die das Gleichgewicht der Natur bewahren.', en: 'Druids and rangers preserving the balance of nature.' }
    },
    {
        slug: 'orden_des_mornir',
        name: { de: 'Die Totenwächter', en: 'The Death Wardens' },
        type: 'faction',
        associated_god: 'Mornir',
        description: { de: 'Ein ernster Orden, der Bestattungsriten durchführt und ruhelose Seelen erlöst.', en: 'A somber order performing burial rites and releasing restless souls.' }
    },
    {
        slug: 'zirkel_der_skadi',
        name: { de: 'Frostjäger-Bund', en: 'Frost Hunter League' },
        type: 'faction',
        associated_god: 'Skadi',
        description: { de: 'Meister der Jagd und des Überlebens in den eisigsten Gipfeln.', en: 'Masters of the hunt and survival in the iciest peaks.' }
    },
    {
        slug: 'akademie_des_mimir',
        name: { de: 'Mimirs Hammer', en: 'Mimir\'s Hammer' },
        type: 'faction',
        associated_god: 'Mimir',
        description: { de: 'Zwergische Konstrukteure und Erfinder, die Wissen in Stein und Stahl verewigen.', en: 'Dwarven constructors and inventors eternalizing knowledge in stone and steel.' }
    },
    {
        slug: 'bund_des_lokh',
        name: { de: 'Die Weltenwandler', en: 'The World Walkers' },
        type: 'faction',
        associated_god: 'Lokh',
        description: { de: 'Wanderer und Entdecker, die Grenzen überschreiten und das Unbekannte kartieren.', en: 'Wanderers and explorers crossing borders and mapping the unknown.' }
    },

    // --- DIE KULTE & KABALEN DER WIDERSACHER (type: 'enemy_faction') ---
    {
        slug: 'kult_des_fenrisul',
        name: { de: 'Die Blut-Meute', en: 'The Blood Pack' },
        type: 'enemy_faction',
        associated_adversary: 'Fenrisul',
        description: { de: 'Fanatiker, die sich durch Taint in bestialische Monster verwandeln.', en: 'Fanatics transforming into bestial monsters through Taint.' }
    },
    {
        slug: 'zirkel_der_hela_ka',
        name: { de: 'Der Ewige Frost', en: 'The Eternal Frost' },
        type: 'enemy_faction',
        associated_adversary: 'Hela-Ka',
        description: { de: 'Nekromanten, die das Land mit einer Armee aus Eis-Untoten überziehen wollen.', en: 'Necromancers seeking to cover the land with an army of ice undead.' }
    },
    {
        slug: 'kabale_des_vorthos',
        name: { de: 'Die Weber der Lügen', en: 'The Weavers of Lies' },
        type: 'enemy_faction',
        associated_adversary: 'Vorthos',
        description: { de: 'Meister der Intrige, die Könige stürzen und Zwietracht säen.', en: 'Masters of intrigue toppling kings and sowing discord.' }
    },
    {
        slug: 'kult_des_surtr', // Zirkel der Asche
        name: { de: 'Zirkel der Asche', en: 'Circle of Ash' },
        type: 'enemy_faction',
        associated_adversary: 'Surtr',
        description: { de: 'Anbeter des Feuers, die den Weltenbrand herbeisehnen.', en: 'Fire worshippers longing for the Worldfire.' }
    },
    {
        slug: 'kult_des_xal_atath',
        name: { de: 'Die Leerenflüsterer', en: 'The Void Whisperers' },
        type: 'enemy_faction',
        associated_adversary: 'Xal-Atath',
        description: { de: 'Wesen, die den Wahnsinn der Leere in die Welt tragen.', en: 'Beings carrying the madness of the void into the world.' }
    },
    {
        slug: 'zirkel_des_nidhogg',
        name: { de: 'Die Wurzel-Fresser', en: 'The Root Eaters' },
        type: 'enemy_faction',
        associated_adversary: 'Nidhogg',
        description: { de: 'Agenten des Zerfalls, die das Fundament der Welt untergraben.', en: 'Agents of decay undermining the foundations of the world.' }
    },
    {
        slug: 'kabale_des_skoll',
        name: { de: 'Die Sonnenfresser', en: 'The Sun Eaters' },
        type: 'enemy_faction',
        associated_adversary: 'Skoll',
        description: { de: 'Attentäter, die darauf spezialisiert sind, das Licht Solans zu löschen.', en: 'Assassins specialized in extinguishing Solan\'s light.' }
    },
    {
        slug: 'kult_des_malakor',
        name: { de: 'Die Fleisch-Schmiede', en: 'The Flesh Forgers' },
        type: 'enemy_faction',
        associated_adversary: 'Malakor',
        description: { de: 'Kreaturen, die Körper und Geist durch dunkle Alchemie verformen.', en: 'Creatures deforming body and spirit through dark alchemy.' }
    }
];