# 🌈 Bifrost Networking Engine
Der Bifrost ist das Herzstück der Kommunikation von Aethelgard. Er ist ein hybrider Server, der sowohl klassische HTTP/S-Anfragen über ein Runen-System verarbeitet als auch persistente Websocket-Verbindungen für das MMORPG-Echtzeit-Gameplay bereitstellt.


## 1. Kern-Konzepte
### ᚱ Die Runen (Middleware)
Runen sind asynchrone Funktionen, die jede Anfrage transformieren können. Sie werden sequenziell abgearbeitet, bevor eine Route erreicht wird.
* `use($rune)`: Fügt eine neue Rune in die Kette ein.
* `next()`: Gibt die Kontrolle an die nächste Rune oder den finalen Route-Handler weiter.

### 🌉 Die Brücken (Routing)
Bifrost unterstützt die Standard-HTTP-Methoden (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`). Routen werden erst evaluiert, wenn alle Runen erfolgreich durchlaufen wurden.


## 2. Technische Features
### 🛡️ Sicherheit & SSL
* **Auto-Zertifizierung*: Bifrost nutzt `selfsigned`, um bei fehlenden Zertifikaten im Pfad `data/bifrost` automatisch neue SSL-Zertifikate zu schmieden (Dev-Mode).
* **SSLCross-Origin Policy**: Der statische Handler erzwingt `same-origin` und `require-corp`, um Features wie `SharedArrayBuffer` für moderne Web-Engines zu ermöglichen.

### 📦 Daten-Kompression
Unterstützt native **GZIP-Kompression** für statische Assets, um die Ladezeiten der Welt-Daten zu minimieren.


## 3. Standard-Runen (BifrostStatic)
|   Rune                |	Funktion                                                                    |
|-----------------------|-------------------------------------------------------------------------------|
| **StaticRune**    	| Serviert Dateien aus einem Root-Verzeichnis (schützt vor Directory Traversal).|
| **BodyParserRune**    | Extrahiert JSON-Daten aus dem Request-Body (`req.body`).                      |
| **ResponseHelperRune**| Erweitert das `res`-Objekt um `.json()` und `.error()` Methoden.              |


## 4. Socket.io Integration
Der Bifrost erlaubt das "Andocken" von Sockets. Da Sockets den HTTP-Upgrade-Header nutzen, klinkt sich der Bifrost aus der Routing-Logik aus, sobald ein Pfad mit `/socket.io` erkannt wird.

```javascript
const io = await bifrost.attachSockets({ /* options */ });
io.on('connection', (socket) => {
    // Hier beginnt die Echtzeit-Magie von Aethelgard
});
```