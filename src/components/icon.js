export function generateIconComponents(k) {
  const totalIcons = ["backpack"];
  const iconsContainer = k.add([k.pos(1700, 800), k.fixed(), "iconsContainer"]);
  let previousX = 0;

  for (const icon of totalIcons) {
    iconsContainer.add([k.sprite(icon), k.pos(previousX, 0)]);
    previousX -= 48;
  }

  //   return [
  //     k.sprite("assets", {
  //       anim: "player-idle-down",
  //     }),
  //     k.area({ shape: new k.Rect(k.vec2(3, 4), 10, 12) }),
  //     k.body(),
  //     k.pos(pos),
  //     k.opacity(),
  //     {
  //       speed: 100,
  //       attackPower: 1,
  //       direction: "down",
  //       isAttack: false,
  //     },
  //     "player",
  //   ];

  return iconsContainer;
}
