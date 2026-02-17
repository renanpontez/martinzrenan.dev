import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail, Globe, Zap, TrendingUp, Blocks, BookOpen } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { experience, education, languages } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Me",
  description:
    "Senior Frontend Engineer with 10+ years of experience building scalable web applications",
};

export default function AboutPage() {
  const values = [
    {
      title: "Performance First",
      icon: Zap,
      description:
        "Every millisecond matters. I focus on optimizing page load times and Core Web Vitals to deliver exceptional user experiences.",
    },
    {
      title: "Business Impact",
      icon: TrendingUp,
      description:
        "Technical excellence should translate to business results. I measure success by conversion rates, user engagement, and ROI.",
    },
    {
      title: "Clean Architecture",
      icon: Blocks,
      description:
        "Maintainable code is sustainable code. I build scalable systems with clear patterns and comprehensive documentation.",
    },
    {
      title: "Continuous Learning",
      icon: BookOpen,
      description:
        "The web evolves rapidly. I stay current with best practices while sharing knowledge through mentoring and code reviews.",
    },
  ];

  const achievements = [
    {
      metric: "60%",
      label: "Page Load Reduction",
      detail: "From 10s to 4s on large B2C platform",
    },
    {
      metric: "30%",
      label: "Conversion Increase",
      detail: "Through SSR migration and optimization",
    },
    {
      metric: "90+",
      label: "Lighthouse Score",
      detail: "Across 100+ pages with a11y best practices",
    },
    {
      metric: "35%",
      label: "Infrastructure Cost Reduction",
      detail: "Via ISR caching and smart revalidation",
    },
  ];

  return (
    <div className="py-16 sm:py-24">
      <Container>
        {/* Header */}
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none lg:grid lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8">
          <div className="lg:col-span-2">
            <Badge variant="secondary" className="mb-4">
              About Me
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Senior Frontend Engineer
              <br />
              with 10+ years of experience
            </h1>
          </div>

          <div className="mt-8 lg:mt-0">
            <p className="text-lg leading-8 text-muted-foreground">
              I&apos;m Renan Martins, a Senior Frontend Engineer based in Ceara,
              Brazil, working remotely with teams worldwide. I specialize in
              building high-performance web applications using React, TypeScript,
              and Next.js, with a track record of delivering measurable business
              results.
            </p>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Currently at Planetary, I lead frontend development for large-scale
              digital products serving clients like California Pizza Kitchen, Din
              Tai Fung, and The Wall Street Journal. My focus is on performance
              optimization, accessibility, and architecting CMS-driven
              multilingual websites.
            </p>
          </div>

          <div className="mt-8 lg:mt-0">
            <p className="text-lg leading-8 text-muted-foreground">
              Throughout my career across fintech, travel tech, and food
              e-commerce, I&apos;ve consistently delivered impactful results:
              reducing page load times by up to 60%, increasing conversion rates
              by 30%, and achieving 90+ Lighthouse scores across hundreds of
              pages.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild className="gap-2">
                <Link href="/contact">
                  <Mail className="h-4 w-4" />
                  Get in Touch
                </Link>
              </Button>
              <Button asChild variant="outline" className="gap-2">
                <Link href="/projects">
                  View My Work
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Key Achievements */}
        <section className="mt-24">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Notable Achievements
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.label}
                className="rounded-xl border border-border/60 bg-card p-6 text-center"
              >
                <p className="text-3xl font-bold text-primary">
                  {achievement.metric}
                </p>
                <p className="mt-1 font-semibold">{achievement.label}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {achievement.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="mt-24">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Values & Approach
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            The principles that guide my work and collaboration style
          </p>

          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-xl border border-border/60 bg-card p-6"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <value.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold">{value.title}</h3>
                <p className="mt-2 text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="mt-24">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Experience
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            10+ years building software across fintech, travel tech, and food
            e-commerce
          </p>

          <div className="mt-10 space-y-12">
            {experience.map((job, index) => (
              <div key={index} className="relative border-l-2 border-border pl-6">
                <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-background bg-primary" />
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{job.title}</h3>
                    <p className="text-primary">{job.company}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{job.period}</p>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {job.location}
                </p>
                <p className="mt-2 text-muted-foreground">{job.description}</p>
                <ul className="mt-4 space-y-2">
                  {job.highlights.slice(0, 4).map((highlight, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Education & Languages */}
        <section className="mt-24 grid gap-16 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Education
            </h2>
            <div className="mt-8 space-y-6">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-border/60 bg-card p-6"
                >
                  <p className="font-semibold">{edu.degree}</p>
                  <p className="mt-1 text-muted-foreground">
                    {edu.institution}, {edu.location}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{edu.year}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Languages
            </h2>
            <div className="mt-8 space-y-4">
              {languages.map((lang, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-xl border border-border/60 bg-card p-4"
                >
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">{lang.name}</span>
                  </div>
                  <Badge variant="secondary">{lang.level}</Badge>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-24 rounded-2xl bg-muted/50 p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Interested in working together?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            I&apos;m currently open to new opportunities including full-time
            remote positions, contract work, and consulting engagements.
          </p>
          <Button asChild size="lg" className="mt-8 gap-2">
            <Link href="/contact">
              Let&apos;s Connect
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </section>
      </Container>
    </div>
  );
}
