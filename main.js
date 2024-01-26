import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitalControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls.OrbitalControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let objects;
let controls;
let objtoRender = 'obj';

const loader = new GLTFLoader();

loader.load(
	'models/${objtoRender}/scene.gltf',
	function (gltf) {
		object = gltf.scene;
		scene.add(object);
	},
	function (xhr) {
		console.log((xhr.loaded / xhr.total * 100) + '% loaded');
	},
	function (error) {
		console.error(error);
	}
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

document.getElementById("container3D").appendChild(renderer.domElement);
camera.position.z = objtoRender == "dino" ? 25 : 500;

const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, objtoRender == "dino" ? 5 : 1);
scene.add(ambientLight);

function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
};

window.addEventListener("resize", function(){
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();