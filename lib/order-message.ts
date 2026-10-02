import { bySlug } from "@/content/products";
import { priceOf } from "@/content/prices";
import { formatPrice } from "./format";
import type { OrderInput } from "@/content/order-schema";
import type { CartLine } from "@/components/cart/CartProvider";

/**
 * WhatsApp-a gedən sifariş mesajı. Komanda Azərbaycan dilində işlədiyi üçün
 * müştərinin sayt dilindən asılı olmayaraq mesaj həmişə Azərbaycancadır.
 */
export function buildOrderMessage(
  orderId: string,
  lines: CartLine[],
  form: OrderInput,
): string {
  let total = 0;
  const items = lines.flatMap((l) => {
    const product = bySlug(l.slug);
    const unit = priceOf(l.slug);
    if (!product || unit === null) return [];
    total += unit * l.qty;
    return [`• ${product.name.az}: ${l.qty} x ${formatPrice(unit)} = ${formatPrice(unit * l.qty)}`];
  });

  return [
    `Sifariş ${orderId}`,
    "",
    ...items,
    "",
    `Cəmi: ${formatPrice(total)} (çatdırılma daxil deyil)`,
    "",
    `Ad, soyad: ${form.name}`,
    `Nömrə: ${form.phone}`,
    `Çatdırılma ünvanı: ${form.address}`,
    ...(form.note ? [`Qeyd: ${form.note}`] : []),
  ].join("\n");
}

export const newOrderId = () => `PR-${Date.now().toString(36).toUpperCase()}`;
