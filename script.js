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

// FIXED CAROUSEL - Testimonials Carousel with Infinite Scroll
document.addEventListener('DOMContentLoaded', () => {
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    const prevBtn = document.querySelector('.prev-testimonial');
    const nextBtn = document.querySelector('.next-testimonial');
    
    // If there are no items, exit early
    if (testimonialItems.length === 0) return;

    // Clone first and last slides for infinite loop effect
    const firstClone = testimonialItems[0].cloneNode(true);
    const lastClone = testimonialItems[testimonialItems.length - 1].cloneNode(true);
    
    // Explicitly add IDs to identify them as clones
    firstClone.setAttribute('data-clone', 'first');
    lastClone.setAttribute('data-clone', 'last');
    
    // Add clones to the track
    testimonialTrack.appendChild(firstClone);
    testimonialTrack.insertBefore(lastClone, testimonialItems[0]);
    
    // Adjust real items array to include clones
    const allSlides = testimonialTrack.querySelectorAll('.testimonial-item');
    
    // Set initial position to show the first real slide (not clone)
    let currentIndex = 1; // Start at index 1 (after the clone of the last slide)
    const itemWidth = 100; // 100%
    
    testimonialTrack.style.transform = `translateX(-${currentIndex * itemWidth}%)`;
    
    // Add transition after initial positioning (delayed to prevent initial animation)
    setTimeout(() => {
        testimonialTrack.style.transition = 'transform 0.5s ease';
    }, 10);
    
    // Update active dot based on visible slide
    function updateActiveDot() {
        // Adjust for clones: index 0 is last clone, allSlides.length-1 is first clone
        const realIndex = (currentIndex - 1 + testimonialItems.length) % testimonialItems.length;
        
        testimonialDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === realIndex);
        });
    }
    
    // Function to move to a specific slide
    function moveToSlide(index) {
        testimonialTrack.style.transform = `translateX(-${index * itemWidth}%)`;
        currentIndex = index;
        updateActiveDot();
    }
    
    // Check when transition ends to handle infinite loop
    testimonialTrack.addEventListener('transitionend', () => {
        // If we're at the last clone, jump to the real first slide
        if (currentIndex >= allSlides.length - 1) {
            testimonialTrack.style.transition = 'none';
            currentIndex = 1;
            testimonialTrack.style.transform = `translateX(-${currentIndex * itemWidth}%)`;
            
            // Re-enable transition after a short delay
            setTimeout(() => {
                testimonialTrack.style.transition = 'transform 0.5s ease';
            }, 10);
        }
        
        // If we're at the first clone, jump to the real last slide
        if (currentIndex <= 0) {
            testimonialTrack.style.transition = 'none';
            currentIndex = allSlides.length - 2; // Second to last (last real slide)
            testimonialTrack.style.transform = `translateX(-${currentIndex * itemWidth}%)`;
            
            // Re-enable transition after a short delay
            setTimeout(() => {
                testimonialTrack.style.transition = 'transform 0.5s ease';
            }, 10);
        }
        
        updateActiveDot();
    });
    
    // Next button
    nextBtn.addEventListener('click', () => {
        if (currentIndex >= allSlides.length - 1) return;
        moveToSlide(currentIndex + 1);
    });
    
    // Previous button
    prevBtn.addEventListener('click', () => {
        if (currentIndex <= 0) return;
        moveToSlide(currentIndex - 1);
    });
    
    // Dot navigation
    testimonialDots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            // Add 1 to account for the cloned slide at the beginning
            moveToSlide(i + 1);
        });
    });
    
    // Auto-advance the carousel
    let carouselInterval = setInterval(() => {
        if (currentIndex < allSlides.length - 1) {
            moveToSlide(currentIndex + 1);
        } else {
            moveToSlide(1); // Loop back to first real slide
        }
    }, 5000);
    
    // Pause auto-advance on hover or touch
    testimonialTrack.addEventListener('mouseenter', () => {
        clearInterval(carouselInterval);
    });
    
    testimonialTrack.addEventListener('touchstart', () => {
        clearInterval(carouselInterval);
    }, { passive: true });
    
    // Resume auto-advance when mouse/touch leaves
    testimonialTrack.addEventListener('mouseleave', () => {
        carouselInterval = setInterval(() => {
            if (currentIndex < allSlides.length - 1) {
                moveToSlide(currentIndex + 1);
            } else {
                moveToSlide(1);
            }
        }, 5000);
    });
    
    testimonialTrack.addEventListener('touchend', () => {
        carouselInterval = setInterval(() => {
            if (currentIndex < allSlides.length - 1) {
                moveToSlide(currentIndex + 1);
            } else {
                moveToSlide(1);
            }
        }, 5000);
    }, { passive: true });
    
    // Initialize active dot
    updateActiveDot();
    
    // Add swipe support for touch devices
    let touchStartX = 0;
    let touchEndX = 0;
    
    testimonialTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    testimonialTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50; // Minimum distance to register a swipe
        
        if (touchStartX - touchEndX > swipeThreshold) {
            // Swipe left - go to next slide
            if (currentIndex < allSlides.length - 1) {
                moveToSlide(currentIndex + 1);
            }
        }
        
        if (touchEndX - touchStartX > swipeThreshold) {
            // Swipe right - go to previous slide
            if (currentIndex > 0) {
                moveToSlide(currentIndex - 1);
            }
        }
    }
});

// Chat bubble functionality
const chatBubble = document.querySelector('.chat-bubble');
if (chatBubble) {
    chatBubble.addEventListener('click', () => {
        // You can add functionality to open a chat window or redirect to a contact page
        alert('Chat feature coming soon!');
        // Alternative: window.location.href = 'contact.html';
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuBtn.querySelector('i').classList.remove('fa-times');
                menuBtn.querySelector('i').classList.add('fa-bars');
            }
        }
    });
});
