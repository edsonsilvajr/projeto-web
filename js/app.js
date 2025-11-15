const App = {
  init() {
    this.initMenu();
    this.initScrollAnimations();
    this.initCurrentYear();
    
    if (document.querySelector('form')) {
      FormValidator.init();
      InputMasks.init();
      FormStorage.init();
    }
  },

  initMenu() {
    const menuCheckbox = document.getElementById('menu-toggle');
    const navLinks = document.querySelectorAll('header nav a');

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (menuCheckbox && window.innerWidth <= 767) {
          menuCheckbox.checked = false;
        }
      });
    });
  },

  initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '0';
          entry.target.style.transform = 'translateY(20px)';
          entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, 100);

          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('article, .card').forEach(el => {
      observer.observe(el);
    });
  },

  initCurrentYear() {
    const currentYear = new Date().getFullYear();
    document.querySelectorAll('footer p').forEach(p => {
      if (p.textContent.includes('©')) {
        p.textContent = p.textContent.replace(/© \d{4}/, `© ${currentYear}`);
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());

