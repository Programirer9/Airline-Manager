let geld = 1000; 
let flugzeuge = [
    { 
        name: "Airbus A320", 
        kapazitaet: 180, 
        preis: 100000, 
        verfügbar: 5, 
        beschreibung: "Der Airbus A320 ist ein mittelgroßes Passagierflugzeug, ideal für kurze bis mittellange Strecken." 
    },
    { 
        name: "Boeing 737", 
        kapazitaet: 160, 
        preis: 95000, 
        verfügbar: 5, 
        beschreibung: "Die Boeing 737 ist ein beliebtes Verkehrsflugzeug, das für seine Effizienz auf Mittelstreckenflügen bekannt ist." 
    },
    { 
        name: "Boeing 747", 
        kapazitaet: 400, 
        preis: 250000, 
        verfügbar: 5, 
        beschreibung: "Die Boeing 747, auch als 'Jumbo' bekannt, bietet enorme Kapazität für Langstreckenflüge." 
    }
];

let mitarbeiter = [
    {
        name: "Pilot",
        kosten: 50000,
        anzahl: 0,
        beschreibung: "Piloten sind für den sicheren Betrieb der Flugzeuge verantwortlich. Ein qualifizierter Pilot kann das Risiko von Zwischenfällen minimieren."
    },
    {
        name: "Flughafenpersonal",
        kosten: 20000,
        anzahl: 0,
        beschreibung: "Flughafenpersonal kümmert sich um die Gepäckabfertigung, Boarding und andere logistische Aufgaben am Flughafen."
    }
];

let ruten = []; // Array für Routen
let einnahmen = 0;
let ausgaben = 0;

// Zeigt die Flottenübersicht
function zeigeFlottenansicht() {
    const ansicht = document.getElementById('ansicht');
    ansicht.innerHTML = '<h2>Flottenübersicht</h2><table class="table"><tr><th>Flugzeug</th><th>Kapazität</th><th>Preis</th><th>Verfügbar</th><th>Beschreibung</th></tr>';
    flugzeuge.forEach(flugzeug => {
        ansicht.innerHTML += `<tr>
            <td>${flugzeug.name}</td>
            <td>${flugzeug.kapazitaet}</td>
            <td>${flugzeug.preis} €</td>
            <td>${flugzeug.verfügbar}</td>
            <td>${flugzeug.beschreibung}</td> <!-- Beschreibung des Flugzeugs -->
        </tr>`;
    });
    ansicht.innerHTML += '</table>';
}

// Zeigt die Routenübersicht
function zeigeRoutenansicht() {
    const ansicht = document.getElementById('ansicht');
    ansicht.innerHTML = '<h2>Routenübersicht</h2>';
    if (ruten.length === 0) {
        ansicht.innerHTML += '<p>Keine Routen geplant.</p>';
    } else {
        ansicht.innerHTML += '<table class="table"><tr><th>Start</th><th>Ziel</th><th>Ticketpreis</th><th>Kapazität</th></tr>';
        ruten.forEach(rute => {
            ansicht.innerHTML += `<tr>
                <td>${rute.start}</td>
                <td>${rute.ziel}</td>
                <td>${rute.ticketpreis} €</td>
                <td>${rute.kapazitaet}</td>
            </tr>`;
        });
        ansicht.innerHTML += '</table>';
    }
}

// Zeigt die Finanzübersicht
function zeigeFinanzenansicht() {
    const ansicht = document.getElementById('ansicht');
    ansicht.innerHTML = `<h2>Finanzen</h2>
        <p>Einnahmen: ${einnahmen} €</p>
        <p>Ausgaben: ${ausgaben} €</p>
        <p>Aktuelles Geld: ${geld} €</p>`;
}

// Zeigt eine Weltkarte an
function zeigeWeltkarte() {
    const ansicht = document.getElementById('ansicht');
    ansicht.innerHTML = `<h2>Weltkarte</h2><p>Hier könnte eine Weltkarte sein!</p>`;
}

// Zeigt den Kaufbereich für Flugzeuge und Mitarbeiter an
function zeigeKaufansicht() {
    const ansicht = document.getElementById('ansicht');
    ansicht.innerHTML = `
        <h2>Kaufbereich</h2>
        
        <!-- Flugzeuge -->
        <h3>Flugzeuge</h3>
        <table class="table">
            <tr><th>Flugzeug</th><th>Preis</th><th>Beschreibung</th><th>Aktion</th></tr>
            ${flugzeuge.map((flugzeug, index) => `
                <tr>
                    <td>${flugzeug.name}</td>
                    <td>${flugzeug.preis} €</td>
                    <td>${flugzeug.beschreibung}</td> <!-- Beschreibung anzeigen -->
                    <td><button onclick="flugzeugKaufen(${index})">Kaufen</button></td>
                </tr>
            `).join('')}
        </table>
        
        <!-- Mitarbeiter -->
        <h3>Mitarbeiter</h3>
        <table class="table">
            <tr><th>Mitarbeiter</th><th>Kosten</th><th>Beschreibung</th><th>Aktion</th></tr>
            ${mitarbeiter.map((item, index) => `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.kosten} €</td>
                    <td>${item.beschreibung}</td> <!-- Beschreibung anzeigen -->
                    <td><button onclick="mitarbeiterKaufen(${index})">Kaufen</button></td>
                </tr>
            `).join('')}
        </table>
    `;
}

// Funktion zum Kauf eines Flugzeugs
function flugzeugKaufen(index) {
    const flugzeug = flugzeuge[index];
    if (geld >= flugzeug.preis) {
        geld -= flugzeug.preis;
        flugzeug.verfügbar -= 1;
        alert(`${flugzeug.name} wurde für ${flugzeug.preis} € gekauft!`);
        zeigeFinanzenansicht();  // Finanzübersicht aktualisieren
    } else {
        alert("Du hast nicht genug Geld!");
    }
}

// Funktion zum Kauf eines Mitarbeiters
function mitarbeiterKaufen(index) {
    const mitarbeiterItem = mitarbeiter[index];
    if (geld >= mitarbeiterItem.kosten) {
        geld -= mitarbeiterItem.kosten;
        mitarbeiterItem.anzahl += 1;
        alert(`${mitarbeiterItem.name} wurde für ${mitarbeiterItem.kosten} € gekauft!`);
        zeigeFinanzenansicht();  // Finanzübersicht aktualisieren
    } else {
        alert("Du hast nicht genug Geld!");
    }
}

// Funktion zum Speichern des Fortschritts
function speichereFortschritt() {
    const fortschritt = {
        geld,
        flugzeuge,
        mitarbeiter,
        ruten,
        einnahmen,
        ausgaben
    };
    localStorage.setItem('airline_manager_progress', JSON.stringify(fortschritt));
    alert("Fortschritt gespeichert!");
}

// Funktion zum Laden des Fortschritts
function ladeFortschritt() {
    const fortschritt = JSON.parse(localStorage.getItem('airline_manager_progress'));
    if (fortschritt) {
        geld = fortschritt.geld;
        flugzeuge = fortschritt.flugzeuge;
        mitarbeiter = fortschritt.mitarbeiter;
        ruten = fortschritt.ruten;
        einnahmen = fortschritt.einnahmen;
        ausgaben = fortschritt.ausgaben;
        alert("Fortschritt geladen!");
    } else {
        alert("Kein Fortschritt gefunden!");
    }
}

// Event-Listener für die verschiedenen Ansichten
document.getElementById('flotten-ansicht').addEventListener('click', zeigeFlottenansicht);
document.getElementById('routen-ansicht').addEventListener('click', zeigeRoutenansicht);
document.getElementById('finanzen-ansicht').addEventListener('click', zeigeFinanzenansicht);
document.getElementById('karte-ansicht').addEventListener('click', zeigeWeltkarte);
document.getElementById('kauf-ansicht').addEventListener('click', zeigeKaufansicht);

// Speichern und Laden beim Start
document.addEventListener('DOMContentLoaded', () => {
    ladeFortschritt();
    zeigeFlottenansicht();
});

// Event-Listener für das Speichern des Fortschritts
window.addEventListener('beforeunload', speichereFortschritt);
