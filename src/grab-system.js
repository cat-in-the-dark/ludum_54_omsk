// Configuration for the MutationObserver used to refresh the whitelist.
// Listens for addition/removal of elements and attributes within the scene.
const OBSERVER_CONFIG = {
  childList: true,
  attributes: true,
  subtree: true,
};

const HAND_SIZE = {
  width: 0.1,
  height: 0.1,
  depth: 0.1,
};

const tmpHandVec3 = new THREE.Vector3();
const tmpBoxVec3 = new THREE.Vector3();
function isColliding(box, hand) {
  // console.log(box, hand);
  hand.object3D.getWorldPosition(tmpHandVec3);
  box.object3D.getWorldPosition(tmpBoxVec3);
  // const dist = tmpHandVec3.distanceTo(tmpBoxVec3);
  const { width, height, depth } = box.components.geometry.data;

  return (
    Math.abs(tmpHandVec3.x - tmpBoxVec3.x) <= (HAND_SIZE.width + width) / 2.0 &&
    Math.abs(tmpHandVec3.y - tmpBoxVec3.y) <=
      (HAND_SIZE.height + height) / 2.0 &&
    Math.abs(tmpHandVec3.z - tmpBoxVec3.z) <= (HAND_SIZE.depth + depth) / 2.0
  );
}

AFRAME.registerSystem("grabbing", {
  init() {
    this.hands = [];
    this.boxes = [];

    this.prevCheckTime = 0;
    this.interval = 80;
    this.setDirty = this.setDirty.bind(this);
    this.observer = new MutationObserver(this.setDirty);
    this.dirty = true;
  },

  registerBox(box) {
    this.boxes.push(box);
  },

  unregisterBox(box) {
    // TODO: why O(n)? maybe Map?
    const index = this.boxes.indexOf(box);
    this.boxes.splice(index, 1);
  },

  registerHand(hand) {
    this.hands.push(hand);
  },

  unregisterHand(hand) {
    // TODO: why O(n)? maybe Map?
    const index = this.hands.indexOf(hand);
    this.hands.splice(index, 1);
  },

  play() {
    this.observer.observe(this.el.sceneEl, OBSERVER_CONFIG);
    this.el.sceneEl.addEventListener("object3dset", this.setDirty);
    this.el.sceneEl.addEventListener("object3dremove", this.setDirty);
  },

  pause() {
    this.observer.disconnect();
    this.el.sceneEl.removeEventListener("object3dset", this.setDirty);
    this.el.sceneEl.removeEventListener("object3dremove", this.setDirty);
  },

  refreshObjects() {
    this.objectEls = this.el.sceneEl.querySelectorAll(".grab-box");
    this.dirty = false;
    console.log("refresh");
  },

  setDirty() {
    this.dirty = true;
  },

  tick(time) {
    const prevCheckTime = this.prevCheckTime;
    // Only check for intersection if interval time has passed.
    if (time - prevCheckTime < this.interval) {
      return;
    }
    // Update check time.
    this.prevCheckTime = time;

    if (this.dirty) {
      this.refreshObjects();
    }

    this.hands.forEach((hand) => {
      hand.components.hand.collider = undefined;
      this.boxes.forEach((box) => {
        const c = isColliding(box, hand);
        if (c) {
          hand.emit("collisionEnter", { collider: box }, false);
          hand.components.hand.collider = box;
          box.setAttribute("color", "#EF2D5E");
        } else {
          box.setAttribute("color", "#4CC3D9");
        }
      });
    });
  },
});
