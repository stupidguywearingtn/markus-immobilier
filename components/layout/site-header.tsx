"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LogoMark } from "@/components/ui/logo";
import { ProButton } from "@/components/backoffice/ProButton";
import { track } from "@/lib/track";

const TEL = "04 78 37 13 67";
const TEL_HREF = "tel:0478371367";

export function SiteHeader() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{ top: "var(--bo-bar-height, 0px)" }}
      className={[
        "fixed left-0 right-0 z-[100] text-blanc",
        "[transition:all_0.35s_var(--ease)]",
        solid
          ? "bg-anthracite py-[14px] shadow-[0_8px_30px_rgba(0,0,0,0.18)]"
          : "bg-transparent py-[22px]",
      ].join(" ")}
    >
      <div className="max-w-content mx-auto px-8 max-md:px-5 flex items-center justify-between gap-4">
        <Link
          href="/"
          aria-label="Markus Immobilier — accueil"
          className="flex items-center no-underline text-inherit"
        >
          {/* Logo M seul (logo-markus-mark.svg) — pas de texte à côté */}
          <LogoMark size={solid ? 30 : 36} gradient />
        </Link>

        {/* Nav desktop — TOUS les liens en MAJUSCULES */}
        <nav className="hidden md:flex items-center gap-[26px]">
          <button
            type="button"
            className="border border-white/40 rounded-full px-3 py-[5px] text-[11px] tracking-[0.1em] uppercase opacity-90 hover:opacity-100 transition"
            aria-label="Changer la langue"
          >
            FR / EN
          </button>
          <Link
            href="/blog"
            className="text-[11.5px] font-semibold uppercase tracking-[0.12em] opacity-90 hover:opacity-100 hover:text-sauge transition"
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className="text-[11.5px] font-semibold uppercase tracking-[0.12em] opacity-90 hover:opacity-100 hover:text-sauge transition"
          >
            Contactez-nous
          </Link>
          <Link
            href="/espace-client"
            aria-label="Espace client"
            className="w-[34px] h-[34px] border border-white/40 rounded-full grid place-items-center opacity-90 hover:opacity-100 hover:border-sauge transition"
          >
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
            </svg>
          </Link>
          <Link
            href="/recrutement"
            className="text-[11.5px] font-semibold uppercase tracking-[0.12em] opacity-90 hover:opacity-100 hover:text-sauge transition"
          >
            On recrute
          </Link>
          <a
            href={TEL_HREF}
            onClick={() => track("clic_telephone")}
            className="text-[12px] font-bold tracking-[0.06em] hover:text-sauge transition"
          >
            {TEL}
          </a>
          <ProButton />
        </nav>

        {/* Mobile : tel + burger */}
        <div className="flex md:hidden items-center gap-3">
          <a
            href={TEL_HREF}
            onClick={() => track("clic_telephone")}
            className="text-[12px] font-bold tracking-[0.04em]"
            aria-label="Appeler Markus Immobilier"
          >
            {TEL}
          </a>
          <ProButton />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
            className="w-[34px] h-[34px] grid place-items-center border border-white/40 rounded-md"
          >
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown — MAJUSCULES aussi */}
      {open && (
        <div className="md:hidden bg-anthracite border-t border-white/10 px-5 py-5 flex flex-col gap-1">
          <Link
            href="/blog"
            onClick={() => setOpen(false)}
            className="text-[12.5px] font-semibold uppercase tracking-[0.12em] py-3 border-b border-white/10"
          >
            Blog
          </Link>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="text-[12.5px] font-semibold uppercase tracking-[0.12em] py-3 border-b border-white/10"
          >
            Contactez-nous
          </Link>
          <Link
            href="/recrutement"
            onClick={() => setOpen(false)}
            className="text-[12.5px] font-semibold uppercase tracking-[0.12em] py-3 border-b border-white/10"
          >
            On recrute
          </Link>
          <Link
            href="/espace-client"
            onClick={() => setOpen(false)}
            className="text-[12.5px] font-semibold uppercase tracking-[0.12em] py-3 border-b border-white/10"
          >
            Espace client
          </Link>
          <button
            type="button"
            className="text-[12.5px] font-semibold uppercase tracking-[0.12em] py-3 text-left"
            aria-label="Changer la langue"
          >
            FR / EN
          </button>
        </div>
      )}
    </header>
  );
}
