class MoveableObject extends DrawableObject {
  otherDirection = false;
  deathAnimationFinished = false;
  speedY = 0;
  speed = 0.15;
  energy = 100;
  acceleration = 2.5;
  game_over_sound = new Audio("/src/audio/game_over.mp3");

  /**
   * Applies gravity to the object by modifying its vertical speed and position.
   * Gravity is applied periodically.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * Determines if the object is above the ground.
   * For throwable objects, always returns true.
   * For others, checks if the object is below a certain threshold (y < 180).
   *
   * @returns {boolean} - Returns true if the object is above the ground, false otherwise.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 180;
    }
  }

  /**
   * Moves the object to the left periodically.
   * Movement is controlled by a move interval, which is cleared if movement is disallowed.
   */
  moveLeft() {
    if (!this.allowMovement) return;
    if (!this.moveInterval) {
      this.moveInterval = setInterval(() => {
        if (this.allowMovement) {
          this.x -= this.speed;
        } else {
          clearInterval(this.moveInterval);
          this.moveInterval = null;
        }
      }, 1000 / 60);
    }
  }

  /**
   * Moves the object upwards periodically by a set speed.
   */
  moveUp() {
    setInterval(() => {
      this.y -= this.speed;
    }, 1000 / 60);
  }

  /**
   * Moves the object downwards periodically by a set speed.
   */
  moveDown() {
    setInterval(() => {
      this.y += this.speed;
    }, 1000 / 60);
  }

  /**
   * Checks if this object is colliding with another object.
   *
   * @param {MoveableObject} mo - The other moveable object to check for a collision.
   * @returns {boolean} - Returns true if the objects are colliding, false otherwise.
   */
  isColliding(mo) {
    const thisRight = this.x + this.hitboxX + this.hitboxWidth;
    const thisLeft = this.x + this.hitboxX;
    const thisBottom = this.y + this.hitboxY + this.hitboxHeight;
    const thisTop = this.y + this.hitboxY;
  
    const moRight = mo.x + mo.hitboxX + mo.hitboxWidth;
    const moLeft = mo.x + mo.hitboxX;
    const moBottom = mo.y + mo.hitboxY + mo.hitboxHeight;
    const moTop = mo.y + mo.hitboxY;
  
    return (
      thisRight >= moLeft &&
      thisLeft <= moRight &&
      thisBottom >= moTop &&
      thisTop <= moBottom
    );
  }

  /**
   * Checks if this object is near another object within a specified range.
   *
   * @param {MoveableObject} mo - The other moveable object to check for proximity.
   * @returns {boolean} - Returns true if the objects are near, false otherwise.
   */
  isNear(mo) {
    return this.x - this.enrageWidth < mo.x + mo.width && this.x + this.width + this.enrageWidth > mo.x && this.y - this.enrageHeight < mo.y + mo.height && this.y + this.height + this.enrageHeight > mo.y;
  }

  /**
   * Handles the event when the object is hit, reducing its energy and triggering the corresponding hit animation.
   *
   * @param {string} source - The source of the hit, such as "fish", "endboss", or "jellyfish".
   */
  hit(source) {
    if (this.isDead() || !this.isVulnerable) {
      return;
    }
    this.energy -= 5;
    this.isVulnerable = false;
    setTimeout(() => {
      this.isVulnerable = true;
    }, 2000);
    this.idleTimer = 0;
    this.longIdleInProgress = false;
    this.handleHitAnimation(source);
    if (this.energy <= 0) {
      this.energy = 0;
      this.deathSource = source;
    }
  }

  /**
   * Handles the hit animation based on the source of the damage.
   * Prevents overlapping animations by using a flag.
   * @param {string} source - The source of the hit (e.g., "fish", "endboss", "jellyfish").
   */
  handleHitAnimation(source) {
    if (this.hitAnimationInProgress) return;
    this.hitAnimationInProgress = true;

    const animationFrames = this.getAnimationFrames(source);
    if (animationFrames) {
      this.startAnimation(animationFrames, 100);
    } else {
      this.hitAnimationInProgress = false;
    }
  }

  /**
   * Determines the animation frames based on the source of the hit.
   * @param {string} source - The source of the hit (e.g., "fish", "endboss", "jellyfish").
   * @returns {string[] | null} - An array of image paths for the animation frames or null if no match is found.
   */
  getAnimationFrames(source) {
    if (source === "fish" || source === "endboss") {
      return this.IMAGES_POISONED;
    } else if (source === "jellyfish") {
      return this.IMAGES_SHOCK;
    }
    return null;
  }

  /**
   * Starts an animation using the provided frames and speed.
   * Updates the image at regular intervals until all frames are displayed.
   * @param {string[]} animationFrames - Array of image paths for the animation.
   * @param {number} animationSpeed - Interval in milliseconds between frames.
   */
  startAnimation(animationFrames, animationSpeed) {
    this.currentImage = 0;
    const interval = setInterval(() => {
      if (this.currentImage < animationFrames.length) {
        const path = animationFrames[this.currentImage];
        this.img = this.imageCache[path];
        this.currentImage++;
      } else {
        clearInterval(interval);
        this.hitAnimationInProgress = false;
      }
    }, animationSpeed);
  }

  /**
   * Checks if the object is dead (i.e., its energy is 0).
   *
   * @returns {boolean} - Returns true if the object is dead, false otherwise.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Checks if the death animation has finished. If so, triggers the game over screen.
   *
   * @param {string} array - The array representing the death animation images.
   */
  checkDeathAnimationFinished(array) {
    if ((array === "IMAGES_DEAD" || array === "IMAGES_DEAD_SHOCK") && this.currentImage >= this[array].length) {
      this.deathAnimationFinished = true;
      this.currentImage = this[array].length - 1;
      this.showGameOverScreen();
    }
  }

  /**
   * Loads the appropriate animation frames for the object based on its state (e.g., dead or shocked).
   *
   * @param {string} array - The array representing the animation frames (e.g., "IMAGES_DEAD").
   */
  loadAnimation(array) {
    if (((array === "IMAGES_DEAD" && this.deathAnimationFinished) || array === "IMAGES_DEAD_SHOCK") && this.deathAnimationFinished) {
      let lastImageIndex = this[array].length - 1;
      let path = this[array][lastImageIndex];
      this.img = this.imageCache[path];
    } else {
      let i = this.currentImage % this[array].length;
      let path = this[array][i];
      this.img = this.imageCache[path];
      this.currentImage++;
      this.checkDeathAnimationFinished(array);
    }
  }

  /**
   * Displays the game over screen and plays the game over sound.
   */
  showGameOverScreen() {
    this.game_over_sound.play();
    document.getElementById("game-over").classList.remove("hidden");
    document.getElementById("game-container").classList.add("hidden");
  }
}
