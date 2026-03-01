import { BaseController } from './BaseController.js';
import { cE } from '../utils/cE.js';

/**
 * Der Charakter-Editor von Aethelgard.
 * Hier werden Helden geschmiedet, bevor sie die Welt betreten.
 */
export class CharCreatorController extends BaseController {
	constructor($app) {
		super('char-creator', $app);
		this.currentStep = 1;
		this.maxSteps = 5;

		this.charData = {
			name: '',
			culture: 'kaiserliche',
			profession: 'krieger',
			attributes: { MU: 8, KL: 8, IN: 8, CH: 8, FF: 8, GE: 8, KO: 8, KK: 8 },
			skills: {},
			biography: []
		};

		this.attrPoints = 36;
		this.skillPoints = 50;
		this.masterData = null;
		this.rerolls = 3;
		this.appliedLifepathBonuses = [];
		this.legacy = null;
	}

	async onReady() {
		// 1. Stammdaten vom Server laden
		const response = await this.app.api.get('/game/master-data');
		if (response.success) {
			this.masterData = response.data;

			// Vermächtnis abrufen
			const charDataResponse = await this.app.auth.getCharacters();
			if (!Array.isArray(charDataResponse) && charDataResponse.legacy) {
				this.legacy = charDataResponse.legacy;
			}

			// Initiales Rendering
			this.renderCultureSelection();
			this.renderProfessionSelection();
			this.renderAttributePool();
			this.renderSkillPool();

			this.updateStepVisibility();
			this.updateDerivedStatsPreview();
		} else {
			console.error("Fehler beim Abruf der Welt-Chroniken.");
		}
	}

	async generateName() {
		try {
			// API-Aufruf für kulturspezifische Namen
			const response = await this.app.api.get('/game/names/' + this.charData.culture);
			if (response.success && response.data.length > 0) {
				const $list = response.data;
				const $randomIndex = Math.floor(Math.random() * $list.length);
				this.view.querySelector('#char-name').value = $list[$randomIndex];
			}
		} catch ($err) {
			console.error("Fehler beim Abruf der Namen vom Server:", $err);
		}
	}

	// --- LOGIK & NAVIGATION ---

	nextStep() {
		if (this.currentStep < this.maxSteps) {
			this.currentStep++;
			this.updateStepVisibility();
		} else {
			// Letzter Schritt: Hier validieren wir den Namen
			const nameInput = this.view.querySelector('#char-name');
			if (!nameInput.value || nameInput.value.trim().length < 3) {
				alert("Dein Held braucht einen würdigen Vornamen (mind. 3 Zeichen)!");
				return;
			}
			this.finish();
		}
	}

	prevStep() {
		if (this.currentStep > 1) {
			this.currentStep--;
			this.updateStepVisibility();
		}
	}

	updateStepVisibility() {
		const titles = [
			this.app.lang.get('creator.titles.1'),
			this.app.lang.get('creator.titles.2'),
			this.app.lang.get('creator.titles.3'),
			this.app.lang.get('creator.titles.4'),
			this.app.lang.get('creator.titles.5')
		];
		this.view.querySelector('#step-title').textContent = titles[this.currentStep - 1];

		this.view.querySelectorAll('.wizard-step').forEach(($el, $i) => {
			if ($i + 1 === this.currentStep) {
				$el.classList.remove('hidden');
			} else {
				$el.classList.add('hidden');
			}
		});

		this.view.querySelectorAll('.step-indicator').forEach(($el, $i) => {
			if ($i + 1 === this.currentStep) {
				$el.classList.add('active');
			} else {
				$el.classList.remove('active');
			}
		});

		const prevBtn = this.view.querySelector('#prev-btn');
		if (this.currentStep === 1) {
			prevBtn.classList.add('invisible');
		} else {
			prevBtn.classList.remove('invisible');
		}

		// In a real i18n, we might add these to char-creator.json
		// For now we assume they are accessible or fallback to these strings if missing
		this.view.querySelector('#next-btn').textContent = (this.currentStep === this.maxSteps) ? this.app.lang.get('char.btn_create', {}, "Held erschaffen") : "►";
	}

	// --- SCHICKSALSWEBER (LIFEPATH) ---

	rerollLifepath() {
		if (this.rerolls <= 0) return;
		this.rerolls--;
		this.generateLifepath();
	}

	generateLifepath() {
		if (!this.masterData || !this.masterData.lifepaths) return;

		if (this.appliedLifepathBonuses.length > 0) {
			this.appliedLifepathBonuses.forEach($b => {
				if ($b.attr) this.charData.attributes[$b.attr] -= $b.val;
				if ($b.skill) this.charData.skills[$b.skill] -= $b.val;
			});
			this.appliedLifepathBonuses = [];
		}

		const lp = this.masterData.lifepaths;
		const cult = this.charData.culture;
		const prof = this.charData.profession;

		const filterEvents = ($events) => {
			return $events.filter($e => {
				if (!$e.req) return true;
				if ($e.req.culture && !$e.req.culture.includes(cult)) return false;
				if ($e.req.profession && !$e.req.profession.includes(prof)) return false;
				return true;
			});
		};

		const availableOmens = filterEvents(lp.omens);
		const availableChildhood = filterEvents(lp.childhood);
		const availableEvents = filterEvents(lp.events);
		const availableEncounters = filterEvents(lp.encounters);

		const pickRandom = ($arr) => $arr[Math.floor(Math.random() * $arr.length)];

		const myOmen = pickRandom(availableOmens);
		const myChildhood = pickRandom(availableChildhood);
		const myEvent = pickRandom(availableEvents);
		const myEncounter = pickRandom(availableEncounters);

		this.charData.biography = [];
		const container = this.view.querySelector('#chronicle-container');
		container.innerHTML = '';

		const addEventToBio = ($evt, $index) => {
			if (!$evt) return;
			this.charData.biography.push($evt.id);

			if ($evt.bonus) {
				if ($evt.bonus.attr && this.charData.attributes[$evt.bonus.attr] !== undefined) {
					this.charData.attributes[$evt.bonus.attr] += $evt.bonus.val;
					this.appliedLifepathBonuses.push({ attr: $evt.bonus.attr, val: $evt.bonus.val });
				}
				if ($evt.bonus.skill) {
					const curVal = this.charData.skills[$evt.bonus.skill] || 0;
					this.charData.skills[$evt.bonus.skill] = curVal + $evt.bonus.val;
					this.appliedLifepathBonuses.push({ skill: $evt.bonus.skill, val: $evt.bonus.val });
				}
			}

			const currentLang = this.app.lang.currentLang || 'de';
			const localizedText = $evt.text[currentLang] || $evt.text['de'] || "Ein geheimnisvolles Ereignis...";

			const entry = cE({
				$el: 'p',
				$class: 'chronicle-entry',
				$text: localizedText
			});
			
			// Dynamic delay is set via style object property for security/CSP reasons
			entry.style.animationDelay = ($index * 1.5) + 's';
			
			container.appendChild(entry);
		};

		addEventToBio(myOmen, 0);
		addEventToBio(myChildhood, 1);
		addEventToBio(myEvent, 2);
		addEventToBio(myEncounter, 3);

		const weaveBtn = this.view.querySelector('#weave-btn');
		const rerollBtn = this.view.querySelector('#reroll-btn');

		if (weaveBtn) weaveBtn.classList.add('hidden');
		if (rerollBtn && this.rerolls > 0) {
			rerollBtn.classList.remove('hidden');
			rerollBtn.textContent = this.app.lang.get('creator.btn_reweave', { rerolls: this.rerolls });
		} else if (rerollBtn && this.rerolls === 0) {
			rerollBtn.classList.add('hidden');
		}

		this.renderAttributePool();
		this.renderSkillPool();
		this.updateDerivedStatsPreview();
	}

	// --- RENDERING METHODEN ---

	renderCultureSelection() {
		const container = this.view.querySelector('#culture-list');
		if (!container || !this.masterData) return;
		container.innerHTML = '';

		this.masterData.cultures.forEach($cult => {
			const card = cE({
				$el: 'div',
				$class: ['select-card', this.charData.culture === $cult.slug ? 'active' : ''],
				$onclick: () => this.selectCulture($cult.slug),
				$childs: [
					{ $el: 'span', $class: 'card-title', $text: $cult.name.de || $cult.slug },
					{ $el: 'small', $class: ['card-desc', 'text-muted'], $text: $cult.description?.de || $cult.aspect || '' }     
				]
			});
			container.appendChild(card);
		});
	}

	renderProfessionSelection() {
		const container = this.view.querySelector('#class-list');
		if (!container || !this.masterData) return;
		container.innerHTML = '';

		const selectedCulture = this.charData.culture;

		this.masterData.professions.forEach($prof => {
			let isAllowed = true;
			if ($prof.requirements && $prof.requirements.allowed_cultures) {
				isAllowed = $prof.requirements.allowed_cultures.includes(selectedCulture);
			}

			const card = cE({
				$el: 'div',
				$class: ['select-card', isAllowed ? '' : 'locked', this.charData.profession === $prof.slug ? 'active' : ''],
				$onclick: isAllowed ? () => this.selectProfession($prof.slug) : null,
				$childs: [
					{ $el: 'span', $class: 'card-title', $text: $prof.name.de || $prof.slug },
					{ $el: 'small', $class: ['card-desc', 'text-muted'], $text: $prof.energy_type ? 'Energie: ' + $prof.energy_type : 'Weltlich' },
					!isAllowed ? { $el: 'div', $class: 'restriction-note', $text: '(Kultur-Restriktion)' } : null
				]
			});
			container.appendChild(card);
		});
	}

	renderAttributePool() {
		const container = this.view.querySelector('#attr-pool');
		if (!container || !this.masterData) return;
		container.innerHTML = '';

		container.appendChild(cE({ $el: 'div', $class: 'points-left', $text: 'Verfügbare Punkte: ' + this.attrPoints }));    

		const selectedProf = this.masterData.professions.find($p => $p.slug === this.charData.profession);
		const profMods = selectedProf && selectedProf.attr_mods ? selectedProf.attr_mods : {};

		const attrDesc = {
			MU: "Mut - Wichtig für Initiative, Angriff und das Widerstehen von Furcht.",
			KL: "Klugheit - Bestimmt magische Energie (AsP) und Wissenstalente.",
			IN: "Intuition - Wichtig für Ausweichen, Fernkampf und Aufmerksamkeit.",
			CH: "Charisma - Beeinflusst NPC-Interaktionen und soziale Talente.",
			FF: "Fingerfertigkeit - Nützlich für Handwerk, Diebstahl und Präzision.",
			GE: "Gewandtheit - Bestimmt Geschwindigkeit, Parade und körperliche Talente.",
			KO: "Konstitution - Bestimmt Lebenspunkte (LeP), Ausdauer und Giftresistenz.",
			KK: "Körperkraft - Bestimmt Nahkampfschaden und Tragkraft."
		};

		Object.keys(this.charData.attributes).forEach($attr => {
			const isRecommended = profMods[$attr] !== undefined && profMods[$attr] > 0;
			const tooltipText = attrDesc[$attr] + (isRecommended ? "\n\n★ Besonders wichtig für deinen Beruf!" : "");   

			const row = cE({
				$class: 'attr-row',
				$childs: [
					{
						$el: 'div',
						$class: 'attr-label-box',
						$childs: [
							{ $el: 'span', $class: isRecommended ? ['attr-label', 'recommended'] : 'attr-label', $text: $attr },
							{ $el: 'span', $class: 'help-icon', $text: '?', $att: { 'data-tooltip': tooltipText } }
						]
					},
					{ $el: 'button', $class: 'btn-small', $text: '-', $onclick: () => this.modAttr($attr, -1) },  
					{ $el: 'span', $class: 'attr-value', $text: this.charData.attributes[$attr] },
					{ $el: 'button', $class: 'btn-small', $text: '+', $onclick: () => this.modAttr($attr, 1) }    
				]
			});
			container.appendChild(row);
		});
	}

	renderSkillPool() {
		const container = this.view.querySelector('#skill-pool');
		if (!container || !this.masterData) return;

		this.view.querySelector('#skill-points-left').textContent = 'Talentpunkte: ' + this.skillPoints;
		container.innerHTML = '';

		const categories = ['talent', 'kampf', 'koerper', 'gesellschaft', 'wissen', 'handwerk'];

		categories.forEach($cat => {
			const catSkills = this.masterData.skills.filter($s => $s.category === $cat);
			if (catSkills.length === 0) return;

			container.appendChild(cE({ $el: 'h3', $class: 'skill-cat-header', $text: $cat.toUpperCase() }));

			catSkills.forEach($skill => {
				const val = this.charData.skills[$skill.slug] || 0;
				const tooltipText = $skill.description?.de || "Ein Talent der Welt Aethelgard.";

				const row = cE({
					$class: 'skill-row',
					$childs: [
						{ $el: 'div', $class: 'skill-info', $childs: [
							{ $el: 'span', $class: ['skill-name', 'flex-align-center'], $childs: [
								{ $el: 'span', $text: $skill.name?.de || $skill.slug }, 
								{ $el: 'span', $class: ['help-icon', 'mr-8'], $text: '?', $att: { 'data-tooltip': tooltipText } }
							]},
							{ $el: 'small', $class: 'skill-check', $text: '(' + $skill.attr_check + ')' }      
						]},
						{ $el: 'button', $class: 'btn-small', $text: '-', $onclick: () => this.modSkill($skill.slug, -1) },
						{ $el: 'span', $class: 'skill-value', $text: val },
						{ $el: 'button', $class: 'btn-small', $text: '+', $onclick: () => this.modSkill($skill.slug, 1) }
					]
				});
				container.appendChild(row);
			});
		});
	}

	// --- AKTIONEN ---

	selectCulture($slug) {
		this.charData.culture = $slug;
		const currentProf = this.masterData.professions.find($p => $p.slug === this.charData.profession);
		if (currentProf && currentProf.requirements && currentProf.requirements.allowed_cultures) {
			if (!currentProf.requirements.allowed_cultures.includes($slug)) {
				this.charData.profession = null;
			}
		}

		this.renderCultureSelection();
		this.renderProfessionSelection();
		this.updateDerivedStatsPreview();
	}

	selectProfession($slug) {
		this.charData.profession = $slug;
		this.renderProfessionSelection();
		this.renderAttributePool();
		this.updateDerivedStatsPreview();
	}

	modAttr($attr, $delta) {
		const val = this.charData.attributes[$attr];
		if ($delta > 0 && (this.attrPoints <= 0 || val >= 14)) return;
		if ($delta < 0 && val <= 8) return;

		this.charData.attributes[$attr] += $delta;
		this.attrPoints -= $delta;
		this.renderAttributePool();
		this.updateDerivedStatsPreview();
	}

	modSkill($slug, $delta) {
		const val = this.charData.skills[$slug] || 0;
		if ($delta > 0 && this.skillPoints <= 0) return;
		if ($delta < 0 && val <= 0) return;

		this.charData.skills[$slug] = val + $delta;
		this.skillPoints -= $delta;
		this.renderSkillPool();
	}

	updateDerivedStatsPreview() {
		if (!this.masterData) return;

		const selectedProf = this.masterData.professions.find($p => $p.slug === this.charData.profession);
		const selectedCult = this.masterData.cultures.find($c => $c.slug === this.charData.culture);

		if (!selectedProf || !selectedCult) return;

		const lep = (selectedCult.base_stats?.LeP || 30) + this.charData.attributes.KO;
		this.view.querySelector('#lep-preview').textContent = 'LeP: ' + lep;

		const aspEl = this.view.querySelector('#asp-preview');
		const kapEl = this.view.querySelector('#kap-preview');

		if (selectedProf.energy_type === 'AsP') {
			const asp = (selectedProf.energy_base || 0) + this.charData.attributes.KL;
			aspEl.textContent = 'AsP: ' + asp;
			aspEl.classList.remove('hidden');
			kapEl.classList.add('hidden');
		} else if (selectedProf.energy_type === 'KaP') {
			kapEl.textContent = 'KaP: ' + (selectedProf.energy_base || 0);
			kapEl.classList.remove('hidden');
			aspEl.classList.add('hidden');
		} else {
			aspEl.classList.add('hidden');
			kapEl.classList.add('hidden');
		}
	}

	async finish() {
		this.charData.name = this.view.querySelector('#char-name').value.trim();
		
		// Falls wir ein Vermächtnis haben, hängen wir es im Backend-Format an
		const $fullname = this.legacy ? this.charData.name + '.' + this.legacy : this.charData.name;

		console.log("🛡️ Sende Heldendaten an den Bifröst...", this.charData, $fullname);

		try {
			const res = await this.app.api.post('/characters/create', { ...this.charData, fullname: $fullname });
			if (res.success) {
				this.app.stage.load('char-select');
			} else {
				alert("Fehler: " + (res.error || "Unbekannter Fehler"));
			}
		} catch ($err) {
			console.error("Kritischer Fehler bei der Heldenerschaffung:", $err);
		}
	}
}
