import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//canvas
const canvas = document.querySelector('canvas.webgl');
const canvasSize = {
    width: 800,
    height: 600
}
// scene
const scene = new THREE.Scene();

//camera
const camera = new THREE.PerspectiveCamera(75, canvasSize.width / canvasSize.height, 0.1, 1000);
scene.add(camera);
camera.position.z = 3;
// camera.position.x = 10;
// camera.position.y = 5;

//light
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

//renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
});
renderer.setSize(canvasSize.width, canvasSize.height);
// renderer.render(scene, camera);

//object
const objectPath = './public/model/scene.gltf';
let model;

// load hte model
const loader = new GLTFLoader();
loader.load(objectPath, 
  function(gltf) {
    model = gltf.scene;
    scene.add(model);
  },
  function(xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function(error) {
    console.error(error);
  }
);

// controls
const controls = new OrbitControls(camera, canvas);

function animate() {
  requestAnimationFrame(animate);
  if (model) {
    model.rotation.x += 0.01;
    // model.rotation.z += 0.01;
  }
  renderer.render(scene, camera);
}

animate();