/**
 * Alle Routen, die mit der Verwaltung von Helden zu tun haben.
 * Wird automatisch vom Router geladen.
 */
export default function($bifrost, $db) {

	// 1. ALLE CHARAKTERE ABRUFEN (inkl. Vermächtnis)
	$bifrost.get('/api/characters', async ($req, $res) => {
		try {
			// Vermächtnis des Accounts abrufen
			const user = await $db('users').where('id', $req.user.id).select('legacy_name').first();
			
			const heroes = await $db('characters')
				.where('user_id', $req.user.id)
				.select('uuid', 'name', 'level', 'position', 'rotation');
				
			$res.json({
				characters: heroes,
				legacy: user.legacy_name
			});
		} catch ($err) {
			console.error($err);
			$res.error('Fehler beim Laden der Helden-Chroniken.', 500);
		}
	});

	// 2. VERMÄCHTNIS (LEGACY) ANLEGEN
	$bifrost.post('/api/characters/legacy', async ($req, $res) => {
		const { legacy } = $req.body;

		if (!legacy || legacy.length < 3) {
			return $res.error("Das Vermächtnis muss mindestens 3 Zeichen lang sein.", 400);
		}

		try {
			// Prüfen, ob der Name weltweit schon vergeben ist
			const exists = await $db('users').where({ legacy_name: legacy }).first();
			if (exists) {
				return $res.error("Dieses Vermächtnis wurde bereits von einer anderen Dynastie beansprucht.", 400);
			}

			// Vermächtnis beim User speichern
			await $db('users').where('id', $req.user.id).update({ legacy_name: legacy });

			$res.json({ success: true, message: 'Dein Vermächtnis wurde in den Sternen verewigt.' });
		} catch ($err) {
			console.error("Fehler beim Erstellen des Vermächtnisses:", $err);
			$res.error("Die Götter konnten dein Vermächtnis nicht empfangen.", 500);
		}
	});

	// 3. CHARAKTER ERSTELLEN
	$bifrost.post('/api/characters/create', async ($req, $res) => {
		const { fullname, profession, culture, attributes, skills, biography } = $req.body;

		// Client sendet fullname ("Vorname.Vermächtnis" oder nur "Vorname")
		if (!fullname) return $res.error("Ein Held braucht einen Namen.", 400);

		try {
			// Check ob Name frei ist
			const exists = await $db('characters').where('name', fullname).first();
			if (exists) return $res.error("Dieser Name ist bereits in den Legenden verzeichnet.", 400);

			await $db.transaction(async $tr => {
				// 1. Charakter in der Haupttabelle anlegen
				const [newChar] = await $tr('characters').insert({
					user_id: $req.user.id,
					name: fullname, // Wir speichern den kombinierten Namen
					profession, // Slug
					culture,    // Slug
					attributes: JSON.stringify(attributes || {}),
					biography: JSON.stringify(biography || []),
					position: { x: 111883, y: 0, z: 50198 },
					rotation: { x: 0, y: 0, z: 0 }
				}).returning('*');

				// 2. Skills speichern
				// Da der Client Slugs sendet, müssen wir die IDs aus der 'skills' Tabelle holen
				if (skills && Object.keys(skills).length > 0) {
					const skillSlugs = Object.keys(skills);
					
					// Alle benötigten Skill-IDs in einem Rutsch abfragen
					const skillDbEntries = await $tr('skills').whereIn('slug', skillSlugs).select('id', 'slug');
					
					const skillInserts = skillDbEntries.map($s => ({
						character_id: newChar.id,
						skill_id: $s.id,
						value: skills[$s.slug]
					}));

					if (skillInserts.length > 0) {
						await $tr('character_skills').insert(skillInserts);
					}
				}
			});

			$res.json({ success: true, message: 'Ein neuer Held betritt Aethelgard.' });
		} catch ($err) {
			console.error("Fehler bei Charaktererstellung:", $err);
			$res.error("Fehler beim Einsegnen des Helden.", 500);
		}
	});

	// 4. CHARAKTER LÖSCHEN
	$bifrost.delete('/api/characters/remove', async ($req, $res) => {
		const { uuid } = $req.body;
		try {
			const deleted = await $db('characters').where({ uuid, user_id: $req.user.id }).del();
			if (deleted) {
				$res.json({ success: true, message: 'Held ist nach Walhalla eingegangen.' });
			} else {
				$res.error('Held konnte nicht gefunden werden.', 404);
			}
		} catch ($err) {
			console.error($err);
			$res.error('Ein dunkler Zauber verhinderte das Löschen.', 500);
		}
	});

	// 5. ABENTEUERPUNKTE HINZUFÜGEN
	$bifrost.patch('/api/characters/add-ap', async ($req, $res) => {
		const { charUuid, apToAdd } = $req.body;
		if (!charUuid || !apToAdd || apToAdd <= 0) return $res.error('Ungültige AP-Angabe.', 400);

		try {
			const updated = await $db('characters').where({ uuid: charUuid, user_id: $req.user.id }).increment('ap_total', apToAdd);
			if (updated) {
				const char = await $db('characters').where('uuid', charUuid).first();
				$res.json({ success: true, newTotal: char.ap_total });
			} else {
				$res.error('Held nicht gefunden.', 404);
			}
		} catch ($err) {
			console.error($err);
			$res.error('AP-Update fehlgeschlagen.', 500);
		}
	});
}
