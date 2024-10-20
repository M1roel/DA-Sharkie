const backgroundObjects = [];
const backgroundWidth = 719;

for (let i = 0; i < 8; i++) {
  const img = i % 2 === 0 
    ? "/public/img/3. Background/Dark/2.png" 
    : "/public/img/3. Background/Dark/1.png";
  backgroundObjects.push(new BackgroundObject(img, i * backgroundWidth));
}

const level1 = new Level(
  backgroundObjects,
  [new Fish(), new Fish(), new Fish()],
  [new Light()],
  new Endboss()
);
