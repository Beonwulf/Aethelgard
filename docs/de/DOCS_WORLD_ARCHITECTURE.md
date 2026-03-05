---
layout: default
title: "WORLD ARCHITECTURE"
---

# 🗺️ Welt-Architektur & Chunk-System
Dieses Dokument beschreibt die geografische Struktur von Aethelgard und wie die massive Spielwelt technisch in Three.js und über den Bifrost verwaltet wird.

## 1. Dimensionen & Maßstab
Um eine epische Reise zu ermöglichen, nutzt Aethelgard ein extremes Hochformat.
* Gesamtgröße: 12.032 m (West-Ost) × 24.064 m (Nord-Süd).
* Maßstab: 1 Meter in der Spielwelt entspricht 1 Pixel auf der globalen Heightmap (1:1).
* Gesamtfläche: 288 km² (ca. 8-mal so groß wie die Kontinente in WoW Classic).


## 2. Das Chunk-System (Grid)
Die Welt ist in ein Raster aus quadratischen Einheiten unterteilt, um die Performance im Browser zu optimieren.

* `Chunk-Größe`: 128 x 128 Meter (Power of Two).
* `Raster-Dichte`:
    - `Breite`: 94 Chunks (ca.)
    - `Höhe`: 188 Chunks (ca.)
* **Vorteile** der 128er Größe:
    - Optimale Speichernutzung auf der GPU.
    - Schnellere Berechnungen von LOD (Level of Detail).
    - Sauberes Streaming: Der Bifrost sendet Daten paketweise pro Chunk-ID.


## 3. Dynamisches Laden (LOD-Strategie)
Der `ChunkManager` im Client steuert, welche Bereiche gerendert werden.
|   Zone     |   Radius (m)  |   Detailgrad  |   Inhalt                                                  |
|------------|---------------|---------------|-----------------------------------------------------------|
| Zentrum    | 0 - 256       | Hoch          | Volle Geometrie, Kollision, NPCs, High-Res Texturen.      |
| Nahbereich | 256 - 768     | Mittel        | Vereinfachtes Terrain, Instanced Vegetation (Bäume/Gras). |
| Horizont   | > 768         | Niedrig       | Nur die Silhouette, Nebel-Effekte, keine NPCs.            |


## 4. Koordinaten-Berechnung
Um eine Position in einen Chunk zu übersetzen, wird folgende Logik verwendet:
```javascript
// Welt-Koordinate zu Chunk-ID
const chunkX = Math.floor(player.x / 128);
const chunkZ = Math.floor(player.z / 128);
const currentChunkID = `chunk_${chunkX}_${chunkZ}`;
```


## 5. Geografische Zonen (Lore-Mapping)
Die 24 km Länge werden klimatisch genutzt, um die 17 Kapitel der Lore abzubilden:
1. Süden (0-6km): Aride Einöde & Nidhoggs Korruption.
2. Mitte (6-14km): Das goldene Kaiserreich (Solan & Valeria).
3. Übergang (14-18km): Die wilden Wälder von Yldra.
4. Norden (18-24km): Die ewigen Frostlande von Mornir.