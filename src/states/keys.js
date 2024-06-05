export function keys(k) {
  const keysContainer = k.add([k.pos(20, 20), k.fixed(), "keysContainer"]);

  const keyData = [
    { sprite: "arrow-up", text: "Jalan Atas", pos: k.vec2(0, 0) },
    { sprite: "arrow-right", text: "Jalan Kanan", pos: k.vec2(0, 60) },
    { sprite: "arrow-down", text: "Jalan Bawah", pos: k.vec2(0, 120) },
    { sprite: "arrow-left", text: "Jalan Kiri", pos: k.vec2(0, 180) },
  ];

  keyData.forEach((key) => {
    keysContainer.add([k.sprite(key.sprite), k.pos(key.pos), k.scale(0.6)]);
    keysContainer.add([
      k.text(key.text, { size: 24 }),
      k.pos(key.pos.add(k.vec2(50, 10))),
      k.color(255, 255, 255),
    ]);
  });

  return keysContainer;
}
