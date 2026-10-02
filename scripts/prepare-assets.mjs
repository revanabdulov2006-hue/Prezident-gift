/**
 * _source/ içindəki orijinal media fayllarını public/ üçün hazırlayır.
 * Fayl adları slug-laşdırılır, videolar sıxılır, şəkillər webp-ə çevrilir.
 *
 *   node scripts/prepare-assets.mjs            mp4 + webm + poster
 *   node scripts/prepare-assets.mjs --no-webm  yalnız mp4 (sürətli)
 *   node scripts/prepare-assets.mjs --force    mövcud faylların üstünə yazır
 */
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { readdir, mkdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import ffmpegPath from "ffmpeg-static";

const run = promisify(execFile);
const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "_source");
const OUT = path.join(ROOT, "public");

const NO_WEBM = process.argv.includes("--no-webm");
const FORCE = process.argv.includes("--force");

/** Video faylının adındakı fərqli parça -> çıxış slug-ı. */
const VIDEO_MAP = [
  // Sayt fonu ucun abstrakt videolar: video1 qizil lelek, video2 mavi dalga, video3 boz ipek.
  ["video1.", "video1"],
  ["video2.", "video2"],
  ["video3.", "video3"],
  ["AZE Series Silver", "aze-series-silver"],
  ["barsetkas", "aze-barsetka"],
  ["praktikliyi ifad\u0259li diz (1)", "aze-travel-2"],
  ["praktikliyi ifad\u0259li diz.", "aze-travel"],
  ["\u201cXan\u201d bebut", "xan-xencer"],
  ["Xan bebut", "xan-xencer-2"],
  ["\u00abStrateq\u00bb", "strateq-chess-2"],
  ["\u201cStrategists\u201d", "strateq-chess"],
];

/**
 * Uzun videolarin veb ucun kesilmesi.
 * Bu videolar sessiz fon lenti kimi islenir, ona gore tam uzunluq lazim deyil.
 * Sonundaki PRESIDENT loqo kadri de kesilir, cunki lent dovr vurur.
 *   ss     orijinalda baslangic saniyesi
 *   t      lentin uzunlugu
 *   poster orijinal vaxt oxunda poster kadri
 */
const TRIM = {
  "xan-xencer": { ss: "10", t: "22", poster: "36" },
  "strateq-chess": { ss: "2", t: "22", poster: "15" },
  "strateq-chess-2": { ss: "0", t: "23.5", poster: "6" },
  "aze-barsetka": { ss: "0", t: "18", poster: "8" },
  "aze-series-silver": { ss: "0", t: "24.3", poster: "10" },
  "aze-travel": { ss: "0", t: "17.5", poster: "6" },
  "aze-travel-2": { ss: "0", t: "22.2", poster: "9" },
  "xan-xencer-2": { poster: "5" },
};

/** Screenshot vaxt damgasi -> cixis adi. */
const SHOT_MAP = {
  "172438": "aze-series-blue-1",
  "172447": "aze-series-blue-2",
  "172453": "aze-series-blue-3",
  "172501": "aze-series-blue-4",
  "172514": "azerbaycan-plaketi-1",
  "172522": "azerbaycan-plaketi-2",
  "172547": "aze-boston-1",
  "172605": "aze-boston-2",
  "172634": "aze-barsetka-2",
  "172719": "personal-mark-folio-1",
  "172729": "sertifikat-qovlugu-1",
  "172737": "aze-series-silver-1",
  "172744": "aze-series-silver-2",
  "172809": null, // 125 bayt, sinmis fayl
  "172823": "bt-24-green-1",
  "172831": "xatire-stellasi-1",
  "172840": "personal-mark-folio-2",
  "172847": "aze-travel-1",
  "172857": "korporativ-kolleksiya-1",
  "172904": "strateq-chess-1",
  "172917": "xan-xencer-1",
  "172929": "aze-barsetka-1",
  "172944": "signature-gold-1",
  "172949": "aze-travel-2",
  "173002": "xan-xencer-2",
  "173009": "strateq-chess-2",
};

const MB = (b) => (b / 1024 / 1024).toFixed(2) + " MB";
const exists = (p) => stat(p).then(() => true, () => false);

async function ffmpeg(args) {
  await run(ffmpegPath, ["-hide_banner", "-loglevel", "error", "-y", ...args], {
    maxBuffer: 1024 * 1024 * 32,
  });
}

async function processVideos() {
  const dir = path.join(SRC, "video");
  if (!(await exists(dir))) return console.log("  _source/video yoxdur, atlanir");
  await mkdir(path.join(OUT, "video"), { recursive: true });
  await mkdir(path.join(OUT, "poster"), { recursive: true });

  const files = await readdir(dir);
  const unmapped = [];

  for (const file of files) {
    if (!file.toLowerCase().endsWith(".mp4")) continue;
    const hit = VIDEO_MAP.find(([needle]) => file.includes(needle));
    if (!hit) { unmapped.push(file); continue; }

    const slug = hit[1];
    const input = path.join(dir, file);
    const mp4 = path.join(OUT, "video", `${slug}.mp4`);
    const webm = path.join(OUT, "video", `${slug}.webm`);
    const poster = path.join(OUT, "poster", `${slug}.webp`);
    const before = (await stat(input)).size;

    // Kesilme teyin olunubsa, -ss/-t girisden evvel verilir (suretli axtaris).
    const trim = TRIM[slug];
    const cut = trim?.t ? ["-ss", trim.ss ?? "0", "-t", trim.t] : [];
    const scale = "scale='min(1280,iw)':-2:flags=lanczos,fps=30";

    if (FORCE || !(await exists(mp4))) {
      await ffmpeg([
        ...cut, "-i", input,
        "-vf", scale,
        "-c:v", "libx264", "-profile:v", "high", "-crf", "29", "-preset", "slow",
        "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an",
        mp4,
      ]);
    }
    if (!NO_WEBM && (FORCE || !(await exists(webm)))) {
      await ffmpeg([
        ...cut, "-i", input,
        "-vf", scale,
        "-c:v", "libvpx-vp9", "-crf", "37", "-b:v", "0",
        "-row-mt", "1", "-cpu-used", "4", "-an",
        webm,
      ]);
    }
    if (FORCE || !(await exists(poster))) {
      const tmp = path.join(OUT, "poster", `${slug}.tmp.png`);
      const at = trim?.poster ? ["-ss", trim.poster] : [];
      await ffmpeg([...at, "-i", input, "-vf", "scale='min(1280,iw)':-2", "-vframes", "1", tmp]);
      await sharp(tmp).webp({ quality: 80 }).toFile(poster);
      await run(process.execPath, ["-e", `require('fs').unlinkSync(${JSON.stringify(tmp)})`]);
    }

    const after = (await stat(mp4)).size;
    const flag = after > 4 * 1024 * 1024 ? "  << 4 MB-dan BOYUK" : "";
    console.log(`  ${slug.padEnd(20)} ${MB(before)} -> ${MB(after)}${flag}`);
  }

  if (unmapped.length) {
    console.log("\n  XEBERDARLIQ: xeritede olmayan video fayllari:");
    unmapped.forEach((f) => console.log("    " + f));
  }
}

async function processShots() {
  const dir = path.join(SRC, "shots");
  if (!(await exists(dir))) return console.log("  _source/shots yoxdur, atlanir");
  await mkdir(path.join(OUT, "images"), { recursive: true });

  const files = await readdir(dir);
  let done = 0, skipped = 0;
  const unmapped = [];

  for (const file of files) {
    if (!file.toLowerCase().endsWith(".png")) continue;
    const stamp = (file.match(/(\d{6})\.png$/) || [])[1];
    if (!stamp || !(stamp in SHOT_MAP)) { unmapped.push(file); continue; }
    const name = SHOT_MAP[stamp];
    if (name === null) { skipped++; continue; }

    const input = path.join(dir, file);
    if ((await stat(input)).size < 1024) { skipped++; continue; }

    const out = path.join(OUT, "images", `${name}.webp`);
    if (!FORCE && (await exists(out))) { done++; continue; }

    let pipeline = sharp(input);
    const meta = await pipeline.metadata();

    /**
     * Instagram post formatindaki kadrlarin altinda mehsulun adi yazilidir.
     * Kart basligi ile tekrarlanmasin deye alt zolaq kesilir.
     * Bu kadrlar ~0.75 nisbetindedir, xam ekran goruntuleri ise ~0.63.
     */
    if (meta.width && meta.height && meta.width / meta.height > 0.7) {
      const keep = Math.round(meta.height * 0.78);
      pipeline = pipeline.extract({
        left: 0,
        top: 0,
        width: meta.width,
        height: keep,
      });
    }

    await pipeline
      .resize({ width: 1400, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(out);
    done++;
  }

  console.log(`  ${done} sekil cevrildi, ${skipped} atlandi`);
  if (unmapped.length) {
    console.log("  XEBERDARLIQ: xeritede olmayan sekiller:");
    unmapped.forEach((f) => console.log("    " + f));
  }
}

async function processBrand() {
  const input = path.join(SRC, "brand", "logo.jpg");
  if (!(await exists(input))) return console.log("  logo.jpg yoxdur, atlanir");
  await mkdir(path.join(OUT, "brand"), { recursive: true });
  const out = path.join(OUT, "brand", "logo.webp");
  if (FORCE || !(await exists(out))) {
    await sharp(input).resize({ width: 1080 }).webp({ quality: 88 }).toFile(out);
  }
  // Sosial sebeke paylasimi ucun og sekli.
  const og = path.join(OUT, "brand", "og.webp");
  if (FORCE || !(await exists(og))) {
    await sharp(input).resize(1200, 630, { fit: "cover" }).webp({ quality: 85 }).toFile(og);
  }
  console.log("  logo.webp + og.webp hazirdir");
}

console.log("\nVideolar:");
await processVideos();
console.log("\nSekiller:");
await processShots();
console.log("\nBrend:");
await processBrand();

await writeFile(
  path.join(OUT, "ASSETS.md"),
  "Bu qovluqdakı fayllar `scripts/prepare-assets.mjs` tərəfindən `_source/`-dan yaradılıb.\nƏl ilə redaktə etməyin; mənbəni dəyişib skripti yenidən işə salın.\n",
);
console.log("\nHazirdir.\n");
