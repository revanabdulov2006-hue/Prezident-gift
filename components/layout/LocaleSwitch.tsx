"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, type Locale } from "@/content/types";
import { DICT } from "@/content/i18n";

/**
 * Dil keçidi. Cari yolu saxlayır, yalnız prefiksi dəyişir:
 * /az/kolleksiya -> /en/kolleksiya
 */
export function LocaleSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const rest = pathname.replace(/^\/[a-z]{2}/, "");

  return (
    <div className="flex items-center gap-1" role="group" aria-label="Language">
      {LOCALES.map((l) => {
        const active = l === locale;
        return (
          <Link
            key={l}
            href={`/${l}${rest}`}
            hrefLang={l}
            aria-current={active ? "true" : undefined}
            className={`rounded-full px-2.5 py-1 text-xs font-medium tracking-wide transition-colors duration-500 ${
              active ? "text-bg bg-chrome" : "text-muted hover:text-ink"
            }`}
          >
            {DICT[l].localeShort}
          </Link>
        );
      })}
    </div>
  );
}
