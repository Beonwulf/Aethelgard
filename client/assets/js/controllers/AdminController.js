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
		this.container.querySelector('#stat-users').textContent = (await this.app.api.get('/admin/users')).data.length;
		this.container.querySelector('#stat-guilds').textContent = (await this.app.api.get('/admin/guilds')).data.length;
		this.container.querySelector('#stat-characters').textContent = '0'; // Placeholder
		this.container.querySelector('#stat-quests').textContent = '42'; // Placeholder
		this.container.querySelector('#stat-items').textContent = '256'; // Placeholder
		this.container.querySelector('#stat-npcs').textContent = '89'; // Placeholder
	}

	async loadWorldData() {
		console.log("Loading world data (e.g., server status)...");
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
		listContainer.innerHTML = '<p>Character list will be implemented in a future step.</p>';
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
		listContainer.innerHTML = '';
		const tables = ['users', 'characters', 'guilds', 'guild_members', 'items', 'npcs', 'quests'];
		tables.forEach(tableName => {
			const row = cE({
				$el: 'tr',
				$childs: [
					{ $el: 'td', $text: tableName },
					{ $el: 'td', $text: '...' },
					{ $el: 'td', $childs: [{ $el: 'button', $class: 'btn-small', $text: 'View' }] }
				]
			});
			listContainer.appendChild(row);
		});
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
