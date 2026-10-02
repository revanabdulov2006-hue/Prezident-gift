import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { notFound } from "next/navigation";
import { LOCALES, isLocale, type Locale } from "@/content/types";
import { t } from "@/content/i18n";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/components/cart/CartProvider";
import { CartDrawer } from "@/components/cart/CartDrawer";
import "../globals.css";

/**
 * Hər iki şrift latin-ext (Azərbaycan ə, ğ, ı, ş) və cyrillic (rus) altçoxluqlarını
 * daşıyır. Altçoxluqlar burada açıq göstərilir, çünki standart dəst yalnız latin-dir.
 */
const display = Cormorant_Garamond({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["300", "400", "500"],
  variable: "--font-cormorant",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = t(locale);

  return {
    metadataBase: new URL("https://presidentgift.az"),
    title: { default: d.meta.title, template: "%s · PRESIDENT" },
    description: d.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(LOCALES.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      type: "website",
      siteName: d.meta.title,
      title: d.meta.title,
      description: d.meta.description,
      locale,
      images: ["/brand/og.webp"],
    },
    icons: { icon: "/brand/icon.svg" },
  };
}

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html
      lang={locale}
      className={`${display.variable} ${sans.variable}`}
      suppressHydrationWarning
    >
      {/* Brauzer əlavələri body-yə atribut yazır (məs. data-smart-converter-loaded), bu uyğunsuzluq xətası verməsin. */}
      <body className="min-h-[100dvh] antialiased" suppressHydrationWarning>
        <a
          href="#main"
          className="bg-chrome text-bg sr-only rounded-full px-4 py-2 text-sm font-medium focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100"
        >
          Əsas məzmuna keç
        </a>
        <CartProvider>
          <Nav locale={locale as Locale} />
          <main id="main">{children}</main>
          <Footer locale={locale as Locale} />
          <CartDrawer locale={locale as Locale} />
        </CartProvider>
      </body>
    </html>
  );
}
