import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://casa-sueno.com";
  const locales = ["en", "nl"];

  // Define all static pages
  const pages = [
    "",
    "/about",
    "/contact",
    "/house-rules",
    "/privacy",
    "/terms",
    "/cancellation-policy",
  ];

  // Generate sitemap entries for all locales
  const sitemapEntries: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    pages.forEach((page) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "daily" : "weekly",
        priority: page === "" ? 1.0 : 0.8,
      });
    });
  });

  return sitemapEntries;
}
