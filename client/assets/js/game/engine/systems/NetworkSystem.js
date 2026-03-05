/**
 * NetworkSystem: Synct ECS-Komponenten mit dem Server über Socket.io.
 * Aktuell: Vorbereitung / Stub. Wird aktiviert wenn Socket-Verbindung steht.
 */
export class NetworkSystem {

    constructor($ecs, $socket = null) {
        this.ecs = $ecs;
        this.socket = $socket;
        this.tickRate = 20;          // Syncs pro Sekunde
        this._tickInterval = 1 / this.tickRate;
        this._elapsed = 0;
        this._connected = false;

        if ($socket) this._bindSocketEvents();
    }


    connect($socket) {
        this.socket = $socket;
        this._bindSocketEvents();
    }


    _bindSocketEvents() {
        if (!this.socket) return;

        this.socket.on('connect', () => {
            this._connected = true;
            console.log('🌐 Verbunden mit dem Server:', this.socket.id);
        });

        this.socket.on('disconnect', () => {
            this._connected = false;
            console.log('❌ Verbindung verloren');
        });

        // Andere Spieler bewegen sich
        this.socket.on('player_move', ($data) => {
            const entity = this.ecs.getEntityByTag(`player_${$data.id}`);
            if (entity === undefined) return;
            const net = this.ecs.getComponent(entity, 'network');
            if (net) {
                net.serverPos = $data.position;
                net.interpolating = true;
            }
        });

        // Ability eines anderen Spielers
        this.socket.on('player_ability', ($data) => {
            console.log(`⚔️ Spieler ${$data.id} nutzt ${$data.abilityId}`);
            // TODO: Animation, VFX
        });
    }


    update($dt) {
        if (!this._connected || !this.socket) return;

        // Interpolation anderer Spieler
        this._interpolateRemotePlayers($dt);

        // Eigene Position senden (rate-limited)
        this._elapsed += $dt;
        if (this._elapsed >= this._tickInterval) {
            this._elapsed = 0;
            this._syncLocalPlayer();
        }
    }


    _syncLocalPlayer() {
        const player = this.ecs.getEntityByTag('player');
        if (player === undefined) return;

        const pos = this.ecs.getComponent(player, 'position');
        const rot = this.ecs.getComponent(player, 'rotation');
        const net = this.ecs.getComponent(player, 'network');
        if (!pos || !net) return;

        // Nur senden wenn dirty (Position hat sich geändert)
        if (!net.dirty) return;
        net.dirty = false;
        net.lastSync = Date.now();

        this.socket.emit('player_move', {
            position: { x: pos.x, y: pos.y, z: pos.z },
            rotation: rot?.y || 0,
        });
    }


    _interpolateRemotePlayers($dt) {
        // Alle Remote-Spieler (tag beginnt mit 'player_')
        for (const [tag, entityId] of this.ecs.tags) {
            if (!tag.startsWith('player_')) continue;
            const net = this.ecs.getComponent(entityId, 'network');
            const pos = this.ecs.getComponent(entityId, 'position');
            if (!net?.interpolating || !net.serverPos || !pos) continue;

            // Sanftes Lerpen zur Server-Position
            const t = Math.min(1, $dt * 15);
            pos.x += (net.serverPos.x - pos.x) * t;
            pos.y += (net.serverPos.y - pos.y) * t;
            pos.z += (net.serverPos.z - pos.z) * t;

            // Wenn nah genug, Interpolation stoppen
            const dx = net.serverPos.x - pos.x;
            const dz = net.serverPos.z - pos.z;
            if (Math.sqrt(dx*dx + dz*dz) < 0.01) net.interpolating = false;
        }
    }

}
