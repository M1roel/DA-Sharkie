class Bottle extends DrawableObject {
    
    constructor(x, y) {
        super().loadImg('/public/img/4. Marcadores/Posión/Animada/1.png');

        this.x = x;
        this.y = y;
        this.height = 75;
        this.width = 75;
        this.hitboxX = 60;
        this.hitboxY = 50;
        this.hitboxWidth = 80;
        this.hitboxHeight = 30;
    }
}