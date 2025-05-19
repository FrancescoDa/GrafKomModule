// js/lights.js
import * as THREE from "three";

export function createLights() {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // Cahaya ambient lembut

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9); // Cahaya utama
  directionalLight.position.set(5, 10, 7.5);
  // Opsional: Mengaktifkan bayangan untuk directional light
  // directionalLight.castShadow = true;
  // directionalLight.shadow.mapSize.width = 1024;
  // directionalLight.shadow.mapSize.height = 1024;

  return [ambientLight, directionalLight];
}
