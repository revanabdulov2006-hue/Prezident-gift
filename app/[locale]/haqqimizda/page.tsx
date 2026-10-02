import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { isLocale } from "@/content/types";
import { t } from "@/content/i18n";
import { PRODUCTS } from "@/content/products";
import { Reveal } from "@/components/ui/Reveal";
import { Wordmark } from "@/components/brand/Wordmark";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = t(locale);
  return { title: d.about.title, description: d.about.lead };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = t(locale);

  const stats = [
    { value: String(PRODUCTS.length), label: d.collection.count },
    { value: "3", label: d.categories.title },
    { value: "100", label: "Signature Gold" },
    { value: "4", label: d.craft.title },
  ];

  return (
    <div className="pt-32 md:pt-40">
      <div className="container-x">
        <Reveal className="max-w-[52ch]">
          <Wordmark size="lg" className="items-start" />
          <h1 className="font-display text-ink mt-12 text-4xl leading-tight font-light tracking-tight md:text-5xl lg:text-6xl">
            {d.about.title}
          </h1>
          <p className="text-muted mt-6 text-base leading-relaxed md:text-lg">
            {d.about.lead}
          </p>
        </Reveal>

        <div className="mt-20 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <Reveal className="flex flex-col gap-6">
            {d.about.body.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="text-muted max-w-[62ch] text-base leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.06}>
            <div className="border-line relative aspect-[4/5] overflow-hidden border">
              <Image
                src="/images/xan-xencer-1.webp"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>

        <section className="border-line mt-24 border-t pt-12 md:mt-32">
          <h2 className="text-ink text-xs font-semibold">{d.about.statsTitle}</h2>
          <dl className="mt-10 grid grid-cols-2 gap-10 md:grid-cols-4">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.06}>
                <dt className="font-display text-chrome text-4xl leading-none font-light md:text-5xl">
                  {stat.value}
                </dt>
                <dd className="text-muted mt-3 text-sm">{stat.label}</dd>
              </Reveal>
            ))}
          </dl>
        </section>
      </div>

      <div className="h-24 md:h-32" />
    </div>
  );
}
