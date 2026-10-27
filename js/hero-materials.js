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


    // Вкладки внутри карточки «Курс обучения по работе с узлами».
    const nodePanel = document.querySelector('[data-hero-panel="nodes"]');
    if (nodePanel) {
        const tabButtons = [...nodePanel.querySelectorAll('[data-node-tab]')];
        const tabPanels = [...nodePanel.querySelectorAll('[data-node-tab-panel]')];
        const count = nodePanel.querySelector('[data-node-count]');
        const description = nodePanel.querySelector('[data-node-description]');
        const tabMeta = {
            courses: {
                count: '10 материалов',
                description: 'Подробные учебные материалы по выполнению гидроизоляционных работ.'
            },
            schemes: {
                count: '9 схем',
                description: 'Краткие пошаговые схемы для применения непосредственно на объекте.'
            }
        };

        function activateNodeTab(name, moveFocus = false) {
            tabButtons.forEach((button) => {
                const active = button.dataset.nodeTab === name;
                button.classList.toggle('is-active', active);
                button.setAttribute('aria-selected', String(active));
                button.tabIndex = active ? 0 : -1;
                if (active && moveFocus) button.focus();
            });
            tabPanels.forEach((panel) => { panel.hidden = panel.dataset.nodeTabPanel !== name; });
            if (count && tabMeta[name]) count.textContent = tabMeta[name].count;
            if (description && tabMeta[name]) description.textContent = tabMeta[name].description;
        }

        tabButtons.forEach((button, index) => {
            button.addEventListener('click', () => activateNodeTab(button.dataset.nodeTab));
            button.addEventListener('keydown', (event) => {
                if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
                event.preventDefault();
                let next = index;
                if (event.key === 'ArrowRight') next = (index + 1) % tabButtons.length;
                if (event.key === 'ArrowLeft') next = (index - 1 + tabButtons.length) % tabButtons.length;
                if (event.key === 'Home') next = 0;
                if (event.key === 'End') next = tabButtons.length - 1;
                activateNodeTab(tabButtons[next].dataset.nodeTab, true);
            });
        });
        activateNodeTab('courses');
    }

})();
