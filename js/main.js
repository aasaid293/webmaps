let latlngParis = [48.86666, 2.33333] // longitude et latitude du centre
let latlngCreteil =  [48.790367, 2.455572];
let zoom = 13; // Niveau de
//

//L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);

//add GeoJson data
/*
fetch('./data/GPSEA_Sante.geojson') 
    .then(function (response){
        return response.json();
    })
    .then(function(data){
        L.geoJSON(data).addTo(map);
    })
    .catch(err => console.log(err));
    */
//let geojsonLayer = new L.GeoJSON.AJAX('GPSEA_Sante.geojson');       
//geojsonLayer.addTo(map);
//L.geoJSON(myData).addTo(map);

let osmLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
let osmURL = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
let osmAttrib = '&copy; ' + osmLink;

let osmMap = L.tileLayer(osmURL, {attribution: osmAttrib});

let stamenURL = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.{ext}';
let stamenAttrib = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

let stamenMap = L.tileLayer(stamenURL,{
			attribution: stamenAttrib,
			subdomains: 'abcd',
			minZoom: 0,
			maxZoom: 20,
			ext: 'png'
		});

let googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
            maxZoom: 15,
            subdomains:['mt0','mt1','mt2','mt3']
});

let positron = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    maxZoom: 20,
});

let baseLayers = {
			"OSM Mapnik": osmMap,
			"Stamen Toner": stamenMap,
            "Google Satelite": googleSat,
            "Positron":positron,
};

let map = L.map('map',{
    layers: [osmMap]
}).setView(latlngCreteil, zoom);

//Add baseLayers to map as control layers
L.control.layers(baseLayers).addTo(map);



let gpseaSante =  L.geoJSON(myData, {
    onEachFeature: function (feature, layer) {
        popupText =`<b>${feature.properties.Entreprise}</b><br>${feature.properties.Rue}<br>${feature.properties.Ville}`
		layer.bindPopup(popupText);
  }
}
).addTo(map);
