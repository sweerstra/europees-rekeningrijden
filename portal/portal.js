// every element with a data-background or data-color attribute, reversed
const mainColors = Array
    .from(document.querySelectorAll('[data-background], [data-color]'))
    .reverse();

// only the background colors
const backgrounds = mainColors.filter(color => color.dataset.background);

// only the colors
const colors = mainColors.filter(color => color.dataset.color);

// custom color pickers
const colorPicker = document.getElementById('color-picker');

backgrounds.forEach(el => el.addEventListener('click', function () {
    const { background } = this.dataset;
    setBackground(this, background);
}));

colors.forEach(el => el.addEventListener('click', function () {
    const { color } = this.dataset;
    document.documentElement.style.setProperty('--color-tint', color);
    localStorage.setItem('--color-tint', color);
    toggleColorsVisibility();
}));

colorPicker.addEventListener('click', function () {
    const background = prompt("Set hex color eg. #ffffff");

    if (background) {
        setBackground(this, background);
    }
});

const toggleColorsVisibility = () => mainColors.forEach(color => color.classList.toggle('visible'));

const setBackground = (el, background) => {
    // set CSS variable to selected background
    document.documentElement.style.setProperty('--color-main', background);

    // save the user's choice
    localStorage.setItem('--color-main', background);

    // selected color will become active
    backgrounds.forEach(background => background.classList.remove('active'));
    el.classList.add('active');

    // hide the colors after selection
    toggleColorsVisibility();
};

document.getElementById('color-toggler').addEventListener('click', toggleColorsVisibility);

document.addEventListener('DOMContentLoaded', () => {
    // set transition based on index
    mainColors.forEach((color, index) => color.style.transition = `opacity ${index / 10}s ease-in-out`);

    // loop through localStorage
    Object.entries(localStorage).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);

        if (key === '--color-main') {
            // try to find the saved background element and toggle it active, else toggle the custom color picker
            const selector = document.querySelector(`[data-background='${value}']`);
            (selector || colorPicker).classList.add('active');
        }
    });
});

/* logging in with Jenkins account */

const Modal = document.getElementById('modal');
const SelectedJobSpan = document.getElementById('selected-job');
const CloseModalButton = document.getElementById('close-modal');

const setModal = (show) => Modal.style.visibility = show ? 'visible' : 'hidden';

Array.from(document.querySelectorAll('[data-job-name]')).forEach(acceptButton => {
    acceptButton.addEventListener('click', function (event) {
        event.stopPropagation();
        event.preventDefault();

        if (this.classList.contains('disabled')) {
            return;
        }

        this.classList.add('disabled');

        setModal(true);

        SelectedJobSpan.textContent = this.getAttribute('data-job-name');
    })
});

CloseModalButton.addEventListener('click', () => setModal(false));

document.credentials.addEventListener('submit', e => {
    e.preventDefault();

    const jobName = SelectedJobSpan.textContent;
    const acceptButton = document.querySelector(`[data-job-name="${jobName}"]`);

    const username = e.target.username.value;
    const password = e.target.password.value;

    if (jobName && acceptButton) {
        const url = encodeURI(`http://192.168.24.36:8080/job/${jobName}/build?token=traxit&cause=started by product owner`);

        let noVPN = false;

        try {
            const invocation = new XMLHttpRequest();
            invocation.open('post', url, true, username, password);
            invocation.withCredentials = true;
            invocation.timeout = 2500;

            invocation.ontimeout = () => noVPN = true;

            invocation.onloadend = () => {
                if (noVPN) {
                    alert('Het is alleen mogelijk een Jenkins build te starten met VPN verbinding.');
                    acceptButton.classList.remove('disabled')
                } else {
                    acceptButton.classList.add('accepted');
                    acceptButton.setAttribute('title', 'Accepted');
                }
                setModal(false);
            };

            invocation.send(null);
        }
        catch (error) {
            // TODO: find way to prevent CORS exception in log
        }
    } else {
        alert('Er is nog geen Jenkins build verbonden met dit systeem.');
        setModal(false);
    }
});
