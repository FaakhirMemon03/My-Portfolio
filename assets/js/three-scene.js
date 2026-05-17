/**
 * Three.js Cinematic Background Scene
 * Ultra-Premium "Developer Plexus & Floating Code Matrix" Aesthetic
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

// --- CAMERA & LIGHTING ---
camera.position.z = 8;
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

// --- 1. HOLOGRAPHIC COMPILER HUD (Rotating tech rings in center) ---
const hudGroup = new THREE.Group();
scene.add(hudGroup);

const ringGeo1 = new THREE.RingGeometry(2.0, 2.05, 64);
const ringGeo2 = new THREE.RingGeometry(2.15, 2.18, 32);
const ringGeo3 = new THREE.RingGeometry(1.7, 1.72, 4); // Tech diamond shape

const hudMaterial = new THREE.MeshBasicMaterial({
    color: 0x00f2ff,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.25,
    blending: THREE.AdditiveBlending
});

const ring1 = new THREE.Mesh(ringGeo1, hudMaterial);
const ring2 = new THREE.Mesh(ringGeo2, hudMaterial);
const ring3 = new THREE.Mesh(ringGeo3, hudMaterial);

hudGroup.add(ring1);
hudGroup.add(ring2);
hudGroup.add(ring3);

// Tilt HUD slightly for 3D look
hudGroup.rotation.x = Math.PI / 4;
hudGroup.rotation.y = Math.PI / 6;


// --- 2. FLOATING DEVELOPER CODE SYMBOLS ---
// We generate high-tech canvas textures with syntax keywords and symbols
const techWords = [
    'const', 'function', '=>', '{}', '</>', 'MERN', 
    'React', 'Node.js', 'GSAP', 'Three.js', 'PHP', 'API', 
    'async', 'await', 'git', 'JWT', 'Docker', '[],', 'let'
];

function createTextTexture(text) {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.fillStyle = 'rgba(0,0,0,0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Render text with futuristic glow
    ctx.font = 'bold 36px "Courier New", Courier, monospace';
    ctx.fillStyle = '#00f2ff';
    ctx.shadowColor = '#00f2ff';
    ctx.shadowBlur = 12;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
}

const floatingSprites = [];
const spriteGroup = new THREE.Group();
scene.add(spriteGroup);

techWords.forEach((word) => {
    const texture = createTextTexture(word);
    const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending
    });
    
    const sprite = new THREE.Sprite(material);
    sprite.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10
    );
    
    // Set scale based on text aspect ratio
    sprite.scale.set(2, 1, 1);
    
    spriteGroup.add(sprite);
    
    floatingSprites.push({
        mesh: sprite,
        velocity: new THREE.Vector3(
            (Math.random() - 0.5) * 0.006,
            (Math.random() - 0.5) * 0.006,
            (Math.random() - 0.5) * 0.004
        ),
        rotationSpeed: (Math.random() - 0.5) * 0.01
    });
});


// --- 3. DYNAMIC TECH PLEXUS CONSTELLATION NETWORK ---
const particleCount = 100;
const pGeometry = new THREE.BufferGeometry();
const particlePositions = new Float32Array(particleCount * 3);
const particleVelocities = [];

for (let i = 0; i < particleCount; i++) {
    particlePositions[i * 3] = (Math.random() - 0.5) * 20;
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    
    particleVelocities.push(new THREE.Vector3(
        (Math.random() - 0.5) * 0.015,
        (Math.random() - 0.5) * 0.015,
        (Math.random() - 0.5) * 0.01
    ));
}

pGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

// Custom cyber square points
const pMaterial = new THREE.PointsMaterial({
    size: 0.1,
    color: 0x00f2ff,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const plexusPoints = new THREE.Points(pGeometry, pMaterial);
scene.add(plexusPoints);

// Plexus lines
const maxLines = 400;
const linePositions = new Float32Array(maxLines * 6); // 2 points per line (6 coordinates)
const lineColors = new Float32Array(maxLines * 6);

const lineGeometry = new THREE.BufferGeometry();
lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

const lineMaterial = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.25,
    blending: THREE.AdditiveBlending,
    depthWrite: false
});

const plexusLines = new THREE.LineSegments(lineGeometry, lineMaterial);
scene.add(plexusLines);


// --- MOUSE INTERACTION ---
let mouse = new THREE.Vector2();
let targetMouse = new THREE.Vector2();
let mouse3D = new THREE.Vector3();

window.addEventListener('mousemove', (e) => {
    // Standardized coordinates
    targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
});


// --- ANIMATION LOOP ---
const clock = new THREE.Clock();

function animate() {
    const elapsedTime = clock.getElapsedTime();

    // Smooth mouse interpolation
    mouse.x += (targetMouse.x - mouse.x) * 0.05;
    mouse.y += (targetMouse.y - mouse.y) * 0.05;

    // Project mouse into 3D space
    mouse3D.set(mouse.x * 7, mouse.y * 5, 0);

    // 1. Rotate HUD Rings in opposing directions
    ring1.rotation.z = elapsedTime * 0.15;
    ring2.rotation.z = -elapsedTime * 0.25;
    ring3.rotation.z = elapsedTime * 0.4;
    
    hudGroup.rotation.x = Math.PI / 4 + mouse.y * 0.2;
    hudGroup.rotation.y = Math.PI / 6 + mouse.x * 0.2;

    // 2. Animate Floating Code Sprites
    floatingSprites.forEach((item) => {
        // Move
        item.mesh.position.add(item.velocity);
        
        // Boundaries reset
        if (Math.abs(item.mesh.position.x) > 12) item.velocity.x *= -1;
        if (Math.abs(item.mesh.position.y) > 10) item.velocity.y *= -1;
        if (Math.abs(item.mesh.position.z) > 7) item.velocity.z *= -1;

        // Pulse size slightly
        const scaleVal = 1.8 + Math.sin(elapsedTime * 3 + item.mesh.position.x) * 0.2;
        item.mesh.scale.set(scaleVal, scaleVal / 2, 1);
        
        // Gentle rotation
        item.mesh.material.rotation += item.rotationSpeed;
    });

    // 3. Update Plexus Particle Positions
    const pos = plexusPoints.geometry.attributes.position.array;
    
    for (let i = 0; i < particleCount; i++) {
        let i3 = i * 3;
        
        // Apply velocity
        pos[i3] += particleVelocities[i].x;
        pos[i3 + 1] += particleVelocities[i].y;
        pos[i3 + 2] += particleVelocities[i].z;

        // Boundaries bounce
        if (Math.abs(pos[i3]) > 12) particleVelocities[i].x *= -1;
        if (Math.abs(pos[i3 + 1]) > 10) particleVelocities[i].y *= -1;
        if (Math.abs(pos[i3 + 2]) > 7) particleVelocities[i].z *= -1;

        // Mouse attraction/influence
        const dx = mouse3D.x - pos[i3];
        const dy = mouse3D.y - pos[i3 + 1];
        const distToMouse = Math.sqrt(dx * dx + dy * dy);
        
        if (distToMouse < 3.5) {
            // Attract gently to mouse
            pos[i3] += dx * 0.003;
            pos[i3 + 1] += dy * 0.003;
        }
    }
    plexusPoints.geometry.attributes.position.needsUpdate = true;

    // 4. Recalculate Plexus Constellation Connections
    const linePos = plexusLines.geometry.attributes.position.array;
    const lineCol = plexusLines.geometry.attributes.color.array;
    let lineIdx = 0;

    for (let i = 0; i < particleCount; i++) {
        let i3 = i * 3;
        let p1x = pos[i3];
        let p1y = pos[i3 + 1];
        let p1z = pos[i3 + 2];

        // Draw connections to nearby particles
        for (let j = i + 1; j < particleCount; j++) {
            let j3 = j * 3;
            let p2x = pos[j3];
            let p2y = pos[j3 + 1];
            let p2z = pos[j3 + 2];

            let dx = p1x - p2x;
            let dy = p1y - p2y;
            let dz = p1z - p2z;
            let dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            // Connect if close enough
            if (dist < 3.0 && lineIdx < maxLines) {
                let lIdx6 = lineIdx * 6;

                // Point 1
                linePos[lIdx6] = p1x;
                linePos[lIdx6 + 1] = p1y;
                linePos[lIdx6 + 2] = p1z;
                
                // Point 2
                linePos[lIdx6 + 3] = p2x;
                linePos[lIdx6 + 4] = p2y;
                linePos[lIdx6 + 5] = p2z;

                // Opacity based on distance
                const alpha = (1.0 - (dist / 3.0)) * 0.45;
                
                // Colors (glowing cyber cyan)
                lineCol[lIdx6] = 0; lineCol[lIdx6 + 1] = alpha; lineCol[lIdx6 + 2] = alpha;
                lineCol[lIdx6 + 3] = 0; lineCol[lIdx6 + 4] = alpha; lineCol[lIdx6 + 5] = alpha;

                lineIdx++;
            }
        }
        
        // Also connect particles dynamically to the interactive Mouse Super-Node
        let mdx = p1x - mouse3D.x;
        let mdy = p1y - mouse3D.y;
        let mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        
        if (mdist < 3.5 && lineIdx < maxLines) {
            let lIdx6 = lineIdx * 6;

            linePos[lIdx6] = p1x;
            linePos[lIdx6 + 1] = p1y;
            linePos[lIdx6 + 2] = p1z;
            
            linePos[lIdx6 + 3] = mouse3D.x;
            linePos[lIdx6 + 4] = mouse3D.y;
            linePos[lIdx6 + 5] = 0;

            const alpha = (1.0 - (mdist / 3.5)) * 0.7; // Brighter line to mouse
            
            lineCol[lIdx6] = 0; lineCol[lIdx6 + 1] = alpha; lineCol[lIdx6 + 2] = alpha;
            lineCol[lIdx6 + 3] = 0; lineCol[lIdx6 + 4] = alpha; lineCol[lIdx6 + 5] = alpha;

            lineIdx++;
        }
    }

    // Reset remaining unused line points to 0 opacity
    for (let k = lineIdx; k < maxLines; k++) {
        let k6 = k * 6;
        linePos[k6] = 0; linePos[k6+1] = 0; linePos[k6+2] = 0;
        linePos[k6+3] = 0; linePos[k6+4] = 0; linePos[k6+5] = 0;
        lineCol[k6] = 0; lineCol[k6+1] = 0; lineCol[k6+2] = 0;
        lineCol[k6+3] = 0; lineCol[k6+4] = 0; lineCol[k6+5] = 0;
    }

    plexusLines.geometry.attributes.position.needsUpdate = true;
    plexusLines.geometry.attributes.color.needsUpdate = true;

    // 5. Scroll Interaction (Parallax)
    const scrollY = window.scrollY;
    camera.position.y = -scrollY * 0.0035;
    
    // Smooth camera mouse parallax
    camera.position.x += (mouse.x * 0.8 - camera.position.x) * 0.05;

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
