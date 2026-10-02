import { Illus } from "./Illus";

/**
 * Bölmələr arasında ayırıcı: ortada kiçik ulduz, hər iki yanda incə xətt.
 * Xətlər ortadan kənara doğru çəkilir.
 */
export function Ornament({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-5 ${className}`} aria-hidden="true">
      <span className="from-transparent via-line-strong to-line-strong h-px w-24 bg-gradient-to-r md:w-40" />
      <Illus viewBox="0 0 40 40" className="text-chrome/70 h-7 w-7" strokeWidth={1.1}>
        <path d="M38 20L20 38L2 20L20 2Z" />
        <path d="M32.2 32.2L7.8 32.2L7.8 7.8L32.2 7.8Z" />
        <circle cx="20" cy="20" r="3" />
      </Illus>
      <span className="from-transparent via-line-strong to-line-strong h-px w-24 bg-gradient-to-l md:w-40" />
    </div>
  );
}
