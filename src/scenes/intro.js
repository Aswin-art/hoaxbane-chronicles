import { playBackgroundMusic } from "../components/backgroundMusic.js";
import { gameState } from "../states/index.js";

export default function intro(k) {
  const video = document.createElement("video");
  video.src = "/assets/video/intro-video.mp4";
  video.autoplay = true;
  video.loop = false;
  video.style.position = "fixed";
  video.style.top = "0";
  video.style.left = "0";
  video.style.width = "100vw";
  video.style.height = "100vh";
  video.style.objectFit = "cover";
  video.style.zIndex = "10";

  document.body.appendChild(video);

  video.onended = () => {
    document.body.removeChild(video);
    gameState.setSoundTheme("explore");
    playBackgroundMusic();
    k.go("halaman");
  };
}
