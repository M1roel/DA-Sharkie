class MoveableObject {
  x = 50;
  y = 300;
  height = 200;
  width = 200;
  img;
  imageCache = {};

  loadImg(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImgs(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  moveRight() {
    console.log("Moving right");
  }

  moveLeft() {
    console.log("Moving left");
  }
}
