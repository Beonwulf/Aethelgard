# ⚙️ Game Mechanics - Aethelgard Core

This document describes the mathematical and technical rules governing the world of Aethelgard.

---

## 1. Attribute System
The system uses eight primary attributes (based on TDE/DSA), forming the core of every character.

| Abbreviation | Attribute | Focus |
| :--- | :--- | :--- |
| **MU** | Courage | Resistance to fear, initiative, attack value. |
| **KL** | Cleverness | Knowledge, logic, effectiveness of spells. |
| **IN** | Intuition | Perception, dodging, ranged combat. |
| **CH** | Charisma | Interacting with NPCs, prices, persuasion. |
| **FF** | Dexterity | Crafting, lockpicking, precision. |
| **GE** | Agility | Speed, parrying, climbing. |
| **KO** | Constitution | Health points (HP), stamina, poison resistance. |
| **KK** | Strength | Melee damage, carrying capacity, intimidation. |

---

## 2. Energy Resources
Characters consume different energies for actions.

### 🔵 Mana (MP)
* **Users:** Mages, Rune Masters.
* **Regeneration:** Depends on `KL` and resting periods.
* **Purpose:** Casting arcane spells.

### 🟡 Divine Power
* **Users:** Clerics, Paladins, Priests, Druids, Shamans, Cultists.
* **Regeneration:** Depends on `MU` and prayers/meditation.
* **Purpose:** Performing miracles, blessings, and rites.

### 🟢 Stamina
* **Users:** All classes (especially warriors).
* **Purpose:** Sprinting, heavy attacks, blocking.

---

## 3. Reputation & Favor System

### 🎖️ Reputation (Social Standing)
Measures standing with mortal organizations (Scale: **-10,000 to +10,000**).
* **Arch-enemy (-10k):** Aggro on sight from guards.
* **Champion (+10k):** Maximum discounts, access to legendary quests/items.

### 🌌 Divine Favor
A pool (currency) representing the goodwill of the gods.
* **Acquisition:** Through specific deeds (e.g., saving spirits for Mornir).
* **Consumption:** Can be exchanged at shrines for permanent buffs, taint cleansing, or "miracles".

---

## 4. Corruption (Taint System)
The measure of dark influence by adversaries (e.g., Nidhogg or Surtr).
* **Increase:** Staying in corrupted areas, using dark magic, interacting with cultists.
* **Effects:**
    * **Level 1-10:** No noticeable effects.
    * **Level 50+:** Penalty on `CH`, slight HP degeneration.
    * **Level 100:** Transformation or death of the character.
* **Healing:** Only possible through large sacrifices (Favor) or specialized rituals of Valeria/Solan.

---

## 5. The Lifepath System (The Chronicle)
During hero creation, characters are not just empty stat blocks. Aethelgard uses a complex, **bilingual lifepath system** (`data/mechanics/lifepath.js`).
* **Categories:** The biography is woven from 4 phases: Omen (Birth), Childhood, Event, and Encounter.
* **Dynamic Selection:** A cultist receives different events than a dwarven soldier. Random tables actively check the chosen culture and profession.
* **Secret Bonuses:** Many events grant hidden permanent bonuses (e.g., +1 Courage for surviving a duel, or +1 Pickpocketing as an orphan).
* **Threads of Fate:** Players have 3 "rerolls" during creation to weave a new destiny if they dislike their story.

---

## 6. Calculation Formulas (Preview)
* **Base HP:** $KO 	imes 2 + Bonus$
* **Melee Base Damage:** $(KK 	imes 0.5) + Weapon Value$
* **Magic Resistance:** $(MU + KL + IN) / 3$