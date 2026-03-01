# 🗄️ Database Schema - Aethelgard
This document describes the table structure and relations within the PostgreSQL database. Management is handled via Knex.js.

## 1. Core Tables
`characters` The central table for all player characters.
* `id`: Primary Key (increments).
* `user_id`: Foreign Key (Link to the account).
* `name`: String (Name of the hero).
* `profession`: String (Slug, references professions.js).
* `derived_stats`: JSONB (Stores HP, MP, Divine Power, Stamina).
* `attributes`: JSONB (Stores MU, KL, IN, CH, FF, GE, KO, KK).
* `biography`: JSONB (Stores array of IDs from the lifepath system for backstory).

`organizations` (Factions & Cults) Defines all groups in Aethelgard.
* `slug`: Unique String (e.g., order_of_solan).
* `type`: Enum (region, faction, enemy_faction).
* `associated_god`: String (Optional link to a deity).
* `associated_adversary`: String (Optional link to an adversary).

## 2. Reputation & Favor System (Pivot Tables)
To store individual progress for each character, we use mapping tables.

`character_reputation` Stores a character's standing with mortal organizations.
* `character_id`: Foreign Key (characters.id).
* `organization_slug`: Foreign Key (organizations.slug).
* `value`: Integer (Range: -10,000 to +10,000).
* `rank_title`: String (Dynamic title like "Outlaw" or "Champion").

`character_divine_favor` (Favor Pool) Stores the long-term goodwill of the gods.
* `character_id`: Foreign Key (characters.id).
* `god_slug`: String (Name of the deity, e.g., solan, yldra).
* `total_points`: BigInt (Cumulative points over entire playtime).
* `current_points`: Integer (Currently spendable "currency").

## 3. World Data (NPCs & Loot)
`npcs` Contains all stationary and wandering inhabitants of Aethelgard.
* `slug`: Unique Identifier.
* `faction_slug`: Link to the organizations table.
* `interaction_config`: JSONB (Defines quests, dialogues, and reputation rewards).

## 4. Entity-Relationship Overview
1. A character can have many reputation entries (1:N).
2. An organization can be known by many characters (1:N).
3. NPCs belong to an organization. Killing or helping them triggers Bifrost to update character_reputation for the corresponding faction_slug.

## Why JSONB?
We use PostgreSQL's JSONB format for derived_stats, attributes, and interaction_config. This allows us to:
* `Flexibility`: Add new attributes without migrating the table structure every time.
* `Performance`: JSONB is stored in binary and is indexable, enabling faster queries by Bifrost.

----------------------------

// Table: world_pois
{
  id: 1,
  name: "Ruins of Mornir's Watch",
  x: 150.5, y: 12.0, z: -300.2,
  organization_slug: "mornirs_heirs",
  taint_level: 45, // World is corrupted here!
  spawn_config: { type: "undead", rate: 0.5 }
}