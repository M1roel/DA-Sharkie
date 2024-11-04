const backgroundObjects = [];
const backgroundWidth = 719;
const fishCount = 20;
const jellyfishCount = 10;

backgroundObjects.push(new BackgroundObject("/public/img/3. Background/Dark/1.png", -719));

const coins = [new Coin(200, 150), new Coin(400, 200), new Coin(600, 250)];

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

const allEnemies = [...fishArray, ...jellyfishArray];

const level1 = new Level(backgroundObjects, allEnemies, coins, [new Light()], new Endboss());
