document.addEventListener('DOMContentLoaded', () => {
    
    // Initial Reset
    window.scrollTo(0, 0);
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    }

    // Initialize Lenis
    const lenis = new Lenis();
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Loader
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
        gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0 });
        gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.3 });
    });

    function initAnimations() {
        // Hero Reveal
        gsap.from('.reveal-text', { y: 100, opacity: 0, duration: 1.5, ease: 'expo.out', stagger: 0.2 });

        // --- PHASE 1: HORIZONTAL SCROLL ---
        const hWrapper = document.querySelector('.h-projects-wrapper');
        const hCards = gsap.utils.toArray('.h-card');
        
        if (hWrapper) {
            gsap.to(hWrapper, {
                x: () => -(hWrapper.scrollWidth - window.innerWidth + window.innerWidth * 0.2),
                ease: 'none',
                scrollTrigger: {
                    trigger: '.projects-horizontal',
                    start: 'top top',
                    end: () => `+=${hWrapper.scrollWidth}`,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1
                }
            });

            // Card scale while moving
            hCards.forEach(card => {
                gsap.from(card, {
                    scale: 0.8,
                    opacity: 0.5,
                    scrollTrigger: {
                        trigger: card,
                        containerAnimation: gsap.to(hWrapper, { x: -(hWrapper.scrollWidth - window.innerWidth) }), // Linked to main horizontal scroll
                        start: 'left right',
                        end: 'center center',
                        scrub: true
                    }
                });
            });
        }

        // --- PHASE 2: TREE TIMELINE (ZIG-ZAG) ---
        const treeCards = gsap.utils.toArray('.tree-card');
        treeCards.forEach((card, i) => {
            const side = card.classList.contains('left') ? -1 : 1;
            const rotation = side * 10;
            
            gsap.fromTo(card, 
                {
                    x: side * 200,
                    rotation: rotation,
                    scale: 0.8,
                    opacity: 0
                },
                {
                    x: 0,
                    rotation: 0,
                    scale: 1,
                    opacity: 1,
                    duration: 1.5,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        onEnter: () => card.classList.add('is-visible')
                    }
                }
            );

            // Inner Image Parallax
            const img = card.querySelector('.parallax-img-v');
            if (img) {
                gsap.to(img, {
                    y: -50,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                });
            }
        });

        // 3D Tilt Effect on Cards
        const allCards = document.querySelectorAll('.project-card');
        allCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;

                gsap.to(card, {
                    rotateX: rotateX,
                    rotateY: rotateY,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    rotateX: 0,
                    rotateY: 0,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            });
        });

        // Skills & Progress
        document.querySelectorAll('.bar-fill').forEach(bar => {
            gsap.to(bar, {
                scrollTrigger: { trigger: bar, start: 'top 95%' },
                width: bar.getAttribute('data-progress'),
                duration: 2,
                ease: 'expo.out'
            });
        });
    }

});
