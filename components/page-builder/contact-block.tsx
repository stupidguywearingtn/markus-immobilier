import type { ReactNode } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/forms/contact-form";
import { Section, SectionHead, type Espacement, type Fond } from "./ui";

/** Section « Formulaire de contact » : le vrai formulaire du site (e-mail Resend) + coordonnées officielles. */
export function ContactBlock({
  eyebrow,
  titre,
  titreAccent,
  intro,
  fond = "gris",
  espacement = "normal",
  ancre,
}: {
  eyebrow?: ReactNode;
  titre?: ReactNode;
  titreAccent?: ReactNode;
  intro?: ReactNode;
  fond?: Fond;
  espacement?: Espacement;
  ancre?: string;
}) {
  const sombre = fond === "anthracite";
  const lien = sombre ? "hover:text-sauge" : "hover:text-sauge-hover";
  return (
    <Section fond={fond} espacement={espacement} id={ancre || "contact"}>
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] items-start">
        <Reveal>
          <SectionHead eyebrow={eyebrow} titre={titre} titreAccent={titreAccent} intro={intro} fond={fond} />
          <ul className="mt-8 space-y-4 text-[15px]">
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-sauge" />
              <a href="tel:+33478371367" className={lien}>04 78 37 13 67</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-sauge" />
              <a href="mailto:villeurbanne@markusimmobilier.fr" className={lien}>villeurbanne@markusimmobilier.fr</a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-sauge" />
              <span>87 rue Édouard Vaillant, 69100 Villeurbanne</span>
            </li>
          </ul>
        </Reveal>
        <Reveal delay={120} className="text-anthracite">
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
