# 📂 Project Structure of Aethelgard

This document describes the current layout of the project (Backend, Frontend, Tools, and Data) as well as the plan for cleaning up third-party code.

## 🌟 Main Directory (Root)
* `App.js` - The core class that boots up the Bifrost server, WebSockets, and the database (PostgreSQL).
* `index.js` - The main entry point for the Node.js server.
* `server-manager.py` (or `.pyw`) - The Python/Tkinter GUI tool for starting/stopping the server.
* `migrate.js` - Builds the database schema (PostgreSQL) and populates it with seed data (Lore).
* `alter-db.js` / `check-db.js` / `cleanup-db.js` - Scripts for database migrations and maintenance.

## 🎮 Frontend (`/client`)
The frontend is completely "Vanilla", meaning it uses no bundler (like Webpack/Vite) and no frameworks (like React/Vue). The UI is generated from JSON files (`cE.js`), and the game runs via `Three.js` (loaded as ES Modules).

* `/assets/css/` - Vanilla CSS (e.g., `style.css` for UI, tooltips, frosted glass effects).
* `/assets/images/` - Background images for login/character selection.
* `/assets/js/` - The core logic of the client.
  * `/controllers/` - UI controllers (`BaseController`, `LoginController`, `CharSelectController`, `CharCreatorController`).
  * `/services/` - Encapsulates server connections (`AuthService`, `ApiService`).
  * `/utils/` - Helper scripts like `cE.js` (DOM creation) and `Lang.js` (I18n translations).
  * `/game/` - **The 3D Engine & World:**
    * `main.js` - Starts the game (`Aethelgard`).
    * `Aethelgard.js` - The main instance of the 3D world.
    * `Environment.js` / `WaterManager.js` / `WorldManager.js` - Systems for sky, water, and terrain (chunks).
    * `ShaderLoader.js` / `TerrainShader.js` - Loading logic for WebGL shaders.
    * `/engine/` - Core of the engine (ECS, `ThreeEngine.js`, `InputManager.js`, `ThirdPersonCameraSystem.js`).
* `/assets/lang/` - JSON language files (e.g., `/de/char-creator.json`) for the `Lang.js` system.
* `/assets/shaders/` - GLSL WebGL shaders (terrain, water).
* `/assets/views/` - JSON files used to render the UI (e.g., `char-creator.json`, `char-select.json`).

*(Note on cleanup: Files like `client/main.js`, `client/src/`, `client/shared/`, or `client/resources/` are third-party code that served only as inspiration and have been deleted.)*

## ⚙️ Backend (`/server`)
The backend is based on **Node.js** and uses a custom, lightweight HTTP/Routing framework named **Bifrost**.

* `/http/` - The Bifrost core.
  * `Bifrost.js` / `BifrostStatic.js` - The server class that handles HTTP requests and integrates Socket.io.
  * `Router.js` - Dynamically loads all API routes.
  * `/routes/` - The API endpoints (e.g., `game.js` for name lists, `characters.js` for heroes).
  * `/runes/` - Middleware (e.g., `createAuthRune.js` to validate the JWT token).
  * `/socket/` - Socket.io middleware (e.g., `socketAuthMiddleware.js`).
* `/world/` - Server-side MMO game logic (e.g., `WorldServer.js` for synchronizing player positions).

## 🗄️ Data & Lore (`/data`)
* `/aethelgard_tiles/` - Sliced 16-bit heightmap tiles for the `WorldManager.js`.
* `/mechanics/` - RPG rule systems, e.g., the lifepath system (`lifepath.js`).
* `/migrate/` - JS files (arrays) loaded into the database when executing `migrate.js` (e.g., `cultures.js`, `itemsLegendary.js`, `pantheon.js`).
* `/bifrost/` - Where the server generates its local SSL certificates (`key.pem`, `cert.pem`) to provide HTTPS.

## 🛠️ Tools (`/tools`)
Small scripts for processing assets.
* `worldSlicer.js` / `tiling.js` - Slice massive master heightmaps into small chunks (tiles) for the engine.
* `smoothHeightmaps.js` - Smoothes hard edges in generated heightmaps.
* `generateWorld.js` - Procedural generation scripts.

## 📚 Documentation (`/docs`)
* `DOCS_LORE.md` - Gods, cultures, professions, world history, and RPG rules (Taints, Favor, Lifepath).
* `DOCS_API_ROUTES.md` - Description of backend interfaces.
* `DOCS_DATABASE_SCHEMA.md` - Structure of the PostgreSQL database.
