(function () {
  'use strict';

  const navbar = document.getElementById('navbar');

  function handleScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();

      const navCollapse = document.getElementById('navMenu');
      if (navCollapse && navCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navCollapse);
        bsCollapse.hide();
      }

      const offset = navbar.offsetHeight + 8;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  const revealTargets = [
    '.card-espec',
    '.historia-card',
    '.cardapio-card',
    '.card-contato',
  ];

  const revealEls = document.querySelectorAll(revealTargets.join(', '));
  revealEls.forEach(function (el) {
    el.classList.add('reveal');
  });

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
          const idx = siblings.indexOf(entry.target);
          setTimeout(function () {
            entry.target.classList.add('visible');
          }, idx * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach(function (el) {
    observer.observe(el);
  });

  document.querySelectorAll('.item-cardapio').forEach(function (item) {
    item.addEventListener('click', function () {
      this.classList.add('clicked');
      setTimeout(() => this.classList.remove('clicked'), 300);
    });
  });

  const footerCopy = document.querySelector('.footer-copy');
  if (footerCopy) {
    const year = new Date().getFullYear();
    footerCopy.textContent = `© ${year} Restaurante União — Ceilândia Sul, Brasília – DF`;
  }

})();
