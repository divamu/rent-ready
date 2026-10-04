import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://rentready.be";

  return [
    { url: `${baseUrl}/nl`, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/fr`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/en`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/nl/aanvraag`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/fr/aanvraag`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/en/aanvraag`, changeFrequency: "monthly", priority: 0.8 },
  ];
}
