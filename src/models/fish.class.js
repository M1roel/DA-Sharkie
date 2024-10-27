class Fish extends MoveableObject {
  IMAGES_GREEN = ["/public/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png"];
  IMAGES_RED = ["/public/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim2.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim3.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim4.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim5.png"];
  IMAGES_VIOLET = ["/public/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim2.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim3.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim4.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim5.png"];
  IMAGES_GREEN_ENRAGE = ["/public/img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition1.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition2.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition3.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition4.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition5.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim1.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim2.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim3.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim4.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim5.png"];
  IMAGES_RED_ENRAGE = ["/public/img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition1.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition2.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition3.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition4.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition5.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim1.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim2.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim3.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim4.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim5.png"];
  IMAGES_VIOLET_ENRAGE = ["/public/img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition1.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition2.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition3.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition4.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition5.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim1.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim2.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim3.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim4.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim5.png"];
  IMAGES_GREEN_BUBBLESWIN = ["/public/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim1.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim2.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim3.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim4.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim5.png"];
  IMAGES_RED_BUBBLESWIN = ["/public/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim1.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim2.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim3.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim4.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim5.png"];
  IMAGES_VIOLET_BUBBLESWIN = ["/public/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim1.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim2.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim3.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim4.png", "/public/img/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim5.png"];
  
  currentImage = 0;

  constructor(color) {
    super();

    this.color = color;
    this.x = 500 + Math.random() * 4000;
    this.y = 20 + Math.random() * 400;
    this.height = 100;
    this.width = 100;
    this.enrageActive = false;
    this.speed = 0.15 + Math.random() * 0.9;

    if (color === "GREEN") {      
      this.loadImg(this.IMAGES_GREEN[0]);
      this.currentImages = this.IMAGES_GREEN;
      this.enrageImages = this.IMAGES_GREEN_ENRAGE;
      this.bubbleswimImages = this.IMAGES_GREEN_BUBBLESWIN;
    } else if (color === "RED") {      
      this.loadImg(this.IMAGES_RED[0]);
      this.currentImages = this.IMAGES_RED;
      this.enrageImages = this.IMAGES_RED_ENRAGE;
      this.bubbleswimImages = this.IMAGES_RED_BUBBLESWIN;
    } else if (color === "VIOLET") {
      this.loadImg(this.IMAGES_VIOLET[0]);
      this.currentImages = this.IMAGES_VIOLET;
      this.enrageImages = this.IMAGES_VIOLET_ENRAGE;
      this.bubbleswimImages = this.IMAGES_VIOLET_BUBBLESWIN;
    }
    this.loadImgs(this.currentImages);
    this.loadImgs(this.enrageImages);
    this.loadImgs(this.bubbleswimImages);
    this.animate();
  }
  
  animate() {
    this.moveLeft();
    this.resetEnrage();
  }

  getEnrage() {
    if (!this.enrageActive) {
      this.enrageActive = true;
      this.animateEnrage(this.enrageImages);
      this.animateBubbleswim(this.bubbleswimImages);
      this.speed *= 1.5;
    }
  }

  resetEnrage() {
    if (this.enrageActive) {
      this.enrageActive = false;
      if (this.color === "GREEN") {      
        this.loadImg(this.IMAGES_GREEN[0]);
      } else if (this.color === "RED") {      
        this.loadImg(this.IMAGES_RED[0]);
      } else if (this.color === "VIOLET") {
        this.loadImg(this.IMAGES_VIOLET[0]);
      }
      this.loadImgs(this.currentImages);
      this.speed /= 1.5;
    }
  }

  animateEnrage(array) {
    setInterval(() => {
      let i = this.currentImage % array.length;
      let path = array[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 1000 / 5);    
  }

  animateBubbleswim(array) {
    setInterval(() => {
      let i = this.currentImage % array.length;
      let path = array[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 1000 / 5); 
  }
}
