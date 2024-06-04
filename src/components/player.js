import { areAnyOfTheseKeysDown, playAnimIfNotPlaying } from "../../utils.js";
import { gameState, playerState } from "../states/index.js";

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
    },
    "player",
  ];
}

function leftPlayerMovementLogic(
  k,
  player,
  currentKey,
  expectedKey,
  excludedKeys,
  direction,
  moveVec2
) {
  if (currentKey === expectedKey && !areAnyOfTheseKeysDown(k, excludedKeys)) {
    player.flipX = true;
    playAnimIfNotPlaying(player, "player-side");
    player.move(moveVec2);
    player.direction = direction;
  }
}

export function setPlayerMovement(k, player) {
  let stopMovement = false;

  player.onCollide("boundaries", () => {
    stopMovement = true;
    player.stop();
  });

  k.onKeyDown((key) => {
    // leftPlayerMovementLogic(
    //   k,
    //   player,
    //   key,
    //   "left",
    //   ["up", "down", "w", "s"],
    //   "left",
    //   k.vec2(-player.speed, 0)
    // );

    if (gameState.getFreezePlayer()) return;
    if (stopMovement) return;

    if (
      ["left"].includes(key) &&
      !areAnyOfTheseKeysDown(k, ["up", "down", "w", "s"])
    ) {
      player.flipX = true;
      playAnimIfNotPlaying(player, "player-side");
      player.move(-player.speed, 0);
      player.direction = "left";
    }

    if (
      ["right"].includes(key) &&
      !areAnyOfTheseKeysDown(k, ["up", "down", "w", "s"])
    ) {
      player.flipX = false;
      playAnimIfNotPlaying(player, "player-side");
      player.move(player.speed, 0);
      player.direction = "right";
    }

    if (["up"].includes(key)) {
      playAnimIfNotPlaying(player, "player-up");
      player.move(0, -player.speed);
      player.direction = "up";
    }

    if (["down"].includes(key)) {
      playAnimIfNotPlaying(player, "player-down");
      player.move(0, player.speed);
      player.direction = "down";
    }
  });

  k.onKeyPress((key) => {
    if (key !== "space") return;
    if (gameState.getFreezePlayer()) return;
    if (!playerState.getIsSwordEquipped()) return;

    player.isAttack = true;

    if (k.get("swordHitBox").length === 0) {
      const swordHitBoxPosX = {
        left: player.worldPos().x - 2,
        right: player.worldPos().x + 10,
        up: player.worldPos().x + 5,
        down: player.worldPos().x + 2,
      };

      const swordHitBoxPosY = {
        left: player.worldPos().y + 5,
        right: player.worldPos().y + 5,
        up: player.worldPos().y,
        down: player.worldPos().y + 10,
      };

      k.add([
        k.area({ shape: new k.Rect(k.vec2(0), 8, 8) }),
        k.pos(
          swordHitBoxPosX[player.direction],
          swordHitBoxPosY[player.direction]
        ),
        "swordHitBox",
      ]);
    }

    k.wait(0.1, () => {
      k.destroyAll("swordHitBox");

      if (player.direction === "left" || player.direction === "right") {
        playAnimIfNotPlaying(player, "player-idle-side");
        player.stop();
        return;
      }

      playAnimIfNotPlaying(player, `player-${player.direction}`);
      player.stop();
    });

    playAnimIfNotPlaying(player, `player-attack-${player.direction}`);
  });

  k.onKeyRelease(() => {
    player.isAttack = false;
    player.stop();
    stopMovement = false;

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
