class Fish extends MoveableObject {
  IMAGES_GREEN = ["/public/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png"];
  IMAGES_RED = ["/public/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim2.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim3.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim4.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim5.png"];
  IMAGES_VIOLET = ["/public/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim2.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim3.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim4.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim5.png"];
  IMAGES_GREEN_ENRAGE = ["/public/img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition1.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition2.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition3.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition4.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition5.png"];
  IMAGES_RED_ENRAGE = ["/public/img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition1.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition2.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition3.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition4.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition5.png"];
  IMAGES_VIOLET_ENRAGE = ["/public/img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition1.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition2.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition3.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition4.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition5.png"];
  IMAGES_GREEN_BUBBLESWIN = ["/public/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim1.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim2.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim3.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim4.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim5.png"];
  IMAGES_RED_BUBBLESWIN = ["/public/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim1.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim2.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim3.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim4.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim5.png"];
  IMAGES_VIOLET_BUBBLESWIN = ["/public/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim1.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim2.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim3.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim4.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim5.png"];
  IMAGES_GREEN_DEAD = ["/public/img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1 (can animate by going up).png"];
  IMAGES_RED_DEAD = ["/public/img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.png"];
  IMAGES_VIOLET_DEAD = ["/public/img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.png"];

  currentImage = 0;
  currentSwimImage = 0;
  enrageInterval;
  bubbleswimInterval;
  swimInterval;
  isDead = false;
  allowMovement = true;

  constructor(color) {
    super();
    this.color = color;
    this.x = 500 + Math.random() * 4000;
    this.y = 20 + Math.random() * 400;
    this.height = 100;
    this.width = 100;
    this.hitboxX = 30;
    this.hitboxY = 50;
    this.hitboxWidth = 80;
    this.hitboxHeight = 80;
    this.enrageActive = false;
    this.speed = 0.15 + Math.random() * 0.9;

    if (color === "GREEN") {
      this.loadImg(this.IMAGES_GREEN[0]);
      this.currentImages = this.IMAGES_GREEN;
      this.enrageImages = this.IMAGES_GREEN_ENRAGE;
      this.bubbleswimImages = this.IMAGES_GREEN_BUBBLESWIN;
      this.deathImages = this.IMAGES_GREEN_DEAD;
    } else if (color === "RED") {
      this.loadImg(this.IMAGES_RED[0]);
      this.currentImages = this.IMAGES_RED;
      this.enrageImages = this.IMAGES_RED_ENRAGE;
      this.bubbleswimImages = this.IMAGES_RED_BUBBLESWIN;
      this.deathImages = this.IMAGES_RED_DEAD;
    } else if (color === "VIOLET") {
      this.loadImg(this.IMAGES_VIOLET[0]);
      this.currentImages = this.IMAGES_VIOLET;
      this.enrageImages = this.IMAGES_VIOLET_ENRAGE;
      this.bubbleswimImages = this.IMAGES_VIOLET_BUBBLESWIN;
      this.deathImages = this.IMAGES_VIOLET_DEAD;
    }
    this.loadImgs(this.currentImages);
    this.loadImgs(this.enrageImages);
    this.loadImgs(this.bubbleswimImages);
    this.loadImgs(this.deathImages);
    this.animate();
  }

  /**
   * Starts the fish animation by moving left and swimming.
   */
  animate() {
    this.moveLeft();
    this.animateSwim(this.currentImages);
  }

  /**
   * Animates the swimming motion of the fish.
   * @param {string[]} array - Array of image paths for swimming.
   */
  animateSwim(array) {
    this.swimInterval = setInterval(() => {
      let i = this.currentSwimImage % array.length;
      let path = array[i];
      this.img = this.imageCache[path];
      this.currentSwimImage++;
    }, 1000 / 5);
  }

  /**
   * Activates the enrage mode for the fish.
   */
  getEnrage() {
    if (!this.enrageActive) {
      this.enrageActive = true;
      clearInterval(this.swimInterval);
      this.animateEnrage(this.enrageImages);
      this.speed *= 1.5;
    }
  }

  /**
   * Resets the enrage state of the fish.
   */
  resetEnrage() {
    if (this.enrageActive) {
      this.enrageActive = false;
      clearInterval(this.enrageInterval);
      clearInterval(this.bubbleswimInterval);
      this.speed /= 1.5;

      this.animateEnrageReverse(this.enrageImages);
      this.loadImgs(this.currentImages);
      this.currentSwimImage = 0;
      this.animateSwim(this.currentImages);
    }
  }

  /**
   * Animates the reverse enrage sequence.
   * @param {string[]} array - Array of image paths for enrage animation.
   */
  animateEnrageReverse(array) {
    let reverseIndex = array.length - 1;
    this.currentImage = reverseIndex;

    const reverseInterval = setInterval(() => {
      if (reverseIndex < 0) {
        clearInterval(reverseInterval);

        if (this.color === "GREEN") {
          this.loadImg(this.IMAGES_GREEN[0]);
        } else if (this.color === "RED") {
          this.loadImg(this.IMAGES_RED[0]);
        } else if (this.color === "VIOLET") {
          this.loadImg(this.IMAGES_VIOLET[0]);
        }
        return;
      }

      let path = array[reverseIndex];
      this.img = this.imageCache[path];
      reverseIndex--;
    }, 1000 / 15);
  }

  /**
   * Animates the enrage sequence for the fish.
   * @param {string[]} array - Array of image paths for enrage animation.
   */
  animateEnrage(array) {
    let initialLoopComplete = false;

    this.enrageInterval = setInterval(() => {
      if (initialLoopComplete) {
        clearInterval(this.enrageInterval);
        this.animateBubbleswim(this.bubbleswimImages);
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

  /**
   * Animates the bubble swim motion of the fish.
   * @param {string[]} array - Array of image paths for bubble swimming.
   */
  animateBubbleswim(array) {
    this.bubbleswimInterval = setInterval(() => {
      let i = this.currentImage % array.length;
      let path = array[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 1000 / 5);
  }

  /**
 * Handles the effect of a fin slap hit on the enemy. If the enemy has not already been slapped, 
 * it marks the enemy as slapped, sets it as dead, stops the enemy's swimming and enrage intervals, 
 * and starts an animation for the enemy to "fly off" in a specific direction.
 * 
 * @param {Object} enemy - The enemy that is being hit by the fin slap. It must have properties like `hasBeenSlapped`, `x`, and `y`.
 */
  handleFinSlapHit(enemy) {
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
