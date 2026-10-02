"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, Minus, Plus, WhatsappLogo } from "@phosphor-icons/react";
import type { Locale } from "@/content/types";
import { t } from "@/content/i18n";
import { bySlug } from "@/content/products";
import { priceOf } from "@/content/prices";
import { whatsappUrl } from "@/content/site";
import { formatPrice } from "@/lib/format";
import { buildOrderMessage, newOrderId } from "@/lib/order-message";
import { orderSchema, type OrderInput } from "@/content/order-schema";
import { Art } from "@/components/illustrations/Art";
import { useCart } from "./CartProvider";

const input =
  "w-full rounded-none border border-[var(--color-line)] bg-[var(--color-surface)] " +
  "px-4 py-3 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted)] " +
  "transition-colors duration-500 ease-[var(--ease-out-expo)] " +
  "hover:border-[var(--color-line-strong)] focus:border-[var(--color-chrome)] focus:outline-none";

const qtyBtn =
  "flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] " +
  "text-ink transition-all duration-500 ease-[var(--ease-out-expo)] hover:border-white/25 hover:bg-white/10 active:scale-[0.96]";

interface Sent {
  orderId: string;
  url: string;
}

/**
 * Sifariş səhifəsi. Forma sahələri: ad və soyad, nömrə, çatdırılma ünvanı, qeyd, miqdar.
 * Göndərəndə WhatsApp hazır mesajla açılır.
 */
export function Checkout({ locale }: { locale: Locale }) {
  const d = t(locale);
  const { lines, subtotal, ready, clear, setQty } = useCart();
  const [sent, setSent] = useState<Sent | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderInput>({ resolver: zodResolver(orderSchema) });

  const onSubmit = (values: OrderInput) => {
    const orderId = newOrderId();
    const url = whatsappUrl(buildOrderMessage(orderId, lines, values));
    if (!url) return;

    // Brauzer pop-up-ı bloklasa, nəticə ekranındakı düymə eyni keçidi yenidən açır.
    window.open(url, "_blank", "noopener,noreferrer");
    setSent({ orderId, url });
    clear();
  };

  // Mesaj hazırdır.
  if (sent) {
    return (
      <div className="border-line bg-surface relative flex flex-col items-start gap-5 overflow-hidden border p-10 md:p-14">
        <Art name="medallion" className="text-chrome/25 absolute -right-10 -bottom-10 h-72 w-72" />
        <CheckCircle size={36} weight="light" className="text-chrome relative" />
        <h2 className="font-display text-ink relative text-3xl font-light md:text-4xl">
          {d.shop.doneTitle}
        </h2>
        <p className="text-muted relative max-w-[50ch] text-base leading-relaxed">
          {d.shop.doneLead}
        </p>
        <p className="text-muted relative text-sm">
          {d.shop.orderNo}: <span className="text-ink tabular-nums">{sent.orderId}</span>
        </p>
        <div className="relative mt-3 flex flex-wrap gap-3">
          <a
            href={sent.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-chrome text-bg hover:bg-ink inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-500 ease-[var(--ease-out-expo)] active:scale-[0.98]"
          >
            <WhatsappLogo size={18} weight="light" />
            {d.shop.openWhatsapp}
          </a>
          <Link
            href={`/${locale}`}
            className="border-line-strong text-ink hover:border-chrome inline-flex rounded-full border px-6 py-3 text-sm font-medium transition-all duration-500 ease-[var(--ease-out-expo)] hover:bg-white/[0.04] active:scale-[0.98]"
          >
            {d.shop.backHome}
          </Link>
        </div>
      </div>
    );
  }

  // Səbət oxunana qədər boş görüntü yanıb-sönməsin.
  if (!ready) return <div className="min-h-[24rem]" aria-hidden="true" />;

  if (lines.length === 0) {
    return (
      <div className="border-line bg-surface flex flex-col items-center gap-5 border px-8 py-16 text-center">
        <Art name="bag" className="text-chrome/50 h-32 w-32" />
        <p className="text-muted max-w-[34ch] text-base leading-relaxed">
          {d.shop.emptyCheckout}
        </p>
        <Link
          href={`/${locale}/kolleksiya`}
          className="bg-chrome text-bg hover:bg-ink inline-flex rounded-full px-6 py-3 text-sm font-medium transition-all duration-500 ease-[var(--ease-out-expo)] active:scale-[0.98]"
        >
          {d.shop.continueShopping}
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16"
    >
      {/* Forma: ad və soyad, nömrə, ünvan, qeyd, miqdar */}
      <div className="flex flex-col gap-5">
        <h2 className="font-display text-ink text-2xl font-light">{d.shop.yourDetails}</h2>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label={d.shop.name} error={errors.name && d.shop.required}>
            <input {...register("name")} type="text" autoComplete="name" className={input} />
          </Field>
          <Field label={d.shop.phone} error={errors.phone && d.shop.invalidPhone}>
            <input {...register("phone")} type="tel" autoComplete="tel" className={input} />
          </Field>
        </div>

        <Field label={d.shop.address} error={errors.address && d.shop.required}>
          <input {...register("address")} type="text" autoComplete="street-address" className={input} />
        </Field>

        <Field label={`${d.shop.note} (${d.shop.optional})`}>
          <textarea {...register("note")} rows={4} className={`${input} resize-y`} />
        </Field>

        {/* Miqdar: formanın sahəsidir. Səbətdə bir neçə məhsul varsa, hər birinin sayı ayrıca seçilir. */}
        <div className="flex flex-col gap-2" role="group" aria-label={d.shop.qtyShort}>
          <span className="text-muted text-xs">{d.shop.qtyShort}</span>
          <ul className="flex flex-col gap-2">
            {lines.map((line) => {
              const product = bySlug(line.slug);
              if (!product) return null;
              return (
                <li
                  key={line.slug}
                  className="border-line bg-surface flex items-center justify-between gap-4 border px-4 py-2.5"
                >
                  <span className="text-ink min-w-0 truncate text-sm">{product.name[locale]}</span>
                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      type="button"
                      className={qtyBtn}
                      aria-label={d.shop.decrease}
                      onClick={() => setQty(line.slug, line.qty - 1)}
                    >
                      <Minus size={13} weight="light" />
                    </button>
                    <span className="text-ink w-8 text-center text-sm tabular-nums">{line.qty}</span>
                    <button
                      type="button"
                      className={qtyBtn}
                      aria-label={d.shop.increase}
                      onClick={() => setQty(line.slug, line.qty + 1)}
                    >
                      <Plus size={13} weight="light" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <p className="text-muted text-xs leading-relaxed">{d.shop.waNote}</p>

        <button
          type="submit"
          className="bg-chrome text-bg hover:bg-ink mt-1 inline-flex w-fit items-center justify-center gap-2.5 rounded-full px-8 py-3.5 text-sm font-medium transition-all duration-500 ease-[var(--ease-out-expo)] active:scale-[0.98]"
        >
          <WhatsappLogo size={18} weight="light" />
          {d.shop.place}
        </button>
      </div>

      {/* Sifariş xülasəsi: yalnız oxunur, miqdar solda formadadır */}
      <aside className="border-line bg-surface h-fit border p-6 md:p-8 lg:sticky lg:top-28">
        <h2 className="font-display text-ink text-2xl font-light">{d.shop.summary}</h2>
        <ul className="mt-6 divide-y divide-[var(--color-line)]">
          {lines.map((line) => {
            const product = bySlug(line.slug);
            const price = priceOf(line.slug);
            if (!product || price === null) return null;
            return (
              <li key={line.slug} className="flex gap-4 py-4">
                <div className="border-line relative h-24 w-[4.5rem] shrink-0 overflow-hidden border">
                  <Image
                    src={`/images/${product.images[0]}.webp`}
                    alt=""
                    fill
                    sizes="72px"
                    className="object-cover"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <p className="font-display text-ink text-base leading-snug font-light">
                    {product.name[locale]}
                  </p>
                  <p className="text-muted mt-1 text-sm">
                    {line.qty} x {formatPrice(price)}
                  </p>
                </div>
                <p className="text-ink self-start text-sm tabular-nums">
                  {formatPrice(price * line.qty)}
                </p>
              </li>
            );
          })}
        </ul>

        <div className="border-line mt-2 flex items-baseline justify-between border-t pt-5">
          <span className="text-muted text-sm">{d.shop.subtotal}</span>
          <span className="font-display text-ink text-3xl font-light">{formatPrice(subtotal)}</span>
        </div>
        <p className="text-muted mt-3 text-xs leading-relaxed">{d.shop.deliveryNote}</p>
      </aside>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string | false;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-muted text-xs">{label}</span>
      {children}
      {error && <span className="text-xs text-red-400">{error}</span>}
    </label>
  );
}
