/**
 * Saytın xarici əlaqə nöqtələri. Bütün keçidlər buradan oxunur,
 * başqa heç bir faylda nömrə və ya hesab adı yazılmır.
 */
export const SITE = {
  instagram: {
    handle: "president.business.gifts",
    url: "https://www.instagram.com/president.business.gifts/",
  },
  whatsapp: {
    /** Yalnız rəqəmlər, ölkə kodu ilə. Sifarişlər bu nömrəyə gedir. Boşdursa WhatsApp ikonları gizlənir. */
    number: "994102396015",
    /** Ekranda göstərilən format. */
    display: "+994 10 239 60 15",
  },
} as const;

export const whatsappUrl = (text?: string) =>
  SITE.whatsapp.number
    ? `https://wa.me/${SITE.whatsapp.number}${text ? `?text=${encodeURIComponent(text)}` : ""}`
    : null;
