const toggle = document.querySelector('.nav-toggle');
const menu = document.querySelector('.nav-menu, .nav-links');

if (toggle && menu) {
    toggle.addEventListener('click', () => {
        const open = menu.classList.toggle('is-open');
        toggle.classList.toggle('is-open', open);
        toggle.setAttribute('aria-expanded', String(open));
    });

    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('is-open');
            toggle.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });
}
