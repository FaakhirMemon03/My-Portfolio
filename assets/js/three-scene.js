/**
 * Three.js Cinematic Background Scene
 * Ultimate "Plexus / Neural Network" Developer Aesthetic
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

// --- NEURAL NETWORK / PLEXUS SETTINGS ---
const particleCount = 400; // Optimal balance between density and 60fps performance
const maxDistance = 4.0;   // Max distance to form a connection line
const maxConnections = 8;  // Max connections per node

const particles = new THREE.BufferGeometry();
const particlePositions = new Float32Array(particleCount * 3);
const particleVelocities = [];

// Initialize particles with random positions and velocities
for (let i = 0; i < particleCount; i++) {
    const x = (Math.random() - 0.5) * 40;
    const y = (Math.random() - 0.5) * 40;
    const z = (Math.random() - 0.5) * 20 - 5; 

    particlePositions[i * 3] = x;
    particlePositions[i * 3 + 1] = y;
    particlePositions[i * 3 + 2] = z;

    particleVelocities.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02
    });
}

particles.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

// Particle Material (Glowing Nodes)
const pMaterial = new THREE.PointsMaterial({
    color: 0x00f2ff,
    size: 0.08,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending
});

const pointCloud = new THREE.Points(particles, pMaterial);
scene.add(pointCloud);

// --- LINES (Connections) ---
// Pre-allocate buffer geometry for lines
const linesGeometry = new THREE.BufferGeometry();
const maxLines = particleCount * maxConnections; 
const positions = new Float32Array(maxLines * 6); 
const colors = new Float32Array(maxLines * 6); 

linesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
linesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const linesMaterial = new THREE.LineBasicMaterial({
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 0.3
});

const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
scene.add(linesMesh);

// --- MOUSE INTERACTION ---
let mousePos = new THREE.Vector3(0, 0, 0);
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2(9999, 9999); // Off-screen initially
const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    // Project mouse 2D into 3D world space
    raycaster.setFromCamera(mouse, camera);
    raycaster.ray.intersectPlane(plane, mousePos);
});

// Camera positioning
camera.position.z = 10;

// --- ANIMATION LOOP ---
const colorBase = new THREE.Color(0x00f2ff); // Neon Cyan

function animate() {
    requestAnimationFrame(animate);
    
    let vertexpos = 0;
    let colorpos = 0;
    let numConnected = 0;

    const positionsArray = pointCloud.geometry.attributes.position.array;

    for (let i = 0; i < particleCount; i++) {
        // Move nodes
        positionsArray[i * 3] += particleVelocities[i].x;
        positionsArray[i * 3 + 1] += particleVelocities[i].y;
        positionsArray[i * 3 + 2] += particleVelocities[i].z;

        // Bounce off boundaries to keep them in view
        if (positionsArray[i * 3] > 20 || positionsArray[i * 3] < -20) particleVelocities[i].x *= -1;
        if (positionsArray[i * 3 + 1] > 20 || positionsArray[i * 3 + 1] < -20) particleVelocities[i].y *= -1;
        if (positionsArray[i * 3 + 2] > 5 || positionsArray[i * 3 + 2] < -15) particleVelocities[i].z *= -1;

        // Interactive Mouse Repulsion (Push nodes away softly like a magnetic field)
        let dxMouse = mousePos.x - positionsArray[i * 3];
        let dyMouse = mousePos.y - positionsArray[i * 3 + 1];
        let distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        
        if (distMouse < 5) {
            positionsArray[i * 3] -= dxMouse * 0.015;
            positionsArray[i * 3 + 1] -= dyMouse * 0.015;
        }

        // Calculate line connections based on proximity
        let connections = 0;

        for (let j = i + 1; j < particleCount; j++) {
            if (connections >= maxConnections) break;

            let dx = positionsArray[i * 3] - positionsArray[j * 3];
            let dy = positionsArray[i * 3 + 1] - positionsArray[j * 3 + 1];
            let dz = positionsArray[i * 3 + 2] - positionsArray[j * 3 + 2];
            let dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            // If close enough, draw a connecting line
            if (dist < maxDistance) {
                const alpha = 1.0 - (dist / maxDistance);

                // Start vertex
                positions[vertexpos++] = positionsArray[i * 3];
                positions[vertexpos++] = positionsArray[i * 3 + 1];
                positions[vertexpos++] = positionsArray[i * 3 + 2];
                
                colors[colorpos++] = colorBase.r * alpha;
                colors[colorpos++] = colorBase.g * alpha;
                colors[colorpos++] = colorBase.b * alpha;

                // End vertex
                positions[vertexpos++] = positionsArray[j * 3];
                positions[vertexpos++] = positionsArray[j * 3 + 1];
                positions[vertexpos++] = positionsArray[j * 3 + 2];
                
                colors[colorpos++] = colorBase.r * alpha;
                colors[colorpos++] = colorBase.g * alpha;
                colors[colorpos++] = colorBase.b * alpha;

                connections++;
                numConnected++;
            }
        }
    }

    // Update geometry buffers
    pointCloud.geometry.attributes.position.needsUpdate = true;
    
    linesMesh.geometry.setDrawRange(0, numConnected * 2);
    linesMesh.geometry.attributes.position.needsUpdate = true;
    linesMesh.geometry.attributes.color.needsUpdate = true;

    // Slow cinematic rotation of the entire network
    scene.rotation.y += 0.001;
    scene.rotation.x += 0.0005;

    // Camera Parallax based on scroll
    camera.position.y = -window.scrollY * 0.002;

    renderer.render(scene, camera);
}

animate();

// --- RESIZE HANDLING ---
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
