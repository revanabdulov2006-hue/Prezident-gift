import type { Locale } from "@/content/types";
import { t } from "@/content/i18n";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Art } from "@/components/illustrations/Art";
import { Girih } from "@/components/illustrations/Girih";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

/** Səhifənin sonu: girih fonu və dörd illüstrasiya, kolleksiyaya dəvət. */
export function FinalCTA({ locale }: { locale: Locale }) {
  const d = t(locale);

  return (
    <section className="border-line relative overflow-hidden border-t py-28 md:py-40">
      <Girih className="text-chrome opacity-[0.09]" fade="radial" />

      <div className="container-x relative flex flex-col items-center text-center">
        <Reveal className="flex items-center gap-6 md:gap-10">
          <Art name="watch" className="text-chrome/70 h-16 w-16 md:h-24 md:w-24" />
          <Art name="bag" className="text-chrome/70 hidden h-16 w-16 sm:block md:h-24 md:w-24" />
          <Art name="rook" className="text-chrome/70 h-16 w-16 md:h-24 md:w-24" />
          <Art name="dagger" className="text-chrome/70 hidden h-16 w-16 sm:block md:h-24 md:w-24" />
        </Reveal>

        <Reveal delay={0.06}>
          <h2 className="font-display text-ink mt-12 text-4xl leading-tight font-light tracking-tight md:text-5xl lg:text-6xl">
            {d.shop.finalTitle}
          </h2>
          <p className="text-muted mx-auto mt-5 max-w-[44ch] text-base leading-relaxed">
            {d.shop.finalLead}
          </p>
          <ButtonLink href={`/${locale}/kolleksiya`} className="mt-10">
            {d.shop.finalCta}
            <ArrowRight size={16} weight="light" />
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
