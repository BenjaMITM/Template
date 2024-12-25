// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("scene-container").appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// Spiral parameters
const spiralRadius = 5; // Radius of the spiral
const spiralTurns = 8; // Number of turns
const segments = 360 * spiralTurns; // Total segments

// Create a flat spiral path
const spiralPath = new THREE.Curve();
spiralPath.getPoint = function(t) {
    const angle = t * Math.PI * 2 * spiralTurns; // Angle based on turns
    const radius = spiralRadius * (1 - t); // Radius decreases as t increases
    const x = Math.cos(angle) * radius; // X position
    const y = Math.sin(angle) * radius; // Y position
    const z = 0; // Flat spiral (no Z variation)
    return new THREE.Vector3(x, y, z);
};

// Tube Geometry for the spiral
const tubeGeometry = new THREE.TubeGeometry(
    spiralPath, // Path
    segments, // Number of segments
    0.1, // Radius of the tube (thickness of the spiral)
    32, // Radial segments
    false // Closed or open
);

// Material for spiral
const material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    shininess: 100,
    side: THREE.DoubleSide,
});

// Mesh
const spiralMesh = new THREE.Mesh(tubeGeometry, material);
scene.add(spiralMesh);

// Camera position
camera.position.z = 10; // Move camera closer to the spiral
camera.lookAt(scene.position); // Look at the center of the scene

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate the spiral around the Z-axis
    spiralMesh.rotation.z += 0.01;

    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start animation
animate();