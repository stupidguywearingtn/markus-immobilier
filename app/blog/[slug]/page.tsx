import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button, ArrowRight } from "@/components/ui/button";
import { ArticleBody } from "@/components/blog/article-body";
import { JsonLd, breadcrumbLd, BASE } from "@/components/seo/json-ld";
import { ARTICLES, getArticle, getRelatedArticles } from "@/lib/blog";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  const url = `${BASE}/blog/${a.slug}`;
  return {
    title: a.title,
    description: a.metaDescription,
    alternates: { canonical: `/blog/${a.slug}` },
    openGraph: {
      type: "article",
      title: a.title,
      description: a.metaDescription,
      url,
      publishedTime: a.date,
    },
  };
}

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();

  const related = getRelatedArticles(a.slug, 2);

  const blogPostingLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: a.h1,
    description: a.metaDescription,
    datePublished: a.date,
    dateModified: a.date,
    inLanguage: "fr-FR",
    mainEntityOfPage: `${BASE}/blog/${a.slug}`,
    author: { "@type": "Organization", name: "Markus Immobilier", url: BASE },
    publisher: {
      "@type": "Organization",
      name: "Markus Immobilier",
      url: BASE,
      logo: { "@type": "ImageObject", url: `${BASE}/icon-512.png` },
    },
  };

  return (
    <>
      <JsonLd data={blogPostingLd} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Accueil", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: a.h1, path: `/blog/${a.slug}` },
        ])}
      />

      {/* HERO article */}
      <section
        className="relative bg-anthracite text-blanc overflow-hidden"
        style={{
          paddingTop: "clamp(130px, 13vw, 165px)",
          paddingBottom: "clamp(44px, 6vw, 70px)",
        }}
      >
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(55% 50% at 25% 25%, rgba(158,165,150,0.13) 0%, transparent 60%)",
          }}
          aria-hidden="true"
        />
        <div className="relative z-[1] max-w-[820px] mx-auto px-8 max-md:px-5">
          <nav className="text-[12px] text-blanc/55 mb-5" aria-label="Fil d'Ariane">
            <Link href="/" className="hover:text-blanc transition">Accueil</Link>
            <span className="mx-1.5">/</span>
            <Link href="/blog" className="hover:text-blanc transition">Blog</Link>
          </nav>
          <Eyebrow className="mb-3">Mis à jour le {fmtDate(a.date)}</Eyebrow>
          <h1
            className="font-extrabold tracking-[-0.02em] leading-[1.08]"
            style={{ fontSize: "clamp(28px, 4vw, 46px)" }}
          >
            {a.h1}
          </h1>
        </div>
      </section>

      {/* CORPS */}
      <section className="bg-blanc py-[70px] max-md:py-[48px]">
        <article className="max-w-[760px] mx-auto px-8 max-md:px-5">
          <ArticleBody blocks={a.blocks} />

          {/* CTA final vers la page argent */}
          <div className="mt-14 max-md:mt-10 bg-gris rounded-[18px] p-8 max-md:p-6 text-center border border-[var(--bordure)]">
            <Eyebrow className="mb-3">Passez à l&apos;action</Eyebrow>
            <p className="text-[17px] font-semibold text-anthracite mb-6 max-w-[440px] mx-auto leading-snug">
              Un projet immobilier à Lyon ou Villeurbanne ? Parlons-en.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button href={a.internalHref} variant="cta">
                {a.internalLabel}
                <ArrowRight />
              </Button>
              <Button href="/contact" variant="outline">
                Nous contacter
              </Button>
            </div>
          </div>

          {/* Articles liés (maillage interne) */}
          {related.length > 0 && (
            <div className="mt-14 max-md:mt-10 pt-10 border-t border-[var(--bordure)]">
              <Eyebrow className="mb-5">À lire aussi</Eyebrow>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="group block bg-blanc border border-[var(--bordure)] rounded-[14px] p-5 hover:border-sauge/40 hover:shadow-[0_18px_40px_-22px_rgba(56,62,66,0.2)] transition-all no-underline"
                  >
                    <h3 className="text-[15px] font-semibold text-anthracite leading-snug mb-1.5">
                      {r.title}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 text-[11.5px] font-bold uppercase tracking-[0.08em] text-sauge group-hover:gap-2.5 transition-all">
                      Lire l&apos;article
                      <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Retour blog */}
          <div className="mt-10 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-sauge hover:gap-2.5 transition-all"
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M19 12H5M11 6l-6 6 6 6" />
              </svg>
              Tous les articles
            </Link>
          </div>
        </article>
      </section>
    </>
  );
}
