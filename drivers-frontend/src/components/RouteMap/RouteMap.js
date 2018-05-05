import React, { Component } from 'react';
import { GOOGLE_MAPS_API_KEY } from '../../config';

// https://www.npmjs.com/package/google-maps
const GoogleMapsLoader = require('google-maps');
GoogleMapsLoader.KEY = GOOGLE_MAPS_API_KEY;

class RouteMap extends Component {
  componentDidMount() {
    GoogleMapsLoader.load((google) => {
      window.google = google;

      const mapOptions = {
        zoom: 7,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: new google.maps.LatLng(52.489471, -1.898575)
      };

      const map = new google.maps.Map(document.querySelector('.google-map'), mapOptions);

      this.setState({ map });
    });
  }

  render() {
    return (
      <div className="google-map route-map" style={{ height: '100%' }}></div>
    );
  }
}

export default RouteMap;
