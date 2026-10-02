import { z } from "zod";

/** Sifariş formu: yalnız ad, nömrə, ünvan və qeyd. Miqdar səbətdəki hər məhsulun üzərindədir. */
export const orderSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z
    .string()
    .trim()
    .min(7)
    .max(30)
    .regex(/^[+\d][\d\s()\-]{5,}$/),
  address: z.string().trim().min(5).max(300),
  note: z.string().trim().max(1000).optional(),
});

export type OrderInput = z.infer<typeof orderSchema>;
