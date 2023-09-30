// Configuration for the MutationObserver used to refresh the whitelist.
// Listens for addition/removal of elements and attributes within the scene.
const OBSERVER_CONFIG = {
  childList: true,
  attributes: true,
  subtree: true,
};

const tempVector3 = new THREE.Vector3();
AFRAME.registerComponent("hands", {
  schema: {
    enabled: { default: true },
    interval: { default: 80 },
  },
  init() {
    this.prevCheckTime = 0;

    this.setDirty = this.setDirty.bind(this);
    this.observer = new MutationObserver(this.setDirty);
    this.dirty = true;

    this.grabStart = this.grabStart.bind(this);
    this.grabEnd = this.grabEnd.bind(this);
    this.isGrabbing = false;

    this.el.addEventListener("gripdown", this.grabStart);
    this.el.addEventListener("gripup", this.grabEnd);

    console.log("REGISTER thumbstick-logging");
  },
  grabStart(e) {
    if (this.isGrabbing === false) {
      this.isGrabbing = true;
      this.el.object3D.getWorldPosition(tempVector3);
      console.log("GRAB", this.el, tempVector3);
    }
  },
  grabEnd(e) {
    if (this.isGrabbing === true) {
      this.isGrabbing = false;
      this.el.object3D.getWorldPosition(tempVector3);
      console.log("RELEASE", tempVector3);
    }
  },

  setDirty() {
    this.dirty = true;
  },

  play() {
    this.observer.observe(this.el.sceneEl, OBSERVER_CONFIG);
    this.el.sceneEl.addEventListener("object3dset", this.setDirty);
    this.el.sceneEl.addEventListener("object3dremove", this.setDirty);
  },

  remove() {
    this.observer.disconnect();
    this.el.sceneEl.removeEventListener("object3dset", this.setDirty);
    this.el.sceneEl.removeEventListener("object3dremove", this.setDirty);
  },

  refreshObjects() {
    this.objectEls = this.el.sceneEl.querySelectorAll(".grab-box");
    this.dirty = false;
  },

  tick(time) {
    const prevCheckTime = this.prevCheckTime;
    // Only check for intersection if interval time has passed.
    if (time - prevCheckTime < this.data.interval) {
      return;
    }
    // Update check time.
    this.prevCheckTime = time;

    if (this.dirty) {
      this.refreshObjects();
    }

    // console.log("BUM");
  },
});
