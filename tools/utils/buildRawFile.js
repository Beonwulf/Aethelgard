import fs from 'fs';
import path from 'path';
import { fromFile } from 'geotiff';


export async function buildRawFile( $rawFile, $tileFolder, $targetSize ) {
	const files = fs.readdirSync($tileFolder)
			.filter(f => f.endsWith('.tif'))
			.map(f => `${$tileFolder}${f}`)
	;

	console.log(`📦 ${files.length} Tiles gefunden (HU30)`);
	const tiles = [];
	let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;

	console.log("🔍 Analysiere Kacheln...");

	for (const file of files) {
		const tiff = await fromFile(file);
		const image = await tiff.getImage();
		const bbox = [...image.getBoundingBox()];

		minX = Math.min(minX, bbox[0]);
		maxX = Math.max(maxX, bbox[2]);
		minY = Math.min(minY, bbox[1]);
		maxY = Math.max(maxY, bbox[3]);

		tiles.push({ file: path.basename(file), bbox, image });
	}

	const worldWidth = maxX - minX;
	const worldHeight = maxY - minY;

	// 1.05 für einen kleinen Sicherheitsrand, damit die Küste nicht am Pixelrand klebt
	const maxSpan = Math.max(worldWidth, worldHeight) * 1.05; 
	const centerX = minX + worldWidth / 2;
	const centerY = minY + worldHeight / 2;

	const buffer = new Uint16Array($targetSize * $targetSize);

	for (const tile of tiles) {
		console.log(`🧩 Verarbeite: ${tile.file}`);
		const data = await tile.image.readRasters();
		const raster = data[0]; // Das Float32Array der Quelldaten
		const tw = tile.image.getWidth();
		const th = tile.image.getHeight();

		// Wir erhöhen die Abtastrate: Wir loopen jetzt über die ZIEL-Pixel im Bereich der Kachel
		// Das ist mathematisch sauberer als Splatting.
		const xStart = Math.floor(($targetSize / 2) + ((tile.bbox[0] - centerX) / maxSpan) * $targetSize);
		const xEnd = Math.ceil(($targetSize / 2) + ((tile.bbox[2] - centerX) / maxSpan) * $targetSize);
		const yEnd = Math.floor(($targetSize / 2) - ((tile.bbox[1] - centerY) / maxSpan) * $targetSize);
		const yStart = Math.ceil(($targetSize / 2) - ((tile.bbox[3] - centerY) / maxSpan) * $targetSize);

		// Wir berechnen die Ziel-Koordinaten
		for (let py = yStart; py <= yEnd; py++) {
			for (let px = xStart; px <= xEnd; px++) {
				// Umrechnung von Ziel-Pixel zu Geo-Koordinate
				const geoX = centerX + ((px - $targetSize / 2) / $targetSize) * maxSpan;
				const geoY = centerY - ((py - $targetSize / 2) / $targetSize) * maxSpan;

				// Umrechnung in lokale TIF-Pixel (Fließkomma!)
				const localX = ((geoX - tile.bbox[0]) / (tile.bbox[2] - tile.bbox[0])) * (tw - 1);
				const localY = ((tile.bbox[3] - geoY) / (tile.bbox[3] - tile.bbox[1])) * (th - 1);

				if (localX >= 1 && localX < tw - 2 && localY >= 1 && localY < th - 2) {
					// BIKUBISCHE INTERPOLATION (Catmull-Rom, 16 Nachbarpixel)
					// Deutlich weichere Kurven als bilinear – reduziert LiDAR-Stufen stark
					const x0 = Math.floor(localX);
					const y0 = Math.floor(localY);
					const tx = localX - x0;
					const ty = localY - y0;

					// Catmull-Rom Gewichte für 4 Stützpunkte (α = -0.5 = klassisch)
					const w = (t, i) => {
						const x = Math.abs(t - i + 1); // i: -1,0,1,2
						if (x < 1) return 1.5*x*x*x - 2.5*x*x + 1;
						if (x < 2) return -0.5*x*x*x + 2.5*x*x - 4*x + 2;
						return 0;
					};

					let interpolatedHeight = 0;
					for (let jy = -1; jy <= 2; jy++) {
						const wy = w(ty, jy);
						for (let jx = -1; jx <= 2; jx++) {
							const wx = w(tx, jx);
							const px2 = Math.max(0, Math.min(tw - 1, x0 + jx));
							const py2 = Math.max(0, Math.min(th - 1, y0 + jy));
							interpolatedHeight += raster[py2 * tw + px2] * wx * wy;
						}
					}

					if (!isNaN(interpolatedHeight) && interpolatedHeight > -10) {
						const idx = py * $targetSize + px;
						const h16 = Math.min(65535, Math.max(0, interpolatedHeight * 45));
						if (h16 > buffer[idx]) buffer[idx] = h16;
					}
				}
			}
		}
	}
	console.log("💾 Speichere Master-RAW (1.28 GB)...");
	fs.writeFileSync($rawFile, Buffer.from(buffer.buffer));

	return buffer;
}

/**
 * Lädt ein gespeichertes RAW-File zurück in einen Uint16Array.
 * @param {string} $rawFile  Pfad zur .raw Datei
 * @param {number} $targetSize  Seitenlänge in Pixeln (z.B. 26624)
 * @returns {Uint16Array}
 */
export function loadRawFile($rawFile, $targetSize) {
	console.log(`📂 Lade RAW: ${$rawFile} ...`);
	const raw = fs.readFileSync($rawFile);
	// Buffer ist Uint8Array-basiert → als Uint16Array interpretieren (Little-Endian, wie geschrieben)
	return new Uint16Array(raw.buffer, raw.byteOffset, $targetSize * $targetSize);
}