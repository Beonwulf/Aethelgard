# 🗺️ Aethelgard World System Documentation

## 1. Technical Foundation
- **Data Source:** PNOA LIDAR (MDT05) – Mallorca
- **Master Resolution:** 26,624 x 26,624 Pixels (1:1 Representation)
- **Color Depth:** 16-Bit (Embedded in 48-Bit RGB PNG)
- **Height Scaling:** 1 unit in 16-Bit = 1/40 meters (Factor 40).
  - *Max Height:* ~1,445m (Tramuntana) equals a value of ~57,800 in 16-Bit space.

## 2. Tiling & Streaming
- **Tile Size:** 512 x 512 Pixels.
- **Overlap:** 1 Pixel (Tiles are factually 513x513) to avoid "Gaps" (seams).
- **Coordinate System:** - Tiles are saved as `tile_{y}_{x}.png`.
  - Origin (0,0) is the North-West corner of the map.

## 3. Client Implementation (Three.js)
- **Geometry:** `PlaneGeometry(512, 512, 256, 256)`
- **Material:** Custom ShaderMaterial uses the `displacementMap`.
- **Streaming Logic:** The `WorldManager` loads tiles in a radius of `n` around the player.
- **Removal:** Tiles outside the field of view are deleted from memory via `.dispose()`.

## 4. Known Offsets & Transformations
- **EPSG-Code:** 25831 (UTM Zone 31N)
- **Center (Mallorca):** [Insert X, Y Coordinates here]

## 5. Lore & Landmarks
- **Initial Spawn:** "Coast of Arrival" (East Coast)
  - Tile Coordinate: `tile_20_45.png`
  - World Position: `x: 23040, z: 10240` (Example values based on 512px Chunks)
- **Capital:** Aethelhafen (Southwest)
  - Focus point for performance tests (high building density).

| Location | Tile Coordinates |
|----------|------------------|
| Start point: Goldstrand | `tile_20_45.png` (Our Spawn Area) | 
| Aethelhafen | `tile_32_10.png` |
| Frostfang Peak | `tile_05_15.png` |
| Guardian Cape | `tile_02_38.png` |