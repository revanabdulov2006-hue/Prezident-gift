# PRESIDENT · Business Gifts

Rəsmi və korporativ təqdimat hədiyyələri üçün onlayn mağaza: məhsul seçilir, səbətə
əlavə olunur, sifariş verilir. Korporativ və fərdi həkk sorğuları ayrıca formadadır.

## İşə salmaq

```bash
npm install
npm run dev        # http://localhost:3000 , kök ünvan /az-a yönəlir
```

Digər əmrlər:

```bash
npm run build      # istehsal versiyası
npm run assets     # _source/ -> public/ media emalı
npx tsc --noEmit   # tip yoxlaması
npx eslint .       # lint
```

> `npm run build` və `npm run dev` eyni vaxtda işlədilməməlidir, ikisi də `.next`
> qovluğunu yazır. Qarışıqlıq olarsa `.next` silinib `npm run dev` yenidən
> başladılır.

## Quruluş

```
app/[locale]/        az | en | ru . layout.tsx kök layoutdur (html, body, şriftlər)
  kolleksiya/        siyahı və [slug] məhsul səhifəsi
  korporativ/ haqqimizda/ elaqe/
app/api/inquiry/     sorğu formasının qəbulu
components/
  brand/             StarMark (inline SVG), Wordmark
  layout/            Nav, Footer, LocaleSwitch
  ui/                Button, Reveal, VideoLoop, ProductCard, CategoryFilter
  sections/          ana səhifənin 9 bölməsi
content/
  types.ts           Locale, Category, Product tipləri
  products.ts        13 məhsul, hər sahə üç dildə
  i18n.ts            sabit mətnlər, üç dildə
  inquiry-schema.ts  forma və API üçün ortaq zod sxemi
scripts/
  prepare-assets.mjs media emalı
  shoot.mjs          yoxlama üçün ekran şəkli
_source/             orijinal video, şəkil və loqo . toxunulmur
public/              emal olunmuş media . əl ilə redaktə edilmir
```

## Dizayn sistemi

Tokenlər `app/globals.css` daxilində `@theme` blokundadır.

| Rol | Dəyər |
|---|---|
| Fon | `#0A0A0B` |
| Səth | `#141416` |
| Mətn | `#F2F2F0` |
| İkinci mətn | `#8A8A90` |
| Aksent | `#C8CDD4` (xrom) |
| Display şrift | Cormorant Garamond 300/400/500 |
| UI şrift | Manrope 400/500/600/700 |

Hər iki şrift `latin`, `latin-ext` və `cyrillic` altçoxluqları ilə yüklənir.
Azərbaycan `ə/Ə` və rus Kirili üçün bu şərtdir, altçoxluq siyahısı
`app/[locale]/layout.tsx` faylında dəyişdirilməməlidir.

Hərəkət: giriş `opacity 0→1`, `y 8px→0`, `blur 4px→0`, `duration .6`,
`ease [0.16, 1, 0.3, 1]`. Bütün spring-lərdə `bounce: 0`. Tək scroll reveal
komponenti `components/ui/Reveal.tsx`-dir. GSAP yalnız xəncər bölməsindədir.

## Media emalı

`scripts/prepare-assets.mjs` `_source/` qovluğundakı orijinalları `public/`
üçün hazırlayır:

- videolar 1280px enə, 30 fps, H.264 `crf 29` + VP9 webm, hər biri 4 MB-dan kiçik
- uzun videolar `TRIM` xəritəsinə görə kəsilir, sonundakı PRESIDENT loqo kadrı atılır
- Instagram post formatındakı şəkillərin (nisbət > 0.70) alt yazı zolağı kəsilir
- şəkillər webp, keyfiyyət 82

Yeni media əlavə edəndə `VIDEO_MAP` və `SHOT_MAP` xəritələrinə yazılır,
sonra `npm run assets` işə salınır. Xəritədə olmayan fayl xəbərdarlıqla bildirilir.

## Səbət və sifariş

- Səbət `components/cart/CartProvider.tsx`-dədir, brauzerin localStorage-ında saxlanır
  (`president-cart-v1`) və açılışda yalnız mövcud məhsullar saxlanılır.
- `/[locale]/sifaris` sifariş səhifəsidir. Forma: ad və soyad, nömrə, çatdırılma ünvanı, qeyd, miqdar (başqa sahə yoxdur).
- Göndərəndə **WhatsApp hazır sifariş mesajı ilə açılır** (`content/site.ts` daxilindəki nömrəyə).
  Mesajı `lib/order-message.ts` qurur və həmişə Azərbaycan dilindədir. Sifariş yalnız müştəri
  WhatsApp-da mesajı göndərəndən sonra bizə çatır, ona görə nəticə ekranında bu xatırladılır
  və "WhatsApp-da yenidən aç" düyməsi var (brauzer pop-up-ı bloklasa).
- Onlayn kart ödənişi **yoxdur**. Ödəniş qaydası komanda ilə razılaşdırılır.
- Korporativ sorğu forması (`InquiryForm`) ayrıdır və yalnız `/korporativ` və `/elaqe`
  səhifələrindədir. O, e-poçtla işləyir (`app/api/inquiry`): `.env.local` içində
  `RESEND_API_KEY` və `INQUIRY_TO` lazımdır. İstehsalda bunlar yoxdursa API 503 qaytarır.

## Doldurulmalı yerlər

Bunlar yer tutucudur, real məlumatla əvəz olunmalıdır:

- **`content/prices.ts` , bütün qiymətlər yer tutucudur.** Real qiymətlər verilməyib.
- `content/site.ts` , WhatsApp nömrəsi (`994102396015`) və Instagram (@president.business.gifts) doldurulub
- `content/i18n.ts` , hər üç dildə `footer.address` və `footer.email` (`TODO:` ilə). Telefon WhatsApp nömrəsidir
- `app/[locale]/layout.tsx` , `metadataBase` domeni (hazırda `presidentgift.az`)
- EN və RU mətnləri AZ-dan tərcümə edilib, peşəkar redaktə tövsiyə olunur

## Fon videoları

Layihənin kökündəki `video1.MP4`, `video2.MP4`, `video3.MP4` `npm run assets` ilə `public/video/`-ya çevrilir.
Hero video3 oynadır. Menyu video1 ilə açılır, keçidə basanda gözləmə boyu video1, video2, video3 ardıcıl oynayır.

## Qeyd

`npm run lint` yalnız öz qovluqlarımızı yoxlayır. Layihə yolunda `İ` hərfi olduğundan
ESLint-in `ignores` naxışları Windows-da düzgün uyğunlaşmır və `npx eslint .` node_modules-u da tarayır.
