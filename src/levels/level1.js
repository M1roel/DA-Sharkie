const backgroundObjects = [];
const backgroundWidth = 719;
const fishCount = 8;

for (let i = 0; i < 8; i++) {
  const img = i % 2 === 0 ? "/public/img/3. Background/Dark/2.png" : "/public/img/3. Background/Dark/1.png";
  backgroundObjects.push(new BackgroundObject(img, i * backgroundWidth));
}

function createRandomFish() {
  const colors = ['GREEN', 'RED', 'VIOLET'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  return new Fish(randomColor);
}

const fishArray = [];
for (let i = 0; i < fishCount; i++) {
  fishArray.push(createRandomFish());
}

const level1 = new Level(backgroundObjects, fishArray, [new Light()], new Endboss());
