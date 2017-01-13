(function(L) {
  /**
   * @param string name - map name
   * @param array markers - list of markers
   * @param string - KML representation
   */
  function toKml(name, markers) {
    var kml = new DOMParser()
      .parseFromString(
      '<kml xmlns="http://www.opengis.net/kml/2.2"></kml>',
      "application/xml"
    );

    var color = kml.createElement('color');
    color.textContent = 'ff0000cc';

    var labelStyle = kml.createElement('LabelStyle');
    labelStyle.appendChild(color);

    var style = kml.createElement('Style');
    style.id = 'default';
    style.appendChild(labelStyle);

    var documentName = kml.createElement('name');
    documentName.textContent = name;

    var doc = kml.createElement('Document');
    doc.appendChild(documentName);
    doc.appendChild(style);

    markers.forEach(function(marker) {
      var description = kml.createElement('description');
      description.appendChild(
        kml.createCDATASection(marker.getPopup().getContent())
      );

      var styleUrl = kml.createElement('styleUrl');
      styleUrl.textContent = '#default';

      var coordinates = kml.createElement('coordinates')
      coordinates.textContent = marker.toGeoJSON().geometry.coordinates.join(',');

      var point = kml.createElement('Point');
      point.appendChild(coordinates);

      var name = kml.createElement('name');

      var placemark = kml.createElement('Placemark');
      placemark.appendChild(description);
      placemark.appendChild(name);
      placemark.appendChild(styleUrl);
      placemark.appendChild(point);

      doc.appendChild(placemark);
    });

    kml.querySelector('kml').appendChild(doc);

    return '<?xml version="1.0" encoding="utf-8"?>\n' +
      new XMLSerializer().serializeToString(kml);
  }

  L.toKml = toKml;
})(L);