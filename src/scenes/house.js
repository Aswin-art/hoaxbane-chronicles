import {
  colorizeBackground,
  drawBoundaries,
  drawTiles,
  fetchMapData,
} from "../../utils.js";
import {
  endInteraction,
  generateNPCComponents,
  startInteraction,
} from "../components/npc.js";
import {
  generatePlayerComponents,
  setPlayerMovement,
} from "../components/player.js";
import { gameState } from "../states/index.js";
import { healthBar } from "../states/healthbar.js";

export default async function house(k) {
  colorizeBackground(k, 27, 29, 52);
  const mapData = await fetchMapData("./assets/map/house.json");

  const map = k.add([k.pos(0, 0)]);

  const entities = {
    player: null,
    oldman: null,
  };

  const layers = mapData.layers;

  for (const layer of layers) {
    if (layer.name === "Boundaries") {
      drawBoundaries(k, map, layer);
      continue;
    }

    if (layer.name === "SpawnPoints") {
      for (const object of layer.objects) {
        if (object.name === "player") {
          entities.player = map.add(
            generatePlayerComponents(k, k.vec2(object.x, object.y))
          );
        }

        if (object.name === "oldman") {
          entities.oldman = map.add(
            generateNPCComponents(k, k.vec2(object.x, object.y))
          );
        }
      }
      continue;
    }

    drawTiles(k, map, layer, mapData.tileheight, mapData.tilewidth);
  }

  k.camScale(6);
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

  entities.player.onCollide("oldman", () => {
    startInteraction(k, entities.oldman, entities.player);
  });

  entities.player.onCollideEnd("oldman", () => {
    endInteraction(entities.oldman);
  });

  entities.player.onCollide("door-exit", () => {
    gameState.setPreviousScene("house");
    k.go("world");
  });

  healthBar(k);
}
