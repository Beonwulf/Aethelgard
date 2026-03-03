import { Bifrost } from './server/http/Bifrost.js';
import knex from 'knex';
import { GuildService } from './server/core/GuildService.js';


class Logger {
	static #instance = null;
	static getInstance() {
		if( this.#instance === null ) {
			this.#instance = new Logger();
		}
		return this.#instance;
	}
	error() {}
}


const logger = Logger.getInstance();


class BeonApp {


	static #instance = null;
	static getInstance() {
		if( this.#instance === null ) {
			this.#instance = new BeonApp();
		}
		return this.#instance;
	}


	static cfg = {
		bifrost: {
			port: process.env.PORT || 3000,
			host:'localhost',
			sslCert:null,
			ssl:null,
			static:null,
			bodyParser:null,
			socket:false,
			compression:false,
			responseHelpers:true
		},
		socket: {
			cors: {
				origin: '*'
			}
		}
	};


	static defaults() { return BeonApp.cfg; }
	static setSSL( $key, $cert ) {
		BeonApp.cfg.bifrost.ssl = { key: $key, cert: $cert };
	}
	static setPort( $port ) { BeonApp.cfg.bifrost.port = $port; }
	static setHost( $host ) { BeonApp.cfg.bifrost.host = $host; }
	static setStatic( $static ) { BeonApp.cfg.bifrost.static = $static; }
	static enabaleSocket() { BeonApp.cfg.bifrost.socket = true; }
	static disableSocket() { BeonApp.cfg.bifrost.socket = false; }
	static enableBodyParser() { BeonApp.cfg.bifrost.bodyParser = true; }
	static disableBodyParser() { BeonApp.cfg.bifrost.bodyParser = false; }
	static enableCompression() { BeonApp.cfg.bifrost.compression = true; }
	static disableCompression() { BeonApp.cfg.bifrost.compression = false; }
	static enableSSL() { BeonApp.cfg.bifrost.ssl = true; }
	static disableSSL() { BeonApp.cfg.bifrost.ssl = false; }
	static enableResponseHelpers() { BeonApp.cfg.bifrost.responseHelpers = true; }
	static disaldeResponseHelpers() { BeonApp.cfg.bifrost.responseHelpers = false; }


	#bifrost = null;
	#io = null;
	#router = null;
	#runCallbacks = [];
	#db = null;
	#guildService = null;


	constructor() {}


	async run() {
		await this.#bifrost.ignite();
		if( this.#runCallbacks.length > 0 ) {
			for( let i=0; i<this.#runCallbacks.length; i++ ) {
				console.log(`App::run call ${this.#runCallbacks[i].name}`);
				await this.#runCallbacks[i]();
			}
		}
	}


	addRunCallback( $cb ) {
		this.#runCallbacks.indexOf($cb) === -1 
			? this.#runCallbacks.push($cb)
			: console.log("This item already exists (" + $cb.name + ")")
		;
	}


	startup( $options ) {
		return new Promise((resolve, reject) => {
			this.#startup( $options, { resolve, reject } );
		});
	}


	async #startup( $options, { resolve, reject } ) {
		try {
			this.#handleProcessEvents( $options );

			// 1. Datenbank initialisieren (Bevor Bifröst startet)
            await this.#initDatabase();
			
			// 2. Services initialisieren
			this.#guildService = new GuildService(this.#db);

			await this.#initBifrost( $options );

			//await this.#db.init();
				
			resolve({app:this, bifrost:this.#bifrost, io:this.#io, router:this.#router, db: this.#db, guildService: this.#guildService});
		}
		catch( $exception ) {
			reject( `[startup] ${$exception.message}` );
		}
	}


	async #initBifrost( $options ) {
		if( $options.bifrost === undefined ) {
			$options.bifrost = {port: null, host:null, ssl:null, socket:null, static:null, bodyParser:null};
		}
		$options.bifrost.port = $options.bifrost.port || BeonApp.cfg.bifrost.port;
		$options.bifrost.host = $options.bifrost.host || BeonApp.cfg.bifrost.host;
		$options.bifrost.ssl = $options.bifrost.ssl || BeonApp.cfg.bifrost.ssl;
		$options.bifrost.sslCert = $options.bifrost.sslCert || BeonApp.cfg.bifrost.sslCert;
		$options.bifrost.socket = $options.bifrost.socket || BeonApp.cfg.bifrost.socket;
		$options.bifrost.static = $options.bifrost.static || BeonApp.cfg.bifrost.static;
		$options.bifrost.bodyParser = $options.bifrost.bodyParser || BeonApp.cfg.bifrost.bodyParser;
		$options.bifrost.compression = $options.bifrost.compression || BeonApp.cfg.bifrost.compression;
		$options.bifrost.responseHelpers = $options.bifrost.responseHelpers || BeonApp.cfg.bifrost.responseHelpers;



		this.#bifrost = new Bifrost({
			port:$options.bifrost.port, host:$options.bifrost.host, sslCert:$options.bifrost.sslCert, ssl:$options.bifrost.ssl,
			compression:$options.bifrost.compression
		});

		// Middleware
		if( $options.bifrost.responseHelpers === true ) {
			this.#bifrost.use( Bifrost.createResponseHelperRune() );
		}
		if( $options.bifrost.bodyParser === true ) {
			this.#bifrost.use( Bifrost.createBodyParserRune() );
		}
		if( $options.bifrost.static !== null) {
			this.#bifrost.use( Bifrost.createStaticRune($options.bifrost.static) );
		}

		if( $options.bifrost.socket === true ) {
			this.#io = await this.#bifrost.attachSockets();
		}
	}


	async #initDatabase() {
		console.log('🐘 Initialisiere Datenbank-Pool...');
		this.#db = knex({
			client: 'pg',
			connection: {
				host: process.env.DB_HOST,
				user: process.env.DB_USER,
				password: process.env.DB_PASS,
				database: process.env.DB_NAME,
				port: process.env.DB_PORT || 5432
			},
			pool: { min: 2, max: 10 } // Wichtig für MMORPG Performance
		});

		// Test der Verbindung
		await this.#db.raw('SELECT 1');
	}


	// Zugriff von außen erlauben
    get db() { return this.#db; }
	get guildService() { return this.#guildService; }


	#handleProcessEvents() {
		try {
			process.on( 'exit', async () => {
				this.destroy();
			});

			process.on( 'uncaughtException', ( $error ) => {
				logger.error( $error );
				console.warn( $error );
			});

			process.on( 'uncaughtException', async ( $error ) => {
				logger.error( $error );
				console.warn( $error );
			});

			process.on( 'unhandledRejection', async ( $error ) => {
				logger.error( $error );
				console.warn( $error );
			});
		}
		catch( $exception ) {
			throw new Error( `[startup.handleProcessEvents] ${$exception.message || $exception}` );
		}
	}


	destroy() {
		if(this.#db) {
			this.#db.destroy();
			console.log('🐘 Datenbank-Verbindungen sauber geschlossen.');
		}
	}


}


export const AppCFG = {
	setStatic: BeonApp.setStatic,
	enabaleSocket: BeonApp.enabaleSocket,
	enableBodyParser: BeonApp.enableBodyParser,
	disableCompression: BeonApp.disableCompression,
	enableCompression: BeonApp.enableCompression,
	enableSSL: BeonApp.enableSSL,
	disableSSL: BeonApp.disableSSL,
	enableResponseHelpers: BeonApp.enableResponseHelpers,
	disaldeResponseHelpers: BeonApp.disaldeResponseHelpers
};


export const App = BeonApp.getInstance();