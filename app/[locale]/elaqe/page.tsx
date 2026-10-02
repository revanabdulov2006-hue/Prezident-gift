import { notFound } from "next/navigation";
import type { Metadata } from "next";
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
  return { title: d.nav.contact, description: d.inquiry.lead };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = t(locale);

  return (
    <div className="container-x pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal>
          <h1 className="font-display text-ink text-4xl leading-tight font-light tracking-tight md:text-5xl">
            {d.inquiry.title}
          </h1>
          <p className="text-muted mt-6 max-w-[40ch] text-base leading-relaxed">
            {d.inquiry.lead}
          </p>

          <dl className="border-line mt-12 flex flex-col gap-5 border-t pt-8 text-sm">
            <div>
              <dt className="text-muted text-xs">{d.footer.contact}</dt>
              <dd className="text-ink mt-1.5">{d.footer.address}</dd>
            </div>
            <div>
              <dt className="text-muted text-xs">{d.inquiry.phone}</dt>
              <dd className="text-ink mt-1.5">{d.footer.phone}</dd>
            </div>
            <div>
              <dt className="text-muted text-xs">{d.inquiry.email}</dt>
              <dd className="text-ink mt-1.5">{d.footer.email}</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={0.06}>
          <InquiryForm locale={locale} />
        </Reveal>
      </div>
    </div>
  );
}
