import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/layout/page-hero";
import { ContactForm } from "@/components/forms/contact-form";
import { MapPinDrop } from "@/components/illustrations/map-pin-drop";

export const metadata: Metadata = {
  title: "Contact — 04 78 37 13 67",
  description:
    "Contactez Markus Immobilier : 87 rue Édouard Vaillant, 69100 Villeurbanne. Téléphone, email, formulaire et plan d'accès.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Nous écrire"
        title={
          <>
            Une question ? <span className="grad-light">Parlons-en.</span>
          </>
        }
        lead="Une équipe locale, joignable, qui répond vite. Achat, location, gestion, syndic — on est là pour vous orienter."
        illustration={<MapPinDrop size={340} />}
      />

      {/* FORM (G) + CONTACT DIRECT + CARTE (D) — collés au hero, pas de grand vide */}
      <section className="bg-blanc pt-14 pb-[100px] max-md:pt-10 max-md:pb-[72px]">
        <div className="max-w-content mx-auto px-8 max-md:px-5 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 max-md:gap-8">
          {/* Form gauche */}
          <Reveal>
            <Eyebrow className="mb-3">Formulaire</Eyebrow>
            <h2 className="font-bold text-[clamp(30px,4vw,46px)] tracking-[-0.01em] mb-6">
              Écrivez-nous, <span className="grad">on répond.</span>
            </h2>
            <ContactForm />
          </Reveal>

          {/* Bloc Contact direct + carte + MapPin animé — droite */}
          <Reveal delay={140}>
            <div className="lg:sticky lg:top-[100px] space-y-6">
              <div>
                <Eyebrow className="mb-3">Contact direct</Eyebrow>
                <h2 className="font-bold text-[clamp(30px,4vw,46px)] tracking-[-0.01em]">
                  Ou plus rapide.
                </h2>
              </div>

              {/* Coordonnées */}
              <div className="bg-gris rounded-[20px] p-7 max-md:p-6 space-y-5">
                <ContactRow
                  icon={<PhoneIcon />}
                  label="Téléphone"
                  href="tel:0478371367"
                  value="04 78 37 13 67"
                />
                <ContactRow
                  icon={<MailIcon />}
                  label="E-mail"
                  href="mailto:villeurbanne@markusimmobilier.fr"
                  value="villeurbanne@markusimmobilier.fr"
                />
                <ContactRow
                  icon={<PinIcon />}
                  label="Adresse"
                  value="87 rue Édouard Vaillant, 69100 Villeurbanne"
                />

                <div className="border-t border-[var(--bordure)] pt-5">
                  <div className="text-[11px] uppercase tracking-[0.14em] text-[#7a817f] font-semibold mb-3">
                    Horaires d&apos;ouverture
                  </div>
                  <div className="space-y-2 text-[14px]">
                    <div className="flex justify-between">
                      <span className="font-semibold">Lundi – Samedi</span>
                      <span className="text-[#7a817f]">9h – 12h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Lundi – Vendredi</span>
                      <span className="text-[#7a817f]">
                        14h – 19h{" "}
                        <span className="text-sauge">sur RDV</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carte compacte avec MapPin animé */}
              <div className="relative min-h-[240px] rounded-[20px] overflow-hidden bg-gradient-to-br from-[#dfe2dd] via-[#c9cec6] to-[#b9bfb4]">
                <div
                  className="absolute inset-0 opacity-[0.10]"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, var(--color-anthracite) 1px, transparent 1px), linear-gradient(to bottom, var(--color-anthracite) 1px, transparent 1px)",
                    backgroundSize: "44px 44px",
                  }}
                  aria-hidden="true"
                />
                <div className="absolute inset-0 grid place-items-center">
                  <MapPinDrop size={140} />
                </div>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[9px] tracking-[0.18em] uppercase font-semibold text-[#5d6560]/65 whitespace-nowrap">
                  Carte Google Maps à venir
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <span className="w-11 h-11 shrink-0 rounded-full bg-blanc grid place-items-center text-sauge shadow-sm">
        {icon}
      </span>
      <span className="flex flex-col min-w-0">
        <span className="text-[11px] uppercase tracking-[0.12em] text-[#7a817f] font-semibold">
          {label}
        </span>
        <span className="text-[15px] font-semibold text-anthracite break-words">
          {value}
        </span>
      </span>
    </>
  );
  if (href) {
    return (
      <a
        href={href}
        className="flex items-center gap-4 group hover:text-sauge transition"
      >
        {content}
      </a>
    );
  }
  return <div className="flex items-center gap-4">{content}</div>;
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.37 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.4" />
    </svg>
  );
}
