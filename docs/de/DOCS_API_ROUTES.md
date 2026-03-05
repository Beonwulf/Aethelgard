---
layout: default
title: "API ROUTES"
---

# 🌉 Bifrost API-Routen (Aethelgard)

Dieses Dokument beschreibt die dynamische Router-Architektur und die verfügbaren Endpunkte des Bifrost-Servers.

## 1. Dynamisches Routing (`Router.js`)
Der Bifrost-Server nutzt keine hardcodierten Routen mehr in der `index.js`. Stattdessen liest die Klasse `Router.js` beim Serverstart automatisch alle `.js`-Dateien im Verzeichnis `/server/http/routes/` ein und bindet sie an den Server. 
*Vorteil:* Neue Features (z. B. Gilden, Inventar) benötigen nur eine neue Datei in diesem Ordner.

## 2. Verfügbare Brücken (Routen)

### 🛡️ Authentifizierung (`/routes/auth.js`)
Diese Routen erfordern *kein* JWT-Token.
* `POST /api/register`: Erstellt einen neuen Account (verschlüsselt via bcrypt).
* `POST /api/login`: Prüft Credentials und liefert ein langlebiges JWT-Token (2400h) zurück.
* `POST /api/auth/validate`: Prüft, ob ein Token noch gültig ist und ob der User noch in der Datenbank existiert (Sicherheit nach DB-Resets).

### ⚔️ Heldenverwaltung (`/routes/characters.js`)
*Hinweis: Alle diese Routen sind durch die `createCharacterRune` (Middleware) geschützt und erfordern ein gültiges JWT-Token im Authorization-Header.*
* `GET /api/characters`: Lädt eine Übersicht aller Helden des aktuellen Spielers.
* `POST /api/characters/create`: Schmiedet einen neuen Helden. Empfängt Kultur, Beruf, Attribute, Skill-Slugs und die gewebte **Biografie**. (Transaktionssicher).
* `DELETE /api/characters/remove`: Sendet einen Helden nach Walhalla (löscht ihn).
* `PATCH /api/characters/add-ap`: Fügt einem spezifischen Helden Abenteuerpunkte hinzu.

### 📜 Welt-Daten (`/routes/game.js`)
* `GET /api/game/master-data`: Liefert alle Stammdaten der Welt für das Frontend (Kulturen, Berufe, Skills und die **Lifepath/Schicksals-Ereignisse**).
