import { fromFile } from 'geotiff';
import sharp from 'sharp';
import fs from 'fs';

const TARGET_SIZE = 26624;
const TILE_FOLDER = './tools/tiles/'; 
const OUTPUT_RAW = 'Aethelgard_Final_16bit.raw';

async function buildAethelgard() {
    const files = fs.readdirSync(TILE_FOLDER).filter(f => f.endsWith('.tif'));
    const tiles = [];
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;

    console.log("🔍 Analysiere Kacheln (Single-Zone Modus)...");
    for (const file of files) {
        const tiff = await fromFile(`${TILE_FOLDER}${file}`);
        const image = await tiff.getImage();
        const bbox = [...image.getBoundingBox()]; 

        minX = Math.min(minX, bbox[0]);
        maxX = Math.max(maxX, bbox[2]);
        minY = Math.min(minY, bbox[1]);
        maxY = Math.max(maxY, bbox[3]);

        tiles.push({ file, bbox, image });
    }

    const worldWidth = maxX - minX;
    const worldHeight = maxY - minY;
    // 1.05 für einen kleinen Sicherheitsrand, damit die Küste nicht am Pixelrand klebt
    const maxSpan = Math.max(worldWidth, worldHeight) * 1.05; 
    const centerX = minX + worldWidth / 2;
    const centerY = minY + worldHeight / 2;

    const buffer = new Uint16Array(TARGET_SIZE * TARGET_SIZE);

    for (const tile of tiles) {
        console.log(`🧩 Verarbeite: ${tile.file}`);
        const data = await tile.image.readRasters();
        const raster = data[0]; // Das Float32Array der Quelldaten
        const tw = tile.image.getWidth();
        const th = tile.image.getHeight();

        // Wir erhöhen die Abtastrate: Wir loopen jetzt über die ZIEL-Pixel im Bereich der Kachel
        // Das ist mathematisch sauberer als Splatting.
        const xStart = Math.floor((TARGET_SIZE / 2) + ((tile.bbox[0] - centerX) / maxSpan) * TARGET_SIZE);
        const xEnd = Math.ceil((TARGET_SIZE / 2) + ((tile.bbox[2] - centerX) / maxSpan) * TARGET_SIZE);
        const yEnd = Math.floor((TARGET_SIZE / 2) - ((tile.bbox[1] - centerY) / maxSpan) * TARGET_SIZE);
        const yStart = Math.ceil((TARGET_SIZE / 2) - ((tile.bbox[3] - centerY) / maxSpan) * TARGET_SIZE);

        // Wir berechnen die Ziel-Koordinaten
        for (let py = yStart; py <= yEnd; py++) {
            for (let px = xStart; px <= xEnd; px++) {
                // 1. Umrechnung von Ziel-Pixel zu Geo-Koordinate
                const geoX = centerX + ((px - TARGET_SIZE / 2) / TARGET_SIZE) * maxSpan;
                const geoY = centerY - ((py - TARGET_SIZE / 2) / TARGET_SIZE) * maxSpan;

                // 2. Umrechnung in lokale TIF-Pixel (Fließkomma!)
                const localX = ((geoX - tile.bbox[0]) / (tile.bbox[2] - tile.bbox[0])) * (tw - 1);
                const localY = ((tile.bbox[3] - geoY) / (tile.bbox[3] - tile.bbox[1])) * (th - 1);

                if (localX >= 0 && localX < tw - 1 && localY >= 0 && localY < th - 1) {
                    // 3. BILINEARE INTERPOLATION (Die Magie gegen die Stufen)
                    const x0 = Math.floor(localX);
                    const x1 = x0 + 1;
                    const y0 = Math.floor(localY);
                    const y1 = y0 + 1;

                    const v00 = raster[y0 * tw + x0];
                    const v10 = raster[y0 * tw + x1];
                    const v01 = raster[y1 * tw + x0];
                    const v11 = raster[y1 * tw + x1];

                    // Gewichtung berechnen
                    const tx = localX - x0;
                    const ty = localY - y0;

                    // Sanfter gewichteter Durchschnitt der 4 Nachbar-LIDAR-Punkte
                    const interpolatedHeight = (
                        v00 * (1 - tx) * (1 - ty) + v10 * tx * (1 - ty) + v01 * (1 - tx) * ty + v11 * tx * ty
                    );

                    if (!isNaN(interpolatedHeight) && interpolatedHeight > -10) {
                        const idx = py * TARGET_SIZE + px;
                        // Skalierung auf 16-bit (0-65535)
                        const h16 = Math.min(65535, Math.max(0, interpolatedHeight * 40));
                
                        // Wir speichern den Wert
                        if (h16 > buffer[idx]) buffer[idx] = h16;
                    }
                }
            }
        }
    }

    console.log("💾 Speichere Master-RAW (1.28 GB)...");
    fs.writeFileSync(OUTPUT_RAW, Buffer.from(buffer.buffer));

    console.log("🖼️ Erzeuge finale Single-Zone Preview...");
    const previewBuffer = Buffer.alloc(TARGET_SIZE * TARGET_SIZE);
    for (let i = 0; i < buffer.length; i++) {
        previewBuffer[i] = Math.floor(buffer[i] / 256);
    }

    await sharp(previewBuffer, {
        raw: { width: TARGET_SIZE, height: TARGET_SIZE, channels: 1 },
        limitInputPixels: false
    })
    .resize(26624, 26624, { kernel: 'lanczos3' }) // 1:1 auf 16k runter, damit die Küste nicht verwischt
    .toColourspace('rgb16')
    .grayscale()
    .jpeg(95)
    .toFile('Aethelgard_Final_Perfect.jpg');

    await sharp(previewBuffer, {
        raw: { width: TARGET_SIZE, height: TARGET_SIZE, channels: 1 },
        limitInputPixels: false
    })
    .resize(26624, 26624, { kernel: 'lanczos3' }) // 1:1 auf 16k runter, damit die Küste nicht verwischt
    .grayscale()
    .toColourspace('rgb16')
    .png({ bitdepth: 16, compressionLevel: 9 })
    .toFile('Aethelgard_Final_Perfect.png');

    console.log("✅ Sieg! Eine Insel, eine Zone, perfekte Daten.");
}

buildAethelgard().catch(console.error);