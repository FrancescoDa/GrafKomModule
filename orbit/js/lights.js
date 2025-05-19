// js/lights.js
import * as THREE from "three";

export function createLights() {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Kurangi sedikit intensitas ambient
  // agar bayangan lebih terlihat

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8); // Intensitas bisa disesuaikan
  directionalLight.position.set(5, 10, 7.5);

  // Aktifkan bayangan untuk directional light
  directionalLight.castShadow = true;

  // Konfigurasi properti bayangan (opsional tapi seringkali diperlukan untuk kualitas)
  directionalLight.shadow.mapSize.width = 2048; // Resolusi peta bayangan (lebih tinggi = lebih detail, lebih berat)
  directionalLight.shadow.mapSize.height = 2048;
  directionalLight.shadow.camera.near = 0.5; // Area kamera bayangan
  directionalLight.shadow.camera.far = 50;
  directionalLight.shadow.camera.left = -10;
  directionalLight.shadow.camera.right = 10;
  directionalLight.shadow.camera.top = 10;
  directionalLight.shadow.camera.bottom = -10;
  // directionalLight.shadow.bias = -0.0001; // Sesuaikan jika ada shadow acne

  // Opsional: Helper untuk memvisualisasikan kamera bayangan (untuk debugging)
  // const shadowCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
  // scene.add(shadowCameraHelper); // Anda perlu akses ke 'scene' di sini jika ingin menambahkannya

  return [ambientLight, directionalLight];
}
