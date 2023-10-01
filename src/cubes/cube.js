/* eslint-disable no-undef */
AFRAME.registerComponent("cube", {
  schema: {
    minY: { type: "number", default: 0.5 },
  },
  init() {
    this.lastUpdate = 0;
  },
  tick() {
    this.lastUpdate++;
    if (this.lastUpdate > 20) {
      lastUpdate = 0;
      if (this.el.object3D.position.y - 0.05 > this.data.minY) {
        this.el.object3D.position.set(
          this.el.object3D.position.x,
          this.el.object3D.position.y - 0.05,
          this.el.object3D.position.z
        );
      }
    }
  },
});
