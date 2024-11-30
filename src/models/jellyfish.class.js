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
  hitByBubble = false;
  isDead = false;

  /**
   * Creates an instance of a Jellyfish with a specified color (LILA or YELLOW).
   * The jellyfish is placed at a random position and initializes its properties
   * and animations based on the color.
   *
   * @param {string} color - The color of the jellyfish ("LILA" or "YELLOW").
   */
  constructor(color) {
    super();
    this.color = color;
    this.x = 500 + Math.random() * 4000;
    this.y = 20 + Math.random() * 400;
    this.hitboxX = 50;
    this.hitboxY = 50;
    this.hitboxWidth = 100;
    this.hitboxHeight = 100;
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

  /**
   * Starts the jellyfish's animation, causing it to move upwards and animate its swimming.
   */
  animate() {
    this.moveUp();
    this.animateMoveUp();
  }

  /**
   * Moves the jellyfish upwards until it reaches the target position, then starts sinking back down.
   */
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

  /**
   * Animates the jellyfish's upward swimming movement by playing the current swimming animation.
   */
  animateMoveUp() {
    this.animationInterval = setInterval(() => {
      this.playSwimAnimation();
    }, 1000 / 5);
  }

  /**
   * Plays the swimming animation by cycling through the jellyfish's current images.
   */
  playSwimAnimation() {
    let path = this.currentImages[this.currentImage];
    this.img = this.imageCache[path];
    this.currentImage = (this.currentImage + 1) % this.currentImages.length;
  }

  /**
   * Makes the jellyfish sink back to its original position after moving upwards.
   */
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

  /**
   * Activates the enraged state of the jellyfish, causing it to move faster and change appearance.
   */
  getEnrage() {
    if (!this.enrageActive) {
      this.enrageActive = true;
      this.animateEnrage(this.enrageImages);
      this.speed *= 1.5;
    }
  }

  /**
   * Resets the jellyfish's enraged state, returning it to normal speed and animation.
   */
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

  /**
   * Animates the jellyfish's enraged state by cycling through the enrage images.
   *
   * @param {Array} array - The array of enrage images to cycle through.
   */
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

  /**
   * Reverses the enraged state animation by cycling through the enrage images in reverse order.
   *
   * @param {Array} array - The array of enrage images to cycle through.
   */
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

  /**
   * Handles the event when the jellyfish is hit by a bubble. The jellyfish dies and starts the death animation.
   */
  handleBubbleHit() {
    if (!this.hitByBubble) {
      this.hitByBubble = true;
      this.isDead = true;

      clearInterval(this.upInterval);
      clearInterval(this.animationInterval);
      clearInterval(this.enrageInterval);
      clearInterval(this.downInterval);

      let path = this.deathImages[0];
      this.img = this.imageCache[path];

      this.flyOff();
    }
  }

  /**
   * Makes the jellyfish "fly off" after being hit by a bubble, moving it upwards off the screen.
   */
  flyOff() {
    const flyOffInterval = setInterval(() => {
      this.y -= 5;

      if (this.y <= -400) {
        clearInterval(flyOffInterval);
      }
    }, 1000 / 120);
  }
}
