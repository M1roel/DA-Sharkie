let canvas;
let world;

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas);

  console.log("My charakter is", world.charakter);
  console.log("My enemie is", world.enemies);
}
