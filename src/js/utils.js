// Saf yardımcı fonksiyonlar. DOM'a ve oyun durumuna dokunmaz.
import { MAX_SHUFFLE_TRIES } from "./config.js";

const TR_FOLD = { ç: "c", ğ: "g", ı: "i", i: "i", ö: "o", ş: "s", ü: "u", â: "a", î: "i", û: "u" };

// Tahmini karşılaştırmaya hazırlar: küçük harf, boşluk temizliği,
// Türkçe karakterler sadeleştirilir (çiçek = cicek).
export function normalize(text) {
  return text
    .toLocaleLowerCase("tr-TR")
    .trim()
    .replace(/[çğıöşüâîû]/g, (c) => TR_FOLD[c]);
}

// Ekranda göstermek için büyük harfe çevirir (i -> İ).
export function toDisplay(text) {
  return text.toLocaleUpperCase("tr-TR");
}

// Fisher-Yates karıştırma. rng test edilebilirlik için dışarıdan verilebilir.
export function shuffle(items, rng = Math.random) {
  const a = items.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Kelimenin harflerini karıştırır; sonuç asıl kelimeye eşit olmasın.
export function scramble(word, rng = Math.random) {
  const letters = [...word];
  let out = word;
  for (let i = 0; i < MAX_SHUFFLE_TRIES && out === word; i++) {
    out = shuffle(letters, rng).join("");
  }
  return out;
}
