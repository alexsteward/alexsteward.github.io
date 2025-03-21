// Mobile Menu Toggle
const menuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuBtn.querySelector('i').classList.toggle('fa-bars');
    menuBtn.querySelector('i').classList.toggle('fa-times');
});

// Sticky Header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// Scroll Animation for Service Cards
const serviceCards = document.querySelectorAll('.service-card');
const featureCards = document.querySelectorAll('.feature-card');

const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('animate');
            }, index * 150);
        }
    });
}, { threshold: 0.1 });

serviceCards.forEach(card => {
    observer.observe(card);
});

featureCards.forEach(card => {
    observer.observe(card);
});

// Circuit Animation
const createCircuitAnimation = () => {
    const circuitAnimation = document.getElementById('circuit-animation');
    const width = circuitAnimation.offsetWidth;
    const height = circuitAnimation.offsetHeight;
    
    // Create horizontal and vertical lines
    for (let i = 0; i < 10; i++) {
        // Horizontal lines
        const hLine = document.createElement('div');
        hLine.classList.add('circuit-line');
        hLine.style.width = Math.random() * 250 + 50 + 'px';
        hLine.style.height = '1px';
        hLine.style.top = Math.random() * height + 'px';
        hLine.style.left = Math.random() * width + 'px';
        circuitAnimation.appendChild(hLine);
        
        // Vertical lines
        const vLine = document.createElement('div');
        vLine.classList.add('circuit-line');
        vLine.style.width = '1px';
        vLine.style.height = Math.random() * 250 + 50 + 'px';
        vLine.style.top = Math.random() * height + 'px';
        vLine.style.left = Math.random() * width + 'px';
        circuitAnimation.appendChild(vLine);
        
        // Add circuit dots
        const dot = document.createElement('div');
        dot.classList.add('circuit-dot');
        dot.style.top = Math.random() * height + 'px';
        dot.style.left = Math.random() * width + 'px';
        
        // Random animation delay
        dot.style.animationDelay = Math.random() * 5 + 's';
        dot.style.opacity = 1;
        
        circuitAnimation.appendChild(dot);
    }
};

// Initialize circuit animation
window.addEventListener('load', createCircuitAnimation);

// Form animation
const formControls = document.querySelectorAll('.form-control');

formControls.forEach(control => {
    control.addEventListener('focus', () => {
        control.parentElement.classList.add('focused');
    });
    
    control.addEventListener('blur', () => {
        if (control.value === '') {
            control.parentElement.classList.remove('focused');
        }
    });
});

// Testimonials Carousel with Infinite Scroll
const testimonialTrack = document.querySelector('.testimonial-track');
const testimonialItems = document.querySelectorAll('.testimonial-item');
const testimonialDots = document.querySelectorAll('.testimonial-dot');
const prevBtn = document.querySelector('.prev-testimonial');
const nextBtn = document.querySelector('.next-testimonial');

// Clone first and last slides for infinite loop effect
const firstClone = testimonialItems[0].cloneNode(true);
const lastClone = testimonialItems[testimonialItems.length - 1].cloneNode(true);

// Add clones to the track
testimonialTrack.appendChild(firstClone);
testimonialTrack.insertBefore(lastClone, testimonialItems[0]);

// Set initial position to show the first real slide (not clone)
let currentIndex = 1; // Start at index 1 (after the clone of the last slide)
const itemWidth = 100; // 100%
testimonialTrack.style.transform = `translateX(-${currentIndex * itemWidth}%)`;

// Add transition after initial positioning
setTimeout(() => {
  testimonialTrack.style.transition = 'transform 0.5s ease';
}, 0);

// Function to update slide position
function moveToSlide(index) {
  testimonialTrack.style.transform = `translateX(-${index * itemWidth}%)`;
  currentIndex = index;
  
  // Update active dot - adjust index for dot display
  updateActiveDot(index - 1);
}

// Update active dot based on current visible slide
function updateActiveDot(index) {
  // Handle edge cases for the cloned slides
  if (index < 0) index = testimonialItems.length - 1;
  if (index >= testimonialItems.length) index = 0;
  
  testimonialDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

// Check when transition ends to handle loop
testimonialTrack.addEventListener('transitionend', () => {
  // If we're at the first clone, jump to the real last slide
  if (currentIndex === 0) {
    testimonialTrack.style.transition = 'none';
    currentIndex = testimonialItems.length;
    testimonialTrack.style.transform = `translateX(-${currentIndex * itemWidth}%)`;
    setTimeout(() => {
      testimonialTrack.style.transition = 'transform 0.5s ease';
    }, 10);
  }
  
  // If we're at the last clone, jump to the real first slide
  if (currentIndex === testimonialItems.length + 1) {
    testimonialTrack.style.transition = 'none';
    currentIndex = 1;
    testimonialTrack.style.transform = `translateX(-${currentIndex * itemWidth}%)`;
    setTimeout(() => {
      testimonialTrack.style.transition = 'transform 0.5s ease';
    }, 10);
  }
});

// Next and Previous buttons
nextBtn.addEventListener('click', () => {
  if (currentIndex >= testimonialItems.length + 1) return;
  moveToSlide(currentIndex + 1);
});

prevBtn.addEventListener('click', () => {
  if (currentIndex <= 0) return;
  moveToSlide(currentIndex - 1);
});

// Dot navigation
testimonialDots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    // Add 1 to account for the cloned first slide
    moveToSlide(i + 1);
  });
});

// Auto-advance the carousel
let carouselInterval = setInterval(() => {
  moveToSlide(currentIndex + 1);
}, 5000);

// Pause auto-advance on hover
testimonialTrack.addEventListener('mouseenter', () => {
  clearInterval(carouselInterval);
});

// Resume auto-advance on mouse leave
testimonialTrack.addEventListener('mouseleave', () => {
  carouselInterval = setInterval(() => {
    moveToSlide(currentIndex + 1);
  }, 5000);
});
