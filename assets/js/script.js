document.addEventListener('DOMContentLoaded', () => {
    
    // Force Scroll to Top on Page Refresh
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    
    // 1. SMOOTH SCROLL (LENIS)
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenis.scrollTo(0, { immediate: true });
    
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // New Loader is managed dynamically in loader.js

    // 3. CURSOR
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    window.addEventListener('mousemove', (e) => {
        gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0 });
        gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.3 });
    });

    // DYNAMIC PROJECT IMAGE MAPPING & FALLBACK ENGINE
    function assignProjectImages() {
        const cards = document.querySelectorAll('[data-repo]');
        
        // Predefined special cases mapping case-insensitively
        const specialCases = {
            'my portfolio': 'assets/images/pic1.jpg',
            'my-portfolio': 'assets/images/pic1.jpg',
            'my_portfolio': 'assets/images/pic1.jpg',
            'faakhirmemon03': 'assets/images/pic2.jpg',
            'faakhirmemon03 3': 'assets/images/pic3.jpg',
            'faakhirmemon03-3': 'assets/images/pic3.jpg',
            'faakhirmemon03_3': 'assets/images/pic3.jpg'
        };

        // Real extension mapper for Windows files in case picX.jpg fails
        const realSpecialPicsFallback = {
            'pic1.jpg': 'assets/images/pic1.png',
            'pic2.jpg': 'assets/images/pic2.JPG',
            'pic3.jpg': 'assets/images/pic3.JPG',
            'pic4.jpg': 'assets/images/pic4.JPG'
        };

        cards.forEach((card) => {
            const repoName = card.getAttribute('data-repo');
            const img = card.querySelector('.project-img');
            if (!img) return;

            const normalized = repoName.toLowerCase().trim();
            
            // 1. Check Special Cases
            if (specialCases[normalized]) {
                const targetSrc = specialCases[normalized];
                img.src = targetSrc;
                
                // If .jpg fails, immediately fall back to the actual local file (.png/.JPG)
                img.onerror = () => {
                    const filename = targetSrc.split('/').pop();
                    if (realSpecialPicsFallback[filename]) {
                        img.src = realSpecialPicsFallback[filename];
                        img.onerror = null; // stop error handler
                    }
                };
                return;
            }
            
            // 2. Normal Case: Use repo name directly as image name (assets/images/{repo-name}.png)
            // Mixed case is fully supported, and we also provide a forgiving check for spaces/hyphens
            const exactPath = `assets/images/${repoName}.png`;
            const spacedName = repoName.replace(/[-_]+/g, ' ');
            const spacedPath = `assets/images/${spacedName}.png`;
            
            img.src = exactPath;
            
            let errorCount = 0;
            img.onerror = () => {
                errorCount++;
                if (errorCount === 1) {
                    // Try with spaces (for forgiving matches like "AM trading.png")
                    img.src = spacedPath;
                } else if (errorCount === 2) {
                    // Fallback to default.png as requested
                    img.src = 'assets/images/default.png';
                } else if (errorCount === 3) {
                    // Failsafe in case default.png doesn't exist locally: load one of the beautiful personal pics
                    img.src = 'assets/images/pic1.png';
                } else if (errorCount === 4) {
                    // Final bulletproof fallback: GitHub dynamic OpenGraph card so it NEVER shows a broken image
                    img.src = `https://opengraph.githubassets.com/1/FaakhirMemon03/${repoName}`;
                    img.onerror = null;
                }
            };
        });
    }

    window.initAnimations = initAnimations;

    function initAnimations() {
        // Map images to repositories dynamically
        assignProjectImages();

        // Create GSAP matchMedia Instance
        let mm = gsap.matchMedia();

        // 1. Desktop & Large Tablets (> 768px)
        mm.add("(min-width: 769px)", () => {
            // Hero Reveal
            gsap.from('.reveal-text', { y: 100, opacity: 0, duration: 1.5, ease: 'expo.out', stagger: 0.2 });
            gsap.from('.reveal-text-sub', { opacity: 0, y: 20, duration: 1, delay: 0.8, ease: 'power3.out' });

            // PHASE 1: HORIZONTAL SCROLL
            const horizontalWrap = document.querySelector('.horizontal-wrap');
            const hCards = gsap.utils.toArray('.h-card');
            
            if (horizontalWrap) {
                let getScrollWidth = () => horizontalWrap.scrollWidth - window.innerWidth;

                // Pin and Horizontal Scroll Tween
                const horizontalTween = gsap.to(horizontalWrap, {
                    x: () => -getScrollWidth(),
                    ease: 'none',
                    scrollTrigger: {
                        trigger: '.phase-1-horizontal',
                        start: 'top top',
                        end: () => `+=${getScrollWidth()}`,
                        scrub: 1,
                        pin: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true
                    }
                });

                // Card Entrance Animations
                hCards.forEach((card, index) => {
                    if (index === 0) {
                        gsap.to(card, {
                            opacity: 1,
                            scale: 1,
                            ease: 'power2.out',
                            scrollTrigger: {
                                trigger: '.phase-1-horizontal',
                                start: 'top 80%',
                                end: 'top 30%',
                                scrub: true
                            }
                        });
                    } else {
                        gsap.to(card, {
                            opacity: 1,
                            scale: 1,
                            ease: 'power2.out',
                            scrollTrigger: {
                                trigger: card,
                                containerAnimation: horizontalTween,
                                start: 'left 95%',
                                end: 'left 40%',
                                scrub: true
                            }
                        });
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

                gsap.from(textPart, {
                    x: isLeft ? 150 : -150,
                    opacity: 0,
                    duration: 1.5,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: row,
                        start: 'top 80%',
                        end: 'top 20%',
                        scrub: 1
                    }
                });

                if (parallaxImg) {
                    gsap.to(parallaxImg, {
                        yPercent: -15,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: row,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: true
                        }
                    });
                }
            });
        });

        // 2. Mobile & Small Tablets (<= 768px)
        mm.add("(max-width: 768px)", () => {
            // Simplified Hero reveal
            gsap.from('.reveal-text', { y: 50, opacity: 0, duration: 1.2, ease: 'power3.out', stagger: 0.1 });
            gsap.from('.reveal-text-sub', { opacity: 0, y: 15, duration: 0.8, delay: 0.5, ease: 'power3.out' });

            // Force all horizontal cards to be visible instantly
            const hCards = gsap.utils.toArray('.h-card');
            hCards.forEach(card => {
                gsap.set(card, { opacity: 1, scale: 1 });
            });

            // Simplified Timeline elements (vertical stack, scroll-triggered fade up)
            const rows = gsap.utils.toArray('.timeline-row');
            rows.forEach((row) => {
                const imgPart = row.querySelector('.t-image-part');
                const textPart = row.querySelector('.t-text-part');

                gsap.from([imgPart, textPart], {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: row,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                });
            });
        });

        // 3. Shared Animations (tilt is desktop only)
        if (window.innerWidth > 1024) {
            document.querySelectorAll('.h-card-inner, .t-image-card').forEach(el => {
                el.addEventListener('mousemove', (e) => {
                    const rect = el.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    gsap.to(el, {
                        rotationY: x * 0.03,
                        rotationX: -y * 0.03,
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
        }

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

    // 4. MOBILE DRAWER TOGGLE CONTROL
    const menuToggle = document.querySelector('.menu-toggle');
    const drawerClose = document.querySelector('.drawer-close');
    const mobileDrawer = document.querySelector('.mobile-drawer');
    const drawerLinks = document.querySelectorAll('.drawer-link');

    if (menuToggle && mobileDrawer) {
        menuToggle.addEventListener('click', () => {
            mobileDrawer.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (drawerClose && mobileDrawer) {
        drawerClose.addEventListener('click', () => {
            mobileDrawer.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    drawerLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileDrawer.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
});
