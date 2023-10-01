/* eslint-disable no-undef */
AFRAME.registerComponent("falling-cubes", {
  init: () => {
    function getRandomColor() {
      var colors = ["#FFC65D", "#FF5733", "#C70039", "#900C3F", "#581845"];
      return colors[Math.floor(Math.random() * colors.length)];
    }

    function getRandomPosition() {
      var x = Math.floor(Math.random() * 11) - 5;
      var y = 15;
      var z = -0.5;
      return { x, y, z };
    }

    setInterval(() => {
      const p = getRandomPosition();
      var cube = document.createElement("a-entity");
      cube.setAttribute("color", getRandomColor());
      cube.setAttribute("position", p);
      cube.setAttribute(
        "geometry",
        "primitive: box; width: 0.25; height: 0.25; depth: 0.25"
      );
      cube.setAttribute(
        "animation",
        `property: position; to: ${p.x} ${0.5} ${
          p.z
        }; dur: 5000; easing: linear`
      );
      cube.setAttribute("grabable", "");
      document.querySelector("a-scene").appendChild(cube);
    }, 2000);
  },
});
