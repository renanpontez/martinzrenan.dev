"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative overflow-hidden rounded-xl border border-border/60 bg-card"
    >
      <Link href={`/projects/${project.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
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

          <h3 className="mt-4 text-xl font-semibold transition-colors group-hover:text-primary">
            {project.title}
          </h3>

          <p className="mt-2 line-clamp-2 text-muted-foreground">
            {project.excerpt}
          </p>

          <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
            <span>{project.role}</span>
            {project.company && (
              <>
                <span>•</span>
                <span>{project.company}</span>
              </>
            )}
          </div>
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
            aria-label="View live site"
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
            aria-label="View source code"
          >
            <Github className="h-4 w-4" />
          </a>
        )}
      </div>
    </motion.article>
  );
}
