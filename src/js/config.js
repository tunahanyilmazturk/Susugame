// Oyun ayarları. Puan kurallarını ve sabitleri burada değiştirin.

export const POINTS = {
  correct: 10, // ipucu kullanılmadan doğru bilinince
  hinted: 5,   // ipucu kullanılıp doğru bilinince
};

export const HINT_PENALTY = POINTS.correct - POINTS.hinted;

// Karıştırma, kelimeyi kendisine eşit bırakırsa en fazla bu kadar denenir
export const MAX_SHUFFLE_TRIES = 30;

export const DEFAULT_NAMES = ["Oyuncu 1", "Oyuncu 2"];

// Zorluk seviyeleri: kelimenin harf sayısına göre filtre (min ve max dahil).
// "karma" tüm kelimeleri kullanır.
export const LEVELS = {
  kolay: { label: "Kolay", min: 0, max: 5 },
  orta: { label: "Orta", min: 6, max: 7 },
  zor: { label: "Zor", min: 8, max: Infinity },
  karma: { label: "Karışık", min: 0, max: Infinity },
};
export const DEFAULT_LEVEL = "karma";

// Tur süresi seçenekleri (saniye). 0 = süre yok.
export const TIME_OPTIONS = [0, 30, 60];
export const DEFAULT_TIME = 0;

// Kurulumda seçilebilecek tur sayıları. 0 = sınırsız.
export const ROUND_OPTIONS = [5, 10, 15, 0];
export const DEFAULT_ROUNDS = 10;
