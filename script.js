
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// Adjust the camera position
camera.position.z = 5;
// Material for petals
const petalMaterial = new THREE.MeshPhongMaterial({ color: 0xff69b4, shininess: 100 });
const petalGeometry = new THREE.ConeGeometry(0.3, 1, 32);

// Create petals in a circular pattern
const petals = [];
for (let i = 0; i < 8; i++) {
  const petal = new THREE.Mesh(petalGeometry, petalMaterial);
  petal.rotation.x = Math.PI / 2;
  petal.position.set(Math.cos((i / 8) * Math.PI * 2) * 1.5, Math.sin((i / 8) * Math.PI * 2) * 1.5, 0);
  petal.rotation.z = (i / 8) * Math.PI * 2;
  petals.push(petal);
  scene.add(petal);
}

// Center of the flower
const centerMaterial = new THREE.MeshPhongMaterial({ color: 0xffd700 });
const center = new THREE.Mesh(new THREE.SphereGeometry(0.3, 32, 32), centerMaterial);
scene.add(center);
// Add light to make the flower visible
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(5, 5, 5);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040, 0.5); // Soft ambient light
scene.add(ambientLight);
function animate() {
  requestAnimationFrame(animate);

  // Rotate the flower for animation
  petals.forEach((petal, index) => {
    petal.rotation.y += 0.01; // Rotate petals slightly
  });

  center.rotation.y += 0.02; // Rotate the flower center
  renderer.render(scene, camera);
}
animate();
