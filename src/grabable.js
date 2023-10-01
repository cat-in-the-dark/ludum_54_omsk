AFRAME.registerComponent("grabable", {
  init() {
    this.el.sceneEl.systems.grabbing.registerBox(this.el);
    console.log("BB");
  },
  remove() {
    this.el.sceneEl.systems.grabbing.unregisterBox(this.el);
  },
});
