let level1;

function createLevel() {
  const backgroundObjects = [];
  const backgroundWidth = 719;
  const fishCount = 0;
  const jellyfishCount = 0;

  backgroundObjects.push(new BackgroundObject("/public/img/3. Background/Dark/1.png", -719));

  const { coins, bottles } = generateRandomItems(10, 10);

  for (let i = 0; i < 8; i++) {
    const img = i % 2 === 0 ? "/public/img/3. Background/Dark/2.png" : "/public/img/3. Background/Dark/1.png";
    backgroundObjects.push(new BackgroundObject(img, i * backgroundWidth));
  }

  function createRandomFish() {
    const colors = ["GREEN", "RED", "VIOLET"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return new Fish(randomColor);
  }

  const fishArray = [];
  for (let i = 0; i < fishCount; i++) {
    fishArray.push(createRandomFish());
  }

  function createRandomJellyfish() {
    const colors = ["LILA", "YELLOW"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return new Jellyfish(randomColor);
  }

  const jellyfishArray = [];
  for (let i = 0; i < jellyfishCount; i++) {
    jellyfishArray.push(createRandomJellyfish());
  }

  function generateRandomItems(coinCount, bottleCount) {
    const randomCoins = generateCoins(coinCount);
    const randomBottles = generateBottles(bottleCount, randomCoins);
    return { coins: randomCoins, bottles: randomBottles };
  }

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

  function getRandomPosition() {
    const x = Math.floor(Math.random() * (3250 - 200 + 1)) + 200;
    const y = Math.floor(Math.random() * (400 - 50 + 1)) + 50;
    return { x, y };
  }

  function isCoinPositionValid(coins, newCoin) {
    return coins.every((coin) => getDistance(coin, newCoin) >= 200);
  }

  function isBottlePositionValid(bottles, newBottle, coins) {
    return bottles.every((bottle) => getDistance(bottle, newBottle) >= 200) && coins.every((coin) => getDistance(coin, newBottle) >= 200);
  }

  function getDistance(obj1, obj2) {
    const dx = obj1.x - obj2.x;
    const dy = obj1.y - obj2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  const allEnemies = [...fishArray, ...jellyfishArray];

  level1 = new Level(backgroundObjects, allEnemies, coins, bottles, [new Light()], new Endboss());
}
