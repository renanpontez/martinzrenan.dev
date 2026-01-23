import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/container";
import { PostCard } from "@/components/blog/post-card";
import { Badge } from "@/components/ui/badge";
import { getPosts } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("writing");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function WritingPage() {
  const t = await getTranslations("writing");
  const posts = await getPosts("en");

  return (
    <div className="py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0">
          <Badge variant="secondary" className="mb-4">
            Blog
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{t("description")}</p>
        </div>

        <div className="mt-16">
          {posts.length > 0 ? (
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <PostCard key={post.slug} post={post} index={index} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border py-16 text-center">
              <p className="text-muted-foreground">
                No posts yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
