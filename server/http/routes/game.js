import { lifepaths } from '../../../data/mechanics/lifepath.js';

const nameLists = {
	kaiserliche: ['Alrik', 'Brin', 'Elwine', 'Gerbald', 'Ludalf', 'Valerius', 'Aldan', 'Bertold', 'Clara', 'Dietmar', 'Eberhardt', 'Friedhelm', 'Gisela', 'Helmar', 'Irmgard', 'Jago', 'Kunrad', 'Leuthold', 'Meinhard', 'Noble', 'Odwin', 'Perval', 'Quentin', 'Radul', 'Sighelm', 'Thalion', 'Ulfried', 'Volkan', 'Wolfram', 'Yorick', 'Answin', 'Bardo', 'Cunrad', 'Dankwart', 'Emeric', 'Firian', 'Gero', 'Hilbert', 'Idra', 'Jolenta', 'Kastor', 'Leomar', 'Mada', 'Nandor', 'Oswin', 'Praiodan', 'Rhoderich', 'Stordan', 'Tyal', 'Ucuri'],
	skjaldar: ['Bjarke', 'Sigrun', 'Torsten', 'Gunnar', 'Hilda', 'Ragnar', 'Arngrim', 'Bodvar', 'Dagmar', 'Egil', 'Frode', 'Gorm', 'Hakon', 'Inga', 'Joris', 'Kjell', 'Leif', 'Magnis', 'Njall', 'Orm', 'Rolf', 'Skoll', 'Toke', 'Ulf', 'Vidar', 'Yrsa', 'Asger', 'Brynja', 'Eir', 'Gudrid', 'Haldor', 'Ivar', 'Juvina', 'Kari', 'Lagertha', 'Manni', 'Narfi', 'Odin', 'Runa', 'Sif', 'Thora', 'Urd', 'Vali', 'Wotan'],
	zahiri: ['Zulir', 'Hashim', 'Samira', 'Azad', 'Leyla', 'Karim', 'Amira', 'Bashir', 'Dalia', 'Farid', 'Ghassan', 'Habiba', 'Idris', 'Jamil', 'Kalila', 'Latif', 'Muna', 'Nasir', 'Omar', 'Qasim', 'Rashid', 'Salma', 'Tariq', 'Uzma', 'Walid', 'Yasmin', 'Zein', 'Amina', 'Baraka', 'Farsad', 'Hamza', 'Imran', 'Javira', 'Khadija', 'Malik', 'Nadia', 'Rayan', 'Safia', 'Thabit', 'Zahra'],
	felsenzwerge: ['Gromm', 'Bhalduin', 'Xolbar', 'Thorax', 'Dwalin', 'Angrim', 'Balin', 'Durin', 'Eitri', 'Fafnir', 'Gloin', 'Hreidmar', 'Ivaldi', 'Kili', 'Loni', 'Modi', 'Narvi', 'Oinn', 'Pwalin', 'Regin', 'Stari', 'Thrain', 'Vitr', 'Yngvi', 'Bofur', 'Bombur', 'Dori', 'Nori', 'Ori', 'Thror', 'Thrain', 'Fundin', 'Gimli', 'Gloin'],
	tiefenzwerge: ['Mimir', 'Rungrim', 'Argon', 'Sindri', 'Farin', 'Alvis', 'Brokk', 'Dain', 'Elwin', 'Galar', 'Hanar', 'Isidor', 'Jari', 'Korin', 'Lurin', 'Mundil', 'Norvi', 'Ori', 'Porin', 'Rugni', 'Skafid', 'Telchar', 'Urdin', 'Vorin', 'Andvari', 'Dvalin', 'Eikin', 'Fid', 'Ginnar', 'Hlevang', 'Nyi', 'Sudri', 'Vestri'],
	feynir: ['Silas', 'Yara', 'Kaelen', 'Mika', 'Sanya', 'Arin', 'Belen', 'Cael', 'Dara', 'Eryn', 'Finn', 'Glyn', 'Hali', 'Ivor', 'Jora', 'Kael', 'Lira', 'Myra', 'Nael', 'Oryn', 'Pira', 'Rael', 'Sol', 'Teryn', 'Vael', 'Awen', 'Bran', 'Cern', 'Elowen', 'Gwen', 'Iona', 'Lugh', 'Mab', 'Niamh', 'Rhiannon', 'Taliesin'],
	lichtalben: ['Valariel', 'Elenor', 'Feyariel', 'Thalion', 'Galadriel', 'Amariel', 'Belanor', 'Celeborn', 'Daeron', 'Elowen', 'Finrod', 'Glorfindel', 'Haldir', 'Idril', 'Jael', 'Kellandros', 'Luthien', 'Mithrellas', 'Nimue', 'Oropher', 'Penelo', 'Quindel', 'Riluanel', 'Saeros', 'Tarondor', 'Aredhel', 'Ecthelion', 'Feanor', 'Gil-galad', 'Maedhros', 'Turgon'],
	nachtalben: ['Drizzt', 'Viconia', 'Malakor', 'Slythara', 'Zalre', 'Ardyn', 'Bael', 'Cyren', 'Drusilla', 'Eris', 'Falen', 'Geth', 'Hecate', 'Isil', 'Jarlaxle', 'Kiaransalee', 'Lolth', 'Malice', 'Nyx', 'Obould', 'Pharaun', 'Quenthel', 'Rizzen', 'Soseren', 'Tyryndar', 'Baenre', 'DoUrden', 'Mizzrym', 'Oblodra'],
	nordfolk: ['Erik', 'Freya', 'Olaf', 'Svenja', 'Leif', 'Astrid', 'Bjorn', 'Dagny', 'Eirik', 'Gudrun', 'Harald', 'Ingeborg', 'Jarl', 'Kari', 'Liv', 'Magnus', 'Nils', 'Olav', 'Runa', 'Solveig', 'Thor', 'Ulrik', 'Viggo', 'Walda', 'Ansgar', 'Einar', 'Geir', 'Helga', 'Ivar', 'Knut', 'Odd', 'Sverre', 'Tove'],
	suedbund: ['Mercuris', 'Caius', 'Lucia', 'Silvan', 'Flavia', 'Aurelius', 'Balbus', 'Cassia', 'Decimus', 'Ennia', 'Fabius', 'Gratian', 'Horatius', 'Julia', 'Livius', 'Marcus', 'Nero', 'Octavia', 'Pontius', 'Quintus', 'Rufus', 'Servius', 'Titus', 'Valens', 'Antonius', 'Claudius', 'Hadrianus', 'Lucius', 'Maximus', 'Tiberius']
};

/**
 * Routen für allgemeine Spiel-Daten (World State, Metadaten).
 * Wird automatisch vom Router geladen.
 */
export default function($bifrost, $db) {

	// 1. MASTER DATA ABRUFEN
	// Diese Daten braucht das Frontend z.B. für die Charaktererstellung
	$bifrost.get('/api/game/master-data', async ($req, $res) => {
		try {
			const cultures = await $db('cultures').select('*');
			const professions = await $db('professions').select('*');
			const skills = await $db('skills').select('*');

			$res.json({
				success: true,
				data: {
					cultures,
					professions,
					skills,
					lifepaths // NEU: Lebenspfad-Daten an das Frontend senden!
				}
			});
		} catch ($err) {
			console.error("Fehler beim Laden der Master-Data:", $err);
			$res.error("Die Chroniken von Aethelgard sind momentan unleserlich.");
		}
	});

	// 2. KULTUR-SPEZIFISCHE NAMEN ABRUFEN
	// Da der Bifrost-Router exakte Pfade erfordert, registrieren wir die Route für jede Kultur einzeln
	Object.keys(nameLists).forEach(culture => {
		$bifrost.get('/api/game/names/' + culture, async ($req, $res) => {
			try {
				const names = nameLists[culture];
				$res.json({
					success: true,
					data: names
				});
			} catch ($err) {
				console.error("Fehler beim Laden der Namen für " + culture + ":", $err);
				$res.error("Konnte keine Namen generieren.");
			}
		});
	});

}
