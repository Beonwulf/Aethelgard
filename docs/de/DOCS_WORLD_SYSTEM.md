# 🗺️ Aethelgard World System Documentation

## 1. Technisches Fundament
- **Datenquelle:** PNOA LIDAR (MDT05) – Mallorca
- **Master-Auflösung:** 26.624 x 26.624 Pixel (1:1 Repräsentation)
- **Farbtiefe:** 16-Bit (Eingebettet in 48-Bit RGB PNG)
- **Höhenskalierung:** 1 Einheit in 16-Bit = 1/40 Meter (Faktor 40).
  - *Max Höhe:* ~1.445m (Tramuntana) entspricht einem Wert von ~57.800 im 16-Bit Raum.

## 2. Tiling & Streaming
- **Tile-Größe:** 512 x 512 Pixel.
- **Overlap:** 1 Pixel (Kacheln sind faktisch 513x513), um "Gaps" (Nähte) zu vermeiden.
- **Koordinatensystem:** - Tiles werden als `tile_{y}_{x}.png` gespeichert.
  - Ursprung (0,0) ist die Nord-West-Ecke der Map.

## 3. Client Implementation (Three.js)
- **Geometrie:** `PlaneGeometry(512, 512, 256, 256)`
- **Material:** Custom ShaderMaterial nutzt die `displacementMap`.
- **Streaming-Logik:** Der `WorldManager` lädt Tiles in einem Radius von `n` um den Spieler.
- **Entfernung:** Tiles außerhalb des Sichtfeldes werden per `.dispose()` aus dem Speicher gelöscht.

## 4. Bekannte Offsets & Transformationen
- **EPSG-Code:** 25831 (UTM Zone 31N)
- **Zentrum (Mallorca):** [X, Y Koordinaten hier einfügen]

## 5. Lore & Landmarks
- **Initial Spawn:** "Küste der Ankunft" (Ostküste)
  - Tile-Koordinate: `tile_20_45.png`
  - Welt-Position: `x: 23040, z: 10240` (Beispielwerte basierend auf 512px Chunks)
- **Hauptstadt:** Aethelhafen (Südwesten)
  - Fokuspunkt für Performance-Tests (hohe Gebäude-Dichte).

|       Ort             |	  Tile-Koordinaten                              |
|-----------------------|-------------------------------------------------|
| Startpunkt: Goldstrand|	tile_20_45.png (Unsere Spawn-Area)              | 
| Aethelhafen           |	tile_32_10.png                                  |
| Frostfang-Gipfel      | tile_05_15.png                                  |
| Wächter-Kap           | tile_02_38.png                                  |