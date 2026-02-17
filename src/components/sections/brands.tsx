"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/layout/container";

interface Brand {
  name: string;
  logo?: string;
  url: string;
}

const brands: Brand[] = [
  { name: "The Wall Street Journal", logo: "/wsjlogo.png", url: "https://wsj.com" },
  { name: "California Pizza Kitchen", logo: "/cpklogo2.png", url: "https://cpk.com" },
  { name: "Din Tai Fung", logo: "/dtflogo.png", url: "https://dtf.com" },
  { name: "RD Station", logo: "/rdstationlogo.svg", url: "https://rdstation.com.br" },
  { name: "DeOnibus", logo: "/deonibuslogo.svg", url: "https://deonibus.com" },
];

function BrandItem({ brand }: { brand: Brand }) {
  if (brand.logo) {
    return (
      <a
        href={brand.url}
        target="_blank"
        rel="noopener noreferrer"
        title={brand.name}
        className="inline-flex shrink-0 items-center px-8"
      >
        <Image
          src={brand.logo}
          alt={brand.name}
          width={150}
          height={40}
          className="h-8 w-auto object-contain opacity-40 grayscale transition-all hover:opacity-70 hover:grayscale-0"
        />
      </a>
    );
  }

  return (
    <a
      href={brand.url}
      target="_blank"
      rel="noopener noreferrer"
      title={brand.name}
      className="shrink-0 whitespace-nowrap px-8 text-lg font-semibold text-muted-foreground/40 transition-colors hover:text-muted-foreground"
    >
      {brand.name}
    </a>
  );
}

function BrandSet() {
  return (
    <div className="flex shrink-0 items-center">
      {brands.map((brand) => (
        <BrandItem key={brand.name} brand={brand} />
      ))}
    </div>
  );
}

export function Brands() {
  return (
    <section className="border-t border-border/40 py-16 bg-white">
      <Container>
        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />

          <div className="flex w-max animate-scroll will-change-transform">
            <BrandSet />
            <BrandSet />
          </div>
        </div>
      </Container>
    </section>
  );
}
