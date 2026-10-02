import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale, LOCALES } from "@/content/types";
import { t } from "@/content/i18n";
import { PRODUCTS, bySlug, byCategory, CATEGORY_LABELS } from "@/content/products";
import { priceOf } from "@/content/prices";
import { formatPrice } from "@/lib/format";
import { Reveal } from "@/components/ui/Reveal";
import { ProductCard } from "@/components/ui/ProductCard";
import { ProductGallery } from "@/components/ui/ProductGallery";
import { BackButton } from "@/components/ui/BackButton";
import { ProductBuy } from "@/components/cart/AddToCart";
import { Art, type ArtName } from "@/components/illustrations/Art";
import { Girih } from "@/components/illustrations/Girih";
import { Ornament } from "@/components/illustrations/Ornament";

/** Hər məhsula uyğun illüstrasiya. */
const ART_FOR: Record<string, ArtName> = {
  "strateq-chess": "rook",
  "xan-xencer": "dagger",
  "azerbaycan-plaketi": "medallion",
  "xatire-stellasi": "buta",
};
const artFor = (slug: string, category: string): ArtName =>
  ART_FOR[slug] ?? (category === "saat" ? "watch" : category === "deri" ? "bag" : "star");

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    PRODUCTS.map((p) => ({ locale, slug: p.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = bySlug(slug);
  if (!isLocale(locale) || !product) return {};

  return {
    title: product.name[locale],
    description: product.tagline[locale],
    openGraph: {
      title: product.name[locale],
      description: product.tagline[locale],
      images: [`/images/${product.images[0]}.webp`],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const product = bySlug(slug);
  if (!product) notFound();

  const d = t(locale);
  const price = priceOf(product.slug);
  const related = byCategory(product.category)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3);

  return (
    <div className="relative overflow-x-clip pt-24 md:pt-28">
      <Girih className="text-chrome opacity-[0.04]" fade="bottom" cell={104} />

      <div className="container-x relative">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Qalereya: şəkil və video bir yerdə, geri düyməsi səhnənin üstündə. */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ProductGallery
              name={product.name[locale]}
              images={product.images}
              video={product.video}
              locale={locale}
            >
              <BackButton locale={locale} className="absolute top-4 left-4 z-10" />
            </ProductGallery>
          </div>

          {/* Məlumat */}
          <div className="lg:pt-4">
            <Reveal>
              <p className="text-chrome text-xs font-medium tracking-[0.2em] uppercase">
                {CATEGORY_LABELS[product.category][locale]}
              </p>
              <h1 className="font-display text-ink mt-5 text-3xl leading-tight font-light tracking-tight md:text-4xl lg:text-5xl">
                {product.name[locale]}
              </h1>
              <p className="text-chrome mt-4 text-sm">{product.tagline[locale]}</p>

              {price !== null && (
                <p className="font-display text-ink mt-8 text-4xl font-light">
                  {formatPrice(price)}
                </p>
              )}

              <div className="mt-8">
                <ProductBuy slug={product.slug} locale={locale} />
              </div>

              <p className="text-muted mt-5 text-xs leading-relaxed">
                {d.shop.deliveryNote}
              </p>
            </Reveal>

            <Reveal delay={0.06} className="mt-12">
              <p className="text-muted text-base leading-relaxed">
                {product.description[locale]}
              </p>

              <h2 className="text-ink border-line mt-12 border-t pt-8 text-xs font-semibold">
                {d.product.specs}
              </h2>
              <dl className="mt-5 flex flex-col gap-4">
                {product.specs.map((s) => (
                  <div
                    key={s.label[locale]}
                    className="grid grid-cols-[9rem_1fr] gap-4 text-sm"
                  >
                    <dt className="text-muted">{s.label[locale]}</dt>
                    <dd className="text-ink">{s.value[locale]}</dd>
                  </div>
                ))}
              </dl>

              <Art
                name={artFor(product.slug, product.category)}
                className="text-chrome/45 mt-14 h-40 w-40"
              />
            </Reveal>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="border-line relative mt-24 border-t py-20 md:mt-32 md:py-24">
          <div className="container-x">
            <Ornament className="mb-14" />
            <Reveal>
              <h2 className="font-display text-ink text-2xl font-light tracking-tight md:text-3xl">
                {d.product.related}
              </h2>
            </Reveal>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <Reveal as="li" key={p.slug} delay={i * 0.06}>
                  <ProductCard
                    product={p}
                    locale={locale}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}
