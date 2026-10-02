import Link from "next/link";
import Image from "next/image";
import type { Locale, Product } from "@/content/types";
import { priceOf } from "@/content/prices";
import { formatPrice } from "@/lib/format";
import { AddToCartButton } from "@/components/cart/AddToCart";

/**
 * Məhsul kartı. Şəkil və ad məhsul səhifəsinə aparır, səbət düyməsi ayrıca
 * hərəkətdir və keçidin içində yerləşmir (iç-içə interaktiv element olmasın).
 */
export function ProductCard({
  product,
  locale,
  sizes = "(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 24vw",
}: {
  product: Product;
  locale: Locale;
  sizes?: string;
}) {
  const href = `/${locale}/kolleksiya/${product.slug}`;
  const price = priceOf(product.slug);

  return (
    <article className="group border-line bg-surface hover:border-line-strong flex h-full flex-col border transition-colors duration-700 ease-[var(--ease-out-expo)]">
      <Link href={href} className="relative block aspect-[4/5] overflow-hidden" tabIndex={-1} aria-hidden="true">
        <Image
          src={`/images/${product.images[0]}.webp`}
          alt=""
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
        />
        <div className="from-surface/60 absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t to-transparent" />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-ink text-xl leading-snug font-light">
          <Link
            href={href}
            className="transition-colors duration-500 hover:text-chrome"
          >
            {product.name[locale]}
          </Link>
        </h3>

        <p className="text-chrome mt-2 text-sm leading-snug">{product.tagline[locale]}</p>

        <p className="text-muted mt-3 line-clamp-3 text-sm leading-relaxed">
          {product.description[locale]}
        </p>

        <div className="border-line mt-auto flex items-center justify-between gap-3 border-t pt-5">
          {price !== null && (
            <span className="font-display text-ink text-xl font-light">
              {formatPrice(price)}
            </span>
          )}
          <AddToCartButton slug={product.slug} locale={locale} />
        </div>
      </div>
    </article>
  );
}
