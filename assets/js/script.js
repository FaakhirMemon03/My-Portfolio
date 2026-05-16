document.addEventListener('DOMContentLoaded', () => {
    
    // 1. SMOOTH SCROLL (LENIS)
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. LOADER
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
                    initAnimations();
                }
            });
        }
    });

    // 3. CURSOR
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    window.addEventListener('mousemove', (e) => {
        gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0 });
        gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.3 });
    });

    function initAnimations() {
        // Hero Reveal
        gsap.from('.reveal-text', { y: 100, opacity: 0, duration: 1.5, ease: 'expo.out', stagger: 0.2 });
        gsap.from('.reveal-text-sub', { opacity: 0, y: 20, duration: 1, delay: 0.8, ease: 'power3.out' });

        // PHASE 1: HORIZONTAL SCROLL
        const horizontalWrap = document.querySelector('.horizontal-wrap');
        const hCards = gsap.utils.toArray('.h-card');
        
        if (horizontalWrap) {
            const scrollWidth = horizontalWrap.scrollWidth - window.innerWidth;
            
            // Pin and Scroll
            gsap.to(horizontalWrap, {
                x: -scrollWidth - (window.innerWidth * 0.1), // Extra padding
                ease: 'none',
                scrollTrigger: {
                    trigger: '.phase-1-horizontal',
                    start: 'top top',
                    end: () => `+=${horizontalWrap.scrollWidth}`,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1
                }
            });

            // Card Entrance Animations
            hCards.forEach((card, i) => {
                gsap.to(card, {
                    opacity: 1,
                    scale: 1,
                    scrollTrigger: {
                        trigger: card,
                        containerAnimation: gsap.getById('horizontalScroll'), // If we gave it an ID
                        // Instead, we use the main horizontal trigger with start/end based on card position
                        start: 'left center',
                        toggleActions: 'play none none reverse'
                    }
                });
                
                // Card Entrance during horizontal scroll
                gsap.fromTo(card, 
                    { opacity: 0, scale: 0.8 },
                    { 
                        opacity: 1, scale: 1, 
                        scrollTrigger: {
                            trigger: card,
                            start: 'left 90%',
                            end: 'left 60%',
                            containerAnimation: gsap.getById('horizontalScrollAnim'), // We'll wrap the tween
                            scrub: true
                        } 
                    }
                );
            });

            // Re-targeting Phase 1 entrance for simplicity
            gsap.from('.h-card', {
                opacity: 0,
                scale: 0.8,
                stagger: 0.1,
                duration: 1,
                scrollTrigger: {
                    trigger: '.phase-1-horizontal',
                    start: 'top 80%'
                }
            });
        }

        // PHASE 2: VERTICAL TIMELINE
        const rows = gsap.utils.toArray('.timeline-row');
        rows.forEach((row, i) => {
            const isLeft = row.classList.contains('left');
            const imgPart = row.querySelector('.t-image-part');
            const textPart = row.querySelector('.t-text-part');
            const parallaxImg = row.querySelector('.parallax-img');

            // Image Slide In
            gsap.from(imgPart, {
                x: isLeft ? -150 : 150,
                opacity: 0,
                scale: 0.8,
                rotation: isLeft ? -5 : 5,
                duration: 1.5,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: row,
                    start: 'top 80%',
                    end: 'top 20%',
                    scrub: 1
                }
            });

            // Text Slide In
            gsap.from(textPart, {
                y: 50,
                opacity: 0,
                duration: 1,
                delay: 0.3,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: row,
                    start: 'top 75%'
                }
            });

            // Image Zoom Parallax
            if (parallaxImg) {
                gsap.to(parallaxImg, {
                    scale: 1,
                    scrollTrigger: {
                        trigger: row,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                });
            }
        });

        // 4. 3D TILT EFFECT
        const tiltElements = document.querySelectorAll('.h-card-inner, .t-image-card');
        tiltElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                gsap.to(el, {
                    rotationX: rotateX,
                    rotationY: rotateY,
                    transformPerspective: 1000,
                    ease: 'power2.out',
                    duration: 0.5
                });
            });

            el.addEventListener('mouseleave', () => {
                gsap.to(el, {
                    rotationX: 0,
                    rotationY: 0,
                    ease: 'power2.out',
                    duration: 0.5
                });
            });
        });

        // Skills Progress Animation
        document.querySelectorAll('.bar-fill').forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            gsap.to(bar, {
                scrollTrigger: { trigger: bar, start: 'top 95%' },
                width: progress,
                duration: 2,
                ease: 'expo.out'
            });
        });

        // Parallax for Visual Gallery
        document.querySelectorAll('.gallery-item').forEach(item => {
            const speed = item.getAttribute('data-speed');
            gsap.to(item, {
                scrollTrigger: { trigger: item, start: 'top bottom', end: 'bottom top', scrub: true },
                y: 100 * speed,
                ease: 'none'
            });
        });
    }
});
