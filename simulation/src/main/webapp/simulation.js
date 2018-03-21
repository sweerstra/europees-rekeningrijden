const directionsDisplay = new google.maps.DirectionsRenderer({ draggable: true });
const directionsService = new google.maps.DirectionsService();
let map;
let line;

document.addEventListener('DOMContentLoaded', () => {
    const myOptions = {
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: new google.maps.LatLng(51.509865, -0.118092)
    };

    map = new google.maps.Map(document.getElementById("google-map"), myOptions);
    directionsDisplay.setMap(map);
    // directionsDisplay.setPanel(document.getElementById("directions"));

    const simulationToggle = document.getElementById('simulation-toggle');

    simulationToggle.addEventListener('click', function () {
        this.classList.toggle('playing');
        calcRoute();
    });
});

function calcRoute() {
    const request = {
        origin: document.getElementById('from').value,
        destination: document.getElementById('to').value,
        travelMode: 'DRIVING'
    };

    directionsService.route(request, function (response, status) {
        const steps = response.routes[0].overview_path;
        const [first] = steps;

        console.log(first.lat());
        console.log(first.lng());

        if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            //document.getElementById('Gresponse').innerHTML = JSON.stringify(response);
            createPolyline(response);
        }
    });
}

function createPolyline(directionResult) {
    line = new google.maps.Polyline({
        path: directionResult.routes[0].overview_path,
        strokeColor: '#FF0000',
        strokeOpacity: 0.5,
        strokeWeight: 4,
        icons: [{
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 8,
                strokeColor: '#393'
            },
            offset: '100%'
        }]
    });
    line.setMap(map);
    animate();
}

function animate() {
    let count = 0;
    window.setInterval(function () {
        count = (count + 1) % 200;

        const icons = line.get('icons');
        icons[0].offset = (count / 2) + '%';
        line.set('icons', icons);
    }, 20);
}

// google.maps.event.addDomListener(window, 'load', initialize);