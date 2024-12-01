let level1;

/**
 * Creates the game level by generating background objects, enemies (fish and jellyfish), 
 * random items (coins and bottles), and setting up the level environment.
 */
function createLevel() {
  const backgroundObjects = [];
  const jellyfishArray = [];
  const fishArray = [];
  const backgroundWidth = 719;
  const fishCount = 5;
  const jellyfishCount = 5;
  const { coins, bottles } = generateRandomItems(10, 10);
  backgroundObjects.push(new BackgroundObject("/public/img/3. Background/Dark/1.png", -719));

  for (let i = 0; i < 8; i++) {
    const img = i % 2 === 0 ? "/public/img/3. Background/Dark/2.png" : "/public/img/3. Background/Dark/1.png";
    backgroundObjects.push(new BackgroundObject(img, i * backgroundWidth));
  }

  /**
   * Creates a random fish object with a random color.
   * @returns {Fish} A new Fish object with a random color.
   */
  function createRandomFish() {
    const colors = ["GREEN", "RED", "VIOLET"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return new Fish(randomColor);
  }

  for (let i = 0; i < fishCount; i++) {
    generateUniqueFish();
  }

  /**
   * Creates a random fish object with a random color.
   * @returns {Fish} A new Fish object with a random color.
   */
  function generateUniqueFish() {
    let newFish;
    let isValidPosition = false;
    while (!isValidPosition) {
      newFish = createRandomFish();
      isValidPosition = fishArray.every((fish) => getDistance(fish, newFish) >= 200);
    }
    fishArray.push(newFish);
  }

  /**
   * Creates a random jellyfish object with a random color.
   * @returns {Jellyfish} A new Jellyfish object with a random color.
   */
  function createRandomJellyfish() {
    const colors = ["LILA", "YELLOW"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return new Jellyfish(randomColor);
  }

  for (let i = 0; i < jellyfishCount; i++) {
    generateUniqueJellyfish();
  }

  /**
   * Ensures that a new jellyfish is placed at a unique position.
   * The new jellyfish is valid if it's at least 200 units away from existing jellyfish.
   */
  function generateUniqueJellyfish() {
    let newJellyfish;
    let isValidPosition = false;
    while (!isValidPosition) {
      newJellyfish = createRandomJellyfish();
      isValidPosition = jellyfishArray.every((jellyfish) => getDistance(jellyfish, newJellyfish) >= 200);
    }
    jellyfishArray.push(newJellyfish);
  }

  /**
   * Generates random items (coins and bottles) for the level.
   * @param {number} coinCount - Number of coins to generate.
   * @param {number} bottleCount - Number of bottles to generate.
   * @returns {Object} An object containing arrays of coins and bottles.
   */
  function generateRandomItems(coinCount, bottleCount) {
    const randomCoins = generateCoins(coinCount);
    const randomBottles = generateBottles(bottleCount, randomCoins);
    return { coins: randomCoins, bottles: randomBottles };
  }

  /**
   * Generates a specified number of coins at random positions.
   * @param {number} count - Number of coins to generate.
   * @returns {Coin[]} An array of Coin objects.
   */
  function generateCoins(count) {
    const randomCoins = [];
    while (randomCoins.length < count) {
      const { x, y } = getRandomPosition();
      const newCoin = new Coin(x, y);
      if (isCoinPositionValid(randomCoins, newCoin)) {
        randomCoins.push(newCoin);
      }
    }
    return randomCoins;
  }

  /**
   * Generates a specified number of bottles at random positions, ensuring they do not overlap with coins or other bottles.
   * @param {number} count - Number of bottles to generate.
   * @param {Coin[]} coins - Array of coins to avoid overlap with.
   * @returns {Bottle[]} An array of Bottle objects.
   */
  function generateBottles(count, coins) {
    const randomBottles = [];
    while (randomBottles.length < count) {
      const { x, y } = getRandomPosition();
      const newBottle = new Bottle(x, y);
      if (isBottlePositionValid(randomBottles, newBottle, coins)) {
        randomBottles.push(newBottle);
      }
    }
    return randomBottles;
  }

  /**
   * Returns a random position within a specified range.
   * @returns {Object} An object containing the x and y coordinates of the random position.
   */
  function getRandomPosition() {
    const x = Math.floor(Math.random() * (3250 - 200 + 1)) + 200;
    const y = Math.floor(Math.random() * (400 - 50 + 1)) + 50;
    return { x, y };
  }

  /**
   * Validates if the new coin does not overlap with existing coins.
   * @param {Coin[]} coins - Array of existing coins.
   * @param {Coin} newCoin - The new coin to check.
   * @returns {boolean} True if the coin position is valid, false otherwise.
   */
  function isCoinPositionValid(coins, newCoin) {
    return coins.every((coin) => getDistance(coin, newCoin) >= 200);
  }

  /**
   * Validates if the new bottle does not overlap with existing bottles or coins.
   * @param {Bottle[]} bottles - Array of existing bottles.
   * @param {Bottle} newBottle - The new bottle to check.
   * @param {Coin[]} coins - Array of existing coins.
   * @returns {boolean} True if the bottle position is valid, false otherwise.
   */
  function isBottlePositionValid(bottles, newBottle, coins) {
    return bottles.every((bottle) => getDistance(bottle, newBottle) >= 200) && coins.every((coin) => getDistance(coin, newBottle) >= 200);
  }

  /**
   * Calculates the distance between two objects based on their x and y coordinates.
   * @param {Object} obj1 - The first object.
   * @param {Object} obj2 - The second object.
   * @returns {number} The Euclidean distance between the two objects.
   */
  function getDistance(obj1, obj2) {
    const dx = obj1.x - obj2.x;
    const dy = obj1.y - obj2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  const allEnemies = [...fishArray, ...jellyfishArray];

  level1 = new Level(backgroundObjects, allEnemies, coins, bottles, [new Light()], new Endboss());
}
