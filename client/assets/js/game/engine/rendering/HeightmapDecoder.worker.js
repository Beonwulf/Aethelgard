/**
 * HeightmapDecoder Worker
 * Dekodiert ein Heightmap-PNG zu Float32Array im Hintergrund.
 * Nutzt OffscreenCanvas + createImageBitmap (kein Main-Thread-Blocking).
 * Transferiert den ArrayBuffer per Transferable (Zero-Copy) zurück.
 */
self.onmessage = async ({ data }) => {
    const { url, key, tileSize, slotIndex, sharedBuffer } = data;

    try {
        // 1. PNG laden und dekodieren
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const blob = await response.blob();
        const bitmap = await createImageBitmap(blob);

        // 2. Pixel auslesen via OffscreenCanvas
        const canvas = new OffscreenCanvas(tileSize, tileSize);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(bitmap, 0, 0, tileSize, tileSize);
        bitmap.close();
        const imageData = ctx.getImageData(0, 0, tileSize, tileSize);

        // 3. R + G/255 Precision Packing → normalisierter Float (0..1)
        const count = tileSize * tileSize;

        if (sharedBuffer) {
            // SharedArrayBuffer-Pfad: direkt in vorgeallozierten Slot schreiben (Zero-Copy)
            const floatView = new Float32Array(sharedBuffer, slotIndex * count * 4, count);
            for (let i = 0; i < count; i++) {
                floatView[i] = imageData.data[i * 4] / 255.0 + imageData.data[i * 4 + 1] / 65025.0;
            }
            self.postMessage({ key, slotIndex, sharedBuffer: true });
        } else {
            // Fallback: Transferable ArrayBuffer (kein Copy, aber Ownership-Transfer)
            const floatData = new Float32Array(count);
            for (let i = 0; i < count; i++) {
                floatData[i] = imageData.data[i * 4] / 255.0 + imageData.data[i * 4 + 1] / 65025.0;
            }
            self.postMessage({ key, buffer: floatData.buffer }, [floatData.buffer]);
        }

    } catch (err) {
        self.postMessage({ key, error: err.message });
    }
};
