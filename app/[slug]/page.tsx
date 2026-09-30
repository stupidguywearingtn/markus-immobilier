import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageRender } from "@/components/page-builder/page-render";
import { getPublishedPage, rootSeo } from "@/lib/page-builder/db";
import { RESERVED_SLUGS } from "@/lib/page-builder/slugs";
import { JsonLd } from "@/components/seo/json-ld";

/**
 * Pages créées par le client dans l'éditeur (/admin/pages).
 * Les pages codées (/contact, /estimation…) ont priorité : Next.js sert
 * toujours une route statique avant un segment dynamique.
 */

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

async function load(slug: string) {
  if (RESERVED_SLUGS.has(slug) || !/^[a-z0-9-]+$/.test(slug)) return null;
  return getPublishedPage(slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await load(slug);
  if (!page) return {};
  const seo = rootSeo(page.data);
  return {
    title: seo.title ?? page.titre,
    description: seo.description,
    alternates: { canonical: `/${slug}` },
    ...(seo.noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: { title: seo.title ?? page.titre, description: seo.description, url: `/${slug}` },
  };
}

export default async function BuilderPage({ params }: Props) {
  const { slug } = await params;
  const page = await load(slug);
  if (!page) notFound();
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.markusimmobilier.fr/" },
      { "@type": "ListItem", position: 2, name: page.titre, item: `https://www.markusimmobilier.fr/${slug}` },
    ],
  };
  return (
    <>
      <JsonLd data={breadcrumb} />
      <PageRender data={page.data} />
    </>
  );
}
