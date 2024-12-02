class Endboss extends MoveableObject {
  x = 4650;
  y = 0;

  IMAGES_INTRODUCE = [
    "/public/img/2.Enemy/3 Final Enemy/1.Introduce/1.png",
    "/public/img/2.Enemy/3 Final Enemy/1.Introduce/2.png",
    "/public/img/2.Enemy/3 Final Enemy/1.Introduce/3.png",
    "/public/img/2.Enemy/3 Final Enemy/1.Introduce/4.png",
    "/public/img/2.Enemy/3 Final Enemy/1.Introduce/5.png",
    "/public/img/2.Enemy/3 Final Enemy/1.Introduce/6.png",
    "/public/img/2.Enemy/3 Final Enemy/1.Introduce/7.png",
    "/public/img/2.Enemy/3 Final Enemy/1.Introduce/8.png",
    "/public/img/2.Enemy/3 Final Enemy/1.Introduce/9.png",
    "/public/img/2.Enemy/3 Final Enemy/1.Introduce/10.png",
  ];
  IMAGES_ATTACK = [
    "/public/img/2.Enemy/3 Final Enemy/Attack/1.png",
    "/public/img/2.Enemy/3 Final Enemy/Attack/2.png",
    "/public/img/2.Enemy/3 Final Enemy/Attack/3.png",
    "/public/img/2.Enemy/3 Final Enemy/Attack/4.png",
    "/public/img/2.Enemy/3 Final Enemy/Attack/5.png",
    "/public/img/2.Enemy/3 Final Enemy/Attack/6.png",
  ];
  IMAGES_FLOATING = [
    "/public/img/2.Enemy/3 Final Enemy/2.floating/1.png",
    "/public/img/2.Enemy/3 Final Enemy/2.floating/2.png",
    "/public/img/2.Enemy/3 Final Enemy/2.floating/3.png",
    "/public/img/2.Enemy/3 Final Enemy/2.floating/4.png",
    "/public/img/2.Enemy/3 Final Enemy/2.floating/5.png",
    "/public/img/2.Enemy/3 Final Enemy/2.floating/6.png",
    "/public/img/2.Enemy/3 Final Enemy/2.floating/7.png",
    "/public/img/2.Enemy/3 Final Enemy/2.floating/8.png",
    "/public/img/2.Enemy/3 Final Enemy/2.floating/9.png",
    "/public/img/2.Enemy/3 Final Enemy/2.floating/10.png",
    "/public/img/2.Enemy/3 Final Enemy/2.floating/11.png",
    "/public/img/2.Enemy/3 Final Enemy/2.floating/12.png",
    "/public/img/2.Enemy/3 Final Enemy/2.floating/13.png",
  ];
  IMAGES_HURT = [
    "/public/img/2.Enemy/3 Final Enemy/Hurt/1.png",
    "/public/img/2.Enemy/3 Final Enemy/Hurt/2.png",
    "/public/img/2.Enemy/3 Final Enemy/Hurt/3.png",
    "/public/img/2.Enemy/3 Final Enemy/Hurt/4.png",
  ];
  IMAGES_DEAD = [
    "/public/img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png",
    "/public/img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png",
    "/public/img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png",
    "/public/img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png",
    "/public/img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png",
    "/public/img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2.png",
  ];

  world;
  endboss_sound = new Audio("/src/audio/endboss.mp3");
  hitByBubble = false;
  hurtInterval = null;
  isBossDead = false;
  currentImage = 0;
  lifes = 5;
  intervalId = null;
  deathEndbossAnimationFinished = false;
  allowMovement = true;
  bite_sound = new Audio("/src/audio/bite.mp3");
  endboss_hit_sound = new Audio("/src/audio/endboss_hit.mp3");
  endboss_death_sound = new Audio("/src/audio/endboss_death.mp3");
  you_win_sound = new Audio("/src/audio/you_win.mp3");

  constructor() {
    super();
    this.loadImg("/public/img/2.Enemy/3 Final Enemy/1.Introduce/1.png");
    this.loadImgs(this.IMAGES_INTRODUCE);
    this.loadImgs(this.IMAGES_FLOATING);
    this.loadImgs(this.IMAGES_ATTACK);
    this.loadImgs(this.IMAGES_HURT);
    this.loadImgs(this.IMAGES_DEAD);
    this.animate();
    this.hitboxX = 80;
    this.hitboxY = 200;
    this.hitboxWidth = 250;
    this.hitboxHeight = 100;
    this.width = 300;
    this.height = 300;
  }

  /**
   * Animates the character's movement to the left if allowed.
   */
  animate() {
    if (this.allowMovement) {
      this.moveLeft();
    }
  }

  /**
   * Starts the animation sequence once and plays the end boss sound.
   */
  startAnimation() {
    this.animateOnce();
    this.endboss_sound.play();
  }

  /**
   * Animates a sequence of images once and then loops the animation.
   * After completing the sequence, it starts an infinite loop of the animation.
   */
  animateOnce() {
    setTimeout(() => {
      let i = this.currentImage % this.IMAGES_INTRODUCE.length;
      let path = this.IMAGES_INTRODUCE[i];
      this.img = this.imageCache[path];
      this.currentImage++;

      if (this.currentImage < this.IMAGES_INTRODUCE.length) {
        this.animateOnce();
      } else {
        this.currentImage = 0;
        this.startInfiniteAnimation();
      }
    }, 1000 / 8);
  }

  /**
   * Starts the infinite animation if the boss is not dead and the death animation is not finished.
   */
  startInfiniteAnimation() {
    if (this.isBossDead || this.deathEndbossAnimationFinished) {
      return;
    }
    this.animateInfinite();
  }

  /**
   * Animates the boss infinitely by cycling through the floating images at a set interval.
   */
  animateInfinite() {
    if (this.isBossDead || this.deathEndbossAnimationFinished) {
      return;
    }
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.intervalId = setInterval(() => {
      let i = this.currentImage % this.IMAGES_FLOATING.length;
      let path = this.IMAGES_FLOATING[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 1000 / 5);
  }

  /**
   * Initiates the attack animation process if the boss is not dead.
   */
  startAttackAnimation() {
    if (this.isBossDead) return;
    this.clearAnimation();
    this.currentImage = 0;
    this.performAttack();
  }

  /**
   * Performs the attack animation by iterating through the attack images.
   * Plays the attack sound and updates the current image for each frame.
   */
  performAttack() {
    const attackDuration = 1000 / 10;

    if (this.currentImage < this.IMAGES_ATTACK.length) {
      this.bite_sound.play();
      let path = this.IMAGES_ATTACK[this.currentImage];
      this.img = this.imageCache[path];
      this.currentImage++;
      setTimeout(() => this.performAttack(), attackDuration);
    } else {
      this.resetAttack();
    }
  }

  /**
   * Resets the attack animation and starts the infinite animation loop.
   */
  resetAttack() {
    this.currentImage = 0;
    this.startInfiniteAnimation();
  }

  /**
   * Handles the event when the endboss is hit by a bubble.
   */
  handleBubbleHit() {
    if (this.isBossDead || this.hitByBubble) return;

    this.hitByBubble = true;
    this.lifes--;

    if (this.lifes <= 0) {
      this.handleBossDeath();
    } else {
      this.handleBossHurt();
    }
  }

  /**
   * Handles the logic and animations when the boss is hurt but not dead.
   */
  handleBossHurt() {
    this.endboss_hit_sound.play();
    this.playHurtAnimation(this.IMAGES_HURT);

    setTimeout(() => {
      this.hitByBubble = false;
      if (!this.isBossDead) {
        this.startInfiniteAnimation();
      }
    }, this.IMAGES_HURT.length * 200);
  }

  /**
   * Handles the logic and animations when the boss dies.
   */
  handleBossDeath() {
    this.isBossDead = true;
    this.playDeathAnimation();
  }

  /**
 * Plays the hurt animation at 5 FPS, cycling through hurt images.
 * Clears any existing animation beforehand.
 */
  playHurtAnimation() {
    this.clearAnimation();
    this.intervalId = setInterval(() => {
      let i = this.currentImage % this.IMAGES_HURT.length;
      let path = this.IMAGES_HURT[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 1000 / 5);
  }

  /**
   * Initiates the death animation for the boss.
   */
  playDeathAnimation() {
    this.prepareDeathState();
    this.startDeathAnimation(() => {
      this.completeDeathSequence();
    });
  }

  /**
   * Prepares the boss state for the death animation.
   */
  prepareDeathState() {
    this.clearAnimation();
    this.allowMovement = false;
    this.currentImage = 0;
    this.deathEndbossAnimationFinished = false;
    this.endboss_sound.pause();
    this.endboss_sound.currentTime = 0;
    this.endboss_death_sound.play();
  }

  /**
   * Starts the death animation sequence.
   * @param {Function} onComplete - Callback executed when the animation is finished.
   */
  startDeathAnimation(onComplete) {
    const frameDuration = 1000 / 5;

    const animateDeath = () => {
      if (this.currentImage < this.IMAGES_DEAD.length) {
        let path = this.IMAGES_DEAD[this.currentImage];
        this.img = this.imageCache[path];
        this.currentImage++;
        setTimeout(animateDeath, frameDuration);
      } else {
        onComplete();
      }
    };

    animateDeath();
  }

  /**
   * Completes the death sequence by finalizing the boss state and showing the victory screen.
   */
  completeDeathSequence() {
    this.deathEndbossAnimationFinished = true;
    this.setLastDeathFrame();
    this.showYouWinScreen();
  }

  /**
   * Sets the last frame of the death animation to show the final image.
   */
  setLastDeathFrame() {
    let lastImageIndex = this.IMAGES_DEAD.length - 1;
    let path = this.IMAGES_DEAD[lastImageIndex];
    this.img = this.imageCache[path];
  }

  /**
   * Clears the current animation, stopping any running intervals and resetting the animation state.
   */
  clearAnimation() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.currentImage = 0;
  }

  /**
   * Displays the "You Win" screen and plays the victory sound.
   */
  showYouWinScreen() {
    this.you_win_sound.play();
    document.getElementById("you-win").classList.remove("hidden");
    document.getElementById("game-container").classList.add("hidden");
  }
}
