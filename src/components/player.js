import { areAnyOfTheseKeysDown, playAnimIfNotPlaying } from "../../utils.js";
import { gameState, playerState } from "../states/index.js";
import { playFootstepEffect } from "./backgroundMusic.js";

export function generatePlayerComponents(k, pos) {
  return [
    // k.scale(1.2),
    k.sprite("assets", {
      anim: "player-idle-down",
    }),
    k.area({ shape: new k.Rect(k.vec2(3, 4), 10, 12) }),
    k.body(),
    k.pos(pos),
    k.opacity(),
    {
      speed: 100,
      attackPower: 1,
      direction: "down",
      isAttack: false,
      isMoving: false,
    },
    "player",
  ];
}

export function setPlayerMovement(k, player) {
  let stopMovement = false;

  player.onCollide("boundaries", () => {
    stopMovement = true;
    player.stop();
    playFootstepEffect(false);
  });

  k.onKeyDown((key) => {
    if (gameState.getFreezePlayer()) return;
    if (stopMovement) return;

    let moving = false;

    if (
      ["left"].includes(key) &&
      !areAnyOfTheseKeysDown(k, ["up", "down", "w", "s"])
    ) {
      player.flipX = true;
      playAnimIfNotPlaying(player, "player-side");
      player.move(-player.speed, 0);
      player.direction = "left";
      moving = true;
    }

    if (
      ["right"].includes(key) &&
      !areAnyOfTheseKeysDown(k, ["up", "down", "w", "s"])
    ) {
      player.flipX = false;
      playAnimIfNotPlaying(player, "player-side");
      player.move(player.speed, 0);
      player.direction = "right";
      moving = true;
    }

    if (["up"].includes(key)) {
      playAnimIfNotPlaying(player, "player-up");
      player.move(0, -player.speed);
      player.direction = "up";
      moving = true;
    }

    if (["down"].includes(key)) {
      playAnimIfNotPlaying(player, "player-down");
      player.move(0, player.speed);
      player.direction = "down";
      moving = true;
    }

    if (moving && !player.isMoving) {
      player.isMoving = true;
      playFootstepEffect(true);
    }
  });

  k.onKeyRelease((key) => {
    if (!["left", "right", "up", "down"].includes(key)) return;

    player.isAttack = false;
    player.stop();

    playFootstepEffect(false);

    stopMovement = false;

    player.isMoving = false;

    if (player.direction === "up") {
      player.play("player-idle-up");
    }

    if (player.direction === "down") {
      player.play("player-idle-down");
    }

    if (player.direction !== "up" && player.direction !== "down") {
      player.play("player-idle-side");
    }
  });
}
