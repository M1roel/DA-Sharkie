class Level {
    backgroundObjects;
    enemies;
    lights;
    coins;
    bottle;
    endboss;
    level_end_x = 4700;

    constructor(backgroundObjects, enemies, coins, bottles, lights, endboss) {
        this.backgroundObjects = backgroundObjects;
        this.enemies = enemies;
        this.coins = coins;
        this.bottles = bottles;
        this.lights = lights;
        this.endboss = endboss;
    } 
}