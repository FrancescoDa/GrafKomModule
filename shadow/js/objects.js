// js/objects.js
import * as THREE from "three";

export function createAllObjects(texture) {
  const gameObjects = {};

  // === Lantai (Plane) ===
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
  gameObjects.plane.receiveShadow = true; // Lantai menerima bayangan

  // === Kubus (Cube) ===
  const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
  const cubeMaterial = new THREE.MeshPhongMaterial({
    shininess: 30,
    emissive: 0x222222,
  });
  if (texture) {
    cubeMaterial.map = texture.clone();
    cubeMaterial.map.needsUpdate = true;
  } else {
    cubeMaterial.color = new THREE.Color(0x00ff00);
  }
  gameObjects.cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  gameObjects.cube.position.set(-3.5, -0.5, 0);
  gameObjects.cube.castShadow = true; // Kubus menghasilkan bayangan
  gameObjects.cube.receiveShadow = false; // Biasanya objek solid tidak menerima bayangan pada dirinya sendiri dari sumber yang sama

  // === Bola (Sphere) ===
  const sphereGeometry = new THREE.SphereGeometry(1.2, 32, 32);
  const sphereMaterial = new THREE.MeshPhongMaterial({
    shininess: 90,
    specular: 0xcccccc,
  });
  if (texture) {
    sphereMaterial.map = texture.clone();
    sphereMaterial.map.needsUpdate = true;
  } else {
    sphereMaterial.color = new THREE.Color(0xff0000);
  }
  gameObjects.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  gameObjects.sphere.position.set(0, -0.3, 0);
  gameObjects.sphere.castShadow = true; // Bola menghasilkan bayangan
  gameObjects.sphere.receiveShadow = false;

  // === Piramida (Segitiga - Cone dengan 4 sisi) ===
  const pyramidGeometry = new THREE.ConeGeometry(1.5, 2.5, 4);
  const pyramidMaterial = new THREE.MeshPhongMaterial({
    shininess: 70,
    specular: 0xbbbbbb,
  });
  if (texture) {
    pyramidMaterial.map = texture.clone();
    pyramidMaterial.map.needsUpdate = true;
  } else {
    pyramidMaterial.color = new THREE.Color(0x0000ff);
  }
  gameObjects.pyramid = new THREE.Mesh(pyramidGeometry, pyramidMaterial);
  gameObjects.pyramid.position.set(3.5, -0.25, 0);
  gameObjects.pyramid.castShadow = true; // Piramida menghasilkan bayangan
  gameObjects.pyramid.receiveShadow = false;

  // Opsional: Simbol panah
  const arrowGroup = new THREE.Group();
  const arrowMaterial = new THREE.MeshBasicMaterial({
    color: 0xffff00,
    wireframe: true,
    side: THREE.DoubleSide,
  });

  const topArrowGeo = new THREE.ConeGeometry(0.3, 0.5, 4);
  const topArrow = new THREE.Mesh(topArrowGeo, arrowMaterial);
  topArrow.position.y = 0.25;
  topArrow.castShadow = true; // Panah juga bisa menghasilkan bayangan tipis

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
