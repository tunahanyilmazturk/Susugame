// Giriş noktası: oyun kurallarını ve arayüzü birbirine bağlar.
import { createGame, startRound, reshuffle, useHint, guess, pass, isFinished } from "./game.js";
import { createUI } from "./ui.js";
import { toDisplay } from "./utils.js";

const ui = createUI();
const { el } = ui;
let game = null;

function startGame() {
  game = createGame(ui.readNames(), { totalRounds: ui.readRounds() });
  ui.showGame();
  newRound();
}

function newRound() {
  if (isFinished(game)) return ui.showEnd(game);
  startRound(game);
  ui.setMessage("Ne buldunuz? Tahmininizi yazın.", "info");
  ui.clearGuess();
  ui.render(game);
}

function submitGuess() {
  const result = guess(game, ui.readGuess());
  if (result.ignored) return;
  if (result.correct) {
    ui.setMessage(`🎉 Doğru! +${result.points} puan`, "ok");
    ui.render(game);
    ui.focusNext();
  } else {
    ui.setMessage("❌ Olmadı, tekrar deneyin!", "bad");
    ui.shake();
    ui.selectGuess();
  }
}

function giveHint() {
  if (!game.round || game.round.done || game.round.hinted) return;
  useHint(game);
  ui.setMessage("İpucu verildi. Doğru bulursanız daha az puan alırsınız.", "info");
  ui.render(game);
}

function skip() {
  if (!game.round || game.round.done) return;
  pass(game);
  ui.setMessage(`Cevap: ${toDisplay(game.round.word)}`, "info");
  ui.render(game);
  ui.focusNext();
}

function shuffleLetters() {
  reshuffle(game);
  ui.render(game);
}

el.startBtn.addEventListener("click", startGame);
el.guessBtn.addEventListener("click", submitGuess);
el.guess.addEventListener("keydown", (e) => { if (e.key === "Enter") submitGuess(); });
el.hintBtn.addEventListener("click", giveHint);
el.passBtn.addEventListener("click", skip);
el.shuffleBtn.addEventListener("click", shuffleLetters);
el.nextBtn.addEventListener("click", newRound);
el.endBtn.addEventListener("click", () => ui.showEnd(game));
el.restartBtn.addEventListener("click", ui.showSetup);
