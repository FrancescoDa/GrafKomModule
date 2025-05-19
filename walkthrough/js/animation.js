// js/animation.js
import * as THREE from "three";

export function startAnimationLoop(
  scene,
  camera,
  renderer,
  controls,
  gameObjects,
  keyboardState,
  moveSpeed,
  fastMoveSpeedMultiplier
) {
  const clock = new THREE.Clock();

  // Definisikan ketinggian minimum kamera dari tanah (sesuaikan dengan kebutuhan Anda)
  // Ini adalah jarak vertikal dari 'groundLevel' ke posisi kamera.
  const cameraMinHeightAboveGround = 1.0; // Misalnya, setinggi 1 unit di atas tanah

  // Dapatkan level tanah. Jika plane Anda tidak selalu ada atau posisinya bisa berubah,
  // Anda mungkin perlu cara yang lebih dinamis untuk mendapatkan ini.
  // Untuk saat ini, kita asumsikan plane ada dan posisinya konstan.
  const groundLevel = gameObjects.plane ? gameObjects.plane.position.y : -1.5; // Default jika plane tidak ada

  function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();

    controls.update(); // Update OrbitControls terlebih dahulu

    // --- Logika Pergerakan Kamera WASD ---
    const currentMoveSpeed = keyboardState.Shift
      ? moveSpeed * fastMoveSpeedMultiplier
      : moveSpeed;
    const actualMoveSpeed = currentMoveSpeed * delta * 60;

    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    // Jika Anda ingin gerakan W/S hanya horizontal (tidak terbang/tenggelam karena pitch kamera):
    // forward.y = 0;
    // forward.normalize();

    const right = new THREE.Vector3();
    right.crossVectors(camera.up, forward).normalize();

    let moved = false; // Flag untuk menandai apakah kamera bergerak karena WASD

    if (keyboardState.W) {
      camera.position.addScaledVector(forward, actualMoveSpeed);
      controls.target.addScaledVector(forward, actualMoveSpeed);
      moved = true;
    }
    if (keyboardState.S) {
      camera.position.addScaledVector(forward, -actualMoveSpeed);
      controls.target.addScaledVector(forward, -actualMoveSpeed);
      moved = true;
    }
    if (keyboardState.A) {
      camera.position.addScaledVector(right, -actualMoveSpeed);
      controls.target.addScaledVector(right, -actualMoveSpeed);
      moved = true;
    }
    if (keyboardState.D) {
      camera.position.addScaledVector(right, actualMoveSpeed);
      controls.target.addScaledVector(right, actualMoveSpeed);
      moved = true;
    }

    // --- Batasi Posisi Y Kamera agar Tetap di Atas Tanah ---
    // Batas ini diterapkan SETELAH OrbitControls.update() dan pergerakan WASD
    const targetMinCameraY = groundLevel + cameraMinHeightAboveGround;

    if (camera.position.y < targetMinCameraY) {
      const diffY = targetMinCameraY - camera.position.y;
      camera.position.y = targetMinCameraY;

      // Jika kamera dipaksa naik, target OrbitControls juga harus disesuaikan
      // agar orbit tidak terasa "melompat" atau aneh.
      // Kita hanya sesuaikan Y targetnya.
      if (
        controls.target.y <
          targetMinCameraY - cameraMinHeightAboveGround * 0.5 ||
        moved
      ) {
        // 0.5 adalah contoh, agar target tidak terlalu tinggi
        controls.target.y += diffY; // Naikkan target sebanyak kamera dinaikkan
      }
    }

    renderer.render(scene, camera);
  }
  animate();
}
