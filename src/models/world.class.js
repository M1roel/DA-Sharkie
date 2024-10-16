class World {
  charakter = new Character();

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

    this.ctx.drawImage(this.charakter.img, this.charakter.x, this.charakter.y, this.charakter.height, this.charakter.width);

    this.enemies.forEach(enemy => {
      this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.height, enemy.width);
    })

    this.lights.forEach(light => {
      this.ctx.drawImage(light.img, light.x, light.y, light.height, light.width);
    })

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }
}
