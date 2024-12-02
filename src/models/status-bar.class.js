class StatusBar extends DrawableObject {
  IMAGES_LIFE = ["/public/img/4. Marcadores/Purple/100_ .png", "/public/img/4. Marcadores/Purple/80_ .png", "/public/img/4. Marcadores/green/Life/60_  copia 3.png", "/public/img/4. Marcadores/green/Life/40_  copia 3.png", "/public/img/4. Marcadores/orange/20_ copia 2.png", "/public/img/4. Marcadores/orange/0_  copia.png"];
  IMAGES_ENDBOSS_LIFE = ["/public/img/4. Marcadores/Purple/100_ .png", "/public/img/4. Marcadores/Purple/80_ .png", "/public/img/4. Marcadores/green/Life/60_  copia 3.png", "/public/img/4. Marcadores/green/Life/40_  copia 3.png", "/public/img/4. Marcadores/orange/20_ copia 2.png", "/public/img/4. Marcadores/orange/0_  copia.png"];
  IMAGES_COIN = ["/public/img/4. Marcadores/Purple/100__1.png", "/public/img/4. Marcadores/Purple/80_ _1.png", "/public/img/4. Marcadores/green/Coin/60_  copia 4.png", "/public/img/4. Marcadores/green/Coin/40_  copia 4.png", "/public/img/4. Marcadores/orange/20_  copia.png", "/public/img/4. Marcadores/orange/0_  copia 2.png"];
  IMAGES_BOTTLE = ["/public/img/4. Marcadores/Purple/100_.png", "/public/img/4. Marcadores/Purple/80_.png", "/public/img/4. Marcadores/green/poisoned bubbles/60_ copia 2.png", "/public/img/4. Marcadores/green/poisoned bubbles/40_ copia 2.png", "/public/img/4. Marcadores/orange/20_ copia.png", "/public/img/4. Marcadores/orange/0_ copia.png"];

  percentageEnergy = 100;
  percentageEndbossEnergy = 5;
  coinsCollect = 0;
  bottleCollect = 0;

  constructor(x, y, type) {
    super();
    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 200;

    if (type === "life") {
      this.loadImgs(this.IMAGES_LIFE);
      this.setPercentageEnergy(100);
    } else if (type === "endbossLife") {
      this.loadImgs(this.IMAGES_ENDBOSS_LIFE);
      this.setPercentageEndbossEnergy(5)
    } else if (type === "coin") {
      this.loadImgs(this.IMAGES_COIN);
      this.setCoinsCollect(0);
    } else if (type === "bottle") {
      this.loadImgs(this.IMAGES_BOTTLE);
      this.setBottleCollect(0);
    }
  }

  /**
   * Sets the energy percentage for the player and updates the corresponding image.
   * 
   * @param {number} percentageEnergy - The new energy percentage (0 to 100).
   */
  setPercentageEnergy(percentageEnergy) {
    this.percentageEnergy = percentageEnergy;
    let path = this.IMAGES_LIFE[this.lifeImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Sets the endboss's energy percentage and updates the corresponding image.
   * 
   * @param {number} percentageEndbossEnergy - The new energy percentage of the endboss (0 to 5).
   */
  setPercentageEndbossEnergy(percentageEndbossEnergy) {
    this.percentageEndbossEnergy = percentageEndbossEnergy;
    let path = this.IMAGES_ENDBOSS_LIFE[this.endbossLifeImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Sets the collected coins count and updates the corresponding image.
   * 
   * @param {number} coinsCollect - The number of coins collected by the player.
   */
  setCoinsCollect(coinsCollect) {
    this.coinsCollect = coinsCollect;
    let path = this.IMAGES_COIN[this.coinsImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Sets the collected bottles count and updates the corresponding image.
   * 
   * @param {number} bottleCollect - The number of bottles collected by the player.
   */
  setBottleCollect(bottleCollect) {
    this.bottleCollect = bottleCollect;
    let path = this.IMAGES_BOTTLE[this.bottleImageIndex()];
    this.img = this.imageCache[path];
  }

   /**
   * Determines the index of the image to display based on the player's current energy percentage.
   * 
   * @returns {number} - The index of the corresponding life image based on the energy percentage.
   */
  lifeImageIndex() {
    if (this.percentageEnergy == 100) return 0;
    else if (this.percentageEnergy > 80) return 1;
    else if (this.percentageEnergy > 60) return 2;
    else if (this.percentageEnergy > 40) return 3;
    else if (this.percentageEnergy > 5) return 4;
    else return 5;
  }

  /**
   * Determines the index of the image to display based on the endboss's current energy percentage.
   * 
   * @returns {number} - The index of the corresponding endboss life image.
   */
  endbossLifeImageIndex() {
    if (this.percentageEndbossEnergy == 5) return 0;
    else if (this.percentageEndbossEnergy > 3) return 1;
    else if (this.percentageEndbossEnergy > 2) return 2;
    else if (this.percentageEndbossEnergy > 1) return 3;
    else if (this.percentageEndbossEnergy > 0) return 4;
    else return 5;
  }

  /**
   * Determines the index of the image to display based on the number of coins collected.
   * 
   * @returns {number} - The index of the corresponding coin image based on the coins collected.
   */
  coinsImageIndex() {
    if (this.coinsCollect == 10) return 0;
    else if (this.coinsCollect > 8) return 1;
    else if (this.coinsCollect > 6) return 2;
    else if (this.coinsCollect > 4) return 3;
    else if (this.coinsCollect >= 1) return 4;
    else return 5;
  }

  /**
   * Determines the index of the image to display based on the number of bottles collected.
   * 
   * @returns {number} - The index of the corresponding bottle image based on the bottles collected.
   */
  bottleImageIndex() {
    if (this.bottleCollect == 10) return 0;
    else if (this.bottleCollect > 8) return 1;
    else if (this.bottleCollect > 6) return 2;
    else if (this.bottleCollect > 4) return 3;
    else if (this.bottleCollect >= 1) return 4;
    else return 5;
  }

  /**
   * Increases the coin count by one and updates the coin status on the status bar.
   */
  increaseCoinCount() {
    this.coinsCollect++;
    this.setCoinsCollect(this.coinsCollect);
  }

  /**
   * Increases the bottle count by one and updates the bottle status on the status bar.
   */
  increaseBottleCount() {
    this.bottleCollect++;
    this.setBottleCollect(this.bottleCollect);
  }

  /**
   * Decreases the bottle count by one and updates the bottle status on the status bar.
   */
  decreaseBottleCount() {
    this.bottleCollect--;
    this.setBottleCollect(this.bottleCollect);
  }
}
