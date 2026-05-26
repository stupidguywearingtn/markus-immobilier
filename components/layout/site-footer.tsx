import Link from "next/link";
import { LogoFull } from "@/components/ui/logo";

const SERVICES = [
  { href: "/annonces?type=vente", label: "Acheter" },
  { href: "/annonces?type=location", label: "Louer" },
  { href: "/faire-gerer", label: "Faire gérer" },
  { href: "/estimation", label: "Estimation" },
];

const AGENCE = [
  { href: "/#agence", label: "Notre agence" },
  { href: "/equipe", label: "Notre équipe" },
  { href: "/honoraires", label: "Nos honoraires" },
  { href: "/recrutement", label: "Recrutement" },
];

const FOOTER_SOCIALS = [
  {
    href: "https://www.instagram.com/markusimmobilier/",
    label: "Instagram",
    svg: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
      </>
    ),
    stroke: true,
  },
  {
    href: "https://www.tiktok.com/@markusimmobilier",
    label: "TikTok",
    svg: (
      <path d="M16 3c.3 2.2 1.7 3.9 3.9 4.2v3c-1.5 0-2.8-.4-3.9-1.1v5.6c0 3.4-2.6 5.8-5.8 5.8S4.4 18 4.4 14.7 7 9 10.2 9c.4 0 .8 0 1.1.1v3.1c-.3-.1-.7-.2-1.1-.2-1.5 0-2.7 1.2-2.7 2.7s1.2 2.7 2.7 2.7 2.8-1.2 2.8-2.9V3H16z" />
    ),
    stroke: false,
  },
  {
    href: "https://www.linkedin.com/company/markusimmobilier/",
    label: "LinkedIn",
    svg: (
      <path d="M6.5 8H3.5v12.5h3V8zM5 3.5A1.8 1.8 0 105 7a1.8 1.8 0 000-3.5zM20.5 20.5h-3v-6.2c0-1.6-.6-2.5-1.9-2.5-1 0-1.6.7-1.9 1.4-.1.2-.1.6-.1 1v6.3h-3V8h3v1.4c.5-.7 1.3-1.7 3.1-1.7 2.3 0 3.7 1.5 3.7 4.6v8.2z" />
    ),
    stroke: false,
  },
  {
    href: "https://discord.gg/fSyn28G5U",
    label: "Discord",
    svg: (
      <path d="M19 5a16 16 0 00-4-1l-.3.5a12 12 0 013.5 1.8 14 14 0 00-12.4 0A12 12 0 019.3 4.5L9 4a16 16 0 00-4 1C2.5 8.7 1.8 12.3 2.1 15.8A16 16 0 007 18l.6-1c-.7-.3-1.4-.6-2-1l.5-.3a11 11 0 009.8 0l.5.3c-.6.4-1.3.7-2 1l.6 1a16 16 0 005-2.2c.4-4-.8-7.6-3-10.6zM9.3 14c-.8 0-1.4-.7-1.4-1.6s.6-1.6 1.4-1.6 1.4.7 1.4 1.6S10 14 9.3 14zm5.4 0c-.8 0-1.4-.7-1.4-1.6s.6-1.6 1.4-1.6 1.4.7 1.4 1.6S15.4 14 14.7 14z" />
    ),
    stroke: false,
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-anthracite text-blanc pt-[72px] pb-[30px]">
      <div className="max-w-content mx-auto px-8 max-md:px-5">
        <div className="grid gap-10 max-md:gap-7 grid-cols-1 md:grid-cols-[1fr_1.2fr_1fr] items-start pb-[46px] border-b border-white/10">
          {/* Services */}
          <div className="max-md:order-2 max-md:text-center">
            <h4 className="text-xs tracking-[0.2em] uppercase text-sauge mb-[18px] font-semibold">
              Services
            </h4>
            <ul className="list-none">
              {SERVICES.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="block text-white/[0.78] no-underline text-sm py-1.5 transition-all hover:text-blanc hover:pl-1.5"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Brand */}
          <div className="flex flex-col items-center gap-4 max-md:order-1">
            <LogoFull width={200} color="#fff" />
            <span className="tracking-[0.4em] text-[9px] block text-center opacity-70">
              L&apos;IMMOBILIER EN TOUTE CONFIANCE
            </span>
          </div>

          {/* L'agence */}
          <div className="max-md:order-3 max-md:text-center">
            <h4 className="text-xs tracking-[0.2em] uppercase text-sauge mb-[18px] font-semibold">
              L&apos;agence
            </h4>
            <ul className="list-none">
              {AGENCE.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="block text-white/[0.78] no-underline text-sm py-1.5 transition-all hover:text-blanc hover:pl-1.5"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between gap-5 flex-wrap pt-[26px]">
          <div className="flex gap-6 flex-wrap text-[13px] text-white/80">
            <a href="tel:0478371367" className="hover:text-blanc transition">
              04 78 37 13 67
            </a>
            <a
              href="mailto:villeurbanne@markusimmobilier.fr"
              className="hover:text-blanc transition"
            >
              villeurbanne@markusimmobilier.fr
            </a>
            <span>87 rue Édouard Vaillant, 69100 Villeurbanne</span>
          </div>
          <div className="flex gap-3">
            {FOOTER_SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-[34px] h-[34px] border border-white/25 rounded-full grid place-items-center text-blanc transition hover:bg-sauge hover:border-sauge"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="15"
                  height="15"
                  fill={s.stroke ? "none" : "currentColor"}
                  stroke={s.stroke ? "currentColor" : "none"}
                  strokeWidth={s.stroke ? "1.8" : undefined}
                  aria-hidden="true"
                >
                  {s.svg}
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div className="text-center text-xs text-white/45 mt-[26px]">
          © 2026 Markus Immobilier — Tous droits réservés.{" "}
          <Link href="/mentions-legales" className="text-white/55 no-underline mx-1.5">
            Mentions légales
          </Link>
          ·
          <Link href="/confidentialite" className="text-white/55 no-underline mx-1.5">
            Politique de confidentialité
          </Link>
          ·
          <Link href="/cookies" className="text-white/55 no-underline mx-1.5">
            Cookies
          </Link>
        </div>
      </div>
    </footer>
  );
}
