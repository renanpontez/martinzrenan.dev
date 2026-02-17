import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { siteConfig } from "@/lib/site-config";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | Senior Frontend Engineer`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Senior Frontend Engineer with 10+ years of experience building high-performance web applications in fintech, travel tech, and food e-commerce.",
  keywords: [
    "Frontend Engineer",
    "React Developer",
    "Next.js",
    "TypeScript",
    "Web Development",
    "Senior Developer",
    "JavaScript",
    "Performance Optimization",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Senior Frontend Engineer`,
    description:
      "Senior Frontend Engineer with 10+ years of experience building high-performance web applications in fintech, travel tech, and food e-commerce.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Senior Frontend Engineer`,
    description:
      "Senior Frontend Engineer with 10+ years of experience building high-performance web applications in fintech, travel tech, and food e-commerce.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen overflow-x-hidden bg-background font-sans antialiased">
        <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
