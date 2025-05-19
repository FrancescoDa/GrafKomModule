// js/renderer.js
import * as THREE from "three";

export function createRenderer(canvasElement) {
  const renderer = new THREE.WebGLRenderer({
    canvas: canvasElement,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  // renderer.setPixelRatio(window.devicePixelRatio); // Untuk tampilan lebih tajam di layar HiDPI
  return renderer;
}
