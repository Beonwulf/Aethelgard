import * as THREE from 'three';

/**
 * TextureAtlas – lädt mehrere Texturen in eine DataArrayTexture (Texture2DArray).
 * Im Shader: uniform sampler2DArray tAtlas; → texture(tAtlas, vec3(uv, layerIndex))
 *
 * Verwendung:
 *   const atlas = new TextureAtlas(512);
 *   await atlas.load(['sand.jpg', 'grass.jpg', 'rock.jpg']);
 *   // atlas.texture → THREE.DataArrayTexture (für ShaderMaterial uniform)
 *   // atlas.index('sand.jpg') → 0
 */
export class TextureAtlas {

    /**
     * @param {number} size – Auflösung pro Layer in Pixel (alle Texturen werden auf diese Größe skaliert)
     */
    constructor($size = 512) {
        this._size = $size;
        this._layers = [];   // [{ name, index }]
        this.texture = null;
    }


    /**
     * Lädt alle Texturen und baut die DataArrayTexture auf.
     * @param {string[]} $paths – Array von URL-Pfaden, Reihenfolge = Layer-Index
     */
    async load($paths) {
        const size = this._size;
        const canvas = document.createElement('canvas');
        canvas.width  = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        const totalBytes = size * size * 4 * $paths.length;
        const data = new Uint8Array(totalBytes);

        for (let i = 0; i < $paths.length; i++) {
            const img = await this._loadImage($paths[i]);
            ctx.clearRect(0, 0, size, size);
            ctx.drawImage(img, 0, 0, size, size);
            const pixels = ctx.getImageData(0, 0, size, size).data;
            data.set(pixels, i * size * size * 4);
            this._layers.push({ name: $paths[i], index: i });
        }

        canvas.width = 0; canvas.height = 0; // Speicher freigeben

        const tex = new THREE.DataArrayTexture(data, size, size, $paths.length);
        tex.format    = THREE.RGBAFormat;
        tex.type      = THREE.UnsignedByteType;
        tex.wrapS     = tex.wrapT = THREE.RepeatWrapping;
        tex.minFilter = THREE.LinearMipmapLinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.generateMipmaps = true;
        tex.needsUpdate = true;

        this.texture = tex;
        console.log(`🗺️  TextureAtlas: ${$paths.length} Layer à ${size}×${size}px geladen`);
        return this;
    }


    /**
     * Gibt den Layer-Index für einen Pfad zurück.
     * @param {string} $name
     * @returns {number}
     */
    index($name) {
        return this._layers.findIndex(l => l.name === $name);
    }


    _loadImage($src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload  = () => resolve(img);
            img.onerror = () => reject(new Error(`TextureAtlas: Konnte ${$src} nicht laden`));
            img.src = $src;
        });
    }

}
