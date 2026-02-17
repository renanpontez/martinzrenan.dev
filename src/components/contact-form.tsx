import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export function ContactForm() {
  return (
    <div className="rounded-xl border border-border/60 bg-muted/30 p-8 text-center">
      <Mail className="mx-auto h-10 w-10 text-muted-foreground" />
      <h3 className="mt-4 text-lg font-semibold">Drop me an email</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        I&apos;ll get back to you as soon as possible.
      </p>
      <Button asChild size="lg" className="mt-6 gap-2">
        <a href={`mailto:${siteConfig.email}`}>
          <Mail className="h-4 w-4" />
          Send me an email
        </a>
      </Button>
    </div>
  );
}
