import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, ExternalLink, Github, User } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProjectMetrics } from "@/components/projects/project-metrics";
import { mdxComponents } from "@/components/mdx-components";
import { getProjectBySlug, getProjects } from "@/lib/content";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjects("en");
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await getProjectBySlug(slug, "en");

  if (!result) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: result.project.title,
    description: result.project.description,
    openGraph: {
      title: result.project.title,
      description: result.project.description,
      type: "article",
      images: result.project.coverImage
        ? [{ url: result.project.coverImage }]
        : undefined,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  const t = await getTranslations("projects");
  const result = await getProjectBySlug(slug, "en");

  if (!result) {
    notFound();
  }

  const { project, content } = result;

  return (
    <div className="py-16 sm:py-24">
      <Container>
        {/* Back button */}
        <Button asChild variant="ghost" className="mb-8 -ml-4 gap-2">
          <Link href="/projects">
            <ArrowLeft className="h-4 w-4" />
            {t("backToProjects")}
          </Link>
        </Button>

        {/* Header */}
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
            {project.title}
          </h1>

          <p className="mt-4 text-xl text-muted-foreground">
            {project.description}
          </p>

          {/* Meta info */}
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {project.role}
            </div>
            {project.company && (
              <div className="flex items-center gap-2">
                <span>{project.company}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {project.duration}
            </div>
          </div>

          {/* Links */}
          <div className="mt-6 flex flex-wrap gap-4">
            {project.liveUrl && (
              <Button asChild className="gap-2">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4" />
                  {t("liveDemo")}
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button asChild variant="outline" className="gap-2">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                  {t("viewSource")}
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Cover image */}
        {project.coverImage && (
          <div className="mt-12 overflow-hidden rounded-xl border border-border">
            <Image
              src={project.coverImage}
              alt={project.title}
              width={1200}
              height={630}
              className="w-full"
              priority
            />
          </div>
        )}

        {/* Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-semibold">{t("keyMetrics")}</h2>
            <ProjectMetrics metrics={project.metrics} />
          </div>
        )}

        {/* Content */}
        <article className="prose prose-neutral dark:prose-invert mx-auto mt-12 max-w-3xl">
          <MDXRemote source={content} components={mdxComponents} />
        </article>
      </Container>
    </div>
  );
}
