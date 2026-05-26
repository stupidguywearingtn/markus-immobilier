import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";

const SOCIALS = [
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
    href: "https://x.com/markusimmo_",
    label: "X",
    svg: <path d="M18 3h3l-7 8 8 10h-6l-5-6-5 6H3l7-9L2 3h6l4 5 6-5z" />,
    stroke: false,
  },
  {
    href: "https://www.youtube.com/@markusimmobilier",
    label: "YouTube",
    svg: (
      <path d="M22 8.2a3 3 0 00-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 002 8.2 31 31 0 002 12a31 31 0 00.1 3.8 3 3 0 002.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 002.1-2.1A31 31 0 0022 12a31 31 0 00-.1-3.8zM10 15V9l5 3-5 3z" />
    ),
    stroke: false,
  },
  {
    href: "https://www.facebook.com/profile.php?id=61566295948630",
    label: "Facebook",
    svg: (
      <path d="M14 9V7c0-1 .3-1.5 1.5-1.5H17V2.5h-2.7C11.4 2.5 10 4 10 6.6V9H8v3h2v9.5h4V12h2.6l.4-3H14z" />
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
];

export function Social() {
  return (
    <section id="reseaux" className="py-[120px] max-md:py-[72px] bg-blanc">
      <div className="max-w-content mx-auto px-8 max-md:px-5 text-center">
        <Reveal>
          <Eyebrow className="mb-4">Communauté</Eyebrow>
          <h2 className="font-bold leading-[1.12] tracking-[-0.01em] text-[clamp(30px,4vw,46px)] mb-4">
            Nos réseaux — <span className="grad">suivez-nous.</span>
          </h2>
        </Reveal>

        <div className="flex gap-4 flex-wrap justify-center my-10">
          {SOCIALS.map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-[62px] h-[62px] rounded-2xl bg-blanc border border-[var(--bordure)] grid place-items-center [transition:all_0.28s_var(--ease)] text-anthracite hover:-translate-y-1.5 hover:bg-anthracite hover:text-blanc hover:border-anthracite"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill={s.stroke ? "none" : "currentColor"}
                  stroke={s.stroke ? "currentColor" : "none"}
                  strokeWidth={s.stroke ? "1.8" : undefined}
                  aria-hidden="true"
                >
                  {s.svg}
                </svg>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="relative max-w-[760px] mx-auto bg-anthracite text-blanc rounded-[20px] p-12 max-md:p-8 overflow-hidden text-center">
            <div
              className="absolute -top-[40%] -right-[10%] w-[340px] h-[340px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(158,165,150,.28), transparent 70%)",
              }}
              aria-hidden="true"
            />
            <h3 className="text-[26px] font-bold mb-2 relative">
              Notre Discord communautaire
            </h3>
            <p className="text-white/65 mb-6 relative">
              Envie d&apos;échanger sur votre projet ?
            </p>

            <ul className="list-none flex flex-col gap-3 max-w-[480px] mx-auto mb-7 text-left relative">
              {[
                "Inscription & bourse d'échange en moins de 2 min",
                "Posez vos questions et recevez des réponses de la communauté",
                "Échangez directement avec l'équipe Markus et d'autres porteurs de projet",
              ].map((line, i) => (
                <li
                  key={i}
                  className="flex gap-3 items-start text-[15px] text-white/88"
                >
                  <span className="text-sauge font-bold shrink-0">↳</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>

            <div className="relative">
              <Button
                href="https://discord.gg/fSyn28G5U"
                external
                variant="sauge"
              >
                Rejoindre le Discord
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
