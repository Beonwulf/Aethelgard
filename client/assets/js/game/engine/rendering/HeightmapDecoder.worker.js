/**
 * HeightmapDecoder Worker
 * Dekodiert ein Heightmap-Binary (.bin, Uint16 Little-Endian) zu Float32Array.
 * Kein PNG, kein Canvas, kein Endianness-Problem.
 */
self.onmessage = async ({ data }) => {
    const { url, key, tileSize, slotIndex, sharedBuffer } = data;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const arrayBuffer = await response.arrayBuffer();

        // Uint16 Little-Endian → normalisierter Float (0..1)
        const u16    = new Uint16Array(arrayBuffer);
        const count  = tileSize * tileSize;

        if (sharedBuffer) {
            const floatView = new Float32Array(sharedBuffer, slotIndex * count * 4, count);
            for (let i = 0; i < count; i++) floatView[i] = u16[i] / 65535.0;
            self.postMessage({ key, slotIndex, sharedBuffer: true });
        } else {
            const floatData = new Float32Array(count);
            for (let i = 0; i < count; i++) floatData[i] = u16[i] / 65535.0;
            self.postMessage({ key, buffer: floatData.buffer }, [floatData.buffer]);
        }

    } catch (err) {
        self.postMessage({ key, error: err.message });
    }
};
