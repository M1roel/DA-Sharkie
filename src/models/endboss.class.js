class Endboss extends MoveableObject {
  x = 4650;
  y = 0;

  IMAGES_INTRODUCE = ["/public/img/2.Enemy/3 Final Enemy/1.Introduce/1.png", "/public/img/2.Enemy/3 Final Enemy/1.Introduce/2.png", "/public/img/2.Enemy/3 Final Enemy/1.Introduce/3.png", "/public/img/2.Enemy/3 Final Enemy/1.Introduce/4.png", "/public/img/2.Enemy/3 Final Enemy/1.Introduce/5.png", "/public/img/2.Enemy/3 Final Enemy/1.Introduce/6.png", "/public/img/2.Enemy/3 Final Enemy/1.Introduce/7.png", "/public/img/2.Enemy/3 Final Enemy/1.Introduce/8.png", "/public/img/2.Enemy/3 Final Enemy/1.Introduce/9.png", "/public/img/2.Enemy/3 Final Enemy/1.Introduce/10.png"];
  IMAGES_ATTACK = ["/public/img/2.Enemy/3 Final Enemy/Attack/1.png", "/public/img/2.Enemy/3 Final Enemy/Attack/2.png", "/public/img/2.Enemy/3 Final Enemy/Attack/3.png", "/public/img/2.Enemy/3 Final Enemy/Attack/4.png", "/public/img/2.Enemy/3 Final Enemy/Attack/5.png", "/public/img/2.Enemy/3 Final Enemy/Attack/6.png"];
  IMAGES_FLOATING = ["/public/img/2.Enemy/3 Final Enemy/2.floating/1.png", "/public/img/2.Enemy/3 Final Enemy/2.floating/2.png", "/public/img/2.Enemy/3 Final Enemy/2.floating/3.png", "/public/img/2.Enemy/3 Final Enemy/2.floating/4.png", "/public/img/2.Enemy/3 Final Enemy/2.floating/5.png", "/public/img/2.Enemy/3 Final Enemy/2.floating/6.png", "/public/img/2.Enemy/3 Final Enemy/2.floating/7.png", "/public/img/2.Enemy/3 Final Enemy/2.floating/8.png", "/public/img/2.Enemy/3 Final Enemy/2.floating/9.png", "/public/img/2.Enemy/3 Final Enemy/2.floating/10.png", "/public/img/2.Enemy/3 Final Enemy/2.floating/11.png", "/public/img/2.Enemy/3 Final Enemy/2.floating/12.png", "/public/img/2.Enemy/3 Final Enemy/2.floating/13.png"];
  IMAGES_HURT = ["/public/img/2.Enemy/3 Final Enemy/Hurt/1.png", "/public/img/2.Enemy/3 Final Enemy/Hurt/2.png", "/public/img/2.Enemy/3 Final Enemy/Hurt/3.png", "/public/img/2.Enemy/3 Final Enemy/Hurt/4.png"];
  IMAGES_DEAD = ["/public/img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png", "/public/img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png", "/public/img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png", "/public/img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png", "/public/img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png", "/public/img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2.png"];

  world;
  endboss_sound = new Audio("/src/audio/endboss.mp3");
  hitByBubble = false;
  isDead = false;
  currentImage = 0;
  lifes = 5;

  constructor() {
    super();
    this.loadImg("/public/img/2.Enemy/3 Final Enemy/1.Introduce/1.png");
    this.loadImgs(this.IMAGES_INTRODUCE);
    this.loadImgs(this.IMAGES_FLOATING);
    this.loadImgs(this.IMAGES_ATTACK);
    this.loadImgs(this.IMAGES_HURT);
    this.loadImgs(this.IMAGES_DEAD);
    this.animate();
  }

  animate() {
    this.moveLeft();
  }

  startAnimation() {
    this.animateOnce();
    this.endboss_sound.play();
  }

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

  startInfiniteAnimation() {
    this.animateInfinite();
  }

  animateInfinite() {
    setInterval(() => {
      let i = this.currentImage % this.IMAGES_FLOATING.length;
      let path = this.IMAGES_FLOATING[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 1000 / 5);
  }

  handleBubbleHit() {
    // Überprüfen, ob der Endboss bereits getroffen oder tot ist
    if (this.isDead || this.hitByBubble) return;

    this.hitByBubble = true;
    this.lifes--;

    // Überprüfen, ob der Endboss besiegt wurde
    if (this.lifes <= 0) {
      this.isDead = true;
      this.playDeathAnimation();
    } else {
      this.playHurtAnimation();
      // Nach kurzer Zeit zurücksetzen, damit weitere Treffer möglich sind
      setTimeout(() => {
        this.hitByBubble = false;
      }, 500);
    }
  }

  // Animationen für den verletzten Endboss
  playHurtAnimation() {
    this.loadAnimation(this.IMAGES_HURT);
    // Wählen Sie hier, wie lange die Verletzungsanimation laufen soll
    setTimeout(() => {
      this.currentImage = 0;
      this.loadAnimation(this.IMAGES_FLOATING); // Zurück zur Standardanimation
    }, 1000); // Beispiel: 1 Sekunde
  }

  // Animation für das Ableben des Endbosses
  playDeathAnimation() {
    this.loadAnimation(this.IMAGES_DEAD);
    setTimeout(() => {
      // Weitere Aktionen, die nach dem Tod des Endbosses ablaufen sollen, wie z.B. das Entfernen aus dem Spiel
      this.flyOff();
    }, 2000); // Dauer der Todesanimation
  }
}
