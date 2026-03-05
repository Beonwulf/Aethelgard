import { BaseController } from './BaseController.js';

const CULTURES = [
	{
		slug: 'kaiserliche', name: 'Kaiserliche', img: 'imperial.png',
		attrs: 'Ausgeglichen',
		lp: '30', mana: '0',
		desc: 'Die Erben der alten Reiche im Zentrum Aethelgards. Diszipliniert, stolz und dem Gesetz des Lichtbringers treu. Ihre Rüstungen tragen die Adler-Schwingen Solans.',
	},
	{
		slug: 'skjaldar', name: 'Skjaldar', img: 'skjaldar.png',
		attrs: 'KO+2, KK+1, MU+1, KL-1',
		lp: '35', mana: '0',
		desc: 'Kinder der Stürme und Fjorde. Ein Volk von Seefahrern, die den Tod nicht fürchten, solange sie mit dem Schwert in der Hand fallen.',
	},
	{
		slug: 'zahiri', name: 'Zahiri', img: 'zahiri002.png',
		attrs: 'IN+1, CH+1, KL+1, KO-1',
		lp: '28', mana: '5',
		desc: 'Wanderer der ewigen Dünen. Sie hüten das Wissen der Sterne und beherrschen die flüsternde Magie des Sandes.',
	},
	{
		slug: 'felsenzwerge', name: 'Felsenzwerge', img: 'rockdwarf.png',
		attrs: 'KO+2, KK+1, GE-1, CH-1',
		lp: '35', mana: '0',
		desc: 'Tief in den Wurzeln der Welt schmieden sie den besten Stahl Aethelgards. Starrköpfig wie der Stein, in dem sie leben.',
	},
	{
		slug: 'tiefenzwerge', name: 'Tiefenzwerge', img: 'deepdwarf.png',
		attrs: 'KO+1, KK+1, KL+1, GE-1',
		lp: '32', mana: '0',
		desc: 'Die Bewahrer der Runen und der Geschichte. Sie graben tiefer als alle anderen nach den Geheimnissen der Erde.',
	},
	{
		slug: 'feynir', name: 'Feynir', img: 'feynir.png',
		attrs: 'IN+2, GE+1, KK-1',
		lp: '30', mana: '0',
		desc: 'Ein Naturvolk der weiten Steppen und Wälder. Sie bewegen sich wie Schatten und sprechen die Sprache der Wölfe. Besitzen die Fähigkeit zur Tiergestalt.',
	},
	{
		slug: 'lichtalben', name: 'Lichtalben', img: 'lightelf.png',
		attrs: 'KL+2, IN+1, CH+1, KO-2',
		lp: '26', mana: '15',
		desc: 'Einstige Herrscher über die Ätherwinde. Ihre Aura ist strahlend, doch ihre Herzen sind oft so kühl wie das Sternenlicht.',
	},
	{
		slug: 'nachtalben', name: 'Nachtalben', img: 'darknightelf.png',
		attrs: 'MU+1, KL+1, GE+2, CH-2',
		lp: '28', mana: '10',
		desc: 'Sie wählten die Dunkelheit unter den Bergen und die verbotenen Pfade der Magie. Gejagt, gefürchtet und gnadenlos.',
	},
	{
		slug: 'nordfolk', name: 'Nordfolk', img: 'nordfolk.png',
		attrs: 'KO+1, KK+1',
		lp: '32', mana: '0',
		desc: 'Durch den ewigen Winter abgehärtete Krieger und Jäger des hohen Nordens. Überleben ist keine Frage des Willens, sondern des Instinkts.',
	},
	{
		slug: 'suedbund', name: 'Südbund', img: 'suedbund.png',
		attrs: 'KL+1, CH+1',
		lp: '28', mana: '0',
		desc: 'Diplomaten, Gelehrte und Händler – das kulturelle Herz Aethelgards. Wer Wissen als Waffe begreift, ist unter ihnen zu Hause.',
	},
	{
		slug: 'wurzelvolk', name: 'Wurzelvolk', img: 'wurzelvolk.png',
		attrs: 'KO+3, KK+2, GE-2, CH-1',
		lp: '40', mana: '0',
		desc: 'Uralte lebende Baumwesen, die seit Äonen die Wälder von Yldra bewachen. Wer einem Wurzelvolk begegnet, erzählt davon noch seinen Enkeln.',
	},
	{
		slug: 'gnomolk', name: 'Gnomolk', img: 'gnomolk.png',
		attrs: 'KL+3, FF+2, IN+1, KK-2, KO-1',
		lp: '26', mana: '0',
		desc: 'Kleine bipedale Eisbärwesen, kaum einen Meter groß, mit einem Hang zu Dampfmaschinen und unbeirrbarem Selbstvertrauen. Niemand weiß, woher sie kommen.',
	},
];

export class CulturesController extends BaseController {

	constructor(app) {
		super('cultures', app);
	}

	handleBack()        { this.app.stage.load('landing'); }
	handleCalling() { this.app.stage.load('calling'); }
	handleWorld()       { this.app.stage.load('world'); }

	onReady() {
		this._buildCards();
	}

	_buildCards() {
		const grid = this.container.querySelector('#cultures-detail-grid');
		if (!grid) return;

		CULTURES.forEach(c => {
			const card = document.createElement('div');
			card.className = 'culture-detail-card';

			card.innerHTML = `
				<div class="cdc-img-wrap">
					<img src="/assets/images/cultures/${c.img}" alt="${c.name}" class="cdc-img" loading="lazy">
				</div>
				<div class="cdc-body">
					<h2 class="cdc-name">${c.name}</h2>
					<p class="cdc-desc">${c.desc}</p>
					<div class="cdc-stats">
						<span class="cdc-stat"><em>Attribute:</em> ${c.attrs}</span>
						<span class="cdc-stat"><em>LeP:</em> ${c.lp} &nbsp;|&nbsp; <em>Mana:</em> ${c.mana}</span>
					</div>
				</div>
			`;
			grid.appendChild(card);
		});
	}

	destroy() {
		super.destroy();
	}

	handleTalents()  { this.app.stageManager.load('talents'); }
}
