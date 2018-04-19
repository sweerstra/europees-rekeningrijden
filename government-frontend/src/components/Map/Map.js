import React, { Component } from 'react';
import { GOOGLE_MAPS_API_KEY } from '../../config';

// https://www.npmjs.com/package/google-maps
const GoogleMapsLoader = require('google-maps');
GoogleMapsLoader.KEY = GOOGLE_MAPS_API_KEY;
GoogleMapsLoader.LIBRARIES = ['drawing'];

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      map: null,
      polygon: null,
      coordinates: []
    };
  }

  componentDidMount() {
    // https://developers.google.com/maps/documentation/javascript/examples/polygon-simple
    // https://developers.google.com/maps/documentation/javascript/drawinglayer

    GoogleMapsLoader.load((google) => {
      window.google = google;

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

      google.maps.event.addListener(drawingManager, 'polygoncomplete', (polygon) => {
        const coordinates = polygon.getPath().getArray()
          .map(c => ({ lat: c.lat(), lng: c.lng() }));

        // delete the map of the old polygon and replace the selected polygon
        this.setState(state => {
          if (state.polygon) {
            state.polygon.setMap(null);
          }
          return { polygon };
        });

        this.props.onSelectPolygon(coordinates);
      });

      drawingManager.setMap(map);

      this.setState({ map });
    });
  }

  // when a region is selected, new coordinates will be passed to this function
  // https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops
  static getDerivedStateFromProps(nextProps, prevState) {
    const { coordinates } = nextProps;

    // check if the coordinates have changed based on the coordinates saved in state
    if (coordinates.length === 0 || !Map.coordinatesDiffer(coordinates, prevState.coordinates)) {
      return null;
    }

    // because google maps expects the first coordinate to also be the last before drawing
    const [firstCoordinate] = coordinates;
    const triangleCoordinates = [...coordinates, firstCoordinate];

    const polygon = new window.google.maps.Polygon({
      paths: triangleCoordinates,
      strokeColor: '#3F51B5',
      strokeOpacity: 0.8,
      fillColor: '#3F51B5',
      fillOpacity: 0.35,
      strokeWeight: 4,
      clickable: true
    });

    polygon.setMap(prevState.map);

    if (prevState.polygon) {
      prevState.polygon.setMap(null);
    }

    return { polygon, coordinates };
  }

  static coordinatesDiffer(coords1, coords2) {
    if (coords1.length !== coords2.length) return true;

    return coords1.some(({ lat, lng }, index) => {
      return lat !== coords2[index].lat || lng !== coords2[index].lng;
    });
  };

  render() {
    return (
      <div className="google-map map"></div>
    )
  }
}

export default Map;
