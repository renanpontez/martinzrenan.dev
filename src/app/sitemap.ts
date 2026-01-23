import { MetadataRoute } from "next";
import { getProjects, getPosts } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  // Get all projects and posts
  const projects = await getProjects("en");
  const posts = await getPosts("en");

  const sitemapEntries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/writing`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Project pages
  for (const project of projects) {
    sitemapEntries.push({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: new Date(project.publishedAt),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  // Blog post pages
  for (const post of posts) {
    sitemapEntries.push({
      url: `${baseUrl}/writing/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return sitemapEntries;
}
