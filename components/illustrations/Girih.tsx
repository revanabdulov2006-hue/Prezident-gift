import { useId } from "react";

/**
 * Səkkizguşəli ulduzdan qurulmuş girih naxışı. Bölmə fonu üçündür.
 * Kənarlara doğru yumşaq şəkildə sönür, ona görə mətnin altında oxunmanı pozmur.
 */
export function Girih({
  className = "",
  cell = 88,
  fade = "radial",
}: {
  className?: string;
  cell?: number;
  /** radial: mərkəzdən kənara sönür; bottom: aşağıdan yuxarı sönür. */
  fade?: "radial" | "bottom" | "none";
}) {
  const id = useId().replace(/:/g, "");
  const k = (cell * 0.66) / 100;
  const mask =
    fade === "radial"
      ? "radial-gradient(ellipse at center, #000 20%, transparent 72%)"
      : fade === "bottom"
        ? "linear-gradient(to top, #000 0%, transparent 85%)"
        : undefined;

  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={mask ? { maskImage: mask, WebkitMaskImage: mask } : undefined}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern
          id={id}
          width={cell}
          height={cell}
          patternUnits="userSpaceOnUse"
        >
          <g
            transform={`translate(${cell / 2} ${cell / 2}) scale(${k}) translate(-50 -50)`}
            fill="none"
            stroke="currentColor"
            strokeWidth={0.8 / k}
            strokeLinejoin="round"
          >
            <path d="M96 50L50 96L4 50L50 4Z" />
            <path d="M82.53 82.53L17.47 82.53L17.47 17.47L82.53 17.47Z" />
            <path d="M50 23L55.74 36.14L69.09 30.91L63.86 44.26L77 50L63.86 55.74L69.09 69.09L55.74 63.86L50 77L44.26 63.86L30.91 69.09L36.14 55.74L23 50L36.14 44.26L30.91 30.91L44.26 36.14Z" />
          </g>
          {/* Hüceyrə künclərində rombik bağlayıcılar, qonşu ulduzları birləşdirir. */}
          <g fill="none" stroke="currentColor" strokeWidth={0.8} strokeLinejoin="round">
            {[
              [0, 0],
              [cell, 0],
              [0, cell],
              [cell, cell],
            ].map(([x, y]) => (
              <path
                key={`${x}-${y}`}
                d={`M${x} ${y - 9}L${x + 9} ${y}L${x} ${y + 9}L${x - 9} ${y}Z`}
              />
            ))}
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
