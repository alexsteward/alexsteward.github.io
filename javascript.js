/**
 * TechSolutions Website JavaScript
 * This file handles all interactive functionality for the website
 * Last Updated: March 18, 2025
 */

// Wait for the DOM to be fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initSmoothScrolling();
    initAnimations();
    initFormValidation();
    initTestimonialSlider();
});

/**
 * Mobile Menu Functionality
 * Handles the mobile navigation menu toggle
 */
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navbarLinks = document.querySelector('.navbar-links');
    
    if (!mobileMenuBtn || !navbarLinks) return;
    
    mobileMenuBtn.addEventListener('click', function() {
        navbarLinks.classList.toggle('active');
        
        // Change icon based on menu state
        const icon = this.querySelector('i');
        if (icon) {
            if (navbarLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar') && navbarLinks.classList.contains('active')) {
            navbarLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = navbarLinks.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 768) {
                navbarLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });
}

/**
 * Smooth Scrolling for Anchor Links
 * Creates smooth scrolling effect for navigation links
 */
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Skip if it's just an empty "#" link
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (!targetElement) return;
            
            // Calculate header height for offset
            const headerHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = targetPosition - headerHeight;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });
}

/**
 * Scroll-based Animations
 * Triggers animations when elements come into view
 */
function initAnimations() {
    const animatedElements = document.querySelectorAll('.feature-card, .service-item, .about-image, .about-text');
    
    // Helper function to check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Initial check for elements already in viewport
    function checkAnimations() {
        animatedElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('fade-in');
            }
        });
    }
    
    // Check on scroll
    window.addEventListener('scroll', checkAnimations);
    
    // Check on initial load
    checkAnimations();
}

/**
 * Form Validation and Submission
 * Handles contact form validation and AJAX submission
 */
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple form validation
        let isValid = true;
        const formInputs = this.querySelectorAll('input, textarea');
        
        formInputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                isValid = false;
                input.classList.add('error');
                
                // Add error message if it doesn't exist
                let errorMsg = input.parentElement.querySelector('.error-message');
                if (!errorMsg) {
                    errorMsg = document.createElement('div');
                    errorMsg.className = 'error-message';
                    errorMsg.textContent = 'This field is required';
                    errorMsg.style.color = '#dc3545';
                    errorMsg.style.fontSize = '0.85rem';
                    errorMsg.style.marginTop = '0.25rem';
                    input.parentElement.appendChild(errorMsg);
                }
            } else if (input.type === 'email' && input.value.trim()) {
                // Simple email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value.trim())) {
                    isValid = false;
                    input.classList.add('error');
                    
                    // Add error message for invalid email
                    let errorMsg = input.parentElement.querySelector('.error-message');
                    if (!errorMsg) {
                        errorMsg = document.createElement('div');
                        errorMsg.className = 'error-message';
                        errorMsg.textContent = 'Please enter a valid email address';
                        errorMsg.style.color = '#dc3545';
                        errorMsg.style.fontSize = '0.85rem';
                        errorMsg.style.marginTop = '0.25rem';
                        input.parentElement.appendChild(errorMsg);
                    } else {
                        errorMsg.textContent = 'Please enter a valid email address';
                    }
                }
            } else {
                // Remove error styling if valid
                input.classList.remove('error');
                const errorMsg = input.parentElement.querySelector('.error-message');
                if (errorMsg) {
                    errorMsg.remove();
                }
            }
        });
        
        // Remove error styling on input
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('error');
                const errorMsg = this.parentElement.querySelector('.error-message');
                if (errorMsg) {
                    errorMsg.remove();
                }
            });
        });
        
        if (isValid) {
            // Form is valid, show success message
            const formData = new FormData(contactForm);
            
            // Hide form and show loading spinner
            contactForm.style.opacity = '0.5';
            const loadingSpinner = document.createElement('div');
            loadingSpinner.className = 'loading-spinner';
            loadingSpinner.innerHTML = '<i class="fas fa-spinner fa-spin fa-2x"></i>';
            loadingSpinner.style.textAlign = 'center';
            loadingSpinner.style.marginTop = '2rem';
            contactForm.parentElement.appendChild(loadingSpinner);
            
            // Simulate form submission (replace with actual AJAX call)
            setTimeout(() => {
                contactForm.style.opacity = '1';
                loadingSpinner.remove();
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success';
                successMessage.textContent = 'Your message has been sent successfully! We will get back to you soon.';
                contactForm.parentElement.insertBefore(successMessage, contactForm);
                
                // Reset form
                contactForm.reset();
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }, 1500);
        }
    });
}

/**
 * Testimonial Slider
 * Creates a simple testimonial carousel
 */
function initTestimonialSlider() {
    const testimonialSlider = document.querySelector('.testimonial-slider');
    
    if (!testimonialSlider) return;
    
    // Sample testimonials data
    // In a real implementation, this would come from an API or data file
    const testimonials = [
        {
            text: "TechSolutions transformed our outdated website into a modern, responsive platform that has significantly increased our user engagement and conversion rates. Their team was professional, communicative, and delivered on time.",
            author: "Sarah Johnson",
            position: "Marketing Director, InnovateCorp"
        },
        {
            text: "Working with TechSolutions on our mobile app was a fantastic experience. They understood our requirements perfectly and delivered a product that exceeded our expectations. The app has been downloaded thousands of times with excellent reviews.",
            author: "Michael Chen",
            position: "CEO, AppStartup Inc."
        },
        {
            text: "The team at TechSolutions provided invaluable guidance and expertise for our cloud migration project. Their attention to detail and technical knowledge ensured a smooth transition with zero downtime. Highly recommended!",
            author: "Jessica Williams",
            position: "CTO, CloudBase Technologies"
        }
    ];
    
    let currentTestimonialIndex = 0;
    
    // Create navigation dots
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'testimonial-dots';
    dotsContainer.style.display = 'flex';
    dotsContainer.style.justifyContent = 'center';
    dotsContainer.style.gap = '8px';
    dotsContainer.style.marginTop = '1.5rem';
    
    testimonials.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'testimonial-dot';
        dot.setAttribute('aria-label', `View testimonial ${index + 1}`);
        dot.style.width = '12px';
        dot.style.height = '12px';
        dot.style.borderRadius = '50%';
        dot.style.border = 'none';
        dot.style.background = index === 0 ? '#2a6df4' : '#ddd';
        dot.style.cursor = 'pointer';
        dot.style.transition = 'background-color 0.3s ease';
        
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
        
        dotsContainer.appendChild(dot);
    });
    
    testimonialSlider.parentElement.appendChild(dotsContainer);
    
    // Function to show testimonial by index
    function showTestimonial(index) {
        const testimonialItem = testimonialSlider.querySelector('.testimonial-item');
        const testimonialText = testimonialItem.querySelector('.testimonial-text');
        const authorName = testimonialItem.querySelector('.author-info h4');
        const authorPosition = testimonialItem.querySelector('.author-info p');
        
        // Fade out
        testimonialItem.style.opacity = '0';
        
        setTimeout(() => {
            // Update content
            testimonialText.textContent = `"${testimonials[index].text}"`;
            authorName.textContent = testimonials[index].author;
            authorPosition.textContent = testimonials[index].position;
            
            // Update active dot
            const dots = dotsContainer.querySelectorAll('.testimonial-dot');
            dots.forEach((dot, dotIndex) => {
                dot.style.background = dotIndex === index ? '#2a6df4' : '#ddd';
            });
            
            // Fade in
            testimonialItem.style.opacity = '1';
            currentTestimonialIndex = index;
        }, 300);
    }
    
    // Auto-rotate testimonials
    setInterval(() => {
        const nextIndex = (currentTestimonialIndex + 1) % testimonials.length;
        showTestimonial(nextIndex);
    }, 8000);
    
    // Apply transition to testimonial items
    const testimonialItem = testimonialSlider.querySelector('.testimonial-item');
    if (testimonialItem) {
        testimonialItem.style.transition = 'opacity 0.3s ease';
    }
}

/**
 * Sticky Header
 * Makes the navigation bar sticky and changes its appearance on scroll
 */
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) return;
    
    if (window.scrollY > 50) {
        navbar.style.padding = '0.75rem 2rem';
        navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.padding = '1rem 2rem';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

/**
 * Newsletter Form Submission
 * Handles the newsletter subscription form
 */
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        
        if (!emailInput || !emailInput.value.trim()) return;
        
        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            // Show error message
            let errorMsg = this.querySelector('.error-message');
            if (!errorMsg) {
                errorMsg = document.createElement('div');
                errorMsg.className = 'error-message';
                errorMsg.textContent = 'Please enter a valid email address';
                errorMsg.style.color = '#fff';
                errorMsg.style.fontSize = '0.85rem';
                errorMsg.style.marginTop = '0.5rem';
                this.appendChild(errorMsg);
            }
            return;
        }
        
        // Remove any existing messages
        const existingMsg = this.querySelector('.error-message, .success-message');
        if (existingMsg) existingMsg.remove();
        
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.textContent = 'Thank you for subscribing to our newsletter!';
        successMsg.style.color = '#fff';
        successMsg.style.fontSize = '0.85rem';
        successMsg.style.marginTop = '0.5rem';
        this.appendChild(successMsg);
        
        // Reset form
        this.reset();
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successMsg.remove();
        }, 5000);
    });
});

/**
 * Page Loading Animation
 * Shows a subtle loading animation when the page loads
 */
window.addEventListener('load', function() {
    // Fade in the body
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

