import { playerState } from "./src/states/index";
// import { healthBar } from "./src/state/UIComponents/healthbar.js";

export function playAnimIfNotPlaying(gameObj, animName) {
  if (gameObj.curAnim() !== animName) gameObj.play(animName);
}

export function areAnyOfTheseKeysDown(k, keys) {
  for (const key of keys) {
    if (k.isKeyDown(key)) return true;
  }

  return false;
}

export function colorizeBackground(k, r, g, b) {
  k.add([k.rect(k.canvas.width, k.canvas.height), k.color(r, g, b), k.fixed()]);
}

export async function fetchMapData(mapPath) {
  // const response = await fetch(mapPath);
  // const json = await response.json();
  //   OR
  return await (await fetch(mapPath)).json();
}

export function drawTiles(k, assets, map, layer, tileheight, tilewidth) {
  let number_of_drawn_tiles = 0;
  const tile_pos = k.vec2(0, 0);

  for (const tile of layer.data) {
    if (number_of_drawn_tiles % layer.width === 0) {
      tile_pos.x = 0;
      tile_pos.y += tileheight;
    } else {
      tile_pos.x += tilewidth;
    }

    number_of_drawn_tiles++;

    if (tile === 0) {
      continue;
    }

    map.add([
      k.sprite(assets, { frame: tile - 1 }),
      k.pos(tile_pos),
      k.offscreen(),
    ]);
  }
}

export function generateColliderBoxComponents(k, width, height, pos, tag) {
  return [
    k.area({ shape: new k.Rect(k.vec2(0), width, height) }),
    k.pos(pos),
    k.body({ isStatic: true }),
    k.offscreen(),
    tag != "" ? tag : "boundaries",
  ];
}

export function drawBoundaries(k, map, layer) {
  for (const object of layer.objects) {
    map.add(
      generateColliderBoxComponents(
        k,
        object.width,
        object.height,
        k.vec2(object.x, object.y + 16),
        object.name
      )
    );
  }
}

export async function blinkEffect(k, entity) {
  await k.tween(
    entity.opacity,
    0,
    0.1,
    (val) => (entity.opacity = val),
    k.easings.linear
  );
  await k.tween(
    entity.opacity,
    1,
    0.1,
    (val) => (entity.opacity = val),
    k.easings.linear
  );
}

export function onAttacked(k, entity, player) {
  entity.onCollide("swordHitBox", async () => {
    if (entity.isAttacking) return;

    if (entity.hp() <= 0) {
      k.destroy(entity);
    }

    await blinkEffect(k, entity);
    entity.hurt(player.attackPower);
  });
}

export function onCollideWithPlayer(k, entity) {
  entity.onCollide("player", async (player) => {
    if (player.isAttacking) return;
    playerState.setHealth(playerState.getHealth() - entity.attackPower);
    k.destroyAll("heartsContainer");
    // healthBar(k, player);

    await blinkEffect(k, player);

    if (playerState.getHealth() <= 0) {
      playerState.setHealth(playerState.getMaxHealth());
      k.go("world");
    }
  });
}
