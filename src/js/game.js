// Oyun kuralları. DOM bilmez; yalnızca durumu (state) değiştirir.
import { WORDS } from "./words.js";
import { POINTS, DEFAULT_NAMES, DEFAULT_ROUNDS, DEFAULT_LEVEL, LEVELS } from "./config.js";
import { normalize, scramble, shuffle } from "./utils.js";

/** Kelimeleri seçilen zorluk seviyesine göre süzer. */
export function wordsForLevel(words, level = DEFAULT_LEVEL) {
  const { min, max } = LEVELS[level] ?? LEVELS[DEFAULT_LEVEL];
  return words.filter(({ word }) => {
    const n = [...word].length;
    return n >= min && n <= max;
  });
}

/**
 * @param {string[]} names  Oyuncu isimleri (boş olanlara varsayılan atanır)
 * @param {{ words?: {word: string, category: string}[], rng?: () => number, totalRounds?: number, level?: string }} [options]
 *   totalRounds: 0 ise sınırsız. level: "kolay" | "orta" | "zor" | "karma"
 */
export function createGame(names = DEFAULT_NAMES, options = {}) {
  return {
    words: wordsForLevel(options.words ?? WORDS, options.level),
    level: options.level ?? DEFAULT_LEVEL,
    rng: options.rng ?? Math.random,
    totalRounds: options.totalRounds ?? DEFAULT_ROUNDS,
    players: names.map((name, i) => ({
      name: (name || "").trim() || DEFAULT_NAMES[i] || `Oyuncu ${i + 1}`,
      score: 0,
    })),
    turn: 0,
    roundCount: 0,
    round: null,
    pool: [],
  };
}

function nextEntry(game) {
  if (game.pool.length === 0) game.pool = shuffle(game.words, game.rng);
  return game.pool.pop();
}

function nextTurn(game) {
  game.turn = (game.turn + 1) % game.players.length;
}

/** Yeni tur başlatır. */
export function startRound(game) {
  const { word, category } = nextEntry(game);
  game.round = {
    word,
    category,
    scrambled: scramble(word, game.rng),
    hinted: false,
    done: false,
    result: null, // "solved" | "passed"
    solvedBy: null,
  };
  game.roundCount++;
  return game;
}

/** Oyun bitti mi? Sınırsız modda hiç bitmez. */
export function isFinished(game) {
  return game.totalRounds > 0 && game.roundCount >= game.totalRounds && !!game.round?.done;
}

/** Harfleri ücretsiz yeniden karıştırır. */
export function reshuffle(game) {
  const r = game.round;
  if (!r || r.done) return game;
  r.scrambled = scramble(r.word, game.rng);
  return game;
}

/** İlk harfi gösterir. Turda bir kez kullanılabilir. */
export function useHint(game) {
  const r = game.round;
  if (!r || r.done || r.hinted) return game;
  r.hinted = true;
  return game;
}

/**
 * Tahmini değerlendirir. Doğruysa puanı verir ve sırayı değiştirir.
 * @returns {{ correct: boolean, ignored?: boolean, points?: number }}
 */
export function guess(game, value) {
  const r = game.round;
  if (!r || r.done || !value.trim()) return { correct: false, ignored: true };
  if (normalize(value) !== normalize(r.word)) return { correct: false };

  const points = r.hinted ? POINTS.hinted : POINTS.correct;
  game.players[game.turn].score += points;
  r.done = true;
  r.result = "solved";
  r.solvedBy = game.turn;
  nextTurn(game);
  return { correct: true, points };
}

/** Turu pas geçer: puan verilmez, sıra değişir. */
export function pass(game) {
  const r = game.round;
  if (!r || r.done) return game;
  r.done = true;
  r.result = "passed";
  nextTurn(game);
  return game;
}

/** Oyun sonu özeti. Eşitlikte winner null olur. */
export function summary(game) {
  const sorted = [...game.players].sort((a, b) => b.score - a.score);
  const top = sorted[0];
  const tied = sorted.length > 1 && sorted[1].score === top.score;
  return { players: game.players, winner: tied ? null : top, rounds: game.roundCount };
}
