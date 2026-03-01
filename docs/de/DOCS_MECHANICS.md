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

## 6. Berechnungsformeln (Vorschau)
* **Basis-HP:** $KO \times 2 + Bonus$
* **Nahkampf-Basis-Schaden:** $(KK \times 0.5) + Waffenwert$
* **Magieresistenz:** $(MU + KL + IN) / 3$