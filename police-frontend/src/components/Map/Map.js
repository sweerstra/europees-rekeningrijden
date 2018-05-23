import React, { Component } from 'react';
import { GOOGLE_MAPS_API_KEY } from '../../config';

// https://www.npmjs.com/package/google-maps
const GoogleMapsLoader = require('google-maps');
GoogleMapsLoader.KEY = GOOGLE_MAPS_API_KEY;

class Map extends Component {
    state = {
        movementId: 0,
        map: {},
    };

    componentDidMount() {
        GoogleMapsLoader.load((google) => {
            window.google = google;
            console.log(window.google);
            const mapOptions = {
                zoom: 7,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                center: new google.maps.LatLng(52.489471, -1.898575)
            };

            const map = new google.maps.Map(document.querySelector('.google-map'), mapOptions);

            this.setState({ map });
        });
    }

    // https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops
    static getDerivedStateFromProps(nextProps, prevState) {
        const { movement: { id } } = nextProps;
        const { map } = prevState;
        if (prevState.movementId === id) return null;

        // https://developers.google.com/maps/documentation/javascript/reference/3/#Marker
        var marker = new window.google.maps.Marker({
            position: {lat: movement.latitude, lng: movement.longitude},
            icon: {
                path: window.google.maps.SymbolPath.CIRCLE,
                strokeColor: '#3F51B5',
                scale: 10
            },
            draggable: false,
            map
        });

        return { movementId: id };
    }

    render() {
        return (
            <div className="google-map stolen-vehicles-map" style={{height: '100%'}}></div>
        );
    }
}

export default Map;
