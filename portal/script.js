const backgrounds = document.querySelectorAll('[data-background]');

backgrounds
    .forEach(el => el.addEventListener('click', function () {
        const background = this.dataset.background;
        document.documentElement.style.setProperty('--color-main', background);
        localStorage.setItem('--color-main', background);
        backgrounds.forEach(background => background.classList.remove('active'));
        this.classList.add('active');
    }));

document.querySelectorAll('[data-color]')
    .forEach(el => el.addEventListener('click', function () {
        const color = this.dataset.color;
        document.documentElement.style.setProperty('--color-tint', color);
        localStorage.setItem('--color-tint', color);
    }));

document.addEventListener('DOMContentLoaded', () => {
    Object.entries(localStorage).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);

        if (key === '--color-main') {
            document.querySelector(`[data-background='${value}']`).classList.add('active');
        }
    });
});