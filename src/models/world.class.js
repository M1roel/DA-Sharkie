class World {
  charakter = new Character();

  enemies = [new Fish(), new Fish(), new Fish()];

  ctx;

  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
    this.draw();
  }

  draw() {
    this.ctx.drawImage(this.charakter.img, this.charakter.x, this.charakter.y, 200, 200);
  }
}
