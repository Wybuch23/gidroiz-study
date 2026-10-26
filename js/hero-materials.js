/* Управление списками материалов в карточках Hero. */
(() => {
    const toggles = [...document.querySelectorAll('[data-hero-toggle]')];
    const panels = [...document.querySelectorAll('[data-hero-panel]')];

    if (!toggles.length || !panels.length) return;

    function closeAll() {
        toggles.forEach((toggle) => {
            toggle.setAttribute('aria-expanded', 'false');
            const label = toggle.querySelector('[data-hero-action-label]');
            if (label) label.textContent = 'Смотреть материалы';
        });
        panels.forEach((panel) => { panel.hidden = true; });
    }

    document.querySelectorAll('[data-hero-close]').forEach((button) => {
        button.addEventListener('click', closeAll);
    });

    toggles.forEach((toggle) => {
        toggle.addEventListener('click', () => {
            const panelName = toggle.dataset.heroToggle;
            const panel = panels.find((item) => item.dataset.heroPanel === panelName);
            if (!panel) return;

            const shouldOpen = toggle.getAttribute('aria-expanded') !== 'true';
            closeAll();

            if (shouldOpen) {
                toggle.setAttribute('aria-expanded', 'true');
                const label = toggle.querySelector('[data-hero-action-label]');
                if (label) label.textContent = 'Скрыть материалы';
                panel.hidden = false;
            }
        });
    });
})();
