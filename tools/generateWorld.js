import sharp from 'sharp';
import { createNoise2D } from 'simplex-noise';
import { writeFile } from 'fs/promises';

const CONFIG = {
    size: 26240, 
    seed: 'Aethelgard_Final_V22', 
    masterFile: 'Aethelgard_Master_16bit.raw',
    previewFile: 'Aethelgard_Preview_4K.jpg',
    seaLevel: 0.35 
};

async function generateAethelgard() {
    console.log("🗺️ Schmiede Aethelgard V27: Organisch, Zentral, Massiv...");
    
    const noiseBase = createNoise2D(() => 0.815); 
    const noiseDetail = createNoise2D(() => 0.123); 
    const buffer = new Uint16Array(CONFIG.size * CONFIG.size);

    for (let y = 0; y < CONFIG.size; y++) {
        for (let x = 0; x < CONFIG.size; x++) {
            const nx = x / CONFIG.size;
            const ny = y / CONFIG.size;

            // 1. DER MONOLITH (Die absolute Land-Garantie)
            // Wir definieren ein Herzstück, das IMMER Land ist.
            const dx = (nx - 0.5) * 2;
            const dy = (ny - 0.5) * 2;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            // Ein massiver Kern-Bonus (In der Mitte 1.0, am Rand 0.0)
            const coreStrength = Math.max(0, 1.0 - dist * 1.5);

            // 2. DAS RAUSCHEN (Nur für die Textur)
            // Wir nutzen extrem langsames Rauschen (25000) für die Form
            const noiseShape = (noiseBase(x / 25000, y / 25000) + 1) / 2;
            const noiseDetailLayer = (noiseDetail(x / 5000, y / 5000) + 1) / 2;

            // 3. KOMPOSITION
            // Wir mischen den Kern-Bonus mit dem Rauschen. 
            // Selbst wenn das Rauschen 0 wäre, würde der Core das Land über Wasser halten.
            let h = (noiseShape * 0.6 + coreStrength * 0.7);

            // 4. DIE KÜSTEN-MASKE (Harter Cut am Rand)
            const globalMask = Math.pow(Math.max(0, 1.0 - dist), 0.5);
            h *= globalMask;

            // 5. ÜBERGANG ZU HÖHENWERTEN
            if (h < CONFIG.seaLevel) {
                h = 0;
            } else {
                h = (h - CONFIG.seaLevel) / (1.0 - CONFIG.seaLevel);

                // GEBIRGS-LOGIK (Mornir)
                if (ny < 0.3) {
                    const mountainNoise = Math.abs(noiseDetail(x / 600, y / 600));
                    h = Math.min(1.0, h + (0.3 - ny) * 3.5 * mountainNoise);
                } else {
                    // Kaiserreich: Wir runden die Werte hart, um Moiré zu killen
                    h = Math.round(h * 100) / 100; 
                    h = Math.pow(h, 1.1);
                }
            }

            // Letzter Sicherheitscheck gegen Rand-Artefakte
            if (dist > 0.95) h = 0;

            buffer[y * CONFIG.size + x] = Math.floor(h * 65535);
        }
    }

    console.log("💾 Exportiere Master...");
    await writeFile(CONFIG.masterFile, Buffer.from(buffer.buffer));
    await sharp(Buffer.from(buffer.buffer), {
        raw: { width: CONFIG.size, height: CONFIG.size, channels: 1, depth: 'ushort' },
        limitInputPixels: false
    })
    .resize(4096, 4096).jpeg({ quality: 95 }).toFile(CONFIG.previewFile);
    
    console.log("✅ V27 Fertig! Schau dir die neue Silhouette an.");
}

generateAethelgard().catch(console.error);