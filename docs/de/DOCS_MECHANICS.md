---
layout: default
title: "MECHANICS"
---

# ⚙️ Spielmechaniken - Aethelgard Core

Dieses Dokument beschreibt die mathematischen und technischen Regeln, nach denen die Welt von Aethelgard funktioniert.

---

## 1. Attribut-System
Das System nutzt acht primäre Attribute (DSA-basiert), die den Kern jedes Charakters bilden.

| Kürzel | Attribut | Fokus |
| :--- | :--- | :--- |
| **MU** | Mut | Widerstand gegen Furcht, Initiative, Angriffswert. |
| **KL** | Klugheit | Wissen, Logik, Effektivität von Zaubern. |
| **IN** | Intuition | Sinnesschärfe, Ausweichen, Fernkampf. |
| **CH** | Charisma | Interaktion mit NPCs, Preise, Überreden. |
| **FF** | Fingerfertigkeit | Handwerk, Schlösser knacken, Präzision. |
| **GE** | Gewandtheit | Geschwindigkeit, Parade, Klettern. |
| **KO** | Konstitution | Lebenspunkte (HP), Ausdauer, Giftresistenz. |
| **KK** | Körperkraft | Nahkampfschaden, Tragekraft, Einschüchtern. |

---

## 2. Energie-Ressourcen
Charaktere verbrauchen verschiedene Energien für Aktionen.

### 🔵 Mana (MP)
* **Nutzer:** Magier, Runenmeister.
* **Regeneration:** Abhängig von `KL` und Ruhephasen.
* **Zweck:** Wirken von arkanen Zaubersprüchen.

### 🟡 Göttliche Macht (Divine Power)
* **Nutzer:** Kleriker, Paladine, Priester, Druiden, Schamanen, Kultisten.
* **Regeneration:** Abhängig von `MU` und Gebeten/Meditation.
* **Zweck:** Wirken von Wundern, Segnungen und Riten.

### 🟢 Ausdauer (Stamina)
* **Nutzer:** Alle Klassen (besonders Krieger).
* **Zweck:** Sprinten, schwere Angriffe, Blocken.

---

## 3. Reputations- & Gunst-System

### 🎖️ Reputation (Sozialer Ruf)
Misst das Ansehen bei sterblichen Organisationen (Skala: **-10.000 bis +10.000**).
* **Erzfeind (-10k):** Aggro bei Sichtkontakt durch Wachen.
* **Champion (+10k):** Maximale Rabatte, Zugriff auf legendäre Quests/Items.

### 🌌 Göttliche Gunst (Divine Favor)
Ein Pool (Währung), der das Wohlwollen der Götter darstellt. 
* **Erwerb:** Durch spezifische Taten (z.B. Geister erlösen für Mornir).
* **Verbrauch:** Kann an Schreinen gegen permanente Buffs, Taint-Reinigung oder "Wunder" eingetauscht werden.

---

## 4. Korruption (Taint-System)
Das Maß der dunklen Beeinflussung durch die Widersacher (z.B. Nidhogg oder Surtr).
* **Zunahme:** Aufenthalt in korrumpierten Gebieten, Einsatz dunkler Magie, Kontakt mit Kultisten.
* **Effekte:**
    * **Stufe 1-10:** Keine merklichen Effekte.
    * **Stufe 50+:** Abzug auf `CH`, leichte HP-Degeneration.
    * **Stufe 100:** Transformation oder Tod des Charakters.
* **Heilung:** Nur durch hohe Opfergaben (Gunst) oder spezialisierte Rituale der Valeria/Solan möglich.

---

## 5. Das Lebenspfad-System (Die Chronik)
Bei der Heldenerschaffung sind Charaktere nicht nur leere Wertegerüste. Aethelgard nutzt ein komplexes, **zweisprachiges Lifepath-System** (`data/mechanics/lifepath.js`).
* **Kategorien:** Die Biografie wird aus 4 Phasen gewebt: Omen (Geburt), Kindheit, Ereignis und Begegnung.
* **Dynamische Auswahl:** Ein Kultist bekommt andere Ereignisse als ein Zwergensoldat. Die Zufallstabellen prüfen aktiv die gewählte Kultur und Profession.
* **Geheime Boni:** Viele Ereignisse gewähren versteckte permanente Boni (z.B. +1 Mut durch ein überlebtes Duell oder +1 auf Taschendiebstahl als Waisenkind).
* **Schicksalsfäden:** Spieler haben bei der Erschaffung 3 "Rerolls", um ein neues Schicksal zu weben, falls ihnen die Geschichte nicht gefällt.

---

## 6. Skill-Progressionssystem (Talente & Berufe)

### Stufen & Labels

| Stufe | Label | Beruf anwendbar? |
| :---: | :--- | :---: |
| 0 | Unwissender | ❌ |
| 1–2 | Unwissender (erworben) | ❌ |
| 3–4 | Anfänger (ausgebildet) | ❌ |
| 5–6 | Lehrling | ✅ |
| 7–10 | Geselle | ✅ |
| 11–14 | Altgeselle | ✅ |
| 15–18 | Fachmann | ✅ |
| 19–22 | Meister | ✅ |
| 23+ | Großmeister | ✅ |

> **Wichtig:** Erst ab **Lehrling (Stufe 5)** kann ein Beruf aktiv eingesetzt werden. Darunter gilt der Charakter als „noch nicht ausgebildet".

---

### Aufstiegsregeln

| Von → Bis | Anforderung |
| :--- | :--- |
| **0 → 1** | **Quest:** Einführungsquest bei einem NPC-Lehrmeister abschließen. |
| **1 → 2** | **Talentlehrer bezahlen** (Silber-Kosten je nach Lehrer). |
| **2 → 3** | **Talentlehrer aufsuchen + bezahlen.** |
| **3 → 4** | **Talentlehrer aufsuchen + bezahlen.** |
| **4 → Lehrling (5+)** | Start des normalen Levelsystems. |
| **Lehrling → Geselle → ...** | Erfahrung durch Nutzung (`XP`) **+** optionales Training bei NPC. |
| **→ Meister / Großmeister** | Zusätzlich eine **Meisterprüfung** (spezielle Quest/Prüfung) ablegen. *(Genaue Schwellen TBD)* |

---

### Ideen / Offene Punkte
* **Stufe 1→2 (offen):** Tendenz zu "Experten-NPC bezahlen" (kein Quest-Zwang, da Erstzugang bereits durch die Einführungsquest bewiesen).
* **Aufstiegsschwellen Meister/Großmeister:** Könnten serverweit begrenzt sein (z.B. max. 1 Großmeister pro Region).
* **XP durch Nutzung:** Höhere Stufen könnten *use-based* XP erfordern (Schmiede muss X mal schmieden, nicht nur Gold zahlen).
* **Meisterprüfung:** Könnte durch eine Instanz/Dungeon nachgewiesen werden statt durch eine NPC-Quest.

---


---

## 7. Proben & Schwierigkeitsmodifikatoren

Die Talent-Progression (Abschnitt 6) bleibt bewusst **kompakt** (Stufe 0–23+, 8 Labels). Flexibilität beim Balancing entsteht nicht durch mehr Stufen, sondern durch **Probe-Modifikatoren**.

### Grundprinzip

Jede Aktion hat einen `difficulty_modifier` im Bereich **-10 (sehr erleichtert) bis +10 (sehr erschwert)**. Dieser Wert wird zur Probe addiert/subtrahiert, ohne die Progression selbst anzutasten.

### Modifier-Quellen

| Quelle | Beispiel | Modifier |
| :--- | :--- | :---: |
| **Ausrüstung** | Meisterwerkzeug beim Schmieden | -2 |
| **Ausrüstung** | Ramponiertes Werkzeug | +3 |
| **Umgebung** | Sturm beim Navigieren | +4 |
| **Umgebung** | Ruhiges Wasser | -1 |
| **Buffs/Tränke** | Konzentrationstrank (Alchemie) | -2 |
| **Göttliche Gunst** | Solan-Segen auf Kampfprobe | -3 |
| **Korruption** | Taint-Stufe 50+ auf soziale Probe | +2 |
| **Quest-Kontext** | Einführungsquest (soll gelingen) | -5 |
| **Zielgruppe** | NPC misstraut dem Charakter | +2 |

### Balancing-Prinzip

> Ein **Lehrling (5)** kann eine Meisteraufgabe versuchen – aber auf stark **erschwert**.
> Ein **Meister (19)** erledigt Routinearbeit auf stark **erleichtert** – fast ohne Fehlschlag-Risiko.

Stufengrenzen sind **keine harten Sperren**, sondern Sprünge im Basis-Modifier. Server-Config kann jeden Modifier jederzeit nachsteuern ohne die Progression anzufassen.

### Technische Umsetzung (Vorschau)

```js
// Probe-Auflösung (serverseitig)
function resolveCheck(character, skillId, difficultyModifier = 0) {
  const skillLevel = character.skills[skillId] ?? 0;
  const attrBonus  = getAttrBonus(character, skillId);
  const roll       = rollD20();
  const threshold  = skillLevel + attrBonus - difficultyModifier;
  return { success: roll <= threshold, roll, threshold };
}
```

---

## 8. Berechnungsformeln (Vorschau)
* **Basis-HP:** $KO \times 2 + Bonus$
* **Nahkampf-Basis-Schaden:** $(KK \times 0.5) + Waffenwert$
* **Magieresistenz:** $(MU + KL + IN) / 3$
