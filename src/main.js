import kaboom from "kaboom";
import house from "./scenes/house";
import halaman from "./scenes/halaman";
import boss from "./scenes/boss";
import menu from "./scenes/menu";
import gameover from "./scenes/gameover";
import BattleCard from "./scenes/battle-card";
import intro from "./scenes/intro";
import village from "./scenes/village";

// new
// import villageHall from "./scenes/village-hall";

const startGame = async () => {
  const k = kaboom({
    width: window.innerWidth,
    height: window.innerHeight,
    letterbox: true,
    global: false,
    loadingScreen: false,
    fullscreen: true,
  });

  // memuat font
  await k.loadFont("gameboy", "/assets/fonts/gb.ttf");

  // memuat asset gambar
  await k.loadSprite("assets", "/assets/images/topdownasset.png", {
    sliceX: 39,
    sliceY: 31,
    anims: {
      "player-idle-down": 936,
      "player-down": {
        from: 936,
        to: 939,
        loop: true,
      },
      "player-idle-side": 976,
      "player-side": {
        from: 976,
        to: 978,
        loop: true,
      },
      "player-idle-up": 1014,
      "player-up": {
        from: 1014,
        to: 1017,
        loop: true,
      },
      "player-attack-up": 1094,
      "player-attack-down": 1092,
      "player-attack-left": 1093,
      "player-attack-right": 1093,
      "slime-idle-side": 860,
      "slime-side": {
        from: 860,
        to: 861,
        loop: true,
      },
      "slime-idle-down": 858,
      "slime-down": {
        from: 858,
        to: 859,
        loop: true,
      },
      "slime-idle-up": 897,
      "slime-up": {
        from: 897,
        to: 898,
        loop: true,
      },
      "oldman-up": 905,
      "oldman-side": 907,
      "oldman-down": 866,
      "ghost-down": {
        from: 862,
        to: 863,
        loop: true,
      },
    },
  });

  await k.loadSprite("topdown-assets", "/assets/images/tilesheet2.png", {
    sliceX: 20,
    sliceY: 98,
  });

  await k.loadSprite(
    "battle-background",
    "/assets/images/battleBackground.png"
  );

  // memuat asset heart (nyawa)
  await k.loadSpriteAtlas("/assets/images/topdownasset.png", {
    "full-heart": {
      x: 0,
      y: 224,
      width: 48,
      height: 48,
    },
    "half-heart": {
      x: 48,
      y: 224,
      width: 48,
      height: 48,
    },
    "empty-heart": {
      x: 96,
      y: 224,
      width: 48,
      height: 48,
    },
  });

  // memuat asset keys (arrow key)
  await k.loadSpriteAtlas("/assets/images/keys.png", {
    "arrow-up": {
      x: 28,
      y: 30,
      width: 75,
      height: 75,
    },
    "arrow-right": {
      x: 318,
      y: 33,
      width: 72,
      height: 68,
    },
    "arrow-left": {
      x: 220,
      y: 30,
      width: 75,
      height: 75,
    },
    "arrow-down": {
      x: 127,
      y: 33,
      width: 72,
      height: 68,
    },
  });

  // memuat asset keys (space key)
  await k.loadSpriteAtlas("/assets/images/important_key.png", {
    space: {
      x: 175,
      y: 93,
      width: 75,
      height: 32,
    },
  });

// memuat asset npc
// await k.loadSpriteAtlas("/assets/images/npc1-4.png", {
//   "npc1-up": {
//     x: 0,
//     y: 0,
//     width: 32,
//     height: 32,
//     sliceX: 3,
//   },
//   "npc1-right": {
//     x: 0,
//     y: 32,
//     width: 32,
//     height: 32,
//     sliceX: 3,
//   },
//   "npc1-down": {
//     x: 0,
//     y: 64,
//     width: 32,
//     height: 32,
//     sliceX: 3,
//   },
//   "npc1-left": {
//     x: 0,
//     y: 96,
//     width: 32,
//     height: 32,
//     sliceX: 3,
//   },
// });
// await k.loadSprite("npcs", "/assets/images/npc1-4.png", {
//   sliceX: 39,
//   sliceY: 31,
//   anims: {
//     "npc1-up": 905,
//     "npc1-side": 907,
//     "npc1-down": 866
//   },
// });

await k.loadSpriteAtlas("/assets/images/npc1-4.png", {
  "npc1-up": {
    x: 16,
    y: 140,
    width: 32,
    height: 40,
  },
  "npc1-side": {
    x: 16,
    y: 75,
    width: 32,
    height: 40,
  },
  "npc1-down": {
    x: 16,
    y: 10,
    width: 32,
    height: 45,
  }
});

// memuat asset keys (arrow key)
await k.loadSpriteAtlas("/assets/images/keys.png", {
  "arrow-up": {
    x: 28,
    y: 30,
    width: 75,
    height: 75,
  },
  "arrow-right": {
    x: 318,
    y: 33,
    width: 72,
    height: 68,
  },
  "arrow-left": {
    x: 220,
    y: 30,
    width: 75,
    height: 75,
  },
  "arrow-down": {
    x: 127,
    y: 33,
    width: 72,
    height: 68,
  },
});

  // memuat asset icons (quest, map)
  await k.loadSpriteAtlas("/assets/images/items.png", {
    "quest-icon": {
      x: 6,
      y: 71,
      width: 21,
      height: 21,
    },
    "map-icon": {
      x: 6,
      y: 365,
      width: 21,
      height: 21,
    },
  });

  // memuat asset icons (coin, shop)
  await k.loadSpriteAtlas("/assets/images/general.png", {
    "shop-icon": {
      x: 45,
      y: 45,
      width: 50,
      height: 45,
    },
    "coin-icon": {
      x: 228,
      y: 38,
      width: 52,
      height: 50,
    },
  });

  // memuat asset icons (musics)
  await k.loadSpriteAtlas("/assets/images/barsheet.png", {
    "trophy-icon": {
      x: 865,
      y: 55,
      width: 44,
      height: 40,
    },
  });

  // memuat asset inventory bar
  await k.loadSprite("inventory_bar", "/assets/images/inventory_bar.png");

  // memuat asset inventory
  await k.loadSprite("inventory", "/assets/images/inventory.png");

  // Memuat asset preview map (halaman)
  await k.loadSprite("map-halaman", "/assets/map/map-halaman.png");

  // Memuat asset preview map (hutan-kiri)
  await k.loadSprite("map-hutan-kiri", "/assets/map/map-hutan-kiri.png");

  // Memuat asset preview map (hutan-atas)
  await k.loadSprite("map-hutan-atas", "/assets/map/map-hutan-atas.png");

// Memuat asset preview map (boss)
await k.loadSprite("map-boss", "/assets/map/map-boss.png");

  // Memuat asset preview map (hutan-bawah)
  await k.loadSprite("map-hutan-bawah", "/assets/map/map-hutan-bawah.png");

  // Memuat asset preview map (village)
  await k.loadSprite("map-village", "/assets/map/map-village.png");

  // Memuat asset preview map (boss)
  await k.loadSprite("map-boss", "/assets/map/map-boss.png");

  // Memuat asset boss
  await k.loadSpriteAtlas("/assets/images/boss.png", {
    "boss-monster": {
      x: 360,
      y: 360,
      width: 400,
      height: 500,
    },
  });

  // Load battle background
  await k.loadSprite(
    "battle-card-background",
    "/assets/images/battle-background.png"
  );

  // Load heroes in battle
  await k.loadSpriteAtlas("/assets/images/heroes.png", {
    // "heroes-idle-down": {
    //   x: 0,
    //   y: 0,
    //   width: 16,
    //   height: 16,
    // },
    // "heroes-down": {
    //   from: 936,
    //   to: 939,
    //   loop: true,
    // },
    "heroes-idle-side": {
      x: 16,
      y: 64,
      width: 32,
      height: 64,
    },
    // "heroes-side": {
    //   from: 976,
    //   to: 978,
    //   loop: true,
    // },
    // "heroes-idle-up": 1014,
    // "heroes-up": {
    //   from: 1014,
    //   to: 1017,
    //   loop: true,
    // },
  });

  // Load enemies in battle
  await k.loadSprite("enemies", "/assets/images/character1.png");

  // Load pause button
  await k.loadSpriteAtlas("/assets/images/pause-button.png", {
    "pause-button": {
      x: 64,
      y: 48,
      width: 104,
      height: 89,
    },
  });

  // Load skill cards
  await k.loadSprite("fakta-card", "/assets/images/card.fakta.png");
  await k.loadSprite("opini-card", "/assets/images/card.opini.png");
  await k.loadSprite("saran-card", "/assets/images/card.saran.png");
  await k.loadSprite("halus-card", "/assets/images/card.halus.png");
  await k.loadSprite("sarkas-card", "/assets/images/card.sarkas.png");
  await k.loadSprite("mengancam-card", "/assets/images/card.mengancam.png");

  // Load health bar
  await k.loadSpriteAtlas("/assets/images/health-energy-bar.png", {
    "health-bar-bg": {
      x: 64,
      y: 48,
      width: 647,
      height: 57,
    },
    "health-bar-fill": {
      x: 112,
      y: 176,
      width: 647,
      height: 57,
    },
    "belief-bar-bg-enemy": {
      x: 64,
      y: 48,
      width: 647,
      height: 83,
    },
    "belief-bar-fill-enemy": {
      x: 96,
      y: 176,
      width: 647,
      height: 144,
    },
    "bar-white-icon": {
      x: 64,
      y: 336,
      width: 70,
      height: 50,
    },
    "bar-yellow-icon": {
      x: 192,
      y: 336,
      width: 70,
      height: 50,
    },
  });

  const scenes = {
    house,
    halaman,
    hutanKiri,
    hutanAtas,
    hutanBawah,
    village,
    boss,
    battle,
    menu,
    gameover,
    BattleCard,
    intro,
  };

  for (const sceneName in scenes) {
    k.scene(sceneName, (args) => scenes[sceneName](k, args));
  }

const scenes = {
  house,
  halaman,
  boss,
  menu,
  gameover,
  BattleCard,
  intro,
  village
};

for (const sceneName in scenes) {
  k.scene(sceneName, (args) => scenes[sceneName](k, args));
}

k.go("halaman");

  k.go("BattleCard");
};

startGame();
