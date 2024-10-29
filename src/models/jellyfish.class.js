class Jellyfish extends MoveableObject {
  IMAGES_LILA = [
    "/public/img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png",
    "/public/img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png",
    "/public/img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png",
    "/public/img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png",
  ];
  IMAGES_YELLOW = [
    "/public/img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png",
    "/public/img/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png",
    "/public/img/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png",
    "/public/img/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png",
  ];
  IMAGES_LILA_ENRAGE = [
    "/public/img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png",
    "/public/img/2.Enemy/2 Jelly fish/Súper dangerous/Green 2.png",
    "/public/img/2.Enemy/2 Jelly fish/Súper dangerous/Green 3.png",
    "/public/img/2.Enemy/2 Jelly fish/Súper dangerous/Green 4.png",
  ];
  IMAGES_YELLOW_ENRAGE = [
    "/public/img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 1.png",
    "/public/img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 2.png",
    "/public/img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 3.png",
    "/public/img/2.Enemy/2 Jelly fish/Súper dangerous/Pink 4.png",
  ];

  currentImage = 0;
  enrageInterval;

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
    } else if (color === "YELLOW") {
      this.loadImg(this.IMAGES_YELLOW[0]);
      this.currentImages = this.IMAGES_YELLOW;
      this.enrageImages = this.IMAGES_YELLOW_ENRAGE;
    }

    this.loadImgs(this.currentImages);
    this.loadImgs(this.enrageImages);
    this.animate();
  }

  animate() {
    this.moveUp();
  }

  moveUp() {
    const targetY = this.y - 100;
    const upInterval = setInterval(() => {
      if (this.y <= targetY) {
        clearInterval(upInterval);
        this.sinkBack();
      } else {
        this.y -= this.speed;
      }
    }, 1000 / 60);
  }

  sinkBack() {
    const initialY = this.y + 100;
    const downInterval = setInterval(() => {
      if (this.y >= initialY) {
        clearInterval(downInterval);
        this.animate();
      } else {
        this.y += this.speed;
      }
    }, 1000 / 30);
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
      } else {
        let i = this.currentImage;
        let path = array[i];
        this.img = this.imageCache[path];

        if (i === array.length - 1) {
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
}
