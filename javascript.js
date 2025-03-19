document.addEventListener('DOMContentLoaded', function() {
    // Create a common configuration object for reusable animation settings
    const fadeInY = {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out'
    };
    
    // Hero animations - batch these together in a timeline for better sequencing
    const heroTimeline = gsap.timeline();
    heroTimeline
        .from('.hero-content', {
            ...fadeInY,
            duration: 1.2
        })
        .from('.hero-image', {
            opacity: 0,
            x: 100,
            duration: 1.2,
            ease: 'power3.out'
        }, '-=0.9'); // Overlap the animations slightly
    
    // Create ScrollTrigger batches for better performance
    // Service card animations
    ScrollTrigger.batch('.service-card', {
        start: 'top 80%',
        onEnter: batch => {
            gsap.from(batch, {
                ...fadeInY,
                stagger: 0.1
            });
        }
    });
    
    // Stats counter animation - optimize by creating a single function
    const statsElements = gsap.utils.toArray('.stat-number');
    statsElements.forEach(stat => {
        const target = stat.getAttribute('data-count');
        const isCurrency = target.includes('$');
        const isPlus = target.includes('+');
        const isPercentage = target.includes('%');
        
        // Clean the target value once (outside the animation)
        const cleanTarget = parseFloat(target.replace(/[^0-9.]/g, ''));
        
        ScrollTrigger.create({
            trigger: stat,
            start: 'top 80%',
            once: true,
            onEnter: () => {
                // Use a counter tween for better performance
                const obj = { value: 0 };
                gsap.to(obj, {
                    value: cleanTarget,
                    duration: 1.5,
                    ease: 'power2.out',
                    onUpdate: function() {
                        const value = Math.floor(obj.value);
                        if (isPercentage) stat.innerHTML = value + '%';
                        else if (isPlus) stat.innerHTML = value + '+';
                        else if (isCurrency) stat.innerHTML = '$' + value;
                        else stat.innerHTML = value;
                    }
                });
            }
        });
    });
    
    // Testimonial animations - batch for better performance
    ScrollTrigger.batch('.testimonial-card', {
        start: 'top 80%',
        onEnter: batch => {
            gsap.from(batch, {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out'
            });
        }
    });
    
    // Contact section animations - combine into a timeline
    const contactTrigger = {
        trigger: '.contact',
        start: 'top 70%'
    };
    
    ScrollTrigger.create({
        ...contactTrigger,
        onEnter: () => {
            gsap.from('.contact-info', {
                x: -50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });
            gsap.from('.contact-form', {
                x: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });
        }
    });
    
    // Moving glow effect - use requestAnimationFrame for smoother performance
    let glowElement = document.querySelector('.glow:first-child');
    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX - 100;
        mouseY = e.clientY - 100;
    });
    
    // Use RAF for smoother animation with less overhead
    function updateGlow() {
        // Smooth interpolation for better performance
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;
        
        if (glowElement) {
            gsap.set(glowElement, { x: currentX, y: currentY });
        }
        
        requestAnimationFrame(updateGlow);
    }
    
    updateGlow();
});

// Initialize GSAP animation
document.addEventListener('DOMContentLoaded', function() {
    // Hero animations
    gsap.from('.hero-content', {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-image', {
        opacity: 0,
        x: 100,
        duration: 1.2,
        delay: 0.3,
        ease: 'power3.out'
    });
    
    // Service card animations
    gsap.utils.toArray('.service-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out'
        });
    });
    
    // Stats counter animation
    gsap.utils.toArray('.stat-number').forEach(stat => {
        let target = stat.getAttribute('data-count');
        let isCurrency = target.indexOf('$') >= 0;
        let isPlus = target.indexOf('+') >= 0;
        let isPercentage = target.indexOf('%') >= 0;
        
        // Clean the target value
        target = target.replace(/[^0-9.]/g, '');
        
        ScrollTrigger.create({
            trigger: stat,
            start: 'top 80%',
            once: true,
            onEnter: () => {
                gsap.to(stat, {
                    innerHTML: function(index, target) {
                        let cleanTarget = target.replace(/[^0-9.]/g, '');
                        let value = Math.floor(parseFloat(cleanTarget));
                        
                        if (isPercentage) return value + '%';
                        if (isPlus) return value + '+';
                        if (isCurrency) return '$' + value;
                        return target;
                    },
                    duration: 1.5,
                    ease: 'power2.out'
                });
            }
        });
    });
    
    // Testimonial animations
    gsap.utils.toArray('.testimonial-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.2,
            ease: 'power3.out'
        });
    });
    
    // Contact section animations
    gsap.from('.contact-info', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 70%',
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
    
    gsap.from('.contact-form', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 70%',
        },
        x: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
    
    // Moving glow effect for cursor
    document.addEventListener('mousemove', function(e) {
        gsap.to('.glow:first-child', {
            x: e.clientX - 100,
            y: e.clientY - 100,
            duration: 1.5,
            ease: 'power3.out'
        });
    });
    
    // Smooth scroll to bottom function using GSAP
    function scrollToBottom() {
        gsap.to(window, {
            duration: 1.5,
            scrollTo: {
                y: document.body.scrollHeight,
                autoKill: false
            },
            ease: "power3.inOut"
        });
    }
    
    // Add event listener to your scroll button (modify the selector as needed)
    document.getElementById('scrollButton').addEventListener('click', scrollToBottom);
    
    // Alternative: You can also create a function to scroll to any section
    function scrollToSection(sectionId) {
        gsap.to(window, {
            duration: 1.5,
            scrollTo: {
                y: "#" + sectionId,
                offsetY: 50, // Optional offset from the top
                autoKill: false
            },
            ease: "power3.inOut"
        });
    }
});
