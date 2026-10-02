import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3 " +
  "text-sm font-medium transition-all duration-500 ease-[var(--ease-out-expo)] " +
  "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variants = {
  /** Əsas hərəkət: xrom dolu, qara mətn. */
  solid: "bg-chrome text-bg hover:bg-ink",
  /** İkinci dərəcəli: xətt çərçivə. */
  outline:
    "border border-line-strong text-ink hover:border-chrome hover:bg-white/[0.04]",
  /** Üçüncü: yalnız mətn. */
  ghost: "text-muted hover:text-ink",
} as const;

type Variant = keyof typeof variants;

export function Button({
  variant = "solid",
  className = "",
  children,
  ...rest
}: { variant?: Variant; children: ReactNode } & ComponentProps<"button">) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "solid",
  className = "",
  children,
  ...rest
}: { variant?: Variant; children: ReactNode } & ComponentProps<typeof Link>) {
  return (
    <Link className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </Link>
  );
}
