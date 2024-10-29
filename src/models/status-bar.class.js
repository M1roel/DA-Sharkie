class StatusBar extends DrawableObject {
  IMAGES_LIFE = ["/public/img/4. Marcadores/Purple/100_ .png", "/public/img/4. Marcadores/Purple/80_ .png", "/public/img/4. Marcadores/green/Life/60_  copia 3.png", "/public/img/4. Marcadores/green/Life/40_  copia 3.png", "/public/img/4. Marcadores/orange/20_ copia 2.png", "/public/img/4. Marcadores/orange/0_  copia.png"];
  IMAGES_COIN = ["/public/img/4. Marcadores/Purple/100__1.png", "/public/img/4. Marcadores/Purple/80_ _1.png", "/public/img/4. Marcadores/green/Coin/60_  copia 4.png", "/public/img/4. Marcadores/green/Coin/40_  copia 4.png", "/public/img/4. Marcadores/orange/20_  copia.png", "/public/img/4. Marcadores/orange/0_  copia 2.png"];
  IMAGES_BOTTLE = ["/public/img/4. Marcadores/Purple/100_.png", "/public/img/4. Marcadores/Purple/80_.png", "/public/img/4. Marcadores/green/poisoned bubbles/60_ copia 2.png", "/public/img/4. Marcadores/green/poisoned bubbles/40_ copia 2.png", "/public/img/4. Marcadores/orange/20_ copia.png", "/public/img/4. Marcadores/orange/0_ copia.png"];

  percentageEnergy = 100;
  coinsCollect = 0;

  constructor() {
    super();
    this.loadImgs(this.IMAGES_LIFE);
    this.loadImgs(this.IMAGES_COIN);
    this.x = 60;
    this.y = 10;
    this.width = 60;
    this.height = 200;
    this.setPercentageEnergy(100);
    this.setCoinsCollect(0);
  }

  setPercentageEnergy(percentageEnergy) {
    this.percentageEnergy = percentageEnergy;
    let path = this.IMAGES_LIFE[this.lifeImageIndex()];
    this.img = this.imageCache[path];
  }

  setCoinsCollect(coinsCollect) {
    this.coinsCollect = coinsCollect;
    let path = this.IMAGES_COIN[this.lifeImageIndex()];
    this.img = this.imageCache[path];
  }

  lifeImageIndex() {
    if (this.percentageEnergy == 100) {
      return 0;
    } else if (this.percentageEnergy > 80) {
      return 1;
    } else if (this.percentageEnergy > 60) {
      return 2;
    } else if (this.percentageEnergy > 40) {
      return 3;
    } else if (this.percentageEnergy > 5) {
      return 4;
    } else {
      return 5;
    }
  }

  coinsImageIndex() {
    if (this.coinsCollect == 10) {
        return 0;
      } else if (this.coinsCollect > 8) {
        return 1;
      } else if (this.coinsCollect > 6) {
        return 2;
      } else if (this.coinsCollect > 4) {
        return 3;
      } else if (this.coinsCollect > 1) {
        return 4;
      } else {
        return 5;
      }
  }
}
