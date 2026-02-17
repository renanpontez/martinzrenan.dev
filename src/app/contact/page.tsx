import type { Metadata } from "next";
import { Mail, MapPin, Phone, Linkedin, Github } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { ContactForm } from "@/components/contact-form";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Get in Touch",
  description:
    "Whether you're interested in working together, have a question, or just want to say hello, I'd love to hear from you.",
};

export default function ContactPage() {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
    },
    {
      icon: Phone,
      label: "Phone",
      value: siteConfig.phone,
      href: `tel:${siteConfig.phone.replace(/\s/g, "")}`,
    },
    {
      icon: MapPin,
      label: "Location",
      value: `${siteConfig.location} (${siteConfig.availability})`,
      href: null,
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: siteConfig.social.github,
      username: "@renanpontez",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: siteConfig.social.linkedin,
      username: "/in/renanpmartins",
    },
  ];

  return (
    <div className="py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0">
          <Badge variant="secondary" className="mb-4">
            Get in Touch
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Contact
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Whether you&apos;re interested in working together, have a question,
            or just want to say hello, I&apos;d love to hear from you.
          </p>
        </div>

        <div className="mt-16 grid gap-16 lg:grid-cols-2">
          {/* Contact Form */}
          <div>
            <h2 className="text-xl font-semibold">Send a Message</h2>
            <p className="mt-2 text-muted-foreground">
              I&apos;ll get back to you as soon as possible.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-10">
            <div>
              <h2 className="text-xl font-semibold">Contact Information</h2>
              <p className="mt-2 text-muted-foreground">
                Prefer to reach out directly? Here&apos;s how you can contact me.
              </p>
              <ul className="mt-6 space-y-4">
                {contactInfo.map((item) => (
                  <li key={item.label} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      <item.icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-foreground hover:text-primary"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-foreground">{item.value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold">Connect</h2>
              <p className="mt-2 text-muted-foreground">
                Follow me on social media or check out my work.
              </p>
              <ul className="mt-6 space-y-4">
                {socialLinks.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 text-foreground transition-colors hover:text-primary"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                        <social.icon className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{social.label}</p>
                        <p className="text-sm text-muted-foreground">
                          {social.username}
                        </p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Availability */}
            <div className="rounded-xl border border-border/60 bg-muted/30 p-6">
              <h3 className="font-semibold">Current Availability</h3>
              <p className="mt-2 text-muted-foreground">
                I&apos;m currently open to new opportunities, including:
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  Full-time positions (remote worldwide)
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  Contract / consulting work
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  Technical advisory roles
                </li>
              </ul>
            </div>

            {/* Timezone */}
            <div className="rounded-xl border border-border/60 bg-card p-6">
              <h3 className="font-semibold">Timezone & Collaboration</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Based in Brazil (BRT/GMT-3), I have extensive experience
                collaborating with US-based teams and am flexible with meeting
                schedules to accommodate different time zones.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
