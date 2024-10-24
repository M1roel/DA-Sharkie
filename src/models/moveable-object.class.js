class MoveableObject {
  x = 50;
  y = 300;
  height = 200;
  width = 200;
  img;
  imageCache = {};
  otherDirection = false;
  deathAnimationFinished = false;
  energy = 100;

  loadImg(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImgs(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  moveRight() {
    console.log("Moving right");
  }

  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }

  isColliding(mo) {
    return this.x + this.width > mo.x && this.y + this.height > mo.y && this.x < mo.x && this.y < mo.y + mo.height;
  }

  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    }
  }

  isDead() {
    return this.energy == 0;
  }

  checkDeathAnimationFinished(array) {
    if (array === 'IMAGES_DEAD' && this.currentImage >= this[array].length) {
      this.deathAnimationFinished = true;
      this.currentImage = this[array].length - 1;
    }
  }

  loadAnimation(array) {
    if (array === 'IMAGES_DEAD' && this.deathAnimationFinished) {
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
