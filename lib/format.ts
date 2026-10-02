/** 1250 -> "1 250 ₼". Intl işlətmir ki, server və brauzer eyni sətri versin. */
export function formatPrice(value: number): string {
  const digits = String(Math.round(value));
  const grouped = digits.replace(/\B(?=(\d{3})+(?!\d))/g, "\u00A0");
  return `${grouped}\u00A0₼`;
}
