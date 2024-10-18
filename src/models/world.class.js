class World {
  charakter = new Character();
  backgroundObjects = [
    new BackgroundObject('/public/img/3. Background/Dark/1.png', 0),
    new BackgroundObject('/public/img/3. Background/Dark/2.png', 719)
];
  enemies = [new Fish(), new Fish(), new Fish()];
  lights = [new Light()];

  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard
    this.draw();
    this.setWorld();
  }

  setWorld() {
    this.charakter.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    
    this.addObjectsToMap(this.backgroundObjects);
    this.addToMap(this.charakter);
    this.addObjectsToMap(this.lights);
    this.addObjectsToMap(this.enemies);
   
    this.ctx.translate(-this.camera_x, 0);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach(o => {
      this.addToMap(o);
    })
  }

  addToMap(mo) {
    if(mo.otherDirection) {
      this.ctx.save();
      this.ctx.translate(mo.width, 0);
      this.ctx.scale(-1, 1);
      mo.x = mo.x * -1;
    }
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.height, mo.width);
    if (mo.otherDirection) {
      mo.x = mo.x * -1;
      this.ctx.restore();
    }
  }
}
