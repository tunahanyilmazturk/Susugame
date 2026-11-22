// DOM katmanı. Oyun durumunu okur ve ekrana çizer; kural içermez.
import { toDisplay } from "./utils.js";
import { HINT_PENALTY } from "./config.js";
import { summary } from "./game.js";

const $ = (id) => document.getElementById(id);

export function createUI() {
  const el = {
    app: $("app"),
    setup: $("setup"),
    game: $("game"),
    endPanel: $("endPanel"),
    p1: $("p1"),
    p2: $("p2"),
    startBtn: $("startBtn"),
    scores: $("scores"),
    roundInfo: $("roundInfo"),
    tiles: $("tiles"),
    msg: $("msg"),
    guess: $("guess"),
    guessBtn: $("guessBtn"),
    guessRow: $("guessRow"),
    actions: $("actions"),
    shuffleBtn: $("shuffleBtn"),
    hintBtn: $("hintBtn"),
    passBtn: $("passBtn"),
    nextRow: $("nextRow"),
    nextBtn: $("nextBtn"),
    endBtn: $("endBtn"),
    restartBtn: $("restartBtn"),
    finalText: $("finalText"),
  };

  function setMessage(text, cls = "info") {
    el.msg.textContent = text;
    el.msg.className = "msg " + cls;
  }

  function shake() {
    el.app.classList.remove("shake");
    void el.app.offsetWidth; // animasyonu yeniden başlat
    el.app.classList.add("shake");
  }

  function renderScores(game) {
    el.scores.innerHTML = "";
    game.players.forEach((p, i) => {
      const box = document.createElement("div");
      box.className = "score" + (i === game.turn ? " turn" : "");
      box.innerHTML = `<div class="n"></div><div class="p"></div>`;
      box.querySelector(".n").textContent = p.name;
      box.querySelector(".p").textContent = p.score;
      el.scores.appendChild(box);
    });
  }

  function renderTiles(round) {
    el.tiles.innerHTML = "";
    if (round.hinted && !round.done) {
      const h = document.createElement("div");
      h.className = "tile hint";
      h.title = `İpucu (-${HINT_PENALTY} puan)`;
      h.textContent = toDisplay(round.word[0]);
      el.tiles.appendChild(h);
    }
    const shown = round.done ? round.word : round.scrambled;
    [...shown].forEach((ch, i) => {
      const t = document.createElement("div");
      t.className = "tile" + (round.done ? " reveal" : "");
      t.style.animationDelay = i * 40 + "ms";
      t.textContent = toDisplay(ch);
      el.tiles.appendChild(t);
    });
  }

  /** Oyun durumunu ekrana yansıtır. */
  function render(game) {
    const round = game.round;
    renderScores(game);
    el.roundInfo.textContent =
      `Tur ${game.roundCount} · ${[...round.word].length} harfli · Sıra: ${game.players[game.turn].name}`;
    renderTiles(round);

    el.guessRow.classList.toggle("hidden", round.done);
    el.actions.classList.toggle("hidden", round.done);
    el.nextRow.classList.toggle("hidden", !round.done);
    el.hintBtn.disabled = round.hinted;
  }

  function showSetup() {
    el.game.classList.add("hidden");
    el.endPanel.classList.add("hidden");
    el.setup.classList.remove("hidden");
  }

  function showGame() {
    el.setup.classList.add("hidden");
    el.endPanel.classList.add("hidden");
    el.game.classList.remove("hidden");
  }

  function showEnd(game) {
    const { players, winner } = summary(game);
    const scoreLine = players.map((p) => `${p.name}: ${p.score}`).join("  ·  ");
    const result = winner ? `${winner.name} kazandı!` : "Berabere!";
    el.finalText.textContent = `${scoreLine}  —  ${result}`;
    el.game.classList.add("hidden");
    el.endPanel.classList.remove("hidden");
  }

  return {
    el,
    setMessage,
    shake,
    render,
    showSetup,
    showGame,
    showEnd,
    readNames: () => [el.p1.value, el.p2.value],
    readGuess: () => el.guess.value,
    clearGuess: () => { el.guess.value = ""; el.guess.focus(); },
    selectGuess: () => el.guess.select(),
    focusNext: () => el.nextBtn.focus(),
  };
}
