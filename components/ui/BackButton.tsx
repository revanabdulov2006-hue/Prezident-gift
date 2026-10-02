"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { CaretLeft } from "@phosphor-icons/react";
import type { Locale } from "@/content/types";
import { t } from "@/content/i18n";

/**
 * Geri qayıt düyməsi: yazısız, şüşə blur dairə.
 * Eyni saytdan gəlibsə brauzer tarixçəsində geri gedir (filtr və scroll qalır),
 * birbaşa keçiddən açılıbsa kolleksiyaya aparır.
 */
export function BackButton({
  locale,
  className = "",
}: {
  locale: Locale;
  className?: string;
}) {
  const router = useRouter();
  const d = t(locale);
  const fallback = `/${locale}/kolleksiya`;

  return (
    <Link
      href={fallback}
      aria-label={d.shop.backAria}
      onClick={(e) => {
        const sameSite =
          typeof document !== "undefined" &&
          document.referrer.startsWith(window.location.origin) &&
          window.history.length > 1;
        if (!sameSite) return; // Link özü kolleksiyaya aparır.
        e.preventDefault();
        router.back();
      }}
      className={`text-ink flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/[0.1] shadow-[0_8px_30px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.28)] backdrop-blur-2xl transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-x-0.5 hover:border-white/40 hover:bg-white/[0.18] active:scale-[0.95] ${className}`}
    >
      <CaretLeft size={20} weight="light" />
    </Link>
  );
}
