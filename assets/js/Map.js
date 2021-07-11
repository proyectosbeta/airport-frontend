const map = L.map('map').setView([41.66, -4.72], 2);

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    maxZoom: 18
}).addTo(map);

L.control.scale().addTo(map);

const domain = 'http://airport/api/airportGeoJSON';

fetch(domain)
  .then(function(response) {
      return response.json();
})
  .then(function(data) {
      L.geoJSON(data).addTo(map);
});