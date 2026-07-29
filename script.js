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
          intervalTime: 5000,
  
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
  
  
  // Enhanced Conversions (Google Ads) - Captura de datos del formulario
  // Guarda email y teléfono en sessionStorage antes de que Netlify redirija
  // a gracias.html, donde se leen para enviarlos junto con la conversión.
  document.addEventListener('DOMContentLoaded', function () {
      const form = document.querySelector('form[name="contacto-empresa"]');
  
      if (!form) return;
  
      form.addEventListener('submit', function () {
          const emailInput = form.querySelector('#email');
          const phoneInput = form.querySelector('#telefono');
  
          const userData = {};
  
          if (emailInput && emailInput.value.trim()) {
              userData.email = emailInput.value.trim().toLowerCase();
          }
  
          if (phoneInput && phoneInput.value.trim()) {
              userData.phone_number = normalizePhoneAR(phoneInput.value);
          }
  
          try {
              sessionStorage.setItem('cops_ec_user_data', JSON.stringify(userData));
          } catch (e) {
              // Si sessionStorage no está disponible, el formulario igual se envía normalmente
          }
          // No se usa preventDefault: el formulario sigue su envío normal a Netlify
      });
  });
  
  // Normaliza un número de teléfono argentino a formato E.164 (+549...)
  // NOTA: es una aproximación. Revisar con Tag Assistant después de implementar,
  // ya que los celulares argentinos suelen requerir el "9" adicional
  // (por ejemplo, 0351 15-123-4567 -> +549351123 4567).
  function normalizePhoneAR(rawPhone) {
      let digits = rawPhone.replace(/[^\d+]/g, '');
  
      // Si ya viene en formato internacional, se respeta tal cual
      if (digits.startsWith('+')) {
          return digits;
      }
  
      // Quita el 0 de larga distancia inicial
      digits = digits.replace(/^0/, '');
  
      // Quita el "15" de celular si quedó pegado después del código de área
      digits = digits.replace(/^(\d{2,4})15/, '$1');
  
      if (!digits.startsWith('54')) {
          digits = '54' + digits;
      }
  
      return '+' + digits;
  }