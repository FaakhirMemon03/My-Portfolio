/**
 * Three.js Cinematic Background Scene
 */

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#hero-canvas'),
    antialias: true,
    alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Create a liquid wave plane
const geometry = new THREE.PlaneGeometry(20, 20, 64, 64);
const material = new THREE.MeshStandardMaterial({
    color: 0x00f2ff,
    wireframe: true,
    transparent: true,
    opacity: 0.2,
    emissive: 0x00f2ff,
    emissiveIntensity: 0.5
});

const plane = new THREE.Mesh(geometry, material);
plane.rotation.x = -Math.PI / 3;
scene.add(plane);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0x00f2ff, 2);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

camera.position.z = 5;

// Mouse Interaction
let mouseX = 0;
let mouseY = 0;
window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) - 0.5;
    mouseY = (e.clientY / window.innerHeight) - 0.5;
});

// Animation Loop
const clock = new THREE.Clock();

function animate() {
    const elapsedTime = clock.getElapsedTime();

    // Liquid Wave Distortion
    const positions = plane.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        
        // Apply wave motion
        positions[i + 2] = Math.sin(x * 0.5 + elapsedTime) * 0.5 + 
                           Math.cos(y * 0.3 + elapsedTime) * 0.3;
    }
    plane.geometry.attributes.position.needsUpdate = true;

    // React to mouse
    plane.rotation.z = mouseX * 0.1;
    plane.rotation.y = mouseY * 0.1;

    // Sync with scroll (Camera movement)
    const scrollY = window.scrollY;
    camera.position.y = -scrollY * 0.002;
    camera.rotation.z = scrollY * 0.0001;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();

// Resize handling
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
