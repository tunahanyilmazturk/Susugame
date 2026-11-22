// Ayarları tarayıcıda hatırlar (oyuncu adları, zorluk, tur, süre).
// Tarayıcı depolamasına erişilemezse (gizli sekme, engellenmiş site verisi)
// sessizce atlanır; uygulama yine çalışır.

const KEY = "karisik-kelimeler:ayarlar:v1";

export function loadSettings() {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY));
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function saveSettings(settings) {
  try {
    localStorage.setItem(KEY, JSON.stringify(settings));
  } catch {
    /* kaydedilemedi: oyun yine de oynanabilir */
  }
}
