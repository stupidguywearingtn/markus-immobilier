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
  { href: "/#avis", label: "Nos avis clients" },
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
    href: "https://www.youtube.com/@markusimmobilier",
    label: "YouTube",
    svg: (
      <path d="M21.6 7.2a2.5 2.5 0 00-1.76-1.76C18.25 5 12 5 12 5s-6.25 0-7.84.44A2.5 2.5 0 002.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 001.76 1.76C5.75 19 12 19 12 19s6.25 0 7.84-.44a2.5 2.5 0 001.76-1.76C22 15.2 22 12 22 12s0-3.2-.4-4.8zM10 15V9l5.2 3L10 15z" />
    ),
    stroke: false,
  },
  {
    href: "https://x.com/markusimmo_",
    label: "X (Twitter)",
    svg: (
      <path d="M18.244 2H21l-6.52 7.46L22 22h-6.844l-4.96-6.43L4.5 22H2l6.97-7.97L2 2h6.962l4.486 5.93L18.244 2zm-2.4 18h1.9L6.244 4H4.2l11.644 16z" />
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
        {/* 3 colonnes centrées : Services / Marque / L'Agence */}
        <div className="grid gap-10 max-md:gap-7 grid-cols-1 md:grid-cols-3 items-start pb-[46px] border-b border-white/10 text-center">
          {/* Services */}
          <div className="order-2 md:order-1 flex flex-col items-center">
            <h4 className="text-xs tracking-[0.2em] uppercase text-sauge mb-[18px] font-semibold">
              Services
            </h4>
            <ul className="list-none">
              {SERVICES.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="block text-white/[0.78] no-underline text-sm py-1.5 transition-colors hover:text-blanc"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Brand — colonne centrale */}
          <div className="order-1 md:order-2 flex flex-col items-center gap-4">
            <LogoFull width={180} color="#fff" />
            <span className="tracking-[0.4em] text-[9px] block text-center opacity-70">
              L&apos;IMMOBILIER EN TOUTE CONFIANCE
            </span>
          </div>

          {/* L'agence */}
          <div className="order-3 flex flex-col items-center">
            <h4 className="text-xs tracking-[0.2em] uppercase text-sauge mb-[18px] font-semibold">
              L&apos;agence
            </h4>
            <ul className="list-none">
              {AGENCE.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="block text-white/[0.78] no-underline text-sm py-1.5 transition-colors hover:text-blanc"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Ligne contact — centrée */}
        <div className="pt-[26px] flex flex-col items-center gap-5">
          <div className="flex gap-x-6 gap-y-2 flex-wrap text-[13px] text-white/80 justify-center text-center">
            <a
              href="tel:0478371367"
              data-umami-event="clic_telephone"
              className="hover:text-blanc transition"
            >
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

          {/* Réseaux sociaux — centrés */}
          <div className="flex gap-3 flex-wrap justify-center">
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

        {/* Bottom — mentions légales centrées */}
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
