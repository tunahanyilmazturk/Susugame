import { test } from "node:test";
import assert from "node:assert/strict";
import { normalize, toDisplay, shuffle, scramble } from "../src/js/utils.js";
import { createGame, startRound, guess, pass, useHint, reshuffle, summary } from "../src/js/game.js";
import { POINTS } from "../src/js/config.js";
import { WORDS } from "../src/js/words.js";

// Sabit rastgelelik: testler her çalıştırmada aynı sonucu verir
const seeded = (seed = 1) => () => {
  seed = (seed * 16807) % 2147483647;
  return seed / 2147483647;
};

test("normalize Türkçe karakterleri sadeleştirir ve büyük harfi kabul eder", () => {
  assert.equal(normalize("ÇİÇEK"), "cicek");
  assert.equal(normalize("  Güneş "), "gunes");
  assert.equal(normalize("ışık"), "isik");
});

test("toDisplay Türkçe büyük harf üretir", () => {
  assert.equal(toDisplay("ilk"), "İLK");
  assert.equal(toDisplay("ışık"), "IŞIK");
});

test("shuffle aynı harfleri korur", () => {
  const out = shuffle([..."kitap"], seeded(3));
  assert.deepEqual([...out].sort(), [..."kitap"].sort());
});

test("scramble asıl kelimeye eşit olmaz (harfleri farklı olan kelimelerde)", () => {
  for (const w of WORDS) {
    const s = scramble(w, seeded(w.length));
    assert.equal([...s].sort().join(""), [...w].sort().join(""));
    if (new Set([...w]).size > 1) assert.notEqual(s, w, `${w} karıştırılmadan kaldı`);
  }
});

test("tüm kelime listesi geçerli: küçük harf ve boşluksuz", () => {
  for (const w of WORDS) {
    assert.equal(w, w.toLocaleLowerCase("tr-TR"), `${w} küçük harf değil`);
    assert.doesNotMatch(w, /\s/, `${w} boşluk içeriyor`);
  }
  assert.equal(new Set(WORDS).size, WORDS.length, "tekrar eden kelime var");
});

test("createGame boş isme varsayılan atar", () => {
  const g = createGame(["  ", "Ayşe"]);
  assert.equal(g.players[0].name, "Oyuncu 1");
  assert.equal(g.players[1].name, "Ayşe");
});

test("doğru tahmin tam puan verir ve sırayı değiştirir", () => {
  const g = createGame(["A", "B"], { words: ["çiçek"], rng: seeded(2) });
  startRound(g);
  const r = guess(g, "CICEK");
  assert.equal(r.correct, true);
  assert.equal(r.points, POINTS.correct);
  assert.equal(g.players[0].score, POINTS.correct);
  assert.equal(g.turn, 1);
});

test("ipucu kullanılınca daha az puan verilir", () => {
  const g = createGame(["A", "B"], { words: ["elma"], rng: seeded(2) });
  startRound(g);
  useHint(g);
  assert.equal(guess(g, "elma").points, POINTS.hinted);
});

test("ipucu tur başına bir kez kullanılır ve yanlış tahmin puan vermez", () => {
  const g = createGame(["A", "B"], { words: ["elma"], rng: seeded(2) });
  startRound(g);
  useHint(g);
  useHint(g);
  assert.equal(g.round.hinted, true);
  assert.equal(guess(g, "kalem").correct, false);
  assert.equal(g.turn, 0, "yanlış tahminde sıra değişmemeli");
});

test("pas puan vermez ama sırayı değiştirir", () => {
  const g = createGame(["A", "B"], { words: ["elma"], rng: seeded(2) });
  startRound(g);
  pass(g);
  assert.equal(g.round.result, "passed");
  assert.equal(g.players.every((p) => p.score === 0), true);
  assert.equal(g.turn, 1);
});

test("bitmiş turda tahmin ve ipucu yok sayılır", () => {
  const g = createGame(["A", "B"], { words: ["elma"], rng: seeded(2) });
  startRound(g);
  pass(g);
  assert.equal(guess(g, "elma").ignored, true);
  useHint(g);
  assert.equal(g.round.hinted, false);
});

test("reshuffle puanı etkilemez ve kelimeyi korur", () => {
  const g = createGame(["A", "B"], { words: ["kitap"], rng: seeded(9) });
  startRound(g);
  reshuffle(g);
  assert.equal([...g.round.scrambled].sort().join(""), [..."kitap"].sort().join(""));
  assert.equal(g.players[0].score, 0);
});

test("her tur farklı kelime gelir (havuz tükenene kadar)", () => {
  const words = ["a1", "b2", "c3"];
  const g = createGame(["A", "B"], { words, rng: seeded(5) });
  const seen = new Set();
  for (let i = 0; i < words.length; i++) {
    startRound(g);
    seen.add(g.round.word);
  }
  assert.equal(seen.size, words.length);
});

test("summary kazananı ve eşitliği doğru bulur", () => {
  const g = createGame(["A", "B", "C"]);
  g.players[0].score = 10;
  g.players[1].score = 25;
  g.players[2].score = 5;
  assert.equal(summary(g).winner.name, "B");
  g.players[0].score = 25;
  assert.equal(summary(g).winner, null);
});
