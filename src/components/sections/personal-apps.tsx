"use client";

import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Smartphone, Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { personalApps } from "@/lib/site-config";

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

const statusColors: Record<string, string> = {
  MVP: "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400",
  Beta: "bg-blue-500/15 text-blue-700 dark:text-blue-400",
  Live: "bg-green-500/15 text-green-700 dark:text-green-400",
  "Coming Soon":
    "bg-muted text-muted-foreground",
};

function PlatformIcon({ platform }: { platform: string }) {
  if (platform === "Web") {
    return <Globe className="h-3 w-3" />;
  }
  return <Smartphone className="h-3 w-3" />;
}

export function PersonalApps() {
  return (
    <section className="border-t border-border/40 py-24 sm:py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Personal Apps & SaaS
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Products I&apos;m building from the ground up
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {personalApps.map((app) => (
            <motion.div
              key={app.slug}
              variants={itemVariants}
              className="rounded-xl border-t-2 border border-border/60 bg-card p-6 transition-colors hover:border-border hover:bg-muted/50"
              style={{ borderTopColor: app.brandColor }}
            >
              {/* Header: Logo + Name + Status */}
              <div className="flex items-center gap-3">
                <Image
                  src={app.logo}
                  alt={`${app.name} logo`}
                  width={40}
                  height={40}
                  className="object-contain"
                />
                <h3 className="font-semibold">{app.name}</h3>
                <Badge
                  variant="secondary"
                  className={`ml-auto border-0 ${statusColors[app.status] ?? ""}`}
                >
                  {app.status}
                </Badge>
              </div>

              {/* Tagline */}
              <p className="mt-2 text-sm italic text-muted-foreground">
                {app.tagline}
              </p>

              {/* Description */}
              <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
                {app.description}
              </p>

              {/* Platform badges */}
              <div className="mt-4 flex items-center gap-2">
                {app.platforms.map((platform) => (
                  <Badge
                    key={platform}
                    variant="outline"
                    className="gap-1 text-xs"
                  >
                    <PlatformIcon platform={platform} />
                    {platform}
                  </Badge>
                ))}
              </div>

              {/* Tech stack */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {app.technologies.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="text-xs text-muted-foreground"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>

              {/* Footer actions */}
              <div className="mt-6 flex items-center gap-4 border-t border-border/40 pt-4">
                <Link
                  href={`/apps/${app.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-primary"
                >
                  Learn more
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <a
                  href={app.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                  onClick={(e) => e.stopPropagation()}
                >
                  Visit
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
