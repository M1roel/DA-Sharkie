class Fish extends MoveableObject {
  IMAGES_GREEN = ["/public/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png"];
  IMAGES_RED = ["/public/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim2.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim3.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim4.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim5.png"];
  IMAGES_VIOLET = ["/public/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim2.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim3.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim4.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim5.png"];

  constructor(color) {
    super();

    if (color === "GREEN") {
      this.loadImg("/public/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png");
      this.loadImgs(this.IMAGES_GREEN);
    } else if (color === "RED") {
      this.loadImg("/public/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png");
      this.loadImgs(this.IMAGES_RED);
    } else if (color === "VIOLET") {
      this.loadImg("/public/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png");
      this.loadImgs(this.IMAGES_VIOLET);
    }

    this.x = 250 + Math.random() * 400;
    this.y = 20 + Math.random() * 400;
    this.height = 100;
    this.width = 100;
    this.animate();
    this.speed = 0.15 + Math.random() * 0.5;
  }

  animate() {
    this.moveLeft();
  }
}
