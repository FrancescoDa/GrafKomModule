// js/objects.js
import * as THREE from "three";

// Fungsi ini sekarang menerima tekstur yang sudah dimuat (atau null jika gagal)
export function createAllObjects(texture) {
  const gameObjects = {};

  // === Lantai (Plane) ===
  const planeGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
  const planeMaterial = new THREE.MeshPhongMaterial({
    side: THREE.DoubleSide,
    shininess: 10,
  });

  if (texture) {
    const planeTexture = texture.clone(); // Penting untuk konfigurasi terpisah
    planeTexture.needsUpdate = true;
    planeTexture.wrapS = THREE.RepeatWrapping;
    planeTexture.wrapT = THREE.RepeatWrapping;
    planeTexture.repeat.set(10, 10);
    planeMaterial.map = planeTexture;
  } else {
    planeMaterial.color = new THREE.Color(0xaaaaaa); // Warna fallback
  }
  gameObjects.plane = new THREE.Mesh(planeGeometry, planeMaterial);
  gameObjects.plane.rotation.x = -Math.PI / 2;
  gameObjects.plane.position.y = -1.5;
  // gameObjects.plane.receiveShadow = true; // Jika menggunakan bayangan

  // === Kubus (Cube) ===
  const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
  const cubeMaterial = new THREE.MeshPhongMaterial({
    shininess: 30,
    emissive: 0x222222, // Warna emisi (abu-abu gelap agar tekstur tetap terlihat)
    // emissiveIntensity: 1, // Defaultnya 1
  });
  if (texture) {
    cubeMaterial.map = texture.clone(); // Clone jika ingin properti tekstur berbeda
    cubeMaterial.map.needsUpdate = true;
    // Jika ingin tekstur juga yang emit:
    // cubeMaterial.emissiveMap = texture.clone();
    // cubeMaterial.emissive = new THREE.Color(0xffffff); // Putihkan emissive agar emissiveMap bekerja penuh
  } else {
    cubeMaterial.color = new THREE.Color(0x00ff00); // Fallback
  }
  gameObjects.cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  gameObjects.cube.position.set(-3.5, -0.5, 0); // Sesuaikan posisi
  // gameObjects.cube.castShadow = true;

  // === Bola (Sphere) ===
  const sphereGeometry = new THREE.SphereGeometry(1.2, 32, 32);
  const sphereMaterial = new THREE.MeshPhongMaterial({
    shininess: 90,
    specular: 0xcccccc, // Warna kilap yang lebih jelas
  });
  if (texture) {
    sphereMaterial.map = texture.clone();
    sphereMaterial.map.needsUpdate = true;
  } else {
    sphereMaterial.color = new THREE.Color(0xff0000); // Fallback
  }
  gameObjects.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  gameObjects.sphere.position.set(0, -0.3, 0); // Sesuaikan posisi
  // gameObjects.sphere.castShadow = true;

  // === Piramida (Segitiga - Cone dengan 4 sisi) ===
  const pyramidGeometry = new THREE.ConeGeometry(1.5, 2.5, 4); // radius, height, segments
  const pyramidMaterial = new THREE.MeshPhongMaterial({
    shininess: 70,
    specular: 0xbbbbbb,
  });
  if (texture) {
    pyramidMaterial.map = texture.clone();
    pyramidMaterial.map.needsUpdate = true;
  } else {
    pyramidMaterial.color = new THREE.Color(0x0000ff); // Fallback
  }
  gameObjects.pyramid = new THREE.Mesh(pyramidGeometry, pyramidMaterial);
  gameObjects.pyramid.position.set(3.5, -0.25, 0); // Sesuaikan y agar alas pas
  // gameObjects.pyramid.castShadow = true;

  // Opsional: Simbol panah seperti di gambar referensi Anda
  const arrowGroup = new THREE.Group();
  const arrowMaterial = new THREE.MeshBasicMaterial({
    color: 0xffff00,
    wireframe: true,
    side: THREE.DoubleSide,
  });

  const topArrowGeo = new THREE.ConeGeometry(0.3, 0.5, 4);
  const topArrow = new THREE.Mesh(topArrowGeo, arrowMaterial);
  topArrow.position.y = 0.25; // Relative to group

  const bottomArrowGeo = new THREE.ConeGeometry(0.3, 0.5, 4);
  const bottomArrow = new THREE.Mesh(bottomArrowGeo, arrowMaterial);
  bottomArrow.rotation.x = Math.PI;
  bottomArrow.position.y = -0.25; // Relative to group

  arrowGroup.add(topArrow);
  arrowGroup.add(bottomArrow);
  arrowGroup.position.set(0, 4, 0); // Posisi grup panah di scene
  gameObjects.arrowGroup = arrowGroup;

  return gameObjects;
}
