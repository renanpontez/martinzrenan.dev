"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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

export function Testimonials() {
  const t = useTranslations("testimonials");

  const testimonials = [
    {
      id: "1",
      name: t("items.1.name"),
      role: t("items.1.role"),
      company: t("items.1.company"),
      content: t("items.1.content"),
    },
    {
      id: "2",
      name: t("items.2.name"),
      role: t("items.2.role"),
      company: t("items.2.company"),
      content: t("items.2.content"),
    },
    {
      id: "3",
      name: t("items.3.name"),
      role: t("items.3.role"),
      company: t("items.3.company"),
      content: t("items.3.content"),
    },
  ];

  return (
    <section className="border-t border-border/40 bg-muted/30 py-24 sm:py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{t("description")}</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mt-16 grid max-w-5xl gap-8 lg:grid-cols-3"
        >
          {testimonials.map((testimonial) => (
            <motion.figure
              key={testimonial.id}
              variants={itemVariants}
              className="relative rounded-xl border border-border/60 bg-card p-6"
            >
              <Quote className="absolute right-6 top-6 h-8 w-8 text-muted-foreground/20" />
              <blockquote className="text-muted-foreground">
                &ldquo;{testimonial.content}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-4">
                <Avatar>
                  <AvatarFallback>
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role} {t("at")} {testimonial.company}
                  </p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
