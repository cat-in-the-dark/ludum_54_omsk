import { Application } from "@pixi/app";
import { BaseTexture, SCALE_MODES } from "@pixi/core";
import { Container } from "@pixi/display";

function main() {
  const app = new Application<HTMLCanvasElement>({
    background: "#000000",
    width: 1161,
    height: 652,
    antialias: true,
  });
  BaseTexture.defaultOptions.scaleMode = SCALE_MODES.NEAREST; // pixel perfect
  document.body.appendChild(app.view);

  const container = new Container();
  container.x = 0;
  container.y = 0;
  app.stage.addChild(container);

  // app.ticker.add(() => {
  //   const dt = app.ticker.deltaMS / 1000; // in seconds
  //   inputs.update(dt);
  //   sceneManager.update(dt);
  // });
}

window.onload = function () {
  main();
  window.focus();
};
window.onclick = function () {
  window.focus();
};
