import jwt from 'jsonwebtoken';


export const socketAuthMiddleware = (db, SECRET_KEY) => {
	return async (socket, next) => {
		const { token, charUuid } = socket.handshake.auth;

		try {
			// 1. Account-Check (Immer Pflicht)
			const decoded = jwt.verify(token, SECRET_KEY);
            socket.userId = decoded.id;
			socket.userUuid = decoded.sub; // Die UUID aus dem JWT

			// 2. Charakter-Check (Optional)
			if( charUuid ) {
				const character = await db('characters').where({ uuid: charUuid, user_id: socket.userId }).first();

				if (character) {
					socket.character = character;
					socket.charId = character.id;
				} else {
					// Wenn eine UUID gesendet wurde, aber nicht existiert -> Fehler
					return next(new Error("Charakter ungültig"));
				}
			}

			// Wenn kein charUuid mitgesendet wurde, lassen wir ihn trotzdem rein.
			// Er ist dann im Status "Lobby / Charakter-Auswahl".
			next();
		} catch (err) {
			next(new Error("Zutritt verweigert: Siegel ungültig"));
		}
	};
};