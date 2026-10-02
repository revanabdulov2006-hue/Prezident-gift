"use client";

import { useEffect, useRef } from "react";

/**
 * Səssiz fon lenti. Yalnız ekranda görünəndə oynayır, çıxanda dayanır,
 * belə ki eyni anda bir neçə video dekoder işləməsin.
 * Azaldılmış hərəkət rejimində yalnız poster göstərilir.
 */
export function VideoLoop({
  name,
  className = "",
  poster = true,
}: {
  /** public/video/<name>.mp4 və public/poster/<name>.webp */
  name: string;
  className?: string;
  poster?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Avtomatik oynatma brauzer tərəfindən rədd edilə bilər, poster qalır.
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.15 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      poster={poster ? `/poster/${name}.webp` : undefined}
      muted
      loop
      playsInline
      preload="metadata"
      // Autoplay JS tərəfindən idarə olunur, atribut kimi verilmir.
      aria-hidden="true"
      tabIndex={-1}
    >
      <source src={`/video/${name}.webm`} type="video/webm" />
      <source src={`/video/${name}.mp4`} type="video/mp4" />
    </video>
  );
}
