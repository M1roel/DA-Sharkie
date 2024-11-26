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
  const isPortrait = document.fullscreenElement
    ? screen.height > screen.width
    : window.innerHeight > window.innerWidth;

  orientationLock.style.display = isPortrait ? "flex" : "none";
}

window.addEventListener("resize", checkOrientation);
window.addEventListener("load", checkOrientation);
document.addEventListener("fullscreenchange", checkOrientation);
