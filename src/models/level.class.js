class Level {
    backgroundObjects;
    enemies;
    lights;
    endboss;
    level_end_x = 700;

    constructor(backgroundObjects, enemies, lights, endboss) {
        this.backgroundObjects = backgroundObjects;
        this.enemies = enemies;
        this.lights = lights;
        this.endboss = endboss;
    } 
}