import { gameState } from "./index.js";

async function displayLine(textContainer, line) {
  for (const char of line) {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        textContainer.text += char;
        resolve();
      }, 30);
    });
  }
}

export async function dialogue(k, pos, content) {
  gameState.setFreezePlayer(true);
  const dialogBox = k.add([k.rect(800, 200), k.pos(pos), k.fixed()]);
  const textContainer = dialogBox.add([
    k.text("", {
      font: "gameboy",
      width: 750,
      lineSpacing: 15,
      size: gameState.getFontSize(),
    }),
    k.color(27, 29, 52),
    k.pos(20, 40),
    k.fixed(),
  ]);

  let index = 0;

  await displayLine(textContainer, content[index]);
  let lineFinishedDisplayed = true;

  const dialogKey = k.onKeyPress("space", async () => {
    if (!lineFinishedDisplayed) return;

    index++;
    if (!content[index]) {
      k.destroy(dialogBox);
      dialogKey.cancel();
      gameState.setFreezePlayer(false);
      return;
    }

    textContainer.text = "";
    lineFinishedDisplayed = false;
    await displayLine(textContainer, content[index]);
    lineFinishedDisplayed = true;
  });
}
