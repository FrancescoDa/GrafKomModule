// js/lights.js
import * as THREE from "three";

export function createLights() {
  // Kurangi intensitas ambient untuk bayangan yang lebih gelap
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.35); // Sebelumnya 0.5 atau 0.6

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9); // Tetap atau sedikit naikkan
  directionalLight.position.set(5, 10, 7.5);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 50;
  directionalLight.shadow.camera.left = -10;
  directionalLight.shadow.camera.right = 10;
  directionalLight.shadow.camera.top = 10;
  directionalLight.shadow.camera.bottom = -10;
  // directionalLight.shadow.bias = -0.0001;

  return [ambientLight, directionalLight];
}