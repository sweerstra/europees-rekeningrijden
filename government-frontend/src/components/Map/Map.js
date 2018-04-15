import React, { Component } from 'react';

const GoogleMapsLoader = require('google-maps');
GoogleMapsLoader.KEY = 'AIzaSyD7CDOHHmsCN9aelCcx2-viZERP0AVwCIc';
GoogleMapsLoader.LIBRARIES = ['drawing'];

class Map extends Component {
  componentDidMount() {
    GoogleMapsLoader.load((google) => {
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
          drawingModes: ['polygon']
        },
        polygonOptions: {
          strokeColor: '#3F51B5',
          strokeOpacity: 0.8,
          fillColor: '#3F51B5',
          fillOpacity: 0.35,
          strokeWeight: 4,
          clickable: true
        }
      });

      // TODO: load existing polygons from this.props.polygons

      google.maps.event.addListener(drawingManager, 'polygoncomplete', (polygon) => {
        this.props.onPolygonAdd(polygon);

        polygon.addListener('click', (e) => {
          this.props.onPolygonSelect(e, polygon);

          polygon.setOptions({ strokeColor: '#4CAF50', fillColor: '#4CAF50' });

          // TODO: color linked polygons?
        });
      });

      drawingManager.setMap(map);
    });
  }

  render() {
    return (
      <div className="google-map map"></div>
    )
  }
}

export default Map;
