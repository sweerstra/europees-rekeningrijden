const backgrounds = document.querySelectorAll('[data-background]');

backgrounds
    .forEach(el => el.addEventListener('click', function () {
        document.documentElement.style.setProperty('--color-main', this.dataset.background);
        backgrounds.forEach(background => background.classList.remove('active'));
        this.classList.add('active');
    }));

document.querySelectorAll('[data-color]')
    .forEach(el => el.addEventListener('click', function () {
        document.documentElement.style.setProperty('--color-tint', this.dataset.color);
    }));