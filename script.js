// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// 1. Three.js Background
const initThreeJS = () => {
    const container = document.getElementById('canvas-container');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.005,
        color: 0x007aff,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 3;

    // Animation loop
    const animate = () => {
        requestAnimationFrame(animate);
        particlesMesh.rotation.y += 0.001;
        particlesMesh.rotation.x += 0.0005;
        renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Mouse movement interaction
    document.addEventListener('mousemove', (event) => {
        const mouseX = (event.clientX / window.innerWidth) - 0.5;
        const mouseY = (event.clientY / window.innerHeight) - 0.5;
        gsap.to(particlesMesh.rotation, {
            x: mouseY * 0.5,
            y: mouseX * 0.5,
            duration: 2
        });
    });
};

// 2. GSAP Animations
const initAnimations = () => {
    // Hero Text Animations
    const tlHero = gsap.timeline();
    tlHero.from('.logo', { y: -50, opacity: 0, duration: 1, ease: 'power4.out' })
          .from('.nav-links a', { y: -20, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power4.out' }, '-=0.5')
          .from('.reveal-text', { y: 100, opacity: 0, duration: 1.5, ease: 'power4.out' }, '-=0.8')
          .from('.reveal-text-sub', { y: 50, opacity: 0, duration: 1.2, ease: 'power4.out' }, '-=1')
          .from('.scroll-indicator', { opacity: 0, duration: 1 }, '-=0.5');

    // Horizontal Scroll Section
    const projectsWrapper = document.querySelector('.projects-wrapper');
    const amountToScroll = projectsWrapper.offsetWidth - window.innerWidth;

    const scrollTween = gsap.to(projectsWrapper, {
        x: -amountToScroll,
        ease: 'none',
        scrollTrigger: {
            trigger: '.projects',
            start: 'top top',
            end: `+=${amountToScroll + 2000}`, // Increased scroll length for cinematic feel
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
        }
    });

    // Individual Image Animations (MUST FOLLOW USER SPECIFICS)
    
    // pic1 → left to center
    gsap.from('.img1', {
        x: '-100%',
        opacity: 0,
        scale: 0.8,
        scrollTrigger: {
            trigger: '.img1',
            containerAnimation: scrollTween,
            start: 'left center',
            toggleActions: 'play none none reverse'
        }
    });
    gsap.to('.img1', { opacity: 1, duration: 1 });

    // pic2 → right to center
    gsap.from('.img2', {
        x: '100%',
        opacity: 0,
        scale: 0.8,
        scrollTrigger: {
            trigger: '.img2',
            containerAnimation: scrollTween,
            start: 'left center',
            toggleActions: 'play none none reverse'
        }
    });
    gsap.to('.img2', { opacity: 1, duration: 1 });

    // pic3 → scale up
    gsap.from('.img3', {
        scale: 0,
        opacity: 0,
        rotate: -10,
        scrollTrigger: {
            trigger: '.img3',
            containerAnimation: scrollTween,
            start: 'left center',
            toggleActions: 'play none none reverse'
        }
    });
    gsap.to('.img3', { opacity: 1, duration: 1 });

    // pic4 → move vertically / parallax
    gsap.from('.img4', {
        y: '50%',
        opacity: 0,
        scale: 1.2,
        scrollTrigger: {
            trigger: '.img4',
            containerAnimation: scrollTween,
            start: 'left center',
            toggleActions: 'play none none reverse'
        }
    });
    gsap.to('.img4', { opacity: 1, duration: 1 });

    // Global reveal for all project images to ensure they show up
    document.querySelectorAll('.project-img').forEach(img => {
        gsap.to(img, {
            opacity: 1,
            duration: 0.5,
            scrollTrigger: {
                trigger: img,
                containerAnimation: scrollTween,
                start: 'left right',
            }
        });
    });
};

// Initialize everything
window.addEventListener('DOMContentLoaded', () => {
    initThreeJS();
    initAnimations();
});
