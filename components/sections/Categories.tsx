import Link from "next/link";
import Image from "next/image";
import type { Locale, Category } from "@/content/types";
import { t } from "@/content/i18n";
import { CATEGORY_LABELS, CATEGORY_INTRO, byCategory } from "@/content/products";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Art, type ArtName } from "@/components/illustrations/Art";

/**
 * Asimmetrik bento: solda hündür saat hücrəsi, sağda iki qısa hücrə.
 * Üç bərabər kart deyil, çünki kateqoriyaların çəkisi bərabər deyil.
 */
export function Categories({ locale }: { locale: Locale }) {
  const d = t(locale);

  const cells: { c: Category; image: string; tall: boolean; art: ArtName }[] = [
    { c: "saat", image: "aze-series-blue-4", tall: true, art: "watch" },
    { c: "deri", image: "aze-travel-1", tall: false, art: "bag" },
    { c: "kolleksiya", image: "xan-xencer-1", tall: false, art: "dagger" },
  ];

  return (
    <section className="container-x py-24 md:py-32">
      <Reveal className="max-w-[46ch]">
        <h2 className="font-display text-ink text-3xl leading-tight font-light tracking-tight md:text-4xl lg:text-5xl">
          {d.categories.title}
        </h2>
        <p className="text-muted mt-5 text-base leading-relaxed">
          {d.categories.lead}
        </p>
      </Reveal>

      <div className="mt-14 grid gap-4 md:grid-cols-2 md:grid-rows-2">
        {cells.map((cell, i) => (
          <Reveal
            key={cell.c}
            delay={i * 0.06}
            className={cell.tall ? "md:row-span-2" : undefined}
          >
            <Link
              href={`/${locale}/kolleksiya?k=${cell.c}`}
              className="group border-line bg-surface hover:border-line-strong relative flex h-full flex-col justify-end overflow-hidden border transition-colors duration-500 ease-[var(--ease-out-expo)]"
            >
              <div
                className={`relative w-full ${cell.tall ? "aspect-[4/5] md:aspect-auto md:h-full md:min-h-[32rem]" : "aspect-[16/10]"}`}
              >
                <Image
                  src={`/images/${cell.image}.webp`}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover opacity-70 transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03] group-hover:opacity-90"
                />
                <div className="from-bg via-bg/60 absolute inset-0 bg-gradient-to-t to-transparent" />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <Art name={cell.art} className="text-chrome/80 mb-4 h-14 w-14" />
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-ink text-2xl font-light md:text-3xl">
                    {CATEGORY_LABELS[cell.c][locale]}
                  </h3>
                  <ArrowUpRight
                    size={20}
                    weight="light"
                    className="text-chrome mt-1 shrink-0 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
                <p className="text-muted mt-3 max-w-[42ch] text-sm leading-relaxed">
                  {CATEGORY_INTRO[cell.c][locale]}
                </p>
                <p className="text-muted mt-4 text-xs">
                  {byCategory(cell.c).length} {d.collection.count}
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
