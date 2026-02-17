import { Hero } from "@/components/sections/hero";
import { Brands } from "@/components/sections/brands";
import { PersonalSummary } from "@/components/sections/personal-summary";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Skills } from "@/components/sections/skills";
import { Testimonials } from "@/components/sections/testimonials";
import { ContactCTA } from "@/components/sections/contact-cta";
import { BackgroundBlob } from "@/components/background-blob";
import { getFeaturedProjects } from "@/lib/content";

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects("en");

  return (
    <>
      {/* Blob: Hero area — top-right */}
      <div className="relative">
        <BackgroundBlob
          className="right-0 top-0 -translate-y-1/4 translate-x-1/4"
          clipPath="polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
          speed={-0.2}
        />
        <Hero />
        <Brands />
      </div>

      {/* Blob: About area — left */}
      <div className="relative">
        <BackgroundBlob
          className="left-0 top-0 -translate-x-1/3"
          gradient="from-primary/15 to-primary/5"
          clipPath="polygon(20% 10%, 80% 0%, 100% 40%, 90% 80%, 50% 100%, 10% 70%, 0% 30%)"
          speed={-0.4}
        />
        <PersonalSummary />
      </div>

      {/* Blob: Projects area — right */}
      <div className="relative">
        <BackgroundBlob
          className="right-0 top-1/4 translate-x-1/4"
          gradient="from-primary/10 to-primary/5"
          clipPath="polygon(30% 0%, 100% 10%, 95% 60%, 70% 100%, 10% 80%, 0% 40%)"
          speed={-0.3}
        />
        {featuredProjects.length > 0 && (
          <FeaturedProjects projects={featuredProjects} />
        )}
        <Skills />
      </div>

      {/* Blob: Bottom area — center-left */}
      <div className="relative">
        <BackgroundBlob
          className="left-1/4 top-0 -translate-y-1/4"
          gradient="from-primary/15 to-transparent"
          clipPath="polygon(50% 0%, 100% 25%, 85% 75%, 50% 100%, 15% 75%, 0% 25%)"
          speed={-0.25}
        />
        <Testimonials />
        <ContactCTA />
      </div>
    </>
  );
}
