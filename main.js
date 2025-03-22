/**
 * iFixTech - Main JavaScript file
 * This file contains all the interactive functionality for the iFixTech website
 */

// Wait for the document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initPageLoader();
    initStickyHeader();
    initScrollReveal();
    initServiceCardAnimation();
    initTestimonialsCarousel();
    initAccordion();
    initModalHandling();
    initNavigationArrows();
    initContactForm();
    initCursorTrail();
    initCircuitAnimation();
    initParallaxEffect();
    initMobileMenu();
    initNewsletterForm();
});

// Page loader initialization
function initPageLoader() {
    const loader = document.querySelector('.page-loader');
    const loaderProgress = document.querySelector('.loader-progress');
    
    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // Hide loader after a short delay
            setTimeout(() => {
                loader.classList.add('loader-hidden');
                
                // Remove from DOM after animation completes
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
            }, 500);
        }
        loaderProgress.style.width = progress + '%';
    }, 200);
}

// Sticky header functionality
function initStickyHeader() {
    const header = document.querySelector('header');
    
    // Change header style on scroll
    window.addEventListener('scroll', () => {
        // Add 'scrolled' class when page is scrolled beyond 50px
        header.classList.toggle('scrolled', window.scrollY > 50);
    });
}

// Scroll reveal animation
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    // Debounced scroll handler for better performance
    let scrollTimeout;
    const scrollHandler = () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const windowHeight = window.innerHeight;
            const revealPoint = 150;
            
            revealElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                
                if(elementTop < windowHeight - revealPoint) {
                    element.classList.add('active');
                }
            });
        }, 10);
    };
    
    // Initialize reveal on page load and scroll
    window.addEventListener('scroll', scrollHandler);
    window.addEventListener('load', scrollHandler);
    
    // Trigger initial check
    scrollHandler();
}

// Service and feature cards animation
function initServiceCardAnimation() {
    const serviceCards = document.querySelectorAll('.service-card');
    const featureCards = document.querySelectorAll('.feature-card');
    
    // Use Intersection Observer for better performance
    const observer = new IntersectionObserver(entries => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add delay based on index for staggered animation
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 150);
                
                // Unobserve after animation is applied
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Observe all cards
    serviceCards.forEach(card => {
        observer.observe(card);
    });
    
    featureCards.forEach(card => {
        observer.observe(card);
    });
    
    // Add 3D effect on hover for service cards
    serviceCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            // Calculate how far from center (in percentage)
            const percentX = (mouseX - cardCenterX) / (cardRect.width / 2);
            const percentY = (mouseY - cardCenterY) / (cardRect.height / 2);
            
            // Limit tilt amount
            const tiltX = percentY * 5; // Reversed for correct tilt direction
            const tiltY = percentX * -5;
            
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            setTimeout(() => {
                card.style.transition = '';
            }, 300);
        });
    });
}

// Testimonials carousel
function initTestimonialsCarousel() {
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    const prevBtn = document.querySelector('.prev-testimonial');
    const nextBtn = document.querySelector('.next-testimonial');
    
    if (!testimonialTrack) return;
    
    let currentIndex = 0;
    const itemWidth = 100; // 100%
    let autoplayInterval;
    
    // Move to specific slide
    function moveToSlide(index) {
        if (index < 0) index = testimonialItems.length - 1;
        if (index >= testimonialItems.length) index = 0;
        
        currentIndex = index;
        testimonialTrack.style.transform = `translateX(-${currentIndex * itemWidth}%)`;
        
        // Update active dot
        testimonialDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
        
        // Reset autoplay timer
        restartAutoplay();
    }
    
    // Auto-advance the carousel
    function startAutoplay() {
        autoplayInterval = setInterval(() => {
            moveToSlide(currentIndex + 1);
        }, 5000);
    }
    
    function restartAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }
    
    // Next and Previous buttons
    if (prevBtn && nextBtn) {
        nextBtn.addEventListener('click', () => {
            moveToSlide(currentIndex + 1);
        });
        
        prevBtn.addEventListener('click', () => {
            moveToSlide(currentIndex - 1);
        });
    }
    
    // Dot navigation
    testimonialDots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            moveToSlide(i);
        });
    });
    
    // Touch/swipe support for mobile
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
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left - next slide
            moveToSlide(currentIndex + 1);
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - previous slide
            moveToSlide(currentIndex - 1);
        }
    }
    
    // Start autoplay
    startAutoplay();
}

// Accordion functionality
function initAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach((header, index) => {
        header.addEventListener('click', () => {
            // Toggle active class for clicked item
            accordionItems[index].classList.toggle('active');
            
            // Close other accordion items
            accordionItems.forEach((item, i) => {
                if (i !== index) {
                    item.classList.remove('active');
                }
            });
        });
    });
}

// Modal handling
function initModalHandling() {
    const faqLink = document.getElementById('faqLink');
    const tosLink = document.getElementById('tosLink');
    const privacyLink = document.getElementById('privacyLink');
    const faqModal = document.getElementById('faqModal');
    const tosModal = document.getElementById('tosModal');
    const privacyModal = document.getElementById('privacyModal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    
    // Open modals
    if (faqLink && faqModal) {
        faqLink.addEventListener('click', (e) => {
            e.preventDefault();
            faqModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (tosLink && tosModal) {
        tosLink.addEventListener('click', (e) => {
            e.preventDefault();
            tosModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (privacyLink && privacyModal) {
        privacyLink.addEventListener('click', (e) => {
            e.preventDefault();
            privacyModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close modals
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            closeModal(modal);
        });
    });
    
    // Close modal when clicking outside content
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });
    
    // Close modal with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                closeModal(activeModal);
            }
        }
    });
    
    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Navigation arrows functionality
function initNavigationArrows() {
    const navUp = document.querySelector('.nav-up');
    const navDown = document.querySelector('.nav-down');
    
    // Update arrow visibility on scroll
    function updateNavArrows() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Show/hide up arrow - only visible when scrolled down
        if (scrollPosition > windowHeight * 0.25) {
            navUp.classList.add('visible');
        } else {
            navUp.classList.remove('visible');
        }
        
        // Show/hide down arrow - only visible when not at bottom
        if (scrollPosition < documentHeight - windowHeight - 100) {
            navDown.classList.add('visible');
        } else {
            navDown.classList.remove('visible');
        }
    }
    
    // Smooth scroll to top
    navUp.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Smooth scroll to bottom
    navDown.addEventListener('click', function() {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    });
    
    // Initial check and event listener with throttling
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                updateNavArrows();
                scrollTimeout = null;
            }, 100);
        }
    });
    
    // Initial check
    updateNavArrows();
}

// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const resetFormBtn = document.getElementById('resetForm');
    const formControls = document.querySelectorAll('.form-control');
    
    // Form field animations
    formControls.forEach(control => {
        // Check for initial content (in case of pre-filled fields)
        if (control.value.trim() !== '') {
            control.classList.add('has-content');
        }
        
        // Focus event
        control.addEventListener('focus', () => {
            control.parentElement.classList.add('focused');
        });
        
        // Blur event (when user clicks away)
        control.addEventListener('blur', () => {
            if (control.value.trim() === '') {
                control.parentElement.classList.remove('focused');
                control.classList.remove('has-content');
            } else {
                control.classList.add('has-content');
            }
        });
        
        // Input event (when user types or changes content)
        control.addEventListener('input', () => {
            if (control.value.trim() !== '') {
                control.classList.add('has-content');
            } else {
                control.classList.remove('has-content');
            }
        });
    });
    
    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            
            // Disable form and show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            try {
                // Get form data
                const formData = new FormData(contactForm);
                
                // Submit form data to Formspree
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Show success message
                    formSuccess.style.display = 'flex';
                    setTimeout(() => {
                        formSuccess.classList.add('active');
                    }, 10);
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset form field styles
                    formControls.forEach(control => {
                        control.classList.remove('has-content');
                        control.parentElement.classList.remove('focused');
                    });
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Something went wrong. Please try again later.');
            } finally {
                // Re-enable form
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
    
    // Reset form button
    if (resetFormBtn) {
        resetFormBtn.addEventListener('click', function() {
            formSuccess.classList.remove('active');
            setTimeout(() => {
                formSuccess.style.display = 'none';
            }, 500);
        });
    }
}

// Cursor trail effect
function initCursorTrail() {
    const cursorTrail = document.getElementById('cursor-trail');
    const trails = [];
    const trailCount = 10; // Number of trail dots
    
    // Create trail elements
    for (let i = 0; i < trailCount; i++) {
        const trail = document.createElement('div');
        trail.classList.add('trail');
        cursorTrail.appendChild(trail);
        trails.push({
            element: trail,
            x: 0,
            y: 0,
            alpha: 0
        });
    }
    
    // Update trail positions on mouse move
    document.addEventListener('mousemove', (e) => {
        // Shift positions
        for (let i = trails.length - 1; i > 0; i--) {
            trails[i].x = trails[i-1].x;
            trails[i].y = trails[i-1].y;
            trails[i].alpha = (trailCount - i) / trailCount * 0.6; // Fade out as we go back in the trail
        }
        
        // Set current position to mouse
        trails[0].x = e.clientX;
        trails[0].y = e.clientY;
        trails[0].alpha = 0.6;
        
        // Update DOM elements
        trails.forEach((trail, i) => {
            trail.element.style.transform = `translate(${trail.x}px, ${trail.y}px)`;
            trail.element.style.opacity = trail.alpha;
            trail.element.style.width = (6 - (i * 0.4)) + 'px';
            trail.element.style.height = (6 - (i * 0.4)) + 'px';
        });
    });
}

// Circuit animation
function initCircuitAnimation() {
    const circuitAnimation = document.getElementById('circuit-animation');
    if (!circuitAnimation) return;
    
    const width = circuitAnimation.offsetWidth;
    const height = circuitAnimation.offsetHeight;
    
    // Create horizontal and vertical lines
    for (let i = 0; i < 15; i++) {
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
}

// Parallax effect
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.parallax-layer');
    
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        parallaxElements.forEach((layer, index) => {
            const depth = (index + 1) * 10;
            const moveX = (mouseX * depth) - (depth / 2);
            const moveY = (mouseY * depth) - (depth / 2);
            
            layer.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (!menuBtn || !navLinks) return;
    
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Toggle icon between bars and X
        const icon = menuBtn.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    });
    
    // Close menu when clicking on a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            
            // Reset icon
            const icon = menuBtn.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    });
}

// Newsletter form handling
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (email !== '') {
            // Here you would normally send this to your newsletter service
            // For demo purposes, we'll just show an alert
            alert('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        }
    });
}
