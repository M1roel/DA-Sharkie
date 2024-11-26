let canvas;
let world;
let keyboard = new Keyboard();
var elem = document.getElementById("game-container");

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard, level1);
}

function startGame() {
  createLevel();
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("game-container").classList.remove("hidden");
  document.getElementById("you-win").classList.add("hidden");
  init();
}

window.addEventListener("keydown", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }

  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }

  if (e.keyCode == 38) {
    keyboard.UP = true;
  }

  if (e.keyCode == 40) {
    keyboard.DOWN = true;
  }

  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }

  if (e.keyCode == 69) {
    keyboard.E = true;
  }

  if (e.keyCode == 81) {
    keyboard.Q = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }

  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }

  if (e.keyCode == 38) {
    keyboard.UP = false;
  }

  if (e.keyCode == 40) {
    keyboard.DOWN = false;
  }

  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }

  if (e.keyCode == 69) {
    keyboard.E = false;
  }

  if (e.keyCode == 81) {
    keyboard.Q = false;
  }
});

async function toggleFullscreen() {
  try {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  } catch (err) {
    console.error(`Fehler beim Umschalten des Vollbildmodus: ${err}`);
  }
}

document.addEventListener("fullscreenchange", () => {
  const fullscreenIcon = document.getElementById("fullscreen-mode");
  const windowIcon = document.getElementById("window-mode");

  if (document.fullscreenElement) {
    fullscreenIcon.classList.add("hidden");
    windowIcon.classList.remove("hidden");
  } else {
    fullscreenIcon.classList.remove("hidden");
    windowIcon.classList.add("hidden");
  }
});

function checkOrientation() {
  const orientationLock = document.getElementById("orientation-lock");
  const isPortrait = document.fullscreenElement ? screen.height > screen.width : window.innerHeight > window.innerWidth;

  orientationLock.style.display = isPortrait ? "flex" : "none";
}

window.addEventListener("resize", checkOrientation);
window.addEventListener("load", checkOrientation);
document.addEventListener("fullscreenchange", checkOrientation);

let joystick = {
  base: document.getElementById("joystick-base"),
  knob: document.getElementById("joystick-knob"),
  active: false,
  startX: 0,
  startY: 0,
  knobX: 0,
  knobY: 0,
  maxDistance: 15,
};

const keyboard2 = {
  UP: false,
  DOWN: false,
  LEFT: false,
  RIGHT: false,
};

joystick.knob.addEventListener("touchstart", (e) => {
  joystick.active = true;
  const touch = e.touches[0];
  joystick.startX = touch.clientX;
  joystick.startY = touch.clientY;
});

document.addEventListener("touchmove", (e) => {
  if (!joystick.active) return;

  const touch = e.touches[0];
  const deltaX = touch.clientX - joystick.startX;
  const deltaY = touch.clientY - joystick.startY;

  const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), joystick.maxDistance);
  const angle = Math.atan2(deltaY, deltaX);

  joystick.knobX = distance * Math.cos(angle);
  joystick.knobY = distance * Math.sin(angle);

  joystick.knob.style.transform = `translate(calc(-50% + ${joystick.knobX}px), calc(-50% + ${joystick.knobY}px))`;

  keyboard.UP = deltaY < -10;
  keyboard.DOWN = deltaY > 10;
  keyboard.LEFT = deltaX < -10;
  keyboard.RIGHT = deltaX > 10;
});

document.addEventListener("touchend", () => {
  joystick.active = false;
  joystick.knob.style.transform = `translate(-50%, -50%)`;

  keyboard.UP = false;
  keyboard.DOWN = false;
  keyboard.LEFT = false;
  keyboard.RIGHT = false;
});
