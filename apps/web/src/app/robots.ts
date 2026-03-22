import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: ["/api/", "/dashboard", "/agents", "/calls", "/numbers", "/settings", "/knowledge-base", "/batch-calls", "/analytics", "/qa", "/alerts", "/billing"],
        allow: "/",
      },
    ],
  };
}
