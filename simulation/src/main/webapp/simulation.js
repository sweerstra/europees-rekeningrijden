const directionsService = new google.maps.DirectionsService();
const licensePlateInput = document.getElementById('license-plate');
const fromInput = document.getElementById('from');
const toInput = document.getElementById('to');
const speedInput = document.getElementById('speed');
const generateSimulationButton = document.getElementById('generate-simulation');
const addSimulationButton = document.getElementById('add-simulation');
const simulationAmountText = document.getElementById('simulation-amount');
const SIMULATION_API_URL = 'http://192.168.24.36:10080/simulation/api/route';
const LICENSE_PLATE_CHECK_URL = 'http://192.168.24.36:11080/government/api/vehicle';
const defaultStrokeColor = localStorage.getItem('--color-main') || '#4CAF50';

let map;
let currentTrackers = [];
let trackerId = null;

document.addEventListener('DOMContentLoaded', () => {
    const mapOptions = {
        zoom: 7,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: new google.maps.LatLng(52.489471, -1.898575)
    };

    map = new google.maps.Map(document.getElementById('google-map'), mapOptions);

    licensePlateInput.addEventListener('input', debounce(({ target }) => {
        const { value } = target;

        get(`${LICENSE_PLATE_CHECK_URL}/${value}/tracker`)
            .then(tracker => {
                target.classList.remove('invalid');
                trackerId = tracker.trackerId;
            })
            .catch(() => {
                target.classList.add('invalid');
                trackerId = null;
            });
    }, 500));

    generateSimulationButton.addEventListener('click', () => {
        const speed = parseFloat(speedInput.value);

        if (speed && trackerId) {
            // get two coordinates from simulation API based on speed value
            post(`${SIMULATION_API_URL}/${speed}`)
                .then(({ startCoordinate, endCoordinate }) => {
                    const from = `${startCoordinate.longitude}, ${startCoordinate.latitude}`;
                    const to = `${endCoordinate.longitude}, ${endCoordinate.latitude}`;

                    calcRoute(from, to, speed);
                });
        } else {
            console.warn('Please enter the correct field values.');
        }
    });

    addSimulationButton.addEventListener('click', () => {
        const speed = parseFloat(speedInput.value);

        if (speed && trackerId) {
            calcRoute(fromInput.value, toInput.value, speed);
        }
    });

    // add basic attributes to input
    document.querySelectorAll('input').forEach(input => {
        input.setAttribute('autocomplete', 'off');
        input.setAttribute('spellcheck', 'false');
    });

    // load theme colors from localStorage
    Object.entries(localStorage).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);
    });
});

function calcRoute(from, to, speed) {
    if (!from || !to) {
        console.warn('From coordinates, to coordinates or speed was null or undefined.');
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
            addSimulation(route, polyline, speed);

            const [firstPath] = route.overview_path;
            const lat = firstPath.lat();
            const lng = firstPath.lng();
            map.setCenter({ lat, lng });
        } else {
            console.error('Coordinates or location was not valid.');
        }
    });
}

function addSimulation(route, polyline, speed) {
    const path = route.overview_path;
    const pathLength = path.length;
    const distance = route.legs[0].distance.value;
    const stepSize = distance / pathLength;
    const timeBetweenSteps = 1000 / ((speed / 3.6) / stepSize);

    let movementCount = 1;

    const interval = setInterval(() => {
        if (movementCount <= pathLength) {
            animateStep(polyline, movementCount, pathLength);

            const { lat, lng } = path[movementCount - 1];
            const { trackerId } = polyline;

            const routeResult = {
                trackerId,
                latitude: lat(),
                longitude: lng(),
                time: new Date().toLocaleString()
            };

            console.log(JSON.stringify(routeResult));

            // make post request to save movement
            /* post(MOVEMENT_API_URL, routeResult)
                .catch(err => {
                    console.error(err.message);
                    clearInterval(interval);
                }); */
        } else {
            clearInterval(interval);
            polyline.setMap(null);
            currentTrackers.splice(currentTrackers.indexOf(polyline.trackerId), 1);
            simulationAmountText.textContent = currentTrackers.length.toString();
        }
        movementCount++;
    }, timeBetweenSteps);

    currentTrackers.push(trackerId);
    simulationAmountText.textContent = currentTrackers.length.toString();
}

postToQueue('movements', { trackerId: 'ENG1111', latitude: 51.50986, longitude: -0.11812, time: '3-6-2018 13:52:37' })
    .then(text => console.log(text));

function get(url) {
    const options = {
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch(url, options)
        .then(resp => resp.json());
}

function post(url, data) {
    const options = {
        method: 'post',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch(url, options)
        .then(resp => resp.json())
}

function postToQueue(queue, data) {
    const options = {
        method: 'post',
        body: JSON.stringify(data)
    };

    const url = `http://localhost:8161/api/message?destination=queue://${queue}`;

    return fetch(url, options)
        .then(resp => resp.text());
}

function createPolyline(directionResult) {
    const polyline = new google.maps.Polyline({
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
        trackerId
    });

    polyline.setMap(map);
    return polyline;
}

function animateStep(polyline, movementCount, pathLength) {
    const icons = polyline.get('icons');
    icons[0].offset = ((movementCount / pathLength) * 100) + '%';
    polyline.set('icons', icons);
}

function debounce(fn, time) {
    let timeout;

    return function () {
        const call = () => fn.apply(this, arguments);
        clearTimeout(timeout);
        timeout = setTimeout(call, time);
    }
}