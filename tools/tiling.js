import fs from 'fs';

const MASTER_RAW   = 'tools/source/Aethelgard_Blender_16bit.raw';
const FULL_SIZE    = 26624;
const TILE_SIZE    = 512;
const OUTPUT_DIR   = './client/assets/world/heightmaps/blender/';

async function generateTiles() {
    if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

    console.log('Lade Master-Buffer...');
    const data  = fs.readFileSync(MASTER_RAW);
    const raw16 = new Uint16Array(data.buffer, data.byteOffset, data.length / 2);

    const cols = Math.ceil(FULL_SIZE / TILE_SIZE);
    const rows = Math.ceil(FULL_SIZE / TILE_SIZE);

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const tile = new Uint16Array(TILE_SIZE * TILE_SIZE);
            for (let ty = 0; ty < TILE_SIZE; ty++) {
                for (let tx = 0; tx < TILE_SIZE; tx++) {
                    const sx = Math.min(x * TILE_SIZE + tx, FULL_SIZE - 1);
                    const sy = Math.min(y * TILE_SIZE + ty, FULL_SIZE - 1);
                    tile[ty * TILE_SIZE + tx] = raw16[sy * FULL_SIZE + sx];
                }
            }
            fs.writeFileSync(`${OUTPUT_DIR}tile_${y}_${x}.bin`, Buffer.from(tile.buffer));
        }
        if (y % 5 === 0) console.log(`Reihe ${y}/${rows - 1}...`);
    }
    console.log('Fertig! 512x512 Tiles als .bin gespeichert.');
}

generateTiles().catch(console.error);
