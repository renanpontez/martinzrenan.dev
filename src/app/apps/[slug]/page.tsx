import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ExternalLink,
  Globe,
  Smartphone,
  Users,
} from "lucide-react";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mdxComponents } from "@/components/mdx-components";
import { getAppContent } from "@/lib/content";
import { personalApps } from "@/lib/site-config";

interface AppPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return personalApps.map((app) => ({ slug: app.slug }));
}

export async function generateMetadata({
  params,
}: AppPageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await getAppContent(slug, "en");

  if (!result) {
    return { title: "App Not Found" };
  }

  return {
    title: `${result.app.name} | ${result.app.tagline}`,
    description: result.app.description,
    alternates: { canonical: `/apps/${slug}` },
    openGraph: {
      title: `${result.app.name} | ${result.app.tagline}`,
      description: result.app.description,
      type: "article",
    },
  };
}

function PlatformIcon({ platform }: { platform: string }) {
  if (platform === "Web") {
    return <Globe className="h-3.5 w-3.5" />;
  }
  return <Smartphone className="h-3.5 w-3.5" />;
}

export default async function AppPage({ params }: AppPageProps) {
  const { slug } = await params;
  const result = await getAppContent(slug, "en");

  if (!result) {
    notFound();
  }

  const { app, content } = result;

  return (
    <div className="py-16 sm:py-24">
      <Container>
        {/* Back button */}
        <Button asChild variant="ghost" className="mb-8 -ml-4 gap-2">
          <Link href="/#apps">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </Button>

        {/* Header */}
        <div className="mx-auto max-w-3xl">
          {/* Logo + Name */}
          <div className="flex items-center gap-4">
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl"
              style={{ backgroundColor: app.brandColor + "15" }}
            >
              <Image
                src={app.logo}
                alt={`${app.name} logo`}
                width={36}
                height={36}
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                {app.name}
              </h1>
              <p className="mt-1 text-xl italic text-muted-foreground">
                {app.tagline}
              </p>
            </div>
          </div>

          <p className="mt-6 text-lg text-muted-foreground">
            {app.description}
          </p>

          {/* Meta info */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Badge
              variant="secondary"
              className="border-0 bg-blue-500/15 text-blue-700 dark:text-blue-400"
            >
              {app.status}
            </Badge>
            {app.platforms.map((platform) => (
              <Badge key={platform} variant="outline" className="gap-1.5">
                <PlatformIcon platform={platform} />
                {platform}
              </Badge>
            ))}
            {app.pricing && (
              <span className="text-sm text-muted-foreground">
                {app.pricing}
              </span>
            )}
          </div>

          {/* CTAs */}
          <div className="mt-6 flex flex-wrap gap-4">
            <Button asChild className="gap-2">
              <a
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4" />
                Visit App
              </a>
            </Button>
          </div>

          {/* Tech stack */}
          <div className="mt-8 flex flex-wrap gap-2">
            {app.technologies.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>

          {/* Founders */}
          {app.founders && app.founders.length > 0 && (
            <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>
                {app.founders.map((f) => `${f.name} (${f.role})`).join(" & ")}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <article className="prose prose-neutral dark:prose-invert mx-auto mt-12 max-w-3xl">
          {await evaluate(content, { ...runtime }).then(
            ({ default: MDXContent }) => (
              <MDXContent components={mdxComponents} />
            )
          )}
        </article>
      </Container>
    </div>
  );
}
