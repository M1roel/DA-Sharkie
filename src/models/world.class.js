class World {
  charakter = new Character();
  level = level1;

  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  endbossShow = false;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
  }

  setWorld() {
    this.charakter.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.backgroundObjects);
    this.addToMap(this.charakter);
    this.addObjectsToMap(this.level.lights);
    this.addObjectsToMap(this.level.enemies);
    if (this.endbossShow) {
      this.addToMap(this.level.endboss);
    }

    this.ctx.translate(-this.camera_x, 0);

    this.checkPlayerPosition();

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach(o => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
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

  checkPlayerPosition() {
    if (this.charakter.x > 200 && !this.endbossShow) {
      this.endbossShow = true;
      this.level.endboss.startAnimation();
    }
  }
}
