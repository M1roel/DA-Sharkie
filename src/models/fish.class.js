class Fish extends MoveableObject {

    constructor() {
        super().loadImg('/public/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');

        this.x = 250 + Math.random() * 400;
        this.y = 20 + Math.random() * 400;
        this.height = 100;
        this.width = 100;
        this.animate();
        this.speed = 0.15 + Math.random() * 0.5
    }
    
    animate() {
        this.moveLeft();
    }
}
