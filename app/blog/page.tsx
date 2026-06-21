import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/reveal";
import { ContractIllust } from "@/components/illustrations/contract";
import { DrawOnScroll } from "@/components/illustrations/draw-on-scroll";
import { JsonLd, breadcrumbLd } from "@/components/seo/json-ld";
import { getArticlesSorted } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog immobilier — conseils Lyon & Villeurbanne",
  description:
    "Conseils immobiliers pour vendre, acheter, estimer et investir à Lyon et Villeurbanne : prix, DPE, frais de notaire, gestion locative et marché local.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog immobilier Markus — conseils Lyon & Villeurbanne",
    description:
      "Vendre, acheter, estimer, investir : nos guides pour réussir votre projet immobilier.",
    url: "https://www.markusimmobilier.fr/blog",
  },
};

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default function BlogPage() {
  const articles = getArticlesSorted();
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Accueil", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <PageHero
        eyebrow="Conseils & marché"
        title={<>Le blog <span className="grad-light">Markus.</span></>}
        lead="Vendre, acheter, estimer, investir, louer : nos guides concrets pour réussir votre projet immobilier à Lyon et Villeurbanne."
        illustration={
          <DrawOnScroll>
            <ContractIllust size={340} className="illust-on-dark" />
          </DrawOnScroll>
        }
      />

      <section className="bg-blanc py-[90px] max-md:py-[60px]">
        <div className="max-w-content mx-auto px-8 max-md:px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 max-md:gap-5">
            {articles.map((a, i) => (
              <Reveal key={a.slug} delay={(i % 3) * 80}>
                <Link
                  href={`/blog/${a.slug}`}
                  className="group h-full flex flex-col bg-blanc border border-[var(--bordure)] rounded-[18px] overflow-hidden hover:border-sauge/40 hover:shadow-[0_24px_52px_-24px_rgba(56,62,66,0.22)] hover:-translate-y-1.5 transition-all duration-500 no-underline"
                >
                  {/* Bandeau dégradé décoratif */}
                  <div className="relative aspect-[16/9] bg-gradient-to-br from-[#454c52] to-[#2b3034] grid place-items-center overflow-hidden">
                    <div
                      className="absolute inset-0 opacity-60"
                      style={{
                        background:
                          "radial-gradient(60% 60% at 30% 25%, rgba(158,165,150,0.22) 0%, transparent 60%)",
                      }}
                      aria-hidden="true"
                    />
                    <span className="relative text-blanc/90 font-extrabold text-[40px] leading-none select-none">
                      M
                    </span>
                  </div>
                  <div className="flex-1 flex flex-col p-6 max-md:p-5">
                    <time className="text-[11px] uppercase tracking-[0.12em] text-sauge font-semibold mb-2">
                      {fmtDate(a.date)}
                    </time>
                    <h2 className="text-[18px] font-bold tracking-[-0.005em] leading-snug text-anthracite mb-2.5">
                      {a.title}
                    </h2>
                    <p className="text-[14px] leading-relaxed text-[#5a6166] mb-5">
                      {a.excerpt}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.08em] text-sauge group-hover:gap-2.5 transition-all">
                      Lire l&apos;article
                      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
