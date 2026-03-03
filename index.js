import { App, AppCFG } from './App.js';
import { WorldServer } from './server/world/WorldServer.js';
import { socketAuthMiddleware } from './server/http/socket/socketAuthMiddleware.js';
import { createAuthRune } from './server/http/runes/createAuthRune.js';
import { createCharacterRune } from './server/http/runes/createCharacterRune.js';
import { Router } from './server/http/Router.js';


AppCFG.setStatic('client');
AppCFG.enabaleSocket();
AppCFG.enableBodyParser(); // todo 
AppCFG.disableCompression();
AppCFG.enableSSL();
AppCFG.enableResponseHelpers();

App.startup({}).then(async(data) => {
	const { io, db, app, bifrost, guildService } = data; // Destructuring für saubereren Code
	const SECRET_KEY = process.env.JWT_SECRET;

	console.log( 'App::startup'/*, data */);

	// 1. Erst die Runen (Middleware) anhängen
	bifrost.use( createAuthRune(db) );
	bifrost.use( createCharacterRune(db) );

	// 2. Dann alle Routen dynamisch über die Router-Klasse laden!
	await Router.loadRoutes(bifrost, db, guildService);

	// Socket Middleware mit DB-Check
	data.io.use(socketAuthMiddleware(db, SECRET_KEY));

	const _WORLD = new WorldServer( io, db );
	//const _WORLD = new world_server.WorldServer(data.io);
	data.app.addRunCallback(_WORLD.run.bind(_WORLD));
	data.app.run();
}).catch(( $error ) => {
	console.log( $error );
});