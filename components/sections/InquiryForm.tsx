"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { WhatsappLogo, CheckCircle } from "@phosphor-icons/react";
import type { Locale } from "@/content/types";
import { CATEGORIES } from "@/content/types";
import { t } from "@/content/i18n";
import { CATEGORY_LABELS } from "@/content/products";
import { inquirySchema, type InquiryInput } from "@/content/inquiry-schema";
import { whatsappUrl } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function InquiryForm({
  locale,
  presetProduct,
}: {
  locale: Locale;
  /** Məhsul səhifəsindən gələndə mesaj sahəsi əvvəlcədən doldurulur. */
  presetProduct?: string;
}) {
  const d = t(locale);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InquiryInput>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      interest: "any",
      message: presetProduct ? `${presetProduct}` : "",
    },
  });

  const onSubmit = async (values: InquiryInput) => {
    setState("sending");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, locale }),
      });
      setState(res.ok ? "sent" : "error");
    } catch {
      setState("error");
    }
  };

  if (state === "sent") {
    return (
      <div className="border-line bg-surface flex flex-col items-start gap-4 border p-10 md:p-14">
        <CheckCircle size={32} weight="light" className="text-chrome" />
        <p className="text-ink max-w-[46ch] text-lg leading-relaxed">
          {d.inquiry.success}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      {/* Bot tələsi. Ekran oxuyucudan və fokusdan gizlədilir. */}
      <input
        {...register("company_website")}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="pointer-events-none absolute h-0 w-0 opacity-0"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={d.inquiry.name} error={errors.name && d.inquiry.required}>
          <input {...register("name")} type="text" autoComplete="name" className={input} />
        </Field>
        <Field label={`${d.inquiry.org} (${d.inquiry.optional})`}>
          <input {...register("org")} type="text" autoComplete="organization" className={input} />
        </Field>
        <Field
          label={d.inquiry.email}
          error={errors.email && d.inquiry.invalidEmail}
        >
          <input {...register("email")} type="email" autoComplete="email" className={input} />
        </Field>
        <Field label={`${d.inquiry.phone} (${d.inquiry.optional})`}>
          <input {...register("phone")} type="tel" autoComplete="tel" className={input} />
        </Field>
        <Field label={d.inquiry.interest}>
          <select {...register("interest")} className={input}>
            <option value="any">{d.inquiry.any}</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {CATEGORY_LABELS[c][locale]}
              </option>
            ))}
          </select>
        </Field>
        <Field label={`${d.inquiry.quantity} (${d.inquiry.optional})`}>
          <input {...register("quantity")} type="text" inputMode="numeric" className={input} />
        </Field>
      </div>

      <Field label={`${d.inquiry.message} (${d.inquiry.optional})`}>
        <textarea
          {...register("message")}
          rows={5}
          placeholder={d.inquiry.messagePlaceholder}
          className={`${input} resize-y`}
        />
      </Field>

      {state === "error" && (
        <p role="alert" className="text-sm text-red-400">
          {d.inquiry.error}
        </p>
      )}

      <div className="mt-2 flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={state === "sending"}>
          {state === "sending" ? d.inquiry.submitting : d.inquiry.submit}
        </Button>
        {whatsappUrl() && (
          <a
            href={whatsappUrl() ?? undefined}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-ink inline-flex items-center gap-2 px-2 text-sm transition-colors duration-500"
          >
            <WhatsappLogo size={18} weight="light" />
            {d.inquiry.whatsapp}
          </a>
        )}
      </div>
    </form>
  );
}

const input =
  "w-full rounded-none border border-[var(--color-line)] bg-[var(--color-surface)] " +
  "px-4 py-3 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted)] " +
  "transition-colors duration-500 ease-[var(--ease-out-expo)] " +
  "hover:border-[var(--color-line-strong)] focus:border-[var(--color-chrome)] focus:outline-none";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
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

/** Ana səhifədəki sorğu bölməsi. */
export function InquirySection({ locale }: { locale: Locale }) {
  const d = t(locale);
  return (
    <section id="sorgu" className="border-line border-t py-24 md:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal>
          <p className="text-chrome mb-6 text-xs font-medium tracking-[0.2em] uppercase">
            {d.inquiry.eyebrow}
          </p>
          <h2 className="font-display text-ink text-3xl leading-tight font-light tracking-tight md:text-4xl lg:text-5xl">
            {d.inquiry.title}
          </h2>
          <p className="text-muted mt-5 max-w-[42ch] text-base leading-relaxed">
            {d.inquiry.lead}
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <InquiryForm locale={locale} />
        </Reveal>
      </div>
    </section>
  );
}
