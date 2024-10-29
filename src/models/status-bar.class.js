class StatusBar extends DrawableObject {
    IMAGES_LIFE = ["/public/img/4. Marcadores/Purple/100_ .png", "/public/img/4. Marcadores/Purple/80_ .png", "/public/img/4. Marcadores/green/Life/60_  copia 3.png", "/public/img/4. Marcadores/green/Life/40_  copia 3.png", "/public/img/4. Marcadores/orange/20_ copia 2.png", "/public/img/4. Marcadores/orange/0_  copia.png"];

    percentage = 100;

    constructor() {
        super();
        this.loadImgs(this.IMAGES_LIFE);
        this.x = 60;
        this.y = 10;
        this.width = 60;
        this.height = 200;
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_LIFE[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if(this.percentage == 100) {
            return 0;
        } else if(this.percentage > 80) {
            return 1;
        } else if(this.percentage > 60) {
            return 2;
        } else if(this.percentage > 40) {
            return 3;
        } else if(this.percentage > 5) {
            return 4;
        } else {
            return 5;
        }        
    }
}