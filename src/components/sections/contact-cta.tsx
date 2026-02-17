"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";

export function ContactCTA() {
  return (
    <section className="border-t border-border/40 py-24 sm:py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl bg-primary px-6 py-16 text-center text-primary-foreground sm:px-16 sm:py-24"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Let&apos;s Build Something Great Together
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/80">
            Whether you&apos;re looking for a frontend engineer to join your team, need consulting on a project, or want to collaborate on something exciting, I&apos;d love to hear from you.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" variant="secondary" className="gap-2">
              <Link href="/contact">
                <Mail className="h-4 w-4" />
                Get in Touch
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="gap-2 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Link href="/projects">
                View Projects
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Decorative elements */}
          <div className="absolute -left-24 -top-24 h-48 w-48 rounded-full bg-primary-foreground/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-primary-foreground/10 blur-3xl" />
        </motion.div>
      </Container>
    </section>
  );
}
