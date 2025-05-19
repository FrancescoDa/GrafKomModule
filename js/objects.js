// js/objects.js
import * as THREE from "three";

export function createAllObjects(texture) {
  const gameObjects = {};

  // === Lantai (Plane) ===
  // Biasanya lantai tidak perlu emissive, biarkan apa adanya
  const planeGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
  const planeMaterial = new THREE.MeshPhongMaterial({
    side: THREE.DoubleSide,
    shininess: 10,
  });
  if (texture) {
    const planeTexture = texture.clone();
    planeTexture.needsUpdate = true;
    planeTexture.wrapS = THREE.RepeatWrapping;
    planeTexture.wrapT = THREE.RepeatWrapping;
    planeTexture.repeat.set(10, 10);
    planeMaterial.map = planeTexture;
  } else {
    planeMaterial.color = new THREE.Color(0xaaaaaa);
  }
  gameObjects.plane = new THREE.Mesh(planeGeometry, planeMaterial);
  gameObjects.plane.rotation.x = -Math.PI / 2;
  gameObjects.plane.position.y = -1.5;
  gameObjects.plane.receiveShadow = true;

  // === Kubus (Cube) ===
  const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
  const cubeMaterial = new THREE.MeshPhongMaterial({
    shininess: 30,
    // Kurangi atau hilangkan emissive agar lebih bergantung pada cahaya
    emissive: 0x000000, // Sebelumnya 0x222222. Sekarang tidak memancarkan cahaya sendiri.
    // Atau nilai sangat kecil seperti 0x050505 jika ingin sedikit "fill"
  });
  if (texture) {
    cubeMaterial.map = texture.clone();
    cubeMaterial.map.needsUpdate = true;
    // Jika sebelumnya menggunakan emissiveMap, Anda mungkin ingin menyesuaikannya juga
    // atau menghapusnya jika ingin efek emissive hanya dari warna solid.
  } else {
    cubeMaterial.color = new THREE.Color(0x00ff00);
  }
  gameObjects.cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  gameObjects.cube.position.set(-3.5, -0.5, 0);
  gameObjects.cube.castShadow = true;

  // === Bola (Sphere) ===
  const sphereGeometry = new THREE.SphereGeometry(1.2, 32, 32);
  const sphereMaterial = new THREE.MeshPhongMaterial({
    shininess: 90, // Biarkan shininess tinggi untuk kilap
    specular: 0xcccccc,
    emissive: 0x000000, // Tidak ada emisi sendiri
  });
  if (texture) {
    sphereMaterial.map = texture.clone();
    sphereMaterial.map.needsUpdate = true;
  } else {
    sphereMaterial.color = new THREE.Color(0xff0000);
  }
  gameObjects.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  gameObjects.sphere.position.set(0, -0.3, 0);
  gameObjects.sphere.castShadow = true;

  // === Piramida (Segitiga - Cone dengan 4 sisi) ===
  const pyramidGeometry = new THREE.ConeGeometry(1.5, 2.5, 4);
  const pyramidMaterial = new THREE.MeshPhongMaterial({
    shininess: 70,
    specular: 0xbbbbbb,
    emissive: 0x000000, // Tidak ada emisi sendiri
  });
  if (texture) {
    pyramidMaterial.map = texture.clone();
    pyramidMaterial.map.needsUpdate = true;
  } else {
    pyramidMaterial.color = new THREE.Color(0x0000ff);
  }
  gameObjects.pyramid = new THREE.Mesh(pyramidGeometry, pyramidMaterial);
  gameObjects.pyramid.position.set(3.5, -0.25, 0);
  gameObjects.pyramid.castShadow = true;

  // Opsional: Simbol panah
  // MeshBasicMaterial tidak terpengaruh oleh cahaya, jadi 'emissive' tidak berlaku
  // Kecerahannya ditentukan oleh properti 'color' nya.
  const arrowGroup = new THREE.Group();
  const arrowMaterial = new THREE.MeshBasicMaterial({
    color: 0xffff00,
    wireframe: true,
    side: THREE.DoubleSide,
  });
  // ... (sisa kode arrowGroup tetap sama) ...
  const topArrowGeo = new THREE.ConeGeometry(0.3, 0.5, 4);
  const topArrow = new THREE.Mesh(topArrowGeo, arrowMaterial);
  topArrow.position.y = 0.25;
  topArrow.castShadow = true;

  const bottomArrowGeo = new THREE.ConeGeometry(0.3, 0.5, 4);
  const bottomArrow = new THREE.Mesh(bottomArrowGeo, arrowMaterial);
  bottomArrow.rotation.x = Math.PI;
  bottomArrow.position.y = -0.25;
  bottomArrow.castShadow = true;

  arrowGroup.add(topArrow);
  arrowGroup.add(bottomArrow);
  arrowGroup.position.set(0, 4, 0);
  gameObjects.arrowGroup = arrowGroup;

  return gameObjects;
}
