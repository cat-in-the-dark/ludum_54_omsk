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

  tick(time) {
    const prevCheckTime = this.prevCheckTime;
    // Only check for intersection if interval time has passed.
    if (time - prevCheckTime < this.interval) {
      return;
    }
    // Update check time.
    this.prevCheckTime = time;

    this.hands.forEach((hand) => {
      hand.components.hand.collider = undefined;
      this.boxes.forEach((box) => {
        const c = isColliding(box, hand);
        if (c) {
          hand.components.hand.collider = box;
          box.setAttribute("color", "#EF2D5E");
        } else {
          box.setAttribute("color", "#4CC3D9");
        }
      });
    });
  },
});
