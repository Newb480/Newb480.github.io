import * as THREE from 'three/build/three.module.js'
import { GLTFLoader } from 'three/jsm/loaders/GLTFLoader'

const scene: THREE.Scene = new THREE.Scene ()

const loader = new GLTFLoader ()
loader.load ('model/scene.gltf', function (gltf) {
    scene.add (gltf.scene);
    gltf.scene.position.set (0,-2,3)
}, (xhr) => {
    console.log ((xhr.loaded / xhr.total * 100) + '% loaded')
}, (error) => {
    console.log (error);
});

function render () {
    renderer.render (scene, camera)
}
