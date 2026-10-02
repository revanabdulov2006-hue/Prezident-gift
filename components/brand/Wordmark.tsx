import { StarMark } from "./StarMark";

/**
 * Loqo + söz nişanı. Brendin öz materialındakı quruluşu təkrarlayır:
 * ulduz yuxarıda, altında aralıqlı PRESIDENT, onun altında nazik BUSINESS GIFTS.
 */
export function Wordmark({
  size = "md",
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const s = {
    sm: { star: "h-5 w-5", name: "text-sm", sub: "text-[7px]", gap: "gap-1" },
    md: { star: "h-8 w-8", name: "text-xl", sub: "text-[9px]", gap: "gap-1.5" },
    lg: { star: "h-14 w-14", name: "text-3xl", sub: "text-[11px]", gap: "gap-3" },
  }[size];

  return (
    <span className={`inline-flex flex-col items-center ${s.gap} ${className}`}>
      <StarMark className={`${s.star} text-chrome`} />
      <span className="flex flex-col items-center leading-none">
        <span
          className={`font-display ${s.name} tracking-wordmark text-ink pl-[0.3em] font-light`}
        >
          PRESIDENT
        </span>
        <span
          className={`mt-1.5 ${s.sub} tracking-wordmark text-muted pl-[0.3em] font-sans uppercase`}
        >
          Business Gifts
        </span>
      </span>
    </span>
  );
}

/** Bir sətirlik variant: naviqasiya zolağı üçün. */
export function WordmarkInline({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <StarMark className="h-6 w-6 shrink-0 text-chrome" />
      <span className="font-display text-ink pl-[0.3em] text-base font-light tracking-wordmark">
        PRESIDENT
      </span>
    </span>
  );
}
