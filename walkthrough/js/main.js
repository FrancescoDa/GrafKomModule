// js/main.js
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { createScene } from "./scene.js";
import { createCamera } from "./camera.js";
import { createRenderer } from "./renderer.js";
import { createLights } from "./lights.js";
import { createAllObjects } from "./objects.js";
import { setupResizeHandler } from "./resize.js";
import { startAnimationLoop } from "./animation.js";

const canvas = document.getElementById("three-canvas");
if (!canvas) {
  console.error("Elemen canvas dengan id 'three-canvas' tidak ditemukan.");
} else {
  const scene = createScene();
  const camera = createCamera();
  camera.position.set(5, 4, 8);

  const renderer = createRenderer(canvas);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enableZoom = false; // MENONAKTIFKAN FUNGSI ZOOM BAWAAN ORBITCONTROLS

  const lights = createLights();
  lights.forEach((light) => scene.add(light));

  setupResizeHandler(camera, renderer);

  // --- State untuk pergerakan WASD ---
  const keyboardState = {
    W: false,
    A: false,
    S: false,
    D: false,
    Shift: false, // Untuk mempercepat gerakan (opsional)
  };
  const moveSpeed = 0.1; // Kecepatan dasar pergerakan
  const fastMoveSpeedMultiplier = 2.5; // Pengali kecepatan saat Shift ditekan

  // --- Event Listeners untuk Keyboard ---
  document.addEventListener("keydown", (event) => {
    switch (event.code) {
      case "KeyW":
        keyboardState.W = true;
        break;
      case "KeyA":
        keyboardState.A = true;
        break;
      case "KeyS":
        keyboardState.S = true;
        break;
      case "KeyD":
        keyboardState.D = true;
        break;
      case "ShiftLeft":
      case "ShiftRight":
        keyboardState.Shift = true;
        break;
    }
  });

  document.addEventListener("keyup", (event) => {
    switch (event.code) {
      case "KeyW":
        keyboardState.W = false;
        break;
      case "KeyA":
        keyboardState.A = false;
        break;
      case "KeyS":
        keyboardState.S = false;
        break;
      case "KeyD":
        keyboardState.D = false;
        break;
      case "ShiftLeft":
      case "ShiftRight":
        keyboardState.Shift = false;
        break;
    }
  });

  const textureLoader = new THREE.TextureLoader();
  const TEXTURE_URL =
    "https://threejs.org/examples/textures/uv_grid_opengl.jpg";

  textureLoader.load(
    TEXTURE_URL,
    (loadedTexture) => {
      console.log("Tekstur berhasil dimuat.");
      const gameObjects = createAllObjects(loadedTexture);
      scene.add(gameObjects.plane);
      scene.add(gameObjects.cube);
      scene.add(gameObjects.sphere);
      scene.add(gameObjects.pyramid);
      if (gameObjects.arrowGroup) scene.add(gameObjects.arrowGroup);

      // Kirim keyboardState ke loop animasi
      startAnimationLoop(
        scene,
        camera,
        renderer,
        controls,
        gameObjects,
        keyboardState,
        moveSpeed,
        fastMoveSpeedMultiplier
      );
    },
    undefined,
    (err) => {
      console.error("Gagal memuat tekstur:", err);
      const gameObjects = createAllObjects(null);
      scene.add(gameObjects.plane);
      scene.add(gameObjects.cube);
      scene.add(gameObjects.sphere);
      scene.add(gameObjects.pyramid);
      if (gameObjects.arrowGroup) scene.add(gameObjects.arrowGroup);

      startAnimationLoop(
        scene,
        camera,
        renderer,
        controls,
        gameObjects,
        keyboardState,
        moveSpeed,
        fastMoveSpeedMultiplier
      );
    }
  );
}
