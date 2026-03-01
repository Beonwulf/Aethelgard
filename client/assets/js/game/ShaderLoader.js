export class ShaderLoader {
	constructor() {
		this.cache = new Map();
	}

	async load(name, url) {
		if (this.cache.has(name)) return this.cache.get(name);
		
		const response = await fetch(url);
		if (!response.ok) throw new Error(`Shader nicht gefunden: ${url}`);
		
		const code = await response.text();
		this.cache.set(name, code);
		return code;
	}

	// Hilfsfunktion um ein ganzes Set zu laden (Vert + Frag)
	async loadProgram(baseName, path) {
		const [vert, frag] = await Promise.all([
			this.load(`${baseName}_vert`, `${path}${baseName}.vert.glsl`),
			this.load(`${baseName}_frag`, `${path}${baseName}.frag.glsl`)
		]);
		return { vert, frag };
	}
}