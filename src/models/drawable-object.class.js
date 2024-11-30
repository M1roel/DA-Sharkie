class DrawableObject {
  x = 50;
  y = 300;
  height = 200;
  width = 200;
  enrageWidth = 60;
  enrageHeight = 0;
  img;
  imageCache = {};

  /**
 * Loads a single image from the given path and assigns it to the `img` property.
 */
  loadImg(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
 * Loads multiple images from the provided paths and stores them in the `imageCache` object.
 */
  loadImgs(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}
