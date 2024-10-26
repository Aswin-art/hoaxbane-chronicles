import {
  playAttackEffect,
  playBackgroundMusic,
  playClickSkillCard,
  playTypingEffect,
  stopTypingEffect,
} from "../components/backgroundMusic";

const maxHealth = 100;
let playerHealth = maxHealth;

const maxMana = 50;
let playerMana = maxMana;

const maxHostility = 100;
const maxBelief = 100;
let enemyHostility = 30;
let enemyBelief = maxBelief;

let isAnimating = false;

const playerName = "Hero Adimas";
const enemyName = "Penduduk Galuh";

const totalAction = 3;
let remainingActions = totalAction;

let currentTurn = "player";

let currentCognitiveCard = null;
let currentAffectiveCard = null;

const cognitiveCards = [
  {
    name: "fakta-card",
    cardId: Math.floor(Math.random() * 100),
    description:
      "Menyampaikan informasi objektif yang telah diverifikasi kebenarannya. Gunakan fakta untuk memperkuat argumen dan memperjelas situasi.",
    short_description:
      "Fakta bagus untuk meningkatkan tekanan pada lawan, tetapi juga meningkatnya hostility.",
    type: "Kognitif",
    method: "Fakta",
    result1: "+attack",
    result2: "+hostility",
  },
  {
    name: "opini-card",
    cardId: Math.floor(Math.random() * 100),
    description:
      "Mengungkapkan pandangan atau persepsi pribadi tentang suatu topik. Opini tidak harus benar atau salah, tetapi harus didasarkan pada pengalaman atau sudut pandang.",
    short_description:
      "Opini bisa menciptakan strategi yang lebih defensif dan mendukung ketahanan karakter.",
    type: "Kognitif",
    method: "Opini",
    result1: "+defense",
    result2: "+health",
  },
  {
    name: "saran-card",
    cardId: Math.floor(Math.random() * 100),
    description:
      "Memberikan rekomendasi atau masukan berdasarkan analisis situasi. Saran membantu menawarkan solusi atau arah tindakan yang dapat diambil.",
    short_description:
      "Saran membantu menciptakan serangan yang kuat namun terkontrol, mengurangi risiko konflik yang terlalu besar.",
    type: "Kognitif",
    method: "Saran",
    result1: "+attack",
    result2: "-hostility",
  },
];

const affectiveCards = [
  {
    name: "halus-card",
    cardId: Math.floor(Math.random() * 100),
    description:
      "Pendekatan halus untuk menyampaikan pesan. Meskipun tidak langsung, kata-kata yang lembut dapat membuat lawan lebih terbuka terhadap ide.",
    short_description:
      "Menggunakan metode halus dapat mengurangi hostility namun kurang efektif dalam menyerang langsung.",
    type: "Afektif",
    method: "Halus",
    result1: "+attack",
    result2: "+hostility",
  },
  {
    name: "sarkas-card",
    cardId: Math.floor(Math.random() * 100),
    description:
      "Menggunakan humor atau sarkasme untuk menyindir lawan, membuat argumen terasa lebih tajam, meskipun sering berisiko menambah ketegangan.",
    short_description:
      "Sarkasme menambah tekanan pada lawan tetapi dapat meningkatkan hostility secara signifikan.",
    type: "Afektif",
    method: "Sarkas",
    result1: "+defense",
    result2: "+health",
  },
  {
    name: "mengancam-card",
    cardId: Math.floor(Math.random() * 100),
    description:
      "Pendekatan langsung dengan ancaman atau intimidasi, bertujuan untuk memaksa lawan menyerah atau mundur.",
    short_description:
      "Mengancam adalah cara yang efektif untuk meningkatkan serangan, tetapi hostility juga akan meningkat pesat.",
    type: "Afektif",
    method: "Mengancam",
    result1: "+attack",
    result2: "-hostility",
  },
];

const addBoldText = (k, object, text, type, options) => {
  const layerOffset = 0.3;

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

const getRandomCard = (cards) => {
  const randomIndex = Math.floor(Math.random() * cards.length);
  const card = cards[randomIndex];
  card.cardId = Math.floor(Math.random() * 100) + Date.now();
  return card;
};

function playerReceiveDamage(k, damage, player, playerHealthBarFill) {
  if (playerHealth <= 0) return;
  playerHealth -= damage;
  playerHealthBarFill.width = (playerHealth / maxHealth) * 647;

  const damageText = player.add([
    k.text(damage, {
      size: 10,
      align: "center",
      transform: {
        color: k.rgb(255, 0, 0),
      },
    }),
    k.pos(25, 25),
    k.opacity(1),
    k.anchor("center"),
    `${player}-damage`,
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

  playAttackEffect();
}

const npcTurn = (k, player, playerHealthBarFill) => {
  const npcDamage = Math.floor(Math.random() * (10 - 5 + 1)) + 5;

  k.tween(currentCognitiveCard.opacity, 0, 1.2, (val) => {
    currentCognitiveCard.opacity = val;
  }).then(() => {
    currentCognitiveCard.destroy();
  });

  k.tween(currentAffectiveCard.opacity, 0, 1.4, (val) => {
    currentAffectiveCard.opacity = val;
  }).then(() => {
    currentAffectiveCard.destroy();
  });

  k.wait(1.7, () => {
    playerReceiveDamage(k, npcDamage, player, playerHealthBarFill);
  });

  isAnimating = false;
};

const playerTurn = (card, enemyBeliefBar, enemyBeliefBarLabel) => {
  console.log(card);
  const npcDamage = Math.floor(Math.random() * (10 - 5 + 1)) + 5;

  isAnimating = true;
};

let spawnCards = [];

const removeSpawnCards = (k, clickedCardId) => {
  if (spawnCards.length > 0) {
    spawnCards.forEach((card) => {
      if (card.cardId !== clickedCardId) {
        k.tween(card.opacity, 0, 0.3, (val) => {
          card.opacity = val;
        }).then(() => {
          card.destroy();
        });
      }
    });

    spawnCards = [];
  }
};

const applyCardDamage = () => {
  if (!currentCognitiveCard || !currentAffectiveCard) return;

  let attack = 0;
  let hostility = 0;

  switch (currentCognitiveCard.method) {
    case "Fakta":
      attack += 15;
      hostility += 5;
      break;
    case "Saran":
      attack += 20;
      hostility -= 5;
      break;
    case "Opini":
      attack += 10;
      hostility += 10;
      break;
  }

  switch (currentAffectiveCard.method) {
    case "Halus":
      attack -= 5;
      hostility -= 5;
      break;
    case "Sarkas":
      attack += 5;
      hostility += 10;
      break;
    case "Mengancam":
      attack += 15;
      hostility += 15;
      break;
  }

  return {
    attack,
    hostility,
  };
};

const spawnNewAffectiveCard = (
  k,
  map,
  cards,
  cardX,
  cardY,
  mapWidth,
  mapHeight,
  cardWidth,
  player,
  playerHealthBarFill,
  enemy,
  enemyBeliefBarFill
) => {
  const cardSpacing = 50;
  const totalCardsWidth = (cardWidth + cardSpacing) * 3 - cardSpacing;
  const startX = (mapWidth - totalCardsWidth) / 2;
  cards.forEach((card, index) => {
    const cardX = startX + index * (cardWidth + cardSpacing) + 25;
    const cardY = mapHeight - 425;

    const cardSprite = map.add([
      k.sprite(card.name),
      k.pos(cardX, cardY + 100),
      k.scale(0.8, 0.8),
      k.area(),
      k.opacity(1),
      "skill-card" + card.cardId,
      {
        description: card.description,
        cardId: card.cardId,
        type: card.type,
        method: card.method,
      },
    ]);

    spawnCards.push(cardSprite);

    k.tween(
      cardSprite.pos.y,
      cardSprite.pos.y - 100,
      0.5,
      (value) => (cardSprite.pos.y = value)
    );

    const initialYPos = cardSprite.pos.y - 100;
    let hoverTimeout;

    const skillCardDescriptionBox = map.add([
      k.rect(300, 200),
      k.pos(cardSprite.pos.x, initialYPos - 250),
      k.color(0, 0, 0),
      k.opacity(0),
      "skill-card-description-box",
    ]);

    const skillCardDescriptionHeader = skillCardDescriptionBox.add([
      k.text(`${card.method}`, {
        size: 20,
        transform: {
          color: k.rgb(255, 255, 255),
        },
      }),
      k.fixed(),
      k.opacity(0),
      k.pos(10, 10),
    ]);

    const skillCardDescriptionContent = skillCardDescriptionHeader.add([
      k.text(`${card.description}`, {
        size: 14,
        width: 290,
        transform: {
          color: k.rgb(200, 200, 200),
        },
      }),
      k.fixed(),
      k.opacity(0),
      k.pos(0, 28),
    ]);

    const skillCardDescriptionFooterType = skillCardDescriptionBox.add([
      k.text(`${card.type}`, {
        size: 14,
        width: 70,
        transform: {
          color: k.rgb(200, 200, 200),
        },
      }),
      k.fixed(),
      k.opacity(0),
      k.pos(10, 175),
    ]);

    let result1Color;
    let result2Color;

    if (card.result1 === "+attack") result1Color = k.rgb(200, 0, 0);
    if (card.result1 === "+defense") result1Color = k.rgb(200, 100, 200);
    if (card.result1 === "+health") result1Color = k.rgb(0, 200, 200);
    if (card.result1 === "+hostility" || card.result1 === "-hostility")
      result1Color = k.rgb(200, 100, 0);

    if (card.result2 === "+attack") result2Color = k.rgb(200, 0, 0);
    if (card.result2 === "+defense") result2Color = k.rgb(200, 100, 200);
    if (card.result2 === "+health") result2Color = k.rgb(0, 200, 200);
    if (card.result2 === "+hostility" || card.result2 === "-hostility")
      result2Color = k.rgb(200, 100, 0);

    const skillCardDescriptionFooterResult1 =
      skillCardDescriptionFooterType.add([
        k.text(`${card.result1}`, {
          size: 14,
          width: 90,
          align: "center",
          transform: {
            color: result1Color,
          },
        }),
        k.fixed(),
        k.opacity(0),
        k.pos(skillCardDescriptionFooterType.width, 0),
      ]);

    const skillCardDescriptionFooterResult2 =
      skillCardDescriptionFooterResult1.add([
        k.text(`${card.result2}`, {
          size: 14,
          width: 90,
          align: "center",
          transform: {
            color: result2Color,
          },
        }),
        k.fixed(),
        k.opacity(0),
        k.pos(skillCardDescriptionFooterResult1.width, 0),
      ]);

    k.onHover("skill-card" + card.cardId, () => {
      if (!isAnimating) {
        k.setCursor("pointer");
        clearTimeout(hoverTimeout);

        if (!card.isClicked) {
          k.tween(
            initialYPos,
            initialYPos - 25,
            0.2,
            (val) => (cardSprite.pos.y = val)
          );

          skillCardDescriptionBox.opacity = 0.7;
          skillCardDescriptionHeader.opacity = 0.7;
          skillCardDescriptionContent.opacity = 0.7;
          skillCardDescriptionFooterType.opacity = 0.7;
          skillCardDescriptionFooterResult1.opacity = 0.7;
          skillCardDescriptionFooterResult2.opacity = 0.7;
        }
      }
    });

    k.onHoverEnd("skill-card" + card.cardId, () => {
      if (!isAnimating) {
        k.setCursor("default");

        if (!card.isClicked) {
          hoverTimeout = setTimeout(() => {
            k.tween(
              cardSprite.pos.y,
              initialYPos,
              0.2,
              (val) => (cardSprite.pos.y = val)
            );
          }, 50);

          skillCardDescriptionBox.opacity = 0;
          skillCardDescriptionHeader.opacity = 0;
          skillCardDescriptionContent.opacity = 0;
          skillCardDescriptionFooterType.opacity = 0;
          skillCardDescriptionFooterResult1.opacity = 0;
          skillCardDescriptionFooterResult2.opacity = 0;
        }
      }
    });

    k.onClick("skill-card" + card.cardId, async () => {
      if (card.isClicked || isAnimating) return;
      currentAffectiveCard = cardSprite;
      const attackValue = applyCardDamage();
      playClickSkillCard();

      card.isClicked = true;
      isAnimating = true;
      skillCardDescriptionBox.destroy();
      k.setCursor("default");

      const centerX = (mapWidth - cardWidth * 1.1) / 2;
      const centerY = (mapHeight - 400 * 1.1) / 2;

      k.tween(cardSprite.pos.x, centerX, 0.5, (xPos) => {
        cardSprite.pos.x = xPos;
      });

      k.tween(cardSprite.pos.y, centerY - 200, 0.5, (yPos) => {
        cardSprite.pos.y = yPos;
      });

      k.tween(cardSprite.scale, k.vec2(1.1, 1.1), 0.5, (scale) => {
        cardSprite.scale = scale;
      });

      const descriptionBox = map.add([
        k.rect(300, 150),
        k.pos(player.pos.x + 150, player.pos.y + 25),
        k.color(255, 255, 255),
        k.opacity(0.9),
        "description-box",
      ]);

      const descriptionText = descriptionBox.add([
        k.text(``, {
          size: 15,
          width: 290,
          height: 140,
          transform: {
            color: k.rgb(0, 0, 0),
          },
        }),
        k.fixed(),
        k.pos(10, 10),
      ]);

      await displayLine(descriptionText, card.description);

      k.wait(1.2, () => {
        const newPosX = currentCognitiveCard.pos.x + 100;
        const newPosY = currentCognitiveCard.pos.y;

        k.tween(descriptionBox.opacity, 0, 0.5, (val) => {
          descriptionBox.opacity = val;
        }).then(() => {
          descriptionBox.destroy();
        });

        k.tween(cardSprite.pos.x, newPosX, 0.5, (xPos) => {
          cardSprite.pos.x = xPos;
        });

        k.tween(cardSprite.pos.x, newPosX, 0.5, (xPos) => {
          cardSprite.pos.x = xPos;
        });

        k.tween(cardSprite.pos.y, newPosY, 0.5, (yPos) => {
          cardSprite.pos.y = yPos;
        });

        k.tween(cardSprite.scale, k.vec2(0.3, 0.3), 0.5, (scale) => {
          cardSprite.scale = scale;
        });

        const damageText = enemy.add([
          k.text(attackValue.attack, {
            size: 10,
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

        playAttackEffect();
        enemyBelief -= attackValue.attack;
        enemyBeliefBarFill.width = (enemyBelief / maxBelief) * 647;

        // Hapus semua card kognitive
        k.wait(0.5, () => {
          removeSpawnCards(k, card.cardId);
        });

        // switch to npc turn
        npcTurn(k, player, playerHealthBarFill);
      });
    });
  });
};

const spawnNewCognitiveCard = (
  k,
  map,
  card,
  cardX,
  cardY,
  mapWidth,
  mapHeight,
  cardWidth,
  player,
  playerHealthBarFill,
  enemy,
  enemyBeliefBarFill
) => {
  const cardSprite = map.add([
    k.sprite(card.name),
    k.pos(cardX, cardY + 100),
    k.scale(0.8, 0.8),
    k.area(),
    k.opacity(1),
    "skill-card" + card.cardId,
    {
      description: card.description,
      cardId: card.cardId,
      type: card.type,
      method: card.method,
    },
  ]);

  spawnCards.push(cardSprite);

  k.tween(
    cardSprite.pos.y,
    cardSprite.pos.y - 100,
    0.5,
    (value) => (cardSprite.pos.y = value)
  );

  const initialYPos = cardSprite.pos.y - 100;
  let hoverTimeout;

  const skillCardDescriptionBox = map.add([
    k.rect(300, 200),
    k.pos(cardSprite.pos.x, initialYPos - 250),
    k.color(0, 0, 0),
    k.opacity(0),
    "skill-card-description-box",
  ]);

  const skillCardDescriptionHeader = skillCardDescriptionBox.add([
    k.text(`${card.method}`, {
      size: 20,
      transform: {
        color: k.rgb(255, 255, 255),
      },
    }),
    k.fixed(),
    k.opacity(0),
    k.pos(10, 10),
  ]);

  const skillCardDescriptionContent = skillCardDescriptionHeader.add([
    k.text(`${card.description}`, {
      size: 14,
      width: 290,
      transform: {
        color: k.rgb(200, 200, 200),
      },
    }),
    k.fixed(),
    k.opacity(0),
    k.pos(0, 28),
  ]);

  const skillCardDescriptionFooterType = skillCardDescriptionBox.add([
    k.text(`${card.type}`, {
      size: 14,
      width: 70,
      transform: {
        color: k.rgb(200, 200, 200),
      },
    }),
    k.fixed(),
    k.opacity(0),
    k.pos(10, 175),
  ]);

  let result1Color;
  let result2Color;

  if (card.result1 === "+attack") result1Color = k.rgb(200, 0, 0);
  if (card.result1 === "+defense") result1Color = k.rgb(200, 100, 200);
  if (card.result1 === "+health") result1Color = k.rgb(0, 200, 200);
  if (card.result1 === "+hostility" || card.result1 === "-hostility")
    result1Color = k.rgb(200, 100, 0);

  if (card.result2 === "+attack") result2Color = k.rgb(200, 0, 0);
  if (card.result2 === "+defense") result2Color = k.rgb(200, 100, 200);
  if (card.result2 === "+health") result2Color = k.rgb(0, 200, 200);
  if (card.result2 === "+hostility" || card.result2 === "-hostility")
    result2Color = k.rgb(200, 100, 0);

  const skillCardDescriptionFooterResult1 = skillCardDescriptionFooterType.add([
    k.text(`${card.result1}`, {
      size: 14,
      width: 90,
      align: "center",
      transform: {
        color: result1Color,
      },
    }),
    k.fixed(),
    k.opacity(0),
    k.pos(skillCardDescriptionFooterType.width, 0),
  ]);

  const skillCardDescriptionFooterResult2 =
    skillCardDescriptionFooterResult1.add([
      k.text(`${card.result2}`, {
        size: 14,
        width: 90,
        align: "center",
        transform: {
          color: result2Color,
        },
      }),
      k.fixed(),
      k.opacity(0),
      k.pos(skillCardDescriptionFooterResult1.width, 0),
    ]);

  k.onHover("skill-card" + card.cardId, () => {
    if (!isAnimating) {
      k.setCursor("pointer");
      clearTimeout(hoverTimeout);

      if (!card.isClicked) {
        k.tween(
          initialYPos,
          initialYPos - 25,
          0.2,
          (val) => (cardSprite.pos.y = val)
        );

        skillCardDescriptionBox.opacity = 0.7;
        skillCardDescriptionHeader.opacity = 0.7;
        skillCardDescriptionContent.opacity = 0.7;
        skillCardDescriptionFooterType.opacity = 0.7;
        skillCardDescriptionFooterResult1.opacity = 0.7;
        skillCardDescriptionFooterResult2.opacity = 0.7;
      }
    }
  });

  k.onHoverEnd("skill-card" + card.cardId, () => {
    if (!isAnimating) {
      k.setCursor("default");

      if (!card.isClicked) {
        hoverTimeout = setTimeout(() => {
          k.tween(
            cardSprite.pos.y,
            initialYPos,
            0.2,
            (val) => (cardSprite.pos.y = val)
          );
        }, 50);

        skillCardDescriptionBox.opacity = 0;
        skillCardDescriptionHeader.opacity = 0;
        skillCardDescriptionContent.opacity = 0;
        skillCardDescriptionFooterType.opacity = 0;
        skillCardDescriptionFooterResult1.opacity = 0;
        skillCardDescriptionFooterResult2.opacity = 0;
      }
    }
  });

  k.onClick("skill-card" + card.cardId, async () => {
    if (card.isClicked || isAnimating) return;

    currentCognitiveCard = cardSprite;
    playClickSkillCard();

    card.isClicked = true;
    isAnimating = true;
    skillCardDescriptionBox.destroy();
    k.setCursor("default");

    const centerX = (mapWidth - cardWidth * 1.1) / 2;
    const centerY = (mapHeight - 400 * 1.1) / 2;

    k.tween(cardSprite.pos.x, centerX, 0.5, (xPos) => {
      cardSprite.pos.x = xPos;
    });

    k.tween(cardSprite.pos.y, centerY - 200, 0.5, (yPos) => {
      cardSprite.pos.y = yPos;
    });

    k.tween(cardSprite.scale, k.vec2(1.1, 1.1), 0.5, (scale) => {
      cardSprite.scale = scale;
    });

    k.wait(1.2, () => {
      const newPosX = player.pos.x;
      const newPosY = player.pos.y - 200;

      k.tween(cardSprite.pos.x, newPosX, 0.5, (xPos) => {
        cardSprite.pos.x = xPos;
      });

      k.tween(cardSprite.pos.y, newPosY, 0.5, (yPos) => {
        cardSprite.pos.y = yPos;
      });

      k.tween(cardSprite.scale, k.vec2(0.3, 0.3), 0.5, (scale) => {
        cardSprite.scale = scale;
      });

      // Hapus semua card kognitive
      k.wait(0.5, () => removeSpawnCards(k, card.cardId));

      // tambah spawn affective
      k.wait(0.6, () =>
        spawnNewAffectiveCard(
          k,
          map,
          affectiveCards,
          cardX,
          cardY,
          mapWidth,
          mapHeight,
          cardWidth,
          player,
          playerHealthBarFill,
          enemy,
          enemyBeliefBarFill
        )
      );

      isAnimating = false;
    });
  });
};

function enablePlayerActions() {
  // Enable clicking on skill cards
  // Once player selects a card, calculate its effect and end the turn
  onPlayerCardSelect((card) => {
    applyCardEffect(card);
    endTurn();
  });
}

function startTurn() {
  if (currentTurn === "player") {
    // Allow player to choose a skill card
    enablePlayerActions();
  } else {
    // NPC's turn logic
    performNpcTurn();
  }
}

export default async function BattleCard(k) {
  // LOAD MAP
  const map = k.add([k.sprite("battle-card-background")]);

  const mapWidth = map.width;
  const mapHeight = map.height;

  // LOAD PAUSE BUTTON
  const pauseButton = map.add([
    k.sprite("pause-button"),
    k.pos(mapWidth / 2 - 104 / 2, 0),
    k.scale(0.8),
  ]);

  // LOAD PLAYER
  const player = map.add([
    k.sprite("heroes-idle-side"),
    k.pos(150, mapHeight - 470),
    k.scale(5),
  ]);

  // LOAD ENEMY
  const enemy = map.add([
    k.sprite("heroes-idle-side"),
    k.pos(mapWidth - 300, mapHeight - 470),
    k.scale(5),
  ]);
  enemy.flipX = true;

  // RENDER HP BAR
  const playerHealthBarBg = map.add([k.sprite("health-bar-bg"), k.pos(50, 0)]);
  const playerHealthBarFill = playerHealthBarBg.add([
    k.sprite("health-bar-fill"),
    k.pos(playerHealthBarBg.pos.x - 2, playerHealthBarBg.pos.y + 5),
  ]);
  const playerHealthIcon = playerHealthBarBg.add([
    k.sprite("bar-yellow-icon"),
    k.pos(6, playerHealthBarBg.pos.y + 5),
  ]);

  addBoldText(k, player, `${playerName}`, "player", {
    size: 5,
    align: "center",
  });

  const enemyBeliefBarBg = map.add([
    k.sprite("health-bar-bg"),
    k.pos(mapWidth - 700, 0),
  ]);
  const enemyBeliefBarFill = enemyBeliefBarBg.add([
    k.sprite("health-bar-fill"),
    k.pos(enemyBeliefBarBg.width - 695, enemyBeliefBarBg.pos.y + 5),
  ]);
  const enemyHealthIcon = enemyBeliefBarBg.add([
    k.sprite("bar-white-icon"),
    k.pos(enemyBeliefBarBg.width - 70, enemyBeliefBarBg.pos.y + 5),
  ]);

  enemyBeliefBarBg.flipX = true;
  enemyBeliefBarFill.flipX = true;
  enemyHealthIcon.flipX = true;

  addBoldText(k, enemy, `${enemyName}`, "enemy", {
    size: 5,
    align: "center",
  });

  const cardWidth = 250;
  const cardSpacing = 50;
  const totalCardsWidth = (cardWidth + cardSpacing) * 3 - cardSpacing;
  const startX = (mapWidth - totalCardsWidth) / 2;

  cognitiveCards.forEach((card, index) => {
    const cardX = startX + index * (cardWidth + cardSpacing) + 25;
    const cardY = mapHeight - 425;

    spawnNewCognitiveCard(
      k,
      map,
      card,
      cardX,
      cardY,
      mapWidth,
      mapHeight,
      cardWidth,
      player,
      playerHealthBarFill,
      enemy,
      enemyBeliefBarFill
    );
  });
}
