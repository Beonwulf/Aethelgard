export function createCharacterRune(db) {
	return async (req, res, next) => {
		// Dieser Guard schützt nur Routen, die mit /api/characters beginnen
		if (req.url.startsWith('/api/characters')) {
			// Sicherheit: Wir brauchen die User-Objekt aus dem JWT (das in der Auth-Rune gesetzt wurde)
			if (!req.user) {
				// Da res.error evtl. noch nicht im Kontext ist (falls ResponseHelpers fehlen),
				// nutzen wir hier standard Node.js Methoden zur Sicherheit.
				if (res.error) {
					return res.error("Nicht autorisiert. Die Wachen weisen dich ab.", 401);
				} else {
					res.writeHead(401, { 'Content-Type': 'application/json' });
					return res.end(JSON.stringify({ error: "Nicht autorisiert. Die Wachen weisen dich ab." }));
				}
			}
		}

		// Wenn der User eingeloggt ist (oder es sich um eine andere Route handelt),
		// lassen wir den Request passieren!
		await next();
	};
}
