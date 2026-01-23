import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { mdxComponents } from "@/components/mdx-components";
import { getPostBySlug, getPosts } from "@/lib/content";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getPosts("en");
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await getPostBySlug(slug, "en");

  if (!result) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: result.post.title,
    description: result.post.description,
    openGraph: {
      title: result.post.title,
      description: result.post.description,
      type: "article",
      publishedTime: result.post.publishedAt,
      authors: ["Renan Martins"],
      images: result.post.coverImage
        ? [{ url: result.post.coverImage }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: result.post.title,
      description: result.post.description,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;

  const t = await getTranslations("writing");
  const result = await getPostBySlug(slug, "en");

  if (!result) {
    notFound();
  }

  const { post, content } = result;

  return (
    <>
      <ReadingProgress />

      <div className="py-16 sm:py-24">
        <Container>
          {/* Back button */}
          <Button asChild variant="ghost" className="mb-8 -ml-4 gap-2">
            <Link href="/writing">
              <ArrowLeft className="h-4 w-4" />
              {t("backToWriting")}
            </Link>
          </Button>

          {/* Header */}
          <header className="mx-auto max-w-3xl">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
              {post.title}
            </h1>

            <p className="mt-4 text-xl text-muted-foreground">
              {post.description}
            </p>

            {/* Meta info */}
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readingTime} {t("minRead")}
              </div>
            </div>
          </header>

          {/* Cover image */}
          {post.coverImage && (
            <div className="mt-12 overflow-hidden rounded-xl border border-border">
              <Image
                src={post.coverImage}
                alt={post.title}
                width={1200}
                height={630}
                className="w-full"
                priority
              />
            </div>
          )}

          {/* Content */}
          <article className="prose prose-neutral dark:prose-invert mx-auto mt-12 max-w-3xl">
            <MDXRemote source={content} components={mdxComponents} />
          </article>

          {/* Footer */}
          <footer className="mx-auto mt-16 max-w-3xl border-t border-border pt-8">
            <p className="text-muted-foreground">
              Thanks for reading! If you have questions or feedback, feel free
              to{" "}
              <Link
                href="/contact"
                className="font-medium text-primary underline underline-offset-4"
              >
                reach out
              </Link>
              .
            </p>
          </footer>
        </Container>
      </div>
    </>
  );
}
