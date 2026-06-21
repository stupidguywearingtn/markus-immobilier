import type { MetadataRoute } from "next";
import { PROPERTIES } from "@/lib/mock-properties";
import { ARTICLES } from "@/lib/blog";

const BASE = "https://www.markusimmobilier.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, priority: 1, changeFrequency: "weekly" },
    { url: `${BASE}/estimation`, lastModified: now, priority: 0.9, changeFrequency: "monthly" },
    { url: `${BASE}/vendre`, lastModified: now, priority: 0.9, changeFrequency: "monthly" },
    { url: `${BASE}/acheter`, lastModified: now, priority: 0.9, changeFrequency: "monthly" },
    { url: `${BASE}/gestion-locative`, lastModified: now, priority: 0.85, changeFrequency: "monthly" },
    { url: `${BASE}/agence-immobiliere-villeurbanne`, lastModified: now, priority: 0.85, changeFrequency: "monthly" },
    { url: `${BASE}/annonces`, lastModified: now, priority: 0.8, changeFrequency: "daily" },
    { url: `${BASE}/faire-gerer`, lastModified: now, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE}/blog`, lastModified: now, priority: 0.8, changeFrequency: "weekly" },
    { url: `${BASE}/contact`, lastModified: now, priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE}/recrutement`, lastModified: now, priority: 0.6, changeFrequency: "monthly" },
    { url: `${BASE}/equipe`, lastModified: now, priority: 0.6, changeFrequency: "monthly" },
    { url: `${BASE}/honoraires`, lastModified: now, priority: 0.6, changeFrequency: "yearly" },
    { url: `${BASE}/mentions-legales`, lastModified: now, priority: 0.2, changeFrequency: "yearly" },
    { url: `${BASE}/confidentialite`, lastModified: now, priority: 0.2, changeFrequency: "yearly" },
    { url: `${BASE}/cookies`, lastModified: now, priority: 0.2, changeFrequency: "yearly" },
  ];
  const blogPages: MetadataRoute.Sitemap = ARTICLES.map((a) => ({
    url: `${BASE}/blog/${a.slug}`,
    lastModified: new Date(a.date),
    priority: 0.7,
    changeFrequency: "monthly",
  }));
  const propertyPages: MetadataRoute.Sitemap = PROPERTIES.map((p) => ({
    url: `${BASE}/annonces/${p.id}`,
    lastModified: now,
    priority: 0.6,
    changeFrequency: "weekly",
  }));
  return [...staticPages, ...blogPages, ...propertyPages];
}
