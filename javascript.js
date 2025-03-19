// Main JavaScript for iFixTech website

// DOM elements
const header = document.querySelector('header');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const heroSection = document.querySelector('.hero-section');
const typingTexts = [
  "Expert Tech Repair",
  "Same-Day Service",
  "Affordable Solutions",
  "Certified Technicians"
];

// Initialize on document ready
document.addEventListener('DOMContentLoaded', function() {
  initScrollEffects();
  initMobileMenu();
  createFloatingIcons();
  initTypingEffect();
  animateTechWords();
});

// Scroll effects for header
function initScrollEffects() {
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// Mobile menu toggle
function initMobileMenu() {
  hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

// Create floating tech icons in hero section
function createFloatingIcons() {
  const floatingIcons = document.createElement('div');
  floatingIcons.className = 'floating-icons';
  
  // Tech icon classes (using Font Awesome classes)
  const icons = [
    'fa-laptop', 'fa-mobile-alt', 'fa-tablet-alt', 
    'fa-memory', 'fa-microchip', 'fa-hdd',
    'fa-battery-full', 'fa-wifi', 'fa-bluetooth'
  ];
  
  // Create 15 random floating icons
  for (let i = 0; i < 15; i++) {
    const icon = document.createElement('i');
    icon.className = `fas ${icons[Math.floor(Math.random() * icons.length)]} floating-icon`;
    
    // Random position and delay
    icon.style.left = `${Math.random() * 100}%`;
    icon.style.animationDelay = `${Math.random() * 10}s`;
    icon.style.animationDuration = `${10 + Math.random() * 20}s`;
    
    floatingIcons.appendChild(icon);
  }
  
  heroSection.appendChild(floatingIcons);
}

// Typing effect for hero subtitle
function initTypingEffect() {
  const typingContainer = document.createElement('div');
  typingContainer.className = 'typing-container';
  
  const typingText = document.createElement('div');
  typingText.className = 'typing-text';
  typingText.textContent = typingTexts[0];
  
  typingContainer.appendChild(typingText);
  document.querySelector('.hero-content').insertBefore(typingContainer, document.querySelector('.hero-subtitle'));
  
  let textIndex = 0;
  
  // Change text every 4 seconds
  setInterval(() => {
    textIndex = (textIndex + 1) % typingTexts.length;
    typingText.style.animation = 'none';
    typingText.offsetHeight; // Trigger reflow
    typingText.textContent = typingTexts[textIndex];
    typingText.style.animation = 'typing 4s steps(40, end), blink-caret 0.75s step-end infinite';
  }, 4000);
}

// Animate tech words at bottom of hero
function animateTechWords() {
  const techWords = [
    'Smartphones', 'Laptops', 'Tablets', 'PCs', 
    'Gaming', 'Networks', 'Security', 'Cloud',
    'Data Recovery', 'Upgrades'
  ];
  
  const techWordsContainer = document.createElement('div');
  techWordsContainer.className = 'tech-words';
  
  techWords.forEach((word, index) => {
    const wordEl = document.createElement('span');
    wordEl.className = 'tech-word';
    wordEl.textContent = word;
    wordEl.style.animationDelay = `${index * 0.8}s`;
    techWordsContainer.appendChild(wordEl);
  });
  
  heroSection.appendChild(techWordsContainer);
}

// Reveal animations for services section
function initRevealAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.2 });
  
  document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
  
  // Add the revealed class
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.revealed').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  });
}

// Parallax effect for hero section
function initParallax() {
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    heroSection.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
  });
}

// Initialize all animations
function initAnimations() {
  initRevealAnimations();
  initParallax();
}

// Call animation initializations after DOM loaded
window.addEventListener('load', initAnimations);
