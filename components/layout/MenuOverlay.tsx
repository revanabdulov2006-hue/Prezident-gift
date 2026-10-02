"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { InstagramLogo, WhatsappLogo } from "@phosphor-icons/react";
import type { Locale } from "@/content/types";
import { t } from "@/content/i18n";
import { SITE, whatsappUrl } from "@/content/site";
import { VideoLoop } from "@/components/ui/VideoLoop";
import { Girih } from "@/components/illustrations/Girih";
import { LocaleSwitch } from "./LocaleSwitch";

/**
 * Menyunun fon videoları. Hamısı layihənin kökündəki fayllardır:
 * video1.MP4, video2.MP4, video3.MP4 (public/video/video1.mp4 və s.).
 * Menyu açılanda video1 oynayır. Keçidə basanda gözləmə boyu video1, video2, video3 ardıcıl oynayır.
 */
const WAIT_VIDEOS = ["video1", "video2", "video3"] as const;
const DEFAULT_VIDEO = WAIT_VIDEOS[0];

/** Keçidə yaxınlaşanda fonda həmin keçidin videosu açılır. */
const LINK_VIDEO: Record<string, (typeof WAIT_VIDEOS)[number]> = {
  collection: "video1",
  corporate: "video2",
  about: "video3",
  contact: "video1",
};

/** Basılandan sonra səhifəyə keçidə qədər olan müddət (ms). */
const FILL_MS = 2000;
const FILL_EASE = [0.65, 0, 0.35, 1] as const;
const SOFT = [0.16, 1, 0.3, 1] as const;

export interface MenuLink {
  key: "collection" | "corporate" | "about" | "contact";
  href: string;
  label: string;
}

interface Pending {
  key: string;
  href: string;
}

export function MenuOverlay({
  open,
  locale,
  links,
  currentPath,
  onNavigated,
  onBusyChange,
}: {
  open: boolean;
  locale: Locale;
  links: MenuLink[];
  currentPath: string;
  /** Eyni səhifəyə keçid olanda yol dəyişmir, menyunu bağlamaq üçün çağırılır. */
  onNavigated: () => void;
  /** Keçid gedərkən true. Bu müddətdə yol dəyişsə belə Nav menyunu özü bağlamır. */
  onBusyChange: (busy: boolean) => void;
}) {
  const d = t(locale);
  const router = useRouter();
  const reduced = useReducedMotion();
  const [pending, setPending] = useState<Pending | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [timerDone, setTimerDone] = useState(false);
  const timer = useRef<number | null>(null);
  const [waitIndex, setWaitIndex] = useState(0);

  // Menyu bağlananda vəziyyəti sıfırla.
  useEffect(() => {
    if (!open) {
      setPending(null);
      setHover(null);
      setTimerDone(false);
      onBusyChange(false);
      if (timer.current) window.clearTimeout(timer.current);
      return;
    }
    // Menyu açılan kimi dörd səhifə də əvvəlcədən yüklənir ki, keçid anında olsun.
    links.forEach((l) => router.prefetch(l.href));
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  // Çubuq dolub (2 s) VƏ yeni səhifə hazırdırsa menyu bağlanır. Səhifə artıq arxada render olunub.
  useEffect(() => {
    if (pending && timerDone && currentPath === pending.href) {
      onBusyChange(false);
      onNavigated();
    }
  }, [pending, timerDone, currentPath]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    [],
  );

  // Gözləmə müddəti üç bərabər hissəyə bölünür, hər hissədə növbəti video.
  useEffect(() => {
    if (!pending) {
      setWaitIndex(0);
      return;
    }
    const step = FILL_MS / WAIT_VIDEOS.length;
    const ids = [1, 2].map((n) =>
      window.setTimeout(() => setWaitIndex(n), step * n),
    );
    return () => ids.forEach((id) => window.clearTimeout(id));
  }, [pending]);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, link: MenuLink) => {
    // Yeni tabda açma və s. brauzerin öz davranışında qalır.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    if (pending) return;

    const samePage = link.href === currentPath;

    if (reduced) {
      if (samePage) onNavigated();
      else router.push(link.href);
      return;
    }

    // Gecikmə olmasın deyə yeni səhifə dərhal yüklənməyə başlayır və menyunun arxasında
    // render olunur. Çubuq 2 saniyəyə dolanda menyu bağlanır və səhifə artıq hazırdır.
    onBusyChange(true);
    setTimerDone(false);
    setPending({ key: link.key, href: link.href });
    if (!samePage) router.push(link.href);
    timer.current = window.setTimeout(() => setTimerDone(true), FILL_MS);
  };

  const activeVideo = pending
    ? WAIT_VIDEOS[waitIndex]
    : hover
      ? LINK_VIDEO[hover]
      : DEFAULT_VIDEO;

  const wa = whatsappUrl();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="menu"
          className="bg-bg fixed inset-0 z-40 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35, ease: SOFT } }}
          transition={{ duration: 0.6, ease: SOFT }}
        >
          {/* Fon videosu. Keçid üzərinə gələndə yumşaq şəkildə dəyişir. */}
          <AnimatePresence initial={false}>
            <motion.div
              key={activeVideo}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: pending ? 0.5 : 0.9, ease: SOFT }}
            >
              <VideoLoop name={activeVideo} className="h-full w-full object-cover" />
            </motion.div>
          </AnimatePresence>

          <div className="from-bg/90 via-bg/70 to-bg/90 absolute inset-0 bg-gradient-to-b" />
          <Girih className="text-chrome opacity-[0.07]" fade="radial" />

          {/* Yükləmə çubuğu: ekranın ortasında, keçid gözləməsi boyu soldan sağa dolur. */}
          <AnimatePresence>
            {pending && (
              <motion.div
                key="progress"
                className="pointer-events-none fixed inset-0 z-30 grid place-items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: SOFT }}
              >
                <div
                  role="progressbar"
                  aria-label={d.nav.menu}
                  className="w-[min(22rem,70vw)] rounded-full border border-white/15 bg-black/30 p-3 shadow-[0_8px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl"
                >
                  <div className="h-[3px] overflow-hidden rounded-full bg-white/15">
                    <motion.div
                      className="bg-chrome h-full origin-left"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: FILL_MS / 1000, ease: "linear" }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="container-x relative z-20 flex min-h-[100dvh] flex-col justify-center py-28">
            <nav aria-label="Menu">
              <ul
                className="flex flex-col"
                onMouseLeave={() => !pending && setHover(null)}
              >
                {links.map((link, i) => {
                  const isPending = pending?.key === link.key;
                  const dim = pending && !isPending;
                  return (
                    <motion.li
                      key={link.key}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: dim ? 0.15 : 1, y: 0 }}
                      transition={{
                        duration: dim ? 0.8 : 0.7,
                        delay: pending ? 0 : 0.15 + i * 0.07,
                        ease: SOFT,
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={(e) => go(e, link)}
                        onMouseEnter={() => !pending && setHover(link.key)}
                        onFocus={() => !pending && setHover(link.key)}
                        aria-current={link.href === currentPath ? "page" : undefined}
                        className="group relative block py-1.5 md:py-2"
                      >
                        {/* Kontur mətn */}
                        <span
                          className="font-display block text-5xl leading-[1.05] font-light tracking-tight text-transparent [transition:-webkit-text-stroke-color_700ms_ease] [-webkit-text-stroke:1px_rgba(242,242,240,0.6)] group-hover:[-webkit-text-stroke-color:rgba(242,242,240,0.95)] md:text-7xl lg:text-8xl"
                        >
                          {link.label}
                        </span>
                        {/* Dolan mətn: soldan sağa açılır. */}
                        <motion.span
                          aria-hidden="true"
                          className="font-display text-ink pointer-events-none absolute inset-x-0 top-1.5 block text-5xl leading-[1.05] font-light tracking-tight md:top-2 md:text-7xl lg:text-8xl"
                          initial={false}
                          animate={{
                            clipPath: isPending ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
                          }}
                          transition={{
                            duration: isPending ? FILL_MS / 1000 - 0.1 : 0,
                            ease: FILL_EASE,
                          }}
                        >
                          {link.label}
                        </motion.span>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            <motion.div
              className="border-line mt-14 flex flex-wrap items-center justify-between gap-6 border-t pt-7"
              initial={{ opacity: 0 }}
              animate={{ opacity: pending ? 0 : 1 }}
              transition={{ duration: 0.7, delay: pending ? 0 : 0.5, ease: SOFT }}
            >
              <LocaleSwitch locale={locale} />
              <div className="flex items-center gap-3">
                <a
                  href={SITE.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={d.shop.instagram}
                  className="text-ink flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.05] backdrop-blur-xl transition-all duration-500 hover:border-white/30 hover:bg-white/12"
                >
                  <InstagramLogo size={20} weight="light" />
                </a>
                {wa && (
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={d.shop.whatsapp}
                    className="text-ink flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.05] backdrop-blur-xl transition-all duration-500 hover:border-white/30 hover:bg-white/12"
                  >
                    <WhatsappLogo size={20} weight="light" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
