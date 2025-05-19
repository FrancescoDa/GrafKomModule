// js/animation.js
export function startAnimationLoop(
  scene,
  camera,
  renderer,
  controls,
  gameObjects
) {
  function animate() {
    requestAnimationFrame(animate);

    controls.update(); // Penting untuk OrbitControls jika damping aktif

    // Opsional: Tambahkan animasi pada objek jika diinginkan
    // if (gameObjects && gameObjects.cube) {
    //   gameObjects.cube.rotation.x += 0.001;
    //   gameObjects.cube.rotation.y += 0.002;
    // }
    // if (gameObjects && gameObjects.sphere) {
    //   gameObjects.sphere.rotation.y -= 0.003;
    // }
    // if (gameObjects && gameObjects.pyramid) {
    //   gameObjects.pyramid.rotation.y += 0.001;
    // }
    // if (gameObjects && gameObjects.arrowGroup) {
    //   gameObjects.arrowGroup.rotation.y += 0.01;
    // }

    renderer.render(scene, camera);
  }
  animate(); // Mulai loop
}
