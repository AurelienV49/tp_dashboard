let mesLieuxJson = [{
        'name': 'Ynov',
        'lat': '47.205412',
        'long': '-1.539511',
        'zoom': 14,
        "markers": [{
                'name': 'p1',
                'lat': '47.195412',
                'long': '-1.519511',
                'id': 'DeviceID_djc*ds--c--s-xsxvj',
                'name': 'dzad',
                'date': '2022-10-01'
            },
            {
                'name': 'p2',
                'lat': '47.205412',
                'long': '-1.529511',
                'id': 'DeviceID_djcxx26626c+ lknjknk j',
                'name': 'dzad',
                'date': '2022-10-02'
            },
            {
                'name': 'p3',
                'lat': '47.215412',
                'long': '-1.529511',
                'id': 'DeviceID_djcgsj6265d d dd55d5d5dvj',
                'name': 'dzad',
                'date': '2022-10-03'
            },
            {
                'name': 'p4',
                'lat': '47.205412',
                'long': '-1.539511',
                'id': 'DeviceID_djcgsjg++ -- + -- +- ++-- ',
                'name': 'dzad',
                'date': '2022-10-03'
            },
        ]
    },
    {
        'name': 'Barcelone',
        'lat': '41.37516155395602',
        'long': '2.1805328686532555',
        'zoom': 14,
        "markers": [{
                'name': 'p1',
                'lat': '41.370131922916364',
                'long': '2.170917925465945',
                'id': 'DeviceID_djcgsjg*j+++++++',
                'name': 'dzad',
                'date': '2022-10-05'
            },
            {
                'name': 'p2',
                'lat': '41.38072319796469',
                'long': '2.185066437150427',
                'id': 'DeviceID_djcgsjg*j--------',
                'name': 'dzad',
                'date': '2022-10-06'
            },
            {
                'name': 'p3',
                'lat': '41.38842171984522',
                'long': '2.18667207599319',
                'id': 'DeviceID_djcgsjg*jhsdvjhv6566666  sbvj',
                'name': 'dzad',
                'date': '2022-10-07'
            },
            {
                'name': 'p4',
                'lat': '41.368651399046996',
                'long': '2.188202155361436',
                'id': 'DeviceID_djcgsjg*jdd bvj',
                'name': 'dzad',
                'date': '2022-10-08'
            },
        ]
    },
    {
        'name': 'Tunisie',
        'lat': '36.79605994054178',
        'long': '10.189515685441393',
        'zoom': 10,
        "markers": [{
                'name': 'p1',
                'lat': '36.809693891900885',
                'long': '10.263344487075914',
                'id': 'DeviceID_djcgsj6559 + kbhj vv 55 2vj',
                'name': 'dzad',
                'date': '2022-10-09'
            },
            {
                'name': 'p2',
                'lat': '36.82546602613215',
                'long': '10.19768274817733',
                'id': 'DeviceID_djcgsjg* jhgjh 662 cdc',
                'name': 'dzad',
                'date': '2022-10-10'
            },
            {
                'name': 'p3',
                'lat': '36.76073493215711',
                'long': '10.17618096796577',
                'id': 'DeviceID_djcgsjg*jhsdvj ',
                'name': 'dzad',
                'date': '2022-10-11'
            },
            {
                'name': 'p4',
                'lat': '36.74907213447651',
                'long': '10.224569007803549',
                'id': 'DeviceID_djcgsjg*jhsdv  4554545 jhvsdbjhdsbvj',
                'name': 'dzad',
                'date': '2022-10-12'
            },
        ]
    },
    {
        'name': 'San Miguel De Allende',
        'lat': '20.915074607995553',
        'long': '-100.74343635377195',
        'zoom': 10,
        "markers": [{
                'name': 'p1',
                'lat': '20.708187032182256',
                'long': '-100.45715637810798',
                'id': 'DeviceID_465----cdcddccc',
                'name': 'dzad',
                'date': '2022-10-13'
            },
            {
                'name': 'p2',
                'lat': '20.589266712960114',
                'long': '-100.3999003829752',
                'id': 'DeviceID_151451',
                'name': 'dzad',
                'date': '2022-10-14'
            },
            {
                'name': 'p3',
                'lat': '21.0000382679492',
                'long': '-100.38723312741493',
                'id': 'DeviceID_djcgsjg*jhsdvjhvsdbjhdsbvj',
                'name': 'dzad',
                'date': '2022-10-15'
            },
            {
                'name': 'p4',
                'lat': '21.16134478336257',
                'long': '-100.92787159473079',
                'id': 'DeviceID_mkdscmkcd   sùcd',
                'name': 'dzad',
                'date': '2022-10-16'
            },
        ]
    }
];

// Différents lieux
let $map = document.querySelector('#map');


var tableauMarqueurs = [];

var lieuxActif;

class LeafletMap {

    constructor() {
        this.map = $map;
    }


    load(e, lieuRandom) {

        this.map = L.map("map").setView([lieuRandom['lat'], lieuRandom['long']], lieuRandom['zoom']).on('click', this.markerOnClick);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);

        this.addMarker(lieuRandom['markers']);
    }


    markerOnClick(e) {
        var icone = L.icon({
            iconUrl: "./images/emplacement.png",
            iconSize: [50, 50],
            iconAnchor: [25, 50],
            popupAnchor: [0, -50]
        })

        // var newMarker = new L.marker(e.latlng).addTo(this.map);

        var marqueur = new L.Marker([parseFloat(e.latlng['lat']), parseFloat(e.latlng['lng'])], { icon: icone }).addTo(this.map);
    }

    addMarker(markers) {

        var icone = L.icon({
            iconUrl: "./images/emplacement.png",
            iconSize: [50, 50],
            iconAnchor: [25, 50],
            popupAnchor: [0, -50]
        })

        markers.forEach(e => {
            var marqueur = L.marker([parseFloat(e['lat']), parseFloat(e['long'])], { icon: icone }).addTo(this.map);

            var lat = parseFloat(e['lat']) + 0.002;
            var long = parseFloat(e['long']);

            var popup = L.popup()
                .setLatLng([lat, long])
                .setContent('<p > -- -- -- -- -- -- -- - Details device-- -- -- -- -- -- -- - </p>' +
                    '<p>ID : ' + e['id'] + '</p>' +
                    '<p>Name : ' + e['name'] + '</p>' +
                    '<p>Date : ' + e['date'] + '</p>' +
                    '<hr>' +
                    '<button type="button" class="btn btn-primary mb-2 btn-sm">Settings</button>' + ' ' +
                    '<button type="button" class="btn btn-secondary mb-2 btn-sm">Mobility</button>' + ' ' +
                    '<button type="button" class="btn btn-success mb-2 btn-sm">Graph</button>' + ' ' +
                    '<button type="button" class="btn btn-danger mb-2 btn-sm">Delete</button>'

                )
                .openOn(this.map);

            marqueur.bindPopup(popup).openPopup();;

        });
    }
}

let map = new LeafletMap();

let initMap = async function() {

    const mesLieux = Object.values(mesLieuxJson)

    // Sélectionne un lieu random du fichier JSON
    var a = parseInt(Math.random() * Object.keys(mesLieux).length);

    const lieuRandom = mesLieux[a]

    // Mémorise le lieu actif
    lieuxActif = lieuRandom;

    map.load($map, lieuRandom);
}