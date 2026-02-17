export interface Project {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  coverImage: string;
  icon?: string;
  technologies: string[];
  role: string;
  duration: string;
  company?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  metrics?: {
    label: string;
    value: string;
    improvement?: string;
  }[];
  publishedAt: string;
}

export interface Post {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  coverImage?: string;
  tags: string[];
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  featured: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  content: string;
  linkedinUrl?: string;
}

export interface Skill {
  name: string;
  level: "expert" | "advanced" | "intermediate";
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}
