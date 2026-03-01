# 🌈 Bifrost Networking Engine
The Bifrost is the core of Aethelgard's communication. It is a hybrid server that processes classic HTTP/S requests via a Rune system as well as providing persistent Websocket connections for real-time MMORPG gameplay.

## 1. Core Concepts
### ᚱ The Runes (Middleware)
Runes are asynchronous functions that can transform any request. They are processed sequentially before reaching a route.
* `use($rune)`: Inserts a new Rune into the chain.
* `next()`: Passes control to the next Rune or the final route handler.

### 🌉 The Bridges (Routing)
Bifrost supports standard HTTP methods (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`). Routes are only evaluated after all Runes have been successfully executed.

## 2. Technical Features
### 🛡️ Security & SSL
* **Auto-Certification**: Bifrost uses `selfsigned` to automatically forge new SSL certificates (Dev-Mode) if they are missing in the `data/bifrost` path.
* **Cross-Origin Policy**: The static handler enforces `same-origin` and `require-corp` to enable features like `SharedArrayBuffer` for modern web engines.

### 📦 Data Compression
Supports native **GZIP compression** for static assets to minimize loading times for world data.

## 3. Standard Runes (BifrostStatic)
| Rune | Function |
|------|----------|
| **StaticRune** | Serves files from a root directory (protects against Directory Traversal). |
| **BodyParserRune** | Extracts JSON data from the request body (`req.body`). |
| **ResponseHelperRune** | Extends the `res` object with `.json()` and `.error()` methods. |

## 4. Socket.io Integration
The Bifrost allows for "docking" sockets. Since sockets use the HTTP upgrade header, Bifrost disengages from routing logic as soon as a path with `/socket.io` is detected.

```javascript
const io = await bifrost.attachSockets({ /* options */ });
io.on('connection', (socket) => {
    // Aethelgard's real-time magic begins here
});
```