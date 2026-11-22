// Kelime listesi. Yeni kelime eklemek için yalnızca bu diziye yazın.
// Kurallar: küçük harf, boşluksuz, Türkçe yazılışıyla (ç, ğ, ı, ö, ş, ü).
// Kategori, tur başında ipucu olarak gösterilir.

export const CATEGORIES = [
  "Yiyecek & İçecek", "Hayvan", "Doğa", "Eşya", "Ev", "Yer", "Ulaşım",
  "İnsan & Meslek", "Müzik & Sanat", "Duygu & Aşk", "Zaman & Mevsim",
  "Tatil & Macera", "Renk", "Genel",
];

const w = (word, category) => ({ word, category });
const YF = "Yiyecek & İçecek";
const DG = "Doğa";
const ES = "Eşya";
const DA = "Duygu & Aşk";
const MS = "Müzik & Sanat";
const UL = "Ulaşım";
const TM = "Tatil & Macera";
const ZM = "Zaman & Mevsim";
const YR = "Yer";
const IM = "İnsan & Meslek";

export const WORDS = [
  w("elma", YF), w("kalem", ES), w("masa", ES), w("kitap", ES), w("güneş", DG),
  w("deniz", DG), w("çiçek", DG), w("bahçe", YR), w("okul", YR), w("öğretmen", IM),
  w("telefon", ES), w("bilgisayar", ES), w("televizyon", ES), w("pencere", "Ev"), w("kapı", "Ev"),
  w("sandalye", ES), w("araba", UL), w("uçak", UL), w("gemi", UL), w("tren", UL),
  w("otobüs", UL), w("ağaç", DG), w("yağmur", DG), w("bulut", DG), w("ayakkabı", "Eşya"),
  w("çanta", ES), w("şemsiye", ES), w("gözlük", ES), w("buzdolabı", "Ev"), w("kahve", YF),
  w("çay", YF), w("süt", YF), w("ekmek", YF), w("peynir", YF), w("zeytin", YF),
  w("portakal", YF), w("karpuz", YF), w("üzüm", YF), w("çilek", YF), w("kiraz", YF),
  w("şarkı", MS), w("dans", MS), w("resim", MS), w("müzik", MS), w("gitar", MS),
  w("piyano", MS), w("tiyatro", MS), w("sinema", MS), w("havuz", YR), w("orman", DG),
  w("dağ", DG), w("nehir", DG), w("göl", DG), w("şehir", YR), w("köprü", YR),
  w("hastane", YR), w("eczane", YR), w("kütüphane", YR), w("doktor", IM), w("mühendis", IM),
  w("gökyüzü", DG), w("yıldız", DG), w("sevgi", DA), w("mutlu", DA), w("gülümseme", DA),
  w("kalp", DA), w("öpücük", DA), w("tatil", TM), w("sahil", TM), w("balık", "Hayvan"),
  w("gece", ZM), w("hediye", DA), w("çikolata", YF), w("sevgili", DA), w("romantik", DA),
  w("akşam", ZM), w("yemek", YF), w("tatlı", YF), w("güzel", "Genel"), w("bisiklet", UL),
  w("pasta", YF), w("mum", "Ev"), w("kahkaha", DA), w("yolculuk", TM), w("macera", TM),
  w("hayal", DA), w("rüya", DA), w("ışık", DG), w("sürpriz", DA), w("anı", "Genel"),
  w("hazine", "Genel"), w("kumsal", TM), w("fırtına", DG), w("şelale", DG), w("kelebek", "Hayvan"),
  w("papatya", DG), w("gülücük", DA), w("bahar", ZM), w("kış", ZM), w("sonbahar", ZM),
  w("hikaye", MS), w("şiir", MS), w("kahvaltı", YF), w("bulmaca", "Genel"), w("kurabiye", YF),
  w("limonata", YF), w("maceraperest", "Genel"), w("kırmızı", "Renk"), w("mavi", "Renk"), w("yıldönümü", DA),
];
