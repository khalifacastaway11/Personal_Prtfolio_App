/* ============================================
   AHMED MOHAMED KHALIFA PORTFOLIO - MAIN JS
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

  // Elements
  const header = document.getElementById('header');
  const navToggler = document.getElementById('navToggler');
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const scrollProgress = document.getElementById('scrollProgress');
  const backToTop = document.getElementById('backToTop');
  const typingText = document.getElementById('typingText');
  const contactForm = document.getElementById('contactForm');

  // ============================================
  // TYPING ANIMATION
  // ============================================
  const roles = [
    'Back-End Developer',
    'Node.js Developer',
    'API Designer',
    'ML Enthusiast',
    'Problem Solver'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingText.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingText.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500; // Pause before new word
    }

    setTimeout(typeEffect, typingSpeed);
  }

  if (typingText) {
    typeEffect();
  }

  // ============================================
  // MOBILE NAVIGATION TOGGLE
  // ============================================
  if (navToggler) {
    navToggler.addEventListener('click', function() {
      this.classList.toggle('active');
      nav.classList.toggle('open');
      document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });
  }

  // Close mobile menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navToggler.classList.remove('active');
      nav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ============================================
  // ACTIVE NAV LINK ON SCROLL
  // ============================================
  const sections = document.querySelectorAll('section[id]');

  function setActiveNav() {
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // ============================================
  // SCROLL PROGRESS BAR
  // ============================================
  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
  }

  // ============================================
  // HEADER BACKGROUND ON SCROLL
  // ============================================
  function updateHeader() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  // ============================================
  // BACK TO TOP BUTTON
  // ============================================
  function updateBackToTop() {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  if (backToTop) {
    backToTop.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ============================================
  // SCROLL REVEAL ANIMATION
  // ============================================
  function revealOnScroll() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        element.classList.add('active');
      }
    });
  }

  // Add reveal classes to elements
  function initRevealAnimations() {
    // Section headers
    document.querySelectorAll('.section-header').forEach((el, i) => {
      el.classList.add('reveal');
      if (i % 2 === 0) el.classList.add('delay-1');
    });

    // About section
    const aboutImage = document.querySelector('.about-image');
    const aboutText = document.querySelector('.about-text');
    if (aboutImage) aboutImage.classList.add('reveal-left');
    if (aboutText) aboutText.classList.add('reveal-right');

    // Skill cards
    document.querySelectorAll('.skill-card').forEach((el, i) => {
      el.classList.add('reveal');
      el.classList.add('delay-' + ((i % 4) + 1));
    });

    // Project cards
    document.querySelectorAll('.project-card').forEach((el, i) => {
      el.classList.add('reveal-scale');
      el.classList.add('delay-' + ((i % 4) + 1));
    });

    // Contact section
    const contactInfo = document.querySelector('.contact-info');
    const contactFormEl = document.querySelector('.contact-form');
    if (contactInfo) contactInfo.classList.add('reveal-left');
    if (contactFormEl) contactFormEl.classList.add('reveal-right');
  }

  // ============================================
  // SKILL BAR ANIMATION
  // ============================================
  function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
      const rect = bar.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        bar.style.width = bar.style.getPropertyValue('--progress');
      }
    });
  }

  // ============================================
  // CONTACT FORM HANDLING
  // ============================================
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      // Simple validation
      if (!name || !email || !message) {
        showNotification('Please fill in all fields.', 'error');
        return;
      }

      // Simulate form submission
      const btn = contactForm.querySelector('button[type=submit]');
      const originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      setTimeout(() => {
        showNotification('Thank you! Your message has been sent.', 'success');
        contactForm.reset();
        btn.textContent = originalText;
        btn.disabled = false;
      }, 1500);
    });
  }

  // Notification function
  function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = 'notification ' + type;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 90px;
      right: 24px;
      padding: 16px 24px;
      border-radius: 12px;
      font-weight: 600;
      z-index: 10000;
      animation: slideIn 0.3s ease;
      max-width: 400px;
      word-wrap: break-word;
    `;

    if (type === 'success') {
      notification.style.background = '#00d26a';
      notification.style.color = '#0a0a0a';
    } else {
      notification.style.background = '#ff4444';
      notification.style.color = 'white';
    }

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease forwards';
      setTimeout(() => notification.remove(), 300);
    }, 4000);
  }

  // Add notification animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  // ============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ============================================
  // COUNTER ANIMATION FOR STATS
  // ============================================
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
      const target = parseInt(counter.textContent);
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const updateCounter = () => {
        current += step;
        if (current < target) {
          counter.textContent = Math.floor(current) + '+';
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target + '+';
        }
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            updateCounter();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      observer.observe(counter);
    });
  }

  // ============================================
  // INITIALIZE
  // ============================================
  initRevealAnimations();

  // Scroll event listener
  window.addEventListener('scroll', function() {
    updateScrollProgress();
    updateHeader();
    updateBackToTop();
    setActiveNav();
    revealOnScroll();
    animateSkillBars();
  });

  // Initial calls
  updateScrollProgress();
  updateHeader();
  setActiveNav();
  revealOnScroll();
  animateSkillBars();
  animateCounters();

});