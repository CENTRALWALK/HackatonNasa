
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true });

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

new THREE.TextureLoader().load("../img/background.jpeg", function (texture) {
    scene.background = texture;
})

renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new THREE.OrbitControls(camera, renderer.domElement)
controls.update();

const geometry = new THREE.SphereGeometry(5, 50, 50)
const textureImage = '../img/color.jpg';
const elevationMap = '../img/elevation.jpg';
const material = new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load(textureImage),
    displacementMap: new THREE.TextureLoader().load(elevationMap)
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

const color = 0xFFFFFF;
const intensity = 1;
const light = new THREE.AmbientLight(color, intensity);
scene.add(light);

const map = new THREE.TextureLoader().load( '../img/download.png' );
const mat = new THREE.SpriteMaterial( { map: map } );

const sprite = new THREE.Sprite( mat );

sphere.add( sprite );

camera.position.z = 15;


function animate() {

    controls.update();

    renderer.render(scene, camera);
    requestAnimationFrame(animate);

};

animate();
document.body.appendChild(renderer.domElement);
