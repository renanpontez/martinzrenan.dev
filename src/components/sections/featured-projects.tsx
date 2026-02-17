"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bus, Globe, Sparkles, BarChart3, UtensilsCrossed } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import type { Project } from "@/types";

interface FeaturedProjectsProps {
  projects: Project[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  bus: Bus,
  globe: Globe,
  sparkles: Sparkles,
  "bar-chart-3": BarChart3,
  utensils: UtensilsCrossed,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
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
              Featured Projects
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              A selection of projects that showcase my skills and experience
            </p>
          </div>
          <Button asChild variant="ghost" className="hidden gap-2 sm:flex">
            <Link href="/projects">
              View All Projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 space-y-4"
        >
          {projects.map((project) => {
            const Icon = project.icon ? iconMap[project.icon] : null;

            return (
              <motion.article
                key={project.slug}
                variants={itemVariants}
                className="group"
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="block rounded-xl border border-border/60 bg-card p-5 transition-colors hover:border-border hover:bg-muted/50"
                >
                  {/* Row 1: Icon + Title + Arrow */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      {Icon ? (
                        <Icon className="h-5 w-5" />
                      ) : (
                        <span className="text-base font-bold">
                          {project.title[0]}
                        </span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="truncate font-semibold group-hover:text-primary">
                          {project.title}
                        </h3>
                        {project.company && (
                          <span className="hidden shrink-0 text-sm text-muted-foreground sm:inline">
                            {project.company}
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">
                        {project.excerpt}
                      </p>
                    </div>

                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                  </div>

                  {/* Row 2: Metrics */}
                  {project.metrics && project.metrics.length > 0 && (
                    <div className="mt-4 flex gap-6 border-t border-border/40 pt-4">
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
                </Link>
              </motion.article>
            );
          })}
        </motion.div>

        <div className="mt-8 text-center sm:hidden">
          <Button asChild variant="outline" className="gap-2">
            <Link href="/projects">
              View All Projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
