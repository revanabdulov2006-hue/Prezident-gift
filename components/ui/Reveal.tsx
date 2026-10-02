"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Saytdakı yeganə scroll reveal komponenti.
 * Hər bölmədə eyni blur girişini təkrarlamamaq üçün tək yerdə saxlanılır.
 * Resept: opacity 0 -> 1, y 8px -> 0, blur 4px -> 0.
 */
export function Reveal({
  children,
  delay = 0,
  as = "div",
  className,
}: {
  children: ReactNode;
  /** Siyahıda sıra nömrəsi üçün: delay={i * 0.06} */
  delay?: number;
  as?: "div" | "section" | "li" | "span";
  className?: string;
}) {
  const reduced = useReducedMotion();
  const Tag = motion[as];

  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  );
}
