//= ../../../node_modules/leaflet/dist/leaflet.js

var map;
var ajaxRequest;
var plotlist;
var plotlayers = [];

function initmap() {
  // set up the map
  map = new L.Map("map");

  // create the tile layer with correct attribution
  var osmUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  var osmAttrib =
    'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
  var osm = new L.TileLayer(osmUrl, {
    attribution: osmAttrib
  });

  // start the map in South-East England
  map.setView(new L.LatLng(55.1904, 30.2049), 12);
  L.marker([55.1904, 30.2049]).addTo(map);
  map.addLayer(osm);
}
initmap();
