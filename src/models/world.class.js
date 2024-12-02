class World {
  charakter;
  level = level1;
  lifeStatusbar = new StatusBar(20, 10, "life");
  endbossLifeStatusbar = new StatusBar(500, 10, "endbossLife");
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
    this.charakter = new Character();
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.startBackgroundSound();
    this.checkCollisions();
    this.checkEnrage();
    this.checkEndbossAttack();
    this.registerGlobalActions();
  }

  /**
   * Registers global actions that can be triggered via the window object.
   * This includes animation for slap and shot actions of the character.
   */
  registerGlobalActions() {
    window.animateSlap = () => this.charakter.animateSlap();
    window.animateShot = () => this.charakter.animateShot();
  }

  /**
   * Sets the current world to the character, linking the character to its world.
   */
  setWorld() {
    this.charakter.world = this;
  }

  /**
   * Starts the background music, ensuring it loops indefinitely.
   */
  startBackgroundSound() {
    this.background_sound.loop = true;
    this.background_sound.play();
  }

  /**
   * Continuously checks for collisions between the character and other game elements.
   * This method checks for enemy, boss, item, bubble, and other specific collisions every 100ms.
   */
  checkCollisions() {
    setInterval(() => {
      this.checkEnemyCollisions();
      this.checkBossCollision();
      this.checkItemCollisions("coin");
      this.checkItemCollisions("bottle");
      this.checkFinSlapCollision();
      this.checkBubbleCollision();
      this.checkPbubbleCollision();
      this.checkAndRemoveBubbles();
      this.removeDeadEnemies();
    }, 100);
  }

  /**
   * Removes dead enemies from the game if their position is off-screen (y < -100).
   * This method filters out enemies that are dead and far enough off the screen to be removed.
   */
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

  /**
   * Checks for collisions between the character and enemies (Fish, Jellyfish).
   * If a collision is detected, the character is damaged based on the type of enemy.
   */
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

  /**
   * Checks if the character collides with the Endboss.
   * If a collision is detected, the character takes damage from the Endboss.
   */
  checkBossCollision() {
    const endboss = this.level.endboss;
    if (this.charakter.isColliding(endboss)) {
      this.charakter.hit("endboss");
      this.lifeStatusbar.setPercentageEnergy(this.charakter.energy);
    }
  }

  /**
   * Checks if the character's fin slap is colliding with enemies (Fish).
   * If a collision is detected, it triggers a fin slap effect on the enemy.
   */
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

  /**
   * Checks if Poison Bubbles collide with the Endboss.
   * Only Poison Bubbles can hit the Endboss.
   */
  checkPbubbleCollision() {
    const endboss = this.level.endboss;
    if (endboss) {
      this.throwableObjects.forEach((bubble, bubbleIndex) => {
        if (bubble.type === "poison" && bubble.isColliding(endboss)) {
          endboss.handleBubbleHit();
          this.endbossLifeStatusbar.setPercentageEndbossEnergy(endboss.lifes);
          this.throwableObjects.splice(bubbleIndex, 1);
        }
      });
    }
  }

  /**
   * Checks if normal Bubbles collide with enemies (Jellyfish).
   */
  checkBubbleCollision() {
    this.throwableObjects.forEach((bubble, bubbleIndex) => {
      this.level.enemies.forEach((enemy) => {
        if (bubble.isColliding(enemy) && enemy instanceof Jellyfish && !enemy.isDead) {
          enemy.handleBubbleHit();
          this.throwableObjects.splice(bubbleIndex, 1);
        }
      });
    });
  }

  /**
 * Checks for collisions between the character and items (coins or bottles).
 * If a collision occurs, the item is collected and removed from the level.
 * 
 * @param {string} type - The type of item to check for collisions ("coin" or "bottle").
 */
  checkItemCollisions(type) {
    const items = type === "coin" ? this.level.coins : this.level.bottles;
    items.forEach((item, index) => {
      if (this.charakter.isColliding(item)) {
        this.collectItem(index, type);
      }
    });
  }

  /**
 * Collects the item based on its type (coin or bottle).
 * Removes the item from the level and updates the corresponding status bar.
 * 
 * @param {number} index - The index of the item in the items array.
 * @param {string} type - The type of the item ("coin" or "bottle").
 */
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

  /**
 * Checks for nearby enemies and triggers an enrage effect if the character is close.
 * Enraged enemies are affected by the proximity of the character.
 */
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

  /**
 * Checks if the character is near the endboss and triggers the start of its attack animation if so.
 * The check happens every 500ms.
 */
  checkEndbossAttack() {
    const endboss = this.level.endboss;
    setInterval(() => {
      if (this.charakter.isNear(endboss)) {
        endboss.startAttackAnimation();
      }
    }, 500);
  }

  /**
 * Draws all elements on the canvas, including background objects, character, status bars, 
 * enemies, throwable objects, coins, and bottles.
 * It also handles camera movement and triggers the drawing of the endboss if it's visible.
 */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addToMap(this.charakter);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.lifeStatusbar);
    if (this.endbossShow) {
      this.addToMap(this.endbossLifeStatusbar);
    }
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

  /**
 * Adds all objects in the provided array to the map by calling the `addToMap` method for each object.
 * 
 * @param {Array} objects - The list of objects to be drawn on the map.
 */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
 * Draws the provided object on the canvas. If the object is facing the other direction, 
 * it flips the image before drawing and restores it afterward.
 * 
 * @param {Object} mo - The object to be drawn on the canvas. It must have properties: `img`, `x`, `y`, `height`, `width`, and optionally `otherDirection`.
 */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.height, mo.width);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
 * Flips the provided object's image horizontally (mirrors it) and adjusts its position accordingly.
 * 
 * @param {Object} mo - The object to be flipped. It must have properties `width` and `x`.
 */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
 * Restores the object's original position and canvas context after it was flipped.
 * 
 * @param {Object} mo - The object to have its image flipped back.
 */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  /**
 * Checks if the player's character has passed a certain position (x > 4000), 
 * and if so, shows the endboss and starts its animation.
 */
  checkPlayerPosition() {
    if (this.charakter.x > 3850 && !this.endbossShow) {
      this.endbossShow = true;
      this.level.endboss.startAnimation();
    }
  }

  /**
 * Checks and removes bubbles that have moved beyond a certain vertical position (y > 500).
 * Bubbles that are no longer within the viewable area are removed from the throwable objects array.
 */
  checkAndRemoveBubbles() {
    for (let i = this.throwableObjects.length - 1; i >= 0; i--) {
      let bubble = this.throwableObjects[i];
      if (bubble.y > 500) {
        this.throwableObjects.splice(i, 1);
      }
    }
  }
}
