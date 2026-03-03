export class WorldClient {
    constructor($socket, $entity) {
        this.socket = $socket;
        this.entity = $entity;
        
        // Link them together
        this.entity.client = this;

        this.setupListeners();
    }

    send($event, $data) {
        this.socket.emit($event, $data);
    }

    setupListeners() {
        this.socket.on('world.update', ($data) => {
            // TODO: Handle player movement updates
            // this.entity.position = $data.position;
            // this.entity.rotation = $data.rotation;
        });

        this.socket.on('disconnect', () => {
            // TODO: Handle player disconnect
            console.log(`Player ${this.entity.id} disconnected.`);
        });
    }
}
