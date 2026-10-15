/* ==========================================================
   header.js — поведение шапки (бургер-меню)
   Подключается через <script defer>, без сборщика и модулей,
   поэтому работает и при открытии файла напрямую (file://).
   ========================================================== */
(function () {
  'use strict';

  var burger = document.querySelector('.header__burger');
  var nav = document.getElementById('nav');
  if (!burger || !nav) return;

  function setOpen(open) {
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    nav.classList.toggle('is-open', open);
  }

  burger.addEventListener('click', function () {
    setOpen(burger.getAttribute('aria-expanded') !== 'true');
  });

  // Закрываем меню после клика по пункту и по Esc
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setOpen(false);
  });
})();
