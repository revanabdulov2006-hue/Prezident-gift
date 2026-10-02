import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale, CATEGORIES, type Category } from "@/content/types";
import { t } from "@/content/i18n";
import { PRODUCTS, CATEGORY_LABELS, CATEGORY_INTRO } from "@/content/products";
import { Reveal } from "@/components/ui/Reveal";
import { ProductCard } from "@/components/ui/ProductCard";
import { CategoryFilter } from "@/components/ui/CategoryFilter";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = t(locale);
  return { title: d.collection.title, description: d.collection.lead };
}

export default async function CollectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ k?: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { k } = await searchParams;

  const d = t(locale);
  const active = (CATEGORIES as readonly string[]).includes(k ?? "")
    ? (k as Category)
    : null;
  const items = active ? PRODUCTS.filter((p) => p.category === active) : PRODUCTS;

  return (
    <div className="container-x pt-32 pb-24 md:pt-40 md:pb-32">
      <Reveal className="max-w-[46ch]">
        <h1 className="font-display text-ink text-4xl leading-tight font-light tracking-tight md:text-5xl lg:text-6xl">
          {active ? CATEGORY_LABELS[active][locale] : d.collection.title}
        </h1>
        <p className="text-muted mt-5 text-base leading-relaxed">
          {active ? CATEGORY_INTRO[active][locale] : d.collection.lead}
        </p>
      </Reveal>

      <Reveal delay={0.06} className="mt-12">
        <CategoryFilter locale={locale} active={active} />
      </Reveal>

      {items.length === 0 ? (
        <p className="text-muted mt-16">{d.collection.empty}</p>
      ) : (
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((product, i) => (
            <Reveal as="li" key={product.slug} delay={Math.min(i, 5) * 0.06}>
              <ProductCard
                product={product}
                locale={locale}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </Reveal>
          ))}
        </ul>
      )}
    </div>
  );
}
