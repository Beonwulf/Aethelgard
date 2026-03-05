import sharp from 'sharp';
import fs from 'fs';

const MASTER_RAW = 'tools/source/Aethelgard_Final_16bit.raw';
const FULL_SIZE = 26624;
const TILE_SIZE = 512; 
const OUTPUT_DIR = './client/assets/world/heightmaps/mallorca/';

async function generateTiles() {
    if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

    console.log("💾 Lade Master-Buffer in den Arbeitsspeicher...");
    const data = fs.readFileSync(MASTER_RAW);
    // Wir interpretieren die Datei direkt als 16-Bit Array
    const raw16 = new Uint16Array(data.buffer, data.byteOffset, data.length / 2);

    const cols = Math.ceil(FULL_SIZE / TILE_SIZE);
    const rows = Math.ceil(FULL_SIZE / TILE_SIZE);

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            // Wir erstellen manuell einen kleinen Buffer für die 512x512 Kachel (+1 Overlap)
            const currentTileSize = TILE_SIZE + 1;
            const tileBuffer = new Uint16Array(currentTileSize * currentTileSize);

            for (let ty = 0; ty < currentTileSize; ty++) {
                for (let tx = 0; tx < currentTileSize; tx++) {
                    const sourceX = x * TILE_SIZE + tx;
                    const sourceY = y * TILE_SIZE + ty;

                    if (sourceX < FULL_SIZE && sourceY < FULL_SIZE) {
                        tileBuffer[ty * currentTileSize + tx] = raw16[sourceY * FULL_SIZE + sourceX];
                    }
                }
            }

            // Jetzt geben wir Sharp nur noch die fertige, kleine Kachel
            await sharp(Buffer.from(tileBuffer.buffer), {
                raw: { 
                    width: currentTileSize, 
                    height: currentTileSize, 
                    channels: 1, 
                    depth: 'ushort',
                    endian: 'little'
                }
            })
            //.blur(0.5) // Ein minimaler Blur unter 1px wirkt Wunder für die Shader-Normalen
            .png({ bitdepth: 16, compressionLevel: 9 })
            .toFile(`${OUTPUT_DIR}tile_${y}_${x}.png`);
        }
        if (y % 5 === 0) console.log(`✅ Reihe ${y} fertig...`);
    }
    console.log("🎉 Quadrate besiegt! Alle Tiles sind nun glatt und sauber.");
}

generateTiles().catch(console.error);