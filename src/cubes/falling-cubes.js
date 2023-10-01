/* eslint-disable no-undef */
AFRAME.registerComponent("falling-cubes", {
  init: () => {
    this.existingCubes = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    function getRandomColor() {
      var colors = ["#FFC65D", "#FF5733", "#C70039", "#900C3F", "#581845"];
      return colors[Math.floor(Math.random() * colors.length)];
    }

    function getRandomPosition() {
      var x = (Math.floor(Math.random() * 9) - 4) * 0.25;
      var y = 15;
      var z = -0.5;
      return { x, y, z };
    }

    setInterval(() => {
      const p = getRandomPosition();
      const index = p.x * 4 + 4;
      var cube = document.createElement("a-entity");
      cube.setAttribute("color", getRandomColor());
      cube.setAttribute("position", p);
      cube.setAttribute(
        "geometry",
        "primitive: box; width: 0.25; height: 0.25; depth: 0.25"
      );
      cube.setAttribute("grabable", "");
      cube.setAttribute(
        "cube",
        `minY: ${0.5 + this.existingCubes[index] * 0.25}`
      );
      document.querySelector("a-scene").appendChild(cube);
      this.existingCubes[index]++;
    }, 2000);
  },
});
