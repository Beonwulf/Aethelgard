/AETHELGARD
├── /client
│   ├── /assets
│   │   ├── /shaders
│   │   │    ├── terrain.vert.glsl
│   │   │    └── terrain.frag.glsl
│   │   ├── /world
│   │   │   └── /heightmaps             # Hier liegen die 512px PNG-Tiles
│   │   │       ├── metadata.json
│   │   │       ├── tile_0_0.png
│   │   │       └── ...
│   │   └── /textures                   # Gras, Fels, Sand Texturen
│   └── /js
│       └── /game                       # Hier lebt die Spielmechanik
│           ├── main.js                 # Einstiegspunkt (Init Scene)
│           ├── WorldManager.js         # Lädt Tiles dynamisch nach
│           ├── Player.js               # Steuerung & Kamera
│           └── ShaderLoader.js         # Laden der Shaders
├── /tools                              # NodeJS-Skripte (Stitcher, Slicer, etc.)