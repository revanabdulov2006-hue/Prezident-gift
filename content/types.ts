export const LOCALES = ["az", "en", "ru"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "az";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Hər mətn sahəsi üç dildə saxlanılır. */
export type Localized = Record<Locale, string>;

export const CATEGORIES = ["saat", "deri", "kolleksiya"] as const;
export type Category = (typeof CATEGORIES)[number];

export interface Spec {
  label: Localized;
  value: Localized;
}

export interface Product {
  slug: string;
  category: Category;
  name: Localized;
  /** Kart altında görünən bir sətirlik təsvir. */
  tagline: Localized;
  /** Məhsul səhifəsindəki tam mətn. */
  description: Localized;
  specs: Spec[];
  images: string[];
  /** public/video/<name>.mp4 və public/poster/<name>.webp */
  video?: string;
  /** Ana səhifədə ayrıca bölmədə göstərilir. */
  featured?: boolean;
}
