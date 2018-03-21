document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-status]').forEach(system => {
        system.dataset.status = Math.random() > 0.3 ? 'up' : 'down';
    });

    Object.entries(localStorage).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);
    });
});