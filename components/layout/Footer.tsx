import Link from "next/link";
import { InstagramLogo, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import type { Locale } from "@/content/types";
import { t } from "@/content/i18n";
import { SITE, whatsappUrl } from "@/content/site";
import { CATEGORY_LABELS } from "@/content/products";
import { Wordmark } from "@/components/brand/Wordmark";
import { Girih } from "@/components/illustrations/Girih";
import { Ornament } from "@/components/illustrations/Ornament";
import { LocaleSwitch } from "./LocaleSwitch";

const social =
  "text-ink flex h-12 w-12 items-center justify-center rounded-full border border-white/12 " +
  "bg-white/[0.05] backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] " +
  "transition-all duration-500 ease-[var(--ease-out-expo)] " +
  "hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/12 active:scale-[0.96]";

export function Footer({ locale }: { locale: Locale }) {
  const d = t(locale);
  const wa = whatsappUrl();

  const nav = [
    { href: `/${locale}/kolleksiya`, label: d.nav.collection },
    { href: `/${locale}/korporativ`, label: d.nav.corporate },
    { href: `/${locale}/haqqimizda`, label: d.nav.about },
    { href: `/${locale}/elaqe`, label: d.nav.contact },
  ];

  const categories = (["saat", "deri", "kolleksiya"] as const).map((c) => ({
    href: `/${locale}/kolleksiya?k=${c}`,
    label: CATEGORY_LABELS[c][locale],
  }));

  return (
    <footer className="border-line relative overflow-hidden border-t">
      <Girih className="text-chrome opacity-[0.05]" fade="bottom" cell={96} />

      <div className="container-x relative py-16 md:py-20">
        <Ornament className="mb-16" />

        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Wordmark size="md" className="items-start" />
            <p className="text-muted mt-6 max-w-[34ch] text-sm leading-relaxed">
              {d.footer.tagline}
            </p>

            <div className="mt-8 flex items-center gap-3">
              <a
                href={SITE.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${d.shop.instagram} @${SITE.instagram.handle}`}
                className={social}
              >
                <InstagramLogo size={22} weight="light" />
              </a>
              {wa && (
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={d.shop.whatsapp}
                  className={social}
                >
                  <WhatsappLogo size={22} weight="light" />
                </a>
              )}
            </div>
          </div>

          <FooterCol title={d.footer.nav}>
            {nav.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title={d.nav.collection}>
            {categories.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title={d.footer.contact}>
            <li className="text-muted text-sm">{d.footer.address}</li>
            <li className="text-sm">
              {wa ? (
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-ink transition-colors duration-500"
                >
                  {d.footer.phone}
                </a>
              ) : (
                <span className="text-muted">{d.footer.phone}</span>
              )}
            </li>
            <li className="text-muted text-sm">{d.footer.email}</li>
          </FooterCol>
        </div>

        <div className="border-line mt-14 flex flex-col gap-5 border-t pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted text-xs">
            {new Date().getFullYear()} PRESIDENT. {d.footer.rights}.
          </p>
          <LocaleSwitch locale={locale} />
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-ink mb-5 text-xs font-semibold">{title}</h2>
      <ul className="flex flex-col gap-3">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-muted hover:text-ink text-sm transition-colors duration-500"
      >
        {children}
      </Link>
    </li>
  );
}
