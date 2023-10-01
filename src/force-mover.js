AFRAME.registerComponent("force-mover", {
  dependencies: ["position"],
  init() {
    this.targetY = undefined;
    this.speed = 2;
  },

  scheduleMoveDown() {
    const pos = this.el.getAttribute("position");
    this.targetY = pos.y - CELL_SIZE;
  },

  tick(time, dt) {
    if (this.targetY !== undefined) {
      const pos = AFRAME.utils.clone(this.el.getAttribute("position"));
      pos.y -= this.speed * (dt / 1000);

      if (pos.y <= this.targetY) {
        pos.y = this.targetY;
        this.targetY = undefined;
      }

      this.el.setAttribute("position", pos);
    }
  },
});
