class BackgroundObject extends MoveableObject {

    x = 0;
    y = 0;
    width = 480;
    height = 720;
    
    constructor(path) {
        super().loadImg(path);
    }

}