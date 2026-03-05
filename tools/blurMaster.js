// Liest den fertigen 16-bit RAW und erzeugt ein geblurtes Master-PNG.
// Schneller als worldStitcher neu laufen zu lassen!
import sharp from 'sharp';
import fs from 'fs';

const SIZE = 26624;
const RAW_FILE = 'tools/source/Aethelgard_Final_16bit.raw';
const OUT_PNG  = 'tools/source/Aethelgard_Final_Perfect.png';
const BLUR     = 40.0; // Weniger Blur nötig dank bikubischer Interpolation im Stitcher

console.log('📂 Lese RAW...');
const raw = fs.readFileSync(RAW_FILE);
const buffer = new Uint16Array(raw.buffer, raw.byteOffset, SIZE * SIZE);

console.log(`🌀 Blur ${BLUR} auf ${SIZE}×${SIZE}...`);
await sharp(Uint16Array.from(buffer), {
    raw: { width: SIZE, height: SIZE, channels: 1, depth: 'ushort' },
    limitInputPixels: false
})
.blur(BLUR)
.toColourspace('grey16')   // Blur konvertiert intern zu sRGB – hier zurück zu 16-bit Graustufen
.png({ bitdepth: 16, compressionLevel: 6 })
.toFile(OUT_PNG);

await sharp(Uint16Array.from(buffer), {
        raw: { width: SIZE, height: SIZE, channels: 1 },
        limitInputPixels: false
})
.blur(BLUR)
.jpeg({ quality: 85 })
.toFile('tools/source/Aethelgard_Final_Perfect.jpg');


console.log(`✅ ${OUT_PNG} gespeichert – jetzt worldSlicer laufen lassen!`);
