"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, type PanInfo } from "motion/react";
import type { Locale } from "@/content/types";
import { t } from "@/content/i18n";
import { VideoLoop } from "./VideoLoop";

type Slide = { kind: "video"; name: string } | { kind: "image"; name: string };

const SOFT = [0.16, 1, 0.3, 1] as const;

/**
 * Şəkil və videonun bir yerdə göstərildiyi qalereya: böyük səhnə və miniatür sırası.
 * Keçid ox düymələri ilə deyil: miniatürə toxunmaq, səhnəni sürüşdürmək
 * və ya klaviatura (sol/sağ) ilə edilir. Kadrlar blur və miqyasla yumşaq əvəzlənir.
 */
export function ProductGallery({
  name,
  images,
  video,
  locale,
  children,
}: {
  name: string;
  images: string[];
  video?: string;
  locale: Locale;
  /** Səhnənin üstündə göstərilən element (məs. geri düyməsi). */
  children?: React.ReactNode;
}) {
  const d = t(locale);
  const slides: Slide[] = [
    ...(video ? [{ kind: "video", name: video } as Slide] : []),
    ...images.map((n) => ({ kind: "image", name: n }) as Slide),
  ];

  const [index, setIndex] = useState(0);
  const dir = useRef(1);

  const go = (next: number) => {
    const clamped = Math.min(slides.length - 1, Math.max(0, next));
    if (clamped === index) return;
    dir.current = clamped > index ? 1 : -1;
    setIndex(clamped);
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const power = Math.abs(info.offset.x) > 70 || Math.abs(info.velocity.x) > 450;
    if (!power) return;
    go(index + (info.offset.x < 0 ? 1 : -1));
  };

  const current = slides[index];

  return (
    <div>
      <div
        className="border-line bg-surface relative aspect-[4/5] touch-pan-y overflow-hidden border outline-none lg:aspect-auto lg:h-[calc(100dvh-14rem)] lg:min-h-[26rem]"
        role="group"
        aria-roledescription="carousel"
        aria-label={d.shop.galleryAria}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(index + 1);
          if (e.key === "ArrowLeft") go(index - 1);
        }}
      >
        <AnimatePresence initial={false} custom={dir.current}>
          <motion.div
            key={index}
            custom={dir.current}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
            variants={{
              enter: (k: number) => ({
                opacity: 0,
                x: k * 36,
                scale: 1.05,
                filter: "blur(10px)",
              }),
              center: { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" },
              exit: (k: number) => ({
                opacity: 0,
                x: k * -24,
                scale: 0.99,
                filter: "blur(8px)",
              }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.85, ease: SOFT }}
            drag={slides.length > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={onDragEnd}
          >
            {current.kind === "video" ? (
              <VideoLoop name={current.name} className="h-full w-full object-cover" />
            ) : (
              <Image
                src={`/images/${current.name}.webp`}
                alt={`${name}, ${d.shop.galleryItem} ${index + 1}`}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                priority={index === 0}
                draggable={false}
                className="pointer-events-none object-cover select-none"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {children}

        {slides.length > 1 && (
          <p className="text-ink/80 pointer-events-none absolute right-4 bottom-4 z-10 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs tabular-nums backdrop-blur-xl">
            {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </p>
        )}
      </div>

      {slides.length > 1 && (
        <ul className="mt-3 flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none]">
          {slides.map((slide, i) => {
            const active = i === index;
            const src =
              slide.kind === "video"
                ? `/poster/${slide.name}.webp`
                : `/images/${slide.name}.webp`;
            return (
              <li key={`${slide.kind}-${slide.name}`} className="shrink-0">
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`${d.shop.galleryItem} ${i + 1}`}
                  aria-current={active ? "true" : undefined}
                  className="relative block h-20 w-16 overflow-hidden"
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="64px"
                    className={`object-cover transition-all duration-700 ease-[var(--ease-out-expo)] ${
                      active ? "opacity-100" : "opacity-45 hover:opacity-80"
                    }`}
                  />
                  {active && (
                    <motion.span
                      layoutId="thumb-ring"
                      className="border-chrome pointer-events-none absolute inset-0 border"
                      transition={{ duration: 0.6, ease: SOFT }}
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
