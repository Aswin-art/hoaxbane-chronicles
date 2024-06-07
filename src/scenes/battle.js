import { colorizeBackground } from "../../utils.js";
import { generatePlayerComponents } from "../components/player.js";
import { gameState, playerState } from "../states/index.js";

const correctSound = new Audio("correct.mp3");
const wrongSound = new Audio("wrong.mp3");
const hitSound = new Audio("hit.mp3");

const playerMaxHealth = playerState.getMaxHealth();
const playerHealth = playerState.getHealth();

export default async function battle(k) {
  colorizeBackground(k, 27, 29, 52);

  const map = k.add([
    k.sprite("battle-background"),
    k.scale(1.5),
    k.pos(170, 50),
  ]);

  const enemyMon = k.add([
    k.sprite("assets", {
      anim: "slime-idle-down",
    }),
    k.scale(8),
    k.pos(1000, 200),
    k.opacity(1),
    {
      fainted: false,
    },
  ]);
  enemyMon.flipX = true;

  k.tween(
    enemyMon.pos.x,
    1400,
    0.3,
    (val) => (enemyMon.pos.x = val),
    k.easings.easeInSine
  );

  const playerMon = map.add([
    k.sprite("assets", {
      anim: "player-idle-up",
    }),
    k.scale(8),
    k.pos(450, 250),
    k.opacity(1),
    {
      fainted: false,
    },
  ]);

  k.tween(
    playerMon.pos.x,
    300,
    0.3,
    (val) => (playerMon.pos.x = val),
    k.easings.easeInSine
  );

  const playerMonHealthBox = k.add([
    k.rect(400, 100),
    k.outline(4),
    k.pos(400, 500),
  ]);

  playerMonHealthBox.add([
    k.text("PLAYER", { size: 32, width: 380 }),
    k.color(10, 10, 10),
    k.pos(10, 10),
  ]);

  playerMonHealthBox.add([
    k.rect(370, 10),
    k.color(200, 200, 200),
    k.pos(15, 50),
  ]);

  const playerMonHealthBar = playerMonHealthBox.add([
    k.rect((playerHealth / playerMaxHealth) * 370, 10),
    k.color(0, 200, 0),
    k.pos(15, 50),
    k.fixed(),
  ]);

  k.tween(
    playerMonHealthBox.pos.x,
    1200,
    0.3,
    (val) => (playerMonHealthBox.pos.x = val),
    k.easings.easeInSine
  );

  const enemyMonHealthBox = k.add([
    k.rect(400, 100),
    k.outline(4),
    k.pos(-100, 100),
  ]);

  enemyMonHealthBox.add([
    k.text("MONSTER", { size: 32, width: 380 }),
    k.color(10, 10, 10),
    k.pos(10, 10),
  ]);

  enemyMonHealthBox.add([
    k.rect(370, 10),
    k.color(200, 200, 200),
    k.pos(15, 50),
  ]);

  const enemyMonHealthBar = enemyMonHealthBox.add([
    k.rect(370, 10),
    k.color(0, 200, 0),
    k.pos(15, 50),
  ]);

  k.tween(
    enemyMonHealthBox.pos.x,
    250,
    0.3,
    (val) => (enemyMonHealthBox.pos.x = val),
    k.easings.easeInSine
  );

  const box = k.add([k.rect(1300, 300), k.outline(4), k.pos(300, 650)]);

  const content = box.add([
    k.text(
      "Kalahkan monster dengan memilih jawaban yang tepat! Tekan 'Enter' untuk memulai dan tekan 'Spasi' untuk menjawab.",
      { size: 32, width: 1260 }
    ),
    k.color(10, 10, 10),
    k.pos(20, 20),
  ]);

  const timerContainer = k.add([k.rect(1535, 30), k.pos(170, 5), k.outline(2)]);
  const timerBar = timerContainer.add([k.rect(1535, 30), k.color(0, 200, 0)]);
  const timerText = timerContainer.add([
    k.text(`Time: 30`, { size: 24 }),
    k.color(10, 10, 10),
    k.pos(750, 5),
  ]);

  const questions = [
    {
      question: "Apa ibu kota Indonesia?",
      answers: ["Jakarta", "Bandung", "Surabaya", "Medan"],
      correct: 0,
    },
    {
      question: "Berapa jumlah provinsi di Indonesia?",
      answers: ["33", "34", "35", "36"],
      correct: 1,
    },
  ];

  let currentQuestionIndex = 0;
  let selectedAnswerIndex = 0;
  let phase = "intro";
  let answerElements = [];
  let timer = 30;
  let timerInterval;

  function startTimer() {
    timer = 30;
    timerText.text = `Time: ${timer}`;
    timerBar.width = 1535;

    timerInterval = setInterval(() => {
      if (phase !== "question") {
        clearInterval(timerInterval);
        return;
      }
      timer--;
      timerText.text = `Time: ${timer}`;
      timerBar.width = (timer / 30) * 1535;
      if (timer <= 0) {
        clearInterval(timerInterval);
        handleIncorrectAnswer();
      }
    }, 1000);
  }

  function displayQuestion() {
    if (phase === "end") return;
    const question = questions[currentQuestionIndex];
    content.text = question.question;

    answerElements.forEach((element) => element.destroy());
    answerElements = [];

    question.answers.forEach((answer, index) => {
      const answerElement = box.add([
        k.text(answer, { size: 32, width: 1260 }),
        k.color(index === selectedAnswerIndex ? 255 : 10, 10, 10),
        k.pos(20, 80 + index * 40),
        { tag: "answers" },
      ]);
      answerElements.push(answerElement);
    });
  }

  function reducePlayerHealth(healthBar, damageDealt, mon) {
    const playerMaxHealth = playerState.getMaxHealth();
    let playerHealth = playerState.getHealth();
    playerHealth -= damageDealt;
    playerState.setHealth(playerHealth);

    const healthPercentage = playerHealth / playerMaxHealth;
    const newWidth = healthPercentage * 370;

    k.tween(
      healthBar.width,
      newWidth,
      0.5,
      (val) => (healthBar.width = val),
      k.easings.easeInSine
    ).then(() => {
      makeMonFlash(mon);
    });
  }

  function reduceMonsterHealth(enemyMonHealthBar, damageDealt, enemyMon) {
    k.tween(
      enemyMonHealthBar.width,
      enemyMonHealthBar.width - damageDealt,
      0.5,
      (val) => (enemyMonHealthBar.width = val),
      k.easings.easeInSine
    ).then(() => {
      makeMonFlash(enemyMon);
    });
  }

  function makeMonFlash(mon) {
    k.tween(
      mon.opacity,
      0,
      0.3,
      (val) => {
        mon.opacity = val;
        if (mon.opacity === 0) {
          mon.opacity = 1;
        }
      },
      k.easings.easeInBounce
    );
  }

  function colorizeHealthBar(healthBar) {
    if (healthBar.width < 200) {
      healthBar.use(k.color(250, 150, 0));
    }

    if (healthBar.width < 100) {
      healthBar.use(k.color(200, 0, 0));
    }
  }

  function makeMonDrop(mon) {
    k.tween(
      mon.pos.y,
      800,
      0.5,
      (val) => (mon.pos.y = val),
      k.easings.easeInSine
    );
  }

  function handleCorrectAnswer() {
    content.text = "Jawaban benar!";
    const timeBonus = timer > 20 ? 2 : 1;
    const baseHit = 100;
    const hit = baseHit * timeBonus;
    const criticalChance = timer > 20 ? Math.random() : 0;
    const damageDealt = criticalChance > 0.8 ? hit * 2 : hit;
    reduceMonsterHealth(enemyMonHealthBar, damageDealt, enemyMon);
    // correctSound.play();
    nextQuestion();
  }

  function handleIncorrectAnswer() {
    content.text = "Jawaban salah!";
    const baseHit = 20;
    reducePlayerHealth(playerMonHealthBar, baseHit, playerMon);
    // wrongSound.play();
    nextQuestion();
  }

  function nextQuestion() {
    clearInterval(timerInterval);
    if (phase === "end") {
      answerElements.forEach((element) => element.destroy());
      k.destroyAll("answers");
      content.text =
        "Pertandingan berakhir. Tekan Enter untuk kembali ke dunia.";
      k.onKeyPress("enter", () => {
        k.go(gameState.getPreviousScene());
      });
      return;
    }

    currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
    phase = "answer";

    setTimeout(() => {
      if (phase !== "end") {
        phase = "question";
        displayQuestion();
        startTimer();
      }
    }, 2000);
  }

  function showGameOverModal(text) {
    const modal = k.add([
      k.rect(600, 300),
      k.pos(k.width() / 2 - 300, k.height() / 2 - 150),
      k.color(0, 0, 0),
      k.opacity(0.8),
      k.fixed(),
      "gameOverModal",
    ]);

    modal.add([
      k.text(text, { size: 32, width: 580, align: "center" }),
      k.color(255, 255, 255),
      k.pos(20, 100),
      k.fixed(),
    ]);

    modal.add([
      k.text("Tekan 'Enter' untuk kembali!", {
        size: 32,
        width: 580,
        align: "center",
      }),
      k.color(255, 255, 255),
      k.pos(20, 200),
      k.fixed(),
    ]);
  }

  k.onKeyPress("enter", () => {
    if (phase === "intro") {
      phase = "question";
      displayQuestion();
      startTimer();
    }

    if (phase === "end") {
      gameState.setFreezePlayer(false);
      k.go(gameState.getPreviousScene());
    }
  });

  k.onKeyPress("up", () => {
    if (phase !== "question") return;
    selectedAnswerIndex =
      (selectedAnswerIndex -
        1 +
        questions[currentQuestionIndex].answers.length) %
      questions[currentQuestionIndex].answers.length;
    displayQuestion();
  });

  k.onKeyPress("down", () => {
    if (phase !== "question") return;
    selectedAnswerIndex =
      (selectedAnswerIndex + 1) %
      questions[currentQuestionIndex].answers.length;
    displayQuestion();
  });

  k.onKeyPress("space", () => {
    if (phase !== "question") return;

    if (selectedAnswerIndex === questions[currentQuestionIndex].correct) {
      handleCorrectAnswer();
    } else {
      handleIncorrectAnswer();
    }
  });

  k.onUpdate(() => {
    colorizeHealthBar(playerMonHealthBar);
    colorizeHealthBar(enemyMonHealthBar);

    if (enemyMonHealthBar.width <= 0 && !enemyMon.fainted) {
      if (gameState.getPreviousScene() == "hutanKiri") {
        gameState.setMonster1Defeated(true);
      }
      if (gameState.getPreviousScene() == "hutanAtas") {
        gameState.setMonster2Defeated(true);
      }
      if (gameState.getPreviousScene() == "hutanBawah") {
        gameState.setMonster3Defeated(true);
      }
      if (gameState.getPreviousScene() == "bos") {
        gameState.setBossDefeated(true);
      }
      makeMonDrop(enemyMon);
      showGameOverModal("Monster kalah! Kamu memenangkan pertandingan!");
      enemyMon.fainted = true;
      playerState.setCoin(20);
      phase = "end";
      k.destroyAll("answers");
    }

    if (playerState.getHealth() <= 0 && !playerMon.fainted) {
      makeMonDrop(playerMon);
      showGameOverModal("Kamu kalah! Jawab pertanyaan dengan benar!");
      playerMon.fainted = true;
      phase = "end";
      k.destroyAll("answers");
    }
  });
}
