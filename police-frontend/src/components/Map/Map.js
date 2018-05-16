import React, { Component } from 'react';
import { GOOGLE_MAPS_API_KEY } from '../../config';

// https://www.npmjs.com/package/google-maps
const GoogleMapsLoader = require('google-maps');
GoogleMapsLoader.KEY = GOOGLE_MAPS_API_KEY;

class Map extends Component {
    state = {
        id: 0,
        map: {},
        polylines: []
    };

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

    // // https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops
    // static getDerivedStateFromProps(nextProps, prevState) {
    //     const { id, coordinates } = nextProps.route;
    //     if (prevState.id === id || coordinates.length === 0) return null;
    //
    //     // access the coordinates obtained from parent component, transform them
    //     const path = coordinates.map(c => ({ lat: c.latitude, lng: c.longitude }));
    //
    //     // https://developers.google.com/maps/documentation/javascript/reference/3/#Polyline
    //     const polyline = new window.google.maps.Polyline({
    //         path,
    //         geodesic: true,
    //         strokeColor: '#3F51B5',
    //         strokeWeight: 4,
    //         strokeOpacity: 1.0
    //     });

    //     const { map, polylines } = prevState;
    //     map.setCenter(path[0]);
    //     map.setZoom(9);
    //
    //     polylines.forEach(p => p.setMap(null));
    //     polyline.setMap(map);
    //     polylines.push(polyline);
    //
    //     return { id, polylines };
    // }

    render() {
        return (
            <div className="google-map stolen-vehicles-map" style={{ height: '100%' }}></div>
        );
    }
}

export default Map;