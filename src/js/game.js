let canvas;
let world;
let keyboard = new Keyboard();
var elem = document.getElementById("game-container");
let buttonattack = {
  slap: document.getElementById("finslap-attack"),
  bubble: document.getElementById("bubble-attack"),
  pbubble: document.getElementById("pbubble-attack"),
};
let isMuted = false;

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard, level1);
  world.registerGlobalActions();
}

function startGame() {
  createLevel();
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("game-container").classList.remove("hidden");
  document.getElementById("you-win").classList.add("hidden");
  document.getElementById("game-over").classList.add("hidden");
  init();
}

function handleKeyEvent(e, isPressed) {
  switch (e.keyCode) {
    case 39:
      keyboard.RIGHT = isPressed;
      break;
    case 37:
      keyboard.LEFT = isPressed;
      break;
    case 38:
      keyboard.UP = isPressed;
      break;
    case 40:
      keyboard.DOWN = isPressed;
      break;
    case 32:
      keyboard.SPACE = isPressed;
      break;
    case 69:
      keyboard.E = isPressed;
      break;
    case 81:
      keyboard.Q = isPressed;
      break;
  }
}

window.addEventListener("keydown", (e) => handleKeyEvent(e, true));
window.addEventListener("keyup", (e) => handleKeyEvent(e, false));

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

function setupAttackButton(button, key) {
  let touchPressed = false;

  button.addEventListener("touchstart", () => {
    if (!touchPressed) {
      touchPressed = true;
      keyboard[key] = true;
    }
  });

  button.addEventListener("touchend", () => {
    touchPressed = false;
    keyboard[key] = false;
  });
}

setupAttackButton(buttonattack.slap, "SPACE");
setupAttackButton(buttonattack.bubble, "E");
setupAttackButton(buttonattack.pbubble, "Q");

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

function toggleMute() {
  isMuted = !isMuted;
  toggleIcons(isMuted);
  muteAllSounds(isMuted);
}

function toggleIcons(isMuted) {
  const muteIcon = document.getElementById("mute-icon");
  const unmuteIcon = document.getElementById("unmute-icon");

  if (isMuted) {
    muteIcon.classList.add("hidden");
    unmuteIcon.classList.remove("hidden");
  } else {
    muteIcon.classList.remove("hidden");
    unmuteIcon.classList.add("hidden");
  }
}

function muteAllSounds(isMuted) {
  const allSounds = getAllSounds();
  allSounds.forEach((sound) => {
    if (sound) sound.muted = isMuted;
  });
}

function getAllSounds() {
  return [
    world.background_sound,
    world.coin_sound,
    world.bottle_sound,
    world.charakter.finslap_sound,
    world.charakter.bubble_sound,
    world.level.endboss.endboss_sound,
    world.level.endboss.bite_sound,
    world.level.endboss.endboss_hit_sound,
    world.level.endboss.endboss_death_sound,
    world.level.endboss.you_win_sound,
  ];
}

function showStartScreen() {
  location.reload();
}

function resetGameState() {
  stopAllSounds();
  clearAllIntervals();
  world=null;
  startGame();
}

function clearAllIntervals() {
  for (let i = 0; i < 1000; i++) {
    clearInterval(i);    
  }
}

function stopAllSounds() {
  const allSounds = getAllSounds();
  allSounds.forEach((sound) => {
    if (sound) sound.pause();
    if (sound) sound.currentTime = 0;
  });
}