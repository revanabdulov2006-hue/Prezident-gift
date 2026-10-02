import Link from "next/link";
import { StarMark } from "@/components/brand/StarMark";

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[70dvh] flex-col items-start justify-center py-32">
      <StarMark className="text-chrome mb-8 h-10 w-10" />
      <h1 className="font-display text-ink text-4xl font-light tracking-tight md:text-5xl">
        Səhifə tapılmadı
      </h1>
      <p className="text-muted mt-5 max-w-[42ch] text-base leading-relaxed">
        Axtardığınız səhifə mövcud deyil və ya ünvanı dəyişib.
      </p>
      <Link
        href="/az"
        className="bg-chrome text-bg hover:bg-ink mt-9 inline-flex items-center rounded-full px-6 py-3 text-sm font-medium transition-all duration-500 ease-[var(--ease-out-expo)] active:scale-[0.98]"
      >
        Ana səhifəyə qayıt
      </Link>
    </div>
  );
}
