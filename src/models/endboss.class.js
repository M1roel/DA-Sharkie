class Endboss extends MoveableObject {
  x = 400;
  y = 0;
  width = 400;
  height = 400;

  IMAGES_INTRODUCE = ["/public/img/2.Enemy/3 Final Enemy/1.Introduce/1.png", "/public/img/2.Enemy/3 Final Enemy/1.Introduce/2.png", "/public/img/2.Enemy/3 Final Enemy/1.Introduce/3.png", "/public/img/2.Enemy/3 Final Enemy/1.Introduce/4.png", "/public/img/2.Enemy/3 Final Enemy/1.Introduce/5.png", "/public/img/2.Enemy/3 Final Enemy/1.Introduce/6.png", "/public/img/2.Enemy/3 Final Enemy/1.Introduce/7.png", "/public/img/2.Enemy/3 Final Enemy/1.Introduce/8.png", "/public/img/2.Enemy/3 Final Enemy/1.Introduce/9.png", "/public/img/2.Enemy/3 Final Enemy/1.Introduce/10.png"];

  IMAGES_FLOATING = ["/public/img/2.Enemy/3 Final Enemy/2.floating/1.png", "/public/img/2.Enemy/3 Final Enemy/2.floating/2.png", "/public/img/2.Enemy/3 Final Enemy/2.floating/3.png", "/public/img/2.Enemy/3 Final Enemy/2.floating/4.png", "/public/img/2.Enemy/3 Final Enemy/2.floating/5.png", "/public/img/2.Enemy/3 Final Enemy/2.floating/6.png", "/public/img/2.Enemy/3 Final Enemy/2.floating/7.png", "/public/img/2.Enemy/3 Final Enemy/2.floating/8.png", "/public/img/2.Enemy/3 Final Enemy/2.floating/9.png", "/public/img/2.Enemy/3 Final Enemy/2.floating/10.png", "/public/img/2.Enemy/3 Final Enemy/2.floating/11.png", "/public/img/2.Enemy/3 Final Enemy/2.floating/12.png", "/public/img/2.Enemy/3 Final Enemy/2.floating/13.png"];

  world;

  currentImage = 0;

  constructor() {
    super().loadImg("/public/img/2.Enemy/3 Final Enemy/1.Introduce/1.png");
    this.loadImgs(this.IMAGES_INTRODUCE);
    this.loadImgs(this.IMAGES_FLOATING);
    this.startAnimation();
  }

  startAnimation() {
    this.animateOnce();
  }
  
  animateOnce() {
    setTimeout(() => {
      let i = this.currentImage % this.IMAGES_INTRODUCE.length;
      let path = this.IMAGES_INTRODUCE[i];
      this.img = this.imageCache[path];
      this.currentImage++;

      if (this.currentImage < this.IMAGES_INTRODUCE.length) {
        this.animateOnce();
      } else {
        this.currentImage = 0;
        this.startInfiniteAnimation();
      }
    }, 1000 / 5);
  }

  startInfiniteAnimation() {
    this.animateInfinite();
  }

  animateInfinite() {
    setInterval(() => {
      let i = this.currentImage % this.IMAGES_FLOATING.length;
      let path = this.IMAGES_FLOATING[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 1000 / 5);
  }
}
