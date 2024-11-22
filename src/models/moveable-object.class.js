class MoveableObject extends DrawableObject {
  otherDirection = false;
  deathAnimationFinished = false;
  speedY = 0;
  speed = 0.15;
  energy = 100;
  acceleration = 2.5;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 180;
    }
  }

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

  moveUp() {
    setInterval(() => {
      this.y -= this.speed;
    }, 1000 / 60);
  }

  moveDown() {
    setInterval(() => {
      this.y += this.speed;
    }, 1000 / 60);
  }

  isColliding(mo) {
    // Prüfe, ob die Hitbox von `this` mit der Hitbox von `mo` kollidiert.
    return (
        this.x + this.hitboxX + this.hitboxWidth >= mo.x + mo.hitboxX &&
        this.x + this.hitboxX <= mo.x + mo.hitboxX + mo.hitboxWidth &&
        this.y + this.hitboxY + this.hitboxHeight >= mo.y + mo.hitboxY &&
        this.y + this.hitboxY <= mo.y + mo.hitboxY + mo.hitboxHeight
    );
}

  isNear(mo) {
    return this.x - this.enrageWidth < mo.x + mo.width && this.x + this.width + this.enrageWidth > mo.x && this.y - this.enrageHeight < mo.y + mo.height && this.y + this.height + this.enrageHeight > mo.y;
  }

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

  handleHitAnimation(source) {
    if (source === "fish") {
      if (this instanceof Character) {
        this.loadAnimation("IMAGES_POISONED");
      }
    } else if (source === "jellyfish") {
      if (this instanceof Character) {
        this.loadAnimation("IMAGES_SHOCK");
      }
    }
  }

  isDead() {
    return this.energy == 0;
  }

  checkDeathAnimationFinished(array) {
    if ((array === "IMAGES_DEAD" || array === "IMAGES_DEAD_SHOCK") && this.currentImage >= this[array].length) {
      this.deathAnimationFinished = true;
      this.currentImage = this[array].length - 1;
    }
  }

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
}
