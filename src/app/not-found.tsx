"use client";

import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-md text-center">
          <p className="text-sm font-semibold text-primary">404</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Page Not Found
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild className="gap-2">
              <Link href="/">
                <Home className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <Button asChild variant="outline" className="gap-2">
              <Link href="/projects">
                <ArrowLeft className="h-4 w-4" />
                View Projects
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
