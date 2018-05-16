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

Array.from(document.querySelectorAll('[data-job-name]')).forEach(acceptButton => {
    acceptButton.addEventListener('click', function (event) {
        event.stopPropagation();
        event.preventDefault();
        // TODO: show modal here;

        var xhr = new XMLHttpRequest();
        xhr.open("POST", encodeURI('http://192.168.24.36:8080/job/government-FP/build?token=traxit&cause=started by product owner'));
        xhr.withCredentials = true;
        xhr.setRequestHeader("Authorization", "Basic " + btoa('Jacques' + ':' + 'ProductOwner1'));
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(null);
    })
});
