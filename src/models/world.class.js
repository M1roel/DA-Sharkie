class World {
  charakter = new Character();
  level = level1;
  lifeStatusbar = new StatusBar(20, 10, "life");
  endbossLifeStatusbar = new StatusBar (500, 10, "endbossLife");
  coinStatusbar = new StatusBar(20, 55, "coin");
  bottleStatusbar = new StatusBar(20, 100, "bottle");
  throwableObjects = [];
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  endbossShow = false;
  background_sound = new Audio("/src/audio/background.mp3");
  coin_sound = new Audio("/src/audio/coin_collect.mp3");
  bottle_sound = new Audio("/src/audio/bottle_collect.mp3");

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
      this.checkEnemyCollisions();
      this.checkItemCollisions("coin");
      this.checkItemCollisions("bottle");
      this.checkFinSlapCollision();
      this.checkBubbleCollision();
      this.checkPbubbelCollision();
      this.checkAndRemoveBubbles();
      this.removeDeadEnemies();
    }, 100);
  }

  removeDeadEnemies() {
    this.level.enemies = this.level.enemies.filter((enemy) => {
      if (enemy instanceof Jellyfish && enemy.isDead) {
        return enemy.y > -100;
      }
      if (enemy instanceof Fish && enemy.isDead) {
        return enemy.y > -100;
      }
      return true;
    });
  }

  checkEnemyCollisions() {
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
  }

  checkFinSlapCollision() {
    if (this.charakter.slapInProgress) {
      this.level.enemies.forEach((enemy) => {
        if (this.charakter.isColliding(enemy)) {
          if (enemy instanceof Fish) {
            enemy.handleFinSlapHit(enemy);
          }
        }
      });
    }
  }

  checkBubbleCollision() {
    this.throwableObjects.forEach((bubble, bubbleIndex) => {
      this.level.enemies.forEach((enemy) => {
        if (bubble.isColliding(enemy)) {
          if (enemy instanceof Jellyfish && !enemy.isDead) {
            enemy.handleBubbleHit();
            this.throwableObjects.splice(bubbleIndex, 1);
          }
        }
      });
    });
  }

  checkPbubbelCollision() {
    this.throwableObjects.forEach((bubble, bubbleIndex) => {
      if (bubble.type === "poison") {
        if (this.level.endboss && bubble.isColliding(this.level.endboss)) {
          this.level.endboss.handleBubbleHit();
          this.throwableObjects.splice(bubbleIndex, 1);
        }
      }
    });
  }

  checkItemCollisions(type) {
    const items = type === "coin" ? this.level.coins : this.level.bottles;
    items.forEach((item, index) => {
      if (this.charakter.isColliding(item)) {
        this.collectItem(index, type);
      }
    });
  }

  collectItem(index, type) {
    if (type === "coin") {
      this.level.coins.splice(index, 1);
      this.coinStatusbar.increaseCoinCount();
      this.coinStatusbar.setCoinsCollect(this.coinStatusbar.coinsCollect);
      this.coin_sound.play();
    } else if (type === "bottle") {
      this.level.bottles.splice(index, 1);
      this.bottleStatusbar.increaseBottleCount();
      this.bottleStatusbar.setBottleCollect(this.bottleStatusbar.bottleCollect);
      this.bottle_sound.play();
    }
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
    this.addToMap(this.endbossLifeStatusbar);
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
    this.drawHitboxFrame(mo);
  }

  drawFrame(mo) {
    if (mo instanceof Character || mo instanceof Fish || mo instanceof Jellyfish || mo instanceof Endboss) {
      this.ctx.beginPath();
      this.ctx.lineWidth = "5";
      this.ctx.strokeStyle = "blue";
      this.ctx.rect(mo.x, mo.y, mo.height, mo.width);
      this.ctx.stroke();
    }
  }

  drawHitboxFrame(mo) {
    if (mo.hitboxWidth && mo.hitboxHeight) { // Überprüfen, ob Hitbox definiert ist
      this.ctx.beginPath();
      this.ctx.lineWidth = "2";
      this.ctx.strokeStyle = "red";
      this.ctx.rect(
        mo.x + (mo.width - mo.hitboxWidth) / 2, // Zentriere die Hitbox auf der X-Achse
        mo.y + (mo.height - mo.hitboxHeight) / 2, // Zentriere die Hitbox auf der Y-Achse
        mo.hitboxWidth,
        mo.hitboxHeight
      );
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
    if (this.charakter.x > 4050 && !this.endbossShow) {
      this.endbossShow = true;
      this.level.endboss.startAnimation();
    }
  }

  checkAndRemoveBubbles() {
    for (let i = this.throwableObjects.length - 1; i >= 0; i--) {
      let bubble = this.throwableObjects[i];
      if (bubble.y > 500) {
        this.throwableObjects.splice(i, 1);
      }
    }
  }
}
