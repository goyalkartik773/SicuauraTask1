import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = [
    {
      url: SITE_CONFIG.url,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${SITE_CONFIG.url}/search`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_CONFIG.url}/cart`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    },
  ];

  try {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    if (!res.ok) {
      return staticPaths;
    }
    const data = await res.json();
    const products = data.products || [];
    const productPaths = products.map((product: { id: number }) => ({
      url: `${SITE_CONFIG.url}/product/${product.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    return [...staticPaths, ...productPaths];
  } catch {
    return staticPaths;
  }
}
