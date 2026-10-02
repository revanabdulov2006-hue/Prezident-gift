import { notFound } from "next/navigation";
import { isLocale } from "@/content/types";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Categories } from "@/components/sections/Categories";
import { FeaturedChess } from "@/components/sections/FeaturedChess";
import { WatchRail } from "@/components/sections/WatchRail";
import { Craft } from "@/components/sections/Craft";
import { DaggerCinema } from "@/components/sections/DaggerCinema";
import { Corporate } from "@/components/sections/Corporate";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <Hero locale={locale} />
      <TrustStrip locale={locale} />
      <Categories locale={locale} />
      <FeaturedChess locale={locale} />
      <WatchRail locale={locale} />
      <Craft locale={locale} />
      <DaggerCinema locale={locale} />
      <Corporate locale={locale} />
      <FinalCTA locale={locale} />
    </>
  );
}
