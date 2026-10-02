import type { Locale } from "@/content/types";
import { t } from "@/content/i18n";
import { bySlug } from "@/content/products";
import { Reveal } from "@/components/ui/Reveal";
import { VideoLoop } from "@/components/ui/VideoLoop";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Art } from "@/components/illustrations/Art";
import { Girih } from "@/components/illustrations/Girih";

/**
 * Redaksiya split: solda yapışqan mətn, sağda uzun video lenti.
 * Səhifədə bu quruluş yalnız bir dəfə təkrarlanır, zigzag yığılmasın.
 */
export function FeaturedChess({ locale }: { locale: Locale }) {
  const d = t(locale);
  const product = bySlug("strateq-chess");
  if (!product) return null;

  return (
    <section className="border-line relative overflow-x-clip border-t">
      <Girih className="text-chrome opacity-[0.05]" fade="radial" />
      <div className="container-x relative grid gap-12 py-24 md:grid-cols-2 md:gap-16 md:py-32">
        <div className="md:sticky md:top-28 md:self-start">
          <Reveal>
            <p className="text-chrome mb-6 text-xs font-medium tracking-[0.2em] uppercase">
              {d.featured.eyebrow}
            </p>
            <h2 className="font-display text-ink text-3xl leading-tight font-light tracking-tight md:text-4xl lg:text-5xl">
              {product.name[locale]}
            </h2>
            <p className="text-chrome mt-4 text-sm">{product.tagline[locale]}</p>
            <p className="text-muted mt-7 max-w-[52ch] text-base leading-relaxed">
              {product.description[locale]}
            </p>

            <dl className="border-line mt-10 grid gap-x-8 gap-y-5 border-t pt-8 sm:grid-cols-2">
              {product.specs.slice(0, 4).map((s) => (
                <div key={s.label[locale]}>
                  <dt className="text-muted text-xs">{s.label[locale]}</dt>
                  <dd className="text-ink mt-1.5 text-sm">{s.value[locale]}</dd>
                </div>
              ))}
            </dl>

            <Art name="rook" className="text-chrome/50 mt-12 h-28 w-28" />

            <ButtonLink
              href={`/${locale}/kolleksiya/${product.slug}`}
              variant="outline"
              className="mt-8"
            >
              {d.featured.cta}
              <ArrowRight size={16} weight="light" />
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal delay={0.06}>
          <div className="border-line relative aspect-[3/4] overflow-hidden border">
            <VideoLoop
              name="strateq-chess-2"
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
