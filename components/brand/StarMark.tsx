/**
 * Brendin səkkizguşəli ulduzu (Rub əl Hizb).
 * İki kvadrat 45 dərəcə fərqlə üst üstə düşür, mərkəzdə daha kiçik ulduz dayanır.
 * Rastr loqo kiçik ölçüdə korlandığı üçün naviqasiya və favicon bunu işlədir.
 */
export function StarMark({
  className,
  strokeWidth = 3,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M96 50L50 96L4 50L50 4Z" />
      <path d="M82.53 82.53L17.47 82.53L17.47 17.47L82.53 17.47Z" />
      <path
        d="M50 23L55.74 36.14L69.09 30.91L63.86 44.26L77 50L63.86 55.74L69.09 69.09L55.74 63.86L50 77L44.26 63.86L30.91 69.09L36.14 55.74L23 50L36.14 44.26L30.91 30.91L44.26 36.14Z"
        strokeWidth={strokeWidth * 0.8}
      />
    </svg>
  );
}
