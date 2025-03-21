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

// Testimonials Carousel
const testimonialTrack = document.querySelector('.testimonial-track');
const testimonialItems = document.querySelectorAll('.testimonial-item');
const testimonialDots = document.querySelectorAll('.testimonial-dot');
const prevBtn = document.querySelector('.prev-testimonial');
const nextBtn = document.querySelector('.next-testimonial');

let currentIndex = 0;
const itemWidth = 100; // 100%

function moveToSlide(index) {
    if (index < 0) index = testimonialItems.length - 1;
    if (index >= testimonialItems.length) index = 0;
    
    currentIndex = index;
    testimonialTrack.style.transform = `translateX(-${currentIndex * itemWidth}%)`;
    
    // Update active dot
    testimonialDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
    });
}

// Next and Previous buttons
nextBtn.addEventListener('click', () => {
    moveToSlide(currentIndex + 1);
});

prevBtn.addEventListener('click', () => {
    moveToSlide(currentIndex - 1);
});

// Dot navigation
testimonialDots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        moveToSlide(i);
    });
});

// Auto-advance the carousel
setInterval(() => {
    moveToSlide(currentIndex + 1);
}, 5000);
