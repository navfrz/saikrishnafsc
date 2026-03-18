/* ============================================
   SAI KRISHNA FOODS - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Preloader ---
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.classList.add('loaded');
    });
    // Fallback: hide after 3s regardless
    setTimeout(() => preloader.classList.add('loaded'), 3000);
  }

  // --- Navbar Scroll Effect ---
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check on load
  }

  // --- Mobile Menu Toggle ---
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Scroll-triggered Animations ---
  const animatedElements = document.querySelectorAll('.animate-on-scroll, .animate-fade-left, .animate-fade-right');
  if (animatedElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -60px 0px', threshold: 0.1 });

    animatedElements.forEach(el => observer.observe(el));
  }

  // --- Animated Counter ---
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const countTo = parseInt(target.getAttribute('data-count'), 10);
          const suffix = target.getAttribute('data-suffix') || '';
          const duration = 2000;
          const start = 0;
          const increment = countTo / (duration / 16);
          let current = start;

          const updateCounter = () => {
            current += increment;
            if (current >= countTo) {
              target.textContent = countTo.toLocaleString() + suffix;
            } else {
              target.textContent = Math.floor(current).toLocaleString() + suffix;
              requestAnimationFrame(updateCounter);
            }
          };
          updateCounter();
          counterObserver.unobserve(target);
        }
      });
    }, { threshold: 0.3 });

    counters.forEach(counter => counterObserver.observe(counter));
  }

  // --- Scroll to Top ---
  const scrollTopBtn = document.querySelector('.scroll-to-top');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Gallery Filter ---
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // --- Lightbox ---
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = lightbox ? lightbox.querySelector('img') : null;
  const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;

  if (lightbox && lightboxImg) {
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
    });
  }

  // --- Active Nav Link ---
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // --- Form Submission Handling ---
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const subject = encodeURIComponent('Website Inquiry - ' + (formData.get('inquiry_type') || 'General'));
      const body = encodeURIComponent(
        'Name: ' + (formData.get('name') || '') + '\n' +
        'Email: ' + (formData.get('email') || '') + '\n' +
        'Phone: ' + (formData.get('phone') || '') + '\n' +
        'Business: ' + (formData.get('business') || '') + '\n' +
        'Type: ' + (formData.get('inquiry_type') || '') + '\n\n' +
        'Message:\n' + (formData.get('message') || '')
      );
      window.location.href = 'mailto:shikha@saikrishnafsc.ca?subject=' + subject + '&body=' + body;
    });
  }

});

/* ============================================
   VISUAL ENHANCEMENTS — "Make it Cool"
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Hero decorative rings ---
  const hero = document.querySelector('.hero');
  if (hero) {
    [1, 2, 3].forEach(n => {
      const ring = document.createElement('div');
      ring.className = `hero-ring hero-ring-${n}`;
      hero.appendChild(ring);
    });
  }

  // --- Trusted bar scrolling marquee ---
  const trustedLogos = document.querySelector('.trusted-logos');
  if (trustedLogos && !trustedLogos.querySelector('.trusted-logos-track')) {
    const originalHTML = trustedLogos.innerHTML;
    trustedLogos.innerHTML = `<div class="trusted-logos-track">${originalHTML}${originalHTML}</div>`;
  }

  // --- Button ripple effect ---
  const rippleStyle = document.createElement('style');
  rippleStyle.textContent = '@keyframes btnRipple { to { transform: scale(3); opacity: 0; } }';
  document.head.appendChild(rippleStyle);

  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const ripple = document.createElement('span');
      ripple.style.cssText = [
        'position:absolute',
        'border-radius:50%',
        `width:${size}px`,
        `height:${size}px`,
        `left:${e.clientX - rect.left - size / 2}px`,
        `top:${e.clientY - rect.top - size / 2}px`,
        'background:rgba(255,255,255,0.32)',
        'transform:scale(0)',
        'animation:btnRipple 0.55s ease-out forwards',
        'pointer-events:none',
        'z-index:10'
      ].join(';');
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 560);
    });
  });

  // --- Parallax on hero background ---
  const heroBgImg = document.querySelector('.hero-bg img');
  if (heroBgImg) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        heroBgImg.style.transform = `scale(1.12) translateY(${y * 0.18}px)`;
      }
    }, { passive: true });
  }

  // --- Lazy image fade-in ---
  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    if (img.complete) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', () => img.classList.add('loaded'));
    }
  });

});
