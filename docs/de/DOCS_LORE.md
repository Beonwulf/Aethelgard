# 📜 Die Chroniken von Aethelgard
# 📜 Projekt Aethelgard: Lore & System-Referenz
Dieses Dokument bündelt die zentralen Säulen der Welt Aethelgard, ihre Mächte und die mechanische Architektur des RPG-Systems.


## 🌌 1. Die Kosmologie
Aethelgard ist eine Welt im ewigen Ringen zwischen der göttlichen Ordnung und der urzeitlichen Korruption. Während die acht Götter des Pantheons die Zivilisation, die Natur und den Geist schützen, streben die vier Widersacher danach, die Welt in ihre elementaren Urzustände (Asche, Eis, Wahnsinn, Hunger) zurückzuführen.


## ⚖️ 2. Das Pantheon (Die Ordnung)
Die Götter gewähren ihren Anhängern Segen und Gunst, fordern jedoch ein Leben nach ihren Prinzipien.

| Gott      | Aspekt	                | Fokus             | Bonus (Mechanik)                          |
|-----------|---------------------------|-------------------|-------------------------------------------|
| Solan     | Licht & Gerechtigkeit     | Wahrheit & Recht  |  `MU +1 `, Rechtskunde, Überzeugen        |
| Valeria   | Sturm & Ehre              | Kampf & Seefahrt  |  `KK +1 `, Schwerter, Schwimmen           |
| Mercuris  | Listen & Handel           | Glück & Geschick  |  `IN +1 `, Feilschen, Schlösser knacken   |
| Yldra     | Erde & Heilung            | Leben & Natur     |  `KO +1 `, Heilkunde, Pflanzenkunde       |
| Mornir    | Tod & Stille              | Ahnen & Übergang  |  `MU +1 `, Selbstbeherrschung, Sagen      |
| Skadi     | Jagd & Wildnis            | Überleben         |  `GE +1 `, Bogen, Orientierung            |
| Mimir     | Wissen & Runen            | Weisheit & Magie  |  `KL +1 `, Magiekunde, Rechnen            |
| Lokh      | Wandel & Feuer            | Chaos & Energie   |  `IN +1 `, Überreden, Alchimie            |


## 🌑 3. Die Widersacher (Die Korruption)
Die Widersacher bieten Abkürzungen zur Macht an. Jede Gabe (Taint Gift) ist ein zweischneidiges Schwert: Sie gewährt enorme Boni, fordert aber einen permanenten Preis in Form von Makeln (Penalties).

🐺 **Fenrisul** (Der Weltenfresser)
* Gegenspieler: Solan (Hunger vs. Licht)
* Gabe: Bestialischer Zorn (`KK +3`, `MU +1`)
* Makel: `CH -2`, `KL -2`. Die Züge werden bestialisch, die Sprache verkommt zum Knurren.

❄️ **Hela-Ka** (Die Frostkönigin)
* Gegenspieler: Yldra (Stasis vs. Wachstum)
* Gabe: Eisherz (`KO +3`, Kälteresistenz)
* Makel: `IN -2`. Totale emotionale Kälte; Verlust von Empathie und Mitgefühl.

👁️ **Vorthos** (Der Lügenweber)
* Gegenspieler: Mimir (Irrlicht vs. Erkenntnis)
* Gabe: Flüsternde Runen (`Mana +15`)
* Makel: `Sinnesschärfe -4`. Die Realität wird von tausend lügenden Stimmen überlagert.

⚔️ **Surtr** (Der Weltenbrand)
* Gegenspieler: Valeria (Zerstörung vs. Ehre)
* Gabe: Blutfeuer (`Schwerter/Hiebwaffen +3`)
* Makel: `Selstbeherrschung -5`. Im Kampfrausch ist weder Rückzug noch Gnade möglich.

* **Xal-Atath** (Die Leere Hand): Schenkt unnatürliches Geschick beim Stehlen, doch das Glück verlässt den Träger. Gold zerrinnt ihm buchstäblich zwischen den Fingern.
* **Nidhogg** (Der Wurzelnager): Verleiht Widerstand gegen Gifte und Schmerz, doch der Körper beginnt bereits zu Lebzeiten zu verwesen.
* **Skoll** (Der Sonnenjäger): Erlaubt es, eins mit den Schatten zu werden, führt aber zur Erblindung im göttlichen Sonnenlicht.
* **Malakor** (Der ewige Stillstand): Macht die Haut hart wie Stein (hoher Rüstungsschutz), lässt aber die Glieder versteifen und raubt jede Flinkheit.


## ⚙️ 4. Das Charakter-System
### Primärattribute
Jeder Charakter wird durch acht Basiswerte definiert:
* **Geistig**: Mut (`MU`), Klugheit (`KL`), Intuition (`IN`), Charisma (`CH`)
* **Körperlich**: Fingerfertigkeit (`FF`), Gewandtheit (`GE`), Konstitution (`KO`), Körperkraft (`KK`)

### Abgeleitete Werte (Derived Stats)
* LeP (Lebenspunkte): Kapazität für physischen Schaden.
* Mana: Energie für magische Handlungen (Berufe: Druide, Magier, etc.).
* Gunst: Religiöse Energie (Max. 25). Wird für göttliche Wunder verbraucht.
* Taint Level: Misst den Grad der Korruption (0 bis 100).


## 🛡️ 5. Fraktionen & Gilden
Aethelgard ist ein politisches Pulverfass. Das **Reputations-System** trackt das Ansehen:
* **Skala**: `-100` (Erzfeind) bis `+100` (Heiliger/Champion).
* **Gilden**: Spielergeführte Organisationen mit Hierarchien (`Leader`, `Officer`, `Member`).


## 🗺️ 6. Technisches Datenmodell (Kurzübersicht)
Das Backend nutzt eine PostgreSQL-Datenbank mit folgendem Kern-Schema:
* `characters`: Speichert Attribute, Position und Basisdaten.
* `character_taints`: Trackt aktive Korruptions-Effekte.
* `character_buffs`: Speichert temporäre Segen oder Flüche (mit Ablaufdatum).
* `inventory` / `items`: Das Ausrüstungssystem.


## 🌍 7. Die Kulturen (Herkunft)
Die Kultur bestimmt die grundlegende Physis und die ersten Prägungen eines Helden.

| Kultur (Slug) | Fokus         | Attributs-Bon                 | Start-LeP/Mana    | Beschreibung                      |
|---------------|---------------|-------------------------------|-------------------|-----------------------------------|
| kaiserliche   | Disziplin     | -                             | 30 / 0            | Ausgeglichene Allrounder.         | 
| skjaldar      | Physis        | `KO+2`, `KK+1`, `MU+1`, `KL-1`| 35 / 0            | Extrem zäh, geborene Krieger.     |
| zahiri        | Geist/Magie   | `IN+1`, `CH+1`, `KL+1`, `KO-1`| 28 / 5            | Besitzen natürliches Mana-Potential.|
| felsenzwerge  | Zähigkeit     | `KO+2`, `KK+1`, `GE-1`, `CH-1`| 35 / 0            | Standfest und stark.              |
| tiefenzwerge  | Wissen        | `KO+1`, `KK+1`, `KL+1`, `GE-1`| 32 / 0            | Die Gelehrten unter den Zwergen.  |
| feynir        | Wildnis/Transformation | `IN+2`, `GE+1`, `KK-1`  | 30 / 0            | Schnell, intuitiv. Besitzen die Fähigkeit zur **Tiergestalt** (Wolfsform). Erfordert eigenes 3D-Modell für Transformationsform. |
| lichtalben    | Äther         | `KL+2`, `IN+1`, `CH+1`, `KO-2`| 26 / 15           | Geborene Magier, aber fragil.
| nachtalben    | Schatten      | `MU+1`, `KL+1`, `GE+2`, `CH-2`| 28 / 10           | Flink, mutig und magisch begabt.
| nordfolk      | Winter/Überleben | `KO+1`, `KK+1`              | 32 / 0            | Durch den ewigen Winter abgehärtete Krieger und Jäger des hohen Nordens. |
| suedbund      | Handel/Wissen  | `KL+1`, `CH+1`                | 28 / 0            | Diplomaten, Gelehrte und Händler – das kulturelle Herz Aethelgards. |
| wurzelvolk    | Natur/Weisheit | `KO+3`, `KK+2`, `GE-2`, `CH-1` | 40 / 0           | Uralte Baumwesen, Wächter von Yldras Wäldern. |
| gnomolk       | Wissen/Technik | `KL+3`, `FF+2`, `IN+1`, `KK-2`, `KO-1` | 26 / 0  | Kleine bipedale Eisbärwesen, Steampunk-Tüftler, Herkunft unbekannt. |


## ⚔️ 8. Die Heldenpfade (Berufung)
Heldenpfade bestimmen die Start-Fertigkeiten und das energetische Potential (Mana oder Gunst).

| Profession        | Energie   | Fokus-Attribute   | Besonderheit                  |
|-------------------|-----------|-------------------|-------------------------------|
| **Krieger**       | -         | `MU`, `KK`, `KO`  | Meister des Stahls            |
| **Magier**        | Mana (20) | `KL`, `IN`        | Erfordert KL 11, IN 11        |
| **Runenmeister**  | Mana (15) | `KL`, `KK`, `KO`  | Nur für Zwerge                |
| **Streuner**      | -         | `IN`, `GE`, `CH`  | Überlebenskünstler            |
| **Zwergensoldat** | -         | `KO`, `KK`        | Nur für Zwerge (KO 12, KK 12) |
| **Entdecker**     | -         | `KL`, `IN`, `KO`  | Pioniere der Wildnis          |
| **Kleriker**      | Gunst (20)| `MU`, `IN`, `CH`  | Diener der Götter             |
| **Bauer**         | -         | `KO`, `KK`        | Zäh und naturverbunden        |
| **Bettler**       | -         | `IN`, `CH`        | Tarnung in den Schatten       |
| **Händler**       | -         | `KL`, `IN`, `CH`  | Eloquent und reisend          |
| **Schmied**       | -         | `KK`, `FF`, `KO`  | Meister von Feuer und Amboss  |

Die spirituellen Klassen (Nutzer von Divine Power)
| Profession/Klasse |	Fokus                       |	Gott/Widersacher  Bezug     |	Typischer Orden/Zirkel          |
|-------------------|-------------------------------|-------------------------------|-----------------------------------|
| **Kleriker**      | KlerikHeilung & Bannung   	| Solan / Valeria	            | Orden des Solan                   |
| **Priester**      | KlerikSegen & Lore    	    | Alle Götter (vielseitig)  	| Orden des Mornir (Grabpriester)   |
| **Paladin**       | KlerikKampf & Schutz  	    | Solan / Skadi	                | Orden des Strahlenden Lichts      |
| **Druide**        | KlerikNatur & Wandel  	    | Yldra / Nidhogg	            | Zirkel der Yldra                  |
| **Schamane**      | KlerikGeister & Ahnen 	    | Mornir / Lokh	                | Frostjäger-Bund (Ahnengeister)    |
| **Kultist**       | KlerikKorruption & Schatten   | Widersacher (Fenrisul etc.)   | Kult des Surtr                    |


## 🛠️ 9. Das Talentsystem (Skills)
Talente werden in Aethelgard gegen drei Attribute geprüft (Probe: W20/W20/W20). Ein Erfolg hängt von den Attributswerten und den investierten Fertigkeitspunkten ab.

### 🏋️ Körperliche Talente
* **Selbstbeherrschung** (`MU`/`KO`/`KK`): Standhaftigkeit gegen Schmerz.
* **Sinnesschärfe** (`KL`/`IN`/`IN`): Wahrnehmung der Umgebung.
* **Körperbeherrschung** (`GE`/`GE`/`KO`): Akrobatik und Ausweichen.
* **Weitere**: Klettern, Fesseln, Schwimmen, Reiten.

### 🗣️ Gesellschaftliche Talente
* **Überreden** (`MU`/`IN`/`CH`): Manipulation und Lügen.
* **Überzeugen** (`MU`/`KL`/`CH`): Logische Argumentation.
* **Menschenkunde** (`KL`/`IN`/`CH`): Absichten durchschauen.
* Weitere: Betören, Gassenwissen, Feilschen, Einschüchtern.

### 📚 Wissenstalente
* **Magiekunde** (`KL`/`KL`/`IN`): Wissen über Arkantes und Runen.
* **Götter & Kulte** (`KL`/`KL`/`IN`): Religiöses Wissen.
* **Orientierung** (`KL`/`IN`/`IN`): Finden des Weges in der Wildnis.
* Weitere: Sagen & Legenden, Tierkunde, Pflanzenkunde, Rechnen, Rechtskunde, Geographie.

### ⚔️ Kampftalente
* **Nahkampf**: Schwerter, Dolche, Hiebwaffen, Stangenwaffen, Zweihandschwerter, Raufen.
* **Fernkampf**: Bogen, Armbrust.

### 🔨 Handwerkstalente
* **Alchimie** (`MU`/`KL`/`FF`): Tränke und Gifte.
* **Grobschmied** (`FF`/`KO`/`KK`): Waffen- und Werkzeugherstellung.
* **Heilkunde Wunden** (`KL`/`FF`/`KO`): Medizinische Versorgung.
* Weitere: Stoff-, Leder-, Holzbearbeitung, Kochen, Schlösser knacken, Ackerbau, Angeln


## 🏛️ 10. Gestalten des Schicksals (NPCs & Legenden)
### 🗡️ Die Lichtbringer (Helden der Ordnung)
* **Hochkönig Alaric der Standhafte** (`Kaiserliche`)
    - **Profession**: Krieger (`Schildwache`)
    - **Lore**: Herrscher über das Zentralreich. Er trägt den "Sonnenschild", ein Artefakt von Solan. Er gilt als unbestechlich, wird aber von den Intrigen der Handelsgilden im Südbund unter Druck gesetzt.
* **Thora Sturmblick** (`Skjaldar`)
    - **Profession**: Klerikerin von Valeria
    - **Lore**: Eine Admiralin, die eine Flotte von Surtr-Kultisten in der "Nacht der brennenden Segel" besiegte. Man sagt, sie könne den Wind allein durch ihr Gebet drehen.
* **Meister Runold der Tiefe** (`Tiefenzwerg`)
    - **Profession**: Runenmeister
    - **Lore**: Der älteste lebende Runenschmied. Er bewahrt die geheimen Runen von Mimir und ist der Einzige, der weiß, wie man "Sternen-Eisen" verarbeitet.

### 🌑 Die Gezeichneten (Agenten der Korruption)
* **Vargr der Hungernde** (`Nordfolk`)
    - **Taint**: Fenrisul (`Stufe 80+`)
    - **Lore**: Einst ein gefeierter Jäger, der in einer Hungersnot den Pakt mit dem Weltenfresser einging. Heute führt er die "Bestien-Horden" an und ist kaum noch als Mensch erkennbar.
* **Die Bleiche Lady (Slythara)** (`Lichtalbin`)
    - **Taint**: Hela-Ka
    - **Lore**: Eine ehemalige Magierin, deren Wissensdurst sie in die Arme der Frostkönigin trieb. Sie residiert in einem Schloss aus schwarzem Eis und hat ihr Herz gegen einen Splitter aus ewigem Frost getauscht.


## 🏰 11. Machtstrukturen & Organisationen
### 👑 Herrschaft & Adel (Cultures-Verknüpfung)
Jede Kultur braucht ein politisches Gesicht.

* **Das Sonnen-Konvent (Kaiserliche)**: Ein Rat aus Hochadel und Priestern des Solan. Sie sind obsessiv darauf bedacht, "Reinheit" zu wahren, was oft in Tyrannei umschlägt.
* **Der Thing der Jarls (Skjaldar)**: Kein zentraler König, sondern ein loser Verbund aus Jarls. Macht wird hier durch Stärke und Beute bewiesen.
* **Die Sternen-Satrapen (Zahiri)**: Magokratische Fürsten, die über Oasen herrschen. Ihr Rang bemisst sich an ihrem astronomischen Wissen.

### 🎓 Akademien & Wissen (Professions-Fokus)
Hier werden die Charaktere ausgebildet.

* **Die Akademie von Aethergard (Magier)**: Eine schwebende Zitadelle. Sie lehren, dass Magie ein Werkzeug ist, geraten aber oft mit den Klerikern in Konflikt, die Magie als "Gotteslästerung" sehen.
* **Die Hallen des Tiefenfeuers (Runenmeister)**: Eine zwergische "Universität" direkt im Berg. Hier wird die Grenze zwischen Handwerk und Magie verwischt.

### 🌑 Banden & Geheimbünde (The "Grey" Area)
Nicht jeder, der gegen das Gesetz verstößt, dient einem Widersacher.

* **Die Schattenhände (Streuner/Bettler)**: Eine weltweite Diebesgilde, die Mercuris (dem Schattenhändler) huldigt. Sie kontrollieren den Schwarzmarkt, bekämpfen aber aktiv die Korruption durch Xal-Atath, da "tote Kunden kein Gold bringen".
* **Der Zirkel der Asche (Verbündete von Surtr)**: Ein Geheimbund, der den Adel unterwandert, um Chaos zu stiften. Sie sind die klassischen Antagonisten für politische Intrigen.


## 🏛️ 12. Fraktionen & Machtverhältnisse
Die Welt wird nicht nur von Göttern, sondern von handfesten Interessen regiert. Das Reputations-System trackt die Beliebtheit des Spielers bei diesen Gruppen.

|      Fraktion             |      Sitz     |   Anführer            |   Philosophie             |   Feindbild               |
|---------------------------|---------------|-----------------------|---------------------------|---------------------------|
| **Das Sonnen-Konvent**    | Solanspracht  | Erzbischof Valerius   | Ordnung, Reinheit, Gesetz | Kultisten & Schattenhände |
| **Die Silberne Akademie** | Aetherwacht   | Hochmagister Elion    | Wissen ist Macht          | Religiöser Fanatismus     |
| **Die Schattenhände**     | Unbekannt 	| Die Namenlose         | Gold kennt kein Gesetz    | Das Sonnen-Konvent        |
| **Eisenzahn-Bund**        | Tiefenfels    | Ratsherr Durin        | Erhalt der zwergischen Tradition| Surtr-Kult & Oberflächen-Adel |
| **Die Freien Jarls**      | Fjordheim     | Ragnhild Sturmbringer | Freiheit & Stärke         | Kaiserliche Expansion     |

### 🚩 Spannungsfelder (Quest-Aufhänger)
* **Der Äther-Streit**: Das Konvent will Magie reglementieren; die Akademie fordert Freiheit für die Forschung.
* **Die Schmuggel-Kriege**: Die Schattenhände korrumpieren den kaiserlichen Adel, um Zölle zu umgehen.
* **Der Zorn der Ahnen**: Die Zwerge verweigern dem Südbund den Zugang zu den unteren Mienen, was die Wirtschaft schwächt.


## 👑 13. Legendäre Persönlichkeiten
Diese NPCs sind die Gesichter ihrer Fraktionen und verfügen über einzigartige Status-Werte.

### Erzbischof Valerius (Kaiserlicher / Kleriker)
* **Rolle**: Oberhaupt des Sonnen-Konvents.
* **Ziel**: Die Ausrottung jeglicher Korruption – um jeden Preis. Er sieht selbst in harmloser Magie den Keim des Wahnsinns (Vorthos).
* **Mechanik**: Kann "Göttliche Bestrafung" wirken (Gunst-Kosten: 15).

### Die Namenlose (Nachtalbin / Streunerin)
* **Rolle**: Anführerin der Schattenhände.
* **Ziel**: Das Gleichgewicht der Macht halten, damit der Handel (und der Diebstahl) floriert.
* **Mechanik**: Besitzt einen Taint-Gift von Mercuris (Glücks-Bonus), ohne jedoch der Korruption zu verfallen.

### Jarl Ragnhild Sturmbringer (Skjaldar / Kriegerin)
* **Rolle**: Herrin von Fjordheim.
* **Ziel**: Die Einigung der Skjaldar-Stämme gegen die Bedrohung durch Hela-Ka.
* **Mechanik**: Immunität gegen Kälte-Effekte; erhält im Kampf MU +4.

### Hochmagister Elion (Lichtalb / Magier)
* **Rolle**: Rektor der Silbernen Akademie.
* **Ziel**: Die Rekonstruktion der Ur-Runen Mimirs, um Aethelgard vor dem Weltenbrand zu schützen.
* **Mechanik**: Mana-Pool von 150; kann Zauber ohne Cast-Zeit wirken.


## 📜 14. Die Chroniken & Das Omen des Brandes
### ⏳ Die Ära der Asche (Historischer Rückblick)
Das dunkelste Kapitel der Geschichte. Der Widersacher Surtr versuchte, die Barriere zwischen den Ebenen zu zerreißen.
Vor genau 500 Jahren wäre Aethelgard fast untergegangen. Dieses Ereignis wird in der Akademie als "Die Große Kernschmelze" und in der Kirche als "Surtrs Zorn" gelehrt.
* **Das Ereignis**: Ein Riss im Gefüge ließ die Flammenheere Surtrs in das zentrale Kaiserreich einfallen. Drei Provinzen wurden in Sekundenschnelle zu Glas geschmolzen.
    - **Der "Schwarze Tag"**: Das Herz des Kaiserreichs verwandelte sich in die Gläserne Öde.
    - **Das Opfer**: Die acht Götter mussten einen Teil ihrer Essenz opfern, um das Siegel zu schmieden, das Surtr zurückhielt. Seitdem ist die Verbindung der Götter zu Aethelgard schwächer (erklärt, warum Wunder teuer sind).
* **Das Relikt**: Die "Gläserne Öde" im Zentrum der Welt ist heute eine unbewohnbare Wüste aus schwarzem Glas – ein permanentes Mahnmal für die Spieler.

**Die Prophezeiung des Ascheregens**
In den Archiven der Silbernen Akademie wird eine Warnung gehütet:
> "Wenn der Frost im Sommer brennt und der Stein zu weinen beginnt, wird der Riese aus der Tiefe steigen, um zu beenden, was er begann."

### 🔥 Das Omen: Die Rückkehr des Weltenbrandes
Hochmagister Elion hat in den Ätherwinden Schwingungen gemessen, die exakt jenen vor 500 Jahren entsprechen. Er nennt es die "Thermische Resonanz".

**Wie der Spieler davon erfährt:**
1. **Naturphänomene**: In den Wäldern der Feynir verdorren Pflanzen ohne Grund; Flüsse beginnen zu kochen, während die Luft eigentlich kühl ist.
2. **Die "Asche-Krankheit"**: NPCs in Grenzregionen husten grauen Staub aus – ein Zeichen dafür, dass Surtrs Präsenz die Luft korrumpiert.
3. **Fragmente der Prophezeiung**: In alten Dungeons findet der Spieler Runensteine, die von der "Acht-Götter-Dämmerung" künden.

### 🏛️ Historische Meilensteine & Globale Bedrohungen
|   Ereignis            |	Datum   |	Auswirkung                                                              |
|-----------------------|-----------|---------------------------------------------------------------------------|
| **Die Ära der Asche** | Vor 500 J.| Entstehung der Gläsernen Öde. Fast-Auslöschung der Kaiserlichen.          |
| **Der Frost-Winter**  | Vor 120 J.| Hela-Ka ließ die Meere gefrieren. Die Skjaldar flohen nach Süden.         |
| **Die Schism-Nacht**  | Vor 30 J. | Die Trennung zwischen Akademie und Konvent über die Nutzung von Runen.    |

###🕯️ Aktuelle Quest-Hooks für den Weltenbrand:
* **"Das kochende Blut"**: Elion bittet den Spieler, Proben von geschmolzenem Gestein aus den Frostzahn-Bergen zu holen – ein geologisches Unmögliches, das auf Surtr hindeutet.
* **"Die Schläfer von Surtr"**: Der Spieler findet heraus, dass der Zirkel der Asche (Geheimbund) in den Städten Brennholz-Vorräte mit alchimistischem Brandbeschleuniger präpariert.


## 🎨 15. Die Aethelgard-Skala
|   Qualität    |  Farbe    | Hex-Code  | Bezeichnung (Lore) |	Bedeutung                                                    |
|---------------|-----------|-----------|--------------------|---------------------------------------------------------------|
| Common        | Grau      | #9d9d9d | Minderwertig       | Abfall, Rohstoffe oder kaputte Gegenstände.                   |
| Standard      | Weiß      | #ffffff | Gewöhnlich         | Solide Handwerksarbeit, nutzbare Ausrüstung ohne Boni.        |
| Uncommon      | Grün      | #1eff00 | Verbessert         | Von Meistern gefertigt oder mit schwacher Magie berührt.      |
| Rare          | Blau      | #0070dd | Erlesen            | Seltene Fundstücke, oft mit Geschichte oder starken Stats.    |
| Epic          | Lila      | #a335ee | Heroisch           | Gegenstände von Legenden oder aus den tiefsten Dungeons.      |
| Legendary     | Gold/Gelb | #e6cc80 | Göttlich           | Einzigartige Artefakte, oft direkt mit den Göttern verbunden. |
| Artifact      | Orange    | #ff8000 | Verderbt / Uralt   | Items mit Weltenbrand-Einfluss oder Taint-Potential.          |


## 🎖️ 16. Das Ruf-System (Reputation & Ränge)
Das Ansehen eines Helden in Aethelgard wird auf einer Skala von **-10.000 (Erzfeind)** bis **+10.000 (Champion)** gemessen. Taten haben direkte Auswirkungen darauf, wie die Welt auf den Charakter reagiert.

### 🔴 Der Pfad der Verdammnis (Negativer Ruf)
| Wert | Rang | Auswirkungen (Mechanik) |
| :--- | :--- | :--- |
| **-10.000 bis -7.501** | **Erzfeind** | Wachen greifen bei Sichtkontakt an. Kopfgeldjäger werden entsandt. |
| **-7.500 bis -4.001** | **Geächteter** | Handel wird verweigert. NPCs rufen nach Wachen. |
| **-4.000 bis -1.001** | **Unwillkommen** | Preise in Läden steigen um 50%. Keine Quests verfügbar. |

### ⚪ Der Pfad der Neutralität
| Wert | Rang | Auswirkungen (Mechanik) |
| :--- | :--- | :--- |
| **-1.000 bis +1.000** | **Fremder** | Standardpreise. Basis-Informationen und einfache Quests verfügbar. |

### 🔵 Der Pfad des Aufstiegs (Positiver Ruf)
| Wert | Rang | Auswirkungen (Mechanik) |
| :--- | :--- | :--- |
| **+1.001 bis +3.000** | **Sympathisant** | Preise sinken um 5%. Zugang zu einfachen Fraktions-Items. |
| **+3.001 bis +6.000** | **Verbündeter** | Preise sinken um 15%. Zugang zu Spezial-Quests und Offiziers-Ausrüstung. |
| **+6.001 bis +9.000** | **Held** | Preise sinken um 25%. Zugriff auf seltene (Rare/Epic) Fraktions-Relikte. |
| **+9.001 bis +10.000** | **Champion** | Maximaler Rabatt (40%). Zugriff auf legendäre Artefakte. NPCs verneigen sich. |

### ⚖️ Dynamik & Konsequenzen
1. **Fraktions-Feindschaften**: Taten für eine Fraktion können den Ruf bei einer rivalisierenden Gruppe senken (z.B. + Ruf Sonnen-Konvent = - Ruf Schattenhände).
2. **Region vs. Gilde**: Der Spieler kann in der Region *Nordlande* ein Held sein (+7.000), aber beim dortigen *Zirkel der Asche* als Erzfeind (-9.000) gelten.
3. **Wiederherstellung**: Ein verlorener Ruf kann durch Buß-Quests oder hohe Goldspenden mühsam wieder aufgebaut werden.


## ⚖️ 17. Die Gunst der Götter (Divine Favor)
Während das Ruf-System das Ansehen bei sterblichen Organisationen regelt, misst die **Gunst** das Wohlwollen der Ewigen. Gunst ist eine flüchtige, heilige Energie, die für Wunder, Segnungen oder das Abwenden von Verderbnis (Taint) eingesetzt werden kann.

### 🌌 Funktionsweise
Gunst wird nicht auf einer Skala von -10.000 bis +10.000 gemessen, sondern als **Sammelbarer Pool (Währung)** pro Gottheit geführt. 

| Gottheit | Taten für Gunst | Nutzen der Gunst |
| :--- | :--- | :--- |
| **Solan** | Wahrheit sprechen, Unschuldige schützen, Schattenwesen richten. | Licht-Magie verstärken, Taint (Verderbnis) reinigen. |
| **Mornir** | Ruhelose Seelen erlösen, Bestattungsriten vollziehen, Untote vernichten. | Schutz vor dem Tod (Self-Res), Dialog mit Geistern. |
| **Yldra** | Kranke heilen, heilige Haine bewahren, Bestien besänftigen. | Massive Heilung, Regeneration, Natur-Allianzen. |
| **Aethel** | Altes Wissen bergen, Magie weise einsetzen, Portale sichern. | MP-Regeneration, Entschlüsselung von Runen. |

### 🎭 Synergie zwischen Ruf und Gunst
Taten in der Welt triggern oft beide Systeme gleichzeitig:
* **Beispiel:** Der Spieler erlöst einen Geist in einer Gruft.
  * *Resultat 1:* **+10 Gunst bei Mornir** (Göttliche Anerkennung).
  * *Resultat 2:* **+50 Ruf beim Sonnen-Konvent** (Die Kirche dankt für die Säuberung der Ruine).

### 🌑 Die Kehrseite: Der Zorn der Götter
Werden heilige Stätten entweiht oder Prinzipien der Götter massiv verletzt, verfällt die Gunst. Sinkt die Gunst auf Null, können "Göttliche Prüfungen" (Flüche oder mächtige Gegner) den Spieler heimsuchen.
