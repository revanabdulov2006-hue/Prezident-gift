"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Minus, Plus, X, Trash } from "@phosphor-icons/react";
import type { Locale } from "@/content/types";
import { t } from "@/content/i18n";
import { bySlug } from "@/content/products";
import { priceOf } from "@/content/prices";
import { formatPrice } from "@/lib/format";
import { Art } from "@/components/illustrations/Art";
import { Girih } from "@/components/illustrations/Girih";
import { useCart } from "./CartProvider";

const glassBtn =
  "flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] " +
  "text-ink backdrop-blur-xl transition-all duration-500 ease-[var(--ease-out-expo)] " +
  "hover:border-white/25 hover:bg-white/10 active:scale-[0.96]";

export function CartDrawer({ locale }: { locale: Locale }) {
  const d = t(locale);
  const { lines, subtotal, count, drawerOpen, closeDrawer, setQty, remove } = useCart();

  // Escape ilə bağlanır, açıqkən arxa fon sürüşmür.
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeDrawer();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [drawerOpen, closeDrawer]);

  return (
    <AnimatePresence>
      {drawerOpen && (
        <>
          <motion.div
            key="scrim"
            className="fixed inset-0 z-[70] bg-black/55 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={closeDrawer}
          />
          <motion.aside
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-label={d.shop.cartTitle}
            className="border-line bg-bg/85 fixed top-0 right-0 bottom-0 z-[71] flex w-full max-w-[26rem] flex-col overflow-hidden border-l backdrop-blur-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", duration: 0.55, bounce: 0 }}
          >
            <Girih className="text-chrome opacity-[0.06]" fade="bottom" cell={72} />

            <header className="border-line relative flex items-center justify-between border-b px-6 py-5">
              <h2 className="font-display text-ink text-2xl font-light">
                {d.shop.cartTitle}
                {count > 0 && (
                  <span className="text-muted ml-3 font-sans text-sm">
                    {count} {d.shop.itemsLabel}
                  </span>
                )}
              </h2>
              <button
                type="button"
                onClick={closeDrawer}
                className={glassBtn}
                aria-label={d.shop.cartClose}
              >
                <X size={16} weight="light" />
              </button>
            </header>

            {lines.length === 0 ? (
              <div className="relative flex flex-1 flex-col items-center justify-center px-8 text-center">
                <Art name="bag" className="text-chrome/50 h-36 w-36" />
                <p className="font-display text-ink mt-6 text-2xl font-light">
                  {d.shop.cartEmpty}
                </p>
                <p className="text-muted mt-3 max-w-[28ch] text-sm leading-relaxed">
                  {d.shop.cartEmptyLead}
                </p>
                <Link
                  href={`/${locale}/kolleksiya`}
                  onClick={closeDrawer}
                  className="bg-chrome text-bg hover:bg-ink mt-8 inline-flex rounded-full px-6 py-3 text-sm font-medium transition-all duration-500 ease-[var(--ease-out-expo)] active:scale-[0.98]"
                >
                  {d.shop.continueShopping}
                </Link>
              </div>
            ) : (
              <>
                <ul className="relative flex-1 divide-y divide-[var(--color-line)] overflow-y-auto px-6">
                  <AnimatePresence initial={false}>
                    {lines.map((line) => {
                      const product = bySlug(line.slug);
                      const price = priceOf(line.slug);
                      if (!product || price === null) return null;
                      return (
                        <motion.li
                          key={line.slug}
                          layout="position"
                          className="flex gap-4 py-5"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <Link
                            href={`/${locale}/kolleksiya/${product.slug}`}
                            onClick={closeDrawer}
                            className="border-line bg-surface relative h-24 w-20 shrink-0 overflow-hidden border"
                          >
                            <Image
                              src={`/images/${product.images[0]}.webp`}
                              alt=""
                              fill
                              sizes="80px"
                              className="object-cover"
                            />
                          </Link>

                          <div className="flex min-w-0 flex-1 flex-col">
                            <Link
                              href={`/${locale}/kolleksiya/${product.slug}`}
                              onClick={closeDrawer}
                              className="font-display text-ink hover:text-chrome text-lg leading-snug font-light transition-colors duration-500"
                            >
                              {product.name[locale]}
                            </Link>
                            <p className="text-muted mt-1 text-sm">{formatPrice(price)}</p>

                            <div className="mt-auto flex items-center justify-between pt-3">
                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  className={glassBtn}
                                  aria-label={d.shop.decrease}
                                  onClick={() => setQty(line.slug, line.qty - 1)}
                                >
                                  <Minus size={14} weight="light" />
                                </button>
                                <span className="text-ink w-8 text-center text-sm tabular-nums">
                                  {line.qty}
                                </span>
                                <button
                                  type="button"
                                  className={glassBtn}
                                  aria-label={d.shop.increase}
                                  onClick={() => setQty(line.slug, line.qty + 1)}
                                >
                                  <Plus size={14} weight="light" />
                                </button>
                              </div>
                              <button
                                type="button"
                                className="text-muted hover:text-ink p-2 transition-colors duration-500"
                                aria-label={d.shop.remove}
                                onClick={() => remove(line.slug)}
                              >
                                <Trash size={16} weight="light" />
                              </button>
                            </div>
                          </div>
                        </motion.li>
                      );
                    })}
                  </AnimatePresence>
                </ul>

                <footer className="border-line relative border-t px-6 py-6">
                  <div className="flex items-baseline justify-between">
                    <span className="text-muted text-sm">{d.shop.subtotal}</span>
                    <span className="font-display text-ink text-3xl font-light">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <p className="text-muted mt-2 text-xs leading-relaxed">
                    {d.shop.deliveryNote}
                  </p>
                  <Link
                    href={`/${locale}/sifaris`}
                    onClick={closeDrawer}
                    className="bg-chrome text-bg hover:bg-ink mt-5 flex w-full items-center justify-center rounded-full px-6 py-3.5 text-sm font-medium transition-all duration-500 ease-[var(--ease-out-expo)] active:scale-[0.98]"
                  >
                    {d.shop.checkout}
                  </Link>
                </footer>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
