import React, { Component } from 'react';

const GoogleMapsLoader = require('google-maps');
GoogleMapsLoader.KEY = 'AIzaSyD7CDOHHmsCN9aelCcx2-viZERP0AVwCIc';
GoogleMapsLoader.LIBRARIES = ['drawing'];

GoogleMapsLoader.load(function (google) {
  const mapOptions = {
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: new google.maps.LatLng(52.489471, -1.898575)
  };

  const map = new google.maps.Map(document.querySelector('.google-map'), mapOptions);

  const drawingManager = new google.maps.drawing.DrawingManager({
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: ['polyline']
    },
    polylineOptions: {
      strokeColor: '#3F51B5',
      fillOpacity: 1,
      strokeWeight: 5,
      clickable: false,
      editable: true,
      zIndex: 1
    }
  });
  drawingManager.setMap(map);
});


class Map extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="google-map map"></div>
    )
  }
}

export default Map;
