import { playAnimIfNotPlaying } from "../../utils.js";
import npcLines from "../contents/NPCDialogue.js";
import { gameState, NPCState, playerState } from "../states/index.js";
import { dialogue } from "../states/dialogue.js";

export function generateNPCComponents(k, pos) {
  return [
    k.sprite("assets", {
      anim: "oldman-down",
    }),
    k.area({ shape: new k.Rect(k.vec2(2, 4), 12, 12) }),
    k.body({ isStatic: true }),
    k.pos(pos),
    "oldman",
  ];
}

export async function startInteraction(k, oldman, player) {
  if (player.direction === "left") {
    oldman.flipX = true;
    playAnimIfNotPlaying(oldman, "oldman-side");
  }

  if (player.direction === "right") {
    oldman.flipX = false;
    playAnimIfNotPlaying(oldman, "oldman-side");
  }

  if (player.direction === "down") {
    playAnimIfNotPlaying(oldman, "oldman-up");
  }

  if (player.direction === "up") {
    playAnimIfNotPlaying(oldman, "oldman-down");
  }

  playerState.setIsSwordEquipped(true);

  const responses = npcLines[gameState.getLocale()];

  let numberTalked = NPCState.getNumberTalkedOldMan();
  if (numberTalked > responses.length - 2) {
    NPCState.setNumberTalkedOldMan(1);
    numberTalked = NPCState.getNumberTalkedOldMan();
  }

  if (responses[numberTalked]) {
    await dialogue(k, k.vec2(500, 700), responses[numberTalked]);
    NPCState.setNumberTalkedOldMan(numberTalked + 1);
  }
}

export function endInteraction(oldman) {
  playAnimIfNotPlaying(oldman, "oldman-down");
}
