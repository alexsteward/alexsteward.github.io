/**
 * iFixTech Website JavaScript
 * Organized into functional sections for better readability and maintenance
 */

// ==============================================
// INITIALIZATION - Run when DOM is fully loaded
// ==============================================
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all features when DOM is loaded
  initPreloader();
  initCustomCursor();
  initMobileNavigation();
  initSmoothScrolling();
  initScrollHeader();
  initParticles();
  initTiltEffect();
  initFormAnimations();
  
  // Force service cards to be visible by default (prevents animation issues)
  document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '1';
    card.style.transform = 'none';
  });
});

// ==============================================
// PRELOADER - Handles the loading animation
// ==============================================
function initPreloader() {
  window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    preloader.classList.add('fade-out');
    setTimeout(() => {
      preloader.style.display = 'none';
      // Initialize animations after preloader is gone
      initAnimations();
    }, 1000);
  });
}

// ==============================================
// CUSTOM CURSOR - Creates the custom cursor effect
// ==============================================
function initCustomCursor() {
  const cursor = document.querySelector('.cursor-follower');
  const cursorDot = document.querySelector('.cursor-dot');
  
  // Move cursor with mouse
  document.addEventListener('mousemove', e => {
    gsap.to(cursor, { 
      x: e.clientX, 
      y: e.clientY,
      duration: 0.3
    });
    gsap.to(cursorDot, { 
      x: e.clientX, 
      y: e.clientY,
      duration: 0.1
    });
  });

  // Cursor click effect
  document.addEventListener('mousedown', () => {
    cursor.classList.add('active');
    cursorDot.classList.add('active');
  });

  document.addEventListener('mouseup', () => {
    cursor.classList.remove('active');
    cursorDot.classList.remove('active');
  });

  // Add hover effect to links and buttons
  const links = document.querySelectorAll('a, button');
  links.forEach(link => {
    link.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
      cursorDot.classList.add('hover');
    });
    link.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
      cursorDot.classList.remove('hover');
    });
  });
}

// ==============================================
// MOBILE NAVIGATION - Handles the mobile menu toggle
// ==============================================
function initMobileNavigation() {
  const navToggle = document.getElementById('navToggle');
  if (!navToggle) return;
  
  navToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('.nav-links').classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });
}

// ==============================================
// SMOOTH SCROLLING - Handles smooth scroll for anchor links
// ==============================================
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
      
      // Close mobile menu if open
      document.querySelector('.nav-links')?.classList.remove('active');
      document.getElementById('navToggle')?.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  });
}

// ==============================================
// HEADER SCROLL EFFECT - Changes header on scroll
// ==============================================
function initScrollHeader() {
  window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 50);
    }
  });
}

// ==============================================
// PARTICLES ANIMATION - Creates the hero section particles
// ==============================================
function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const particles = [];
  const particleCount = 100;
  
  // Create particles
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
  
  // Animation function
  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for(let i = 0; i < particleCount; i++) {
      const p = particles[i];
      
      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
      
      // Move particle
      p.x += p.speedX;
      p.y += p.speedY;
      
      // Bounce off edges
      if(p.x < 0 || p.x > canvas.width) p.speedX *= -1;
      if(p.y < 0 || p.y > canvas.height) p.speedY *= -1;
      
      // Connect nearby particles with lines
      for(let j = i + 1; j < particleCount; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if(distance < 100) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 - distance/500})`;
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
  
  // Handle window resize
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// ==============================================
// 3D TILT EFFECT - Initializes the tilt.js effect
// ==============================================
function initTiltEffect() {
  if (typeof VanillaTilt === 'undefined') return;
  
  VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
    max: 10,
    speed: 400,
    glare: true,
    "max-glare": 0.3,
  });
}

// ==============================================
// ANIMATIONS - All GSAP animations grouped together
// ==============================================
function initAnimations() {
  // Initialize AOS library if available
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });
  }

  initGSAPAnimations();
  initCounters();
  initGlobe();
  initCircuitAnimation();
}

// GSAP Animations
function initGSAPAnimations() {
  if (typeof gsap === 'undefined') return;

  // Hero section animations
  gsap.from(".hero-content h1", { 
    duration: 1.2, 
    y: 100, 
    opacity: 0, 
    ease: "power4.out" 
  });
  
  gsap.from(".hero-content p", { 
    duration: 1.2, 
    y: 50, 
    opacity: 0, 
    delay: 0.3, 
    ease: "power4.out" 
  });
  
  gsap.from(".hero-content .cta-button", { 
    duration: 1.2, 
    y: 50, 
    opacity: 0, 
    delay: 0.6, 
    ease: "power4.out" 
  });
  
  gsap.from(".scroll-indicator", { 
    duration: 1, 
    y: -30, 
    opacity: 0, 
    delay: 1.2, 
    ease: "power2.out" 
  });

  // Set up ScrollTrigger if available
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Reveal text animation
    const revealTextElements = document.querySelectorAll('.reveal-text');
    revealTextElements.forEach(element => {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        duration: 1,
        y: 50,
        opacity: 0,
        ease: "power3.out"
      });
    });

    // Service cards animation
    gsap.set(".service-card", { opacity: 1, y: 0 });
    
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          once: true
        },
        opacity: 0,
        y: 20,
        duration: 0.7,
        delay: index * 0.15,
        ease: "power2.out"
      });
    });

    // Floating tech elements animation
    const techElements = document.querySelectorAll('.tech-element');
    techElements.forEach((element, index) => {
      gsap.to(element, {
        y: `${(index % 2 === 0 ? '-' : '')}20`,
        x: `${(index % 3 === 0 ? '-' : '')}10`,
        rotation: index % 2 === 0 ? 5 : -5,
        duration: 3 + index,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    // Contact form animation
    gsap.from(".contact-form", {
      scrollTrigger: {
        trigger: ".contact-wrapper",
        start: "top 70%",
        once: true
      },
      x: 100,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });

    gsap.from(".contact-info", {
      scrollTrigger: {
        trigger: ".contact-wrapper",
        start: "top 70%",
        once: true
      },
      x: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });
  }
}

// Counter animations
function initCounters() {
  if (typeof CountUp === 'undefined' || typeof Waypoint === 'undefined') return;

  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const updateCount = () => {
      const target = parseInt(counter.getAttribute('data-target') || counter.innerText);
      const countUp = new CountUp(counter, target, {
        startVal: 0,
        duration: 2
      });
      
      if (!countUp.error) {
        countUp.start();
      } else {
        console.error(countUp.error);
      }
    };

    const waypoint = new Waypoint({
      element: counter,
      handler: function() {
        updateCount();
        this.destroy();
      },
      offset: '90%'
    });
  });
}

// 3D Globe for contact section
function initGlobe() {
  const container = document.getElementById('globe-container');
  if (!container || typeof THREE === 'undefined') return;
  
  // Clear any existing content
  container.innerHTML = '';
  
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  
  // Create renderer with appropriate size based on container
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);
  
  // Create globe geometry
  const geometry = new THREE.SphereGeometry(3, 48, 48);
  
  // Create material
  const material = new THREE.MeshBasicMaterial({
    color: 0x4169E1,
    wireframe: true,
    transparent: true,
    opacity: 0.3
  });
  
  const globe = new THREE.Mesh(geometry, material);
  scene.add(globe);
  
  // Add particles around globe
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 500;
  
  const posArray = new Float32Array(particlesCount * 3);
  
  for(let i = 0; i < particlesCount; i++) {
    // Random positions in a sphere around the globe
    const radius = 3 + Math.random() * 1.5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    
    posArray[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    posArray[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    posArray[i * 3 + 2] = radius * Math.cos(phi);
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.04,
    color: 0x00FFFF
  });
  
  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);
  
  camera.position.z = 8;
  
  // Animation loop with proper cleanup
  let animationId;
  
  function animate() {
    animationId = requestAnimationFrame(animate);
    
    globe.rotation.y += 0.001;
    particlesMesh.rotation.y += 0.0005;
    
    renderer.render(scene, camera);
  }
  
  animate();
    
  // Handle resize - use container dimensions
  function handleResize() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }
  
  window.addEventListener('resize', handleResize);

  // Add cleanup function to prevent memory leaks
  return function cleanup() {
    window.removeEventListener('resize', handleResize);
    cancelAnimationFrame(animationId);
    renderer.dispose();
    geometry.dispose();
    material.dispose();
    particlesGeometry.dispose();
    particlesMaterial.dispose();
    
    if (container.contains(renderer.domElement)) {
      container.removeChild(renderer.domElement);
    }
  };
}

// Circuit background animation
function initCircuitAnimation() {
  const circuitLines = document.querySelector('.circuit-lines');
  if (!circuitLines) return;
  
  const lineCount = 15;
  
  for(let i = 0; i < lineCount; i++) {
    const line = document.createElement('div');
    line.classList.add('circuit-line');
    line.style.top = `${Math.random() * 100}%`;
    line.style.left = `${Math.random() * 100}%`;
    line.style.width = `${Math.random() * 150 + 50}px`;
    line.style.height = `${Math.random() * 2 + 1}px`;
    line.style.transform = `rotate(${Math.random() * 360}deg)`;
    line.style.animationDelay = `${Math.random() * 5}s`;
    
    // Add nodes to some lines
    if(Math.random() > 0.5) {
      const node = document.createElement('div');
      node.classList.add('circuit-node');
      line.appendChild(node);
    }
    
    circuitLines.appendChild(line);
  }
}

// ==============================================
// FORM ANIMATIONS - Handles form field animations
// ==============================================
function initFormAnimations() {
  const inputs = document.querySelectorAll('.form-control');
  
  inputs.forEach(input => {
    // Focus effect
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });
    
    // Blur effect - keep focused if value exists
    input.addEventListener('blur', () => {
      if(input.value === '') {
        input.parentElement.classList.remove('focused');
      }
    });
    
    // Check for pre-filled inputs on page load
    if(input.value !== '') {
      input.parentElement.classList.add('focused');
    }
  });
}
