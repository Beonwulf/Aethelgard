export class ApiService {


	constructor(app) {
		this.app = app;
		this.baseUrl = '/api'; // Deine Basis-Route zum Bifrost
	}


	/**
	 * Zentrale Methode für alle Requests
	 */
	async request(endpoint, method = 'GET', data = null) {
		const url = `${this.baseUrl}${endpoint}`;
		const headers = { 'Content-Type': 'application/json' };

		// Token aus dem AuthService holen, falls vorhanden
		const token = this.app.auth.getToken(); 
		if (token) {
			headers['Authorization'] = `Bearer ${token}`;
		}

		const options = {
			method,
			headers
		};

		if (data && (method === 'POST' || method === 'PATCH')) {
			options.body = JSON.stringify(data);
		}

		try {
			const response = await fetch(url, options);

			// Falls Session abgelaufen (403), automatisch ausloggen
			if (response.status === 403) {
				this.app.auth.logout();
				return { success: false, error: 'session_expired' };
			}

			return await response.json();
		} catch (error) {
			console.error(`API Error (${url}):`, error);
			return { success: false, error: 'network_error' };
		}
	}


	//async get(endpoint) { return await this.request(endpoint, 'GET'); }
	//async post(endpoint, data) { return await this.request(endpoint, 'POST', data); }
	async patch(endpoint, data) { return await this.request(endpoint, 'PATCH', data); }


	async get(endpoint) { return this.request(endpoint, 'GET'); }
	async post(endpoint, data) { return this.request(endpoint, 'POST', data); }
}