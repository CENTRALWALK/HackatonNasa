var csvList;

// $.ajax({
//     url: 'mything.php',
//     success: function(data) {
//         csvList = data;
//     }
// });

csvList = [48, 35, 17.3]

function calcPosFromLatLonRad(lat,lon,radius){
  
    var phi = (90-lat)*(Math.PI/180);
    var theta = (lon+180)*(Math.PI/180);

    var x = -(radius * Math.sin(phi)*Math.cos(theta));
    var z = (radius * Math.sin(phi)*Math.sin(theta));
    var y = (radius * Math.cos(phi));
  
    return [x,y,z];

}

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true });

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

new THREE.TextureLoader().load("../img/background.jpeg", function (texture) {
    scene.background = texture;
})

renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new THREE.OrbitControls(camera, renderer.domElement)
controls.update();

const geometry = new THREE.SphereGeometry(17.3, 50, 50)
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


const geometryCylinder = new THREE.CylinderGeometry( 0.05, 0.05, 7, 64 );
const materialCylinder = new THREE.MeshBasicMaterial( {color: 0x61357f} );
const cylinder = new THREE.Mesh( geometryCylinder, materialCylinder );

var positions = calcPosFromLatLonRad(csvList[0], csvList[1], csvList[2]);

cylinder.position.x = positions[0];
cylinder.position.y = positions[1];
cylinder.position.z = positions[2];

camera.position.z = 50;

sphere.add(cylinder)

function animate() {

    controls.update();

    renderer.render(scene, camera);
    requestAnimationFrame(animate);

};

animate();
document.body.appendChild(renderer.domElement);
