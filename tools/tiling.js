import sharp from 'sharp';
import fs from 'fs';

const MASTER_RAW = 'tools/source/Aethelgard_Blender_16bit.raw';
const FULL_SIZE = 26624;
const TILE_SIZE = 512; 
const OUTPUT_DIR = './client/assets/world/heightmaps/blender/';

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

            // Encode 16-bit als 8-bit RGBA: R=high byte, G=low byte
            // Browser-Canvas konvertiert 16-bit Gray zu R=G=B=high_byte (verliert low byte!)
            // → deshalb explizit als RGBA speichern damit HeightmapDecoder R+G/255 korrekt liest
            const rgbaBuffer = new Uint8Array(currentTileSize * currentTileSize * 4);
            for (let i = 0; i < currentTileSize * currentTileSize; i++) {
                const v = tileBuffer[i];
                rgbaBuffer[i * 4 + 0] = (v >> 8) & 0xFF;  // R = high byte
                rgbaBuffer[i * 4 + 1] = v & 0xFF;           // G = low byte
                rgbaBuffer[i * 4 + 2] = 0;
                rgbaBuffer[i * 4 + 3] = 255;
            }
            await sharp(Buffer.from(rgbaBuffer.buffer), {
                raw: { width: currentTileSize, height: currentTileSize, channels: 4, depth: 'uchar' }
            })
            .png({ compressionLevel: 6 })
            .toFile(`${OUTPUT_DIR}tile_${y}_${x}.png`);
        }
        if (y % 5 === 0) console.log(`✅ Reihe ${y} fertig...`);
    }
    console.log("🎉 Quadrate besiegt! Alle Tiles sind nun glatt und sauber.");
}

generateTiles().catch(console.error);