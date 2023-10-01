const Z_CONSTRAINT = -0.5;
const OFFSET = THREE.Vector3(0, 0, 0);
const SNAP = THREE.Vector3(0.25, 0.25, 0.25);

function getPosInGrid(pos) {
  const newPos = AFRAME.utils.clone(pos);
  newPos.x = Math.round(pos.x / SNAP.x) * SNAP.x + OFFSET.x;
  newPos.y = Math.round(pos.y / SNAP.y) * SNAP.y + OFFSET.y;
  newPos.z = Z_CONSTRAINT;
  return newPos;
}

AFRAME.registerComponent("grabable", {
  dependencies: ["position"],

  schema: {
    grabbing: { type: "boolean", default: "false" },
  },

  init() {
    this.el.sceneEl.systems.grabbing.registerBox(this.el);
  },
  remove() {
    this.el.sceneEl.systems.grabbing.unregisterBox(this.el);
  },

  grab() {
    this.el.setAttribute("grabbing", "true");
  },

  release() {
    this.el.setAttribute("grabbing", "false");
    this.doSnap();
  },

  doSnap() {
    const pos = this.el.getAttribute("position");
    const newPos = getPosInGrid(pos);
    this.el.setAttribute("position", newPos);
  },
});
