import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { ProjectGrid } from "@/components/projects/project-grid";
import { Badge } from "@/components/ui/badge";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "All Projects",
  description:
    "A complete collection of my work, from enterprise applications to personal experiments",
};

export default async function ProjectsPage() {
  const projects = await getProjects("en");

  return (
    <div className="py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0">
          <Badge variant="secondary" className="mb-4">
            Portfolio
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            All Projects
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            A complete collection of my work, from enterprise applications to
            personal experiments
          </p>
        </div>

        <div className="mt-16">
          <ProjectGrid projects={projects} />
        </div>
      </Container>
    </div>
  );
}
