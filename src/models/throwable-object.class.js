class ThrowableObject extends MoveableObject {

    /**
     * Creates a new throwable object with a specified position and type.
     * The object can either be a "normal" bubble or a "poison" bubble.
     * 
     * @param {number} x - The x-coordinate of the throwable object.
     * @param {number} y - The y-coordinate of the throwable object.
     * @param {string} [type='normal'] - The type of the throwable object ('normal' or 'poison').
     */
    constructor(x, y, type = 'normal') {
        super().loadImg("/public/img/1.Sharkie/4.Attack/Bubble trap/Bubble.png");
        this.x = x;
        this.y = y;
        this.type = type;
        this.loadImageForType();
        this.height = 50;
        this.width = 50;        
        this.hitboxX = 50;
        this.hitboxY = 50;
        this.hitboxWidth = 50;
        this.hitboxHeight = 50;
    }

    /**
     * Loads the appropriate image for the throwable object based on its type.
     * If the object is "poison", it loads the poisoned bubble image. Otherwise, it loads the normal bubble image.
     */
    loadImageForType() {
        if (this.type === "poison") {
            this.loadImg("/public/img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png");
        } else {
            this.loadImg("/public/img/1.Sharkie/4.Attack/Bubble trap/Bubble.png");
        }
    }

    /**
     * Throws the object in a specified direction. The object's vertical speed is set, and gravity is applied.
     * It also moves horizontally in the specified direction.
     * 
     * @param {number} direction - The direction in which to throw the object (1 for right, -1 for left).
     */
    throw(direction) {
        this.speedY = 20;
        this.applyGravity();
        this.direction = direction;
        setInterval(() => {
            this.x += 10 * direction;
        }, 25);
    }
}


