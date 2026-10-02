import { z } from "zod";
import { CATEGORIES } from "./types";

/** Forma və API eyni sxemi işlədir, qaydalar bir yerdə saxlanılır. */
export const inquirySchema = z.object({
  name: z.string().trim().min(2).max(120),
  org: z.string().trim().max(160).optional().or(z.literal("")),
  email: z.email().max(200),
  phone: z.string().trim().max(60).optional().or(z.literal("")),
  interest: z.enum([...CATEGORIES, "any"]),
  quantity: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().max(4000).optional().or(z.literal("")),
  /** Botlar üçün gizli sahə. Dolu gəlirsə sorğu atılır. */
  company_website: z.string().max(0).optional(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
