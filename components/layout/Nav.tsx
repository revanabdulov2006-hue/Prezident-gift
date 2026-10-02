"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "motion/react";
import { List, X, ShoppingBagOpen } from "@phosphor-icons/react";
import type { Locale } from "@/content/types";
import { t } from "@/content/i18n";
import { WordmarkInline } from "@/components/brand/Wordmark";
import { useCart } from "@/components/cart/CartProvider";
import { MenuOverlay, type MenuLink } from "./MenuOverlay";

const glass =
  "relative flex h-11 w-11 items-center justify-center rounded-full border border-white/12 " +
  "bg-white/[0.06] text-ink backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] " +
  "transition-all duration-500 ease-[var(--ease-out-expo)] " +
  "hover:border-white/30 hover:bg-white/14 active:scale-[0.96]";

export function Nav({ locale }: { locale: Locale }) {
  const d = t(locale);
  const pathname = usePathname();
  const { count, ready, openDrawer } = useCart();
  const [open, setOpen] = useState(false);
  const [lifted, setLifted] = useState(false);
  // Menyu keçidi gedərkən yol dəyişir, amma menyunu çubuq dolana qədər bağlamamalıyıq.
  const menuBusy = useRef(false);

  // Scroll hadisə dinləyicisi yerinə motion-un öz scroll dəyəri.
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setLifted(y > 24));

  // Yol dəyişəndə menyu bağlanır.
  useEffect(() => {
    if (!menuBusy.current) setOpen(false);
  }, [pathname]);

  // Menyu açıqkən arxa fon sürüşməsin, Escape ilə bağlansın.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const links: MenuLink[] = [
    { key: "collection", href: `/${locale}/kolleksiya`, label: d.nav.collection },
    { key: "corporate", href: `/${locale}/korporativ`, label: d.nav.corporate },
    { key: "about", href: `/${locale}/haqqimizda`, label: d.nav.about },
    { key: "contact", href: `/${locale}/elaqe`, label: d.nav.contact },
  ];

  return (
    <>
      <MenuOverlay
        open={open}
        locale={locale}
        links={links}
        currentPath={pathname}
        onNavigated={() => setOpen(false)}
        onBusyChange={(b) => (menuBusy.current = b)}
      />

      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-700 ease-[var(--ease-out-expo)] ${
          lifted && !open
            ? "border-line bg-bg/70 backdrop-blur-xl"
            : "border-transparent"
        }`}
      >
        <div className="container-x flex h-16 items-center justify-between gap-6 md:h-[4.5rem]">
          <Link href={`/${locale}`} aria-label="PRESIDENT">
            <WordmarkInline className="transition-opacity duration-500 hover:opacity-70" />
          </Link>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={openDrawer}
              className={glass}
              aria-label={d.shop.cartOpen}
            >
              <ShoppingBagOpen size={20} weight="light" />
              {ready && count > 0 && (
                <span className="bg-chrome text-bg absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[11px] leading-none font-semibold tabular-nums">
                  {count}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className={glass}
              aria-label={open ? d.shop.menuClose : d.shop.menuOpen}
              aria-expanded={open}
            >
              {open ? <X size={20} weight="light" /> : <List size={20} weight="light" />}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
