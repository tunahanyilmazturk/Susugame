import { test } from "node:test";
import assert from "node:assert/strict";
import { normalize, toDisplay, shuffle, scramble } from "../src/js/utils.js";
import {
  createGame, startRound, guess, pass, useHint, reshuffle, summary, isFinished, wordsForLevel, timeUp,
} from "../src/js/game.js";
import { POINTS } from "../src/js/config.js";
import { WORDS, CATEGORIES } from "../src/js/words.js";

// Sabit rastgelelik: testler her çalıştırmada aynı sonucu verir
const seeded = (seed = 1) => () => {
  seed = (seed * 16807) % 2147483647;
  return seed / 2147483647;
};

// Test kelimeleri: {word, category} biçiminde
const list = (...ws) => ws.map((word) => ({ word, category: "Test" }));

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
  for (const { word: w } of WORDS) {
    const s = scramble(w, seeded(w.length));
    assert.equal([...s].sort().join(""), [...w].sort().join(""));
    if (new Set([...w]).size > 1) assert.notEqual(s, w, `${w} karıştırılmadan kaldı`);
  }
});

test("kelime listesi geçerli: küçük harf, boşluksuz, bilinen kategori, tekrarsız", () => {
  for (const { word, category } of WORDS) {
    assert.equal(word, word.toLocaleLowerCase("tr-TR"), `${word} küçük harf değil`);
    assert.doesNotMatch(word, /\s/, `${word} boşluk içeriyor`);
    assert.ok(CATEGORIES.includes(category), `${word} bilinmeyen kategori: ${category}`);
  }
  const words = WORDS.map((e) => e.word);
  assert.equal(new Set(words).size, words.length, "tekrar eden kelime var");
});

test("zorluk seviyeleri harf sayısına göre süzer", () => {
  const sample = [
    { word: "kuş", category: "Hayvan" },            // 3
    { word: "kalemtıraş", category: "Eşya" },        // 9
    { word: "kitap", category: "Eşya" },             // 5
    { word: "telefon", category: "Eşya" },           // 7
    { word: "bahçe", category: "Ev" },               // 5
    { word: "gökkuşağı", category: "Doğa" },         // 9
  ];
  const lens = (level) => wordsForLevel(sample, level).map((e) => e.word);
  assert.deepEqual(lens("kolay"), ["kuş", "kitap", "bahçe"]);
  assert.deepEqual(lens("orta"), ["telefon"]);
  assert.deepEqual(lens("zor"), ["kalemtıraş", "gökkuşağı"]);
  assert.equal(lens("karma").length, sample.length);
  assert.equal(wordsForLevel(sample, "bilinmeyen").length, sample.length, "bilinmeyen seviye karma sayılmalı");
});

test("her zorluk seviyesinde yeterince kelime var", () => {
  for (const level of ["kolay", "orta", "zor", "karma"]) {
    const n = wordsForLevel(WORDS, level).length;
    assert.ok(n >= 30, `${level} seviyesinde yalnızca ${n} kelime var`);
  }
});

test("createGame boş isme varsayılan atar ve tur sayısını alır", () => {
  const g = createGame(["  ", "Ayşe"], { totalRounds: 5 });
  assert.equal(g.players[0].name, "Oyuncu 1");
  assert.equal(g.players[1].name, "Ayşe");
  assert.equal(g.totalRounds, 5);
});

test("tur kategoriyi taşır", () => {
  const g = createGame(["A", "B"], { words: [{ word: "elma", category: "Yiyecek & İçecek" }], rng: seeded(2) });
  startRound(g);
  assert.equal(g.round.category, "Yiyecek & İçecek");
});

test("doğru tahmin tam puan verir ve sırayı değiştirir", () => {
  const g = createGame(["A", "B"], { words: list("çiçek"), rng: seeded(2) });
  startRound(g);
  const r = guess(g, "CICEK");
  assert.equal(r.correct, true);
  assert.equal(r.points, POINTS.correct);
  assert.equal(g.players[0].score, POINTS.correct);
  assert.equal(g.turn, 1);
});

test("ipucu kullanılınca daha az puan verilir", () => {
  const g = createGame(["A", "B"], { words: list("elma"), rng: seeded(2) });
  startRound(g);
  useHint(g);
  assert.equal(guess(g, "elma").points, POINTS.hinted);
});

test("ipucu tur başına bir kez kullanılır ve yanlış tahmin puan vermez", () => {
  const g = createGame(["A", "B"], { words: list("elma"), rng: seeded(2) });
  startRound(g);
  useHint(g);
  useHint(g);
  assert.equal(g.round.hinted, true);
  assert.equal(guess(g, "kalem").correct, false);
  assert.equal(g.turn, 0, "yanlış tahminde sıra değişmemeli");
});

test("pas puan vermez ama sırayı değiştirir", () => {
  const g = createGame(["A", "B"], { words: list("elma"), rng: seeded(2) });
  startRound(g);
  pass(g);
  assert.equal(g.round.result, "passed");
  assert.equal(g.players.every((p) => p.score === 0), true);
  assert.equal(g.turn, 1);
});

test("bitmiş turda tahmin ve ipucu yok sayılır", () => {
  const g = createGame(["A", "B"], { words: list("elma"), rng: seeded(2) });
  startRound(g);
  pass(g);
  assert.equal(guess(g, "elma").ignored, true);
  useHint(g);
  assert.equal(g.round.hinted, false);
});

test("reshuffle puanı etkilemez ve kelimeyi korur", () => {
  const g = createGame(["A", "B"], { words: list("kitap"), rng: seeded(9) });
  startRound(g);
  reshuffle(g);
  assert.equal([...g.round.scrambled].sort().join(""), [..."kitap"].sort().join(""));
  assert.equal(g.players[0].score, 0);
});

test("her tur farklı kelime gelir (havuz tükenene kadar)", () => {
  const g = createGame(["A", "B"], { words: list("a1", "b2", "c3"), rng: seeded(5) });
  const seen = new Set();
  for (let i = 0; i < 3; i++) {
    startRound(g);
    seen.add(g.round.word);
  }
  assert.equal(seen.size, 3);
});

test("isFinished: sonlu modda son tur bitince true, sınırsız modda hiç", () => {
  const g = createGame(["A", "B"], { words: list("elma", "kitap"), rng: seeded(4), totalRounds: 2 });
  startRound(g);
  assert.equal(isFinished(g), false, "tur bitmeden bitmiş sayılmamalı");
  pass(g);
  startRound(g);
  assert.equal(isFinished(g), false, "son tur bitmeden bitmiş sayılmamalı");
  pass(g);
  assert.equal(isFinished(g), true);

  const endless = createGame(["A", "B"], { words: list("elma"), rng: seeded(4), totalRounds: 0 });
  for (let i = 0; i < 5; i++) { startRound(endless); pass(endless); }
  assert.equal(isFinished(endless), false);
});

test("timeUp turu puansız kapatır ve sırayı değiştirir", () => {
  const g = createGame(["A", "B"], { words: list("elma"), rng: seeded(2), timeLimit: 30 });
  assert.equal(g.timeLimit, 30);
  startRound(g);
  timeUp(g);
  assert.equal(g.round.result, "timeout");
  assert.equal(g.players.every((p) => p.score === 0), true);
  assert.equal(g.turn, 1);
  timeUp(g); // bitmiş tur ikinci kez kapanmaz
  assert.equal(g.turn, 1);
});

test("summary kazananı, eşitliği ve tur sayısını doğru bulur", () => {
  const g = createGame(["A", "B", "C"]);
  g.players[0].score = 10;
  g.players[1].score = 25;
  g.players[2].score = 5;
  g.roundCount = 4;
  const s = summary(g);
  assert.equal(s.winner.name, "B");
  assert.equal(s.rounds, 4);
  g.players[0].score = 25;
  assert.equal(summary(g).winner, null);
});
