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

// JavaScript para el carrusel del hero
document.addEventListener('DOMContentLoaded', function() {
  const heroCarousel = {
      slides: document.querySelectorAll('.hero__slide'),
      indicators: document.querySelectorAll('.hero__indicator'),
      prevBtn: document.querySelector('.hero__prev'),
      nextBtn: document.querySelector('.hero__next'),
      currentSlide: 0,
      interval: null,
      intervalTime: 5000,

      init: function() {
          this.startAutoPlay();
          this.setupEventListeners();
      },

      startAutoPlay: function() {
          this.interval = setInterval(() => {
              this.nextSlide();
          }, this.intervalTime);
      },

      setupEventListeners: function() {
          // Botones anterior/siguiente
          if (this.prevBtn) {
              this.prevBtn.addEventListener('click', () => {
                  this.pauseAutoPlay();
                  this.prevSlide();
                  this.restartAutoPlay();
              });
          }

          if (this.nextBtn) {
              this.nextBtn.addEventListener('click', () => {
                  this.pauseAutoPlay();
                  this.nextSlide();
                  this.restartAutoPlay();
              });
          }

          // Indicadores
          this.indicators.forEach((indicator, index) => {
              indicator.addEventListener('click', () => {
                  this.pauseAutoPlay();
                  this.goToSlide(index);
                  this.restartAutoPlay();
              });
          });

          // Pausar autoplay al interactuar con el hero
          const hero = document.querySelector('.hero');
          if (hero) {
              hero.addEventListener('mouseenter', () => this.pauseAutoPlay());
              hero.addEventListener('mouseleave', () => this.restartAutoPlay());
              hero.addEventListener('touchstart', () => this.pauseAutoPlay());
          }
      },

      goToSlide: function(slideIndex) {
          // Remover clase active de todos los slides e indicadores
          this.slides.forEach(slide => slide.classList.remove('active'));
          this.indicators.forEach(indicator => indicator.classList.remove('active'));

          // Agregar clase active al slide e indicador actual
          this.slides[slideIndex].classList.add('active');
          this.indicators[slideIndex].classList.add('active');
          
          this.currentSlide = slideIndex;
      },

      nextSlide: function() {
          const nextSlide = (this.currentSlide + 1) % this.slides.length;
          this.goToSlide(nextSlide);
      },

      prevSlide: function() {
          const prevSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
          this.goToSlide(prevSlide);
      },

      pauseAutoPlay: function() {
          if (this.interval) {
              clearInterval(this.interval);
              this.interval = null;
          }
      },

      restartAutoPlay: function() {
          this.pauseAutoPlay();
          this.interval = setInterval(() => {
              this.nextSlide();
          }, this.intervalTime);
      }
  };

  // Inicializar el carrusel
  if (document.querySelector('.hero__carousel')) {
      heroCarousel.init();
  }
});