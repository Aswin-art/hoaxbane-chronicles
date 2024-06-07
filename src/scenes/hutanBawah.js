import {
  colorizeBackground,
  drawBoundaries,
  drawTiles,
  fetchMapData,
  onAttacked,
  onCollideWithPlayer,
} from "../../utils.js";
import {
  generatePlayerComponents,
  setPlayerMovement,
} from "../components/player.js";
// import { generateSlimeComponents, setSlimeAI } from "../components/slime.js";
import { gameState } from "../states/index.js";
import { healthBar } from "../states/healthbar.js";
import {
  generateArrowKeyComponents,
  generateIconsComponents,
  generateInventoryBarComponents,
} from "../components/icons.js";
import { generateSlimeComponents } from "../components/slime.js";

export default async function hutanBawah(k) {
  colorizeBackground(k, 0, 0, 0);
  const mapData = await fetchMapData("./assets/map/hutan-bawah.json");

  const map = k.add([k.pos(0, 0)]);

  const entities = {
    player: null,
    monster: null,
  };

  const layers = mapData.layers;

  for (const layer of layers) {
    if (layer.name === "Boundaries") {
      drawBoundaries(k, map, layer);
      continue;
    }

    if (layer.name === "SpawnPoints") {
      for (const object of layer.objects) {
        if (
          object.name === "player-dungeon" &&
          gameState.getPreviousScene() === "dungeon"
        ) {
          entities.player = map.add(
            generatePlayerComponents(k, k.vec2(object.x, object.y))
          );
        }

        if (
          object.name === "player" &&
          gameState.getPreviousScene() !== "dungeon"
        ) {
          entities.player = map.add(
            generatePlayerComponents(k, k.vec2(object.x, object.y))
          );
        }

        if (object.name === "monster") {
          entities.monster = map.add(
            generateSlimeComponents(
              k,
              k.vec2(object.x, object.y),
              "slime-idle-down"
            )
          );
        }
      }
      continue;
    }

    drawTiles(
      k,
      "topdown-assets",
      map,
      layer,
      mapData.tileheight,
      mapData.tilewidth
    );
  }

  k.camScale(5);
  k.camPos(entities.player.worldPos());

  k.onUpdate(async () => {
    if (entities.player.pos.dist(k.camPos())) {
      await k.tween(
        k.camPos(),
        entities.player.worldPos(),
        0.2,
        (newPos) => k.camPos(newPos),
        k.easings.linear
      );
    }
  });

  setPlayerMovement(k, entities.player);

  //   //   for (const slime of entities.slimes) {
  //   //     setSlimeAI(k, slime);
  //   //     onAttacked(k, slime, entities.player);
  //   //     onCollideWithPlayer(k, slime);
  //   //   }

  entities.player.onCollide("exit-village", () => {
    gameState.setPreviousScene("hutanBawah");
    k.go("village");
  });

  entities.player.onCollide("exit-boss", () => {
    gameState.setPreviousScene("hutanBawah");
    k.go("bos");
  });

  function flashScreen() {
    const flash = k.add([
      k.rect(window.innerWidth, window.innerHeight),
      k.color(10, 10, 10),
      k.fixed(),
      k.opacity(0),
    ]);
    k.tween(
      flash.opacity,
      1,
      0.5,
      (val) => (flash.opacity = val),
      k.easings.easeInBounce
    );
  }

  entities.player.onCollide("monster", () => {
    flashScreen();
    setTimeout(() => {
      gameState.setPreviousScene("hutanBawah");
      k.go("battle");
    }, 1000);
  });

  healthBar(k);
  generateIconsComponents(k);
  generateArrowKeyComponents(k);
  generateInventoryBarComponents(k);
}
