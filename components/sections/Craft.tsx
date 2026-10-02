import type { Locale } from "@/content/types";
import { t } from "@/content/i18n";
import { Reveal } from "@/components/ui/Reveal";
import { Art, type ArtName } from "@/components/illustrations/Art";
import { Girih } from "@/components/illustrations/Girih";

const STEP_ART: ArtName[] = ["gem", "dagger", "medallion", "gift"];

/**
 * Mətn və illüstrasiya əsaslı bölmə. Hər mərhələnin öz rəsmi var,
 * rəsmlər ekrana girəndə yumşaq çəkilir.
 */
export function Craft({ locale }: { locale: Locale }) {
  const d = t(locale);

  return (
    <section className="border-line relative overflow-hidden border-t py-24 md:py-32">
      <Girih className="text-chrome opacity-[0.04]" fade="radial" />
      <div className="container-x relative">
        <Reveal className="max-w-[46ch]">
          <h2 className="font-display text-ink text-3xl leading-tight font-light tracking-tight md:text-4xl lg:text-5xl">
            {d.craft.title}
          </h2>
          <p className="text-muted mt-5 text-base leading-relaxed">
            {d.craft.lead}
          </p>
        </Reveal>

        <ol className="mt-16 flex flex-col">
          {d.craft.steps.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delay={i * 0.06}
              className="border-line grid items-center gap-x-10 gap-y-5 border-t py-10 md:grid-cols-[7rem_1fr_1.2fr] md:py-12"
            >
              <Art
                name={STEP_ART[i] ?? "star"}
                className="text-chrome/80 h-24 w-24 md:h-28 md:w-28"
              />
              <div>
                <span className="font-display text-chrome text-lg leading-none font-light">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-ink mt-2 text-2xl leading-snug font-light md:text-3xl">
                  {step.title}
                </h3>
              </div>
              <p className="text-muted max-w-[56ch] text-base leading-relaxed">
                {step.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
