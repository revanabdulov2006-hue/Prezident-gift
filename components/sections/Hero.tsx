import type { Locale } from "@/content/types";
import { t } from "@/content/i18n";
import { ButtonLink } from "@/components/ui/Button";
import { VideoLoop } from "@/components/ui/VideoLoop";
import { StarMark } from "@/components/brand/StarMark";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export function Hero({ locale }: { locale: Locale }) {
  const d = t(locale);

  return (
    <section className="relative isolate flex min-h-[100dvh] flex-col justify-end overflow-hidden">
      <VideoLoop
        name="aze-travel-2"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      {/*
        Mətnin oxunması üçün örtük. Aşağıda dərin, yuxarıda naviqasiya zolağı
        altında yüngül. Ortada şəffaf qalır ki, məhsul görünsün.
      */}
      <div className="from-bg via-bg/55 absolute inset-0 -z-10 bg-gradient-to-t via-45% to-transparent" />
      <div className="from-bg/70 absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b to-transparent" />

      <div className="container-x pb-20 pt-24 md:pb-28">
        <StarMark className="text-chrome mb-8 h-10 w-10 md:h-12 md:w-12" />

        <h1 className="font-display text-ink max-w-[18ch] text-4xl leading-[1.05] font-light tracking-tight md:text-5xl lg:text-6xl">
          {d.hero.title}
        </h1>

        <p className="text-muted mt-6 max-w-[48ch] text-base leading-relaxed md:text-lg">
          {d.hero.lead}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <ButtonLink href={`/${locale}/kolleksiya`}>
            {d.hero.ctaPrimary}
            <ArrowRight size={16} weight="light" />
          </ButtonLink>
          <ButtonLink href={`/${locale}/korporativ`} variant="outline">
            {d.hero.ctaSecondary}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
