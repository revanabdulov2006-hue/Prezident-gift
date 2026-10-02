/**
 * Səhifəni bölmə-bölmə çəkir: hər ekran hündürlüyü üçün bir şəkil.
 *   node scripts/shoot-sections.mjs az ana 1440 900
 */
import puppeteer from "puppeteer-core";
import { mkdir } from "node:fs/promises";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const [, , rawRoute = "az", name = "page", w = "1440", h = "900"] = process.argv;
const route = "/" + rawRoute.replace(/^.*[/\\]Git[/\\]/, "").replace(/^\/+/, "");

await mkdir(".tmp/shots", { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--hide-scrollbars", "--autoplay-policy=no-user-gesture-required"],
});

const page = await browser.newPage();
await page.setViewport({ width: Number(w), height: Number(h) });

const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));

await page.goto(`http://localhost:3000${route}`, {
  waitUntil: "networkidle2",
  timeout: 60000,
});

const height = await page.evaluate(() => document.body.scrollHeight);
const vh = Number(h);
const frames = Math.min(Math.ceil(height / vh), 14);

for (let i = 0; i < frames; i++) {
  await page.evaluate((y) => window.scrollTo(0, y), i * vh);
  await new Promise((r) => setTimeout(r, 900));
  await page.screenshot({ path: `.tmp/shots/${name}-${i}.png` });
}

console.log(`hundurluk ${height}px, ${frames} kadr`);
console.log(errors.length ? "XETALAR:\n  " + errors.join("\n  ") : "konsol temizdir");
await browser.close();
