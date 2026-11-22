// Kaynak dosyaları tek bir dist/index.html dosyasında birleştirir.
// Tek dosya, GitHub Pages gibi statik barındırmada ve Claude uygulamasında
// sorunsuz çalışır: CSS ve JS sayfanın içine gömülür.
import { build } from "esbuild";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = (...p) => path.join(root, "src", ...p);

const result = await build({
  entryPoints: [src("js", "main.js")],
  bundle: true,
  minify: true,
  format: "iife",
  target: "es2019",
  write: false,
});
const js = result.outputFiles[0].text;
const css = await readFile(src("css", "styles.css"), "utf8");
let html = await readFile(src("index.html"), "utf8");

// Function değiştirici kullanılıyor: $ içeren kod değiştirme dizilerini bozmasın diye
html = html
  .replace("<!-- @CSS -->", () => `<style>\n${css}</style>`)
  .replace("<!-- @JS -->", () => `<script>\n${js}</script>`);

if (html.includes("<!-- @")) throw new Error("Build: yer tutucu değiştirilemedi");

await mkdir(path.join(root, "dist"), { recursive: true });
await writeFile(path.join(root, "dist", "index.html"), html, "utf8");
console.log(`dist/index.html yazıldı (${(Buffer.byteLength(html) / 1024).toFixed(1)} KB)`);
