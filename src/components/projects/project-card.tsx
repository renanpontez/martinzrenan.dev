"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bus, Sparkles, BarChart3, UtensilsCrossed } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  bus: Bus,
  sparkles: Sparkles,
  "bar-chart-3": BarChart3,
  utensils: UtensilsCrossed,
};

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const Icon = project.icon ? iconMap[project.icon] : null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
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
              <span className="text-base font-bold">{project.title[0]}</span>
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
                <span className="text-muted-foreground">{metric.label}</span>
              </div>
            ))}
          </div>
        )}
      </Link>
    </motion.article>
  );
}
