import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale } from "@/content/types";
import { t } from "@/content/i18n";
import { Reveal } from "@/components/ui/Reveal";
import { Checkout } from "@/components/cart/Checkout";
import { Girih } from "@/components/illustrations/Girih";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = t(locale);
  return {
    title: d.shop.checkoutTitle,
    // Ödəniş səhifəsi axtarış nəticələrində görünməməlidir.
    robots: { index: false },
  };
}

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = t(locale);

  return (
    <div className="relative overflow-x-clip">
      <Girih className="text-chrome opacity-[0.05]" fade="bottom" />
      <div className="container-x relative pt-32 pb-24 md:pt-40 md:pb-32">
        <Reveal className="max-w-[46ch]">
          <h1 className="font-display text-ink text-4xl leading-tight font-light tracking-tight md:text-5xl">
            {d.shop.checkoutTitle}
          </h1>
          <p className="text-muted mt-5 text-base leading-relaxed">{d.shop.checkoutLead}</p>
        </Reveal>
        <div className="mt-14">
          <Checkout locale={locale} />
        </div>
      </div>
    </div>
  );
}
