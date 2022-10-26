// Différents lieux
let $map = document.querySelector("#map");

const urlUsers = 'http://localhost:3000/users/'
var tableauMarqueurs = [];
var listeUsers = [];
var listeNomVilleUsers = [];
var lieuxActif;

class LeafletMap {

    constructor() {
        this.map = $map;
    }

    /* Getters & setters */
    getMap() { return this.map; }

    suppressionMap() {
        this.map.off();
        this.map.remove();
    }

    creerNouvelleMap() {
        this.map.createPane();
    }

    allerA(lieuxActif) {
        this.map.flyTo([lieuxActif['lat'], lieuxActif['long']], lieuxActif['zoom']);
        this.addMarker(lieuxActif["markers"]);
    }


    load(e, lieuRandom) {

        this.map = L.map("map").setView([lieuRandom["lat"], lieuRandom["long"]], lieuRandom["zoom"]).on("click", this.markerOnClick);

        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
        }).addTo(this.map);

        this.addMarker(lieuRandom["markers"]);
    }


    markerOnClick(e) {
        var icone = L.icon({
            iconUrl: "./images/emplacement.png",
            iconSize: [50, 50],
            iconAnchor: [25, 50],
            popupAnchor: [0, -50]
        })

        // var newMarker = new L.marker(e.latlng).addTo(this.map);

        var marqueur = new L.Marker([parseFloat(e.latlng["lat"]), parseFloat(e.latlng["lng"])], { icon: icone }).addTo(this.map);
    }

    addMarker(markers) {

        var icone = L.icon({
            iconUrl: "./images/emplacement.png",
            iconSize: [50, 50],
            iconAnchor: [25, 50],
            popupAnchor: [0, -50]
        })

        markers.forEach(e => {
            var marqueur = L.marker([parseFloat(e["lat"]), parseFloat(e["long"])], { icon: icone }).addTo(this.map);

            var lat = parseFloat(e["lat"]) + 0.002;
            var long = parseFloat(e["long"]);

            var popup = L.popup()
                .setLatLng([lat, long])
                .setContent("<p > -- -- -- -- -- -- -- - Details device-- -- -- -- -- -- -- - </p>" +
                    "<p>ID : " + e["id"] + "</p>" +
                    "<p>Name : " + e["name"] + "</p>" +
                    "<p>Date : " + e["date"] + "</p>" +
                    "<hr>" +
                    "<button type='button' class='btn btn-primary mb-2 btn-sm'>Settings</button>" + " " +
                    "<button type='button' class='btn btn-secondary mb-2 btn-sm'>Mobility</button>" + " " +
                    "<button type='button' class='btn btn-success mb-2 btn-sm'>Graph</button>" + " " +
                    "<button type='button' class='btn btn-danger mb-2 btn-sm'>Delete</button>"

                )
                .openOn(this.map);

            marqueur.bindPopup(popup).openPopup();;

        });
    }
}

let map = new LeafletMap();

async function initMap(lieuRandom) {
    map.load($map, lieuRandom);
}


/** Récupère toutes les données de la base MongoDB */
const getUsersData = () => {

    const endpoint = urlUsers;

    fetch(endpoint, {
            method: 'GET',
            headers: []
        })
        .then(function(response) {
            response.json().then(function(json) {
                listeUsers = json;

                /* Chargement la liste Select avec le pseudo des users */
                // Récupère le SELECT
                var elt = document.querySelector('#Ma_Liste');

                // Vide la liste s'il elle n'est pas vide
                while (elt.options.length > 1) {
                    elt.remove(0);
                }

                // Remplit le SELECT avec les noms des users
                for (i = 0; i < listeUsers.length; i++) {
                    var option4 = new Option(listeUsers[i]['pseudo'], parseInt(i + 1));
                    elt.options[elt.options.length] = option4;
                }


                const mesLieux = Object.values(listeUsers);

                // Sélectionne un lieu random du fichier JSON
                var a = parseInt(Math.random() * Object.keys(mesLieux).length);

                const lieuRandom = mesLieux[a]

                // Mémorise le lieu actif
                lieuxActif = lieuRandom;

                // Récupère le pseudo et change l'index de la liste user
                for (i = 0; i < listeUsers.length; i++) {
                    if (listeUsers[i]['pseudo'] == lieuRandom['pseudo']) {
                        document.FormUsers.MaListe.selectedIndex = i + 1;
                        break;
                    }
                }

                // Met à jour les champs textes
                document.getElementById('pseudo_2').innerHTML = lieuRandom['pseudo'];
                document.getElementById('welcome_2').innerHTML = lieuRandom['hello'];

                document.getElementById('id_avatar').src = lieuRandom.avatar;

                // Init de la map avec les données
                initMap(lieuRandom);
            });
        })
        //.then(data => window.location.reload())
        .catch(err => console.log(err));
}

/** Récupère le choix de l'utilisateur pour le user actif */
function ChoixUser() {
    i = document.FormUsers.MaListe.selectedIndex;
    if (i == 0) return;
    var ret_label = document.FormUsers.MaListe.options[i].label;
    var ret_value = document.FormUsers.MaListe.options[i].value;
    var ret_selected = document.FormUsers.MaListe.options[i].selected;



    /*
        if (map.getMap() != undefined) {
            map.suppressionMap();
        }*/


    //recherche du user en fonction du SELECT
    for (i = 0; i < listeUsers.length; i++) {
        if (listeUsers[i]['pseudo'] == ret_label) {
            // Init de la map avec les données
            lieuxActif = listeUsers[i];
            break;
        }
    }

    // Met à jour les champs textes
    document.getElementById('pseudo_2').innerHTML = lieuxActif['pseudo'];
    document.getElementById('welcome_2').innerHTML = lieuxActif['hello'];

    document.getElementById('id_avatar').src = lieuxActif.avatar;

    map.allerA(lieuxActif);
}