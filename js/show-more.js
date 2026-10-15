/* ==========================================================
   show-more.js — универсальная кнопка «Показать больше»

   Работает в любой секции, помеченной атрибутом data-show-more:

   <section data-show-more data-initial="3" data-step="3">
     <div data-show-more-list>…карточки (прямые потомки)…</div>
     <div class="show-more" data-show-more-footer hidden>
       <button class="show-more__btn" data-show-more-btn>Показать больше</button>
     </div>
   </section>

   Логика:
   - Сначала видны первые data-initial карточек (по умолчанию 3).
   - Если карточек больше — появляется кнопка; клик открывает ещё data-step (по умолчанию 3).
   - Когда карточки закончились, кнопка исчезает.
   - Если карточек не больше data-initial, кнопки нет совсем.
   - Без JS все карточки видны, кнопка скрыта атрибутом hidden.
   ========================================================== */
(function () {
  'use strict';

  function init(root) {
    var list = root.querySelector('[data-show-more-list]');
    var footer = root.querySelector('[data-show-more-footer]');
    var btn = root.querySelector('[data-show-more-btn]');
    if (!list || !footer || !btn) return;

    var items = Array.prototype.slice.call(list.children);
    var initial = parseInt(root.getAttribute('data-initial'), 10) || 3;
    var step = parseInt(root.getAttribute('data-step'), 10) || 3;
    var shown = initial;

    function render() {
      items.forEach(function (item, i) {
        item.hidden = i >= shown;
      });
      footer.hidden = shown >= items.length;
    }

    btn.addEventListener('click', function () {
      var first = shown; // индекс первой вновь открытой карточки
      shown += step;
      render();
      // клавиатура/скринридеры: фокус на первую новую карточку
      var target = items[first];
      if (target) {
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    });

    render();
  }

  Array.prototype.forEach.call(document.querySelectorAll('[data-show-more]'), init);
})();
