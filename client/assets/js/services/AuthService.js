export class AuthService {
	#token = null;
	#user = null;
	#id = null;
	#role = null;

	async register(username, password, email = null) {
		const response = await fetch('/api/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password, email })
		});
		return response.json();
	}

	async login(username, password, email = null) {
		const response = await fetch('/api/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password, email })
		});

		const data = await response.json();
		if (data.token) {
			this.#token = data.token;
			this.#user = data.user;
			this.#id = data.id;
			this.#role = data.role;
			localStorage.setItem('bifrost_token', data.token); // Persistenz
		}
		return data;
	}

	async getCharacters() {
		const token = this.getToken();
		const response = await fetch('/api/characters', {
			headers: { 'Authorization': `Bearer ${token}` }
		});
		return response.json();
	}

	getToken() {
		return this.#token || localStorage.getItem('bifrost_token');
	}

	async validateToken() {
		const token = this.getToken();
		if (!token) return false;

		try {
			const response = await fetch('/api/auth/validate', {
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json'
				}
			});

			if (response.ok) {
				const data = await response.json();
				// Wenn der Server ein neues Token schickt, speichern wir es sofort
				if (data.newToken) {
					localStorage.setItem('bifrost_token', data.newToken);
					this.#token = data.newToken;
					this.#user = data.user;
					this.#id = data.id;
					this.#role = data.role;
					console.log("🔄 Token wurde automatisch verlängert.");
				}
				// Wir geben das ganze Objekt zurück, damit die App es nutzen kann
				return { valid: data.valid, user: data.user, id: data.id, role: data.role };
			}
			return false;
		} catch (err) {
			console.error("Validierungs-Server nicht erreichbar");
			return false;
		}
	}
}
