# Leaflet KML

Generate KML from a Leaflet map.

# Getting started

```
<!DOCTYPE html>
<html>
<head>
  <title>To KML example</title>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.2/dist/leaflet.css">
  <style>
    #map { height: 180px; }
  </style>
</head>
<body>
  <button id="to-kml">To KML</button>
  <div id="map">
  </div>

  <script src="https://unpkg.com/leaflet@1.0.2/dist/leaflet.js"></script>
  <script src="/path/to/vendor/leaflet-kml.js"></script>
  <!-- if you want to add a download feature -->
  <script src="/path/to/vendor/FileSaver.js"></script>
  <script>
  var marker,
      markers = [],
      map = L.map('map').setView([51.505, -0.09], 13);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'your.mapbox.project.id',
    accessToken: 'your.mapbox.public.access.token'
  }).addTo(mymap);

  marker = L.marker([51.5, -0.09])
    .addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();

  markers.push(marker);

  // ... add more markers

  document.getElementById('to-kml')
    .onclick = function() {
      var filename = 'myfancymap.kml';
      var kml = L.toKML('My fancy map', markers);
      saveAs(new Blob([ kml ]), filename);
    };
  </script>
</body>
</html>
```