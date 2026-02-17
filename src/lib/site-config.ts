export const siteConfig = {
  name: "Renan Martins",
  title: "Senior Frontend Engineer",
  tagline: "React / TypeScript",
  description:
    "Senior Frontend Engineer with 10+ years of experience building high-performance web applications in fintech, travel tech, and food e-commerce.",
  url: "https://martinsrenan.dev",
  email: "martinzrenan@gmail.com",
  phone: "+55 85 99628-4730",
  location: "Ceara, Brazil",
  availability: "Remote Worldwide",
  social: {
    github: "https://github.com/renanpontez",
    linkedin: "https://www.linkedin.com/in/renanpmartins",
    twitter: "", // Add if you have one
  },
  resumeUrl: "/resume.pdf", // Add your resume PDF to public folder
} as const;

export const skills = {
  expert: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript (ES6+)",
    "Node.js",
    "Redux",
    "Context API",
    "Tailwind CSS",
    "SCSS/Sass",
    "Sanity CMS",
    "REST APIs",
    "CI/CD",
    "Git",
  ],
  production: [
    "Ruby on Rails",
    "GraphQL",
    "Styled Components",
    "Storybook",
    "Redis",
    "Webpack",
    "Jest",
    "Lottie",
    "Adyen",
    "Framer Motion",
  ],
  exploring: [
    "React Native",
    "Docker",
    "MongoDB",
    "SQL",
    "Vue.js",
    "System Design",
  ],
  practices: [
    "Clean Architecture",
    "Agile (Scrum/Kanban)",
    "Code Review",
    "Performance Optimization",
    "Accessibility (WCAG)",
    "A/B Testing",
    "Technical Documentation",
    "Mentoring",
  ],
} as const;

export const experience = [
  {
    title: "Senior Frontend Engineer",
    company: "Planetary",
    location: "New York, NY - USA (Remote)",
    period: "04/2022 - Present",
    description:
      "Digital agency building high-scale digital products for brands such as Google, Amazon, and Univision.",
    highlights: [
      "Reduced page load speed by 25% (from ~4.4s to ~3.3s) by optimizing UI and page architecture in a high-traffic Next.js app serving 400k+ monthly users",
      "Cut infrastructure costs by 35% and boosted Lighthouse score by 30+ points (from 60 to 90+) with ISR caching and webhook-based revalidation",
      "Increased catering revenue by 10% by redesigning restaurant e-commerce funnel with smart location-based features",
      "Delivered 100% content integrity in Sanity CMS multilingual data migration using GROQ queries and TypeScript scripts",
      "Architected multi-language, multi-region websites for high-ticket brands including California Pizza Kitchen, Din Tai Fung, and The Wall Street Journal",
      "Boosted Lighthouse accessibility score by 50+ points (from 40 to 90) implementing a11y best practices across 100+ pages",
    ],
  },
  {
    title: "Senior Frontend Engineer",
    company: "Agility Creative - Project: MINE",
    location: "Fortaleza, CE - Brazil (Remote)",
    period: "12/2021 - 04/2022",
    description: "B2B startup offering high-quality software development solutions.",
    highlights: [
      "Increased weekly organic traffic by 22% and achieved 90+ Lighthouse score through SEO and performance optimization",
      "Reduced homepage load time by 20% with responsive images, lazy loading, and component refactoring",
      "Drove 10,000 user signups and ~10% conversion (~990 orders) with AI-powered style-discovery feature",
      "Improved design system consistency with scalable React + TypeScript + Tailwind CSS + Storybook components",
    ],
  },
  {
    title: "Senior Frontend Engineer",
    company: "Agility Creative - Project: RD Station Marketing",
    location: "Fortaleza, CE - Brazil (Remote)",
    period: "07/2021 - 12/2021",
    description: "Marketing automation SaaS platform.",
    highlights: [
      "Increased plan conversion rate by 7% and upsell rate by 12% with high-impact pricing page experiment",
      "Boosted monthly engagement by 66% (150 to 250 actions) with React + Ruby onboarding flow",
      "Deployed 30+ product growth experiments focused on retention, engagement, and conversion",
    ],
  },
  {
    title: "Frontend Engineer",
    company: "Agility Creative - Project: DeOnibus",
    location: "Fortaleza, CE - Brazil (Remote)",
    period: "03/2018 - 07/2021",
    description: "Travel tech e-commerce platform for bus tickets.",
    highlights: [
      "Reduced page load time by 60% (from 10s to 4s) migrating legacy frontend to React with SSR, lazy loading, and Redis caching",
      "Recovered ~5% of lost orders (~500) with Node.js REST API and TypeScript bot for automatic payment retries",
      "Increased e-commerce conversion rate by 30% (from ~2% to ~2.6%) on platform with millions of annual orders",
      "Decreased fraud attempts by 14% (~2,800/year) optimizing payment validation and Adyen integration",
      "Reduced legacy CSS files by 69% (80 to 25) consolidating into structured SCSS",
    ],
  },
] as const;

export const education = [
  {
    degree: "Post-Graduation in Competitive Intelligence and Innovation in Marketing",
    institution: "Estacio de Sa University",
    location: "Brazil",
    year: "2018",
  },
  {
    degree: "Bachelor's Degree in Information Systems",
    institution: "Estacio de Sa University",
    location: "Brazil",
    year: "2016",
  },
] as const;

export const languages = [
  { name: "English", level: "Advanced / Fluent (C2)" },
  { name: "Portuguese", level: "Native" },
  { name: "Spanish", level: "Advanced" },
] as const;
