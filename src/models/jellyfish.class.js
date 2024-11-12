class Jellyfish extends MoveableObject {
  IMAGES_LILA = ["/public/img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png", "/public/img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png", "/public/img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png", "/public/img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png"];
  IMAGES_YELLOW = ["/public/img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png", "/public/img/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png", "/public/img/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png", "/public/img/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png"];
  IMAGES_LILA_ENRAGE = ["/public/img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png", "/public/img/2.Enemy/2 Jelly fish/Súper dangerous/Green 2.png", "/public/img/2.Enemy/2 Jelly fish/Súper dangerous/Green 3.png", "/public/img/2.Enemy/2 Jelly fish/Súper dangerous/Green 4.png"];
  IMAGES_YELLOW_ENRAGE = ["/public/img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 1.png", "/public/img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 2.png", "/public/img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 3.png", "/public/img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 4.png"];
  IMAGES_LILA_DEATH = ["/public/img/2.Enemy/2 Jelly fish/Dead/Lila/L1.png", "/public/img/2.Enemy/2 Jelly fish/Dead/Lila/L2.png", "/public/img/2.Enemy/2 Jelly fish/Dead/Lila/L3.png", "/public/img/2.Enemy/2 Jelly fish/Dead/Lila/L4.png"];
  IMAGES_YELLOW_DEATH = ["/public/img/2.Enemy/2 Jelly fish/Dead/Yellow/y1.png", "/public/img/2.Enemy/2 Jelly fish/Dead/Yellow/y2.png", "/public/img/2.Enemy/2 Jelly fish/Dead/Yellow/y3.png", "/public/img/2.Enemy/2 Jelly fish/Dead/Yellow/y4.png"];

  currentImage = 0;
  enrageInterval;
  upInterval;
  animationInterval;

  constructor(color) {
    super();
    this.color = color;
    this.x = 500 + Math.random() * 4000;
    this.y = 20 + Math.random() * 400;
    this.height = 100;
    this.width = 100;
    this.enrageActive = false;
    this.speed = 0.15 + Math.random() * 0.9;

    if (color === "LILA") {
      this.loadImg(this.IMAGES_LILA[0]);
      this.currentImages = this.IMAGES_LILA;
      this.enrageImages = this.IMAGES_LILA_ENRAGE;
      this.deathImages = this.IMAGES_LILA_DEATH;
    } else if (color === "YELLOW") {
      this.loadImg(this.IMAGES_YELLOW[0]);
      this.currentImages = this.IMAGES_YELLOW;
      this.enrageImages = this.IMAGES_YELLOW_ENRAGE;
      this.deathImages = this.IMAGES_YELLOW_DEATH;
    }

    this.loadImgs(this.currentImages);
    this.loadImgs(this.enrageImages);
    this.loadImgs(this.deathImages);
    this.animate();
  }

  animate() {
    this.moveUp();
    this.animateMoveUp();
  }

  moveUp() {
    const targetY = this.y - 100;
    this.upInterval = setInterval(() => {
      if (this.y <= targetY) {
        clearInterval(this.upInterval);
        this.sinkBack();
      } else {
        this.y -= this.speed;
      }
    }, 1000 / 60);
  }

  animateMoveUp() {
    this.animationInterval = setInterval(() => {
      this.playSwimAnimation();
    }, 1000 / 5);
  }

  playSwimAnimation() {
    let path = this.currentImages[this.currentImage];
    this.img = this.imageCache[path];
    this.currentImage = (this.currentImage + 1) % this.currentImages.length;
  }

  sinkBack() {
    const initialY = this.y + 100;
    const downInterval = setInterval(() => {
      if (this.y >= initialY) {
        clearInterval(downInterval);
        clearInterval(this.animationInterval);
        this.animate();
      } else {
        this.y += this.speed;
      }
    }, 1000 / 15);
  }

  getEnrage() {
    if (!this.enrageActive) {
      this.enrageActive = true;
      this.animateEnrage(this.enrageImages);
      this.speed *= 1.5;
    }
  }

  resetEnrage() {
    if (this.enrageActive) {
      this.enrageActive = false;
      clearInterval(this.enrageInterval);
      this.speed /= 1.5;
      this.animateEnrageReverse(this.enrageImages);
      this.loadImgs(this.currentImages);
      this.currentImage = 0;
    }
  }

  animateEnrage(array) {
    let initialLoopComplete = false;

    this.enrageInterval = setInterval(() => {
      if (initialLoopComplete) {
        clearInterval(this.enrageInterval);
        this.animateEnrage(this.enrageImages);
      } else {
        let path = array[this.currentImage];
        this.img = this.imageCache[path];

        if (this.currentImage === array.length - 1) {
          initialLoopComplete = true;
          this.currentImage = 0;
        } else {
          this.currentImage++;
        }
      }
    }, 1000 / 15);
  }

  animateEnrageReverse(array) {
    let reverseIndex = array.length - 1;
    this.currentImage = reverseIndex;

    const reverseInterval = setInterval(() => {
      if (reverseIndex < 0) {
        clearInterval(reverseInterval);
        this.loadImg(this.currentImages[0]);
        return;
      }

      let path = array[reverseIndex];
      this.img = this.imageCache[path];
      reverseIndex--;
    }, 1000 / 15);
  }

  handleBubbleHit(enemy) {
    if (!enemy.hasBeenSlapped) {
      enemy.hasBeenSlapped = true;
      this.isDead = true;

      clearInterval(this.swimInterval);
      clearInterval(this.enrageInterval);
      clearInterval(this.bubbleswimInterval);

      let path = this.deathImages[0];
      this.img = this.imageCache[path];

      const flyOffInterval = setInterval(() => {
        this.x += 5;
        this.y -= 5;
      }, 1000 / 60);
    }
  }
}
