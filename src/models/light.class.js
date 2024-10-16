class Light extends MoveableObject {

    constructor() {        
        super().loadImg('/public/img/3. Background/Layers/1. Light/1.png');

        this.x = 0 + Math.random() * 400;
        this.y = 0;
        this.height = 400;
        this.width = 400;
    }
}