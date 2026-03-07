/**
 * ChunkWorkerPool – verwaltet N WebWorker für Heightmap-Dekodierung.
 * 
 * Verwendung:
 *   const pool = new ChunkWorkerPool(2, tileSize);
 *   const floatData = await pool.decode(url, key);
 */
export class ChunkWorkerPool {

    /**
     * @param {number} $workerCount – Anzahl Worker (empfohlen: 2)
     * @param {number} $tileSize    – Pixel pro Tile-Seite (512)
     */
    constructor($workerCount = 2, $tileSize = 512) {
        this._tileSize    = $tileSize;
        this._workerCount = $workerCount;
        this._workers     = [];
        this._queue       = [];      // { url, key, resolve, reject }
        this._pending     = new Map(); // workerId → { resolve, reject, key }
        this._sharedBuffer = null;

        this._initWorkers();
        this._initSharedBuffer();
    }


    _initWorkers() {
        for (let i = 0; i < this._workerCount; i++) {
            const worker = new Worker(
                new URL('./HeightmapDecoder.worker.js', import.meta.url),
                { type: 'module' }
            );
            worker._id   = i;
            worker._busy = false;
            worker.onmessage = (e) => this._onMessage(worker, e.data);
            worker.onerror   = (e) => this._onError(worker, e);
            this._workers.push(worker);
        }
        console.log(`⚙️  ChunkWorkerPool: ${this._workerCount} Worker gestartet`);
    }


    _initSharedBuffer() {
        if (typeof SharedArrayBuffer === 'undefined') {
            console.warn('⚠️  SharedArrayBuffer nicht verfügbar – nutze Transferable Fallback');
            return;
        }
        // N Slots à (513² × 4 Bytes Float32) – Overlap-Pixel
        const bytesPerSlot = (this._tileSize + 1) * (this._tileSize + 1) * 4;
        this._sharedBuffer = new SharedArrayBuffer(this._workerCount * bytesPerSlot);
        console.log(`🔗 SharedArrayBuffer allokiert: ${(this._sharedBuffer.byteLength / 1024).toFixed(1)} KB`);
    }


    /**
     * Dekodiert eine Heightmap-PNG und gibt Float32Array zurück.
     * @param {string} $url  – vollständiger URL zum PNG
     * @param {string} $key  – Chunk-Key z.B. "20_45"
     * @returns {Promise<Float32Array>}
     */
    decode($url, $key) {
        return new Promise((resolve, reject) => {
            this._queue.push({ url: $url, key: $key, resolve, reject });
            this._dispatch();
        });
    }


    _dispatch() {
        const freeWorker = this._workers.find(w => !w._busy);
        if (!freeWorker || this._queue.length === 0) return;

        const task = this._queue.shift();
        freeWorker._busy = true;
        this._pending.set(freeWorker._id, task);

        const msg = {
            url: task.url,
            key: task.key,
            tileSize: this._tileSize,
        };

        if (this._sharedBuffer) {
            msg.sharedBuffer = this._sharedBuffer;
            msg.slotIndex    = freeWorker._id;
        }

        // SAB wird als Referenz im msg-Objekt übergeben – NICHT in der Transfer-Liste!
        freeWorker.postMessage(msg);
    }


    _onMessage(worker, data) {
        const task = this._pending.get(worker._id);
        if (!task) return;

        this._pending.delete(worker._id);
        worker._busy = false;

        if (data.error) {
            task.reject(new Error(data.error));
        } else if (data.sharedBuffer) {
            // SAB-Pfad: Daten aus dem Slot kopieren
            const count = (this._tileSize + 1) * (this._tileSize + 1);
            const src   = new Float32Array(this._sharedBuffer, worker._id * count * 4, count);
            task.resolve(new Float32Array(src)); // Kopie notwendig da SAB geteilt
        } else {
            // Transferable-Pfad: Buffer gehört jetzt dem Main Thread
            task.resolve(new Float32Array(data.buffer));
        }

        // Nächste Aufgabe aus der Queue abarbeiten
        this._dispatch();
    }


    _onError(worker, err) {
        const task = this._pending.get(worker._id);
        if (task) {
            task.reject(new Error(`Worker ${worker._id} Fehler: ${err.message}`));
            this._pending.delete(worker._id);
        }
        worker._busy = false;
        this._dispatch();
    }


    /** Alle Worker beenden */
    destroy() {
        this._workers.forEach(w => w.terminate());
        this._workers = [];
        console.log('💀 ChunkWorkerPool beendet');
    }

}
