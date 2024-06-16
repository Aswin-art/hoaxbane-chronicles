import {
  colorizeBackground,
  drawBoundaries,
  drawTiles,
  fetchMapData,
} from "../../utils.js";
import {
  generatePlayerComponents,
  setPlayerMovement,
} from "../components/player.js";
import { gameState } from "../states/index.js";
import { healthBar } from "../states/healthbar.js";
import {
  generateArrowKeyComponents,
  generateIconsComponents,
  generateInventoryBarComponents,
} from "../components/icons.js";
import { generateBossComponents } from "../components/monster.js";

export default async function boss(k) {
  colorizeBackground(k, 27, 29, 52);
  const mapData = await fetchMapData("/assets/map/boss.json");
  gameState.setCurrScene("boss");

  const map = k.add([k.pos(0, 0)]);

  const entities = {
    player: null,
    boss: null,
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
          object.name === "player" &&
          gameState.getPreviousScene() === "hutanBawah"
        ) {
          entities.player = map.add(
            generatePlayerComponents(k, k.vec2(object.x, object.y))
          );
        }

        if (object.name === "boss") {
          entities.boss = map.add(
            generateBossComponents(k, k.vec2(object.x - 15, object.y - 15))
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

  entities.player.onCollide("exit-hutan-bawah", () => {
    gameState.setPreviousScene("boss");
    k.go("hutanBawah");
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

  entities.player.onCollide("boss", () => {
    flashScreen();
    setTimeout(() => {
      gameState.setPreviousScene("boss");
      k.go("battle");
    }, 1000);
  });

  healthBar(k);
  generateIconsComponents(k);
  generateArrowKeyComponents(k);
  generateInventoryBarComponents(k);
}
