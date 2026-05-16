document.addEventListener('DOMContentLoaded', () => {
    
    // Reset scroll to top on refresh
    window.scrollTo(0, 0);
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    }

    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis();
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Loader Animation
    const loader = document.querySelector('.loader');
    const loaderBar = document.querySelector('.loader-bar');
    
    gsap.to(loaderBar, {
        width: '100%',
        duration: 2,
        ease: 'power4.inOut',
        onComplete: () => {
            gsap.to(loader, {
                y: '-100%',
                duration: 1,
                ease: 'expo.inOut',
                onComplete: () => {
                    window.scrollTo(0, 0);
                    lenis.scrollTo(0, { immediate: true });
                    initAnimations();
                }
            });
        }
    });

    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    window.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0
        });
        gsap.to(follower, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.3
        });
    });

    function initAnimations() {
        // Hero Text Reveal
        gsap.from('.reveal-text', {
            y: 100,
            opacity: 0,
            duration: 1.5,
            ease: 'expo.out',
            stagger: 0.2
        });

        // PHASE 1: Horizontal Cinematic Scroll
        const horizontalInner = document.querySelector('.horizontal-inner');
        if (horizontalInner) {
            gsap.to(horizontalInner, {
                x: () => -(horizontalInner.scrollWidth - window.innerWidth + window.innerWidth * 0.1),
                ease: 'none',
                scrollTrigger: {
                    trigger: '.horizontal-section',
                    start: 'top top',
                    end: () => `+=${horizontalInner.scrollWidth}`,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1
                }
            });

            // Card entry animations (Phase 1)
            gsap.from('.h-project-card', {
                opacity: 0,
                scale: 0.8,
                y: 50,
                stagger: 0.1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.horizontal-section',
                    start: 'top 80%'
                }
            });
        }

        // PHASE 2: Vertical Timeline Tree
        document.querySelectorAll('.timeline-row').forEach((row, i) => {
            const media = row.querySelector('.timeline-media-card');
            const text = row.querySelector('.timeline-text');
            const dot = row.querySelector('.timeline-dot');
            const isLeft = row.classList.contains('left');

            // Dot Animation
            gsap.from(dot, {
                scale: 0,
                opacity: 0,
                scrollTrigger: {
                    trigger: row,
                    start: 'top center',
                    toggleActions: 'play none none reverse'
                }
            });

            // Media Card Animation
            gsap.from(media, {
                x: isLeft ? -150 : 150,
                opacity: 0,
                scale: 0.8,
                rotation: isLeft ? -10 : 10,
                duration: 1.2,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: row,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            });

            // Text Animation
            gsap.from(text, {
                y: 50,
                opacity: 0,
                duration: 1,
                delay: 0.3,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: row,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // Skills Progress Bar Animation
        document.querySelectorAll('.bar-fill').forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            gsap.to(bar, {
                scrollTrigger: {
                    trigger: bar,
                    start: 'top 95%'
                },
                width: progress,
                duration: 2,
                ease: 'expo.out'
            });
        });
    }

});
