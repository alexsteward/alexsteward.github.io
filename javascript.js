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
// TECH FORM ANIMATIONS - Cutting-edge form animations for tech companies
// ==============================================
function initFormAnimations() {
  const inputs = document.querySelectorAll('.form-control');
  
  // Add neon glow container to form
  const form = document.querySelector('.contact-form');
  if (form) {
    const glowContainer = document.createElement('div');
    glowContainer.classList.add('form-glow-container');
    form.appendChild(glowContainer);
  }
  
  // Set up observer for intersection animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('form-field-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  // Observe each form field for entry animations
  inputs.forEach((input, index) => {
    const parent = input.parentElement;
    parent.style.setProperty('--field-index', index);
    observer.observe(parent);
    
    // High-tech focus effect
    input.addEventListener('focus', () => {
      parent.classList.add('focused');
      
      if (typeof gsap !== 'undefined') {
        // Create digital particles effect
        for (let i = 0; i < 10; i++) {
          const particle = document.createElement('span');
          particle.classList.add('digital-particle');
          particle.style.setProperty('--x', Math.random() * 100 + '%');
          parent.appendChild(particle);
          
          gsap.fromTo(particle, 
            { 
              scale: 0, 
              opacity: 0.8,
              y: 0
            },
            { 
              scale: 1.5, 
              opacity: 0, 
              y: -50 - (Math.random() * 50),
              x: (Math.random() - 0.5) * 100,
              duration: 0.8 + (Math.random() * 1),
              onComplete: () => particle.remove()
            }
          );
        }
        
        // Holographic label effect
        const label = parent.querySelector('label');
        if (label) {
          gsap.to(label, { 
            y: -25, 
            scale: 0.9, 
            color: '#00FFFF', 
            textShadow: '0 0 10px rgba(0, 255, 255, 0.7), 0 0 20px rgba(0, 255, 255, 0.5)',
            duration: 0.3,
            ease: "power3.out"
          });
        }
        
        // Glow effect on the form field
        gsap.to(parent, {
          boxShadow: '0 0 15px rgba(0, 255, 255, 0.6), 0 0 30px rgba(0, 255, 255, 0.3)',
          duration: 0.5
        });
        
        // Update the glow container
        const glowContainer = document.querySelector('.form-glow-container');
        if (glowContainer) {
          gsap.to(glowContainer, {
            background: `radial-gradient(circle at ${parent.offsetLeft + parent.offsetWidth/2}px ${parent.offsetTop + parent.offsetHeight/2}px, rgba(0, 255, 255, 0.15), transparent 50%)`,
            duration: 0.5
          });
        }
      }
    });
    
    // Blur effect with tech-inspired transitions
    input.addEventListener('blur', () => {
      const parent = input.parentElement;
      const label = parent.querySelector('label');
      
      if (input.value === '') {
        parent.classList.remove('focused');
        
        if (typeof gsap !== 'undefined' && label) {
          gsap.to(label, { 
            y: 0, 
            scale: 1, 
            color: 'rgba(255, 255, 255, 0.6)', 
            textShadow: 'none',
            duration: 0.3,
            ease: "power2.out"
          });
          
          gsap.to(parent, {
            boxShadow: 'none',
            duration: 0.5
          });
        }
      } else {
        // Digital scanning effect for validation
        parent.classList.add('success');
        
        if (typeof gsap !== 'undefined') {
          // Scan line effect
          const scanLine = document.createElement('div');
          scanLine.classList.add('scan-line');
          parent.appendChild(scanLine);
          
          gsap.fromTo(scanLine, 
            { left: '0%', opacity: 0.7 },
            { 
              left: '100%', 
              opacity: 0,
              duration: 0.8,
              ease: "power1.inOut",
              onComplete: () => scanLine.remove()
            }
          );
          
          // Success indicator
          gsap.to(parent, {
            boxShadow: '0 0 10px rgba(0, 255, 170, 0.6), 0 0 20px rgba(0, 255, 170, 0.3)',
            duration: 0.3
          });
          
          // Pulse the line underneath
          const line = parent.querySelector('.line');
          if (line) {
            gsap.fromTo(line, 
              { scaleX: 0.5, backgroundColor: '#00FFAA' },
              { 
                scaleX: 1, 
                backgroundColor: '#00FFAA',
                duration: 0.5,
                ease: "elastic.out(1, 0.5)"
              }
            );
          }
        }
      }
    });
    
    // Typing effect with dynamic response
    input.addEventListener('input', () => {
      if (typeof gsap !== 'undefined') {
        // Create typing particles
        const particle = document.createElement('span');
        particle.classList.add('typing-particle');
        particle.style.setProperty('--x', Math.random() * 100 + '%');
        parent.appendChild(particle);
        
        gsap.fromTo(particle, 
          { scale: 0, opacity: 0.8 },
          { 
            scale: 1, 
            opacity: 0, 
            y: -20,
            duration: 0.4,
            onComplete: () => particle.remove()
          }
        );
        
        // Dynamic line coloring
        const line = parent.querySelector('.line');
        if (line) {
          gsap.to(line, {
            backgroundColor: `hsl(${180 + Math.random() * 60}, 100%, 60%)`,
            duration: 0.2
          });
        }
      }
    });
    
    // Preloaded inputs
    if (input.value !== '') {
      const parent = input.parentElement;
      parent.classList.add('focused');
      parent.classList.add('success');
    }
  });
  
  // Futuristic submit button animations
  const submitBtn = document.querySelector('.contact-form button[type="submit"]');
  if (submitBtn && typeof gsap !== 'undefined') {
    // Create energy field around button
    const energyField = document.createElement('div');
    energyField.classList.add('button-energy-field');
    submitBtn.appendChild(energyField);
    
    submitBtn.addEventListener('mouseenter', () => {
      gsap.to(submitBtn, {
        scale: 1.05,
        duration: 0.4,
        ease: "power2.out"
      });
      
      gsap.to(energyField, {
        opacity: 1,
        scale: 1.2,
        duration: 0.6
      });
      
      // Create pulse wave effect
      const pulseWave = document.createElement('div');
      pulseWave.classList.add('button-pulse-wave');
      submitBtn.appendChild(pulseWave);
      
      gsap.fromTo(pulseWave, 
        { scale: 0.8, opacity: 0.6 },
        { 
          scale: 1.5, 
          opacity: 0, 
          duration: 1,
          ease: "power2.out",
          onComplete: () => pulseWave.remove()
        }
      );
    });
    
    submitBtn.addEventListener('mouseleave', () => {
      gsap.to(submitBtn, {
        scale: 1,
        duration: 0.4,
        ease: "power2.in"
      });
      
      gsap.to(energyField, {
        opacity: 0.4,
        scale: 1,
        duration: 0.6
      });
    });
    
    submitBtn.addEventListener('mousedown', () => {
      gsap.to(submitBtn, {
        scale: 0.95,
        duration: 0.1
      });
      
      // Create impact particles
      for (let i = 0; i < 12; i++) {
        const particle = document.createElement('span');
        particle.classList.add('impact-particle');
        particle.style.setProperty('--angle', (i * 30) + 'deg');
        submitBtn.appendChild(particle);
        
        gsap.fromTo(particle, 
          { scale: 0, opacity: 0.9 },
          { 
            scale: 1, 
            opacity: 0, 
            duration: 0.6 + (Math.random() * 0.4),
            onComplete: () => particle.remove()
          }
        );
      }
    });
    
    submitBtn.addEventListener('mouseup', () => {
      gsap.to(submitBtn, {
        scale: 1.05,
        duration: 0.2
      });
    });
  }
}




// ==============================================
// FORM ANIMATIONS - Handles form field animations
// ==============================================
//function initFormAnimations() {
 // const inputs = document.querySelectorAll('.form-control');
  
  //inputs.forEach(input => {
    // Focus effect
    //input.addEventListener('focus', () => {
      //input.parentElement.classList.add('focused');
   // });
    
    // Blur effect - keep focused if value exists
    //input.addEventListener('blur', () => {
      //if(input.value === '') {
        //input.parentElement.classList.remove('focused');
     // }
   // });
    
    // Check for pre-filled inputs on page load
   // if(input.value !== '') {
     // input.parentElement.classList.add('focused');
//    }
 // });
//}
