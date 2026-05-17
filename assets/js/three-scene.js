/**
 * Three.js Cinematic Background Scene
 * High-End Developer "Tech Core" Aesthetic
 */

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#hero-canvas'),
    antialias: true,
    alpha: true,
    powerPreference: "high-performance"
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// --- 1. CORE TECH SHAPE (Digital Brain / Abstract Core) ---
// Using a TorusKnot to represent complexity, neural networks, and problem solving
const coreGeometry = new THREE.TorusKnotGeometry(2.5, 0.8, 150, 40);

// Points (Nodes) for the core
const corePointsMat = new THREE.PointsMaterial({
    size: 0.025,
    color: 0x00f2ff,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending
});
const corePoints = new THREE.Points(coreGeometry, corePointsMat);
scene.add(corePoints);

// Wireframe (Connections) for the core
const coreWireMat = new THREE.LineBasicMaterial({
    color: 0x00f2ff,
    transparent: true,
    opacity: 0.15,
    blending: THREE.AdditiveBlending
});
const coreWire = new THREE.LineSegments(
    new THREE.EdgesGeometry(coreGeometry), 
    coreWireMat
);
scene.add(coreWire);

// --- 2. DATA PARTICLE STREAM ---
// Floating matrix of background data points
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 4000;
const posArray = new Float32Array(particlesCount * 3);
const speeds = new Float32Array(particlesCount);

for(let i = 0; i < particlesCount * 3; i++) {
    // Spread them across a wide volume
    posArray[i] = (Math.random() - 0.5) * 40; 
}

for(let i=0; i < particlesCount; i++) {
    speeds[i] = Math.random() * 0.03 + 0.005;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
particlesGeometry.setAttribute('speed', new THREE.BufferAttribute(speeds, 1));

const pMaterial = new THREE.PointsMaterial({
    size: 0.035,
    color: 0x00f2ff,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
});
const particles = new THREE.Points(particlesGeometry, pMaterial);
scene.add(particles);

// --- CAMERA & LIGHTING ---
camera.position.z = 7;

// --- MOUSE INTERACTION ---
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - windowHalfX);
    mouseY = (e.clientY - windowHalfY);
});

// --- ANIMATION LOOP ---
const clock = new THREE.Clock();

function animate() {
    const elapsedTime = clock.getElapsedTime();

    // Smooth mouse follow targets
    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;

    // 1. Rotate Core
    corePoints.rotation.y += 0.002;
    corePoints.rotation.x += 0.001;
    coreWire.rotation.y += 0.002;
    coreWire.rotation.x += 0.001;

    // 2. Core Pulsing / Breathing Effect
    const scale = 1 + Math.sin(elapsedTime * 2) * 0.03;
    corePoints.scale.set(scale, scale, scale);
    coreWire.scale.set(scale, scale, scale);

    // 3. Subtle mouse interaction for core
    corePoints.rotation.y += 0.02 * (targetX - corePoints.rotation.y);
    corePoints.rotation.x += 0.02 * (targetY - corePoints.rotation.x);
    coreWire.rotation.y += 0.02 * (targetX - coreWire.rotation.y);
    coreWire.rotation.x += 0.02 * (targetY - coreWire.rotation.x);

    // 4. Animate Data Stream (Particles flowing upwards)
    const positions = particles.geometry.attributes.position.array;
    const pSpeeds = particles.geometry.attributes.speed.array;

    for(let i=0; i<particlesCount; i++) {
        let i3 = i * 3;
        // Move y upwards
        positions[i3 + 1] += pSpeeds[i];
        
        // Reset if it goes too high (simulating infinite stream)
        if(positions[i3 + 1] > 20) {
            positions[i3 + 1] = -20;
            positions[i3] = (Math.random() - 0.5) * 40;     // random x
            positions[i3 + 2] = (Math.random() - 0.5) * 40; // random z
        }
    }
    particles.geometry.attributes.position.needsUpdate = true;

    // Rotate the entire particle field slowly
    particles.rotation.y = elapsedTime * 0.05;

    // 5. Scroll Interaction (Parallax)
    const scrollY = window.scrollY;
    // Move camera down slightly as you scroll down
    camera.position.y = -scrollY * 0.003;
    
    // Smooth camera mouse parallax
    camera.position.x += (mouseX * 0.003 - camera.position.x) * 0.05;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();

// --- RESIZE HANDLING ---
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
