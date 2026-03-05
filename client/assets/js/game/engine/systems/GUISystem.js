import { AbilityDB } from '../ecs/AbilityDB.js';


/**
 * GUISystem: Hält ECS-Daten und DOM synchron.
 * Rendert: ActionBar, GCD-Sweep, CDs, Health/Mana-Orbs, XP-Bar.
 */
export class GUISystem {

    constructor($ecs) {
        this.ecs = $ecs;
        this.initialized = false;
        this._slotEls = [];
        this._gcdCanvas = null;
        this._gcdCtx = null;
        this._minimapCanvas = null;
        this._minimapCtx = null;
        this._minimapImg = null;
        this._minimapSize = 180;
        this._minimapZoom = 10;        // Zoom-Stufe (höher = mehr rein)
        this._worldTotalSize = 26624;
        this._mapOpen = false;
    }


    init($inputManager) {
        this._buildDOM();
        this._loadMinimap();
        // Map-Toggle über InputManager
        if ($inputManager) {
            $inputManager.on('MAP_TOGGLE', () => this.toggleMap());
        }
        this.initialized = true;
    }


    toggleMap() {
        this._mapOpen = !this._mapOpen;
        const el = document.getElementById('fullmap');
        if (el) el.style.display = this._mapOpen ? 'flex' : 'none';
    }


    _buildDOM() {
        const gui = document.getElementById('game-gui');
        if (!gui) return;

        gui.innerHTML = `
            <!-- Health & Mana Orbs (links unten) -->
            <div id="player-frame">
                <div class="orb-wrap" id="hp-orb-wrap">
                    <div class="orb orb-hp" id="hp-orb"></div>
                    <div class="orb-label" id="hp-label">100 / 100</div>
                </div>
                <div class="player-name">Held</div>
                <div class="orb-wrap" id="mp-orb-wrap">
                    <div class="orb orb-mp" id="mp-orb"></div>
                    <div class="orb-label" id="mp-label">100 / 100</div>
                </div>
            </div>

            <!-- XP-Bar ganz unten -->
            <div id="xp-bar-wrap">
                <div id="xp-bar"></div>
                <span id="xp-label">0 / 1000 XP</span>
            </div>

            <!-- ActionBar (Mitte unten) -->
            <div id="actionbar">
                <div id="actionbar-slots"></div>
                <canvas id="gcd-canvas"></canvas>
            </div>

            <!-- Debug HUD -->
            <div id="debug-hud">
                <strong>Aethelgard</strong><br>
                Pos: <span id="pos">0, 0, 0</span> | 
                Chunks: <span id="chunks">0</span><br>
                <small>[1-4] Teleport</small>
            </div>

            <!-- Vollbild-Map [M] -->
            <div id="fullmap" style="display:none">
                <div id="fullmap-inner">
                    <div id="fullmap-header">
                        <span>Karte von Aethelgard</span>
                        <button id="fullmap-close" onclick="window.aethelgard?.guiSystem?.toggleMap()">✕</button>
                    </div>
                    <div id="fullmap-img-wrap">
                        <img id="fullmap-img" src="./assets/world/minimap.jpg" draggable="false">
                        <canvas id="fullmap-canvas"></canvas>
                    </div>
                    <!-- TODO: POI-Icons, Städte, Dungeons, Quest-Marker -->
                </div>
            </div>

            <!-- Minimap (oben rechts) -->
            <div id="minimap-wrap">
                <canvas id="minimap-canvas"></canvas>
                <div id="minimap-label">Aethelgard</div>
            </div>
        `;

        this._buildActionBar();
        this._initGCDCanvas();
    }


    _buildActionBar() {
        const container = document.getElementById('actionbar-slots');
        if (!container) return;

        const player = this.ecs.getEntityByTag('player');
        const abilities = player !== undefined ? this.ecs.getComponent(player, 'abilities') : null;

        for (let i = 0; i < 12; i++) {
            const slot = document.createElement('div');
            slot.className = 'ab-slot';
            slot.dataset.slot = i;

            const keylabel = ['1','2','3','4','5','6','7','8','9','0','-','='][i];
            slot.innerHTML = `
                <div class="ab-icon"></div>
                <div class="ab-cd-overlay"></div>
                <div class="ab-cd-text"></div>
                <div class="ab-keybind">${keylabel}</div>
            `;

            // Ability zuweisen falls vorhanden
            const abilityId = abilities?.slots[i];
            if (abilityId && AbilityDB[abilityId]) {
                slot.querySelector('.ab-icon').textContent = AbilityDB[abilityId].icon;
                slot.title = AbilityDB[abilityId].tooltip;
            }

            slot.addEventListener('click', () => {
                const sys = window.aethelgard?.abilitySystem;
                if (sys) sys.pressed.add(i);
            });

            container.appendChild(slot);
            this._slotEls.push(slot);
        }
    }


    _initGCDCanvas() {
        const canvas = document.getElementById('gcd-canvas');
        if (!canvas) return;
        canvas.width  = this._slotEls.length * 54 + 8;
        canvas.height = 54 + 8;
        this._gcdCanvas = canvas;
        this._gcdCtx = canvas.getContext('2d');
    }


    _loadMinimap() {
        const canvas = document.getElementById('minimap-canvas');
        if (!canvas) return;
        const S = this._minimapSize;
        canvas.width  = S;
        canvas.height = S;
        this._minimapCanvas = canvas;
        this._minimapCtx = canvas.getContext('2d');

        const img = new Image();
        img.src = './assets/world/minimap.jpg';
        img.onload = () => { this._minimapImg = img; };

        // Mausrad = Zoom auf Minimap
        canvas.addEventListener('wheel', ($e) => {
            $e.preventDefault();
            this._minimapZoom = Math.max(3, Math.min(20, this._minimapZoom + ($e.deltaY > 0 ? -1 : 1)));
        }, { passive: false });

        // TODO: Minimap zeigt aktuell nur Heightmap (Graustufen).
        // Später: Biome-Farben, POI-Icons, Spieler-Dots für Party-Mitglieder,
        //         Dungeons, Städte, Quest-Marker einzeichnen.
    }


    update() {
        if (!this.initialized) return;

        const player = this.ecs.getEntityByTag('player');
        if (player === undefined) return;

        const stats     = this.ecs.getComponent(player, 'stats');
        const abilities = this.ecs.getComponent(player, 'abilities');
        const pos       = this.ecs.getComponent(player, 'position');
        const rot       = this.ecs.getComponent(player, 'rotation');

        if (stats)     this._updateStats(stats);
        if (abilities) this._updateAbilities(abilities);
        if (pos)       this._updateMinimap(pos, rot);
        if (pos && this._mapOpen) this._updateFullmap(pos, rot);
    }


    _updateStats($s) {
        const hpOrb   = document.getElementById('hp-orb');
        const mpOrb   = document.getElementById('mp-orb');
        const hpLabel = document.getElementById('hp-label');
        const mpLabel = document.getElementById('mp-label');
        const xpBar   = document.getElementById('xp-bar');
        const xpLabel = document.getElementById('xp-label');

        if (hpOrb)   hpOrb.style.height   = `${($s.hp / $s.maxHp) * 100}%`;
        if (mpOrb)   mpOrb.style.height   = `${($s.mp / $s.maxMp) * 100}%`;
        if (hpLabel) hpLabel.textContent  = `${Math.ceil($s.hp)} / ${$s.maxHp}`;
        if (mpLabel) mpLabel.textContent  = `${Math.ceil($s.mp)} / ${$s.maxMp}`;
        if (xpBar)   xpBar.style.width    = `${($s.xp / $s.xpNext) * 100}%`;
        if (xpLabel) xpLabel.textContent  = `${$s.xp} / ${$s.xpNext} XP`;
    }


    _updateAbilities($a) {
        const gcdProgress = $a.gcdMax > 0 ? ($a.gcd / $a.gcdMax) : 0;

        for (let i = 0; i < this._slotEls.length; i++) {
            const el = this._slotEls[i];
            const abilityId = $a.slots[i];
            if (!abilityId) continue;

            const cd = $a.cooldowns[abilityId] || 0;
            const def = AbilityDB[abilityId];
            if (!def) continue;

            const overlay = el.querySelector('.ab-cd-overlay');
            const cdText  = el.querySelector('.ab-cd-text');

            if (cd > 0) {
                // CD-Overlay: Höhe proportional zur verbleibenden CD
                const pct = cd / def.cd;
                overlay.style.height = `${pct * 100}%`;
                cdText.textContent = cd >= 1 ? Math.ceil(cd) : cd.toFixed(1);
                el.classList.add('on-cd');
            } else {
                overlay.style.height = '0%';
                cdText.textContent = '';
                el.classList.remove('on-cd');
            }
        }

        // GCD-Sweep: dunkles Overlay über alle Slots wenn GCD aktiv
        this._drawGCDSweep(gcdProgress);
    }


    _drawGCDSweep($progress) {
        const ctx = this._gcdCtx;
        if (!ctx) return;
        const W = this._gcdCanvas.width;
        const H = this._gcdCanvas.height;
        ctx.clearRect(0, 0, W, H);

        if ($progress <= 0) return;

        // Dunkles Overlay proportional von rechts nach links schwindend
        ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
        ctx.fillRect(0, 0, W * $progress, H);

        // Leuchtende GCD-Linie
        ctx.strokeStyle = 'rgba(255, 220, 80, 0.9)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        const x = W * $progress;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
    }


    // Slot-Belegung zur Laufzeit ändern
    setSlotAbility($slot, $abilityId) {
        const player = this.ecs.getEntityByTag('player');
        if (player === undefined) return;
        const abilities = this.ecs.getComponent(player, 'abilities');
        if (!abilities) return;

        abilities.slots[$slot] = $abilityId;
        const el = this._slotEls[$slot];
        if (!el) return;

        const icon = el.querySelector('.ab-icon');
        const def = AbilityDB[$abilityId];
        if (def && icon) {
            icon.textContent = def.icon;
            el.title = def.tooltip;
        }
    }


    _updateMinimap($pos, $rot) {
        const ctx = this._minimapCtx;
        if (!ctx || !this._minimapImg) return;

        const S = this._minimapSize;
        const chunkSize = 1920;
        const totalWorldMeters = 52 * chunkSize; // 52 Tiles × 1920m

        // Spielerposition als 0..1 auf der Weltkarte
        const px = $pos.x / totalWorldMeters;
        const pz = $pos.z / totalWorldMeters;

        // Minimap-Zoom per Mausrad einstellbar
        const zoom = this._minimapZoom;
        const viewHalf = 1.0 / zoom;

        // Quellbereich auf der 1024px Minimap-Textur
        const srcSize = 1024;
        const srcX = Math.max(0, (px - viewHalf) * srcSize);
        const srcY = Math.max(0, (pz - viewHalf) * srcSize);
        const srcW = Math.min(srcSize - srcX, viewHalf * 2 * srcSize);

        ctx.clearRect(0, 0, S, S);

        // Kreisausschnitt
        ctx.save();
        ctx.beginPath();
        ctx.arc(S/2, S/2, S/2 - 2, 0, Math.PI * 2);
        ctx.clip();

        // Minimap-Textur zeichnen
        ctx.drawImage(this._minimapImg, srcX, srcY, srcW, srcW, 0, 0, S, S);

        // Spieler-Punkt (Mitte)
        ctx.beginPath();
        ctx.arc(S/2, S/2, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#f0d040';
        ctx.fill();
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Blickrichtungs-Dreieck
        const angle = $rot ? $rot.y - Math.PI / 2 : 0;
        ctx.save();
        ctx.translate(S/2, S/2);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(0, -12);
        ctx.lineTo(-5, -6);
        ctx.lineTo(5, -6);
        ctx.closePath();
        ctx.fillStyle = 'rgba(255, 220, 60, 0.85)';
        ctx.fill();
        ctx.restore();

        ctx.restore();

        // Rahmen
        ctx.beginPath();
        ctx.arc(S/2, S/2, S/2 - 2, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(120, 90, 40, 0.9)';
        ctx.lineWidth = 3;
        ctx.stroke();
    }


    _updateFullmap($pos, $rot) {
        const canvas = document.getElementById('fullmap-canvas');
        if (!canvas) return;
        const W = canvas.offsetWidth;
        const H = canvas.offsetHeight;
        if (canvas.width !== W || canvas.height !== H) {
            canvas.width  = W;
            canvas.height = H;
        }
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, W, H);

        const W3 = this._worldTotalSize;
        const px = ($pos.x / W3) * W;
        const py = ($pos.z / W3) * H;

        // Spieler-Dot
        ctx.save();
        ctx.beginPath();
        ctx.arc(px, py, 7, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 220, 60, 0.9)';
        ctx.fill();
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Richtungs-Dreieck
        const angle = $rot ? $rot.y : 0;
        ctx.translate(px, py);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(0, -14);
        ctx.lineTo(-5, 0);
        ctx.lineTo(5, 0);
        ctx.closePath();
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.fill();
        ctx.restore();

        // Teleport-Punkte einzeichnen
        if (window.aethelgard?.teleportPoints) {
            window.aethelgard.teleportPoints.forEach((pt, i) => {
                const tx = (pt.x / W3) * W;
                const ty = (pt.z / W3) * H;
                ctx.beginPath();
                ctx.arc(tx, ty, 5, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255,80,80,0.85)';
                ctx.fill();
                ctx.fillStyle = 'rgba(255,255,255,0.85)';
                ctx.font = '11px sans-serif';
                ctx.fillText(pt.name, tx + 8, ty + 4);
            });
        }
    }

}
