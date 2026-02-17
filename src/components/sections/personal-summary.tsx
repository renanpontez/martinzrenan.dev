"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";

export function PersonalSummary() {
  return (
    <section className="border-t border-border/40 py-24 sm:py-32">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Photos - Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent blur-2xl" />

            <div className="relative grid grid-cols-2 gap-3">
              {/* Main portrait - spans 2 rows */}
              <div className="row-span-2 overflow-hidden rounded-2xl border border-border/60">
                <Image
                  src="/photo1.png"
                  alt="Renan Martins"
                  width={700}
                  height={500}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>

              {/* Coding close-up */}
              <div className="overflow-hidden rounded-2xl border border-border/60">
                <Image
                  src="/photo2.png"
                  alt="Renan coding"
                  width={400}
                  height={300}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Workspace */}
              <div className="overflow-hidden rounded-2xl border border-border/60">
                <Image
                  src="/photo3.png"
                  alt="Renan's workspace"
                  width={400}
                  height={300}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Text Content - Right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              About me
            </h2>

            <div className="mt-6 space-y-4 text-lg leading-8 text-muted-foreground">
              <p>
                I&apos;m Renan Martins, a Senior Frontend Engineer based in Ceará,
                Brazil, working remotely with teams worldwide. I specialize in
                building high-performance web applications using React,
                TypeScript, and Next.js.
              </p>

              <p>
                With 12+ years of experience across fintech, travel tech, and
                food e-commerce, I&apos;ve consistently delivered measurable
                results: reducing page load times by up to 60%, increasing
                conversion rates by 30%, and achieving 90+ Lighthouse scores
                across hundreds of pages.
              </p>

              <p>
                Currently at Planetary, I lead frontend development for
                large-scale digital products serving clients like California
                Pizza Kitchen, Din Tai Fung, and The Wall Street Journal.
              </p>
            </div>

            <div className="mt-8">
              <Button asChild className="gap-2">
                <Link href="/about">
                  Learn more about me
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
