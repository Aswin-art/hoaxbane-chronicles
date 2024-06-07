import { playerState } from "../states";

export function generateArrowKeyComponents(k) {
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

export function generateIconsComponents(k) {
  const iconsContainer = k.add([
    k.pos(k.width() - 70, 20),
    k.fixed(),
    "iconsContainer",
  ]);
  const playerCoin = playerState.getCoin();

  const iconData = [
    {
      sprite: "quest-icon",
      text: "Misi",
      pos: k.vec2(0, 0),
      scale: 2.5,
      textPosition: {
        x: -5,
        y: 60,
      },
      modalText: "Ini adalah modal untuk Misi",
    },
    {
      sprite: "shop-icon",
      text: "Toko",
      pos: k.vec2(0, 240),
      scale: 1,
      textPosition: {
        x: -5,
        y: 60,
      },
      modalText: "Ini adalah modal untuk Toko",
    },
    {
      sprite: "coin-icon",
      text: playerCoin,
      pos: k.vec2(-120, 5),
      scale: 0.8,
      textPosition: {
        x: 60,
        y: 12,
      },
      modalText: "Ini adalah modal untuk Coin",
    },
    {
      sprite: "map-icon",
      text: "Peta",
      pos: k.vec2(0, 120),
      scale: 2.5,
      textPosition: {
        x: -5,
        y: 60,
      },
      modalText: "Ini adalah modal untuk Peta",
    },
  ];

  iconData.forEach((icon) => {
    const iconSprite = iconsContainer.add([
      k.sprite(icon.sprite),
      k.pos(icon.pos),
      k.scale(icon.scale),
      k.area(),
      "icons",
    ]);

    iconsContainer.add([
      k.text(icon.text, { size: 24 }),
      k.pos(icon.pos.add(k.vec2(icon.textPosition.x, icon.textPosition.y))),
      k.color(255, 255, 255),
    ]);

    iconSprite.onClick(() => {
      showModal(k, icon.modalText);
    });

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

function showModal(k, text) {
  const modal = k.add([
    k.rect(600, 300),
    k.pos(k.width() / 2 - 300, k.height() / 2 - 150),
    k.color(0, 0, 0),
    k.opacity(0.8),
    k.layer("ui"),
    "modal",
  ]);

  modal.add([
    k.text(text, { size: 32, width: 580, align: "center" }),
    k.color(255, 255, 255),
    k.pos(20, 100),
  ]);

  modal.add([
    k.text("Tekan 'Enter' untuk menutup", {
      size: 24,
      width: 580,
      align: "center",
    }),
    k.color(255, 255, 255),
    k.pos(20, 200),
  ]);

  k.onKeyPress("enter", () => {
    k.destroyAll("modal");
  });
}

export function generateInventoryBarComponents(k) {
  const inventoryBarContainer = k.add([
    k.pos(20, k.height() - 90),
    k.fixed(),
    "inventoryBarContainer",
  ]);

  inventoryBarContainer.add([
    k.sprite("inventory_bar"),
    k.pos(0, 0),
    k.area(),
    k.scale(2),
    "inventory_bar",
  ]);

  k.onHover("inventory_bar", () => {
    document.body.style.cursor = "pointer";
    document.body.getElementsByTagName("canvas")[0].style.cursor = "pointer";
  });

  k.onHoverEnd("inventory_bar", () => {
    document.body.style.cursor = "default";
    document.body.getElementsByTagName("canvas")[0].style.cursor = "default";
  });
}
