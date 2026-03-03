import sharp from 'sharp';
import fs from 'fs';


const SOURCE_IMAGE = 'Aethelgard_Final_Perfect.png';
const TILE_SIZE = 512; 
const OUTPUT_DIR = './client/assets/world/heightmaps/mallorca/';

async function sliceWorld() {
	if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

	console.log("📂 Öffne Master-PNG...");
	const master = sharp(SOURCE_IMAGE, { limitInputPixels: false });
	const metadata = await master.metadata();
	
	const fullSize = metadata.width;
	const cols = Math.ceil(fullSize / TILE_SIZE);
	const rows = Math.ceil(fullSize / TILE_SIZE);

	console.log(`✂️ Slicing gestartet: ${cols}x${rows} Tiles...`);

	for (let y = 0; y < rows; y++) {
		for (let x = 0; x < cols; x++) {
			const left = x * TILE_SIZE;
			const top = y * TILE_SIZE;
			
			// Wir nehmen 513x513 für den nahtlosen Overlap
			const width = Math.min(TILE_SIZE + 1, fullSize - left);
			const height = Math.min(TILE_SIZE + 1, fullSize - top);

			await master
				.clone() // Wichtig bei Sharp, um von derselben Quelle mehrfach zu extrahieren
				.extract({ left, top, width, height })
				.toColourspace('rgb16')
				.png({ bitdepth: 16, palette: false, compressionLevel: 8 })
				.toFile(`${OUTPUT_DIR}tile_${y}_${x}.png`);
		}
		if (y % 5 === 0) console.log(`✅ Reihe ${y}/${rows-1} fertig.`);
	}

	// Metadaten für Three.js
	const meta = {
		worldName: "Aethelgard",
		totalSize: fullSize,
		tileSize: TILE_SIZE,
		chunksX: cols,
		chunksY: rows,
		overlap: true
	};
	fs.writeFileSync(`${OUTPUT_DIR}metadata.json`, JSON.stringify(meta, null, 2));
	
	console.log("🎉 Alle Tiles erfolgreich aus dem PNG extrahiert!");
}

sliceWorld().catch(console.error);