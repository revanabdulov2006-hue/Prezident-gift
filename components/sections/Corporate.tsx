import Image from "next/image";
import type { Locale } from "@/content/types";
import { t } from "@/content/i18n";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Art, type ArtName } from "@/components/illustrations/Art";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

const POINT_ART: ArtName[] = ["medallion", "gift", "bag", "buta"];

export function Corporate({ locale }: { locale: Locale }) {
  const d = t(locale);

  return (
    <section className="border-line border-t py-24 md:py-32">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <p className="text-chrome mb-6 text-xs font-medium tracking-[0.2em] uppercase">
              {d.corporate.eyebrow}
            </p>
            <h2 className="font-display text-ink text-3xl leading-tight font-light tracking-tight md:text-4xl lg:text-5xl">
              {d.corporate.title}
            </h2>
            <p className="text-muted mt-5 max-w-[48ch] text-base leading-relaxed">
              {d.corporate.lead}
            </p>
            <ButtonLink href={`/${locale}/korporativ`} className="mt-9">
              {d.nav.corporate}
              <ArrowRight size={16} weight="light" />
            </ButtonLink>

            <div className="border-line relative mt-14 aspect-[16/10] overflow-hidden border">
              <Image
                src="/images/korporativ-kolleksiya-1.webp"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <ul className="grid gap-px sm:grid-cols-2">
            {d.corporate.points.map((point, i) => (
              <Reveal
                as="li"
                key={point.title}
                delay={i * 0.06}
                className="border-line bg-surface hover:border-line-strong border p-7 transition-colors duration-700 md:p-9"
              >
                <Art name={POINT_ART[i] ?? "star"} className="text-chrome/80 mb-6 h-16 w-16" />
                <h3 className="font-display text-ink text-xl font-light md:text-2xl">
                  {point.title}
                </h3>
                <p className="text-muted mt-4 text-sm leading-relaxed">
                  {point.body}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
