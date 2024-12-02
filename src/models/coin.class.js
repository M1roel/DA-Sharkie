class Coin extends DrawableObject {
  constructor(x, y) {
    super().loadImg("/public/img/4. Marcadores/1. Coins/1.png");

    this.x = x;
    this.y = y;
    this.height = 50;
    this.width = 50;
    this.hitboxX = 60;
    this.hitboxY = 50;
    this.hitboxWidth = 70;
    this.hitboxHeight = 30;
  }
}
