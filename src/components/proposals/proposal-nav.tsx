"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type NavItem = { label: string; href: string };

interface ProposalNavProps {
  label: string;
  items: NavItem[];
  cta?: NavItem;
}

export function ProposalNav({ label, items, cta }: ProposalNavProps) {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      const isScrolled = window.scrollY > 16;
      setScrolled(isScrolled);
      document.documentElement.classList.toggle(
        "proposal-scrolled",
        isScrolled
      );
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.documentElement.classList.remove("proposal-scrolled");
    };
  }, []);

  return (
    <nav
      className={cn(
        "sticky z-40 w-full border-b border-border/40 bg-background/85 backdrop-blur-md transition-[top] duration-300",
        scrolled ? "top-0" : "top-16"
      )}
    >
      <div className="mx-auto flex h-12 max-w-5xl items-center gap-6 px-6 lg:px-8">
        <span className="whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.25em] text-pink-500">
          {label}
        </span>

        <div className="ml-auto hidden items-center gap-5 md:flex">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {cta ? (
          <Link
            href={cta.href}
            className="ml-auto inline-flex items-center rounded-full bg-foreground px-4 py-1.5 text-xs font-medium text-background transition hover:bg-foreground/90 md:ml-0"
          >
            {cta.label}
          </Link>
        ) : null}
      </div>
    </nav>
  );
}
