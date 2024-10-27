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
import {
  endInteraction,
  generateNPC1Components,
  startInteraction,
  startInteractionNPC1,
  endInteractionNPC1,
} from "../components/npc.js";

export default async function halaman(k) {
  colorizeBackground(k, 27, 29, 52);
  gameState.setCurrScene("halaman");
  const mapData = await fetchMapData("/assets/map/new/halaman-rumah.json");

  const map = k.add([k.pos(0, 0)]);

  const entities = {
    player: null,
    npc: null,
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
          object.name === "player-entrance" &&
          gameState.getPreviousScene() === "village"
        ) {
          entities.player = map.add(
            generatePlayerComponents(k, k.vec2(object.x, object.y))
          );
        }

        if (
          object.name === "player" &&
          gameState.getPreviousScene() !== "village"
        ) {
          entities.player = map.add(
            generatePlayerComponents(k, k.vec2(object.x, object.y))
          );
        }
        
        if (object.name === "NPC1") {
          entities.npc = map.add(
            generateNPC1Components(k, k.vec2(object.x, object.y))
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

  entities.player.onCollide("npc1", () => {
    startInteractionNPC1(k, entities.npc, entities.player);
  });

  entities.player.onCollideEnd("npc1", () => {
    endInteractionNPC1(entities.npc);
  });

  entities.player.onCollide("exit-village", () => {
    gameState.setPreviousScene("halaman");
    k.go("village");
  });

  entities.player.onCollide("exit-rumah", () => {
    gameState.setPreviousScene("halaman");
    k.go("house");
  });

  healthBar(k);
  generateIconsComponents(k);
  generateArrowKeyComponents(k);
  generateInventoryBarComponents(k);
}
