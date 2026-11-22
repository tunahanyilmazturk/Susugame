// Oyun ayarları. Puan kurallarını ve sabitleri burada değiştirin.

export const POINTS = {
  correct: 10, // ipucu kullanılmadan doğru bilinince
  hinted: 5,   // ipucu kullanılıp doğru bilinince
};

export const HINT_PENALTY = POINTS.correct - POINTS.hinted;

// Karıştırma, kelimeyi kendisine eşit bırakırsa en fazla bu kadar denenir
export const MAX_SHUFFLE_TRIES = 30;

export const DEFAULT_NAMES = ["Oyuncu 1", "Oyuncu 2"];

// Kurulumda seçilebilecek tur sayıları. 0 = sınırsız.
export const ROUND_OPTIONS = [5, 10, 15, 0];
export const DEFAULT_ROUNDS = 10;
