class Character extends MoveableObject {
  x = 100;
  y = 300;

  IMAGES_IDLE = ["/public/img/1.Sharkie/1.IDLE/1.png", "/public/img/1.Sharkie/1.IDLE/2.png", "/public/img/1.Sharkie/1.IDLE/3.png", "/public/img/1.Sharkie/1.IDLE/4.png", "/public/img/1.Sharkie/1.IDLE/5.png", "/public/img/1.Sharkie/1.IDLE/6.png", "/public/img/1.Sharkie/1.IDLE/7.png", "/public/img/1.Sharkie/1.IDLE/8.png", "/public/img/1.Sharkie/1.IDLE/9.png", "/public/img/1.Sharkie/1.IDLE/10.png", "/public/img/1.Sharkie/1.IDLE/11.png", "/public/img/1.Sharkie/1.IDLE/12.png", "/public/img/1.Sharkie/1.IDLE/13.png", "/public/img/1.Sharkie/1.IDLE/14.png", "/public/img/1.Sharkie/1.IDLE/15.png", "/public/img/1.Sharkie/1.IDLE/16.png", "/public/img/1.Sharkie/1.IDLE/17.png", "/public/img/1.Sharkie/1.IDLE/18.png"];
  IMAGES_SWIM = ["/public/img/1.Sharkie/3.Swim/1.png", "/public/img/1.Sharkie/3.Swim/2.png", "/public/img/1.Sharkie/3.Swim/3.png", "/public/img/1.Sharkie/3.Swim/4.png", "/public/img/1.Sharkie/3.Swim/5.png", "/public/img/1.Sharkie/3.Swim/6.png"];
  IMAGES_SLAP = ["/public/img/1.Sharkie/4.Attack/Fin slap/1.png", "/public/img/1.Sharkie/4.Attack/Fin slap/2.png", "/public/img/1.Sharkie/4.Attack/Fin slap/3.png", "/public/img/1.Sharkie/4.Attack/Fin slap/4.png", "/public/img/1.Sharkie/4.Attack/Fin slap/5.png", "/public/img/1.Sharkie/4.Attack/Fin slap/6.png", "/public/img/1.Sharkie/4.Attack/Fin slap/7.png", "/public/img/1.Sharkie/4.Attack/Fin slap/8.png"];
  IMAGES_LONGIDLE = ["/public/img/1.Sharkie/2.Long_IDLE/I1.png", "/public/img/1.Sharkie/2.Long_IDLE/I2.png", "/public/img/1.Sharkie/2.Long_IDLE/I3.png", "/public/img/1.Sharkie/2.Long_IDLE/I4.png", "/public/img/1.Sharkie/2.Long_IDLE/I5.png", "/public/img/1.Sharkie/2.Long_IDLE/I6.png", "/public/img/1.Sharkie/2.Long_IDLE/I7.png", "/public/img/1.Sharkie/2.Long_IDLE/I8.png", "/public/img/1.Sharkie/2.Long_IDLE/I9.png", "/public/img/1.Sharkie/2.Long_IDLE/I10.png", "/public/img/1.Sharkie/2.Long_IDLE/I11.png", "/public/img/1.Sharkie/2.Long_IDLE/I12.png", "/public/img/1.Sharkie/2.Long_IDLE/I13.png", "/public/img/1.Sharkie/2.Long_IDLE/I14.png"];
  IMAGES_POISONED = ["/public/img/1.Sharkie/5.Hurt/1.Poisoned/1.png", "/public/img/1.Sharkie/5.Hurt/1.Poisoned/2.png", "/public/img/1.Sharkie/5.Hurt/1.Poisoned/3.png", "/public/img/1.Sharkie/5.Hurt/1.Poisoned/4.png", "/public/img/1.Sharkie/5.Hurt/1.Poisoned/5.png"];  
  IMAGES_SHOCK = ["/public/img/1.Sharkie/5.Hurt/2.Electric shock/1.png", "/public/img/1.Sharkie/5.Hurt/2.Electric shock/2.png", "/public/img/1.Sharkie/5.Hurt/2.Electric shock/3.png"];
  IMAGES_DEAD = ["/public/img/1.Sharkie/6.dead/1.Poisoned/1.png", "/public/img/1.Sharkie/6.dead/1.Poisoned/2.png", "/public/img/1.Sharkie/6.dead/1.Poisoned/3.png", "/public/img/1.Sharkie/6.dead/1.Poisoned/4.png", "/public/img/1.Sharkie/6.dead/1.Poisoned/5.png", "/public/img/1.Sharkie/6.dead/1.Poisoned/6.png", "/public/img/1.Sharkie/6.dead/1.Poisoned/7.png", "/public/img/1.Sharkie/6.dead/1.Poisoned/8.png", "/public/img/1.Sharkie/6.dead/1.Poisoned/9.png", "/public/img/1.Sharkie/6.dead/1.Poisoned/10.png", "/public/img/1.Sharkie/6.dead/1.Poisoned/11.png", "/public/img/1.Sharkie/6.dead/1.Poisoned/12.png"];
  IMAGES_DEAD_SHOCK = ["/public/img/1.Sharkie/6.dead/2.Electro_shock/1.png", "/public/img/1.Sharkie/6.dead/2.Electro_shock/2.png", "/public/img/1.Sharkie/6.dead/2.Electro_shock/3.png", "/public/img/1.Sharkie/6.dead/2.Electro_shock/4.png", "/public/img/1.Sharkie/6.dead/2.Electro_shock/5.png", "/public/img/1.Sharkie/6.dead/2.Electro_shock/6.png", "/public/img/1.Sharkie/6.dead/2.Electro_shock/7.png", "/public/img/1.Sharkie/6.dead/2.Electro_shock/8.png", "/public/img/1.Sharkie/6.dead/2.Electro_shock/9.png", "/public/img/1.Sharkie/6.dead/2.Electro_shock/10.png"]
  IMAGES_WITH_BUBBLE = ["/public/img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png", "/public/img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png", "/public/img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png", "/public/img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png", "/public/img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png", "/public/img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png", "/public/img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png", "/public/img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png"];
  IMAGES_WITH_PBUBBLE = ["/public/img/1.Sharkie/4.Attack/Bubble trap/For Whale/1.png", "/public/img/1.Sharkie/4.Attack/Bubble trap/For Whale/2.png", "/public/img/1.Sharkie/4.Attack/Bubble trap/For Whale/3.png", "/public/img/1.Sharkie/4.Attack/Bubble trap/For Whale/4.png", "/public/img/1.Sharkie/4.Attack/Bubble trap/For Whale/5.png", "/public/img/1.Sharkie/4.Attack/Bubble trap/For Whale/6.png", "/public/img/1.Sharkie/4.Attack/Bubble trap/For Whale/7.png", "/public/img/1.Sharkie/4.Attack/Bubble trap/For Whale/8.png"];

  world;
  slapInProgress = false;
  shotInProgress = false;
  longIdleInProgress = false;
  shotPressed = false;
  currentImage = 0;
  idleTimer = 0;
  idleLimit = 15 * 1000;
  bottleCount = 0;
  finslap_sound = new Audio("/src/audio/finslap.mp3");

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
    this.hitboxWidth = 160;
    this.hitboxHeight = 160;
    this.animate();
    window.addEventListener('keyup', () => {
      this.shotPressed = false;
  });
  }

  animate() {
    this.animateMovement();
    this.animateLongIdle();
    this.animateSlap();
    this.animateShot();
    this.updateCamera();
    this.moveCharacter();
  }

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

  checkForIdleReset() {
    if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.SPACE || this.world.keyboard.UP || this.world.keyboard.DOWN || this.world.keyboard.E || this.world.keyboard.Q) {
      this.resetLongIdle();
      return true;
    }
    return false;
  }

  startLongIdle() {
    this.longIdleInProgress = true;
    this.currentImage = 0;
  }

  resetLongIdle() {
    this.idleTimer = 0;
    this.longIdleInProgress = false;
  }

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

  animateSlap() {
    setInterval(() => {
      if (this.isDead()) {
        return;
      }
      this.startSlap();
      this.slapAnimation();
      this.checkFinSlapCollision();
    }, 1000 / 10);
  }

  checkFinSlapCollision() {
    if (this.slapInProgress) {
      this.world.level.enemies.forEach((enemy) => {
        if (enemy instanceof Fish && this.isColliding(enemy)) {
          console.log("Fish wurde vom Fin Slap getroffen!");
          this.handleFinSlapHit(enemy);
        }
      });
    }
  }

  handleFinSlapHit(enemy) {
    if (!enemy.hasBeenSlapped) {
      enemy.hasBeenSlapped = true;
      this.loadImgs(enemy.deathImages);
      // Hier kannst du weitere Reaktionen des Gegners hinzufügen, z.B. Animationen oder Effekte
      setTimeout(() => enemy.hasBeenSlapped = false, 500); // Gegner kann nach 500 ms wieder getroffen werden
    }
  }

  startSlap() {
    if (this.world.keyboard.SPACE && !this.slapInProgress) {
      this.slapInProgress = true;
      this.currentImage = 0;
    }
  }

  slapAnimation() {
    if (this.slapInProgress) {
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

  animateShot() {
    setInterval(() => {
      if (!this.isDead()) {
        this.startShot();
        this.shotBubble();
      }
    }, 1000 / 10);
  }

  startShot() {
    if (!this.shotPressed) {      
      if (this.world.keyboard.E && !this.shotInProgress) {
        this.shotPressed = true;
        this.shotInProgress = true;
        this.createBubble("normal");
      } else if (this.world.keyboard.Q && !this.shotInProgress) {
        this.shotPressed = true;
        this.shotInProgress = true;
        this.createBubble("poison");
      }
    }
  }

  shotBubble() {
    if (this.shotInProgress) {
      if (this.currentImage < this.IMAGES_WITH_BUBBLE.length) {
        let path = this.IMAGES_WITH_BUBBLE[this.currentImage];
        this.img = this.imageCache[path];
        this.currentImage++;
      } else {
        this.shotInProgress = false;
        this.currentImage = 0;
      }
    }
  }

  createBubble(type) {
    const direction = this.otherDirection ? -1 : 1;
    const bubbleX = this.x + (100 * direction);
    const bubbleY = this.y + 20;
    const bubble = new ThrowableObject(bubbleX, bubbleY, type);
    bubble.throw(direction);
    this.world.throwableObjects.push(bubble);
  }

  updateCamera() {
    setInterval(() => {
      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);
  }

  moveCharacter() { 
    setInterval(() => {
      if (this.isDead()) {
        return;
      }
      this.handleHorizontalMovement();
      this.handleVerticalMovement();
    }, 1000 / 60);
  }
  
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
  
  handleVerticalMovement() {
    if (this.world.keyboard.UP) {
      this.y -= 3;
    }
  
    if (this.world.keyboard.DOWN) {
      this.y += 3;
    }
  }
}
