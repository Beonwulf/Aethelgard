export class AdminService {

	constructor($app) {
		this.app = $app;
	}

	// --- Dashboard ---

	async getStats() {
		return this.app.api.get('/admin/stats');
	}

	// --- Users ---

	async getUsers() {
		return this.app.api.get('/admin/users');
	}

	async changeRole($userId, $role) {
		return this.app.api.post('/admin/users/role', { userId: $userId, role: $role });
	}

	// --- Characters ---

	async getCharacters() {
		return this.app.api.get('/admin/characters');
	}

	async deleteCharacter($uuid) {
		return this.app.api.delete(`/admin/characters/${$uuid}`);
	}

	// --- Guilds ---

	async getGuilds() {
		return this.app.api.get('/admin/guilds');
	}

	async createGuild($name, $tag) {
		return this.app.api.post('/admin/guilds', { name: $name, tag: $tag });
	}

	async deleteGuild($guildId) {
		return this.app.api.delete(`/admin/guilds/${$guildId}`);
	}

	// --- Database ---

	async getDbTables() {
		return this.app.api.get('/admin/database/tables');
	}

	async getTableContent($tableName) {
		return this.app.api.get(`/admin/database/table/${$tableName}`);
	}
}
