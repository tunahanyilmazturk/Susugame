// Giriş noktası: oyun kurallarını, arayüzü, zamanlayıcıyı ve ayar kaydını birbirine bağlar.
import { createGame, startRound, reshuffle, useHint, guess, pass, timeUp, isFinished } from "./game.js";
import { createUI } from "./ui.js";
import { toDisplay } from "./utils.js";
import { loadSettings, saveSettings } from "./storage.js";
import { sfx, setSoundEnabled } from "./sound.js";

const ui = createUI();
const { el } = ui;
let game = null;
let timerId = null;
let deadline = 0;

// Dokunsal geri bildirim. Desteklemeyen tarayıcılarda sessizce atlanır.
function buzz(pattern) {
  try { navigator.vibrate?.(pattern); } catch { /* desteklenmiyor */ }
}

// ---- Süre ----
function stopTimer() {
  clearInterval(timerId);
  timerId = null;
}

function startTimer() {
  stopTimer();
  lastTickSecond = null;
  if (!game.timeLimit) return ui.setTimer(null);
  deadline = Date.now() + game.timeLimit * 1000;
  tick();
  timerId = setInterval(tick, 250);
}

let lastTickSecond = null;

function tick() {
  if (!game.round || game.round.done) return stopTimer();
  const left = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
  ui.setTimer(left, game.timeLimit);
  if (left > 0 && left <= 5 && left !== lastTickSecond) {
    lastTickSecond = left;
    sfx.tick();
  }
  if (left > 0) return;
  stopTimer();
  sfx.timeout();
  timeUp(game);
  ui.setMessage(`⏰ Süre doldu! Cevap: ${toDisplay(game.round.word)}`, "bad");
  ui.render(game);
  ui.focusNext();
}

// ---- Tur akışı ----
function startGame() {
  const names = ui.readNames();
  const settings = {
    names,
    level: ui.readLevel(),
    rounds: ui.readRounds(),
    time: ui.readTime(),
    sound: ui.readSound(),
  };
  saveSettings(settings);
  setSoundEnabled(settings.sound);
  game = createGame(names, { totalRounds: settings.rounds, level: settings.level, timeLimit: settings.time });
  ui.showGame();
  newRound();
}

function newRound() {
  if (isFinished(game)) {
    stopTimer();
    sfx.end();
    return ui.showEnd(game);
  }
  startRound(game);
  ui.setMessage("Ne buldunuz? Tahmininizi yazın.", "info");
  ui.clearGuess();
  ui.render(game);
  startTimer();
}

function submitGuess() {
  const result = guess(game, ui.readGuess());
  if (result.ignored) return;
  if (result.correct) {
    stopTimer();
    sfx.correct();
    buzz([30, 40, 30]);
    const bonusText = result.bonus ? ` · 🔥 ${result.streak} doğru seri bonusu +${result.bonus}` : "";
    ui.setMessage(`🎉 Doğru! +${result.points} puan${bonusText}`, "ok");
    ui.render(game);
    ui.focusNext();
  } else {
    sfx.wrong();
    buzz(120);
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
  stopTimer();
  sfx.pass();
  pass(game);
  ui.setMessage(`Cevap: ${toDisplay(game.round.word)}`, "info");
  ui.render(game);
  ui.focusNext();
}

function shuffleLetters() {
  reshuffle(game);
  ui.render(game);
}

// ---- Olaylar ----
el.startBtn.addEventListener("click", startGame);
el.guessBtn.addEventListener("click", submitGuess);
el.guess.addEventListener("keydown", (e) => { if (e.key === "Enter") submitGuess(); });
el.hintBtn.addEventListener("click", giveHint);
el.passBtn.addEventListener("click", skip);
el.shuffleBtn.addEventListener("click", shuffleLetters);
el.nextBtn.addEventListener("click", newRound);
el.endBtn.addEventListener("click", () => { stopTimer(); ui.showEnd(game); });
el.restartBtn.addEventListener("click", () => { stopTimer(); ui.showSetup(); });

// Sayfa açılınca önceki ayarları geri yükle
const savedSettings = loadSettings();
ui.applySettings(savedSettings);
setSoundEnabled(ui.readSound());
