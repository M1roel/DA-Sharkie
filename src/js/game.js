let canvas;
let world;
let keyboard = new Keyboard();
var elem = document.getElementById("game-container");
let isMuted = localStorage.getItem('isMuted') === 'true';
let buttonattack = {
  slap: document.getElementById("finslap-attack"),
  bubble: document.getElementById("bubble-attack"),
  pbubble: document.getElementById("pbubble-attack"),
};
let moveableObject = new MoveableObject();

/**
 * Initializes the game environment by setting up the canvas, world, and registering global actions.
 */
function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard, level1);
  world.registerGlobalActions();
  toggleIcons(isMuted);
  muteAllSounds(isMuted);
}

/**
 * Starts the game by creating the level, hiding the start screen, and displaying the game container.
 */
function startGame() {
  createLevel();
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("game-container").classList.remove("hidden");
  document.getElementById("you-win").classList.add("hidden");
  document.getElementById("game-over").classList.add("hidden");
  init();
}

/**
 * Handles keydown and keyup events to set or reset keyboard states.
 * @param {KeyboardEvent} e - The keyboard event.
 * @param {boolean} isPressed - Indicates whether the key is pressed (true) or released (false).
 */
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

/**
 * Toggles fullscreen mode for the application.
 */
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

// Update UI icons based on fullscreen state
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

/**
 * Checks the screen orientation and updates the orientation lock display accordingly.
 */
function checkOrientation() {
  const orientationLock = document.getElementById("orientation-lock");
  const isPortrait = document.fullscreenElement ? screen.height > screen.width : window.innerHeight > window.innerWidth;

  orientationLock.style.display = isPortrait ? "flex" : "none";
}

// Register event listeners for orientation changes
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

/**
 * Sets up touch-based attack button functionality.
 * @param {HTMLElement} button - The button element to configure.
 * @param {string} key - The keyboard key to simulate.
 */
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

// Configure attack buttons
setupAttackButton(buttonattack.slap, "SPACE");
setupAttackButton(buttonattack.bubble, "E");
setupAttackButton(buttonattack.pbubble, "Q");

// Joystick touch interaction
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

/**
 * Toggles the mute state for all game sounds.
 */
function toggleMute() {
  isMuted = !isMuted;
  localStorage.setItem('isMuted', isMuted);
  toggleIcons(isMuted);
  muteAllSounds(isMuted);
}

/**
 * Updates the UI icons based on the mute state.
 * @param {boolean} isMuted - The current mute state.
 */
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

/**
 * Mutes or unmutes all game sounds.
 * @param {boolean} isMuted - True to mute all sounds, false to unmute.
 */
function muteAllSounds(isMuted) {
  const allSounds = getAllSounds();
  allSounds.forEach((sound) => {
    if (sound) sound.muted = isMuted;
  });
}

/**
 * Retrieves all sound elements used in the game.
 * @returns {HTMLAudioElement[]} An array of audio elements.
 */
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
    world.charakter.ouch_sound,
    world.charakter.shock_sound,
    world.charakter.game_over_sound
  ];
}

/**
 * Toggles a class for a given element.
 * @param {string} selector - The CSS selector of the element.
 * @param {string} className - The class to toggle.
 */
function toggleElement(selector, className) {
  const element = document.querySelector(selector);
  element.classList.contains(className) ? element.classList.remove(className) : element.classList.add(className);
}

/**
 * Reloads the page to show the start screen.
 */
function showStartScreen() {
  document.getElementById("game-container").classList.add("hidden");
  document.getElementById("you-win").classList.add("hidden");
  document.getElementById("game-over").classList.add("hidden");
  document.getElementById("start-screen").classList.remove("hidden");
  stopAllSounds();
  clearAllIntervals();
  clearAllTimeouts();
  canvas = null;
  world=null;
  keyboard = new Keyboard();
}

/**
 * Resets the game state, stops all sounds, clears intervals, and restarts the game.
 */
function resetGameState() {
  stopAllSounds();
  clearAllIntervals();
  clearAllTimeouts();
  canvas = null;
  world=null;
  keyboard = new Keyboard();
  startGame();
}

/**
 * Clears all active intervals.
 */
function clearAllIntervals() {
  for (let i = 0; i < 100; i++) {
    clearInterval(i);    
  }
}

/**
 * Clears all active timeouts.
 */
function clearAllTimeouts() {
  for (let i = 0; i < 50; i++) {
    clearTimeout(i);
    
  }
}

/**
 * Stops all sounds and resets their playback position.
 */
function stopAllSounds() {
  const allSounds = getAllSounds();
  allSounds.forEach((sound) => {
    if (sound) sound.pause();
    if (sound) sound.currentTime = 0;
  });
}

/**
 * Disables the context menu (right-click menu) on the page by preventing the default action.
 *
 * @event contextmenu
 * @param {Event} event - The context menu event.
 */
document.addEventListener('contextmenu', function(event) {
  if (window.innerWidth <= 1367) {
    event.preventDefault();
  }
});