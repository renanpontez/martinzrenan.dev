"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/layout/container";
import type { Project } from "@/types";

interface FeaturedProjectsProps {
  projects: Project[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const t = useTranslations("projects");

  return (
    <section className="border-t border-border/40 py-24 sm:py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between"
        >
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              {t("description")}
            </p>
          </div>
          <Button asChild variant="ghost" className="hidden gap-2 sm:flex">
            <Link href="/projects">
              {t("viewAll")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 grid gap-8 lg:grid-cols-2"
        >
          {projects.map((project, index) => (
            <motion.article
              key={project.slug}
              variants={itemVariants}
              className={`group relative overflow-hidden rounded-xl border border-border/60 bg-card ${
                index === 0 ? "lg:col-span-2" : ""
              }`}
            >
              <Link href={`/projects/${project.slug}`} className="block">
                <div
                  className={`relative ${
                    index === 0 ? "aspect-[2/1]" : "aspect-[16/10]"
                  } overflow-hidden bg-muted`}
                >
                  {project.coverImage ? (
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-muted to-muted/50">
                      <span className="text-4xl font-bold text-muted-foreground/20">
                        {project.title[0]}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.technologies.length - 4}
                      </Badge>
                    )}
                  </div>

                  <h3 className="mt-4 text-xl font-semibold group-hover:text-primary">
                    {project.title}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-muted-foreground">
                    {project.excerpt}
                  </p>

                  {project.metrics && project.metrics.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-4">
                      {project.metrics.slice(0, 3).map((metric, i) => (
                        <div key={i} className="text-sm">
                          <span className="font-semibold text-primary">
                            {metric.value}
                          </span>{" "}
                          <span className="text-muted-foreground">
                            {metric.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Link>

              <div className="absolute right-4 top-4 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-background/90 p-2 backdrop-blur-sm transition-colors hover:bg-background"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-background/90 p-2 backdrop-blur-sm transition-colors hover:bg-background"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github className="h-4 w-4" />
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </motion.div>

        <div className="mt-8 text-center sm:hidden">
          <Button asChild variant="outline" className="gap-2">
            <Link href="/projects">
              {t("viewAll")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
