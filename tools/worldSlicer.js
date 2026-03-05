import sharp from 'sharp';
import fs from 'fs';


const SOURCE_IMAGE = 'tools/source/Aethelgard_Final_Perfect.png';
const TILE_SIZE = 512;
const OUTPUT_DIR = './client/assets/world/heightmaps/mallorca/';

async function sliceWorld() {
	if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

	console.log("📂 Öffne Master-PNG...");
	const meta = await sharp(SOURCE_IMAGE, { limitInputPixels: false }).metadata();
	const fullSize = meta.width;
	const cols = Math.ceil(fullSize / TILE_SIZE);
	const rows = Math.ceil(fullSize / TILE_SIZE);

	console.log(`✂️ Slicing gestartet: ${cols}x${rows} Tiles...`);

	for (let y = 0; y < rows; y++) {
		const top = y * TILE_SIZE;
		const height = Math.min(TILE_SIZE + 1, fullSize - top);

		for (let x = 0; x < cols; x++) {
			const left = x * TILE_SIZE;
			const width = Math.min(TILE_SIZE + 1, fullSize - left);

			// Neue Sharp-Instanz pro Tile → kein Speicher-Leak durch Clones
			await sharp(SOURCE_IMAGE, { limitInputPixels: false })
				.extract({ left, top, width, height })
				.toColourspace('grey16')
				.png({ bitdepth: 16, palette: false, compressionLevel: 8 })
				.toFile(`${OUTPUT_DIR}tile_${y}_${x}.png`);
		}
		if (y % 5 === 0) console.log(`✅ Reihe ${y}/${rows-1} fertig.`);
	}

	const meta2 = {
		worldName: "Aethelgard",
		totalSize: fullSize,
		tileSize: TILE_SIZE,
		chunksX: cols,
		chunksY: rows,
		overlap: true
	};
	fs.writeFileSync(`${OUTPUT_DIR}metadata.json`, JSON.stringify(meta2, null, 2));
	
	console.log("🎉 Alle Tiles erfolgreich extrahiert!");
}

sliceWorld().catch(console.error);
