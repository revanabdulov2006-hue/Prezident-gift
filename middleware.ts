import { NextResponse, type NextRequest } from "next/server";
import { LOCALES, DEFAULT_LOCALE } from "./content/types";

/**
 * Dil prefiksi olmayan ünvanları uyğun dilə yönləndirir.
 * Seçim brauzerin Accept-Language başlığına görə edilir, tapılmasa AZ.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return NextResponse.next();

  const header = request.headers.get("accept-language") ?? "";
  const preferred = header
    .split(",")
    .map((part) => part.split(";")[0].trim().slice(0, 2).toLowerCase())
    .find((code) => (LOCALES as readonly string[]).includes(code));

  const locale = preferred ?? DEFAULT_LOCALE;
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Statik fayllar, API və Next daxili yolları kənarda qalır.
  matcher: ["/((?!api|_next|video|poster|images|brand|favicon|.*\..*).*)"],
};
