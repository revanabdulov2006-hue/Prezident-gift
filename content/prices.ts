/**
 * Qiymətlər AZN ilə, tam ədədlə.
 *
 * TODO: BU DƏYƏRLƏR YER TUTUCUDUR. Real qiymətlər mənə verilməyib.
 * Sifariş API-si cəmi buradakı dəyərlərdən hesablayır, klientin göndərdiyi
 * qiymətə etibar etmir, ona görə yalnız bu faylı dəyişmək kifayətdir.
 */
export const PRICES: Record<string, number> = {
  "aze-series-silver": 450,
  "aze-series-blue": 480,
  "signature-gold": 1200,
  "bt-24-green": 390,
  "aze-travel": 320,
  "aze-barsetka": 280,
  "personal-mark-folio": 240,
  "aze-boston": 520,
  "korporativ-kolleksiya": 1800,
  "strateq-chess": 2400,
  "xan-xencer": 3200,
  "azerbaycan-plaketi": 900,
  "xatire-stellasi": 350,
};

export const priceOf = (slug: string): number | null => PRICES[slug] ?? null;
