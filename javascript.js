/**
 * iFixTech Website JavaScript
 * 
 * COMPREHENSIVE JAVASCRIPT FOR A MODERN TECH WEBSITE
 * This file contains all frontend interactions and animations
 * 
 * TABLE OF CONTENTS:
 * 1. Core Initialization
 * 2. Preloader Management
 * 3. Custom Cursor Effects
 * 4. Mobile Navigation
 * 5. Smooth Scrolling
 * 6. Header Scroll Effects
 * 7. Particle Animation System
 * 8. 3D Tilt Effects
 * 9. Form Animation & Validation
 */

// ==========================================================
// 1. CORE INITIALIZATION - Main entry point of our JavaScript
// ==========================================================

/**
 * Wait for DOM to be fully loaded before initializing components
 * This ensures all HTML elements are available for manipulation
 */
document.addEventListener('DOMContentLoaded', function() {
  // Check for required libraries and dependencies
  checkDependencies();
  
  // Initialize all website features in the correct sequence
  initializeWebsiteFeatures();
  
  // Fix any potential rendering issues
  applyInitialUIFixes();
});

/**
 * Checks if all required external libraries are loaded
 * Shows warning messages if dependencies are missing
 */
function checkDependencies() {
  // Check for GSAP (animation library)
  if (typeof gsap === 'undefined') {
    console.warn('⚠️ GSAP animation library is not loaded. Animation features will be disabled.');
  }
  
  // Check for VanillaTilt (3D effect library)
  if (typeof VanillaTilt === 'undefined') {
    console.warn('⚠️ VanillaTilt library is not loaded. 3D tilt effects will be disabled.');
  }
}

/**
 * Initializes all website features in the proper sequence
 * Each function handles a specific part of website functionality
 */
function initializeWebsiteFeatures() {
  initPreloader();         // Step 1: Handle loading screen
  initCustomCursor();      // Step 2: Setup custom mouse cursor
  initMobileNavigation();  // Step 3: Setup mobile menu
  initSmoothScrolling();   // Step 4: Enable smooth scrolling for links
  initScrollHeader();      // Step 5: Add scroll effects to header
  initParticles();         // Step 6: Initialize background particles
  initTiltEffect();        // Step 7: Add 3D tilt effect to elements
  initFormAnimations();    // Step 8: Setup form animations and validation
}

/**
 * Applies initial UI fixes to prevent flickering or animation issues
 */
function applyInitialUIFixes() {
  // Make service cards visible by default to prevent animation glitches
  document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '1';
    card.style.transform = 'none';
  });
}

// ==========================================================
// 2. PRELOADER MANAGEMENT - Loading screen implementation
// ==========================================================

/**
 * Handles the website preloader animation and transition
 * Shows a loading screen until all website content is ready
 */
function initPreloader() {
  // The 'load' event fires when all website assets are fully loaded
  window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    
    // If preloader element doesn't exist, exit the function
    if (!preloader) return;
    
    // Add fade-out class to start animation
    preloader.classList.add('fade-out');
    
    // Remove preloader after animation completes
    setTimeout(() => {
      // Hide preloader completely
      preloader.style.display = 'none';
      
      // Start animations after preloader disappears
      initAnimations();
    }, 1000); // 1 second transition - matches CSS transition time
  });
}

/**
 * Initialize animations that should start after page load
 * Called after the preloader animation completes
 */
function initAnimations() {
  // Reveal main content sections with staggered animation
  // Note: This function is called but not defined in your code
  // Implement this function based on your animation needs
}

// ==========================================================
// 3. CUSTOM CURSOR EFFECTS - Custom mouse cursor implementation
// ==========================================================

/**
 * Creates a custom cursor effect that follows mouse movement
 * Replaces the default browser cursor with a custom designed one
 */
function initCustomCursor() {
  // Get cursor elements
  const cursor = document.querySelector('.cursor-follower');
  const cursorDot = document.querySelector('.cursor-dot');
  
  // Exit if cursor elements don't exist
  if (!cursor || !cursorDot) return;
  
  // Track mouse movement
  document.addEventListener('mousemove', e => {
    // GSAP provides smooth animation for cursor movement
    // The outer circle follows with slight delay for a trailing effect
    gsap.to(cursor, { 
      x: e.clientX, 
      y: e.clientY,
      duration: 0.3    // Slower follow for smooth effect
    });
    
    // Inner dot follows cursor more closely
    gsap.to(cursorDot, { 
      x: e.clientX, 
      y: e.clientY,
      duration: 0.1    // Fast follow for responsive feeling
    });
  });

  // Add click effect
  document.addEventListener('mousedown', () => {
    cursor.classList.add('active');
    cursorDot.classList.add('active');
  });

  document.addEventListener('mouseup', () => {
    cursor.classList.remove('active');
    cursorDot.classList.remove('active');
  });

  // Special hover effect for interactive elements
  const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, .clickable');
  interactiveElements.forEach(element => {
    // Mouse enters interactive element
    element.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
      cursorDot.classList.add('hover');
    });
    // Mouse leaves interactive element
    element.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
      cursorDot.classList.remove('hover');
    });
  });
}

// ==========================================================
// 4. MOBILE NAVIGATION - Mobile menu toggle functionality
// ==========================================================

/**
 * Handles the mobile menu toggle button and animations
 * Controls opening and closing of the navigation menu on small screens
 */
function initMobileNavigation() {
  // Get the navigation toggle button
  const navToggle = document.getElementById('navToggle');
  
  // Exit if toggle button doesn't exist
  if (!navToggle) return;
  
  // Add click event to toggle button
  navToggle.addEventListener('click', function() {
    // Toggle active class on the button itself (changes hamburger to X)
    this.classList.toggle('active');
    
    // Toggle mobile menu visibility
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
      navLinks.classList.toggle('active');
    }
    
    // Prevent body scrolling when menu is open
    document.body.classList.toggle('menu-open');
  });
  
  // Close menu when clicking on links or outside the menu
  document.addEventListener('click', function(event) {
    const navLinks = document.querySelector('.nav-links.active');
    const isClickInsideMenu = navLinks?.contains(event.target);
    const isClickOnToggle = navToggle.contains(event.target);
    
    // If menu is open and click is outside menu and not on toggle button
    if (navLinks && !isClickInsideMenu && !isClickOnToggle) {
      // Close menu
      navLinks.classList.remove('active');
      navToggle.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  });
}

// ==========================================================
// 5. SMOOTH SCROLLING - Smooth anchor link navigation
// ==========================================================

/**
 * Implements smooth scrolling for anchor links
 * Makes the page scroll smoothly to sections when clicking navigation links
 */
function initSmoothScrolling() {
  // Select all anchor links that point to an ID on the page
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    // Add click event to each anchor link
    anchor.addEventListener('click', function(e) {
      // Prevent default jump-to-anchor behavior
      e.preventDefault();
      
      // Get the target element from the href attribute
      const targetId = this.getAttribute('href');
      
      // Skip for empty anchors or just "#"
      if (targetId === '#' || targetId === '') return;
      
      const target = document.querySelector(targetId);
      
      // Scroll to target if it exists
      if (target) {
        // Calculate header height to offset scroll position
        const headerHeight = document.querySelector('header')?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        // Perform smooth scroll
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
      
      // Close mobile menu if open
      const navLinks = document.querySelector('.nav-links');
      const navToggle = document.getElementById('navToggle');
      
      if (navLinks?.classList.contains('active')) {
        navLinks.classList.remove('active');
        navToggle?.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    });
  });
}

// ==========================================================
// 6. HEADER SCROLL EFFECT - Dynamic header appearance on scroll
// ==========================================================

/**
 * Changes header appearance when scrolling down the page
 * Usually adds background color and shadow to initially transparent header
 */
function initScrollHeader() {
  const header = document.querySelector('header');
  
  // Exit if header doesn't exist
  if (!header) return;
  
  // Function to update header appearance based on scroll position
  function updateHeaderAppearance() {
    // If scrolled more than 50px, add 'scrolled' class
    header.classList.toggle('scrolled', window.scrollY > 50);
  }
  
  // Initial check on page load
  updateHeaderAppearance();
  
  // Update on scroll
  window.addEventListener('scroll', updateHeaderAppearance);
}

// ==========================================================
// 7. PARTICLE ANIMATION - Background particle system
// ==========================================================

/**
 * Creates an animated particle background effect
 * Draws and animates particles on a canvas element
 */
function initParticles() {
  // Get the canvas element
  const canvas = document.getElementById('particle-canvas');
  
  // Exit if canvas doesn't exist
  if (!canvas) return;
  
  // Get drawing context and set canvas dimensions
  const ctx = canvas.getContext('2d');
  
  // Make canvas fill its container
  function setCanvasSize() {
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }
  
  setCanvasSize();
  
  // Array to store particle objects
  const particles = [];
  
  // Number of particles to create (adjust based on screen size)
  const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 10000));
  
  // Create random particles
  for(let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3 + 1,
      color: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1})`,
      speedX: Math.random() * 2 - 1,
      speedY: Math.random() * 2 - 1
    });
  }
  
  // Animation function that runs every frame
  function animate() {
    // Request the next animation frame
    requestAnimationFrame(animate);
    
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw and update each particle
    for(let i = 0; i < particles.length; i++) {
      const p = particles[i];
      
      // Draw particle as a circle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
      
      // Move particle according to its speed
      p.x += p.speedX;
      p.y += p.speedY;
      
      // Bounce off edges of the canvas
      if(p.x < 0 || p.x > canvas.width) p.speedX *= -1;
      if(p.y < 0 || p.y > canvas.height) p.speedY *= -1;
      
      // Connect nearby particles with lines (creates web effect)
      for(let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Only connect particles within 100px of each other
        const maxDistance = 100;
        if(distance < maxDistance) {
          // Line opacity decreases with distance
          const opacity = 0.2 - distance / 500;
          
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }
  }
  
  // Start animation
  animate();
  
  // Update canvas size when window is resized
  window.addEventListener('resize', () => {
    setCanvasSize();
    
    // Reposition particles when canvas is resized
    particles.forEach(p => {
      p.x = Math.min(p.x, canvas.width);
      p.y = Math.min(p.y, canvas.height);
    });
  });
}

// ==========================================================
// 8. 3D TILT EFFECT - Element tilting on mouse hover
// ==========================================================

/**
 * Initializes 3D tilt effect on elements with data-tilt attribute
 * Creates interactive 3D rotation based on mouse position
 */
function initTiltEffect() {
  // Check if VanillaTilt library is available
  if (typeof VanillaTilt === 'undefined') {
    console.warn('⚠️ VanillaTilt library is not loaded. Tilt effects disabled.');
    return;
  }
  
  // Get all elements with the data-tilt attribute
  const tiltElements = document.querySelectorAll("[data-tilt]");
  
  // Exit if no tilt elements are found
  if (tiltElements.length === 0) return;
  
  // Initialize tilt effect with options
  VanillaTilt.init(tiltElements, {
    max: 10,           // Maximum tilt rotation (degrees)
    speed: 400,        // Speed of tilt effect (ms)
    glare: true,       // Enable glare effect
    "max-glare": 0.3,  // Maximum glare opacity
    scale: 1.05        // Slight scaling effect on hover
  });
}

// ==========================================================
// 9. FORM ANIMATION & VALIDATION - Form interaction effects
// ==========================================================

/**
 * Initializes form animations and validation
 * Enhances form fields with visual feedback and validation
 */
function initFormAnimations() {
  // Get all forms on the page
  const forms = document.querySelectorAll('form');
  
  // Exit if no forms are found
  if (forms.length === 0) return;
  
  // Process each form
  forms.forEach(form => {
    const inputs = form.querySelectorAll('input, textarea, select');
    
    // Add animation to each form field
    inputs.forEach(input => {
      // Focus effect
      input.addEventListener('focus', () => {
        // Find the parent field container
        const field = input.closest('.form-field');
        if (field) field.classList.add('focused');
      });
      
      // Blur effect (when input loses focus)
      input.addEventListener('blur', () => {
        const field = input.closest('.form-field');
        
        // Keep 'filled' class if input has a value
        if (field) {
          field.classList.remove('focused');
          field.classList.toggle('filled', input.value.trim() !== '');
        }
      });
      
      // Check initial state (for forms with pre-filled values)
      if (input.value.trim() !== '') {
        const field = input.closest('.form-field');
        if (field) field.classList.add('filled');
      }
    });
    
    // Form submission handling
    form.addEventListener('submit', function(e) {
      // Validate form before submission
      if (!validateForm(form)) {
        e.preventDefault(); // Prevent submission if validation fails
      } else {
        // Show loading state
        const submitBtn = form.querySelector('[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.classList.add('loading');
          
          // Optional: Add loading animation using GSAP
          if (typeof gsap !== 'undefined') {
            gsap.to(submitBtn, {
              backgroundColor: '#4a4a4a',
              duration: 0.3
            });
          }
        }
      }
    });
  });
}

/**
 * Validates form fields before submission
 * @param {HTMLFormElement} form - The form to validate
 * @return {boolean} - Whether the form is valid
 */
function validateForm(form) {
  let isValid = true;
  const fields = form.querySelectorAll('[required]');
  
  // Reset previous validation messages
  form.querySelectorAll('.error-message').forEach(msg => msg.remove());
  
  // Check each required field
  fields.forEach(field => {
    const fieldContainer = field.closest('.form-field');
    
    // Remove previous error states
    if (fieldContainer) fieldContainer.classList.remove('error');
    
    // Check if field is empty
    if (field.value.trim() === '') {
      isValid = false;
      
      // Add error class
      if (fieldContainer) fieldContainer.classList.add('error');
      
      // Create error message
      const errorMsg = document.createElement('div');
      errorMsg.className = 'error-message';
      errorMsg.textContent = 'This field is required';
      
      // Insert error message after the field
      field.after(errorMsg);
    }
    
    // Email validation
    if (field.type === 'email' && field.value.trim() !== '') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(field.value)) {
        isValid = false;
        
        // Add error class
        if (fieldContainer) fieldContainer.classList.add('error');
        
        // Create error message
        const errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        errorMsg.textContent = 'Please enter a valid email address';
        
        // Insert error message after the field
        field.after(errorMsg);
      }
    }
  });
  
  return isValid;
}
/**
 * Initializes all animations on the page
 * Call this function when the page has loaded
 */
function initAnimations() {
  // Initialize AOS (Animate On Scroll) library if available
  initAOS();
  
  // Initialize all animation groups
  initGSAPAnimations();
  initCounters();
  initGlobe();
  initCircuitAnimation();
}

/**
 * Initialize AOS (Animate On Scroll) library with proper settings
 * This controls basic scroll animations throughout the site
 */
function initAOS() {
  // Only run if the AOS library is loaded
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,          // Animation duration in milliseconds
      easing: 'ease-in-out',  // Animation timing function
      once: true              // Whether animation should happen only once
    });
  }
}

/**
 * ==============================================
 * GSAP ANIMATIONS
 * GSAP is a professional-grade animation library
 * ==============================================
 */

/**
 * Initialize all GSAP animations throughout the site
 * GSAP animations are smooth and performant for modern websites
 */
function initGSAPAnimations() {
  // Safety check - only run if GSAP library is available
  if (typeof gsap === 'undefined') {
    console.warn('GSAP library not found. Hero animations will not run.');
    return;
  }

  // Run specific animation groups
  animateHeroSection();
  
  // Only initialize scroll-based animations if ScrollTrigger plugin is available
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    initScrollBasedAnimations();
  } else {
    console.warn('ScrollTrigger plugin not found. Scroll animations will not run.');
  }
}

/**
 * Animate the hero section elements with a staggered entrance
 * Creates a professional, engaging first impression
 */
function animateHeroSection() {
  // Animate the main heading with a slide-up effect
  gsap.from(".hero-content h1", { 
    duration: 1.2,            // Animation takes 1.2 seconds
    y: 100,                   // Start 100px below final position
    opacity: 0,               // Start fully transparent
    ease: "power4.out"        // Easing function for natural movement
  });
  
  // Animate the paragraph with a slight delay
  gsap.from(".hero-content p", { 
    duration: 1.2,
    y: 50,                    // Start 50px below final position
    opacity: 0,
    delay: 0.3,               // Wait 0.3 seconds before starting
    ease: "power4.out"
  });
  
  // Animate the call-to-action button last
  gsap.from(".hero-content .cta-button", { 
    duration: 1.2,
    y: 50,
    opacity: 0,
    delay: 0.6,               // Wait 0.6 seconds before starting
    ease: "power4.out"
  });
  
  // Animate the scroll indicator to appear last
  gsap.from(".scroll-indicator", { 
    duration: 1,
    y: -30,                   // Start 30px above final position
    opacity: 0,
    delay: 1.2,               // Wait until other animations complete
    ease: "power2.out"
  });
}

/**
 * Initialize all scroll-triggered animations
 * These animations activate as the user scrolls down the page
 */
function initScrollBasedAnimations() {
  animateRevealText();
  animateServiceCards();
  animateFloatingTechElements();
  animateContactSection();
}

/**
 * Animate text elements that should reveal as user scrolls
 */
function animateRevealText() {
  // Find all elements with the 'reveal-text' class
  const revealTextElements = document.querySelectorAll('.reveal-text');
  
  // Apply animation to each element
  revealTextElements.forEach(element => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,       // Element that triggers the animation
        start: "top 80%",       // Animation starts when top of element hits 80% down the viewport
        toggleActions: "play none none none" // Play animation once when triggered
      },
      duration: 1,
      y: 50,                    // Start 50px below final position
      opacity: 0,
      ease: "power3.out"        // Smooth easing function
    });
  });
}

/**
 * Animate service cards with a staggered entrance
 */
function animateServiceCards() {
  // Reset any existing animations (safety measure)
  gsap.set(".service-card", { opacity: 1, y: 0 });
  
  // Select all service cards
  const serviceCards = document.querySelectorAll('.service-card');
  
  // Apply animation to each card with a delay between them
  serviceCards.forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 85%",      // Animation starts when top of card is 85% from top of viewport
        once: true             // Animation plays only once
      },
      opacity: 0,
      y: 20,                   // Start 20px below final position
      duration: 0.7,           // Animation takes 0.7 seconds
      delay: index * 0.15,     // Staggered delay based on card position
      ease: "power2.out"       // Easing function
    });
  });
}

/**
 * Animate floating technology elements with continuous motion
 * Creates a dynamic, tech-focused visual effect
 */
function animateFloatingTechElements() {
  // Select all tech elements
  const techElements = document.querySelectorAll('.tech-element');
  
  // Apply a floating animation to each element
  techElements.forEach((element, index) => {
    gsap.to(element, {
      y: `${(index % 2 === 0 ? '-' : '')}20`,  // Alternate up/down movement
      x: `${(index % 3 === 0 ? '-' : '')}10`,  // Occasional side movement
      rotation: index % 2 === 0 ? 5 : -5,      // Slight rotation
      duration: 3 + index,                     // Varied duration for natural feel
      repeat: -1,                              // Repeat indefinitely
      yoyo: true,                              // Reverse animation for smooth loop
      ease: "sine.inOut",                      // Smooth sinusoidal easing
    });
  });
}

/**
 * Animate the contact section with elements sliding in from sides
 */
function animateContactSection() {
  // Animate contact form sliding in from right
  gsap.from(".contact-form", {
    scrollTrigger: {
      trigger: ".contact-wrapper",  // Container that triggers animation
      start: "top 70%",             // Start when top of section is 70% from top of viewport
      once: true                    // Animation plays only once
    },
    x: 100,                         // Start 100px to the right
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  });

  // Animate contact info sliding in from left
  gsap.from(".contact-info", {
    scrollTrigger: {
      trigger: ".contact-wrapper",
      start: "top 70%",
      once: true
    },
    x: -100,                        // Start 100px to the left
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  });
}

/**
 * ==============================================
 * COUNTER ANIMATIONS
 * Animated number counters for statistics
 * ==============================================
 */

/**
 * Initialize animated counters
 * These count up from zero to their target value when scrolled into view
 */
function initCounters() {
  // Safety check - only run if required libraries are available
  if (typeof CountUp === 'undefined' || typeof Waypoint === 'undefined') {
    console.warn('CountUp or Waypoint library not found. Counters will not animate.');
    return;
  }

  // Find all counter elements
  const counters = document.querySelectorAll('.counter');
  
  // Set up each counter
  counters.forEach(counter => {
    const updateCount = () => {
      // Get target value from data attribute or element content
      const target = parseInt(counter.getAttribute('data-target') || counter.innerText);
      
      // Create and configure the counter animation
      const countUp = new CountUp(counter, target, {
        startVal: 0,     // Start from zero
        duration: 2      // Animation duration in seconds
      });
      
      // Start the counter or log error if it fails
      if (!countUp.error) {
        countUp.start();
      } else {
        console.error('CountUp error:', countUp.error);
      }
    };

    // Create a waypoint to trigger the counter when scrolled into view
    new Waypoint({
      element: counter,           // Element to watch
      handler: function() {
        updateCount();            // Run the counter animation
        this.destroy();           // Remove waypoint after triggering once
      },
      offset: '90%'               // Trigger when element is 90% from top of viewport
    });
  });
}

/**
 * ==============================================
 * 3D GLOBE ANIMATION
 * Interactive 3D globe using Three.js
 * ==============================================
 */

/**
 * Initialize the 3D globe animation for the contact section
 * @returns {Function} Cleanup function to prevent memory leaks
 */
function initGlobe() {
  // Find the container element
  const container = document.getElementById('globe-container');
  
  // Safety checks
  if (!container) {
    console.warn('Globe container not found. Globe will not be initialized.');
    return;
  }
  
  if (typeof THREE === 'undefined') {
    console.warn('THREE.js library not found. Globe will not be initialized.');
    return;
  }
  
  // Clear any existing content
  container.innerHTML = '';
  
  // Create Three.js scene, camera, renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,                                           // Field of view (degrees)
    container.clientWidth / container.clientHeight, // Aspect ratio
    0.1,                                          // Near clipping plane
    1000                                          // Far clipping plane
  );
  
  // Create WebGL renderer with appropriate settings
  const renderer = new THREE.WebGLRenderer({ 
    alpha: true,       // Transparent background
    antialias: true    // Smooth edges
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setClearColor(0x000000, 0);  // Transparent background
  container.appendChild(renderer.domElement);
  
  // Create globe sphere geometry
  const geometry = new THREE.SphereGeometry(3, 48, 48);
  
  // Create wireframe material for globe
  const material = new THREE.MeshBasicMaterial({
    color: 0x4169E1,    // Royal blue color
    wireframe: true,     // Show as wireframe
    transparent: true,   // Enable transparency
    opacity: 0.3         // Mostly transparent
  });
  
  // Create the globe mesh and add to scene
  const globe = new THREE.Mesh(geometry, material);
  scene.add(globe);
  
  // Add particle effect around globe
  addGlobeParticles(scene);
  
  // Position camera
  camera.position.z = 8;
  
  // Set up animation loop
  let animationId;
  
  function animate() {
    // Request next frame
    animationId = requestAnimationFrame(animate);
    
    // Rotate globe and particles
    globe.rotation.y += 0.001;  // Slow rotation of globe
    scene.children[1].rotation.y += 0.0005;  // Even slower rotation of particles
    
    // Render the scene
    renderer.render(scene, camera);
  }
  
  // Start animation
  animate();
    
  // Handle window resize events
  function handleResize() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // Update camera aspect ratio
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    
    // Update renderer size
    renderer.setSize(width, height);
  }
  
  // Add resize listener
  window.addEventListener('resize', handleResize);

  // Return cleanup function to prevent memory leaks
  return function cleanup() {
    // Remove event listeners
    window.removeEventListener('resize', handleResize);
    
    // Stop animation loop
    cancelAnimationFrame(animationId);
    
    // Dispose of Three.js resources
    renderer.dispose();
    geometry.dispose();
    material.dispose();
    scene.children[1].geometry.dispose();
    scene.children[1].material.dispose();
    
    // Remove canvas from DOM
    if (container.contains(renderer.domElement)) {
      container.removeChild(renderer.domElement);
    }
  };
}

/**
 * Create particles surrounding the globe
 * @param {THREE.Scene} scene - The Three.js scene to add particles to
 */
function addGlobeParticles(scene) {
  // Create geometry for particles
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 500;
  
  // Create array for particle positions (x, y, z for each particle)
  const posArray = new Float32Array(particlesCount * 3);
  
  // Calculate random positions in a sphere around the globe
  for(let i = 0; i < particlesCount; i++) {
    // Create positions using spherical coordinates
    const radius = 3 + Math.random() * 1.5;  // Distance from center
    const theta = Math.random() * Math.PI * 2;  // Angle around Y axis
    const phi = Math.acos(2 * Math.random() - 1);  // Angle from Y axis
    
    // Convert spherical coordinates to cartesian (x, y, z)
    posArray[i * 3] = radius * Math.sin(phi) * Math.cos(theta);      // x
    posArray[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);  // y
    posArray[i * 3 + 2] = radius * Math.cos(phi);                    // z
  }
  
  // Add position attribute to geometry
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  
  // Create material for particles
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.04,        // Size of each particle
    color: 0x00FFFF    // Cyan color
  });
  
  // Create mesh from geometry and material
  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  
  // Add to scene
  scene.add(particlesMesh);
}

/**
 * ==============================================
 * CIRCUIT ANIMATION
 * Creates a tech-themed animated circuit background
 * ==============================================
 */

/**
 * Initialize the circuit line background animation
 * Creates a tech-themed animated background with circuit-like lines
 */
function initCircuitAnimation() {
  // Find the container for circuit lines
  const circuitLines = document.querySelector('.circuit-lines');
  
  // Safety check
  if (!circuitLines) {
    console.warn('Circuit lines container not found. Circuit animation will not run.');
    return;
  }
  
  // Number of lines to create
  const lineCount = 15;
  
  // Create each circuit line
  for(let i = 0; i < lineCount; i++) {
    // Create line element
    const line = document.createElement('div');
    line.classList.add('circuit-line');
    
    // Set random position and dimensions
    line.style.top = `${Math.random() * 100}%`;     // Random vertical position
    line.style.left = `${Math.random() * 100}%`;    // Random horizontal position
    line.style.width = `${Math.random() * 150 + 50}px`;  // Random width between 50-200px
    line.style.height = `${Math.random() * 2 + 1}px`;    // Random height between 1-3px
    line.style.transform = `rotate(${Math.random() * 360}deg)`;  // Random rotation
    line.style.animationDelay = `${Math.random() * 5}s`;         // Random animation delay
    
    // Add circuit nodes to some lines (50% chance)
    if(Math.random() > 0.5) {
      const node = document.createElement('div');
      node.classList.add('circuit-node');
      line.appendChild(node);
    }
    
    // Add line to container
    circuitLines.appendChild(line);
  }
}

/**
 * TECH WEBSITE INTERACTIVE FORM SYSTEM
 * Optimized and organized JavaScript for animated form interactions
 * 
 * This script handles:
 * 1. Form field animations with GSAP
 * 2. Form submission via Formspree
 * 3. Success/error handling
 * 4. Accessibility enhancements
 */

// =======================================================
// MAIN INITIALIZATION FUNCTION
// This ensures all animations are set up when the page loads
// =======================================================
function initTechFormSystem() {
  // Check if GSAP library is available (prevents errors if GSAP fails to load)
  const isGsapAvailable = typeof gsap !== 'undefined';
  
  // Initialize each component of the form system
  setupFormContainerEffects(isGsapAvailable);
  setupFormFieldAnimations(isGsapAvailable);
  setupSubmitButtonEffects(isGsapAvailable);
  setupFormSubmissionHandler();
}

// =======================================================
// FORM CONTAINER EFFECTS
// Creates a subtle glow effect when hovering over the entire form
// =======================================================
function setupFormContainerEffects(isGsapAvailable) {
  // Find the form container using multiple possible selectors
  const formContainer = document.querySelector('.contact-form') || document.querySelector('form');
  
  if (!formContainer) return; // Exit if no form is found
  
  // Ensure the form is always visible (prevents any CSS conflicts)
  formContainer.style.opacity = '1';
  formContainer.style.visibility = 'visible';
  
  // Only add GSAP animations if the library is available
  if (!isGsapAvailable) return;
  
  // HOVER EFFECT: Add subtle glow when mouse enters form area
  formContainer.addEventListener('mouseenter', () => {
    gsap.to(formContainer, {
      boxShadow: '0 0 20px rgba(0, 255, 255, 0.3), 0 0 40px rgba(0, 255, 255, 0.1)',
      duration: 0.5,
      ease: "power2.out" // Smooth acceleration
    });
  });
  
  // RESET EFFECT: Remove glow when mouse leaves form area
  formContainer.addEventListener('mouseleave', () => {
    gsap.to(formContainer, {
      boxShadow: 'none',
      duration: 0.5,
      ease: "power2.in" // Smooth deceleration
    });
  });
}

// =======================================================
// FORM FIELD ANIMATIONS
// Creates interactive effects when users interact with input fields
// =======================================================
function setupFormFieldAnimations(isGsapAvailable) {
  // Select all input fields with the .form-control class
  const inputs = document.querySelectorAll('.form-control');
  
  inputs.forEach((input) => {
    const parent = input.parentElement;
    const line = parent.querySelector('.line'); // Animated underline element
    
    // FOCUS EFFECT: When user clicks on an input
    input.addEventListener('focus', () => {
      // Add CSS class for styling
      parent.classList.add('focused');
      
      // GSAP Animation for the underline
      if (isGsapAvailable && line) {
        gsap.to(line, {
          width: '100%', // Expand to full width
          opacity: 1,
          backgroundColor: '#00FFFF', // Cyan color
          duration: 0.4,
          ease: "power2.out"
        });
      }
    });
    
    // BLUR EFFECT: When user clicks away from an empty input
    input.addEventListener('blur', () => {
      if (input.value === '') {
        // Remove focus styling if field is empty
        parent.classList.remove('focused');
        
        // Retract the underline animation
        if (isGsapAvailable && line) {
          gsap.to(line, {
            width: '0%', // Shrink back to nothing
            opacity: 0.3,
            backgroundColor: 'var(--accent)', // Use CSS variable for color
            duration: 0.4,
            ease: "power2.out"
          });
        }
      }
    });
    
    // TYPING EFFECT: React to user input with color changes
    input.addEventListener('input', () => {
      if (isGsapAvailable && line) {
        // Create a random cyan-blue hue for a dynamic effect
        gsap.to(line, {
          backgroundColor: `hsl(${180 + Math.random() * 60}, 100%, 60%)`,
          duration: 0.2
        });
      }
    });
    
    // INITIAL STATE: Handle pre-filled inputs (e.g., from browser autofill)
    if (input.value !== '') {
      parent.classList.add('focused');
      parent.classList.add('success');
    }
  });
}

// =======================================================
// SUBMIT BUTTON EFFECTS
// Creates interactive glow effects for the submit button
// =======================================================
function setupSubmitButtonEffects(isGsapAvailable) {
  const submitBtn = document.querySelector('.contact-form button[type="submit"]');
  
  if (!submitBtn || !isGsapAvailable) return;
  
  // Create glow effect container if it doesn't exist
  if (!submitBtn.querySelector('.btn-glow')) {
    const btnGlow = document.createElement('div');
    btnGlow.classList.add('btn-glow');
    submitBtn.appendChild(btnGlow);
  }
  
  const btnGlow = submitBtn.querySelector('.btn-glow');
  
  // HOVER EFFECT: Add glow when mouse enters button
  submitBtn.addEventListener('mouseenter', () => {
    gsap.to(submitBtn, {
      boxShadow: '0 0 15px rgba(0, 255, 255, 0.4), 0 0 30px rgba(0, 255, 255, 0.2)',
      duration: 0.4,
      ease: "power2.out"
    });
    
    if (btnGlow) {
      gsap.to(btnGlow, {
        opacity: 0.8,
        duration: 0.4
      });
    }
  });
  
  // RESET EFFECT: Remove glow when mouse leaves button
  submitBtn.addEventListener('mouseleave', () => {
    gsap.to(submitBtn, {
      boxShadow: '0 0 0 rgba(0, 255, 255, 0)',
      duration: 0.4,
      ease: "power2.in"
    });
    
    if (btnGlow) {
      gsap.to(btnGlow, {
        opacity: 0,
        duration: 0.4
      });
    }
  });
}

// =======================================================
// FORM SUBMISSION HANDLER
// Processes form data and sends it to Formspree
// =======================================================
function setupFormSubmissionHandler() {
  const form = document.querySelector('.contact-form form');
  const submitBtn = document.querySelector('.submit-btn');
  
  if (!form || !submitBtn) return;
  
  form.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default browser form submission
    
    // Store the original button content to restore later
    const originalBtnHTML = submitBtn.innerHTML;
    
    // Update button to show submission in progress
    submitBtn.innerHTML = '<span>Submitting...</span>';
    submitBtn.disabled = true; // Prevent multiple submissions
    
    // Collect all form data
    const formData = new FormData(form);
    
    // AJAX REQUEST: Send form data to Formspree
    fetch("https://formspree.io/f/xnnnrgrb", {
      method: "POST",
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.ok) {
        // SUCCESS HANDLING
        handleFormSuccess(form, submitBtn, originalBtnHTML);
      } else {
        // ERROR HANDLING
        handleFormError(form, submitBtn, originalBtnHTML);
      }
    })
    .catch(error => {
      // NETWORK ERROR HANDLING
      console.error('Network Error:', error);
      handleFormError(form, submitBtn, originalBtnHTML);
    });
  });
  
  // Setup form field focus behavior (separate from animations)
  setupFormFieldFocus();
}

// =======================================================
// SUCCESS HANDLER
// Creates and displays success message after form submission
// =======================================================
function handleFormSuccess(form, submitBtn, originalBtnHTML) {
  // Update button state
  submitBtn.innerHTML = '<span>Submitted!</span>';
  
  // Reset form fields
  form.reset();
  
  // Reset field styling
  document.querySelectorAll('.form-group').forEach(group => {
    group.classList.remove('focused');
  });
  
  // Create success message
  const successMessage = document.createElement('div');
  successMessage.className = 'success-message';
  successMessage.textContent = 'Thank you! Your message has been sent successfully.';
  successMessage.style.color = 'var(--accent)';
  successMessage.style.marginTop = '20px';
  successMessage.style.textAlign = 'center';
  form.appendChild(successMessage);
  
  // Restore button after 2 seconds
  setTimeout(() => {
    submitBtn.innerHTML = originalBtnHTML;
    submitBtn.disabled = false;
    
    // Fade out and remove success message after 5 seconds
    setTimeout(() => fadeOutAndRemove('.success-message'), 5000);
  }, 2000);
}

// =======================================================
// ERROR HANDLER
// Creates and displays error message when submission fails
// =======================================================
function handleFormError(form, submitBtn, originalBtnHTML) {
  // Update button state
  submitBtn.innerHTML = '<span>Error! Try Again</span>';
  submitBtn.disabled = false;
  
  // Create error message
  const errorMessage = document.createElement('div');
  errorMessage.className = 'error-message';
  errorMessage.textContent = 'There was a problem sending your message. Please try again.';
  errorMessage.style.color = '#ff3366';
  errorMessage.style.marginTop = '20px';
  errorMessage.style.textAlign = 'center';
  form.appendChild(errorMessage);
  
  // Remove error message after 5 seconds
  setTimeout(() => fadeOutAndRemove('.error-message'), 5000);
  
  // Restore button after a delay
  setTimeout(() => {
    submitBtn.innerHTML = originalBtnHTML;
  }, 2000);
}

// =======================================================
// HELPER FUNCTION: FADE OUT & REMOVE
// Smoothly removes elements from the DOM with animation
// =======================================================
function fadeOutAndRemove(selector) {
  const element = document.querySelector(selector);
  if (element) {
    element.style.opacity = '0';
    element.style.transition = 'opacity 0.5s ease';
    setTimeout(() => element.remove(), 500); // Remove after fade completes
  }
}

// =======================================================
// FORM FIELD FOCUS HANDLER
// Manages CSS classes for input field styling
// =======================================================
function setupFormFieldFocus() {
  const formControls = document.querySelectorAll('.form-control');
  
  formControls.forEach(control => {
    // Set initial state for pre-filled fields
    if (control.value !== '') {
      control.parentElement.classList.add('focused');
    }
    
    // Add focus class when field is selected
    control.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    // Remove focus class when field is empty and deselected
    control.addEventListener('blur', function() {
      if (this.value === '') {
        this.parentElement.classList.remove('focused');
      }
    });
  });
}

// =======================================================
// INITIALIZE EVERYTHING WHEN PAGE LOADS
// =======================================================
document.addEventListener('DOMContentLoaded', initTechFormSystem);


// Wait for the DOM to be fully loaded before running any code
document.addEventListener('DOMContentLoaded', function() {
  
  /**
   * SECTION 1: SCROLL ANIMATIONS
   * Using ScrollReveal library to create entrance animations when elements scroll into view
   */
  
  // Initialize ScrollReveal with default configuration
  const sr = ScrollReveal({
    origin: 'bottom',      // Elements appear from bottom
    distance: '30px',      // Distance elements travel during animation
    duration: 800,         // Animation duration in milliseconds
    delay: 300,            // Default delay before animation starts
    easing: 'cubic-bezier(0.5, 0, 0, 1)', // Custom easing function for smoother motion
    reset: false           // Elements animate only once (not every time they enter viewport)
  });
  
  // Apply animations to specific elements with custom configurations
  
  // Badge animation - quick entrance
  sr.reveal('.section-intro .badge', { delay: 100 });
  
  // Section heading animation
  sr.reveal('.section-intro h2', { delay: 300 });
  
  // About image slides in from left
  sr.reveal('.about-image', { 
    origin: 'left',        // Element appears from left side
    delay: 400,           
    distance: '50px'       // Travel further for more dramatic effect
  });
  
  // About text slides in from right
  sr.reveal('.about-text', { 
    origin: 'right',       // Element appears from right side
    delay: 500,            
    distance: '50px'      
  });
  
  /**
   * SECTION 2: SEQUENTIAL FEATURE ANIMATIONS
   * Revealing feature items one after another with increasing delays
   */
  
  // Select all feature elements and reveal them sequentially
  const features = document.querySelectorAll('.feature');
  features.forEach((feature, index) => {
    // Each feature gets an additional 100ms delay based on its position
    sr.reveal(feature, { delay: 600 + (index * 100) });
  });
  
  // Call-to-action button animation (appears last)
  sr.reveal('.cta-button', { delay: 900 });
  
  /**
   * SECTION 3: PARALLAX BACKGROUND EFFECT
   * Creates depth by moving background elements at different speeds during scroll
   * Only activates on larger screens for performance
   */
  
  // Check if device has sufficient screen width before adding scroll effects
  const isLargeScreen = window.innerWidth > 768;
  
  if (isLargeScreen) {
    // Use a more efficient way to handle scroll events with requestAnimationFrame
    let ticking = false;
    const circuitPattern = document.querySelector('.circuit-pattern');
    
    window.addEventListener('scroll', function() {
      if (!ticking && circuitPattern) {
        // Use requestAnimationFrame to optimize performance
        window.requestAnimationFrame(function() {
          const scrollPosition = window.pageYOffset;
          // Move the background pattern slowly as user scrolls
          circuitPattern.style.transform = `translateY(${scrollPosition * 0.05}px)`;
          ticking = false;
        });
        
        ticking = true;
      }
    }, { passive: true }); // Passive event listener improves scroll performance
  }
  
  /**
   * SECTION 4: INTERACTIVE TECH BUBBLES
   * Technology indicator bubbles that react to mouse movement
   * Creates an interactive, dynamic visual effect
   */
  
  const aboutSection = document.querySelector('.about');
  const techBubbles = document.querySelectorAll('.tech-bubble');
  
  if (aboutSection && techBubbles.length > 0 && window.innerWidth > 992) {
    // Debounce function to limit frequency of mousemove calculations
    let mouseMoveTimeout;
    
    aboutSection.addEventListener('mousemove', function(e) {
      // Cancel previous timeout to prevent too many calculations
      clearTimeout(mouseMoveTimeout);
      
      // Set a small timeout to reduce calculation frequency
      mouseMoveTimeout = setTimeout(() => {
        // Calculate mouse position as percentage of window dimensions
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        // Move each bubble slightly differently
        techBubbles.forEach((bubble, index) => {
          const oddEven = index % 2 ? -1 : 1;  // Alternate direction for variety
          const factor = (index + 1) * 3;      // Larger movement for some bubbles
          
          // Calculate movement amounts
          const moveX = oddEven * mouseX * factor;
          const moveY = mouseY * factor * 0.5;
          
          // Use transform for better performance (avoids repaints)
          bubble.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
      }, 10); // Short timeout for smoother effect
    });
    
    // Reset bubble positions when mouse leaves the section
    aboutSection.addEventListener('mouseleave', function() {
      techBubbles.forEach(bubble => {
        // Use CSS transitions (defined in stylesheet) for smooth return
        bubble.style.transform = 'translate(0, 0)';
      });
    });
  }
  
  /**
   * SECTION 5: FEATURE CARD INTERACTION
   * Interactive effects when users hover over feature cards
   */
  
  features.forEach(feature => {
    const featureIcon = feature.querySelector('.feature-icon');
    
    // Add animation on mouse enter
    feature.addEventListener('mouseenter', function() {
      if (featureIcon) {
        // Add pulse animation to the icon
        featureIcon.style.animation = 'pulse 1s infinite alternate';
      }
    });
    
    // Remove animation when mouse leaves
    feature.addEventListener('mouseleave', function() {
      if (featureIcon) {
        featureIcon.style.animation = '';
      }
    });
  });
  
  /**
   * SECTION 6: 3D TILT EFFECT
   * Adds depth and interactivity to the about image using mouse position
   */
  
  const aboutImage = document.querySelector('.about-image');
  
  if (aboutImage && isLargeScreen) {
    // Calculate 3D tilt based on mouse position within the element
    const tiltEffect = function(e) {
      const boundingRect = aboutImage.getBoundingClientRect();
      
      // Calculate mouse position relative to the image center
      const mouseX = e.clientX - boundingRect.left;
      const mouseY = e.clientY - boundingRect.top;
      const centerX = boundingRect.width / 2;
      const centerY = boundingRect.height / 2;
      
      // Convert to percentage (-1 to 1) for consistent effect regardless of size
      const percentX = (mouseX - centerX) / centerX;
      const percentY = (mouseY - centerY) / centerY;
      
      // Apply subtle 3D rotation based on mouse position
      const tiltAmount = 5; // Maximum tilt in degrees (keep small for subtle effect)
      const tiltX = percentY * tiltAmount;
      const tiltY = -percentX * tiltAmount;
      
      // Use transform for hardware-accelerated animation
      aboutImage.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
    };
    
    // Reset tilt when mouse leaves
    const resetTilt = function() {
      aboutImage.style.transform = '';
    };
    
    // Apply the tilt effect with throttling for performance
    let tiltThrottled = false;
    aboutImage.addEventListener('mousemove', function(e) {
      if (!tiltThrottled) {
        window.requestAnimationFrame(() => {
          tiltEffect(e);
          tiltThrottled = false;
        });
        tiltThrottled = true;
      }
    });
    
    aboutImage.addEventListener('mouseleave', resetTilt);
  }
  
  /**
   * SECTION 7: LOGO ANIMATION ON SCROLL
   * Subtle animation effect for the logo as user scrolls through the page
   */
  
  const logoImage = document.querySelector('.logo-image');
  
  if (logoImage) {
    // Use Intersection Observer for better performance than scroll events
    const logoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Get scroll position relative to the element
          const scrollPercent = entry.intersectionRatio;
          // Apply subtle rotation and scale based on scroll position
          const rotateAmount = Math.min(scrollPercent * 5, 5); // Max 5 degrees
          logoImage.style.transform = `scale(${1 + scrollPercent * 0.05}) rotate(${rotateAmount}deg)`;
        }
      });
    }, {
      threshold: Array.from({ length: 20 }, (_, i) => i / 20) // Multiple thresholds for smoother animation
    });
    
    // Start observing the logo
    logoObserver.observe(logoImage);
  }
  
  /**
   * SECTION 8: CTA BUTTON RIPPLE EFFECT
   * Material design-inspired ripple animation when clicking the call-to-action button
   */
  
  const ctaButton = document.querySelector('.cta-button');
  
  if (ctaButton) {
    // Ensure button has relative positioning for absolute child positioning
    if (window.getComputedStyle(ctaButton).position === 'static') {
      ctaButton.style.position = 'relative';
    }
    
    // Add overflow hidden to contain the ripple
    ctaButton.style.overflow = 'hidden';
    
    ctaButton.addEventListener('click', function(e) {
      // Get the position of the click relative to the button
      const rect = ctaButton.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Create a ripple element
      const ripple = document.createElement('span');
      
      // Style for the ripple
      Object.assign(ripple.style, {
        position: 'absolute',
        width: '1px',
        height: '1px',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: '50%',
        transform: 'scale(0)',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        left: x + 'px',
        top: y + 'px',
        pointerEvents: 'none' // Prevent ripple from interfering with button
      });
      
      // Add ripple to button
      ctaButton.appendChild(ripple);
      
      // Trigger animation
      requestAnimationFrame(() => {
        // Calculate size needed to cover the button
        const diameter = Math.max(ctaButton.clientWidth, ctaButton.clientHeight) * 2;
        
        // Apply the animation
        Object.assign(ripple.style, {
          width: `${diameter}px`,
          height: `${diameter}px`,
          marginLeft: `-${diameter/2}px`,
          marginTop: `-${diameter/2}px`,
          transform: 'scale(1)',
          opacity: '0',
          transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
        });
        
        // Remove ripple after animation completes
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
  }
});


