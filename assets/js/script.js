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

    // Handle Hover Effects
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .gallery-item, .skill-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(follower, {
                scale: 1.5,
                background: 'rgba(0, 242, 255, 0.1)',
                duration: 0.3
            });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(follower, {
                scale: 1,
                background: 'transparent',
                duration: 0.3
            });
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

        gsap.from('.reveal-text-sub', {
            opacity: 0,
            y: 20,
            duration: 1,
            delay: 0.8,
            ease: 'power3.out'
        });

        // Gallery Item Parallax
        document.querySelectorAll('.gallery-item').forEach(item => {
            const speed = item.getAttribute('data-speed');
            gsap.to(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                },
                y: 100 * speed,
                ease: 'none'
            });
        });

        // --- DYNAMIC PROJECTS ANIMATION ---
        const projects = gsap.utils.toArray('.project-card');
        const projectsContainer = document.querySelector('.projects-container');
        
        if (projects.length > 0) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.projects-section',
                    start: 'top top',
                    end: () => `+=${projects.length * 100}%`, // More length for more projects
                    scrub: 1.5,
                    pin: true,
                    anticipatePin: 1
                }
            });

            // 1. First 5 repos move right
            const firstBatch = projects.slice(0, 5);
            tl.to(firstBatch, {
                xPercent: -100 * (firstBatch.length - 1),
                x: (i) => i * 650, // Space them out
                ease: 'none',
                duration: 2
            });

            // 2. Remaining repos slide from alternating sides
            projects.forEach((card, index) => {
                if (index < 5) return; // Already handled

                const direction = index % 2 === 0 ? 1 : -1; // Even = Right, Odd = Left
                
                tl.fromTo(card, 
                    { 
                        x: direction * window.innerWidth, 
                        opacity: 0,
                        scale: 0.5,
                        rotateY: direction * 45
                    },
                    { 
                        x: 0, 
                        opacity: 1, 
                        scale: 1,
                        rotateY: 0,
                        duration: 1,
                        ease: 'power2.out'
                    },
                    "> -0.5" // Overlap with previous card
                );

                // Move the batch together to make space for the next card
                tl.to(projects.slice(0, index + 1), {
                    x: (i) => (i - index) * 650, // Shift existing cards left
                    duration: 0.5,
                    ease: 'none'
                }, "<");
            });
        }

        // Skills Progress Bar Animation
        document.querySelectorAll('.bar-fill').forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            gsap.to(bar, {
                scrollTrigger: {
                    trigger: bar,
                    start: 'top 90%'
                },
                width: progress,
                duration: 2,
                ease: 'expo.out'
            });
        });
    }

});
