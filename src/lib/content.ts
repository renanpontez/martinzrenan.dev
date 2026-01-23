import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Project, Post } from "@/types";

const projectsDirectory = path.join(process.cwd(), "src/content/projects");
const postsDirectory = path.join(process.cwd(), "src/content/posts");

function ensureDirectory(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function getLocalizedFile(
  directory: string,
  slug: string,
  locale: string
): { fullPath: string; exists: boolean } {
  // Try locale-specific file first (e.g., project-name.pt-BR.mdx)
  const localizedPath = path.join(directory, `${slug}.${locale}.mdx`);
  if (fs.existsSync(localizedPath)) {
    return { fullPath: localizedPath, exists: true };
  }

  // Fallback to default file (e.g., project-name.mdx)
  const defaultPath = path.join(directory, `${slug}.mdx`);
  if (fs.existsSync(defaultPath)) {
    return { fullPath: defaultPath, exists: true };
  }

  return { fullPath: defaultPath, exists: false };
}

export async function getProjects(locale: string = "en"): Promise<Project[]> {
  ensureDirectory(projectsDirectory);

  const fileNames = fs.readdirSync(projectsDirectory);

  // Get unique slugs (without locale suffix)
  const slugs = new Set<string>();
  fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .forEach((fileName) => {
      // Remove .mdx and potential locale suffix
      let slug = fileName.replace(/\.mdx$/, "");
      // Remove locale suffix if present (e.g., .pt-BR)
      slug = slug.replace(/\.(en|pt-BR)$/, "");
      slugs.add(slug);
    });

  const projects = Array.from(slugs).map((slug) => {
    const { fullPath } = getLocalizedFile(projectsDirectory, slug, locale);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      ...data,
    } as Project;
  });

  return projects.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getProjectBySlug(
  slug: string,
  locale: string = "en"
): Promise<{ project: Project; content: string } | null> {
  ensureDirectory(projectsDirectory);

  const { fullPath, exists } = getLocalizedFile(projectsDirectory, slug, locale);

  if (!exists) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    project: {
      slug,
      ...data,
    } as Project,
    content,
  };
}

export async function getFeaturedProjects(
  locale: string = "en"
): Promise<Project[]> {
  const projects = await getProjects(locale);
  return projects.filter((project) => project.featured).slice(0, 5);
}

export async function getPosts(locale: string = "en"): Promise<Post[]> {
  ensureDirectory(postsDirectory);

  const fileNames = fs.readdirSync(postsDirectory);

  // Get unique slugs (without locale suffix)
  const slugs = new Set<string>();
  fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .forEach((fileName) => {
      // Remove .mdx and potential locale suffix
      let slug = fileName.replace(/\.mdx$/, "");
      // Remove locale suffix if present (e.g., .pt-BR)
      slug = slug.replace(/\.(en|pt-BR)$/, "");
      slugs.add(slug);
    });

  const posts = Array.from(slugs).map((slug) => {
    const { fullPath } = getLocalizedFile(postsDirectory, slug, locale);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);

    return {
      slug,
      readingTime,
      ...data,
    } as Post;
  });

  return posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getPostBySlug(
  slug: string,
  locale: string = "en"
): Promise<{ post: Post; content: string } | null> {
  ensureDirectory(postsDirectory);

  const { fullPath, exists } = getLocalizedFile(postsDirectory, slug, locale);

  if (!exists) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  return {
    post: {
      slug,
      readingTime,
      ...data,
    } as Post,
    content,
  };
}

export async function getFeaturedPosts(locale: string = "en"): Promise<Post[]> {
  const posts = await getPosts(locale);
  return posts.filter((post) => post.featured).slice(0, 3);
}
