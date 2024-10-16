class World {
  charakter = new Character();
  backgroundObjects = [new BackgroundObject('/public/img/3. Background/Dark/1.png')];
  enemies = [new Fish(), new Fish(), new Fish()];
  lights = [new Light()];

  canvas;
  ctx;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.addToMap(this.charakter);
    this.addObjectsToMap(this.lights);
    this.addObjectsToMap(this.enemies);
    this.addObjectsToMap(this.backgroundObjects);
   

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
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.height, mo.width);
  }
}
