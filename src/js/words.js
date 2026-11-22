// Kelime listesi. Yeni kelime eklemek için yalnızca bu listelere yazın.
// Kurallar:
//  - küçük harf, boşluksuz, Türkçe yazılışıyla (ç, ğ, ı, ö, ş, ü)
//  - kategori CATEGORIES içindeki adlardan biri olmalı
//  - zorluk seviyesi harf sayısından otomatik çıkar (bkz. config.js LEVELS)

export const CATEGORIES = [
  "Yiyecek & İçecek", "Hayvan", "Doğa", "Eşya", "Ev", "Yer", "Ulaşım",
  "İnsan & Meslek", "Müzik & Sanat", "Duygu & Aşk", "Zaman & Mevsim",
  "Tatil & Macera", "Renk", "Genel",
];

const w = (word, category) => ({ word, category });

const YF = "Yiyecek & İçecek";
const HY = "Hayvan";
const DG = "Doğa";
const ES = "Eşya";
const EV = "Ev";
const YR = "Yer";
const UL = "Ulaşım";
const IM = "İnsan & Meslek";
const MS = "Müzik & Sanat";
const DA = "Duygu & Aşk";
const ZM = "Zaman & Mevsim";
const TM = "Tatil & Macera";
const RN = "Renk";
const GN = "Genel";

export const WORDS = [
  // Yiyecek & İçecek
  w("elma", YF), w("ekmek", YF), w("peynir", YF), w("zeytin", YF), w("portakal", YF),
  w("karpuz", YF), w("üzüm", YF), w("çilek", YF), w("kiraz", YF), w("kahve", YF),
  w("çay", YF), w("süt", YF), w("çikolata", YF), w("pasta", YF), w("yemek", YF),
  w("tatlı", YF), w("kahvaltı", YF), w("kurabiye", YF), w("limonata", YF), w("bal", YF),
  w("tuz", YF), w("şeker", YF), w("salata", YF), w("domates", YF), w("patates", YF),
  w("makarna", YF), w("pilav", YF), w("çorba", YF), w("mercimek", YF), w("fasulye", YF),
  w("börek", YF), w("lahmacun", YF), w("pide", YF), w("köfte", YF), w("kek", YF),
  w("bisküvi", YF), w("dondurma", YF), w("mısır", YF), w("nohut", YF), w("bulgur", YF),
  w("zeytinyağı", YF), w("soğan", YF), w("biber", YF), w("kavun", YF), w("incir", YF),
  w("ayran", YF), w("hamburger", YF), w("şekerleme", YF), w("tatlandırıcı", YF),

  // Hayvan
  w("kuş", HY), w("kedi", HY), w("köpek", HY), w("fil", HY), w("aslan", HY),
  w("inek", HY), w("kurt", HY), w("ayı", HY), w("arı", HY), w("balık", HY),
  w("kelebek", HY), w("tavuk", HY), w("kaplan", HY), w("zürafa", HY), w("tilki", HY),
  w("kirpi", HY), w("yunus", HY), w("kaplumbağa", HY), w("papağan", HY), w("yılan", HY),
  w("koyun", HY), w("keçi", HY), w("kartal", HY), w("timsah", HY), w("penguen", HY),
  w("sincap", HY), w("ördek", HY), w("tavşan", HY), w("kangal", HY), w("gergedan", HY),

  // Doğa
  w("güneş", DG), w("deniz", DG), w("çiçek", DG), w("ağaç", DG), w("yağmur", DG),
  w("bulut", DG), w("orman", DG), w("dağ", DG), w("nehir", DG), w("göl", DG),
  w("gökyüzü", DG), w("yıldız", DG), w("ışık", DG), w("toprak", DG), w("rüzgar", DG),
  w("yaprak", DG), w("kum", DG), w("taş", DG), w("çimen", DG), w("dalga", DG),
  w("okyanus", DG), w("volkan", DG), w("çöl", DG), w("vadi", DG), w("kaya", DG),
  w("buz", DG), w("fırtına", DG), w("şelale", DG), w("papatya", DG), w("gökkuşağı", DG),
  w("ada", DG), w("mevsim", DG), w("yeryüzü", DG), w("kutup", DG), w("sisli", DG),

  // Eşya
  w("kalem", ES), w("masa", ES), w("kitap", ES), w("telefon", ES), w("bilgisayar", ES),
  w("televizyon", ES), w("sandalye", ES), w("çanta", ES), w("şemsiye", ES), w("gözlük", ES),
  w("ayakkabı", ES), w("saat", ES), w("kumanda", ES), w("fırça", ES), w("makas", ES),
  w("cetvel", ES), w("silgi", ES), w("defter", ES), w("çekmece", ES), w("bardak", ES),
  w("tabak", ES), w("sepet", ES), w("top", ES), w("yüzük", ES), w("kolye", ES),
  w("bilezik", ES), w("kulaklık", ES), w("mikrofon", ES), w("kitaplık", ES), w("çerçeve", ES),
  w("kalemtıraş", ES), w("ayna", ES), w("tarak", ES), w("havlu", ES), w("sabun", ES),

  // Ev
  w("pencere", EV), w("kapı", EV), w("oda", EV), w("mutfak", EV), w("banyo", EV),
  w("çatı", EV), w("merdiven", EV), w("balkon", EV), w("duvar", EV), w("halı", EV),
  w("perde", EV), w("koltuk", EV), w("yatak", EV), w("dolap", EV), w("lamba", EV),
  w("buzdolabı", EV), w("mum", EV), w("kilim", EV), w("bahçe", EV), w("avize", EV),

  // Yer
  w("okul", YR), w("havuz", YR), w("şehir", YR), w("köprü", YR), w("hastane", YR),
  w("eczane", YR), w("kütüphane", YR), w("park", YR), w("market", YR),
  w("istasyon", YR), w("müze", YR), w("kafe", YR), w("çarşı", YR), w("stadyum", YR),
  w("lokanta", YR), w("kıyı", YR), w("limanlık", YR), w("meydan", YR), w("üniversite", YR),

  // Ulaşım
  w("araba", UL), w("uçak", UL), w("gemi", UL), w("tren", UL), w("otobüs", UL),
  w("bisiklet", UL), w("kamyon", UL), w("taksi", UL), w("motosiklet", UL), w("helikopter", UL),
  w("vapur", UL), w("metro", UL), w("tramvay", UL), w("roket", UL), w("denizaltı", UL),
  w("minibüs", UL), w("ambulans", UL), w("itfaiye", UL),

  // İnsan & Meslek
  w("öğretmen", IM), w("doktor", IM), w("mühendis", IM), w("hemşire", IM), w("aşçı", IM),
  w("polis", IM), w("pilot", IM), w("öğrenci", IM), w("çocuk", IM), w("kardeş", IM),
  w("arkadaş", IM), w("anne", IM), w("baba", IM), w("dede", IM), w("teyze", IM),
  w("komşu", IM), w("sporcu", IM), w("berber", IM), w("çiftçi", IM), w("fotoğrafçı", IM),
  w("tasarımcı", IM), w("kitapçı", IM), w("garson", IM), w("bekçi", IM), w("terzi", IM),

  // Müzik & Sanat
  w("şarkı", MS), w("dans", MS), w("resim", MS), w("müzik", MS), w("gitar", MS),
  w("piyano", MS), w("tiyatro", MS), w("sinema", MS), w("keman", MS), w("davul", MS),
  w("flüt", MS), w("orkestra", MS), w("hikaye", MS), w("şiir", MS), w("ressam", MS),
  w("heykel", MS), w("şarkıcı", MS), w("film", MS), w("bestekar", MS), w("koreografi", MS),

  // Duygu & Aşk
  w("sevgi", DA), w("mutlu", DA), w("gülümseme", DA), w("kalp", DA), w("öpücük", DA),
  w("sevgili", DA), w("romantik", DA), w("hediye", DA), w("kahkaha", DA), w("hayal", DA),
  w("rüya", DA), w("sürpriz", DA), w("gülücük", DA), w("yıldönümü", DA), w("özlem", DA),
  w("heyecan", DA), w("neşe", DA), w("huzur", DA), w("minnettar", DA), w("tebessüm", DA),
  w("hasret", DA), w("kıskanç", DA), w("cesaret", DA), w("umut", DA), w("sabır", DA),
  w("dostluk", DA), w("saygı", DA), w("güven", DA), w("bağlılık", DA), w("sevimli", DA),
  w("yakışıklı", DA),

  // Zaman & Mevsim
  w("gece", ZM), w("akşam", ZM), w("sabah", ZM), w("öğle", ZM), w("pazartesi", ZM),
  w("cumartesi", ZM), w("haziran", ZM), w("ağustos", ZM), w("ilkbahar", ZM), w("bahar", ZM),
  w("yaz", ZM), w("kış", ZM), w("sonbahar", ZM), w("dakika", ZM), w("hafta", ZM),
  w("dolunay", ZM), w("gündoğumu", ZM), w("pazar", ZM), w("saniye", ZM), w("yılbaşı", ZM),

  // Tatil & Macera
  w("tatil", TM), w("sahil", TM), w("yolculuk", TM), w("macera", TM), w("kumsal", TM),
  w("plaj", TM), w("kamp", TM), w("çadır", TM), w("kayak", TM), w("yüzme", TM),
  w("bavul", TM), w("otel", TM), w("rehber", TM), w("harita", TM), w("pusula", TM),
  w("yelken", TM), w("pasaport", TM), w("günbatımı", TM), w("dağcılık", TM), w("maceraperest", TM),

  // Renk
  w("kırmızı", RN), w("mavi", RN), w("sarı", RN), w("yeşil", RN), w("siyah", RN),
  w("beyaz", RN), w("pembe", RN), w("mor", RN), w("gri", RN), w("turuncu", RN),
  w("turkuaz", RN), w("lacivert", RN), w("lila", RN), w("bordo", RN),

  // Genel
  w("güzel", GN), w("hazine", GN), w("fotoğraf", GN), w("bulmaca", GN), w("kelime", GN),
  w("cümle", GN), w("bilmece", GN), w("şans", GN), w("fikir", GN), w("kahraman", GN),
  w("mükemmel", GN), w("şampiyon", GN), w("ziyafet", GN), w("heyecanlı", GN), w("yağmurlu", GN),
  w("sorumluluk", GN), w("elektrik", GN), w("akvaryum", GN), w("lokomotif", GN), w("ansiklopedi", GN),
  w("merhaba", GN), w("anı", GN),
];
