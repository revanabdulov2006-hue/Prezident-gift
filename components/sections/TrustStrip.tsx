import type { Locale } from "@/content/types";
import { t } from "@/content/i18n";
import { Reveal } from "@/components/ui/Reveal";
import { Art, type ArtName } from "@/components/illustrations/Art";

/**
 * Hero-nun altındakı etibar zolağı. Loqo divarı deyil, illüstrasiyalı mətn zolağıdır,
 * çünki brendin müştəriləri loqo kimi göstərilə bilən qurumlar deyil.
 */
export function TrustStrip({ locale }: { locale: Locale }) {
  const d = t(locale);
  const items: { text: string; art: ArtName }[] = [
    { text: d.trust.a, art: "medallion" },
    { text: d.trust.b, art: "watch" },
    { text: d.trust.c, art: "bag" },
    { text: d.trust.d, art: "dagger" },
  ];

  return (
    <section className="border-line border-y">
      <div className="container-x grid grid-cols-2 divide-x divide-y divide-[var(--color-line)] md:grid-cols-4 md:divide-y-0">
        {items.map((item, i) => (
          <Reveal
            key={item.text}
            delay={i * 0.06}
            className="flex items-center gap-4 px-5 py-7 first:pl-0 md:py-9"
          >
            <Art name={item.art} className="text-chrome/70 h-12 w-12 shrink-0 md:h-14 md:w-14" />
            <p className="text-muted text-sm leading-snug md:text-base">{item.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
