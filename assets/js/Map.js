const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const onEachFeature = (p_feature, p_layer) => {
  if (p_feature.properties) {
      let v_popupString = '<div class="popup">';

      for (const k in p_feature.properties) {
          const v = p_feature.properties[k];
          const uppercaseFirstLetter = capitalizeFirstLetter(k);

          v_popupString += `<b>${uppercaseFirstLetter}</b>: ${v}<br />`;
      }

      v_popupString += '</div>';
      p_layer.bindPopup(v_popupString);
  }
};

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
      L.geoJSON(data,{
        onEachFeature: onEachFeature
      }).addTo(map);
});