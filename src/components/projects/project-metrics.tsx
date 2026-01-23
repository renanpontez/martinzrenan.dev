import type { Project } from "@/types";

interface ProjectMetricsProps {
  metrics: NonNullable<Project["metrics"]>;
}

export function ProjectMetrics({ metrics }: ProjectMetricsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="rounded-xl border border-border/60 bg-card p-6 text-center"
        >
          <p className="text-3xl font-bold text-primary">{metric.value}</p>
          <p className="mt-1 text-sm text-muted-foreground">{metric.label}</p>
          {metric.improvement && (
            <p className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
              {metric.improvement}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
