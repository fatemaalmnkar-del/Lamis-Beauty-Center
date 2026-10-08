# Lamis Beauty Center

Dieses Projekt ist mein Abschlussprojekt im Bereich Full-Stack-Webentwicklung.

Ich habe eine komplette Webseite für ein Beauty Center entwickelt. Die Webseite ist für Kunden und für die Verwaltung gedacht.

Kunden können sich registrieren, anmelden, Behandlungen ansehen, Termine buchen, Bewertungen schreiben und ihre eigenen Daten und Termine verwalten.

Für die Verwaltung gibt es zusätzlich einen Admin-Bereich, in dem Dienstleistungen, Termine und Galerie-Bilder verwaltet werden können.

---

## Projektidee

Die Idee war, eine moderne und übersichtliche Webseite für ein Beauty Center zu entwickeln.

Wichtig war mir, dass Kunden viele Dinge direkt über die Webseite erledigen können, zum Beispiel:

- Behandlungen ansehen
- Preise sehen
- Termine buchen
- eigene Termine verwalten
- Bewertungen schreiben
- Vorher-/Nachher-Bilder ansehen
- das Beauty Center kontaktieren

Die Webseite ist responsive und kann auch auf dem Handy benutzt werden.

---

## Funktionen für Kunden

### Registrierung und Anmeldung

Kunden können ein neues Konto erstellen und sich anschließend anmelden.

Bei der Registrierung werden verschiedene Daten gespeichert, zum Beispiel:

- Name
- E-Mail-Adresse
- Telefonnummer
- Geburtsdatum
- Passwort

Das Passwort wird im Backend nicht als normaler Text gespeichert, sondern mit `bcrypt` gehasht.

Nach der Anmeldung erhält der Benutzer ein JWT-Token.

---

## Benutzerprofil

Angemeldete Benutzer haben einen eigenen Profilbereich.

Dort können sie ihre persönlichen Daten ansehen und bearbeiten.

Zum Beispiel:

- Name
- Telefonnummer
- Geburtsdatum

---

## Behandlungen

Auf der Seite **Behandlungen** werden die angebotenen Dienstleistungen angezeigt.

Jede Behandlung kann Informationen enthalten wie:

- Titel
- Beschreibung
- Kategorie
- Preis
- Dauer
- Bild

Die Dienstleistungen werden aus der Datenbank geladen.

Kunden können von dort direkt zur Terminbuchung weitergehen.

---

## Terminbuchung

Angemeldete Kunden können Termine buchen.

Bei der Buchung können sie unter anderem auswählen:

- Behandlung
- Datum
- Uhrzeit

Sonntag ist nicht für Buchungen verfügbar.

Bereits gebuchte Zeiten werden geprüft, damit derselbe Termin nicht doppelt vergeben wird.

Kunden können ihre eigenen Termine unter **Meine Termine** ansehen.

Die Termine können verschiedene Status haben:

- Ausstehend
- Bestätigt
- Abgeschlossen
- Storniert

Ein Kunde kann einen Termin stornieren, solange er noch nicht abgeschlossen oder storniert wurde.

---

## Admin-Bereich

Für Administratoren gibt es einen eigenen Bereich.

Der Admin kann verschiedene Teile der Webseite verwalten.

### Dienstleistungen verwalten

Der Admin kann:

- neue Behandlungen hinzufügen
- Behandlungen bearbeiten
- Behandlungen löschen
- Bilder hochladen

Die Bilder werden über Cloudinary gespeichert.

Für den Upload wird Multer verwendet.

---

## Termine verwalten

Der Admin kann alle Termine sehen.

Die Termine können nach Status gefiltert werden.

Mögliche Filter:

- Alle
- Bestätigung erforderlich
- Bestätigt
- Abgeschlossen
- Storniert

Der Admin kann:

- einen Termin bestätigen
- einen Termin abschließen
- einen Termin stornieren
- einen Termin dauerhaft löschen
- alle stornierten Termine löschen
- alle abgeschlossenen Termine löschen

---

## Vorher-/Nachher-Galerie

Die Webseite hat eine eigene Galerie für Vorher-/Nachher-Bilder.

Die Bilder werden als Paare angezeigt:

- Vorher
- Nachher

Für die Galerie wird `react-image-gallery` verwendet.

Der Admin kann neue Bilder hochladen und Bilder wieder löschen.

Die Bilder werden über Cloudinary gespeichert.

---

## Bewertungen

Besucher können vorhandene Bewertungen ansehen.

Angemeldete Benutzer können eigene Bewertungen schreiben.

Eine Bewertung enthält:

- Sternebewertung
- Kommentar
- Benutzername
- optional eine Behandlung

Auf der Startseite werden einige Bewertungen angezeigt.

Zusätzlich gibt es eine eigene Seite für alle Bewertungen.

Administratoren können Bewertungen löschen.

---

## Kontakt

Die Webseite hat eine eigene Kontaktseite.

Dort werden angezeigt:

- Adresse
- Telefonnummer
- E-Mail-Adresse
- Öffnungszeiten

Außerdem gibt es eine Karte mit dem Standort.

Das Kontaktformular sendet die Nachricht über WhatsApp.

Der Benutzer gibt zum Beispiel ein:

- Name
- E-Mail-Adresse
- Telefonnummer
- Betreff
- Nachricht

Danach wird WhatsApp mit einer vorbereiteten Nachricht geöffnet.

---

## Über-uns-Seite

Es gibt eine eigene Seite mit Informationen über das Beauty Center.

Dort werden das Studio, die Atmosphäre und weitere Informationen über das Unternehmen vorgestellt.

---

## Startseite

Die Startseite enthält verschiedene Bereiche der Webseite.

Dazu gehören unter anderem:

- Hero-Bereich
- Vorstellung des Beauty Centers
- Dienstleistungen
- Bewertungen
- Links zu weiteren Seiten
- Terminbuchung

---

   ## Responsive Design

Die Webseite wurde auch für kleinere Bildschirme angepasst.

Auf dem Handy wird die Navigation als Hamburger-Menü angezeigt.

Dadurch bleibt die Navigation übersichtlich und nimmt auf kleinen Geräten weniger Platz ein.

Auch die Seiten, Karten, Formulare und Bereiche wurden für Tablet und Mobile angepasst.

---

## Navigation

Die Navigation verändert sich abhängig davon, ob ein Benutzer angemeldet ist.

### Nicht angemeldete Benutzer

Sie sehen unter anderem:

- Startseite
- Über Uns
- Behandlungen
- Vorher/Nachher
- Kontakt
- Anmelden
- Registrieren

### Angemeldete Kunden

Zusätzlich sehen sie:

- Mein Profil
- Meine Termine
- Abmelden

### Administrator

Der Administrator sieht zusätzlich:

- Admin-Bereich

---

## Footer

Im Footer befinden sich:

- Logo
- Schnelllinks
- Kontaktinformationen
- Adresse
- Öffnungszeiten
- Social-Media-Links

Social Media:

- Facebook
- Instagram
- TikTok

---

# Verwendete Technologien

## Frontend

Für das Frontend habe ich verwendet:

- React
- Vite
- React Router
- Redux Toolkit
- React Redux
- Axios
- React Icons
- React Image Gallery
- CSS

---

## Backend

Für das Backend habe ich verwendet:

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Multer
- Cloudinary
- dotenv
- CORS

---

## Datenbank

Als Datenbank wird MongoDB verwendet.

Mit Mongoose habe ich verschiedene Models erstellt.

Dazu gehören:

- User
- Service
- Booking
- Review
- GalleryImage

---

## Authentifizierung

Für die Anmeldung wird JWT verwendet.

Nach erfolgreicher Anmeldung wird ein Token erstellt.

Geschützte Routen prüfen dieses Token über eine Middleware.

Zusätzlich gibt es eine Admin-Middleware, damit bestimmte Funktionen nur von Administratoren verwendet werden können.

---

## Bilder

Für hochgeladene Bilder wird Cloudinary verwendet.

Multer verarbeitet die Bilder zuerst im Backend.

Anschließend werden sie zu Cloudinary hochgeladen.

Dies wird zum Beispiel für:

- Behandlungsbilder
- Galerie-Bilder

verwendet.

---

## API

Das Frontend kommuniziert mit dem Backend über Axios.

Die API ist in verschiedene Bereiche aufgeteilt:

- `/api/auth`
- `/api/users`
- `/api/services`
- `/api/bookings`
- `/api/reviews`
- `/api/gallery`

---

# Projektstruktur

Die wichtigsten Ordner sind:

```text
Lamis-Beauty-Center
│
├── Backend
│   └── src
│       ├── config
│       ├── controllers
│       ├── middleware
│       ├── models
│       ├── routes
│       └── server.js
│
├── frontend
│   ├── public
│   └── src
│       ├── hooks
│       ├── pages
│       ├── services
│       ├── store
│       ├── App.jsx
│       └── main.jsx
│
└── package.json
```

---

# Frontend starten

Zuerst in den Frontend-Ordner wechseln:

```bash
cd frontend
```

Pakete installieren:

```bash
npm install
```

Frontend starten:

```bash
npm run dev
```

---

# Backend starten

In den Backend-Ordner wechseln:

```bash
cd Backend
```

Pakete installieren:

```bash
npm install
```

Backend im Entwicklungsmodus starten:

```bash
npm run dev
```

Für den normalen Start:

```bash
npm start
```

---

# Umgebungsvariablen

Für sensible Daten werden `.env` Dateien verwendet.

Diese Dateien werden nicht auf GitHub hochgeladen.

## Backend

Beispiel:

```env
PORT=5100
MONGO_URI=
JWT_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## Frontend

Beispiel:

```env
VITE_API_URL=http://localhost:5100/api
```

Dadurch kann die API-Adresse später geändert werden, ohne den Code direkt ändern zu müssen.

---

# Sicherheit

Im Projekt habe ich verschiedene Sicherheitsmaßnahmen verwendet.

Zum Beispiel:

- Passwörter werden mit bcrypt gehasht
- Anmeldung mit JWT
- geschützte Routen
- Admin-Routen nur für Administratoren
- `.env` Dateien werden nicht auf GitHub hochgeladen
- Uploads werden im Backend geprüft
- nur bestimmte Benutzer können bestimmte Aktionen durchführen

---

# Was ich bei diesem Projekt gelernt habe

Bei diesem Projekt habe ich viele Teile einer Full-Stack-Anwendung miteinander verbunden.

Ich habe unter anderem gelernt:

- React-Seiten aufzubauen
- mit React Router zu arbeiten
- Redux für Benutzerinformationen zu verwenden
- Daten mit Axios vom Backend zu laden
- REST-API-Routen mit Express zu erstellen
- MongoDB und Mongoose zu benutzen
- Registrierung und Login umzusetzen
- JWT zu verwenden
- Rollen wie User und Admin zu unterscheiden
- Bilder hochzuladen
- Cloudinary und Multer zu benutzen
- Buchungen zu verwalten
- responsive Webseiten zu entwickeln
- Frontend und Backend miteinander zu verbinden

Für mich war besonders wichtig zu verstehen, wie die verschiedenen Teile zusammenarbeiten und wie man Fehler Schritt für Schritt findet und löst.

---

# Autorin

Fatema Almnkar

Full-Stack-Webentwicklungsprojekt  
Lamis Beauty Center