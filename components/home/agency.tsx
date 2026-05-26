import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";

const HOURS = [
  { days: "Lundi – Samedi", time: "9h00 – 12h00" },
  { days: "Lundi – Vendredi", time: "14h00 – 19h00 · sur RDV" },
];

export function Agency() {
  return (
    <section id="agence" className="py-[120px] max-md:py-[72px] bg-gris">
      <div className="max-w-content mx-auto px-8 max-md:px-5">
        <Reveal className="text-center mb-[50px]">
          <Eyebrow className="mb-4">Infos pratiques</Eyebrow>
          <h2 className="font-bold leading-[1.12] tracking-[-0.01em] text-[clamp(30px,4vw,46px)]">
            Notre <span className="grad">agence.</span>
          </h2>
        </Reveal>

        <div className="grid gap-[56px] max-md:gap-9 items-stretch grid-cols-1 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <div className="flex flex-col justify-center h-full">
              {HOURS.map((h) => (
                <div
                  key={h.days}
                  className="flex justify-between gap-5 py-4 border-b border-[var(--bordure)] text-[15px]"
                >
                  <b className="font-semibold">{h.days}</b>
                  <span className="text-[#7a817f]">{h.time}</span>
                </div>
              ))}

              <div className="mt-6 text-sm text-[#5a6166] flex items-start gap-2.5">
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="var(--color-sauge)"
                  strokeWidth="1.8"
                  className="shrink-0"
                  aria-hidden="true"
                >
                  <path d="M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11z" />
                  <circle cx="12" cy="10" r="2.4" />
                </svg>
                <span>
                  87 rue Édouard Vaillant, 69100 Villeurbanne
                  <br />
                  <span className="text-[#9aa09d]">
                    Métro &amp; tramway à proximité — transports en commun directs
                  </span>
                </span>
              </div>

              <div className="mt-6">
                <Button href="tel:0478371367" variant="outline">
                  04 78 37 13 67
                </Button>
              </div>
            </div>
          </Reveal>

          {/* Vraie carte Google Maps — embed sans clé API */}
          <Reveal delay={120}>
            <div className="relative min-h-[360px] h-full rounded-[14px] overflow-hidden shadow-[0_18px_50px_-25px_rgba(56,62,66,0.25)]">
              <iframe
                src="https://maps.google.com/maps?q=87%20rue%20%C3%89douard%20Vaillant%2069100%20Villeurbanne&hl=fr&z=16&output=embed"
                title="Markus Immobilier — 87 rue Édouard Vaillant, Villeurbanne"
                className="absolute inset-0 w-full h-full"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
