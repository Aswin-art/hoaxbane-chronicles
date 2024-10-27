import { colorizeBackground } from "../../utils.js";

export default function menu(k) {
  colorizeBackground(k, 0, 0, 0);

  k.add([
    k.text("HoaxBane Chronicle", { size: 32, font: "gameboy" }),
    k.area(),
    k.anchor("center"),
    k.pos(k.center().x, k.center().y - 100),
  ]);

  k.add([
    k.text("Chapter 1: The Canonical Chronicles", {
      size: 12,
      font: "gameboy",
    }),
    k.area(),
    k.anchor("center"),
    k.pos(k.center().x, k.center().y + 100),
  ]);

  k.add([
    k.text("Tekan 'Enter' untuk memulai permainan", {
      size: 24,
      font: "gameboy",
    }),
    k.area(),
    k.anchor("center"),
    k.pos(k.center().x, k.center().y + 200),
  ]);

  k.onKeyPress("enter", () => {
    k.go("intro");
  });
}
