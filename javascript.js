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
        });
