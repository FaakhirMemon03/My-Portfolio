/**
 * Premium 3D Cinematic Loader - Three.js & GSAP
 * Created for Faakhir Memon's Quantum Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. THREE.JS 3D LOADER BACKGROUND ---
    const canvas = document.getElementById('loader-canvas');
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 6;

    // Responsive sizing for mobile
    function getResponsiveScale() {
        return window.innerWidth < 768 ? 0.75 : 1.0;
    }

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00f3ff, 2, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xff007f, 1.5, 50);
    pointLight2.position.set(-5, -5, -5);
    scene.add(pointLight2);

    // 3D Group to hold all objects
    const loaderGroup = new THREE.Group();
    loaderGroup.scale.setScalar(getResponsiveScale());
    scene.add(loaderGroup);

    // Geometry 1: Quantum Inner Sphere Points
    const coreGeo = new THREE.IcosahedronGeometry(1.2, 3);
    const coreMat = new THREE.PointsMaterial({
        color: 0x00f3ff,
        size: 0.04,
        transparent: true,
        opacity: 0.8
    });
    const corePoints = new THREE.Points(coreGeo, coreMat);
    loaderGroup.add(corePoints);

    // Geometry 2: Outer Holographic Wireframe Outer Shell
    const shellGeo = new THREE.IcosahedronGeometry(1.5, 2);
    const shellMat = new THREE.MeshBasicMaterial({
        color: 0xff007f,
        wireframe: true,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending
    });
    const shellMesh = new THREE.Mesh(shellGeo, shellMat);
    loaderGroup.add(shellMesh);

    // Geometry 3: Dust Ring Particles Swirling Around
    const particleCount = window.innerWidth < 768 ? 100 : 250;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];

    for (let i = 0; i < particleCount; i++) {
        // Spiral disk distribution
        const angle = Math.random() * Math.PI * 2;
        const radius = 2.0 + Math.random() * 1.5;
        
        positions[i * 3] = Math.cos(angle) * radius;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 1.0;
        positions[i * 3 + 2] = Math.sin(angle) * radius;

        // Swirling velocities
        velocities.push({
            speed: 0.01 + Math.random() * 0.015,
            angle: angle,
            radius: radius,
            yVel: (Math.random() - 0.5) * 0.005
        });
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.03,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });

    const dustParticles = new THREE.Points(particleGeo, particleMat);
    loaderGroup.add(dustParticles);

    // Mouse Interaction
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    window.addEventListener('mousemove', (e) => {
        mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 0.6;
        mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 0.6;
    });

    // Animation Loop
    let clock = new THREE.Clock();

    function animateLoader() {
        const elapsedTime = clock.getElapsedTime();

        // Object Rotations
        corePoints.rotation.y = elapsedTime * 0.2;
        corePoints.rotation.x = elapsedTime * 0.1;
        
        shellMesh.rotation.y = -elapsedTime * 0.15;
        shellMesh.rotation.z = elapsedTime * 0.08;

        // Subtle Breathing (Scale Scale)
        const breathe = 1.0 + Math.sin(elapsedTime * 2) * 0.04;
        loaderGroup.scale.setScalar(getResponsiveScale() * breathe);

        // Swirl dust particles
        const posArr = dustParticles.geometry.attributes.position.array;
        for (let i = 0; i < particleCount; i++) {
            velocities[i].angle += velocities[i].speed;
            
            // Recompute dynamic swirling position
            posArr[i * 3] = Math.cos(velocities[i].angle) * velocities[i].radius;
            posArr[i * 3 + 1] += velocities[i].yVel;
            posArr[i * 3 + 2] = Math.sin(velocities[i].angle) * velocities[i].radius;

            // Bounce particle Y axis
            if (Math.abs(posArr[i * 3 + 1]) > 0.8) {
                velocities[i].yVel *= -1;
            }
        }
        dustParticles.geometry.attributes.position.needsUpdate = true;

        // Mouse Lerp Tracking
        mouse.x += (mouse.targetX - mouse.x) * 0.05;
        mouse.y += (mouse.targetY - mouse.y) * 0.05;
        
        loaderGroup.rotation.y = mouse.x;
        loaderGroup.rotation.x = mouse.y;

        renderer.render(scene, camera);
        requestAnimationFrame(animateLoader);
    }
    animateLoader();

    // Window Resize Handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        loaderGroup.scale.setScalar(getResponsiveScale());
    });


    // --- 2. GSAP LOADER TEXT & COUNTER SEQUENCE ---
    
    // Set initial loader state
    gsap.set('.loader', { opacity: 1, visibility: 'visible' });
    gsap.set('.loader-content', { opacity: 0, scale: 0.95 });

    const tl = gsap.timeline();

    // 1. Fade-in Content Panel
    tl.to('.loader-content', {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power3.out'
    });

    // 2. Letter Stagger reveal for "FAAKHIR MEMON"
    tl.to('.loader-title .letter', {
        opacity: 1,
        y: 0,
        stagger: 0.06,
        duration: 0.8,
        ease: 'power4.out'
    }, '-=0.5');

    // 3. Subtext Pulse & Percentage Loader Counter
    const progressVal = { value: 0 };
    tl.to(progressVal, {
        value: 100,
        duration: 3.2,
        ease: 'power2.out',
        onUpdate: () => {
            const formatted = String(Math.floor(progressVal.value)).padStart(2, '0');
            document.querySelector('.loader-percent').innerText = `${formatted}%`;
        },
        onComplete: () => {
            // Trigger cinematic exit
            triggerLoaderExit();
        }
    }, '-=0.4');


    // --- 3. LOADER EXIT TRANSITION ---
    function triggerLoaderExit() {
        const exitTl = gsap.timeline({
            onComplete: () => {
                document.querySelector('.loader').style.display = 'none';
                
                // Initialize the main page animations globally
                if (typeof window.initAnimations === 'function') {
                    window.initAnimations();
                }
            }
        });

        // 1. Content Card zoom out & fade
        exitTl.to('.loader-content', {
            opacity: 0,
            scale: 0.9,
            filter: 'blur(10px)',
            duration: 1,
            ease: 'power3.inOut'
        });

        // 2. Three.js canvas expand & dissolve
        exitTl.to('#loader-canvas', {
            opacity: 0,
            scale: 1.4,
            duration: 1.2,
            ease: 'power3.inOut'
        }, '-=0.8');

        // 3. Main background transition
        exitTl.to('.loader', {
            opacity: 0,
            duration: 1.2,
            ease: 'power3.inOut'
        }, '-=1.0');
    }
});
