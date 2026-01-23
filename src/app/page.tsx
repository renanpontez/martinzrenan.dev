import { Hero } from "@/components/sections/hero";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Skills } from "@/components/sections/skills";
import { Testimonials } from "@/components/sections/testimonials";
import { ContactCTA } from "@/components/sections/contact-cta";
import { getFeaturedProjects } from "@/lib/content";

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects("en");

  return (
    <>
      <Hero />
      {featuredProjects.length > 0 && (
        <FeaturedProjects projects={featuredProjects} />
      )}
      <Skills />
      <Testimonials />
      <ContactCTA />
    </>
  );
}
