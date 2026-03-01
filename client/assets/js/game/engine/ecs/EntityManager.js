export class EntityManager {


	constructor() {
		this.entities = new Set();
		this.components = new Map(); // Map: ComponentName -> Map(EntityID -> Data)
		this.tags = new Map();
		this.nextEntityId = 0;
		this.listeners = new Map();
	}


	createEntity($tagName = null) {
		const id = this.nextEntityId++;
		this.entities.add(id);

		if ($tagName) {
            this.tags.set($tagName, id);
        }

		return id;
	}


	// Broadcaster: Registrieren für Änderungen
    subscribe($componentName, $callback) {
        if (!this.listeners.has($componentName)) {
            this.listeners.set($componentName, []);
        }
        this.listeners.get($componentName).push($callback);
    }


	notify($entity, $componentName, $data) {
        if (this.listeners.has($componentName)) {
            this.listeners.get($componentName).forEach($callback => $callback($entity, $data));
        }
    }


	addComponent($entity, $componentName, $data = {}) {
        if (!this.components.has($componentName)) {
            this.components.set($componentName, new Map());
        }
        this.components.get($componentName).set($entity, $data);
        
        // Broadcast: "Hier hat sich was bei einer Komponente getan!"
        this.notify($entity, $componentName, $data);
    }


	// Schneller Zugriff über den Namen
    getEntityByTag($tagName) {
        return this.tags.get($tagName);
    }


	// Hilfsmethode zB: getPlayerPosition
    getComponentByTag($tagName, $componentName) {
        const id = this.getEntityByTag($tagName);
        if (id !== undefined) {
            return this.getComponent(id, $componentName);
        }
        return null;
    }


	getComponent($entity, $componentName) {
		return this.components.get($componentName)?.get($entity);
	}


	// Hilfreich für Systems: "Gib mir alle Entities, die Position UND Mesh haben"
	getEntitiesWith(...$componentNames) {
		const result = [];
		for (const entity of this.entities) {
			if ($componentNames.every(name => this.components.get(name)?.has(entity))) {
				result.push(entity);
			}
		}
		return result;
	}


}