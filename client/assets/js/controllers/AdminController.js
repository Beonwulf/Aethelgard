import { BaseController } from './BaseController.js';
import { cE } from '../utils/cE.js';

export class GMPanelController extends BaseController {
	constructor($app) {
		super('gm-panel', $app);
	}

	async onReady() {
		if (!this.app.user || (this.app.user.role !== 'admin' && this.app.user.role !== 'moderator')) {
			this.app.stage.load('char-select');
			return;
		}

		this.setupSidebar();
		this.setupTabMenus();
		this.setupForms();
		
		await this.loadDashboardStats();
	}

	setupSidebar() {
		const navLinks = this.container.querySelectorAll('.gm-sidebar-nav a');
		const contentSections = this.container.querySelectorAll('.gm-content-section');

		navLinks.forEach(link => {
			link.addEventListener('click', async (e) => {
				e.preventDefault();
				if (link.classList.contains('active')) return;

				const section = link.dataset.section;
				const sectionId = section + '-section';
				const sectionElement = this.container.querySelector('#' + sectionId);

				if (sectionElement && !sectionElement.dataset.loaded) {
					if (section === 'world') await this.loadWorldData();
					else if (section === 'users') await this.loadUsers();
					else if (section === 'characters') await this.loadCharacters();
					else if (section === 'guilds') await this.loadGuilds();
					else if (section === 'database') await this.loadDbTables();
					sectionElement.dataset.loaded = 'true';
				}

				navLinks.forEach(l => l.classList.remove('active'));
				link.classList.add('active');
				contentSections.forEach(s => s.classList.remove('active'));
				if(sectionElement) sectionElement.classList.add('active');
			});
		});

		if (navLinks.length > 0) navLinks[0].classList.add('active');
		if (contentSections.length > 0) contentSections[0].classList.add('active');
	}

	setupTabMenus() {
		const tabMenus = this.container.querySelectorAll('.gm-tab-menu');
		tabMenus.forEach(menu => {
			const tabs = menu.querySelectorAll('.gm-tab-item');
			const section = menu.closest('.gm-content-section');
			if (!section) return;
			const contents = section.querySelectorAll('.gm-tab-content');

			tabs.forEach(tab => {
				tab.addEventListener('click', () => {
					if (tab.classList.contains('active')) return;
					const tabId = tab.dataset.tab;
					tabs.forEach(t => t.classList.remove('active'));
					tab.classList.add('active');
					contents.forEach(c => c.id === tabId ? c.classList.add('active') : c.classList.remove('active'));
				});
			});
		});
	}

	setupForms() {
		const createGuildForm = this.container.querySelector('#create-guild-form');
		if (createGuildForm) {
			createGuildForm.addEventListener('submit', async (e) => {
				e.preventDefault();
				const guildName = this.container.querySelector('#guild-name').value;
				const guildTag = this.container.querySelector('#guild-tag').value;
				await this.createGuild(guildName, guildTag);
			});
		}
	}

	async loadDashboardStats() {
		try {
			const response = await this.app.api.get('/admin/stats');
			if (response && response.success) {
				const stats = response.data;
				this.container.querySelector('#stat-users').textContent = stats.users;
				this.container.querySelector('#stat-guilds').textContent = stats.guilds;
				this.container.querySelector('#stat-characters').textContent = stats.characters;
				this.container.querySelector('#stat-quests').textContent = '42'; // Placeholder
				this.container.querySelector('#stat-items').textContent = '256'; // Placeholder
				this.container.querySelector('#stat-npcs').textContent = '89'; // Placeholder
				this.container.querySelector('#stat-cultures').textContent = stats.cultures;
				this.container.querySelector('#stat-professions').textContent = stats.professions;

			}
		} catch (err) {
			console.error("Error loading stats:", err);
		}
	}

	async loadWorldData() {
		const section = this.container.querySelector('#world-section');
		const statusText = section.querySelector('.gm-stat-card-value');

		try {
			const response = await this.app.api.get('/admin/stats');
			if (response && response.success) {
				const uptime = Math.floor(response.data.uptime / 60);
				statusText.textContent = `Online (${uptime}m)`;
			}
		} catch (err) {
			statusText.textContent = 'Offline?';
		}
	}

	async loadUsers() {
		const listContainer = this.container.querySelector('#user-list');
		listContainer.innerHTML = `<em>${this.app.lang.get('gm.loading')}</em>`;
		try {
			const response = await this.app.api.get('/admin/users');
			listContainer.innerHTML = '';
			if (response && response.success) {
				response.data.forEach(user => listContainer.appendChild(this.renderUserCard(user)));
			} else {
				listContainer.innerHTML = `<p>${this.app.lang.get('gm.access_denied')}</p>`;
			}
		} catch (err) {
			listContainer.innerHTML = `<p>${this.app.lang.get('gm.network_error')}</p>`;
		}
	}

	async loadCharacters() {
		const listContainer = this.container.querySelector('#character-list');
		listContainer.innerHTML = `<em>${this.app.lang.get('gm.loading')}</em>`;
		try {
			const response = await this.app.api.get('/admin/characters');
			listContainer.innerHTML = '';
			if (response && response.success && response.data.length > 0) {
				response.data.forEach(char => listContainer.appendChild(this.renderCharacterCard(char)));
			} else {
				listContainer.innerHTML = `<p>${this.app.lang.get('gm.no_characters_found') || 'No characters found.'}</p>`;
			}
		} catch (err) {
			listContainer.innerHTML = `<p>${this.app.lang.get('gm.network_error')}</p>`;
		}
	}

	async loadGuilds() {
		const listContainer = this.container.querySelector('#guild-list');
		listContainer.innerHTML = `<em>${this.app.lang.get('gm.loading')}</em>`;
		try {
			const response = await this.app.api.get('/admin/guilds');
			listContainer.innerHTML = '';
			if (response && response.success && response.data.length > 0) {
				response.data.forEach(guild => listContainer.appendChild(this.renderGuildCard(guild)));
			} else {
				listContainer.innerHTML = `<p>${this.app.lang.get('gm.no_guilds_found')}</p>`;
			}
		} catch (err) {
			listContainer.innerHTML = `<p>${this.app.lang.get('gm.network_error')}</p>`;
		}
	}

	async loadDbTables() {
		const listContainer = this.container.querySelector('#db-tables-list');
		listContainer.innerHTML = `<tr><td colspan="3"><em>${this.app.lang.get('gm.loading')}</em></td></tr>`;
		try {
			const response = await this.app.api.get('/admin/database/tables');
			listContainer.innerHTML = '';
			if (response && response.success) {
				response.data.forEach(table => {
					const row = cE({
						$el: 'tr',
						$childs: [
							{ $el: 'td', $text: table.name },
							{ $el: 'td', $text: table.rows.toString() },
							{ $el: 'td', $childs: [{ $el: 'button', $class: 'btn-small', $text: 'View', $onclick: () => this.viewTableContent(table.name) }] }
						]
					});
					listContainer.appendChild(row);
				});
			}
		} catch (err) {
			listContainer.innerHTML = '<tr><td colspan="3">Error loading table stats.</td></tr>';
		}
	}

	async viewTableContent(tableName) {
		const modal = this.container.querySelector('#gm-modal');
		const modalTitle = this.container.querySelector('#gm-modal-title');
		const modalBody = this.container.querySelector('#gm-modal-body');

		modalTitle.textContent = `Table: ${tableName}`;
		modalBody.innerHTML = `<em>${this.app.lang.get('gm.loading')}</em>`;
		modal.classList.add('active');

		try {
			const response = await this.app.api.get(`/admin/database/table/${tableName}`);
			
			if (response && response.success) {
				if (response.data && response.data.length > 0) {
					const columns = Object.keys(response.data[0]);
					
					modalBody.innerHTML = '';
					const table = cE({
						$el: 'table',
						$class: 'gm-modal-table',
						$childs: [
							{ $el: 'thead', $childs: [{ $el: 'tr', $childs: columns.map(col => ({ $el: 'th', $text: col })) }] },
							{ $el: 'tbody', $childs: response.data.map(row => ({
								$el: 'tr',
								$childs: columns.map(col => {
									let val = row[col];
									if (typeof val === 'object' && val !== null) val = JSON.stringify(val);
									return { $el: 'td', $text: (val !== undefined && val !== null) ? val.toString() : 'NULL' };
								})
							}))}
						],
						controller: this
					});
					modalBody.appendChild(table);
				} else {
					modalBody.innerHTML = '<p>Diese Tabelle enthält aktuell keine Einträge.</p>';
				}
			} else {
				modalBody.innerHTML = `<p>Fehler beim Laden: ${response.error || 'Unbekannter Fehler'}</p>`;
			}
		} catch (err) {
			console.error("ViewTable Error:", err);
			modalBody.innerHTML = '<p>Kritischer Netzwerkfehler beim Laden der Tabellendaten.</p>';
		}
	}

	closeModal() {
		const modal = this.container.querySelector('#gm-modal');
		if (modal) modal.classList.remove('active');
	}

	renderUserCard(user) {
		return cE({
			$el: 'div', $class: 'select-card-dynamic',
			$childs: [
				{ $el: 'div', $class: 'char-info',
					$childs: [
						{ $el: 'span', $class: 'card-title', $text: user.username },
						{ $el: 'small', $class: 'text-muted', $text: `Role: ${user.role} | Joined: ${new Date(user.created_at).toLocaleDateString()}` }
					]
				},
				{ $el: 'div', $class: 'char-action', $childs: [
					{ $el: 'button', $class: 'btn-small', $text: 'Make Admin', $onclick: () => this.changeRole(user.id, 'admin') }	
				]}
			]
		});
	}

	renderCharacterCard(char) {
		return cE({
			$el: 'div', $class: 'select-card-dynamic',
			$childs: [
				{ $el: 'div', $class: 'char-info',
					$childs: [
						{ $el: 'span', $class: 'card-title', $text: char.name },
						{ $el: 'small', $class: 'text-muted', $text: `Level: ${char.level} | Owner: ${char.owner_name}` }
					]
				},
				{ $el: 'div', $class: 'char-action', $childs: [
					{ $el: 'button', $class: ['btn-small', 'btn-danger'], $text: 'Delete', $onclick: () => this.deleteCharacter(char.uuid) }	
				]}
			]
		});
	}

	renderGuildCard(guild) {
		return cE({
			$el: 'div', $class: 'select-card-dynamic',
			$childs: [
				{ $el: 'div', $class: 'char-info',
					$childs: [
						{ $el: 'span', $class: 'card-title', $text: `${guild.name} [${guild.tag}]` },
						{ $el: 'small', $class: 'text-muted', $text: `Members: ${guild.memberCount || 0}` }
					]
				},
				{ $el: 'div', $class: 'char-action', $childs: [
					{ $el: 'button', $class: ['btn-small', 'btn-danger'], $text: 'Delete', $onclick: () => this.deleteGuild(guild.id) }	
				]}
			]
		});
	}

	async deleteCharacter(uuid) {
		if (!confirm('Are you sure you want to delete this character?')) return;
		try {
			const response = await this.app.api.delete(`/admin/characters/${uuid}`);
			if (response && response.success) await this.loadCharacters();
			else alert('Error deleting character.');
		} catch (err) {
			console.error("Error deleting character:", err);
		}
	}
	async createGuild(name, tag) {
		try {
			const response = await this.app.api.post('/admin/guilds', { name, tag });
			if (response && response.success) {
				await this.loadGuilds();
				this.container.querySelector('#create-guild-form').reset();
				this.container.querySelector('[data-tab="guilds-overview"]').click();
			} else {
				alert('Error creating guild.');
			}
		} catch (err) {
			console.error("Error creating guild:", err);
		}
	}

	async deleteGuild(guildId) {
		if (!confirm('Are you sure you want to delete this guild?')) return;
		try {
			const response = await this.app.api.delete(`/admin/guilds/${guildId}`);
			if (response && response.success) await this.loadGuilds();
			else alert('Error deleting guild.');
		} catch (err) {
			console.error("Error deleting guild:", err);
		}
	}

	async changeRole(userId, newRole) {
		try {
			const response = await this.app.api.post('/admin/users/role', { userId, role: newRole });
			if (response && response.success) {
				await this.loadUsers();
			} else {
				alert(this.app.lang.get('gm.role_update_error') || 'Error updating role.');
			}
		} catch (err) {
			console.error("Error changing role:", err);
		}
	}

	goBack() {
		this.app.stage.load('char-select');
	}
}
