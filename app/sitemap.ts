import type { MetadataRoute } from "next";

const SITE_URL = "https://tomrenard.site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/work", "/projects"].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
