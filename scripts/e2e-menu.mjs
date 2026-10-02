/** Menyu keçidinin vaxtını ölçür. Marşrutlar əvvəlcədən kompilyasiya olunur. */
import puppeteer from "puppeteer-core";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const BASE = "http://localhost:3000";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars", "--autoplay-policy=no-user-gesture-required"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

// Kompilyasiyanı isit
for (const r of ["korporativ", "haqqimizda", "elaqe", "kolleksiya"]) {
  await page.goto(`${BASE}/az/${r}`, { waitUntil: "networkidle2", timeout: 90000 });
}
await page.goto(`${BASE}/az`, { waitUntil: "networkidle2", timeout: 90000 });
await sleep(800);

for (const [i, path] of [[1, "korporativ"], [2, "haqqimizda"], [3, "elaqe"]]) {
  await page.goto(`${BASE}/az`, { waitUntil: "networkidle2" });
  await sleep(600);
  await page.click('button[aria-label="Menyunu aç"]');
  await sleep(1200);
  const links = await page.$$('nav[aria-label="Menu"] a');
  const t0 = Date.now();
  await links[i].click();
  let t = null;
  for (let k = 0; k < 80; k++) {
    if (page.url().endsWith(`/az/${path}`)) {
      t = Date.now() - t0;
      break;
    }
    await sleep(50);
  }
  await sleep(1200);
  const open = (await page.$('nav[aria-label="Menu"]')) !== null;
  console.log(`${path.padEnd(11)} kecid: ${t}ms | menyu bagli: ${!open}`);
}

// Eyni səhifəyə keçid: menyu 2s sonra bağlanmalıdır
await page.click('button[aria-label="Menyunu aç"]');
await sleep(1200);
const same = (await page.$$('nav[aria-label="Menu"] a'))[3];
await same.click();
await sleep(2600);
console.log("eyni sehife: menyu bagli =", (await page.$('nav[aria-label="Menu"]')) === null);

await browser.close();
