const handPos = new THREE.Vector3();
const colPos = new THREE.Vector3();

AFRAME.registerComponent("hand", {
  init() {
    this.grabStart = this.grabStart.bind(this);
    this.grabEnd = this.grabEnd.bind(this);
    this.isGrabbing = false;
    this.collider = undefined;
    this.handling = undefined;

    this.el.addEventListener("gripdown", this.grabStart);
    this.el.addEventListener("gripup", this.grabEnd);

    console.log("REGISTER thumbstick-logging");

    this.el.sceneEl.systems.grabbing.registerHand(this.el);

    // когда хватаем объект, запоминаем расстояние между рукой и объектом,
    // чтобы сохранить относительное расстояние. Так не будет прыжка объекта в руку.
    this.posDiff = new THREE.Vector3(0, 0, 0);
  },

  grabStart(e) {
    if (this.isGrabbing === true) {
      return;
    }
    this.isGrabbing = true;
    if (!this.collider) {
      return;
    }
    const grabable = this.collider.components.grabable;
    if (grabable.isOnTop !== true) {
      return;
    }
    this.el.object3D.getWorldPosition(handPos);
    this.collider.object3D.getWorldPosition(colPos);

    this.posDiff.subVectors(colPos, handPos);
    this.handling = this.collider;
    grabable.grab();
  },
  grabEnd(e) {
    if (this.isGrabbing === true) {
      this.isGrabbing = false;
      if (this.handling) {
        this.handling.components.grabable.release();
      }
      this.handling = undefined;
    }
  },

  tick(time) {
    if (this.handling) {
      const bpos = this.handling.object3D.position;
      const hpos = this.el.object3D.position;
      bpos.x = hpos.x + this.posDiff.x;
      bpos.y = hpos.y + this.posDiff.y;
      bpos.z = hpos.z + this.posDiff.z;
    }
  },

  remove() {
    this.el.sceneEl.systems.grabbing.unregisterHand(this.el);
  },
});
