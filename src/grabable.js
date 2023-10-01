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
    speed: { type: "number", default: 0.6 },
  },

  init() {
    this.gameplay = this.el.sceneEl.systems.gameplay;
    this.isOnTop = false;
    this.grounded = false;
    this.el.sceneEl.systems.grabbing.registerBox(this.el);
    this.el.sceneEl.systems.gameplay.registerCube(this.el);
  },
  remove() {
    this.el.sceneEl.systems.grabbing.unregisterBox(this.el);
    this.el.sceneEl.systems.gameplay.unregisterCube(this.el);
  },

  grab() {
    this.el.setAttribute("grabbing", "true");
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

  isOnTop() {
    const pos = this.el.getAttribute("position");
    const cellX = Math.round(pos.x / SNAP.x);
    const column = this.gameplay.columns[cellX];
    if (!column) {
      return false;
    }
    return column[column.length - 1] === this;
  },
});
