import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class Router {
    /**
     * Liest alle JavaScript-Dateien im Ordner /routes ein und führt deren Standard-Export aus,
     * um die Routen dynamisch an den Bifrost-Server anzuhängen.
     */
    static async loadRoutes(bifrost, db, guildService) {
        console.log('🗺️  Lade Bifrost-Brücken (Routen) dynamisch...');
        const routesDir = path.join(__dirname, 'routes');
        
        try {
            const files = fs.readdirSync(routesDir).filter(f => f.endsWith('.js'));
            
            for (const file of files) {
                // Konvertiere zu einer file:// URL für den dynamischen ESM Import in Windows
                const filePath = `file:///${path.join(routesDir, file).replace(/\\\\/g, '/')}`;
                const module = await import(filePath);
                
                if (typeof module.default === 'function') {
                    module.default(bifrost, db, guildService);
                    console.log(`   ✅ Brücke geschmiedet: ${file}`);
                } else {
                    console.warn(`   ⚠️ Warnung: ${file} exportiert keine Standardfunktion (export default function).`);
                }
            }
        } catch (err) {
            console.error('❌ Fehler beim Laden der Routen:', err);
        }
    }
}
