import {
  playTypingEffect,
  stopTypingEffect,
} from "../components/backgroundMusic";

const maxHealth = 100;
let playerHealth = maxHealth;
let enemyHealth = maxHealth;

const maxMana = 50;
let playerMana = maxMana;
let enemyMana = maxMana;
let isAnimating = false;

const playerName = "Hero Adimas";
const enemyName = "Penduduk Galuh";

const totalAction = 3;
let remainingActions = totalAction;

const addBoldText = (k, object, text, type, options) => {
  const layerOffset = 0.8;

  if (type === "player") {
    for (let i = 0; i < 2; i++) {
      object.add([
        k.text(text, options),
        k.pos(
          object.width / 2 + (i % 2) * layerOffset,
          layerOffset * (i < 2 ? 1 : -1)
        ),
        k.anchor("center"),
        "player-name",
      ]);
    }
  } else {
    for (let i = 0; i < 2; i++) {
      object.add([
        k.text(text, options),
        k.pos(
          object.width / 2 + (i % 2) * layerOffset,
          layerOffset * (i < 2 ? 1 : -1)
        ),
        k.anchor("center"),
        "enemy-name",
      ]);
    }
  }
};

async function displayLine(textContainer, line) {
  playTypingEffect();
  for (const char of line) {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        textContainer.text += char;
        resolve();
      }, 5);
    });
  }
  stopTypingEffect();
}

export default async function BattleCard(k) {
  // Load background
  await k.loadSprite(
    "battle-card-background",
    "/assets/images/battleback10.png"
  );

  // Load hero
  await k.loadSprite("player-card", "/assets/images/character1.png");
  await k.loadSprite("enemy-card", "/assets/images/character2.png");

  // Load skill cards
  await k.loadSprite("card1", "/assets/images/Ace.png");
  await k.loadSprite("card2", "/assets/images/Bakezori.png");
  await k.loadSprite("card3", "/assets/images/Black_Solus.png");
  await k.loadSprite("card4", "/assets/images/Coalfist.png");

  const map = k.add([k.sprite("battle-card-background"), k.scale(1.8)]);

  const mapWidth = map.width;
  const mapHeight = map.height;

  const player = map.add([k.sprite("player-card"), k.pos(0, 100)]);
  player.flipX = true;

  const enemy = map.add([k.sprite("player-card"), k.pos(mapWidth - 250, 100)]);

  const playerHealthBarBg = map.add([
    k.rect(350, 20),
    k.color(100, 100, 100),
    k.pos(0, 0),
    "player-health-bar-bg",
  ]);

  const playerHealthBar = map.add([
    k.rect(350, 20),
    k.color(249, 124, 17),
    k.pos(playerHealthBarBg.pos.x, playerHealthBarBg.pos.y),
    "player-health-bar",
  ]);

  const playerHealthBarLabel = playerHealthBar.add([
    k.text(`${playerHealth}/${maxHealth}`, { size: 9, align: "center" }),
    k.pos(playerHealthBar.width / 2, playerHealthBar.height / 2 + 1),
    k.anchor("center"),
    "player-health-label",
  ]);

  const playerManaBarBg = map.add([
    k.rect(300, 20),
    k.color(100, 100, 100),
    k.pos(0, 21),
    "player-mana-bar-bg",
  ]);

  const playerManaBar = map.add([
    k.rect(300, 20),
    k.color(0, 206, 200),
    k.pos(playerManaBarBg.pos.x, playerManaBarBg.pos.y),
    "player-mana-bar",
  ]);

  const playerManaBarLabel = playerManaBar.add([
    k.text(`${playerMana}/${maxMana}`, { size: 9, align: "center" }),
    k.pos(playerManaBar.width / 2, playerManaBar.height / 2 + 1),
    k.anchor("center"),
    "player-mana-label",
  ]);

  addBoldText(k, player, `${playerName}`, "player", {
    size: 12,
    align: "center",
  });

  const enemyHealthBarBg = map.add([
    k.rect(350, 20),
    k.color(100, 100, 100),
    k.pos(mapWidth - 385, 0),
    "enemy-health-bar-bg",
  ]);

  const enemyHealthBar = map.add([
    k.rect(350, 20),
    k.color(249, 124, 17),
    k.pos(enemyHealthBarBg.pos.x, enemyHealthBarBg.pos.y),
    "enemy-health-bar",
  ]);

  const enemyHealthBarLabel = enemyHealthBar.add([
    k.text(`${enemyHealth}/${maxHealth}`, { size: 9, align: "center" }),
    k.pos(enemyHealthBar.width / 2, enemyHealthBar.height / 2 + 1),
    k.anchor("center"),
    "enemy-health-label",
  ]);

  const enemyManaBarBg = map.add([
    k.rect(300, 20),
    k.color(100, 100, 100),
    k.pos(mapWidth - 335, 21),
    "enemy-mana-bar-bg",
  ]);

  const enemyManaBar = map.add([
    k.rect(300, 20),
    k.color(0, 206, 200),
    k.pos(enemyManaBarBg.pos.x, enemyManaBarBg.pos.y),
    "enemy-mana-bar",
  ]);

  const enemyManaBarLabel = enemyManaBar.add([
    k.text(`${enemyMana}/${maxMana}`, { size: 9, align: "center" }),
    k.pos(enemyManaBar.width / 2, enemyManaBar.height / 2 + 1),
    k.anchor("center"),
    "enemy-mana-label",
  ]);

  addBoldText(k, enemy, `${enemyName}`, "enemy", {
    size: 12,
    align: "center",
  });

  const drawCardUI = map.add([
    k.rect(40, 40),
    k.color(0, 200, 200),
    k.area(),
    k.pos(20, mapHeight - 170),
    "draw-card",
  ]);

  const drawCardAction = drawCardUI.add([
    k.text("3", { size: 12, align: "center" }),
    k.pos(drawCardUI.width / 2, drawCardUI.height / 2 + 1),
    k.anchor("center"),
    "draw-card-number",
  ]);

  const drawCardLabel = drawCardUI.add([
    k.text("Draw Card", { size: 10, align: "center" }),
    k.pos(drawCardUI.width / 2, drawCardUI.height + 15),
    k.anchor("center"),
    "draw-card-label",
  ]);

  k.onHover("draw-card", () => {
    k.setCursor("pointer");
  });

  k.onHoverEnd("draw-card", () => {
    k.setCursor("default");
  });

  const actionTurnUI = map.add([
    k.rect(70, 40),
    k.color(0, 200, 200),
    k.area(),
    k.pos(100, mapHeight - 170),
    "action-turn",
  ]);

  const actionTurnAction = actionTurnUI.add([
    k.text(`${remainingActions}/${totalAction}`, { size: 12, align: "center" }),
    k.pos(actionTurnUI.width / 2, actionTurnUI.height / 2 + 1),
    k.anchor("center"),
    "action-turn-number",
  ]);

  const actionTurnLabel = actionTurnUI.add([
    k.text("Turn Action", { size: 10, align: "center" }),
    k.pos(actionTurnUI.width / 2, actionTurnUI.height + 15),
    k.anchor("center"),
    "action-turn-label",
  ]);

  const skipTurnUI = map.add([
    k.rect(100, 40),
    k.color(0, 200, 200),
    k.area(),
    k.pos(mapWidth - 160, mapHeight - 170),
    "skip-turn",
  ]);

  const skipTurnText = skipTurnUI.add([
    k.text("Skip Turn", { size: 12, align: "center" }),
    k.pos(skipTurnUI.width / 2, skipTurnUI.height / 2 + 1),
    k.anchor("center"),
    "skip-turn-text",
  ]);

  k.onHover("skip-turn", () => {
    k.setCursor("pointer");
  });

  k.onHoverEnd("skip-turn", () => {
    k.setCursor("default");
  });

  const cards = [
    {
      name: "card1",
      image: "Ace.png",
      description:
        "Skill detail of Ace Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      cardId: 1,
      attack: 5,
      energy: 5,
      type: "fakta", // Kognitif
      method: "halus", // Afektif
    },
    {
      name: "card2",
      image: "Bakezori.png",
      description: "Skill detail of Bakezori",
      cardId: 2,
      attack: 10,
      energy: 5,
      type: "logika", // Kognitif
      method: "netral", // Afektif
    },
    {
      name: "card3",
      image: "Black_Solus.png",
      description: "Skill detail of Black Solus",
      cardId: 3,
      attack: 8,
      energy: 5,
      type: "pendapat", // Kognitif
      method: "sarkastis", // Afektif
    },
    {
      name: "card4",
      image: "Coalfist.png",
      description: "Skill detail of Coalfist",
      cardId: 4,
      attack: 2,
      energy: 5,
      type: "hipotesis", // Kognitif
      method: "mengancam", // Afektif
    },
  ];

  const cardWidth = 100;
  const cardSpacing = 50;
  const totalCardsWidth = (cardWidth + cardSpacing) * 4 - cardSpacing;
  const startX = (mapWidth - totalCardsWidth) / 2;

  cards.forEach((card, index) => {
    const cardX = startX + index * (cardWidth + cardSpacing) + 25;
    const cardY = mapHeight - 280;

    const cardSprite = map.add([
      k.sprite(card.name),
      k.pos(cardX, cardY),
      k.scale(0.3, 0.3),
      k.area(),
      k.opacity(1),
      "skill-card" + card.name,
      {
        description: card.description,
        cardId: card.cardId,
        attack: card.attack,
        energy: card.energy,
      },
    ]);

    const initialYPos = cardSprite.pos.y;
    let hoverTimeout;

    k.onHover("skill-card" + card.name, () => {
      if (!isAnimating) {
        k.setCursor("pointer");
        clearTimeout(hoverTimeout);

        k.tween(
          initialYPos,
          initialYPos - 25,
          0.2,
          (val) => (cardSprite.pos.y = val)
        );
      }
    });

    k.onHoverEnd("skill-card" + card.name, () => {
      if (!isAnimating) {
        k.setCursor("default");

        hoverTimeout = setTimeout(() => {
          k.tween(
            cardSprite.pos.y,
            initialYPos,
            0.2,
            (val) => (cardSprite.pos.y = val)
          );
        }, 50);
      }
    });

    k.onClick("skill-card" + card.name, async () => {
      const attackValue = card.attack;
      const energyRequired = card.energy;

      if (energyRequired > playerMana) {
        isAnimating = false;
        return;
      }

      if (isAnimating) return;

      if (remainingActions <= 0) return;

      isAnimating = true;
      k.setCursor("default");

      const centerX = (mapWidth - cardWidth * cardSprite.scale.x) / 2;

      k.tween(cardSprite.pos.x, centerX - 150, 0.5, (xPos) => {
        cardSprite.pos.x = xPos;
      });
      k.tween(cardSprite.pos.y, 0, 0.5, (yPos) => {
        cardSprite.pos.y = yPos;
      });

      k.tween(cardSprite.scale, k.vec2(0.5, 0.5), 0.5, (scale) => {
        cardSprite.scale = scale;
      });

      const descriptionBox = map.add([
        k.rect(200, 100),
        k.pos(player.pos.x + 125, player.pos.y + 25),
        k.color(255, 255, 255),
        k.opacity(0.9),
        "description-box",
      ]);

      const descriptionText = descriptionBox.add([
        k.text(``, {
          size: 10,
          width: 190,
          height: 90,
          transform: {
            color: k.rgb(0, 0, 0),
          },
        }),
        k.fixed(),
        k.pos(10, 10),
      ]);

      await displayLine(descriptionText, card.description);

      k.wait(1.2, () => {
        k.tween(descriptionBox.opacity, 0, 0.3, (val) => {
          descriptionBox.opacity = val;
        }).then(() => {
          descriptionBox.destroy();
        });
      });

      k.wait(1.2, () => {
        k.tween(cardSprite.opacity, 0, 0.3, (val) => {
          cardSprite.opacity = val;
        }).then(() => {
          cardSprite.destroy();

          const damageText = enemy.add([
            k.text(attackValue, {
              size: 20,
              align: "center",
              transform: {
                color: k.rgb(255, 0, 0),
              },
            }),
            k.pos(25, 25),
            k.opacity(1),
            k.anchor("center"),
            `${enemy}-damage`,
          ]);

          k.tween(damageText.pos.y, damageText.pos.y - 50, 0.5, (y) => {
            damageText.pos.y = y;
          }).then(() => {
            k.tween(damageText.opacity, 0, 0.5, (val) => {
              damageText.opacity = val;
            }).then(() => {
              damageText.destroy();
            });
          });

          remainingActions -= 1;
          enemyHealth -= attackValue;
          playerMana -= energyRequired;

          if (enemyHealth < 0) {
            enemyHealth = 0;
          }

          actionTurnAction.text = `${remainingActions}/${totalAction}`;

          playerManaBar.width = (playerMana / maxMana) * 300;
          playerManaBarLabel.text = `${playerMana}/${maxMana}`;

          enemyHealthBar.width = (enemyHealth / maxHealth) * 350;
          enemyHealthBarLabel.text = `${enemyHealth}/${maxHealth}`;

          const originalPosition = enemy.pos.x;
          const attackPosition = originalPosition - 10;

          k.tween(enemy.pos.x, attackPosition, 0.1, (pos) => {
            enemy.pos.x = pos;
          }).then(() => {
            k.tween(attackPosition, originalPosition, 0.1, (pos) => {
              enemy.pos.x = pos;
            });
          });

          isAnimating = false;
        });
      });
    });
  });
}
