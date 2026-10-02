import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { isLocale } from "@/content/types";
import { t } from "@/content/i18n";
import { Reveal } from "@/components/ui/Reveal";
import { InquiryForm } from "@/components/sections/InquiryForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = t(locale);
  return { title: d.corporate.title, description: d.corporate.lead };
}

export default async function CorporatePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = t(locale);

  return (
    <div className="pt-32 md:pt-40">
      <div className="container-x">
        <Reveal className="max-w-[52ch]">
          <h1 className="font-display text-ink text-4xl leading-tight font-light tracking-tight md:text-5xl lg:text-6xl">
            {d.corporate.title}
          </h1>
          <p className="text-muted mt-6 text-base leading-relaxed md:text-lg">
            {d.corporate.lead}
          </p>
        </Reveal>

        <ul className="mt-16 grid gap-px sm:grid-cols-2">
          {d.corporate.points.map((point, i) => (
            <Reveal
              as="li"
              key={point.title}
              delay={i * 0.06}
              className="border-line bg-surface border p-8 md:p-10"
            >
              <h2 className="font-display text-ink text-2xl font-light">
                {point.title}
              </h2>
              <p className="text-muted mt-4 text-sm leading-relaxed">
                {point.body}
              </p>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.06} className="mt-16 grid gap-4 md:grid-cols-2">
          <div className="border-line relative aspect-[4/3] overflow-hidden border">
            <Image
              src="/images/korporativ-kolleksiya-1.webp"
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="border-line relative aspect-[4/3] overflow-hidden border">
            <Image
              src="/images/sertifikat-qovlugu-1.webp"
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>

      <section className="border-line mt-24 border-t py-20 md:mt-32 md:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <h2 className="font-display text-ink text-3xl leading-tight font-light tracking-tight md:text-4xl">
              {d.inquiry.title}
            </h2>
            <p className="text-muted mt-5 max-w-[40ch] text-base leading-relaxed">
              {d.inquiry.lead}
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <InquiryForm locale={locale} />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
