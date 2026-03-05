import { buildRawFile, loadRawFile } from './utils/buildRawFile.js';
import sharp from 'sharp';


const TARGET_SIZE = 26624;
const TILE_FOLDER = './tools/mallorca_tiles/HU30/';  // HU30 allein = komplettes Mallorca
const OUTPUT_RAW = 'Aethelgard_Final_16bit.raw';


async function getRawData($build=false) {
	if ($build) {
		return await buildRawFile(OUTPUT_RAW, TILE_FOLDER, TARGET_SIZE);
	} else {
		return loadRawFile(OUTPUT_RAW, TARGET_SIZE);
	}
}


async function buildAethelgard() {
	const buffer = await getRawData(false);

	const previewBuffer = Buffer.alloc(TARGET_SIZE * TARGET_SIZE);
	for (let i = 0; i < buffer.length; i++) {
		previewBuffer[i] = Math.floor(buffer[i] / 256);
	}

	console.log("🖼️  Erzeuge 16-bit Master-PNG (ohne Blur – blurMaster.js danach ausführen)...");
	// Kein .blur() hier – Sharp konvertiert beim Blur intern zu sRGB 8-bit!
	// blurMaster.js liest diese Datei und erzeugt Aethelgard_Final_Perfect.png mit Blur.
	//await sharp(Buffer.from(buffer.buffer), {
	//await sharp(previewBuffer, {
	await sharp(Uint16Array.from(buffer), {
		raw: { width: TARGET_SIZE, height: TARGET_SIZE, channels: 1, depth: 'ushort' },
		limitInputPixels: false
	})
	.toColorspace("grey16")
	.png({ bitdepth: 16, compressionLevel: 6 })
	.toFile('Aethelgard_Final_RAW.png');

	console.log("🖼️  Erzeuge JPEG-Preview (8-bit)...");

	await sharp(previewBuffer, {
		raw: { width: TARGET_SIZE, height: TARGET_SIZE, channels: 1 },
		limitInputPixels: false
	})
	.jpeg({ quality: 85 })
	.toFile('Aethelgard_Final_Perfect.jpg');

	console.log("✅ Master-PNG (16-bit, geblurt) + JPEG-Preview fertig.");
}

buildAethelgard().catch(console.error);