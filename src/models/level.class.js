class Level {
    backgroundObjects;
    enemies;
    lights;
    coins;
    endboss;
    level_end_x = 4700;

    constructor(backgroundObjects, enemies, coins, lights, endboss) {
        this.backgroundObjects = backgroundObjects;
        this.enemies = enemies;
        this.coins = coins;
        this.lights = lights;
        this.endboss = endboss;
    } 
}