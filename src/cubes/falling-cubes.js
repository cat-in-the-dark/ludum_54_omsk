function getRandomColor() {
  var colors = ["#FFC65D", "#FF5733", "#C70039", "#900C3F", "#581845"];
  return colors[Math.floor(Math.random() * colors.length)];
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getSpawnCell() {
  return {
    cellX: getRandomInt(CELLS_X),
    cellY: CELLS_Y,
  };
}

function cellToCoords(cell) {
  const { cellX, cellY } = cell;
  const x = cellX * CELL_SIZE;
  const y = cellY * CELL_SIZE;
  return new THREE.Vector3(x, y, Z_CONSTRAINT);
}

AFRAME.registerSystem("falling-cubes", {
  init() {
    this.gameplay = this.el.sceneEl.systems.gameplay;

    this.spawnCube = this.spawnCube.bind(this);
    setInterval(this.spawnCube, 2000);
  },

  createCubeEntity(p) {
    const cube = document.createElement("a-entity");
    cube.setAttribute("color", getRandomColor());
    cube.setAttribute("position", p);
    cube.setAttribute(
      "geometry",
      "primitive: box; width: 0.25; height: 0.25; depth: 0.25"
    );
    cube.setAttribute("grabable", "");
    return cube;
  },

  spawnCube() {
    const cell = getSpawnCell();
    const pos = cellToCoords(cell);
    const cube = this.createCubeEntity(pos);
    document.querySelector("a-scene").appendChild(cube);
  },
});
