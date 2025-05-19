// js/animation.js
// Impor THREE untuk Vector3 jika belum
// (atau pastikan THREE tersedia secara global jika Anda tidak menggunakan modul secara ketat)
// Jika Anda mengimpor * as THREE from 'three'; di main.js, Anda mungkin perlu
// melewatkan THREE atau THREE.Vector3 ke fungsi ini jika tidak bisa diakses.
// Namun, karena THREE sudah diimpor di main.js, biasanya ia akan tersedia.
// Jika error, Anda bisa mengimpornya di sini juga:
import * as THREE from "three";


export function startAnimationLoop(
    scene,
    camera,
    renderer,
    controls,
    gameObjects,
    keyboardState, // Parameter baru
    moveSpeed, // Parameter baru
    fastMoveSpeedMultiplier // Parameter baru
) {
  const clock = new THREE.Clock(); // Untuk delta time, gerakan lebih smooth

  function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta(); // Waktu sejak frame terakhir

    controls.update(); // Tetap update OrbitControls untuk damping dan orbit/pan

    // --- Logika Pergerakan Kamera WASD ---
    const currentMoveSpeed = keyboardState.Shift ? moveSpeed * fastMoveSpeedMultiplier : moveSpeed;
    const actualMoveSpeed = currentMoveSpeed * delta * 60; // Normalisasi kecepatan berdasarkan delta time (asumsi target 60FPS)


    // Vektor arah maju kamera (tanpa komponen Y agar tidak terbang/tenggelam saat W/S)
    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    // forward.y = 0; // Opsional: Proyeksikan ke bidang XZ jika tidak ingin terbang
    // forward.normalize(); // Normalisasi lagi setelah modifikasi Y

    // Vektor arah kanan kamera (diperoleh dari cross product UP dan forward)
    const right = new THREE.Vector3();
    right.crossVectors(camera.up, forward).normalize(); // Hati-hati dengan urutan cross product untuk arah kanan yang benar

    if (keyboardState.W) {
      // Bergerak maju relatif terhadap arah kamera
      camera.position.addScaledVector(forward, actualMoveSpeed);
      // Karena kita memindahkan kamera, target OrbitControls juga harus ikut bergerak
      // agar orbit tetap terasa relatif terhadap posisi baru.
      controls.target.addScaledVector(forward, actualMoveSpeed);
    }
    if (keyboardState.S) {
      // Bergerak mundur relatif terhadap arah kamera
      camera.position.addScaledVector(forward, -actualMoveSpeed);
      controls.target.addScaledVector(forward, -actualMoveSpeed);
    }
    if (keyboardState.A) {
      // Bergerak ke kiri relatif terhadap arah kamera
      // Pergerakan strafing, jadi kita gunakan vektor 'right'
      camera.position.addScaledVector(right, -actualMoveSpeed);
      controls.target.addScaledVector(right, -actualMoveSpeed);
    }
    if (keyboardState.D) {
      // Bergerak ke kanan relatif terhadap arah kamera
      camera.position.addScaledVector(right, actualMoveSpeed);
      controls.target.addScaledVector(right, actualMoveSpeed);
    }

    renderer.render(scene, camera);
  }
  animate();
}