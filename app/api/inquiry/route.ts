import { NextResponse } from "next/server";
import { inquirySchema } from "@/content/inquiry-schema";

/**
 * Sorğu formasını qəbul edir və e-poçt göndərir.
 *
 * RESEND_API_KEY və INQUIRY_TO təyin olunmayıbsa, sorğu serverin jurnalına
 * yazılır və 200 qaytarılır, çünki əks halda forma istifadəçiyə səbəbsiz
 * xəta göstərərdi. Jurnal qeydi açıq şəkildə konfiqurasiyanın yarımçıq
 * olduğunu bildirir.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "validation" }, { status: 400 });
  }

  const data = parsed.data;

  // Bot tələsi dolubsa, uğur qaytarılır, amma heç nə göndərilmir.
  if (data.company_website) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_TO;
  const from = process.env.INQUIRY_FROM ?? "PRESIDENT <onboarding@resend.dev>";

  const lines = [
    `Ad: ${data.name}`,
    `Təşkilat: ${data.org || "göstərilməyib"}`,
    `E-poçt: ${data.email}`,
    `Telefon: ${data.phone || "göstərilməyib"}`,
    `İstiqamət: ${data.interest}`,
    `Say: ${data.quantity || "göstərilməyib"}`,
    "",
    data.message || "(mesaj yoxdur)",
  ].join("\n");

  if (!apiKey || !to) {
    if (process.env.NODE_ENV === "production") {
      console.error("[inquiry] RESEND_API_KEY və ya INQUIRY_TO yoxdur, sorğu qəbul edilmədi:\n" + lines);
      return NextResponse.json({ error: "not configured" }, { status: 503 });
    }
    console.warn(
      "[inquiry] RESEND_API_KEY və ya INQUIRY_TO təyin olunmayıb, " +
        "sorğu göndərilmədi. Daxil olan məlumat:\n" +
        lines,
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: `Sorğu: ${data.name}${data.org ? ` (${data.org})` : ""}`,
      text: lines,
    });

    if (error) {
      console.error("[inquiry] Resend xətası:", error);
      return NextResponse.json({ error: "send failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("[inquiry] gözlənilməz xəta:", err);
    return NextResponse.json({ error: "send failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, delivered: true });
}
