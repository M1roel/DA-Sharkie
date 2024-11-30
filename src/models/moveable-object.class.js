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
    return this.x + this.hitboxX + this.hitboxWidth >= mo.x + mo.hitboxX && this.x + this.hitboxX <= mo.x + mo.hitboxX + mo.hitboxWidth && this.y + this.hitboxY + this.hitboxHeight >= mo.y + mo.hitboxY && this.y + this.hitboxY <= mo.y + mo.hitboxY + mo.hitboxHeight;
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
    if (this.isDead()) {
      return;
    }

    this.energy -= 5;

    this.idleTimer = 0;
    this.longIdleInProgress = false;

    this.handleHitAnimation(source);

    if (this.energy <= 0) {
      this.energy = 0;
      this.deathSource = source;
    }
  }

  /**
   * Handles the animation when the object is hit by a certain source.
   *
   * @param {string} source - The source of the hit, which determines the animation to be played.
   */
  handleHitAnimation(source) {
    if (source === "fish" || source === "endboss") {
      if (this instanceof Character) {
        this.loadAnimation("IMAGES_POISONED");
      }
    } else if (source === "jellyfish") {
      if (this instanceof Character) {
        this.loadAnimation("IMAGES_SHOCK");
      }
    }
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
