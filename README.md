# Susugame

## Karışık Kelimeler

Harfleri karıştırılmış Türkçe bir kelimenin doğrusunu iki oyuncu birlikte bulmaya çalışır.

- Oyunu oynamak için: `dist/index.html` dosyasını tarayıcıda açın (kurulum gerekmez, telefonda da çalışır).
- Doğru bilene 10 puan, ipucu kullanılırsa 5 puan. Pas geçilirse puan yok.
- Her turdan sonra sıra diğer oyuncuya geçer.
- Türkçe karakter yazmadan da tahmin edebilirsiniz (ör. `cicek` = `çiçek`).

## Proje yapısı

```
src/
  index.html        Sayfa iskeleti (CSS ve JS build sırasında gömülür)
  css/styles.css    Tüm stiller; renkler :root içindeki tokenlar
  js/
    config.js       Puanlar, ipucu cezası, sabitler  ← kural ayarları burada
    words.js        Kelime listesi                    ← yeni kelime burada
    utils.js        Saf yardımcılar (normalize, karıştırma)
    game.js         Oyun kuralları (DOM bilmez)
    ui.js           Ekran çizimi ve DOM erişimi
    main.js         Giriş noktası: kuralları ve arayüzü bağlar
tests/
  game.test.mjs     Birim testleri (node:test)
scripts/
  build.mjs         src/ → dist/index.html birleştirici (esbuild)
dist/
  index.html        Derlenmiş tek dosya (oynamak ve yayınlamak için)
```

## Geliştirme

```sh
npm install      # bir kez (esbuild)
npm test         # birim testleri
npm run build    # dist/index.html dosyasını yeniden üretir
```

Değişiklikten sonra `npm run build` çalıştırıp `dist/index.html` dosyasını commit edin.
`dist/` tek dosya olduğu için hem GitHub Pages hem de Claude uygulaması için yeterlidir.

### Sık yapılacak değişiklikler

- **Kelime eklemek:** `src/js/words.js` içindeki diziye küçük harfle yazın.
- **Puanı değiştirmek:** `src/js/config.js` içindeki `POINTS` değerlerini düzenleyin.
- **Oyun kuralı eklemek:** `src/js/game.js` içine fonksiyon ekleyin, `main.js` ile bağlayın, testini `tests/` altına yazın.
- **Görünüm:** `src/css/styles.css` içindeki renk tokenlarını değiştirin; koyu tema otomatik uygulanır.
