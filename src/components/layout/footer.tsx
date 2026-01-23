"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Github, Linkedin } from "lucide-react";
import { Container } from "./container";
import { siteConfig } from "@/lib/site-config";

const socialLinks = [
  {
    name: "GitHub",
    href: siteConfig.social.github,
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: siteConfig.social.linkedin,
    icon: Linkedin,
  },
];

export function Footer() {
  const t = useTranslations("nav");
  const tFooter = useTranslations("footer");

  const footerLinks = [
    { name: t("home"), href: "/" as const },
    { name: t("about"), href: "/about" as const },
    { name: t("projects"), href: "/projects" as const },
    { name: t("writing"), href: "/writing" as const },
    { name: t("contact"), href: "/contact" as const },
  ];

  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <Container className="py-12">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex flex-col items-center gap-4 md:items-start">
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight transition-colors hover:text-primary"
            >
              {siteConfig.name}
            </Link>
            <p className="text-sm text-muted-foreground">
              {siteConfig.title} | {siteConfig.tagline}
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label={social.name}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-border/40 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}. {tFooter("rights")}
          </p>
        </div>
      </Container>
    </footer>
  );
}
