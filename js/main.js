// js/main.js
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { createScene } from "./scene.js";
import { createCamera } from "./camera.js";
import { createRenderer } from "./renderer.js";
import { createLights } from "./lights.js";
import { createAllObjects } from "./objects.js"; // createAllObjects akan menerima tekstur
import { setupResizeHandler } from "./resize.js";
import { startAnimationLoop } from "./animation.js";

const canvas = document.getElementById("three-canvas");
if (!canvas) {
  console.error("Elemen canvas dengan id 'three-canvas' tidak ditemukan.");
} else {
  // Setup dasar
  const scene = createScene();
  const camera = createCamera();
  camera.position.set(5, 4, 8); // Sesuaikan posisi awal kamera agar mirip contoh sebelumnya
  // scene.add(camera); // Kamera tidak perlu ditambahkan ke scene secara eksplisit

  const renderer = createRenderer(canvas);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  // controls.maxPolarAngle = Math.PI / 2 - 0.05; // Opsional: Batasi agar tidak melihat dari bawah

  const lights = createLights();
  lights.forEach((light) => scene.add(light));

  setupResizeHandler(camera, renderer);

  // --- Texture Loading ---
  const textureLoader = new THREE.TextureLoader();
  // GANTI DENGAN URL TEKSTUR ANDA atau biarkan untuk UV Grid
  const TEXTURE_URL =
    "https://threejs.org/examples/textures/uv_grid_opengl.jpg";

  textureLoader.load(
    // TEXTURE_URL,
    // Success callback
    (loadedTexture) => {
      console.log("Tekstur berhasil dimuat.");
      // Buat objek setelah tekstur dimuat
      const gameObjects = createAllObjects(loadedTexture); // Kirim tekstur ke fungsi
      scene.add(gameObjects.plane);
      scene.add(gameObjects.cube);
      scene.add(gameObjects.sphere);
      scene.add(gameObjects.pyramid);
      // Tambahkan objek lain jika ada, misal: panah
      if (gameObjects.arrowGroup) scene.add(gameObjects.arrowGroup);

      // Mulai Loop Animasi setelah semuanya siap
      startAnimationLoop(scene, camera, renderer, controls, gameObjects);
    },
    // onProgress callback (opsional)
    undefined,
    // Error callback
    (err) => {
      console.error("Gagal memuat tekstur:", err);
      // Tetap buat objek dengan material fallback jika tekstur gagal
      const gameObjects = createAllObjects(null); // Kirim null sebagai indikasi tekstur gagal
      scene.add(gameObjects.plane);
      scene.add(gameObjects.cube);
      scene.add(gameObjects.sphere);
      scene.add(gameObjects.pyramid);
      if (gameObjects.arrowGroup) scene.add(gameObjects.arrowGroup);

      startAnimationLoop(scene, camera, renderer, controls, gameObjects);
    }
  );
}
