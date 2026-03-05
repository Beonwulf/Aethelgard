import { BaseController } from './BaseController.js';
import { cE } from '../utils/cE.js';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { CharacterCreater3d } from '../utils/CharacterCreater3d.js';


/**
 * Der Charakter-Editor von Aethelgard.
 * Hier werden Helden geschmiedet, bevor sie die Welt betreten.
 */
export class CharCreatorController extends BaseController {
	constructor($app) {
		super('char-creator', $app);
		this.currentStep = 1;
		this.maxSteps = 5;

		// Basis-Werte (Alles auf 8)
		this.baseAttributes = { MU: 8, KL: 8, IN: 8, CH: 8, FF: 8, GE: 8, KO: 8, KK: 8 };
		
		// Vom User manuell investierte Punkte
		this.investedAttributes = { MU: 0, KL: 0, IN: 0, CH: 0, FF: 0, GE: 0, KO: 0, KK: 0 };
		this.investedSkills = {};

		this.charData = {
			name: '',
			culture: 'kaiserliche',
			profession: 'krieger',
			attributes: { ...this.baseAttributes },
			skills: {},
			biography: []
		};

		this.attrPointsPool = 36;
		this.skillPointsPool = 50;
		this.masterData = null;
		this.rerolls = 3;
		this.appliedLifepathBonuses = [];
		this.legacy = null;
		
		// 3D Rendering variables
		this.scene = null;
		this.camera = null;
		this.renderer = null;
		this.model = null;
		this.animationId = null;
	}

	async onReady() {
		// Init 3D Scene
		this.init3DScene();
		this.updateBackground();

		// 1. Stammdaten vom Server laden
		const response = await this.app.api.get('/game/master-data');
		if (response.success) {
			this.masterData = response.data;

			// Vermächtnis abrufen
			const charDataResponse = await this.app.auth.getCharacters();
			if (!Array.isArray(charDataResponse) && charDataResponse.legacy) {
				this.legacy = charDataResponse.legacy;
			}

			// Initial einmal alles berechnen
			this.recalculateAll();

			// Initiales Rendering
			this.renderCultureSelection();
			this.renderProfessionSelection();
			this.renderAttributePool();
			this.renderSkillPool();

			this.updateStepVisibility();
		} else {
			console.error("Fehler beim Abruf der Welt-Chroniken.");
		}
	}
	
	init3DScene() {
		this.characterCreater3d = new CharacterCreater3d('creator-canvas', this.view);
		/*
		const canvas = this.view.querySelector('#creator-canvas');
		if (!canvas) return;

		const parent = canvas.parentElement;
		
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(45, parent.clientWidth / parent.clientHeight, 0.1, 100);
		this.camera.position.set(0, 1.2, 4);

		this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
		this.renderer.setSize(parent.clientWidth, parent.clientHeight);
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

		// Beleuchtung
		const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
		this.scene.add(ambientLight);

		const dirLight = new THREE.DirectionalLight(0xffeedd, 1);
		dirLight.position.set(2, 5, 3);
		this.scene.add(dirLight);

		// Modell laden
		const loader = new GLTFLoader();
		loader.load('/assets/models/dummy.glb', (gltf) => {
			this.model = gltf.scene;
			console.log("3D-Modell erfolgreich geladen:", gltf);
			// Das Modell leicht nach unten und vorne rotieren für eine bessere Präsentation
			this.model.position.set(0, -1, 0); 
			this.scene.add(this.model);
		}, undefined, (error) => {
			console.error("Fehler beim Laden des 3D-Modells:", error);
		});

		// Resize Event für dieses Layout
		this.resizeHandler = () => {
			if (!parent) return;
			this.camera.aspect = parent.clientWidth / parent.clientHeight;
			this.camera.updateProjectionMatrix();
			this.renderer.setSize(parent.clientWidth, parent.clientHeight);
		};
		window.addEventListener('resize', this.resizeHandler);

		const renderLoop = () => {
			if (!this.renderer) return;
			this.animationId = requestAnimationFrame(renderLoop);
			
			if (this.model) {
				// Leichtes Drehen zur Präsentation
				this.model.rotation.y += 0.005;
			}
			
			this.renderer.render(this.scene, this.camera);
		};
		renderLoop();*/
	}

	updateBackground() {
		const bg = this.view.querySelector('#creator-bg');
		if (bg) {
			// Wir nutzen ein Fallback auf das alte Bild, wenn kein spezifisches exisitert
			// Später kann hier `/assets/images/cultures/${this.charData.culture}.jpg` verwendet werden.
			bg.style.backgroundImage = `url('/assets/images/cultures/${this.charData.culture}.jpg'), url('/assets/images/bifrostark_loginscreen.jpg')`;
		}
	}

	destroy() {
		if (this.animationId) cancelAnimationFrame(this.animationId);
		if (this.renderer) this.renderer.dispose();
		if (this.resizeHandler) window.removeEventListener('resize', this.resizeHandler);
		super.destroy();
	}

	// --- Kamera-Fokus ---

	focusHead()  { this._focusOn('head'); }
	focusTorso() { this._focusOn('torso'); }
	focusLegs()  { this._focusOn('legs'); }
	focusBody()  { this._focusOn('body'); }

	_focusOn($part) {
		if (!this.characterCreater3d) return;
		this.characterCreater3d.focusOn($part);

		// Aktiven Button hervorheben
		this.container.querySelectorAll('.btn-focus').forEach($btn => $btn.classList.remove('active'));
		const activeBtn = this.container.querySelector(`.btn-focus[data-action="${$part}"]`);
		if (activeBtn) activeBtn.classList.add('active');
	}

	/**
	 * Berechnet alle Finalen Werte basierend auf Basis + Investition + Berufsanforderungen
	 */
	recalculateAll() {
		if (!this.masterData) return;

		const prof = this.masterData.professions.find($p => $p.slug === this.charData.profession);
		const cult = this.masterData.cultures.find($c => $c.slug === this.charData.culture);

		// 1. ATTRIBUTE
		let usedAttrPoints = 0;
		Object.keys(this.baseAttributes).forEach($attr => {
			let val = this.baseAttributes[$attr] + this.investedAttributes[$attr];
			
			// Berufsanforderungen (Minimums)
			if (prof && prof.requirements?.min_attributes?.[$attr]) {
				const min = prof.requirements.min_attributes[$attr];
				if (val < min) {
					// Wenn der Wert unter dem Minimum liegt, "erzwingen" wir ihn
					// Die Differenz zwischen (Basis+Invest) und Minimum kostet zusätzliche Punkte
					const forceDiff = min - val;
					usedAttrPoints += forceDiff;
					val = min;
				}
			}

			// Kultur-Modifikatoren (Boni/Mali)
			if (cult && cult.attr_mods?.[$attr]) {
				val += cult.attr_mods[$attr];
			}

			// Berufs-Modifikatoren (Boni/Mali)
			if (prof && prof.attr_mods?.[$attr]) {
				val += prof.attr_mods[$attr];
			}

			this.charData.attributes[$attr] = val;
			usedAttrPoints += this.investedAttributes[$attr];
		});
		this.attrPoints = this.attrPointsPool - usedAttrPoints;

		// 2. SKILLS
		this.charData.skills = {};
		let usedSkillPoints = 0;

		// Start-Skills vom Beruf
		if (prof && prof.start_skills) {
			Object.entries(prof.start_skills).forEach(([$slug, $val]) => {
				this.charData.skills[$slug] = $val;
			});
		}

		// Manuell investierte Skill-Punkte
		Object.entries(this.investedSkills).forEach(([$slug, $val]) => {
			const startVal = this.charData.skills[$slug] || 0;
			this.charData.skills[$slug] = startVal + $val;
			usedSkillPoints += $val;
		});
		this.skillPoints = this.skillPointsPool - usedSkillPoints;

		this.updateDerivedStatsPreview();
	}

	getSkillLevelLabel($val) {
		if ($val <= 4)  return "Unwissender";
		if ($val <= 6)  return "Lehrling";
		if ($val <= 10) return "Geselle";
		if ($val <= 14) return "Altgeselle";
		if ($val <= 18) return "Fachmann";
		if ($val <= 22) return "Meister";
		return "Großmeister";
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

		this.view.querySelector('#next-btn').textContent = (this.currentStep === this.maxSteps) ? this.app.lang.get('char.btn_create', {}, "Held erschaffen") : "►";

		const overlay = this.view.querySelector('#wizard-overlay-container');
		if (overlay) {
			if (this.currentStep === 1 || this.currentStep === 2) {
				overlay.classList.add('hidden');
			} else {
				overlay.classList.remove('hidden');
			}
		}
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
				if ($b.attr) this.investedAttributes[$b.attr] -= $b.val;
				if ($b.skill) {
					const curInvest = this.investedSkills[$b.skill] || 0;
					this.investedSkills[$b.skill] = Math.max(0, curInvest - $b.val);
				}
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
				if ($evt.bonus.attr && this.investedAttributes[$evt.bonus.attr] !== undefined) {
					this.investedAttributes[$evt.bonus.attr] += $evt.bonus.val;
					this.appliedLifepathBonuses.push({ attr: $evt.bonus.attr, val: $evt.bonus.val });
				}
				if ($evt.bonus.skill) {
					const curVal = this.investedSkills[$evt.bonus.skill] || 0;
					this.investedSkills[$evt.bonus.skill] = curVal + $evt.bonus.val;
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

		this.recalculateAll();
		this.renderAttributePool();
		this.renderSkillPool();
	}

	// --- RENDERING METHODEN ---

	renderCultureSelection() {
		const container = this.view.querySelector('#culture-list');
		if (!container || !this.masterData) return;
		container.innerHTML = '';

		const tooltipText = this.app.lang.get('creator.btn_details') || "Details anzeigen";

		this.masterData.cultures.forEach($cult => {
			const card = cE({
				$el: 'div',
				$class: ['select-card', this.charData.culture === $cult.slug ? 'active' : ''],
				$onclick: () => this.selectCulture($cult.slug),
				$onmouseover: () => this.updateInfoDesc($cult),
				$childs: [
					{ $class: 'select-card-header', $childs: [
						{ $el: 'span', $class: 'card-title', $text: $cult.name.de || $cult.slug },
						{ $el: 'span', $class: 'help-icon', $att: { 'data-tooltip': tooltipText }, $text: '?', $onclick: ($e) => { $e.stopPropagation(); this.openDetails($cult); } }
					]}
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
		const tooltipText = this.app.lang.get('creator.btn_details') || "Details anzeigen";

		this.masterData.professions.forEach($prof => {
			let isAllowed = true;
			if ($prof.requirements && $prof.requirements.allowed_cultures) {
				isAllowed = $prof.requirements.allowed_cultures.includes(selectedCulture);
			}

			const card = cE({
				$el: 'div',
				$class: ['select-card', isAllowed ? '' : 'locked', this.charData.profession === $prof.slug ? 'active' : ''],
				$onclick: isAllowed ? () => this.selectProfession($prof.slug) : null,
				$onmouseover: () => this.updateInfoDesc($prof),
				$childs: [
					{ $class: 'select-card-header', $childs: [
						{ $el: 'span', $class: 'card-title', $text: $prof.name.de || $prof.slug },
						{ $el: 'span', $class: 'help-icon', $att: { 'data-tooltip': tooltipText }, $text: '?', $onclick: ($e) => { $e.stopPropagation(); this.openDetails($prof); } }
					]},
					!isAllowed ? { $el: 'div', $class: 'restriction-note', $text: '(Kultur-Restriktion)' } : null
				]
			});
			container.appendChild(card);
		});
	}

	renderAttributePool() {
		const container = this.view.querySelector('#attr-pool');
		if (!container) return;
		container.innerHTML = '';

		const pointsLabel = cE({ 
			$el: 'div', 
			$class: ['points-left', this.attrPoints < 0 ? 'text-danger' : ''], 
			$text: `Verfügbare Attributpunkte: ${this.attrPoints}` 
		});
		container.appendChild(pointsLabel);

		const attrDescs = {
			MU: "Mut: Willenskraft, Furchtlosigkeit und Entschlossenheit.",
			KL: "Klugheit: Logisches Denken, Gedächtnis und Wissen.",
			IN: "Intuition: Menschenkenntnis, Instinkt und Aufmerksamkeit.",
			CH: "Charisma: Ausstrahlung, Überzeugungskraft und Führungstalent.",
			FF: "Fingerfertigkeit: Handwerkliches Geschick und Präzision.",
			GE: "Gewandtheit: Beweglichkeit, Balance und Reflexe.",
			KO: "Konstitution: Ausdauer, Widerstandskraft und Zähigkeit.",
			KK: "Körperkraft: Muskelkraft, Wucht und Tragkraft."
		};

		Object.keys(this.charData.attributes).forEach($attr => {
			const val = this.charData.attributes[$attr];
			const row = cE({
				$class: 'attr-row',
				$childs: [
					{ $el: 'div', $class: 'attr-label-box', $childs: [
						{ $el: 'span', $class: 'attr-label', $text: $attr },
						{ $el: 'span', $class: 'help-icon', $att: { 'data-tooltip': attrDescs[$attr] || '' }, $text: '?' },
						{ $el: 'small', $class: 'text-muted', $text: val >= 12 ? ' (Herausragend)' : '' }
					]},
					{ $el: 'button', $class: 'btn-small', $text: '-', $onclick: () => this.modAttr($attr, -1) },
					{ $el: 'span', $class: 'attr-value', $text: val },
					{ $el: 'button', $class: 'btn-small', $text: '+', $onclick: () => this.modAttr($attr, 1) }
				]
			});
			container.appendChild(row);
		});
	}

	renderSkillPool() {
		const container = this.view.querySelector('#skill-pool');
		if (!container || !this.masterData) return;

		const pointsDisplay = this.view.querySelector('#skill-points-left');
		pointsDisplay.textContent = `Talentpunkte: ${this.skillPoints}`;
		pointsDisplay.className = this.skillPoints < 0 ? 'text-danger' : '';
		
		container.innerHTML = '';

		const categories = ['kampf', 'koerper', 'gesellschaft', 'wissen', 'handwerk'];

		categories.forEach($cat => {
			const catSkills = this.masterData.skills.filter($s => $s.category === $cat);
			if (catSkills.length === 0) return;

			container.appendChild(cE({ $el: 'h4', $class: 'skill-cat-header', $text: $cat.toUpperCase() }));

			catSkills.forEach($skill => {
				const val = this.charData.skills[$skill.slug] || 0;
				const levelLabel = this.getSkillLevelLabel(val);

				const row = cE({
					$class: 'skill-row',
					$childs: [
						{ $el: 'div', $class: 'skill-info', $childs: [
							{ $el: 'span', $class: 'skill-name', $text: $skill.name.de },
							{ $el: 'small', $class: 'skill-level-tag', $text: levelLabel }
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

	updateInfoDesc($item) {
		const infoDesc = this.view.querySelector('#info-desc');
		if (!infoDesc) return;
		
		const name = $item.name?.de || $item.slug;
		const tooltipText = this.app.lang.get('creator.btn_details') || "Details anzeigen";
		infoDesc.innerHTML = `<strong>${name}</strong><br><br>Klicke auf das '?', um ${tooltipText.toLowerCase()}.`;
	}

	openDetails($item) {
		const panel = this.view.querySelector('#details-panel');
		const content = this.view.querySelector('#details-content');
		if (!panel || !content) return;

		const name = $item.name?.de || $item.slug;
		const desc = $item.description?.de || $item.aspect || "Keine weitere Beschreibung verfügbar.";
		
		content.innerHTML = `
			<h2 class="skill-cat-header" style="margin-top:0">${name}</h2>
			<div class="text-muted" style="line-height:1.6; font-size:1.1em;">
				${desc.replace(/\n/g, '<br>')}
			</div>
		`;

		panel.classList.add('active');
	}

	closeDetails() {
		const panel = this.view.querySelector('#details-panel');
		if (panel) panel.classList.remove('active');
	}

	selectCulture($slug) {
		this.charData.culture = $slug;
		this.recalculateAll();
		this.renderCultureSelection();
		this.renderProfessionSelection();
		this.renderAttributePool();
		this.renderSkillPool();
	}

	selectProfession($slug) {
		this.charData.profession = $slug;
		// Wir setzen die investierten Skills zurück, wenn der Beruf wechselt
		this.investedSkills = {}; 
		this.recalculateAll();
		this.renderProfessionSelection();
		this.renderAttributePool();
		this.renderSkillPool();
	}

	modAttr($attr, $delta) {
		const currentInvest = this.investedAttributes[$attr];
		if ($delta > 0 && (this.attrPoints <= 0 || (this.baseAttributes[$attr] + currentInvest) >= 14)) return;
		if ($delta < 0 && currentInvest <= 0) return;

		this.investedAttributes[$attr] += $delta;
		this.recalculateAll();
		this.renderAttributePool();
	}

	modSkill($slug, $delta) {
		const currentInvest = this.investedSkills[$slug] || 0;
		if ($delta > 0 && this.skillPoints <= 0) return;
		if ($delta < 0 && currentInvest <= 0) return;

		this.investedSkills[$slug] = currentInvest + $delta;
		this.recalculateAll();
		this.renderSkillPool();
	}

	updateDerivedStatsPreview() {
		if (!this.masterData) return;

		const selectedProf = this.masterData.professions.find($p => $p.slug === this.charData.profession);
		const selectedCult = this.masterData.cultures.find($c => $c.slug === this.charData.culture);

		if (!selectedProf || !selectedCult) return;

		const hpLabel = this.app.lang.currentLang === 'en' ? 'HP' : 'LP';
		const lep = (selectedCult.base_stats?.LeP || 30) + this.charData.attributes.KO;
		this.view.querySelector('#lep-preview').textContent = hpLabel + ': ' + lep;

		const aspEl = this.view.querySelector('#asp-preview');
		const kapEl = this.view.querySelector('#kap-preview');

		if (selectedProf.energy_type === 'AsP' || selectedProf.energy_type === 'Mana') {
			const asp = (selectedProf.energy_base || 0) + this.charData.attributes.KL;
			aspEl.textContent = 'AsP: ' + asp;
			aspEl.classList.remove('hidden');
			kapEl.classList.add('hidden');
		} else if (selectedProf.energy_type === 'KaP' || selectedProf.energy_type === 'Gunst') {
			kapEl.textContent = 'KaP: ' + (selectedProf.energy_base || 0);
			kapEl.classList.remove('hidden');
			aspEl.classList.add('hidden');
		} else {
			aspEl.classList.add('hidden');
			kapEl.classList.add('hidden');
		}

		const infoDesc = this.view.querySelector('#info-desc');
		if (infoDesc) {
			const cultName = selectedCult.name?.de || selectedCult.slug;
			const profName = selectedProf.name?.de || selectedProf.slug;
			const tooltipText = this.app.lang.get('creator.btn_details') || "Details anzeigen";
			infoDesc.innerHTML = `<strong>${profName} der Kultur ${cultName}</strong><br><br>Klicke auf das '?', um ${tooltipText.toLowerCase()}.`;
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
