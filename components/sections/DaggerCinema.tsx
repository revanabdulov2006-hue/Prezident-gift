"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "motion/react";
import type { Locale } from "@/content/types";
import { t } from "@/content/i18n";
import { bySlug } from "@/content/products";
import { VideoLoop } from "@/components/ui/VideoLoop";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Art } from "@/components/illustrations/Art";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Yapışdırılmış üfüqi keçid. Səhifədə GSAP yalnız burada işlənir.
 * Azaldılmış hərəkət rejimində panellər sadəcə şaquli yığılır.
 */
export function DaggerCinema({ locale }: { locale: Locale }) {
  const d = t(locale);
  const product = bySlug("xan-xencer");
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !track.current) return;
      // Yalnız geniş ekranda yapışdırılır, mobil ekranda şaquli axın saxlanılır.
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const el = track.current!;
        const distance = el.scrollWidth - window.innerWidth;
        if (distance <= 0) return;

        gsap.to(el, {
          x: -distance,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: root, dependencies: [reduced] },
  );

  if (!product) return null;

  return (
    <section
      ref={root}
      className="border-line relative overflow-hidden border-t lg:h-[100dvh]"
    >
      <div
        ref={track}
        className="flex flex-col gap-4 px-6 py-24 lg:h-full lg:w-max lg:flex-row lg:items-center lg:gap-6 lg:px-10 lg:py-0"
      >
        <article className="flex shrink-0 flex-col justify-center lg:h-[70vh] lg:w-[34rem]">
          <Art name="dagger" className="text-chrome/70 mb-8 h-24 w-40" />
          <h2 className="font-display text-ink text-3xl leading-tight font-light tracking-tight md:text-4xl lg:text-5xl">
            {product.name[locale]}
          </h2>
          <p className="text-chrome mt-4 text-sm">{product.tagline[locale]}</p>
          <p className="text-muted mt-7 max-w-[52ch] text-base leading-relaxed">
            {product.description[locale]}
          </p>
          <Link
            href={`/${locale}/kolleksiya/${product.slug}`}
            className="text-ink hover:text-chrome mt-9 inline-flex w-fit items-center gap-2 text-sm transition-colors duration-500"
          >
            {d.featured.cta}
            <ArrowRight size={16} weight="light" />
          </Link>
        </article>

        <div className="border-line relative aspect-[3/4] shrink-0 overflow-hidden border lg:aspect-auto lg:h-[70vh] lg:w-[28rem]">
          <VideoLoop name="xan-xencer" className="h-full w-full object-cover" />
        </div>

        {product.images.map((img) => (
          <div
            key={img}
            className="border-line relative aspect-[3/4] shrink-0 overflow-hidden border lg:aspect-auto lg:h-[70vh] lg:w-[26rem]"
          >
            <Image
              src={`/images/${img}.webp`}
              alt={product.name[locale]}
              fill
              sizes="(max-width: 1024px) 90vw, 26rem"
              className="object-cover"
            />
          </div>
        ))}

        <div className="border-line relative aspect-[3/4] shrink-0 overflow-hidden border lg:aspect-auto lg:h-[70vh] lg:w-[24rem]">
          <VideoLoop name="xan-xencer-2" className="h-full w-full object-cover" />
        </div>
      </div>
    </section>
  );
}
