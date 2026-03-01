import { BaseController } from './BaseController.js';


export class LoginController extends BaseController {


	constructor(app) {
		super('login', app); // 'login' ist der Name für JSON & Lang-Dateien
		this.isRegister = false;
	}


	toggleMode(e) {
		console.log('toggleMode');
		this.isRegister = !this.isRegister;

		const title = this.container.querySelector('#auth-title');
		const submitBtn = this.container.querySelector('#submit-btn');
		const emailGroup = this.container.querySelector('#email-group');
		const switchLink = e.target;
		if (this.isRegister) {
		title.textContent = this.app.lang.get('login.title_register');
		submitBtn.textContent = this.app.lang.get('login.btn_register');
		switchLink.textContent = this.app.lang.get('login.link_to_login');
		emailGroup.classList.remove('hidden');
		} else {
		title.textContent = this.app.lang.get('login.title');
		submitBtn.textContent = this.app.lang.get('login.btn_submit');
		switchLink.textContent = this.app.lang.get('login.link_to_register');
		emailGroup.classList.add('hidden');
		}	}


	validateForm(data) {
		const { user, pass, email } = data;

		// 1. Benutzername: 3-16 Zeichen, nur Buchstaben und Zahlen
		const userRegex = /^[a-zA-Z0-9]{3,16}$/;
		if (!userRegex.test(user)) {
			throw new Error(this.app.lang.get('login.err_invalid_user'));
		}

		// 2. Passwort: Mindestens 6 Zeichen
		if (pass.length < 6) {
			throw new Error(this.app.lang.get('login.err_invalid_pass'));
		}

		// 3. E-Mail: Nur im Register-Modus validieren
		if (this.isRegister && email !== null) {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(email)) {
				throw new Error(this.app.lang.get('login.err_invalid_email'));
			}
		}

		return true;
	}


	/**
	 * Diese Methode wird automatisch durch cE gebunden, 
	 * da im JSON $action: "attemptLogin" steht.
	 */
	async handleAuth(event) {
		// Da es ein Button-Klick in einem Formular-Kontext sein kann:
		if(event) event.preventDefault();

		const user = this.container.querySelector('#username').value.trim();
		const pass = this.container.querySelector('#password').value;
		const email = this.container.querySelector('#email').value.trim() || null;
		const errorEl = this.container.querySelector('#error-display');

		errorEl.className = '';
		errorEl.textContent = ''; // Fehler zurücksetzen

		//if( email === '' ) { email = null; }
		console.log(user, pass, email);

		try {
			// SCHRITT 1: Lokale Validierung
			this.validateForm({ user, pass, email });

			// SCHRITT 2: Server-Anfrage
			let result;
			if (this.isRegister) {
				result = await this.app.auth.register(user, pass, email);
				if (result.success) {
					this.toggleMode();
					errorEl.className = 'success';
					errorEl.textContent = this.app.lang.get('login.msg_registered');
				}
			}
			else {
				// Wir nutzen den AuthService der zentralen App-Instanz
				result = await this.app.auth.login(user, pass);
				if (result.token) {
					// Wir speichern den User-Status in der App
					this.app.user = {
						name: result.user,
						id: result.id,
						role: result.role
					}; 
					console.log(result)

					await this.app.stage.load('char-select');
				}
			}

			// SCHRITT 3: Server-Fehler behandeln (z.B. "User existiert bereits")
			if (result && result.error) {
				errorEl.className = 'error';
				errorEl.textContent = this.app.lang.get( result.error ); // Oder Mapping auf Lang-Keys
			}

		} catch (err) {
			// Hier landen sowohl unsere eigenen Validierungsfehler als auch Netzwerkfehler
			errorEl.className = 'error';
			errorEl.textContent = this.app.lang.get( err.message );
		}
	}


	onReady() {
		console.log("👁️ Login-Sicht ist im DOM platziert.");
		// Hier könnte man z.B. den Fokus auf das Username-Feld setzen
		this.container.querySelector('#username').focus();
	}
}