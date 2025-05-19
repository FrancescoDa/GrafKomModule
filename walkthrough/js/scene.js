// js/scene.js
import * as THREE from "three";

export function createScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x777788); // Latar belakang abu-abu kebiruan
  return scene;
}
