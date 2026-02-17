"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { skills } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const categories = [
  {
    name: "Expert",
    color: "bg-green-500",
    // description: "Daily drivers",
    items: skills.expert,
  },
  {
    name: "Intermediate",
    color: "bg-yellow-500",
    // description: "Shipped to production",
    items: skills.production,
  },
  {
    name: "Exploring",
    color: "bg-blue-500",
    // description: "Building expertise",
    items: skills.exploring,
  },
];

export function Skills() {
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
            Skills & Technologies
          </h2>
        </motion.div>

        <div className="mt-12 space-y-10">
          {categories.map((category) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="mb-4 flex items-baseline gap-3">
                <span className={cn("inline-block h-2.5 w-2.5 rounded-full", category.color)}/>
                  <h3 className="text-lg font-semibold">{category.name}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.items.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-border/60 px-4 py-2 text-xs text-black transition-colors bg-white"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Practices & Methodologies */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-xl border-l-2 border-primary bg-muted/30 px-6 py-5"
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
              More Keywords
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {skills.practices.join(", ")}
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
