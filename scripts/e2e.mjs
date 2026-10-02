/**
 * Yerli Chrome ilə əsas axınların yoxlanması. Yalnız inkişaf üçündür.
 *   node scripts/e2e.mjs            (dev server 3000-də işləməlidir)
 */
import puppeteer from "puppeteer-core";
import { mkdir } from "node:fs/promises";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const BASE = "http://localhost:3000";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

await mkdir(".tmp/e2e", { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars", "--autoplay-policy=no-user-gesture-required"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

const errors = [];
page.on("pageerror", (e) => errors.push("pageerror: " + e));
page.on("console", (m) => {
  if (m.type() === "error" && !/Failed to load resource/.test(m.text()))
    errors.push("console: " + m.text());
});
page.on("response", (r) => {
  if (r.status() >= 400 && !r.url().includes("favicon")) errors.push(`${r.status()} ${r.url()}`);
});

const shot = (name) => page.screenshot({ path: `.tmp/e2e/${name}.png` });
const step = (m) => console.log("•", m);
const clickText = async (selector, text) => {
  const handles = await page.$$(selector);
  for (const h of handles) {
    const t = await h.evaluate((el) => el.textContent?.trim());
    if (t && t.includes(text)) {
      await h.click();
      return true;
    }
  }
  return false;
};

// 1. Ana səhifə
await page.goto(`${BASE}/az`, { waitUntil: "networkidle2", timeout: 90000 });
await sleep(800);
await shot("01-home");
step("ana sehife acildi");

// 2. Menyu
await page.click('button[aria-label="Menyunu aç"]');
await sleep(1500);
await shot("02-menu");
step("menyu acildi");

// 3. Hover: fon videosu dəyişir
const links = await page.$$('nav[aria-label="Menu"] a');
step(`menyu kecidleri: ${links.length}`);
await links[1].hover();
await sleep(1600);
await shot("03-menu-hover");

// 4. Basanda: ad dolur, video ekranı doldurur, ~2s sonra keçid
const t0 = Date.now();
await links[0].click();
await sleep(1000);
await shot("04-menu-filling");
let navigatedAt = null;
for (let i = 0; i < 40; i++) {
  if (page.url().includes("/az/kolleksiya")) {
    navigatedAt = Date.now() - t0;
    break;
  }
  await sleep(100);
}
step(`kecid vaxti: ${navigatedAt}ms (hedef ~2000), url: ${page.url()}`);
await sleep(1500);
await shot("05-collection");

// 5. Menyu bağlanıb?
const menuStillOpen = (await page.$('nav[aria-label="Menu"]')) !== null;
step(`kecidden sonra menyu hele aciq: ${menuStillOpen} (false olmalidir)`);

// 6. Kartdan səbətə at
const added = await clickText("main article button", "Səbətə");
step(`karta basildi: ${added}`);
await sleep(1200);
await shot("06-cart-drawer");
const drawer = await page.$('aside[role="dialog"]');
step(`sebet paneli acildi: ${drawer !== null}`);

// 7. Panelden sifarişe
await clickText('aside[role="dialog"] a', "Sifarişə keç");
await page.waitForFunction(() => location.pathname.endsWith("/sifaris"), { timeout: 15000 });
await sleep(1200);
await shot("07-checkout");
step("sifaris sehifesi: " + page.url());

// 8. Formu doldur və göndər
await page.type('input[name="name"]', "Test Müştəri");
await page.type('input[name="phone"]', "+994 50 123 45 67");
await page.type('input[name="city"]', "Bakı");
await page.type('input[name="address"]', "Nizami küçəsi 10");
await clickText("form button", "Sifarişi təsdiq et");
await sleep(2500);
await shot("08-order-done");
const doneText = await page.evaluate(() => document.body.innerText.includes("Sifarişiniz qəbul edildi"));
step(`sifaris qebul edildi: ${doneText}`);

// 9. Məhsul səhifəsi
await page.goto(`${BASE}/az/kolleksiya/aze-travel`, { waitUntil: "networkidle2", timeout: 90000 });
await sleep(1500);
await shot("09-product");
const thumbs = await page.$$('ul button[aria-label^="Kadr"]');
step(`miniatur sayi: ${thumbs.length}`);
if (thumbs.length > 1) {
  await thumbs[thumbs.length - 1].click();
  await sleep(1400);
  await shot("10-product-slide");
}

// 10. Səbət sayı: sifarişdən sonra boş olmalıdır
const badge = await page.evaluate(() => {
  const b = document.querySelector('button[aria-label="Səbəti aç"] span');
  return b ? b.textContent : null;
});
step(`sebet nişanı sifaristen sonra: ${badge} (null olmalıdır)`);

console.log(errors.length ? "\nXETALAR:\n  " + [...new Set(errors)].join("\n  ") : "\nkonsol/sebeke xetasi yoxdur");
await browser.close();
