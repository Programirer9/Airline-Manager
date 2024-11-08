let geld = 1000; 
let flugzeuge = [
    { name: "Airbus A320", kapazitaet: 180, preis: 100000, verfügbar: 5 },
    { name: "Boeing 737", kapazitaet: 160, preis: 95000, verfügbar: 5 },
    { name: "Boeing 747", kapazitaet: 400, preis: 250000, verfügbar: 5 }
];

let ruten = []; // Array für Routen
let einnahmen = 0;
let ausgaben = 0;

function zeigeFlottenansicht() {
    const ansicht = document.getElementById('ansicht');
    ansicht.innerHTML = '<h2>Flottenübersicht</h2><table class="table"><tr><th>Flugzeug</th><th>Kapazität</th><th>Preis</th><th>Verfügbar</th></tr>';
    flugzeuge.forEach(flugzeug => {
        ansicht.innerHTML += `<tr>
            <td>${flugzeug.name}</td>
            <td>${flugzeug.kapazitaet}</td>
            <td>${flugzeug.preis} €</td>
            <td>${flugzeug.verfügbar}</td>
        </tr>`;
    });
    ansicht.innerHTML += '</table>';
}

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

function zeigeFinanzenansicht() {
    const ansicht = document.getElementById('ansicht');
    ansicht.innerHTML = `<h2>Finanzen</h2>
        <p>Einnahmen: ${einnahmen} €</p>
        <p>Ausgaben: ${ausgaben} €</p>
        <p>Aktuelles Geld: ${geld} €</p>`;
}

function zeigeWeltkarte() {
    const ansicht = document.getElementById('ansicht');
    ansicht.innerHTML = `<h2>Weltkarte</h2><p>Hier könnte eine Weltkarte sein!</p>`;
}

// Funktion zum Speichern des Fortschritts
function speichereFortschritt() {
    const fortschritt = {
        geld,
        flugzeuge,
        mitarbeiter,
        ausstattung,
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
        ruten = fortschritt.ruten;
        einnahmen = fortschritt.einnahmen;
        ausgaben = fortschritt.ausgaben;
        alert("Fortschritt geladen!");
    } else {
        alert("Kein Fortschritt gefunden!");
    }
}

document.getElementById('flotten-ansicht').addEventListener('click', zeigeFlottenansicht);
document.getElementById('routen-ansicht').addEventListener('click', zeigeRoutenansicht);
document.getElementById('finanzen-ansicht').addEventListener('click', zeigeFinanzenansicht);
document.getElementById('karte-ansicht').addEventListener('click', zeigeWeltkarte);

// Funktion zum Hinzufügen einer Route (muss durch Benutzeraktionen aufgerufen werden)
function routeHinzufuegen(start, ziel, ticketpreis, kapazitaet) {
    ruten.push({ start, ziel, ticketpreis, kapazitaet });
    einnahmen += ticketpreis * kapazitaet; // Beispiel-Einnahmen
    ausgaben += 0; // Hier könnten Ausgaben für die Route hinzugefügt werden
}

// Beispiel für das Hinzufügen einer Route
routeHinzufuegen("Berlin", "München", 100, 180);

// Speichern und Laden beim Start
document.addEventListener('DOMContentLoaded', () => {
    ladeFortschritt();
    zeigeFlottenansicht();
});
// Funktion zum Kauf eines Flugzeugs
function flugzeugKaufen(index) {
    const flugzeug = flugzeuge[index];
    if (geld >= flugzeug.preis) {
        geld -= flugzeug.preis;
        flugzeug.verfügbar++;
        alert(`${flugzeug.name} gekauft!`);
    } else {
        alert("Nicht genug Geld!");
    }
    zeigeKaufansicht();
}

// Funktion zum Kauf eines Mitarbeiters
function mitarbeiterKaufen(index) {
    const person = mitarbeiter[index];
    if (geld >= person.kosten) {
        geld -= person.kosten;
        person.anzahl++;
        alert(`${person.name} eingestellt!`);
    } else {
        alert("Nicht genug Geld!");
    }
    zeigeKaufansicht();
}
// Funktion zum Kauf einer Ausstattung
function ausstattungKaufen(index) {
    const item = ausstattung[index];
    if (geld >= item.kosten) {
        geld -= item.kosten;
        item.anzahl++;
        alert(`${item.name} gekauft!`);
    } else {
        alert("Nicht genug Geld!");
    }
    zeigeKaufansicht();
}

// Event-Listener für das Speichern
window.addEventListener('beforeunload', speichereFortschritt);
