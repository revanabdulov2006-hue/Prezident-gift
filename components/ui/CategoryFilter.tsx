import Link from "next/link";
import { CATEGORIES, type Category, type Locale } from "@/content/types";
import { t } from "@/content/i18n";
import { CATEGORY_LABELS, byCategory } from "@/content/products";
import { PRODUCTS } from "@/content/products";

/**
 * Kateqoriya filtri. Vəziyyət URL-dədir, ona görə komponent server tərəfdə qalır
 * və paylaşılan keçid həmişə düzgün görünüşü açır.
 */
export function CategoryFilter({
  locale,
  active,
}: {
  locale: Locale;
  active: Category | null;
}) {
  const d = t(locale);

  const tabs = [
    { key: null, label: d.collection.all, count: PRODUCTS.length },
    ...CATEGORIES.map((c) => ({
      key: c,
      label: CATEGORY_LABELS[c][locale],
      count: byCategory(c).length,
    })),
  ];

  return (
    <div className="border-line flex flex-wrap gap-2 border-b pb-6">
      {tabs.map((tab) => {
        const on = tab.key === active;
        const href = tab.key
          ? `/${locale}/kolleksiya?k=${tab.key}`
          : `/${locale}/kolleksiya`;
        return (
          <Link
            key={tab.label}
            href={href}
            scroll={false}
            aria-current={on ? "page" : undefined}
            className={`rounded-full px-4 py-2 text-sm transition-colors duration-500 ease-[var(--ease-out-expo)] active:scale-[0.98] ${
              on
                ? "bg-chrome text-bg"
                : "border-line text-muted hover:text-ink hover:border-line-strong border"
            }`}
          >
            {tab.label}
            <span className={`ml-2 text-xs ${on ? "opacity-60" : "opacity-50"}`}>
              {tab.count}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
