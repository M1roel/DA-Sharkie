class MoveableObject extends DrawableObject {
  otherDirection = false;
  deathAnimationFinished = false;
  energy = 100;

  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
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
    return this.x + this.hitboxWidth > mo.x && this.y + this.hitboxHeight > mo.y && this.x < mo.x + mo.hitboxWidth && this.y < mo.y + mo.hitboxHeight;
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

    if (this.energy < 0) {
      this.energy = 0;
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
    if (array === "IMAGES_DEAD" && this.currentImage >= this[array].length) {
      this.deathAnimationFinished = true;
      this.currentImage = this[array].length - 1;
    }
  }

  loadAnimation(array) {
    if (array === "IMAGES_DEAD" && this.deathAnimationFinished) {
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
