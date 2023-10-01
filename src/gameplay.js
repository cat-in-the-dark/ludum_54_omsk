AFRAME.registerSystem("gameplay", {
  init() {
    this.cubes = [];
    this.columns = [];
    for (let i = 0; i < CELLS_X; i++) {
      this.columns[i] = [];
    }
  },

  registerCube(cube) {
    this.cubes.push(cube);
  },

  unregisterCube(cube) {
    // TODO: why O(n)? maybe Map?
    const index = this.cubes.indexOf(cube);
    this.cubes.splice(index, 1);
  },

  tick(time, dt) {
    this.cubes.forEach((el) => {
      this.moveCubeDown(el, dt);
    });
  },

  getGroundFor(pos) {
    const cellX = Math.round(pos.x / SNAP.x);
    const column = this.columns[cellX];
    if (!column || column.length === 0) {
      return GROUND_Y;
    }
    const lastEl = column[column.length - 1];
    const lastPos = lastEl.getAttribute("position");
    return lastPos.y + CELL_SIZE;
  },

  moveCubeDown(el, dt) {
    const cube = el.components.grabable;
    if (!cube.data.grabbing && !cube.grounded) {
      const pos = AFRAME.utils.clone(cube.el.getAttribute("position"));

      const groundY = this.getGroundFor(pos);

      pos.y -= cube.data.speed * (dt / 1000);
      if (pos.y <= groundY) {
        pos.y = groundY;
        this.grounded(el);
      }
      cube.el.setAttribute("position", pos);
    }
  },

  grounded(el) {
    const cube = el.components.grabable;
    cube.grounded = true;
    const pos = el.getAttribute("position");
    const cellX = Math.round(pos.x / SNAP.x);
    console.log("GROUNDED", cellX);
    this.columns[cellX].push(el);

    this.checkLineDestroy();
  },

  checkLineDestroy() {
    const hasLine = this.columns.every((el) => el && el.length > 0);
    if (!hasLine) return;
    const toDelete = this.columns.map((column) => column[0]);
    this.columns = this.columns.map((column) => column.slice(1));
    toDelete.forEach((el) => el.remove());

    this.columns.forEach((column) => {
      column.forEach((el) => {
        el.components["force-mover"].scheduleMoveDown();
      });
    });
  },
});
