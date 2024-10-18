class Character extends MoveableObject {
  IMAGES_IDLE = [
    "/public/img/1.Sharkie/1.IDLE/1.png",
    "/public/img/1.Sharkie/1.IDLE/2.png",
    "/public/img/1.Sharkie/1.IDLE/3.png",
    "/public/img/1.Sharkie/1.IDLE/4.png",
    "/public/img/1.Sharkie/1.IDLE/5.png",
    "/public/img/1.Sharkie/1.IDLE/6.png",
    "/public/img/1.Sharkie/1.IDLE/7.png",
    "/public/img/1.Sharkie/1.IDLE/8.png",
    "/public/img/1.Sharkie/1.IDLE/9.png",
    "/public/img/1.Sharkie/1.IDLE/10.png",
    "/public/img/1.Sharkie/1.IDLE/11.png",
    "/public/img/1.Sharkie/1.IDLE/12.png",
    "/public/img/1.Sharkie/1.IDLE/13.png",
    "/public/img/1.Sharkie/1.IDLE/14.png",
    "/public/img/1.Sharkie/1.IDLE/15.png",
    "/public/img/1.Sharkie/1.IDLE/16.png",
    "/public/img/1.Sharkie/1.IDLE/17.png",
    "/public/img/1.Sharkie/1.IDLE/18.png",
  ];
  IMAGES_SWIM = [
    "/public/img/1.Sharkie/3.Swim/1.png",
    "/public/img/1.Sharkie/3.Swim/2.png",
    "/public/img/1.Sharkie/3.Swim/3.png",
    "/public/img/1.Sharkie/3.Swim/4.png",
    "/public/img/1.Sharkie/3.Swim/5.png",
    "/public/img/1.Sharkie/3.Swim/6.png",
  ];
  world;

  currentImage = 0;

  constructor() {
    super().loadImg("/public/img/1.Sharkie/1.IDLE/1.png");
    this.loadImgs(this.IMAGES_IDLE);
    this.loadImgs(this.IMAGES_SWIM);
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        let i = this.currentImage % this.IMAGES_SWIM.length;
        let path = this.IMAGES_SWIM[i];
        this.img = this.imageCache[path];
        this.currentImage++;
      } else {
        let i = this.currentImage % this.IMAGES_IDLE.length;
        let path = this.IMAGES_IDLE[i];
        this.img = this.imageCache[path];
        this.currentImage++;
      }
    }, 1000 / 5);

    setInterval(() => {
      this.world.camera_x = -this.x;
    }, 1000 / 60);

    setInterval(() => {
      if (this.world.keyboard.RIGHT) {
        this.x += 3;
        this.otherDirection = false;
      }

      if (this.world.keyboard.LEFT) {
        this.x -= 3;
        this.otherDirection = true;
      }

      if (this.world.keyboard.UP) {
        this.y -= 3;
        if (!this.world.keyboard.LEFT && !this.world.keyboard.RIGHT) {
          this.otherDirection = false;
        }
      }

      if (this.world.keyboard.DOWN) {
        this.y += 3;
        if (!this.world.keyboard.LEFT && !this.world.keyboard.RIGHT) {
          this.otherDirection = false;
        }
      }
    }, 1000 / 60);
  }
}
