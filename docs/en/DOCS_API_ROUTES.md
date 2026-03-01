# 🌉 Bifrost API Routes (Aethelgard)

This document describes the dynamic router architecture and the available endpoints of the Bifrost server.

## 1. Dynamic Routing (`Router.js`)
The Bifrost server no longer uses hardcoded routes in `index.js`. Instead, the `Router.js` class automatically reads all `.js` files in the `/server/http/routes/` directory upon server startup and binds them to the server.
*Advantage:* New features (e.g., guilds, inventory) only require a new file in this directory.

## 2. Available Bridges (Routes)

### 🛡️ Authentication (`/routes/auth.js`)
These routes do *not* require a JWT token.
* `POST /api/register`: Creates a new account (encrypted via bcrypt).
* `POST /api/login`: Verifies credentials and returns a long-lived JWT token (2400h).
* `POST /api/auth/validate`: Checks if a token is still valid and if the user still exists in the database (Security after DB resets).

### ⚔️ Hero Management (`/routes/characters.js`)
*Note: All these routes are protected by the `createCharacterRune` (Middleware) and require a valid JWT token in the Authorization header.*
* `GET /api/characters`: Loads an overview of all heroes for the current player.
* `POST /api/characters/create`: Forges a new hero. Receives culture, profession, attributes, skill slugs, and the woven **biography**. (Transaction safe).
* `DELETE /api/characters/remove`: Sends a hero to Valhalla (deletes them).
* `PATCH /api/characters/add-ap`: Adds adventure points to a specific hero.

### 📜 World Data (`/routes/game.js`)
* `GET /api/game/master-data`: Delivers all master data of the world to the frontend (cultures, professions, skills, and the **Lifepath/Fate events**).
