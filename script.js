// Scene, Camera, and Renderer setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// Create Flower Petals
const petalsMaterial = new THREE.MeshPhongMaterial({ color: 0xff69b4, shininess: 100 });
const petalGeometry = new THREE.ConeGeometry(0.5, 1.5, 32);
const petals = [];

for (let i = 0; i < 8; i++) {
  const petal = new THREE.Mesh(petalGeometry, petalsMaterial);
  petal.rotation.z = Math.PI / 2;
  petal.position.set(Math.cos((i / 8) * Math.PI * 2) * 1.5, Math.sin((i / 8) * Math.PI * 2) * 1.5, 0);
  petal.rotation.y = (i / 8) * Math.PI * 2;
  scene.add(petal);
  petals.push(petal);
}

// Create Flower Center
const centerMaterial = new THREE.MeshPhongMaterial({ color: 0xffd700 });
const center = new THREE.Mesh(new THREE.SphereGeometry(0.4, 32, 32), centerMaterial);
scene.add(center);

// Lighting
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(5, 5, 5);
scene.add(light);

// Animation with GSAP
gsap.to(petals, {
  duration: 2,
  rotationY: "+=6.28", // Rotates petals
  repeat: -1,
  ease: "power1.inOut",
});

// Set Camera and Render Loop
camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
