import { gameState } from "../states";

let backgroundMusic = null;
let footstepEffect = null;
let attackEffect = null;

export function playBackgroundMusic() {
  const theme = gameState.getSoundTheme();

  if (backgroundMusic) {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
  }

  backgroundMusic = new Audio();

  if (theme === "explore") {
    backgroundMusic.src = "/public/assets/sounds/background-music.mp3";
    backgroundMusic.volume = 0.5;
  } else if (theme === "battle-monster") {
    backgroundMusic.src = "/public/assets/sounds/battle-monster.mp3";
    backgroundMusic.volume = 0.5;
  } else if (theme === "battle-boss") {
    backgroundMusic.src = "/public/assets/sounds/battle-boss.mp3";
    backgroundMusic.volume = 0.2;
  }

  console.log(backgroundMusic);

  backgroundMusic.loop = true;
  backgroundMusic.play();
}

export function playFootstepEffect(state = false) {
  if (!footstepEffect) {
    footstepEffect = new Audio("/public/assets/sounds/walk.mp3");
    console.log(footstepEffect);
    footstepEffect.volume = 1;
    footstepEffect.loop = true;
  }

  if (state) {
    footstepEffect.play();
  } else {
    footstepEffect.pause();
    footstepEffect.currentTime = 0;
  }
}

export function playAttackEffect() {
  attackEffect = new Audio("/public/assets/sounds/attack.wav");
  attackEffect.volume = 1;

  attackEffect.play();
}
