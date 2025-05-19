// js/camera.js
import * as THREE from "three";

export function createCamera() {
  const camera = new THREE.PerspectiveCamera(
    75, // fov
    window.innerWidth / window.innerHeight, // aspect (akan diupdate oleh resize handler)
    0.1, // near
    1000 // far
  );
  // Posisi awal diatur di main.js
  return camera;
}
