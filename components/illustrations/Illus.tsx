"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useInView } from "motion/react";

/**
 * Bütün xətt illüstrasiyalarının ortaq qabığı.
 * Ekrana girəndə xətlər yumşaq şəkildə çəkilir (stroke-dashoffset).
 *
 * Fillsiz fiqurlar üçündür. Hər fiqura pathLength=1 təyin olunur ki,
 * dash uzunluğu fiqurun real ölçüsündən asılı olmasın.
 * JS işləməyibsə və ya azaldılmış hərəkət varsa illüstrasiya tam görünür.
 */
export function Illus({
  children,
  className = "",
  viewBox = "0 0 120 120",
  strokeWidth = 0.7,
}: {
  children: ReactNode;
  className?: string;
  viewBox?: string;
  strokeWidth?: number;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    svg
      .querySelectorAll("path,circle,rect,line,ellipse,polygon,polyline")
      .forEach((el) => el.setAttribute("pathLength", "1"));
    setReady(true);
  }, []);

  return (
    <svg
      ref={ref}
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`illus ${className}`}
      data-draw={ready ? (inView ? "in" : "out") : undefined}
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}
