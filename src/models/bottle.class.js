class Bottle extends DrawableObject {
    
    constructor(x, y) {
        super().loadImg('/public/img/4. Marcadores/Posión/Animada/1.png');

        this.x = x;
        this.y = y;
        this.height = 50;
        this.width = 50;
    }
}