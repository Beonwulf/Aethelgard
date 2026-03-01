# 🗺️ World Architecture & Chunk System
This document describes the geographical structure of Aethelgard and how the massive game world is technically managed in Three.js and via Bifrost.

## 1. Dimensions & Scale
To enable an epic journey, Aethelgard uses an extreme portrait format.
* Total size: 12,032 m (West-East) × 24,064 m (North-South).
* Scale: 1 meter in the game world equals 1 pixel on the global heightmap (1:1).
* Total area: 288 km² (approx. 8 times the size of the continents in WoW Classic).

## 2. The Chunk System (Grid)
The world is divided into a grid of square units to optimize performance in the browser.

* `Chunk Size`: 128 x 128 meters (Power of Two).
* `Grid Density`:
    - `Width`: 94 Chunks (approx.)
    - `Height`: 188 Chunks (approx.)
* **Advantages** of the 128 size:
    - Optimal memory usage on the GPU.
    - Faster Level of Detail (LOD) calculations.
    - Clean streaming: Bifrost sends data in packets per Chunk ID.

## 3. Dynamic Loading (LOD Strategy)
The `ChunkManager` in the client controls which areas are rendered.
| Zone | Radius (m) | Detail Level | Content |
|------|------------|--------------|---------|
| Center | 0 - 256 | High | Full geometry, collision, NPCs, high-res textures. |
| Mid-range | 256 - 768 | Medium | Simplified terrain, instanced vegetation (trees/grass). |
| Horizon | > 768 | Low | Silhouette only, fog effects, no NPCs. |

## 4. Coordinate Calculation
To translate a position into a chunk, the following logic is used:
```javascript
// World coordinate to Chunk ID
const chunkX = Math.floor(player.x / 128);
const chunkZ = Math.floor(player.z / 128);
const currentChunkID = `chunk_${chunkX}_${chunkZ}`;
```

## 5. Geographical Zones (Lore Mapping)
The 24 km length is used climatically to depict the 17 chapters of the lore:
1. South (0-6km): Arid Wasteland & Nidhogg's Corruption.
2. Center (6-14km): The Golden Empire (Solan & Valeria).
3. Transition (14-18km): The Wild Forests of Yldra.
4. North (18-24km): The Eternal Frostlands of Mornir.