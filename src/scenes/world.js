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
// import { healthBar } from "../state/UIComponents/healthbar.js";

export default async function world(k) {
  console.log(k);
  colorizeBackground(k, 76, 170, 255);
  const mapData = await fetchMapData("./assets/map/world.json");

  const map = k.add([k.pos(0, 0)]);

  const entities = {
    player: null,
    slimes: [],
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

        // if (object.name === "slime") {
        //   entities.slimes.push(
        //     map.add(generateSlimeComponents(k, k.vec2(object.x, object.y)))
        //   );
        // }
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

  //   for (const slime of entities.slimes) {
  //     setSlimeAI(k, slime);
  //     onAttacked(k, slime, entities.player);
  //     onCollideWithPlayer(k, slime);
  //   }

  entities.player.onCollide("door-entrance", () => {
    gameState.setPreviousScene("world");
    k.go("house");
  });

  entities.player.onCollide("dungeon-door-entrance", () => {
    gameState.setPreviousScene("world");
    k.go("dungeon");
  });

  //   healthBar(k);
}
