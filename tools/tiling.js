import fs from 'fs';

const MASTER_RAW   = 'tools/source/Aethelgard_Blender_16bit.raw';
const FULL_SIZE    = 26624;
const TILE_SIZE    = 512;
const OUTPUT_DIR   = './client/assets/world/heightmaps/blender/';

async function generateTiles() {
    if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

    console.log('💾 Lade Master-Buffer...');
    const data  = fs.readFileSync(MASTER_RAW);
    const raw16 = new Uint16Array(data.buffer, data.byteOffset, data.length / 2);

    const cols = Math.ceil(FULL_SIZE / TILE_SIZE);
    const rows = Math.ceil(FULL_SIZE / TILE_SIZE);

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const tileW  = TILE_SIZE + 1;   // +1 Overlap für seamless Kanten
            const tileH  = TILE_SIZE + 1;
            const tile   = new Uint16Array(tileW * tileH);

            for (let ty = 0; ty < tileH; ty++) {
                for (let tx = 0; tx < tileW; tx++) {
                    const sx = Math.min(x * TILE_SIZE + tx, FULL_SIZE - 1);
                    const sy = Math.min(y * TILE_SIZE + ty, FULL_SIZE - 1);
                    tile[ty * tileW + tx] = raw16[sy * FULL_SIZE + sx];
                }
            }

            // Direkt als Raw-Binary (Uint16, Little-Endian) speichern
            // Kein PNG-Encoding, kein Endianness-/Channel-Problem
            fs.writeFileSync(`${OUTPUT_DIR}tile_${y}_${x}.bin`, Buffer.from(tile.buffer));
        }
        if (y % 5 === 0) console.log(`✅ Reihe ${y}/${rows - 1} fertig...`);
    }
    console.log('🎉 Fertig! Alle Tiles als .bin gespeichert.');
}

generateTiles().catch(console.error);
