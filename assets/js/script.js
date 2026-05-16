document.addEventListener('DOMContentLoaded', () => {
    
    // Reset scroll to top
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
        gsap.from('.reveal-text-sub', { opacity: 0, y: 20, duration: 1, delay: 0.8 });

        // --- PHASE 1: HORIZONTAL SCROLL (First 5) ---
        const hWrapper = document.querySelector('.h-projects-wrapper');
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
        }

        // --- PHASE 2: TREE TIMELINE (Remaining) ---
        const treeCards = gsap.utils.toArray('.tree-card');
        treeCards.forEach((card, i) => {
            const side = card.classList.contains('left') ? -1 : 1;
            
            gsap.from(card, {
                x: side * 300,
                opacity: 0,
                scale: 0.8,
                duration: 1.5,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%',
                    end: 'top 50%',
                    scrub: 1
                }
            });
        });

        // Skills Animation
        document.querySelectorAll('.bar-fill').forEach(bar => {
            gsap.to(bar, {
                scrollTrigger: { trigger: bar, start: 'top 90%' },
                width: bar.getAttribute('data-progress'),
                duration: 2,
                ease: 'expo.out'
            });
        });

        // Gallery Parallax
        document.querySelectorAll('.gallery-item').forEach(item => {
            gsap.to(item, {
                scrollTrigger: { trigger: item, start: 'top bottom', end: 'bottom top', scrub: true },
                y: 50,
                ease: 'none'
            });
        });
    }

});
