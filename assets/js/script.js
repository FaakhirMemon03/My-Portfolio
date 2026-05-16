document.addEventListener('DOMContentLoaded', () => {
    
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

    // Handle Hover Effects for Cursor
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .gallery-item');
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

        // Section Title Parallax
        document.querySelectorAll('.section-title').forEach(title => {
            gsap.to(title, {
                scrollTrigger: {
                    trigger: title,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                },
                x: 100,
                ease: 'none'
            });
        });

        // About Story Reveal
        gsap.from('.story-para', {
            scrollTrigger: {
                trigger: '.about-section',
                start: 'top 80%',
                end: 'top 20%',
                scrub: true
            },
            opacity: 0.2,
            y: 50,
            duration: 1
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

        // Horizontal Scroll for Projects
        const projectsContainer = document.querySelector('.projects-container');
        if (projectsContainer) {
            gsap.to(projectsContainer, {
                x: () => -(projectsContainer.scrollWidth - window.innerWidth + window.innerWidth * 0.2),
                ease: 'none',
                scrollTrigger: {
                    trigger: '.projects-section',
                    start: 'top top',
                    end: () => `+=${projectsContainer.scrollWidth}`,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1
                }
            });
        }

        // Skills Progress Bar Animation
        document.querySelectorAll('.bar-fill').forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            gsap.to(bar, {
                scrollTrigger: {
                    trigger: '.skills-section',
                    start: 'top 70%'
                },
                width: progress,
                duration: 2,
                ease: 'expo.out'
            });
        });
    }

});
