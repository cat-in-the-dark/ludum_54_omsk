import {
  Color,
  DirectionalLight,
  HemisphereLight,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";
import { VRButton } from "three/examples/jsm/webxr/VRButton.js";

// const clock = new Clock();

const container = document.createElement("div");
document.body.appendChild(container);

const scene = new Scene();
scene.background = new Color(0x444444);

const camera = new PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  10
);
camera.position.set(0, 1.2, 0.3);

scene.add(new HemisphereLight(0xcccccc, 0x999999, 3));

const light = new DirectionalLight(0xffffff, 3);
light.position.set(0, 6, 0);
light.castShadow = true;
light.shadow.camera.top = 2;
light.shadow.camera.bottom = -2;
light.shadow.camera.right = 2;
light.shadow.camera.left = -2;
light.shadow.mapSize.set(4096, 4096);
scene.add(light);

const renderer = new WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.xr.enabled = true;
renderer.xr.cameraAutoUpdate = false;

container.appendChild(renderer.domElement);

document.body.appendChild(VRButton.createButton(renderer));

const controller1 = renderer.xr.getController(0);
scene.add(controller1);

const controller2 = renderer.xr.getController(1);
scene.add(controller2);

function render() {
  // const delta = clock.getDelta();
  // const elapsedTime = clock.elapsedTime;
  renderer.xr.updateCamera(camera);
  // world.execute(delta, elapsedTime);
  renderer.render(scene, camera);
}

function animate() {
  renderer.setAnimationLoop(render);
}

animate();
