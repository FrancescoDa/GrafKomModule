// js/renderer.js
import * as THREE from "three";

export function createRenderer(canvasElement) {
  const renderer = new THREE.WebGLRenderer({
    canvas: canvasElement,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  // renderer.setPixelRatio(window.devicePixelRatio); // Untuk tampilan lebih tajam di layar HiDPI

  // Aktifkan shadow map pada renderer
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Jenis shadow map (opsional, untuk bayangan lebih halus)
  // Pilihan lain: THREE.BasicShadowMap, THREE.PCFShadowMap, THREE.VSMShadowMap

  return renderer;
}
