// every element with a data-background or data-color attribute, reversed
const mainColors = Array
    .from(document.querySelectorAll('[data-background], [data-color]'))
    .reverse();

// only the background colors
const backgrounds = mainColors.filter(color => color.dataset.background);

// only the colors
const colors = mainColors.filter(color => color.dataset.color);

backgrounds.forEach(el => el.addEventListener('click', function () {
    const { background } = this.dataset;

    // set CSS variable to selected background
    document.documentElement.style.setProperty('--color-main', background);

    // save the user's choice
    localStorage.setItem('--color-main', background);

    // selected color will become active
    backgrounds.forEach(background => background.classList.remove('active'));
    this.classList.add('active');

    // hide the colors after selection
    toggleColors();
}));

colors.forEach(el => el.addEventListener('click', function () {
    const { color } = this.dataset;
    document.documentElement.style.setProperty('--color-tint', color);
    localStorage.setItem('--color-tint', color);
}));

const toggleColors = () => mainColors.forEach(color => color.classList.toggle('visible'));

document.getElementById('colorpicker').addEventListener('click', toggleColors);

document.addEventListener('DOMContentLoaded', () => {
    // set transition dynamically, based on index
    mainColors.forEach((color, index) => color.style.transition = `opacity ${index / 10}s ease-in-out`);

    // loop through localStorage keys
    Object.entries(localStorage).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);

        if (key === '--color-main') {
            document.querySelector(`[data-background='${value}']`).classList.add('active');
        }
    });
});
