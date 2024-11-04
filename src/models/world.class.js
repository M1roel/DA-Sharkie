class World {
  charakter = new Character();
  level = level1;
  lifeStatusbar = new StatusBar(20, 10, "life");
  coinStatusbar = new StatusBar(20, 55, "coin");
  bottleStatusbar = new StatusBar(20, 100, "bottle");
  throwableObjects = [];
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  endbossShow = false;
  background_sound = new Audio("/src/audio/background.mp3");

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.startBackgroundSound();
    this.checkCollisions();
    this.checkEnrage();
  }

  setWorld() {
    this.charakter.world = this;
  }

  startBackgroundSound() {
    this.background_sound.loop = true;
    this.background_sound.play();
  }

  checkCollisions() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (this.charakter.isColliding(enemy)) {
          let sourceType;
          if (enemy instanceof Fish) {
            sourceType = "fish";
          } else if (enemy instanceof Jellyfish) {
            sourceType = "jellyfish";
          } else {
            return;
          }
          this.charakter.hit(sourceType);
          this.lifeStatusbar.setPercentageEnergy(this.charakter.energy);
        }
      });
    }, 100);
  }

  checkEnrage() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (this.charakter.isNear(enemy)) {
          enemy.getEnrage();
        } else {
          enemy.resetEnrage();
        }
      });
    }, 500);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.backgroundObjects);
    this.addToMap(this.charakter);

    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.lifeStatusbar);
    this.addToMap(this.coinStatusbar);
    this.addToMap(this.bottleStatusbar);
    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.lights);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);

    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);

    if (this.endbossShow) {
      this.addToMap(this.level.endboss);
    }

    this.ctx.translate(-this.camera_x, 0);

    this.checkPlayerPosition();

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.height, mo.width);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
    this.drawFrame(mo);
  }

  drawFrame(mo) {
    if (mo instanceof Character || mo instanceof Fish || mo instanceof Jellyfish) {
      this.ctx.beginPath();
      this.ctx.lineWidth = "5";
      this.ctx.strokeStyle = "blue";
      this.ctx.rect(mo.x, mo.y, mo.height, mo.width);
      this.ctx.stroke();
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  checkPlayerPosition() {
    if (this.charakter.x > 4250 && !this.endbossShow) {
      this.endbossShow = true;
      this.level.endboss.startAnimation();
    }
  }
}
