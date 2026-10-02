import type { Locale } from "@/content/types";
import { t } from "@/content/i18n";
import { byCategory } from "@/content/products";
import { Reveal } from "@/components/ui/Reveal";
import { ProductCard } from "@/components/ui/ProductCard";
import { Art } from "@/components/illustrations/Art";

/**
 * Üfüqi lent. Scroll snap ilə, JS olmadan işləyir.
 * Masaüstündə dörd saat ekrana sığır, mobil ekranda sürüşdürülür.
 */
export function WatchRail({ locale }: { locale: Locale }) {
  const d = t(locale);
  const watches = byCategory("saat");

  return (
    <section className="border-line overflow-hidden border-t py-24 md:py-32">
      <div className="container-x">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[40ch]">
            <h2 className="font-display text-ink text-3xl leading-tight font-light tracking-tight md:text-4xl lg:text-5xl">
              {d.watches.title}
            </h2>
            <p className="text-muted mt-5 text-base leading-relaxed">
              {d.watches.lead}
            </p>
          </div>
          <Art name="watch" className="text-chrome/60 hidden h-28 w-28 lg:block" />
        </Reveal>
      </div>

      <Reveal delay={0.06} className="mt-12">
        <ul className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 md:px-10 [scrollbar-width:thin]">
          {watches.map((product) => (
            <li
              key={product.slug}
              className="w-[78vw] shrink-0 snap-start sm:w-[42vw] lg:w-[23vw] lg:max-w-[22rem]"
            >
              <ProductCard product={product} locale={locale} />
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
