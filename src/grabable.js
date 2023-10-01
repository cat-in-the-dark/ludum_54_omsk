function clamp(v, l, r) {
  if (v < l) return l;
  if (v > r) return r;
  return v;
}

function getPosInGrid(pos) {
  const newPos = AFRAME.utils.clone(pos);
  const cellX = clamp(Math.round(pos.x / SNAP.x), 0, CELLS_X);
  const cellY = clamp(Math.round(pos.y / SNAP.y), 0, CELLS_Y);

  newPos.x = cellX * SNAP.x + OFFSET.x;
  newPos.y = cellY * SNAP.y + OFFSET.y;
  newPos.z = Z_CONSTRAINT;

  return newPos;
}

AFRAME.registerComponent("grabable", {
  dependencies: ["position"],

  schema: {
    grabbing: { type: "boolean", default: "false" },
  },

  init() {
    this.gameplay = this.el.sceneEl.systems.gameplay;
    this.grounded = false;
    this.isOnTop = false;
    this.el.sceneEl.systems.grabbing.registerBox(this.el);
    this.el.sceneEl.systems.gameplay.registerCube(this.el);
  },
  remove() {
    this.el.sceneEl.systems.grabbing.unregisterBox(this.el);
    this.el.sceneEl.systems.gameplay.unregisterCube(this.el);
  },

  grab() {
    this.el.setAttribute("grabbing", "true");
    this.gameplay.grab(this.el);
  },

  getCell() {
    const pos = this.el.getAttribute("position");
    return {
      x: Math.round(pos.x / SNAP.x),
      y: Math.round(pos.y / SNAP.y),
    };
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
