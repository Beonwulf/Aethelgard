# ⚔️ Aethelgard - MMORPG Core
A modular backend system for an MMORPG that combines deep lore with a complex RPG rulebook. Based on Node.js, PostgreSQL, and Socket.io.


# 🛠️ Tech-Stack & Architecture (Update)
* Networking & Middleware: Bifrost (In-house development) – Manages communication between client and server more efficiently than standard frameworks.
* Communication: Socket.io & WebSockets for low-latency MMORPG real-time interactions.
* Database: PostgreSQL & Knex.js (Query Builder) for a robust persistence layer.
* Security: JWT & Bcrypt for encrypted authentication.


# 🏰 Aethelgard - Project Mallorca

## 📌 Framework (Completed)
- [x] Project structure & renaming (Aethelgard)
- [x] ThreeEngine base (Renderer, Camera, OrbitControls)
- [x] Environment (Sun, light, fog)
- [x] WorldManager (Chunk loading & 16-bit heightmaps)
- [x] Player Spawn System
- [x] Basic water (Ocean plane)


## 🛠 Open Optimizations (Later)
- [ ] **Terrain:** Normal smoothing in the shader (remove staircase shadows)
- [ ] **Water:** Animation (scrolling noise), specular glint & foam
- [ ] **Water:** Soft edges / transparency at the shore
- [ ] **Sky:** Atmospheric scattering (realistic horizon)
- [ ] **Performance:** AssetManager & Loading Screen


## 🚀 Next Milestones (Expanding the framework)
1. **ESC:** ECS system, create and integrate (with socket trigger).
2. **ThirdPersonCamera:** Camera that looks at the player.
2. **Player Class:** Camera control that "walks" on the ground (raycasting).
3. **Collision:** Prevent flying under the water or through mountains.
4. **Interaction:** Place first objects (trees/houses) on the terrain.
