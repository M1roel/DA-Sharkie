class Level {
    backgroundObjects;
    enemies;
    lights;
    level_end_x = 700;

    constructor(backgroundObjects, enemies, lights) {
        this.backgroundObjects = backgroundObjects;
        this.enemies = enemies;
        this.lights = lights;
    } 
}