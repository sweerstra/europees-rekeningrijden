const directionsService = new google.maps.DirectionsService();

const fromInput = document.getElementById('from');
const toInput = document.getElementById('to');
const speedInput = document.getElementById('speed');
const simulationToggleButton = document.getElementById('simulation-toggle');
const generateRouteButton = document.getElementById('generate-route');

const MOVEMENT_API_URL = 'localhost:8080/movement/api/movement';
const SIMULATION_API_URL = 'localhost:8080/simulation/api/generate';

const defaultStrokeColor = localStorage.getItem('--color-main') || '#4CAF50';

const ROUTES = [
    { from: '51.538433, -0.14467214', to: '51.527092, -0.14466009' },
    { from: '51.525867, -0.13448699', to: '51.529404, -0.14631915' },
    { from: '51.533173, -0.14858663', to: '51.538433, -0.14467214' }
];

let trackerId = 1;
let map;

document.addEventListener('DOMContentLoaded', () => {
    const mapOptions = {
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: new google.maps.LatLng(51.509865, -0.118092)
    };

    map = new google.maps.Map(document.getElementById('google-map'), mapOptions);

    simulationToggleButton.addEventListener('click', function () {
        if (!this.classList.contains('playing')) {
            // start simulation
            calcRoute(fromInput.value, toInput.value);
        } else {
            // stop simulation
        }

        this.classList.toggle('playing');
    });

    generateRouteButton.addEventListener('click', function () {
        const { value } = speedInput;

        if (value) {
            speedInput.classList.remove('warning');
            // get two coordinates from simulation API based on speed value
            /* post(SIMULATION_API_URL, { speed: parseFloat(value) })
                .then(resp => resp); */

            const randomIndex = Math.floor(Math.random() * ROUTES.length);
            const randomRoute = ROUTES[randomIndex];
            ROUTES.splice(randomIndex, 1);
            calcRoute(randomRoute.from, randomRoute.to);
        } else {
            speedInput.classList.add('warning');
            console.warn('Please enter a speed value.');
        }
    });

    // load theme colors from localStorage
    Object.entries(localStorage).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);
    });
});

function calcRoute(from, to) {
    if (!from || !to) {
        console.warn('From or to coordinates were null or undefined.');
        return;
    }

    const requestOptions = {
        origin: from,
        destination: to,
        travelMode: 'DRIVING'
    };

    directionsService.route(requestOptions, (response, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
            const polyline = createPolyline(response);
            const [route] = response.routes;
            addSimulation(route, polyline);
        }
    });
}

function addSimulation(route, polyline) {
    const path = route.overview_path;
    const { length } = path;

    let movementCount = 1;

    const interval = setInterval(() => {
        if (movementCount <= length) {
            animateStep(polyline, movementCount, length);

            const { lat, lng } = path[movementCount - 1];
            const { trackerId, movementId, time } = polyline;

            const routeResult = {
                latitude: lat(),
                longitude: lng(),
                trackerId, movementId, time
            };

            console.log(routeResult);

            // make post request to save movement
            /* post(MOVEMENT_API_URL, routeResult)
                .catch(err => {
                    console.error(err.message);
                    clearInterval(interval);
                }); */
        } else {
            clearInterval(interval);
        }
        movementCount++;
    }, 1000);
}

function post(url, data) {
    const options = {
        method: 'post',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch(url, options)
        .then(resp => resp.json());
}

function createPolyline(directionResult) {
    const line = new google.maps.Polyline({
        path: directionResult.routes[0].overview_path,
        strokeColor: '#F44336',
        strokeOpacity: 0.4,
        strokeWeight: 4,
        icons: [{
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                strokeColor: defaultStrokeColor,
                strokeOpacity: 1
            },
            offset: '0%'
        }],
        trackerId: trackerId++,
        time: new Date()
    });

    line.setVisible(true);
    line.setMap(map);
    return line;
}

function animateStep(polyline, count, pathLength) {
    const icons = polyline.get('icons');
    icons[0].offset = ((count / pathLength) * 100) + '%';
    polyline.set('icons', icons);
    polyline.movementId = count;
}

