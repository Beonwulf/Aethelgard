# ⚔️ Aethelgard - MMORPG Core
Ein modulares Backend-System für ein MMORPG, das eine tiefe Lore mit einem komplexen RPG-Regelwerk verbindet. Basierend auf Node.js, PostgreSQL und Socket.io.


# 🛠️ Tech-Stack & Architektur (Update)
* Networking & Middleware: Bifrost (Eigenentwicklung) – Regelt die Kommunikation zwischen Client und Server effizienter als Standard-Frameworks.
* Kommunikation: Socket.io & WebSockets für Low-Latency MMORPG-Echtzeit-Interaktionen.
* Datenbank: PostgreSQL & Knex.js (Query Builder) für ein robustes Persistenz-Layer.
* Sicherheit: JWT & Bcrypt für verschlüsselte Authentifizierung.


# 🏰 Aethelgard - Project Mallorca

## 📌 Grundgerüst (Erledigt)
- [x] Projektstruktur & Umbenennung (Aethelgard)
- [x] ThreeEngine Basis (Renderer, Camera, OrbitControls)
- [x] Environment (Sonne, Licht, Nebel)
- [x] WorldManager (Chunk-Loading & 16-Bit Heightmaps)
- [x] Player Spawn System
- [x] Basis-Wasser (Ozean-Plane)


## 🛠 Offene Optimierungen (Später)
- [ ] **Terrain:** Normalen-Glättung im Shader (Treppen-Schatten entfernen)
- [ ] **Wasser:** Animation (Scrolling Noise), Specular Glanz & Schaum
- [ ] **Wasser:** Soft-Edges / Transparenz am Ufer
- [ ] **Himmel:** Atmospheric Scattering (Realistischer Horizont)
- [ ] **Performance:** AssetManager & Loading-Screen


## 🚀 Nächste Meilensteine (Grundgerüst erweitern)
1. **ESC:** ESC-System, erstellen und einbinden. (mit Trigger von Socket)
2. **ThirdPersonCamera:** Kamera die auf den Spieler schaut
2. **Player-Klasse:** Kamera-Steuerung, die auf dem Boden "läuft" (Raycasting).
3. **Kollision:** Verhindern, dass man unter das Wasser oder durch Berge fliegt.
4. **Interaktion:** Erste Objekte (Bäume/Häuser) auf dem Terrain platzieren.

