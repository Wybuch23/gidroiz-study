/* Управление списками материалов в карточках Hero.
   - пока панель открыта, карточки под ней недоступны (inert): Tab не уходит на скрытые элементы;
   - при открытии фокус переходит на заголовок панели, при закрытии возвращается на карточку;
   - панель закрывается кнопкой «Назад к разделам» и клавишей Esc. */
(() => {
    const cardsBox = document.querySelector('.hero__cards');
    const toggles = [...document.querySelectorAll('[data-hero-toggle]')];
    const panels = [...document.querySelectorAll('[data-hero-panel]')];

    if (!toggles.length || !panels.length) return;

    let activeToggle = null;

    function closeAll({ restoreFocus = false } = {}) {
        toggles.forEach((toggle) => toggle.setAttribute('aria-expanded', 'false'));
        panels.forEach((panel) => { panel.hidden = true; });
        if (cardsBox) cardsBox.inert = false;

        // фокус возвращаем после снятия inert, иначе элемент ещё нефокусируем
        if (restoreFocus && activeToggle) activeToggle.focus();
        activeToggle = null;
    }

    function openPanel(toggle, panel) {
        closeAll();
        toggle.setAttribute('aria-expanded', 'true');
        panel.hidden = false;
        if (cardsBox) cardsBox.inert = true;
        activeToggle = toggle;

        const title = panel.querySelector('.hero__panel-title');
        if (title) {
            title.setAttribute('tabindex', '-1');
            title.focus({ preventScroll: true });
        }
    }

    document.querySelectorAll('[data-hero-close]').forEach((button) => {
        button.addEventListener('click', () => closeAll({ restoreFocus: true }));
    });

    toggles.forEach((toggle) => {
        toggle.addEventListener('click', () => {
            const panel = panels.find((item) => item.dataset.heroPanel === toggle.dataset.heroToggle);
            if (panel) openPanel(toggle, panel);
        });
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && activeToggle) closeAll({ restoreFocus: true });
    });
})();
