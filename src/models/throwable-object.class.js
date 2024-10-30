class ThrowableObject extends MoveableObject {

    constructor(x, y) {
        super().loadImg("/public/img/1.Sharkie/4.Attack/Bubble trap/Bubble.png");
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw(100, 150);
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x +=10;
        }, 25);
    }
}
