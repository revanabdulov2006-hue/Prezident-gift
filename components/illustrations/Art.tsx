import { Illus } from "./Illus";

/**
 * Brendin xətt illüstrasiyaları. Hamısı 120x120 qutuda, tək rəngli (currentColor).
 * Məhsul qrupları və mərhələlər üçün eyni dildə çəkilib: nazik xətt, sakit forma.
 */

const STAR_A = "M96 50L50 96L4 50L50 4Z";
const STAR_B = "M82.53 82.53L17.47 82.53L17.47 17.47L82.53 17.47Z";
const STAR_C =
  "M50 23L55.74 36.14L69.09 30.91L63.86 44.26L77 50L63.86 55.74L69.09 69.09L55.74 63.86L50 77L44.26 63.86L30.91 69.09L36.14 55.74L23 50L36.14 44.26L30.91 30.91L44.26 36.14Z";

/** Marka ulduzu, istənilən mərkəzdə və miqyasda. */
function Star({ cx, cy, size }: { cx: number; cy: number; size: number }) {
  const k = size / 100;
  return (
    <g transform={`translate(${cx} ${cy}) scale(${k}) translate(-50 -50)`} strokeWidth={0.7 / k}>
      <path d={STAR_A} />
      <path d={STAR_B} />
      <path d={STAR_C} />
    </g>
  );
}

const hourTicks = Array.from({ length: 12 }, (_, i) => {
  const a = (i * 30 * Math.PI) / 180;
  const r1 = i % 3 === 0 ? 17 : 19;
  const r2 = 21;
  return {
    x1: 60 + r1 * Math.sin(a),
    y1: 60 - r1 * Math.cos(a),
    x2: 60 + r2 * Math.sin(a),
    y2: 60 - r2 * Math.cos(a),
  };
});

const DRAWINGS = {
  watch: (
    <>
      <circle cx="60" cy="60" r="27" />
      <circle cx="60" cy="60" r="23.5" />
      {hourTicks.map((t, i) => (
        <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} />
      ))}
      <path d="M60 60V45" />
      <path d="M60 60L70 66" />
      <circle cx="60" cy="60" r="1.4" />
      <path d="M87 56.5H91.5V63.5H87" />
      <path d="M47 37L50 13H70L73 37" />
      <path d="M47 83L50 107H70L73 83" />
      <circle cx="60" cy="99" r="1" />
      <circle cx="60" cy="93" r="1" />
      <path d="M50 22H70" />
    </>
  ),

  bag: (
    <>
      <rect x="18" y="44" width="84" height="54" rx="5" />
      <path d="M44 44V35a6 6 0 0 1 6-6h20a6 6 0 0 1 6 6v9" />
      <path d="M18 64H102" />
      <rect x="53" y="59" width="14" height="10" rx="2" />
      <path d="M24 50H96" />
      <path d="M24 92H96" />
      <Star cx={60} cy={82} size={11} />
    </>
  ),

  rook: (
    <>
      <path d="M36 100H84V92H36Z" />
      <path d="M41 92L45 50H75L79 92" />
      <path d="M38 50V30H48V39H55V30H65V39H72V30H82V50Z" />
      <path d="M43 64H77" />
      <path d="M42 78H78" />
      <path d="M52 18L60 10L68 18" />
    </>
  ),

  dagger: (
    <>
      <rect x="10" y="56" width="24" height="9" rx="4" />
      <circle cx="17" cy="60.5" r="2" />
      <circle cx="26" cy="60.5" r="2" />
      <rect x="33" y="48" width="5" height="25" rx="2.5" />
      <path d="M38 55C62 54 90 46 110 24C103 48 80 68 38 67" />
      <path d="M42 61C64 60 88 52 104 33" />
      <path d="M38 48L33 44" />
      <path d="M38 73L33 77" />
    </>
  ),

  medallion: (
    <>
      <circle cx="60" cy="60" r="44" />
      <circle cx="60" cy="60" r="40" />
      <circle cx="60" cy="60" r="27" />
      <Star cx={60} cy={60} size={36} />
      {Array.from({ length: 16 }, (_, i) => {
        const a = (i * 22.5 * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={60 + 29 * Math.sin(a)}
            y1={60 - 29 * Math.cos(a)}
            x2={60 + 36 * Math.sin(a)}
            y2={60 - 36 * Math.cos(a)}
          />
        );
      })}
    </>
  ),

  gift: (
    <>
      <rect x="22" y="56" width="76" height="44" rx="2" />
      <rect x="17" y="42" width="86" height="14" rx="2" />
      <path d="M60 42V100" />
      <path d="M60 42C48 22 28 30 36 38C42 44 56 43 60 42" />
      <path d="M60 42C72 22 92 30 84 38C78 44 64 43 60 42" />
      <path d="M22 78H98" />
    </>
  ),

  gem: (
    <>
      <path d="M34 46L47 30H73L86 46L60 92Z" />
      <path d="M34 46H86" />
      <path d="M47 30L53 46L60 92" />
      <path d="M73 30L67 46L60 92" />
      <path d="M53 46L60 30L67 46" />
    </>
  ),

  buta: (
    <>
      <path d="M62 16C92 20 102 54 85 82C72 103 40 104 31 84C23 66 38 52 52 56C61 58 63 67 56 71C50 75 43 69 46 63" />
      <path d="M62 30C82 34 90 56 77 76C68 90 48 92 42 80" />
      <circle cx="68" cy="52" r="2.2" />
      <circle cx="58" cy="44" r="1.4" />
      <circle cx="74" cy="64" r="1.4" />
    </>
  ),

  star: (
    <>
      <Star cx={60} cy={60} size={84} />
      <circle cx="60" cy="60" r="52" />
    </>
  ),
} as const;

export type ArtName = keyof typeof DRAWINGS;

export function Art({
  name,
  className = "",
  strokeWidth,
}: {
  name: ArtName;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <Illus className={className} strokeWidth={strokeWidth}>
      {DRAWINGS[name]}
    </Illus>
  );
}
