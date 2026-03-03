import 'dotenv/config';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET;

/**
 * Die AuthRune ist nun reine Middleware!
 * Sie fängt keine Requests (Routen) mehr ab, sondern prüft nur noch bei jedem
 * eingehenden Request, ob ein JWT-Token im 'Authorization'-Header existiert.
 * Wenn ja, hängt sie den authentifizierten User an das 'req'-Objekt (req.user).
 */
export function createAuthRune(db) {
	return async (req, res, next) => {
		const authHeader = req.headers.authorization;
		
		if (authHeader) {
			const token = authHeader.split(' ')[1];
			if (!token) {
				req.user = null;
			} else {
				try {
					// 1. Token verifizieren
					const decoded = await new Promise((resolve, reject) => {
						jwt.verify(token, SECRET_KEY, (err, decoded) => {
							if (err) reject(err);
							else resolve(decoded);
						});
					});

					// 2. Datenbank-Check (Sicherstellen, dass User noch existiert)
					if (!decoded || !decoded.name) throw new Error('Invalid Token Payload');

					const userDb = await db('users').where({ username: decoded.name }).first();
					if (!userDb) {
						req.user = null;
					} else {
						// 3. User an Request hängen
						req.user = {
							id: userDb.id,
							uuid: userDb.uuid,
							username: userDb.username
						};
					}
				} catch (err) {
					// Token abgelaufen oder manipuliert
					req.user = null;
					console.error("Auth-Rune Fehler:", err.message);
				}
			}
		} else {
			// Kein Token im Header
			req.user = null;
		}

		// Den Request an die nächste Rune (oder die Route) weiterreichen!
		await next();
	};
}
