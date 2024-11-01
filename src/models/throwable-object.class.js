class ThrowableObject extends MoveableObject {

    constructor(x, y) {
        super().loadImg("/public/img/1.Sharkie/4.Attack/Bubble trap/Bubble.png");
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw(100, 150);
    }

    loadImageForType() {
        if (this.type === "poison") {
            this.loadImg("/public/img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png");
        } else {
            this.loadImg("/public/img/1.Sharkie/4.Attack/Bubble trap/Bubble.png");
        }
    }

    throw(direction) {
        this.speedY = this.type === "poison" ? 40 : 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 10 * direction;
        }, 25);
    }
}


