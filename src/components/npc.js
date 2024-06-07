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
    "npc",
  ];
}

export async function startInteraction(k, npc, player) {
  if (player.direction === "left") {
    npc.flipX = true;
    playAnimIfNotPlaying(npc, "oldman-side");
  }

  if (player.direction === "right") {
    npc.flipX = false;
    playAnimIfNotPlaying(npc, "oldman-side");
  }

  if (player.direction === "down") {
    playAnimIfNotPlaying(npc, "oldman-up");
  }

  if (player.direction === "up") {
    playAnimIfNotPlaying(npc, "oldman-down");
  }

  const responses = npcLines[gameState.getLocale()];

  const currMission = gameState.getCurrMission();

  if (currMission == null) {
    gameState.setCurrMission(1);
  }

  let numberTalked = NPCState.getNumberTalkedOldMan();
  if (numberTalked > responses.length - 2) {
    NPCState.setNumberTalkedOldMan(1);
    numberTalked = NPCState.getNumberTalkedOldMan();
  }

  if (responses[numberTalked]) {
    await dialogue(
      k,
      k.vec2(k.width() / 2 - 500 / 2 - 100, k.height() - 250),
      responses[numberTalked]
    );
    NPCState.setNumberTalkedOldMan(numberTalked + 1);
  }
}

export function endInteraction(oldman) {
  playAnimIfNotPlaying(oldman, "oldman-down");
}
