"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBagOpen, Minus, Plus } from "@phosphor-icons/react";
import type { Locale } from "@/content/types";
import { t } from "@/content/i18n";
import { useCart } from "./CartProvider";

const pill =
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium " +
  "transition-all duration-500 ease-[var(--ease-out-expo)] active:scale-[0.97]";

/** Kartlarda: kiçik şüşə düymə, səbəti açır. */
export function AddToCartButton({
  slug,
  locale,
}: {
  slug: string;
  locale: Locale;
}) {
  const d = t(locale);
  const { add } = useCart();

  return (
    <button
      type="button"
      onClick={() => add(slug, 1)}
      className={`${pill} text-ink border border-white/12 bg-white/[0.05] px-4 py-2.5 backdrop-blur-xl hover:border-white/30 hover:bg-white/12`}
    >
      <ShoppingBagOpen size={16} weight="light" />
      {d.shop.addShort}
    </button>
  );
}

/** Məhsul səhifəsində: say seçimi, səbətə at və dərhal al. */
export function ProductBuy({
  slug,
  locale,
}: {
  slug: string;
  locale: Locale;
}) {
  const d = t(locale);
  const router = useRouter();
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  const step = "flex h-11 w-11 items-center justify-center text-ink transition-colors duration-500 hover:text-chrome";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="text-muted text-xs">{d.shop.quantity}</span>
        <div className="border-line flex items-center rounded-full border bg-white/[0.03] backdrop-blur-xl">
          <button
            type="button"
            className={step}
            aria-label={d.shop.decrease}
            onClick={() => setQty((q) => Math.max(1, q - 1))}
          >
            <Minus size={14} weight="light" />
          </button>
          <span className="text-ink w-8 text-center text-sm tabular-nums">{qty}</span>
          <button
            type="button"
            className={step}
            aria-label={d.shop.increase}
            onClick={() => setQty((q) => Math.min(99, q + 1))}
          >
            <Plus size={14} weight="light" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => add(slug, qty)}
          className={`${pill} bg-chrome text-bg hover:bg-ink px-7 py-3.5`}
        >
          <ShoppingBagOpen size={18} weight="light" />
          {d.shop.add}
        </button>
        <button
          type="button"
          onClick={() => {
            add(slug, qty, { openDrawer: false });
            router.push(`/${locale}/sifaris`);
          }}
          className={`${pill} text-ink border-line-strong hover:border-chrome border px-7 py-3.5 hover:bg-white/[0.04]`}
        >
          {d.shop.buyNow}
        </button>
      </div>
    </div>
  );
}
