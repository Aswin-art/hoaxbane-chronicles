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

export default async function village(k) {
  colorizeBackground(k, 27, 29, 52);
  const mapData = await fetchMapData("/assets/map/village.json");

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
          object.name === "player-hutan-kiri" &&
          gameState.getPreviousScene() === "hutanKiri"
        ) {
          entities.player = map.add(
            generatePlayerComponents(k, k.vec2(object.x, object.y))
          );
        }
        if (
          object.name === "player-hutan-atas" &&
          gameState.getPreviousScene() === "hutanAtas"
        ) {
          entities.player = map.add(
            generatePlayerComponents(k, k.vec2(object.x, object.y))
          );
        }
        if (
          object.name === "player-hutan-bawah" &&
          gameState.getPreviousScene() === "hutanBawah"
        ) {
          entities.player = map.add(
            generatePlayerComponents(k, k.vec2(object.x, object.y))
          );
        }

        if (
          object.name === "player" &&
          gameState.getPreviousScene() == "halaman"
        ) {
          entities.player = map.add(
            generatePlayerComponents(k, k.vec2(object.x, object.y))
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

  entities.player.onCollide("exit-rumah", () => {
    gameState.setPreviousScene("village");
    k.go("halaman");
  });
  entities.player.onCollide("exit-hutan-atas", () => {
    gameState.setPreviousScene("village");
    k.go("hutanAtas");
  });
  entities.player.onCollide("exit-hutan-kiri", () => {
    gameState.setPreviousScene("village");
    k.go("hutanKiri");
  });
  entities.player.onCollide("exit-hutan-bawah", () => {
    gameState.setPreviousScene("village");
    k.go("hutanBawah");
  });

  //   entities.player.onCollide("dungeon-door-entrance", () => {
  //     gameState.setPreviousScene("world");
  //     k.go("dungeon");
  //   });

  healthBar(k);
  generateIconsComponents(k);
  generateArrowKeyComponents(k);
  generateInventoryBarComponents(k);
}
