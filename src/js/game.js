let canvas;
let ctx;
let world = new World();

function init() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  console.log("My charakter is", world.charakter);
  console.log("My enemie is", world.enemies);
}
