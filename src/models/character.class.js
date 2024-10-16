class Character extends MoveableObject {
  IMAGES_IDLE = ["/public/img/1.Sharkie/1.IDLE/1.png", "/public/img/1.Sharkie/1.IDLE/2.png", "/public/img/1.Sharkie/1.IDLE/3.png", "/public/img/1.Sharkie/1.IDLE/4.png", "/public/img/1.Sharkie/1.IDLE/5.png", "/public/img/1.Sharkie/1.IDLE/6.png", "/public/img/1.Sharkie/1.IDLE/7.png", "/public/img/1.Sharkie/1.IDLE/8.png", "/public/img/1.Sharkie/1.IDLE/9.png", "/public/img/1.Sharkie/1.IDLE/10.png", "/public/img/1.Sharkie/1.IDLE/11.png", "/public/img/1.Sharkie/1.IDLE/12.png", "/public/img/1.Sharkie/1.IDLE/13.png", "/public/img/1.Sharkie/1.IDLE/14.png", "/public/img/1.Sharkie/1.IDLE/15.png", "/public/img/1.Sharkie/1.IDLE/16.png", "/public/img/1.Sharkie/1.IDLE/17.png", "/public/img/1.Sharkie/1.IDLE/18.png"];

  currentImage = 0;

  constructor() {
    super().loadImg("/public/img/1.Sharkie/1.IDLE/1.png");
    this.loadImgs(this.IMAGES_IDLE);
    this.animate();
  }

  animate() {
    setInterval(() => {
    let i = this.currentImage % this.IMAGES_IDLE.length;
      let path = this.IMAGES_IDLE[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 1000 / 5);
  }

  jump() {

  }
}
