import { playAnimIfNotPlaying } from "../../utils.js";

const directionalState = ["left", "right", "up", "down"];
export function generateSlimeComponents(k, pos, slimePosition) {
  return [
    k.sprite("assets", {
      anim: slimePosition,
    }),
    k.area({ shape: new k.Rect(k.vec2(0, 6), 16, 10) }),
    k.body({ isStatic: true }),
    k.pos(pos),
    k.opacity(),
    k.offscreen(),
    k.state("idle"),
    k.health(3),
    {
      speed: 30,
      attackPower: 0.5,
    },
    "monster",
  ];
}

export function setSlimeAI(k, slime) {
  k.onUpdate(() => {
    switch (slime.state) {
      case "right": {
        slime.move(slime.speed, 0);
        break;
      }
      case "left": {
        slime.move(-slime.speed, 0);
        break;
      }
      case "up": {
        slime.move(0, -slime.speed);
        break;
      }
      case "down": {
        slime.move(0, slime.speed);
        break;
      }
      default: {
        break;
      }
    }
  });

  const idle = slime.onStateEnter("idle", async () => {
    slime.stop();
    await k.wait(1);
    slime.enterState(
      directionalState[Math.floor(Math.random() * directionalState.length)]
    );
  });

  const right = slime.onStateEnter("right", async () => {
    slime.flipX = false;
    playAnimIfNotPlaying(slime, "slime-side");

    await k.wait(1);

    if (slime.getCollisions().length > 0) {
      slime.enterState("idle");
      return;
    }

    slime.enterState("idle");
  });

  const left = slime.onStateEnter("left", async () => {
    slime.flipX = true;
    playAnimIfNotPlaying(slime, "slime-side");

    await k.wait(1);

    if (slime.getCollisions().length > 0) {
      slime.enterState("idle");
      return;
    }

    slime.enterState("idle");
  });

  const up = slime.onStateEnter("up", async () => {
    playAnimIfNotPlaying(slime, "slime-up");

    await k.wait(1);

    if (slime.getCollisions().length > 0) {
      slime.enterState("idle");
      return;
    }

    slime.enterState("idle");
  });

  const down = slime.onStateEnter("down", async () => {
    playAnimIfNotPlaying(slime, "slime-down");

    await k.wait(1);

    if (slime.getCollisions().length > 0) {
      slime.enterState("idle");
      return;
    }

    slime.enterState("idle");
  });

  k.onSceneLeave(() => {
    idle.cancel();
    right.cancel();
    left.cancel();
    up.cancel();
    down.cancel();
  });
}
