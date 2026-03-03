import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';


const inputDir = './client/assets/world/heightmaps/mallorca/';
const outputDir = './client/assets/world/heightmaps/mallorca_smooth/';


if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

async function processTiles() {
    const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.png'));
    
    console.log(`🚀 Starte Glättung von ${files.length} Tiles...`);

    for (const file of files) {
        await sharp(path.join(inputDir, file))
            .ensureAlpha(1) // Stellt sicher, dass Kanäle stabil bleiben
            // Ein Radius von 1.5 bis 2.0 ist der Sweetspot: 
            // Er entfernt die Treppen, ohne die Berge "einzuschmelzen".
            .blur(1.8)
            .toColourspace('rgb16')
            .png({ bitdepth: 16, compressionLevel: 9 })
            .toFile(path.join(outputDir, file));
        
        console.log(`✅ ${file} geglättet.`);
    }
    console.log('✨ Fertig! Kopiere die Dateien aus /mallorca_smooth in deinen Hauptordner.');
}

processTiles().catch(err => console.error('Fehler:', err));