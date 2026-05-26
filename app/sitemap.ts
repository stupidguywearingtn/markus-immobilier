import type { MetadataRoute } from "next";
import { PROPERTIES } from "@/lib/mock-properties";

const BASE = "https://markusimmobilier.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, priority: 1, changeFrequency: "weekly" },
    { url: `${BASE}/annonces`, lastModified: now, priority: 0.9, changeFrequency: "daily" },
    { url: `${BASE}/estimation`, lastModified: now, priority: 0.9, changeFrequency: "monthly" },
    { url: `${BASE}/faire-gerer`, lastModified: now, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE}/contact`, lastModified: now, priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE}/recrutement`, lastModified: now, priority: 0.6, changeFrequency: "monthly" },
    { url: `${BASE}/equipe`, lastModified: now, priority: 0.6, changeFrequency: "monthly" },
    { url: `${BASE}/honoraires`, lastModified: now, priority: 0.6, changeFrequency: "yearly" },
    { url: `${BASE}/mentions-legales`, lastModified: now, priority: 0.2, changeFrequency: "yearly" },
    { url: `${BASE}/confidentialite`, lastModified: now, priority: 0.2, changeFrequency: "yearly" },
    { url: `${BASE}/cookies`, lastModified: now, priority: 0.2, changeFrequency: "yearly" },
  ];
  const propertyPages: MetadataRoute.Sitemap = PROPERTIES.map((p) => ({
    url: `${BASE}/annonces/${p.id}`,
    lastModified: now,
    priority: 0.7,
    changeFrequency: "weekly",
  }));
  return [...staticPages, ...propertyPages];
}
