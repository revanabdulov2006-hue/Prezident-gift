/**
 * Yerli Chrome ilə səhifə şəkilləri çəkir. Yalnız yoxlama üçündür.
 *   node scripts/shoot.mjs <yol> <ad> [en] [hundurluk] [tam]
 */
import puppeteer from "puppeteer-core";
import { mkdir } from "node:fs/promises";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const [, , rawRoute = "az", name = "shot", w = "1440", h = "900", full = ""] =
  process.argv;

// Git Bash "/az" kimi arqumenti Windows yoluna çevirir, ona görə yol
// əvvəlindəki slash olmadan verilir və burada bərpa olunur.
const route = "/" + rawRoute.replace(/^.*[/\\]Git[/\\]/, "").replace(/^\/+/, "");

await mkdir(".tmp/shots", { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--hide-scrollbars"],
});

const page = await browser.newPage();
await page.setViewport({
  width: Number(w),
  height: Number(h),
  deviceScaleFactor: 1,
});

const errors = [];
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});
page.on("pageerror", (e) => errors.push(String(e)));

await page.goto(`http://localhost:3000${route}`, {
  waitUntil: "networkidle2",
  timeout: 60000,
});

// Scroll reveal animasiyalarının işə düşməsi üçün səhifəni bir dəfə gəzirik.
await page.evaluate(async () => {
  await new Promise((resolve) => {
    let y = 0;
    const step = () => {
      y += window.innerHeight * 0.8;
      window.scrollTo(0, y);
      if (y < document.body.scrollHeight) setTimeout(step, 120);
      else {
        window.scrollTo(0, 0);
        setTimeout(resolve, 600);
      }
    };
    step();
  });
});

await new Promise((r) => setTimeout(r, 800));

await page.screenshot({
  path: `.tmp/shots/${name}.png`,
  fullPage: full === "full",
});

if (errors.length) {
  console.log("KONSOL XETALARI:");
  errors.forEach((e) => console.log("  " + e));
} else {
  console.log("konsol temizdir");
}

await browser.close();
console.log(`.tmp/shots/${name}.png`);
