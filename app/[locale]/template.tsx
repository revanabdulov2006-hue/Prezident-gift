"use client";

import { motion } from "motion/react";

/**
 * Hər səhifə keçidində yumşaq giriş. Yalnız opacity canlanır: transform və
 * filter ata elementdə qalsaydı, sticky və pin olunmuş bölmələrin davranışı pozulardı.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
