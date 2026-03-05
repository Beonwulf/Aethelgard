---
layout: default
title: "PROJECTSTRUCTURE"
---

# 📂 Projektstruktur von Aethelgard

Dieses Dokument beschreibt den aktuellen Aufbau des Projekts (Backend, Frontend, Tools und Daten) sowie den Plan zur Bereinigung von Fremdcode.

## 🌟 Hauptverzeichnis (Root)
* `App.js` - Die Kern-Klasse, die den Bifröst-Server, Sockets und die Datenbank (PostgreSQL) hochfährt.
* `index.js` - Der Haupteinstiegspunkt für den Node.js Server.
* `server-manager.py` (oder `.pyw`) - Das in Python/Tkinter geschriebene GUI-Tool zum Starten/Stoppen des Servers.
* `migrate.js` - Baut das Datenbankschema (PostgreSQL) auf und füllt es mit Seed-Daten (Lore).
* `alter-db.js` / `check-db.js` / `cleanup-db.js` - Skripte für Datenbank-Migrationen und Wartung.

## 🎮 Frontend (`/client`)
Das Frontend ist komplett "Vanilla", das heißt es nutzt keinen Bundler (wie Webpack/Vite) und keine Frameworks (wie React/Vue). Das UI wird aus JSON-Dateien generiert (`cE.js`), und das Spiel läuft über `Three.js` (als ES-Modules geladen).

* `/assets/css/` - Vanilla CSS (z.B. `style.css` für das UI, Tooltips, Frosted Glass Effekte).
* `/assets/images/` - Hintergrundbilder für Login/Charakterauswahl.
* `/assets/js/` - Die Kern-Logik des Clients.
  * `/controllers/` - UI-Controller (`BaseController`, `LoginController`, `CharSelectController`, `CharCreatorController`).
  * `/services/` - Kapselt die Server-Verbindung (`AuthService`, `ApiService`).
  * `/utils/` - Hilfsscripte wie `cE.js` (DOM-Erstellung) und `Lang.js` (I18n Übersetzungen).
  * `/game/` - **Die 3D-Engine & Welt:**
    * `main.js` - Startet das Spiel (`Aethelgard`).
    * `Aethelgard.js` - Die Haupt-Instanz der 3D-Welt.
    * `Environment.js` / `WaterManager.js` / `WorldManager.js` - Systeme für Himmel, Wasser und Terrain (Chunks).
    * `ShaderLoader.js` / `TerrainShader.js` - Ladelogik für WebGL-Shader.
    * `/engine/` - Kern der Engine (ECS, `ThreeEngine.js`, `InputManager.js`, `ThirdPersonCameraSystem.js`).
* `/assets/lang/` - JSON-Sprachdateien (z.B. `/de/char-creator.json`) für das `Lang.js` System.
* `/assets/shaders/` - Die GLSL WebGL-Shader (Terrain, Wasser).
* `/assets/views/` - Die JSON-Dateien, aus denen das UI gerendert wird (z.B. `char-creator.json`, `char-select.json`).

*(Hinweis zur Bereinigung: Dateien wie `client/main.js`, `client/src/`, `client/shared/` oder `client/resources/` sind Fremdcode, der nur zur Inspiration diente, und können gelöscht werden.)*

## ⚙️ Backend (`/server`)
Das Backend basiert auf **Node.js** und nutzt ein selbst geschriebenes, leichtgewichtiges HTTP/Routing-Framework namens **Bifröst**.

* `/http/` - Der Bifröst-Kern.
  * `Bifrost.js` / `BifrostStatic.js` - Die Server-Klasse, die HTTP-Requests verarbeitet und Socket.io einbindet.
  * `Router.js` - Lädt dynamisch alle API-Routen.
  * `/routes/` - Die API-Endpunkte (z.B. `game.js` für Namens-Listen, `characters.js` für Helden).
  * `/runes/` - Middleware (z.B. `createAuthRune.js` zur Validierung des JWT-Tokens).
  * `/socket/` - Socket.io Middleware (z.B. `socketAuthMiddleware.js`).
* `/world/` - Server-seitige MMO-Spiellogik (z.B. `WorldServer.js` zur Synchronisierung der Spieler-Positionen).

## 🗄️ Daten & Lore (`/data`)
* `/aethelgard_tiles/` - Die zerschnittenen 16-Bit-Heightmap-Kacheln für den `WorldManager.js`.
* `/mechanics/` - RPG-Regelwerke, z.B. das Lifepath-System (`lifepath.js`).
* `/migrate/` - Die JS-Dateien (Arrays), die beim Ausführen von `migrate.js` in die Datenbank geladen werden (z.B. `cultures.js`, `itemsLegendary.js`, `pantheon.js`).
* `/bifrost/` - Hier generiert der Server seine lokalen SSL-Zertifikate (`key.pem`, `cert.pem`), um HTTPS anzubieten.

## 🛠️ Tools (`/tools`)
Kleine Skripte zur Verarbeitung von Assets.
* `worldSlicer.js` / `tiling.js` - Schneiden riesige Master-Heightmaps in kleine Chunks (Tiles) für die Engine.
* `smoothHeightmaps.js` - Glättet harte Kanten in generierten Höhenkarten.
* `generateWorld.js` - Prozedurale Generierungs-Skripte.

## 📚 Dokumentation (`/docs`)
* `DOCS_LORE.md` - Götter, Kulturen, Berufe, Weltengeschichte und RPG-Regeln (Taints, Gunst, Lifepath).
* `DOCS_API_ROUTES.md` - Beschreibung der Backend-Schnittstellen.
* `DOCS_DATABASE_SCHEMA.md` - Aufbau der PostgreSQL-Datenbank.

---

### 🧹 Aufräum-Liste (Fremdcode entfernen)
Damit wir das Projekt bald für den ersten sauberen Git-Commit (`git init`) vorbereiten können, sollten folgende "Fremdcode"-Inspirationsverzeichnisse im `client`-Ordner entfernt werden:
1. `client/main.js` (Einstiegspunkt des Fremdcodes)
2. `client/src/` (Alte Fremd-Engine-Klassen, Terrain-Builder etc.)
3. `client/shared/`
4. `client/resources/`
5. Veraltete HTML-Dateien wie `client/test.html` oder alte `client/game.html` (falls diese nicht von uns geschrieben wurden, wir nutzen primär `index.html`).