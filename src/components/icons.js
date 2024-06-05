export function generateIconsComponents(k) {
  const iconsContainer = k.add([k.pos(1850, 20), k.fixed(), "iconsContainer"]);

  const iconData = [
    {
      sprite: "quest-icon",
      text: "Misi",
      pos: k.vec2(0, 0),
      scale: 2.5,
    },
    {
      sprite: "map-icon",
      text: "Peta",
      pos: k.vec2(0, 120),
      scale: 2.5,
    },
  ];

  iconData.forEach((icon) => {
    iconsContainer.add([
      k.sprite(icon.sprite),
      k.pos(icon.pos),
      k.scale(icon.scale),
      k.area(),
      "icons",
    ]);

    iconsContainer.add([
      k.text(icon.text, { size: 24 }),
      k.pos(icon.pos.add(k.vec2(-5, 60))),
      k.color(255, 255, 255),
    ]);

    k.onHover("icons", () => {
      document.body.style.cursor = "pointer";
      document.body.getElementsByTagName("canvas")[0].style.cursor = "pointer";
    });

    k.onHoverEnd("icons", () => {
      document.body.style.cursor = "default";
      document.body.getElementsByTagName("canvas")[0].style.cursor = "default";
    });
  });
}
