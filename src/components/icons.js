import { playerState } from "../states";

export function generateArrowKeyComponents(k) {
  const keysContainer = k.add([k.pos(20, 20), k.fixed(), "keysContainer"]);

  const keyData = [
    {
      sprite: "arrow-up",
      text: "Jalan Atas",
      textPosition: {
        x: 50,
        y: 10,
      },
      pos: k.vec2(0, 0),
      scale: 0.6,
    },
    {
      sprite: "arrow-right",
      text: "Jalan Kanan",
      textPosition: {
        x: 50,
        y: 10,
      },
      pos: k.vec2(0, 60),
      scale: 0.6,
    },
    {
      sprite: "arrow-down",
      text: "Jalan Bawah",
      textPosition: {
        x: 50,
        y: 10,
      },
      pos: k.vec2(0, 120),
      scale: 0.6,
    },
    {
      sprite: "arrow-left",
      text: "Jalan Kiri",
      textPosition: {
        x: 50,
        y: 10,
      },
      pos: k.vec2(0, 180),
      scale: 0.6,
    },
    {
      sprite: "space",
      text: "Untuk Interaksi",
      textPosition: {
        x: 100,
        y: 10,
      },
      pos: k.vec2(0, 240),
      scale: 1.2,
    },
  ];

  keyData.forEach((key) => {
    keysContainer.add([
      k.sprite(key.sprite),
      k.pos(key.pos),
      k.scale(key.scale),
    ]);
    keysContainer.add([
      k.text(key.text, { size: 24 }),
      k.pos(key.pos.add(k.vec2(key.textPosition.x, key.textPosition.y))),
      k.color(255, 255, 255),
    ]);
  });

  return keysContainer;
}

function showModal(k, text) {
  const modal = k.add([
    k.rect(600, 300),
    k.pos(500, 500),
    k.color(0, 0, 0),
    k.opacity(0.8),
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
      sprite: "music-off-icon",
      text: "",
      pos: k.vec2(-240, 5),
      scale: 1,
      textPosition: {
        x: 0,
        y: 0,
      },
      modalText: "",
    },
    {
      sprite: "music-on-icon",
      text: "",
      pos: k.vec2(-200, 5),
      scale: 1,
      textPosition: {
        x: 0,
        y: 0,
      },
      modalText: "",
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

    const iconText = iconsContainer.add([
      k.text(icon.text, { size: 24 }),
      k.pos(icon.pos.add(k.vec2(icon.textPosition.x, icon.textPosition.y))),
      k.color(255, 255, 255),
    ]);

    k.onClick("icons", () => showModal(k, icon.modalText));

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

export function generateInventoryBarComponents(k) {
  const inventoryBarContainer = k.add([
    k.pos(20, k.height() - 90),
    k.fixed(),
    "inventoryBarContainer",
  ]);

  const inventoryBarSprite = inventoryBarContainer.add([
    k.sprite("inventory_bar"),
    k.pos(0, 0),
    k.area(),
    k.scale(2),
    "inventory_bar",
  ]);

  k.onHover(inventoryBarSprite, () => {
    document.body.style.cursor = "pointer";
    document.body.getElementsByTagName("canvas")[0].style.cursor = "pointer";
  });

  k.onHoverEnd(inventoryBarSprite, () => {
    document.body.style.cursor = "default";
    document.body.getElementsByTagName("canvas")[0].style.cursor = "default";
  });

  k.onClick(inventoryBarSprite, () => {
    showModal(k, "Ini adalah modal untuk inventaris");
  });
}
