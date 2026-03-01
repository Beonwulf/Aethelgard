# 🗄️ Datenbank-Schema - Aethelgard
Dieses Dokument beschreibt die Tabellenstruktur und die Beziehungen (Relations) innerhalb der PostgreSQL-Datenbank. Die Verwaltung erfolgt über Knex.js.


## 1. Kern-Tabellen
`characters` Die zentrale Tabelle für alle Spielerfiguren.
* `id`: Primary Key (increments).
* `user_id`: Foreign Key (Verbindung zum Account).
* `name`: String (Name des Helden).
* `profession`: String (Slug, verweist auf professions.js).
* `derived_stats`: JSONB (Speichert HP, MP, Göttliche Macht, Stamina).
* `attributes`: JSONB (Speichert MU, KL, IN, CH, FF, GE, KO, KK).
* `biography`: JSONB (Speichert Array der IDs aus dem Lebenspfad-System für die Vorgeschichte).

`organizations` (Fraktionen & Kulte) Definiert alle Gruppierungen in Aethelgard.
* `slug`: Unique String (z.B. orden_des_solan).
* `type`: Enum (region, faction, enemy_faction).
* `associated_god`: String (Optionaler Link zu einer Gottheit).
* `associated_adversary`: String (Optionaler Link zu einem Widersacher).


## 2. Reputations- & Gunst-System (Pivot-Tabellen)
Um die Fortschritte jedes Charakters individuell zu speichern, nutzen wir Mapping-Tabellen.

`character_reputation` Speichert das Ansehen eines Charakters bei den sterblichen Organisationen.
* `character_id`: Foreign Key (characters.id).
* `organization_slug`: Foreign Key (organizations.slug).
* `value`: Integer (Range: -10.000 bis +10.000).
* `rank_title`: String (Dynamischer Titel wie "Geächteter" oder "Champion").

`character_divine_favor` (Gunst-Pool) Speichert das langfristige Wohlwollen der Götter.
* `character_id`: Foreign Key (characters.id).
* `god_slug`: String (Name der Gottheit, z.B. solan, yldra).
* `total_points`: BigInt (Kumulierte Punkte über die gesamte Spielzeit).
* `current_points`: Integer (Aktuell ausgebbare "Währung").


## 3. Welt-Daten (NPCs & Loot)
`npcs` Enthält alle stationären und wandernden Bewohner Aethelgards.
* `slug`: Unique Identifier.
* `faction_slug`: Link zur organizations-Tabelle.
* `interaction_config`: JSONB (Definiert Quests, Dialoge und Reputations-Belohnungen).


## 4. Entity-Relationship-Übersicht
1. Ein Charakter kann viele Reputationseinträge haben (1:N).
2. Eine Organisation kann vielen Charakteren bekannt sein (1:N).
3. NPCs gehören einer Organisation an. Tötet oder hilft man ihnen, triggert der Bifrost ein Update in character_reputation für die entsprechende faction_slug.


## Warum JSONB?
Wir nutzen für derived_stats, attributes und interaction_config das JSONB-Format von PostgreSQL. Dies erlaubt uns:
* `Flexibilität`: Wir können neue Attribute hinzufügen, ohne jedes Mal die Tabellenstruktur zu migrieren.
* `Performance`: JSONB ist binär gespeichert und indizierbar, was schnellere Abfragen durch den Bifrost ermöglicht.


----------------------------

// Tabelle: world_pois
{
  id: 1,
  name: "Ruine von Mornirs Wacht",
  x: 150.5, y: 12.0, z: -300.2,
  organization_slug: "mornirs_erben",
  taint_level: 45, // Hier ist die Welt korrumpiert!
  spawn_config: { type: "undead", rate: 0.5 }
}