class Character extends MoveableObject {
  x = 100;
  y = 300;
  lastAttackTime = 0;
  attackDelay = 1500;

  IMAGES_IDLE = ["/public/img/1.Sharkie/1.IDLE/1.png", "/public/img/1.Sharkie/1.IDLE/2.png", "/public/img/1.Sharkie/1.IDLE/3.png", "/public/img/1.Sharkie/1.IDLE/4.png", "/public/img/1.Sharkie/1.IDLE/5.png", "/public/img/1.Sharkie/1.IDLE/6.png", "/public/img/1.Sharkie/1.IDLE/7.png", "/public/img/1.Sharkie/1.IDLE/8.png", "/public/img/1.Sharkie/1.IDLE/9.png", "/public/img/1.Sharkie/1.IDLE/10.png", "/public/img/1.Sharkie/1.IDLE/11.png", "/public/img/1.Sharkie/1.IDLE/12.png", "/public/img/1.Sharkie/1.IDLE/13.png", "/public/img/1.Sharkie/1.IDLE/14.png", "/public/img/1.Sharkie/1.IDLE/15.png", "/public/img/1.Sharkie/1.IDLE/16.png", "/public/img/1.Sharkie/1.IDLE/17.png", "/public/img/1.Sharkie/1.IDLE/18.png"];
  IMAGES_SWIM = ["/public/img/1.Sharkie/3.Swim/1.png", "/public/img/1.Sharkie/3.Swim/2.png", "/public/img/1.Sharkie/3.Swim/3.png", "/public/img/1.Sharkie/3.Swim/4.png", "/public/img/1.Sharkie/3.Swim/5.png", "/public/img/1.Sharkie/3.Swim/6.png"];
  IMAGES_SLAP = ["/public/img/1.Sharkie/4.Attack/Fin slap/1.png", "/public/img/1.Sharkie/4.Attack/Fin slap/2.png", "/public/img/1.Sharkie/4.Attack/Fin slap/3.png", "/public/img/1.Sharkie/4.Attack/Fin slap/4.png", "/public/img/1.Sharkie/4.Attack/Fin slap/5.png", "/public/img/1.Sharkie/4.Attack/Fin slap/6.png", "/public/img/1.Sharkie/4.Attack/Fin slap/7.png", "/public/img/1.Sharkie/4.Attack/Fin slap/8.png"];
  IMAGES_LONGIDLE = ["/public/img/1.Sharkie/2.Long_IDLE/I1.png", "/public/img/1.Sharkie/2.Long_IDLE/I2.png", "/public/img/1.Sharkie/2.Long_IDLE/I3.png", "/public/img/1.Sharkie/2.Long_IDLE/I4.png", "/public/img/1.Sharkie/2.Long_IDLE/I5.png", "/public/img/1.Sharkie/2.Long_IDLE/I6.png", "/public/img/1.Sharkie/2.Long_IDLE/I7.png", "/public/img/1.Sharkie/2.Long_IDLE/I8.png", "/public/img/1.Sharkie/2.Long_IDLE/I9.png", "/public/img/1.Sharkie/2.Long_IDLE/I10.png", "/public/img/1.Sharkie/2.Long_IDLE/I11.png", "/public/img/1.Sharkie/2.Long_IDLE/I12.png", "/public/img/1.Sharkie/2.Long_IDLE/I13.png", "/public/img/1.Sharkie/2.Long_IDLE/I14.png"];
  IMAGES_POISONED = ["/public/img/1.Sharkie/5.Hurt/1.Poisoned/1.png", "/public/img/1.Sharkie/5.Hurt/1.Poisoned/2.png", "/public/img/1.Sharkie/5.Hurt/1.Poisoned/3.png", "/public/img/1.Sharkie/5.Hurt/1.Poisoned/4.png", "/public/img/1.Sharkie/5.Hurt/1.Poisoned/5.png"];
  IMAGES_SHOCK = ["/public/img/1.Sharkie/5.Hurt/2.Electric shock/1.png", "/public/img/1.Sharkie/5.Hurt/2.Electric shock/2.png", "/public/img/1.Sharkie/5.Hurt/2.Electric shock/3.png"];
  IMAGES_DEAD = ["/public/img/1.Sharkie/6.dead/1.Poisoned/1.png", "/public/img/1.Sharkie/6.dead/1.Poisoned/2.png", "/public/img/1.Sharkie/6.dead/1.Poisoned/3.png", "/public/img/1.Sharkie/6.dead/1.Poisoned/4.png", "/public/img/1.Sharkie/6.dead/1.Poisoned/5.png", "/public/img/1.Sharkie/6.dead/1.Poisoned/6.png", "/public/img/1.Sharkie/6.dead/1.Poisoned/7.png", "/public/img/1.Sharkie/6.dead/1.Poisoned/8.png", "/public/img/1.Sharkie/6.dead/1.Poisoned/9.png", "/public/img/1.Sharkie/6.dead/1.Poisoned/10.png", "/public/img/1.Sharkie/6.dead/1.Poisoned/11.png", "/public/img/1.Sharkie/6.dead/1.Poisoned/12.png"];
  IMAGES_DEAD_SHOCK = ["/public/img/1.Sharkie/6.dead/2.Electro_shock/1.png", "/public/img/1.Sharkie/6.dead/2.Electro_shock/2.png", "/public/img/1.Sharkie/6.dead/2.Electro_shock/3.png", "/public/img/1.Sharkie/6.dead/2.Electro_shock/4.png", "/public/img/1.Sharkie/6.dead/2.Electro_shock/5.png", "/public/img/1.Sharkie/6.dead/2.Electro_shock/6.png", "/public/img/1.Sharkie/6.dead/2.Electro_shock/7.png", "/public/img/1.Sharkie/6.dead/2.Electro_shock/8.png", "/public/img/1.Sharkie/6.dead/2.Electro_shock/9.png", "/public/img/1.Sharkie/6.dead/2.Electro_shock/10.png"];
  IMAGES_WITH_BUBBLE = ["/public/img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png", "/public/img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png", "/public/img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png", "/public/img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png", "/public/img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png", "/public/img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png", "/public/img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png", "/public/img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png"];
  IMAGES_WITH_PBUBBLE = ["/public/img/1.Sharkie/4.Attack/Bubble trap/For Whale/1.png", "/public/img/1.Sharkie/4.Attack/Bubble trap/For Whale/2.png", "/public/img/1.Sharkie/4.Attack/Bubble trap/For Whale/3.png", "/public/img/1.Sharkie/4.Attack/Bubble trap/For Whale/4.png", "/public/img/1.Sharkie/4.Attack/Bubble trap/For Whale/5.png", "/public/img/1.Sharkie/4.Attack/Bubble trap/For Whale/6.png", "/public/img/1.Sharkie/4.Attack/Bubble trap/For Whale/7.png", "/public/img/1.Sharkie/4.Attack/Bubble trap/For Whale/8.png"];
  IMAGES_WITHOUT_BUBBLE = ["/public/img/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/1.png", "/public/img/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/2.png", "/public/img/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/3.png", "/public/img/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/4.png", "/public/img/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/5.png", "/public/img/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/6.png", "/public/img/1.Sharkie/4.Attack/Bubble trap/Op2 (Without Bubbles)/7.png"];

  world;
  slapInProgress = false;
  shotInProgress = false;
  longIdleInProgress = false;
  shotPressed = false;
  isVulnerable = true;
  hitAnimationInProgress = false;
  currentImage = 0;
  idleTimer = 0;
  idleLimit = 15 * 1000;
  bottleCount = 0;
  finslap_sound = new Audio("/src/audio/finslap.mp3");
  bubble_sound = new Audio("/src/audio/bubble_shot.mp3");
  ouch_sound = new Audio("/src/audio/ouch.mp3");
  shock_sound = new Audio("/src/audio/shock.mp3");
  game_over_sound = new Audio("/src/audio/game_over.mp3");

  constructor() {
    super().loadImg("/public/img/1.Sharkie/1.IDLE/1.png");
    this.loadImgs(this.IMAGES_IDLE);
    this.loadImgs(this.IMAGES_SWIM);
    this.loadImgs(this.IMAGES_SLAP);
    this.loadImgs(this.IMAGES_LONGIDLE);
    this.loadImgs(this.IMAGES_DEAD);
    this.loadImgs(this.IMAGES_DEAD_SHOCK);
    this.loadImgs(this.IMAGES_POISONED);
    this.loadImgs(this.IMAGES_SHOCK);
    this.loadImgs(this.IMAGES_WITH_BUBBLE);
    this.loadImgs(this.IMAGES_WITH_PBUBBLE);
    this.loadImgs(this.IMAGES_WITHOUT_BUBBLE);
    this.hitboxX = 120;
    this.hitboxY = 120;
    this.hitboxWidth = 80;
    this.hitboxHeight = 40;
    this.height = 200;
    this.width = 200;
    this.animate();
    window.addEventListener("keyup", () => {
      if (this.world.keyboard.E || this.world.keyboard.Q || this.world.keyboard.SPACE) {
        this.shotPressed = false;
      }
    });
  }

  playHitSound(source) {
    if (source === "fish" || source === "endboss") {
      this.ouch_sound.play();
    } else if (source === "jellyfish") {
      this.shock_sound.play();
    }
  }

  /**
   * Determines if the character is allowed to attack based on the attack delay.
   * The attack is allowed if the time since the last attack is greater than or equal to the attack delay.
   *
   * @returns {boolean} True if the character can attack, false otherwise.
   */
  canAttack() {
    const currentTime = Date.now();
    return currentTime - this.lastAttackTime >= this.attackDelay;
  }

  /**
   * Animates the character's actions by updating different movement and state animations.
   * Calls methods to animate movement, idle state, slap action, shot action, and camera update.
   */
  animate() {
    this.animateMovement();
    this.animateLongIdle();
    this.animateSlap();
    this.animateShot();
    this.updateCamera();
    this.moveCharacter();
  }

  /**
   * Animates the character's movement based on the current state (e.g., idle, swimming, dead).
   * Updates the animation at a rate of 5 frames per second.
   */
  animateMovement() {
    setInterval(() => {
      if (this.isDead()) {
        if (this.deathSource === "jellyfish") {
          this.loadAnimation("IMAGES_DEAD_SHOCK");
        } else {
          this.loadAnimation("IMAGES_DEAD");
        }
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.loadAnimation("IMAGES_SWIM");
      } else {
        this.loadAnimation("IMAGES_IDLE");
      }
    }, 1000 / 5);
  }

  /**
   * Animates the character's long idle state after a period of inactivity.
   * Resets if the character is dead or an idle reset is triggered.
   */
  animateLongIdle() {
    setInterval(() => {
      if (this.isDead()) {
        return;
      }
      if (this.checkForIdleReset()) {
        return;
      }
      this.idleTimer += 1000 / 5;
      if (this.idleTimer >= this.idleLimit && !this.longIdleInProgress) {
        this.startLongIdle();
      }
      this.longIdleAnimation();
    }, 1000 / 5);
  }

  /**
   * Resets the long idle state if any movement or action key is pressed.
   *
   * @returns {boolean} True if an idle reset is triggered, otherwise false.
   */
  checkForIdleReset() {
    if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.SPACE || this.world.keyboard.UP || this.world.keyboard.DOWN || this.world.keyboard.E || this.world.keyboard.Q) {
      this.resetLongIdle();
      return true;
    }
    return false;
  }

  /**
   * Starts the long idle animation by setting the appropriate flags.
   * Sets the `longIdleInProgress` flag to true and resets the current animation image.
   */
  startLongIdle() {
    this.longIdleInProgress = true;
    this.currentImage = 0;
  }

  /**
   * Resets the long idle state.
   * Clears the idle timer and stops the long idle animation by setting the appropriate flags.
   */
  resetLongIdle() {
    this.idleTimer = 0;
    this.longIdleInProgress = false;
  }

  /**
   * Updates the long idle animation by cycling through images and looping after the initial frames.
   */
  longIdleAnimation() {
    if (this.longIdleInProgress) {
      if (this.currentImage < 9) {
        let path = this.IMAGES_LONGIDLE[this.currentImage];
        this.img = this.imageCache[path];
        this.currentImage++;
      } else {
        let i = ((this.currentImage - 9) % 5) + 9;
        let path = this.IMAGES_LONGIDLE[i];
        this.img = this.imageCache[path];
        this.currentImage++;
      }
    }
  }

  /**
   * Animates the slap action and checks for collisions at a rate of 10 frames per second.
   */
  animateSlap() {
    setInterval(() => {
      if (this.isDead()) {
        return;
      }
      if (this.world.keyboard.SPACE && this.canAttack() && !this.slapInProgress) {
        this.slapInProgress = true;
        this.currentImage = 0;
        this.lastAttackTime = Date.now();
      }
      this.slapAnimation();
      this.world.checkFinSlapCollision();
    }, 1000 / 10);
  }

  /**
   * Initiates the slap action when the SPACE key is pressed and resets the animation frame.
   */
  startSlap() {
    if (this.world.keyboard.SPACE && !this.slapInProgress) {
      this.slapInProgress = true;
      this.currentImage = 0;
    }
  }

  /**
   * Updates the slap animation, cycles frames, plays the slap sound, and resets the animation.
   */
  slapAnimation() {
    if (this.slapInProgress) {
      this.activateTemporaryInvulnerability();
      if (this.currentImage < this.IMAGES_SLAP.length) {
        let path = this.IMAGES_SLAP[this.currentImage];
        this.img = this.imageCache[path];
        this.currentImage++;
        this.finslap_sound.play();
      } else {
        this.slapInProgress = false;
        this.currentImage = 0;
      }
    }
  }

  /**
   * Animates the shot action, bubble animation, and checks for collisions at 10 frames per second.
   */
  animateShot() {
    setInterval(() => {
      if (!this.isDead()) {
        this.startShot();
        this.shotBubble();
        this.world.checkBubbleCollision();
      }
    }, 1000 / 10);
  }

  /**
   * Grants 0.5 seconds of invulnerability by setting `isVulnerable` to `false`.
   */
  activateTemporaryInvulnerability() {
    if (!this.isVulnerable) return;
    this.isVulnerable = false;
    setTimeout(() => {
      this.isVulnerable = true;
    }, 500);
  }

  /**
   * Initiates a normal or poison shot based on the key pressed (E or Q).
   */
  startShot() {
    if (!this.shotPressed && !this.shotInProgress && this.canAttack()) {
      if (this.world.keyboard.E) {
        this.startNormalShot();
      } else if (this.world.keyboard.Q) {
        this.startPoisonShot();
      }
    }
  }

  /**
   * Starts a normal shot.
   */
  startNormalShot() {
    this.shotPressed = true;
    this.shotInProgress = true;
    this.currentImage = 0;
    this.createBubble("normal");
    this.bubble_sound.play();
    this.lastAttackTime = Date.now();
  }

  /**
   * Starts a poison shot.
   */
  startPoisonShot() {
    this.shotPressed = true;
    this.shotInProgress = true;
    this.currentImage = 0;
    if (this.world.bottleStatusbar.bottleCollect === 0) {
      this.loadAnimation("IMAGES_WITHOUT_BUBBLE");
    } else {
      this.createBubble("poison");
      this.bubble_sound.play();
      this.world.bottleStatusbar.decreaseBottleCount();
    }
    this.lastAttackTime = Date.now();
  }

  /**
   * Handles the animation and progress of the shot bubble.
   * Updates the shot bubble image based on the current state.
   * If the shot is completed, it resets the shot state.
   */
  shotBubble() {
    if (this.shotInProgress) {
      const imagesToUse = this.getImagesToUse();

      if (imagesToUse && this.currentImage < imagesToUse.length) {
        this.updateShotImage(imagesToUse);
      } else {
        this.resetShot();
      }
    }
  }

  /**
   * Determines the images to use based on the keyboard input.
   * @returns {Array} List of image paths.
   */
  getImagesToUse() {
    if (this.world.keyboard.E) {
      return this.IMAGES_WITH_BUBBLE;
    } else if (this.world.keyboard.Q) {
      return this.getBottleImages();
    }
    return null;
  }

  /**
   * Returns the correct bubble images based on the bottle status.
   * @returns {Array} List of image paths for bubbles.
   */
  getBottleImages() {
    return this.world.bottleStatusbar.bottleCollect > 0 ? this.IMAGES_WITH_PBUBBLE : this.IMAGES_WITHOUT_BUBBLE;
  }

  /**
   * Updates the current shot image.
   * @param {Array} imagesToUse List of image paths.
   */
  updateShotImage(imagesToUse) {
    let path = imagesToUse[this.currentImage];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Resets the shot progress.
   */
  resetShot() {
    this.shotInProgress = false;
    this.shotPressed = false;
    this.currentImage = 0;
  }

  /**
   * Creates a new bubble at the character's position and adds it to the throwable objects.
   *
   * @param {string} type - The type of the bubble (e.g., "normal" or "poison").
   */
  createBubble(type) {
    const bubbleX = this.calculateBubbleX();
    const bubbleY = this.y + 50;
    const bubble = new ThrowableObject(bubbleX, bubbleY, type);
    bubble.throw(this.getThrowDirection());
    this.world.throwableObjects.push(bubble);
  }

  /**
   * Calculates the X position for the bubble based on direction.
   * @returns {number} The X position for the bubble.
   */
  calculateBubbleX() {
    const direction = this.getThrowDirection();
    return this.otherDirection ? this.x + 20 * direction : this.x + 150 * direction;
  }

  /**
   * Returns the direction for throwing the bubble.
   * @returns {number} The throw direction.
   */
  getThrowDirection() {
    return this.otherDirection ? -1 : 1;
  }

  /**
   * Updates the camera position to follow the character with a 100-unit offset.
   * Runs at 60 frames per second.
   */
  updateCamera() {
    setInterval(() => {
      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);
  }

  /**
   * Updates the character's position based on user input, moving horizontally and vertically if not dead.
   * Runs at 60 frames per second.
   */
  moveCharacter() {
    setInterval(() => {
      if (this.isDead()) {
        return;
      }
      this.handleHorizontalMovement();
      this.handleVerticalMovement();
    }, 1000 / 60);
  }

  /**
   * Handles the character's horizontal movement based on keyboard input.
   * Moves left or right, updating the direction and ensuring level boundaries.
   */
  handleHorizontalMovement() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.x += 3;
      this.otherDirection = false;
    }

    if (this.world.keyboard.LEFT && this.x > 0) {
      this.x -= 3;
      this.otherDirection = true;
    }
  }

  /**
   * Handles the character's vertical movement based on keyboard input.
   * Moves up or down, respecting the minimum and maximum Y positions.
   */
  handleVerticalMovement() {
    const minY = -90;
    const maxY = 320;
    if (this.world.keyboard.UP && this.y > minY) {
      this.y -= 3;
    }
    if (this.world.keyboard.DOWN && this.y < maxY) {
      this.y += 3;
    }
  }
}
