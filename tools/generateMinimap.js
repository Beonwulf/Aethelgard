// Generiert eine kleine Minimap-Textur aus dem Master-RAW.
// Einmalig ausführen: node tools/generateMinimap.js
import sharp from 'sharp';
import fs from 'fs';

const RAW_FILE  = 'Aethelgard_Final_16bit.raw';
const OUT_FILE  = './client/assets/world/minimap.jpg';
const SIZE      = 26624;
const OUT_SIZE  = 1024;

console.log('📂 Lese RAW...');
const raw = fs.readFileSync(RAW_FILE);
const buffer = new Uint16Array(raw.buffer, raw.byteOffset, SIZE * SIZE);

console.log(`🗺️  Erzeuge Minimap ${OUT_SIZE}×${OUT_SIZE}...`);
await sharp(Uint16Array.from(buffer), {
    raw: { width: SIZE, height: SIZE, channels: 1 },
    limitInputPixels: false
})
.resize(OUT_SIZE, OUT_SIZE, { kernel: 'lanczos3' })
.normalise()          // Kontrastoptimierung: schwächste→0, stärkste→255
.jpeg({ quality: 85 })
.toFile(OUT_FILE);

console.log(`✅ ${OUT_FILE} gespeichert!`);
