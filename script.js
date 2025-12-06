// JavaScript para el menú hamburguesa
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (navToggle && mobileMenu) {
      navToggle.addEventListener('click', function() {
          const isExpanded = this.getAttribute('aria-expanded') === 'true';
          this.setAttribute('aria-expanded', !isExpanded);
          mobileMenu.classList.toggle('active');
      });
      
      // Cerrar menú al hacer clic en un enlace (opcional)
      const mobileLinks = mobileMenu.querySelectorAll('a');
      mobileLinks.forEach(link => {
          link.addEventListener('click', function() {
              navToggle.setAttribute('aria-expanded', 'false');
              mobileMenu.classList.remove('active');
          });
      });
      
      // Cerrar menú al hacer clic fuera de él (opcional)
      document.addEventListener('click', function(event) {
          if (!navToggle.contains(event.target) && !mobileMenu.contains(event.target)) {
              navToggle.setAttribute('aria-expanded', 'false');
              mobileMenu.classList.remove('active');
          }
      });
  }
});

document.addEventListener('DOMContentLoaded', function() {
    const heroCarousel = {
        slides: document.querySelectorAll('.hero__slide'),
        indicators: document.querySelectorAll('.hero__indicator'),
        currentSlide: 0,
        interval: null,
        intervalTime: 3000,

        init: function() {
            this.startAutoPlay();
            this.setupIndicatorEvents();
        },

        startAutoPlay: function() {
            this.interval = setInterval(() => {
                this.nextSlide();
            }, this.intervalTime);
        },

        setupIndicatorEvents: function() {
            this.indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => {
                    this.goToSlide(index);
                });
            });
        },

        goToSlide: function(slideIndex) {
            this.slides.forEach(slide => slide.classList.remove('active'));
            this.indicators.forEach(ind => ind.classList.remove('active'));

            this.slides[slideIndex].classList.add('active');
            this.indicators[slideIndex].classList.add('active');

            this.currentSlide = slideIndex;
        },

        nextSlide: function() {
            const next = (this.currentSlide + 1) % this.slides.length;
            this.goToSlide(next);
        }
    };

    if (document.querySelector('.hero__carousel')) {
        heroCarousel.init();
    }
});


// Año actual en el footer
document.addEventListener('DOMContentLoaded', () => {
    const currentYear = document.getElementById('current-year');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
});