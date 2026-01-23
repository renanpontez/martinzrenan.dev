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
  proficient: [
    "React",
    "TypeScript",
    "JavaScript (ES6+)",
    "Next.js",
    "Tailwind CSS",
    "SCSS/Sass",
    "REST APIs",
    "Responsive Design",
    "UX/UI Best Practices",
    "Clean Code",
    "Git",
    "Agile (Scrum, Kanban)",
    "Context API",
    "Performance Optimization",
  ],
  intermediate: [
    "Node.js",
    "Express",
    "Testing (Jest)",
    "Redis",
    "Atomic Design",
    "Styled Components",
    "Storybook",
  ],
  beginner: [
    "Ruby",
    "MongoDB",
    "GraphQL",
    "Webpack",
    "SQL",
    "Vue.js",
    "Google Analytics",
  ],
} as const;

const experienceEn = [
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

const experiencePtBR = [
  {
    title: "Engenheiro Frontend Senior",
    company: "Planetary",
    location: "Nova York, NY - EUA (Remoto)",
    period: "04/2022 - Presente",
    description:
      "Agencia digital construindo produtos digitais de grande escala para marcas como Google, Amazon e Univision.",
    highlights: [
      "Reduzi a velocidade de carregamento em 25% (de ~4.4s para ~3.3s) otimizando UI e arquitetura de paginas em app Next.js de alto trafego com 400k+ usuarios mensais",
      "Cortei custos de infraestrutura em 35% e aumentei pontuacao Lighthouse em 30+ pontos (de 60 para 90+) com cache ISR e revalidacao baseada em webhook",
      "Aumentei receita de catering em 10% redesenhando funil de e-commerce de restaurante com recursos inteligentes baseados em localizacao",
      "Entreguei 100% de integridade de conteudo na migracao de dados multilingues do Sanity CMS usando queries GROQ e scripts TypeScript",
      "Arquitetei websites multi-idioma e multi-regiao para marcas de alto valor incluindo California Pizza Kitchen, Din Tai Fung e The Wall Street Journal",
      "Aumentei pontuacao de acessibilidade Lighthouse em 50+ pontos (de 40 para 90) implementando melhores praticas de a11y em 100+ paginas",
    ],
  },
  {
    title: "Engenheiro Frontend Senior",
    company: "Agility Creative - Projeto: MINE",
    location: "Fortaleza, CE - Brasil (Remoto)",
    period: "12/2021 - 04/2022",
    description: "Startup B2B oferecendo solucoes de desenvolvimento de software de alta qualidade.",
    highlights: [
      "Aumentei trafego organico semanal em 22% e alcancei pontuacao Lighthouse 90+ atraves de otimizacao de SEO e performance",
      "Reduzi tempo de carregamento da homepage em 20% com imagens responsivas, lazy loading e refatoracao de componentes",
      "Gerei 10.000 cadastros de usuarios e ~10% de conversao (~990 pedidos) com recurso de descoberta de estilo baseado em IA",
      "Melhorei consistencia do design system com componentes escalaveis em React + TypeScript + Tailwind CSS + Storybook",
    ],
  },
  {
    title: "Engenheiro Frontend Senior",
    company: "Agility Creative - Projeto: RD Station Marketing",
    location: "Fortaleza, CE - Brasil (Remoto)",
    period: "07/2021 - 12/2021",
    description: "Plataforma SaaS de automacao de marketing.",
    highlights: [
      "Aumentei taxa de conversao de planos em 7% e taxa de upsell em 12% com experimento de alto impacto na pagina de precos",
      "Aumentei engajamento mensal em 66% (150 para 250 acoes) com fluxo de onboarding em React + Ruby",
      "Implementei 30+ experimentos de crescimento de produto focados em retencao, engajamento e conversao",
    ],
  },
  {
    title: "Engenheiro Frontend",
    company: "Agility Creative - Projeto: DeOnibus",
    location: "Fortaleza, CE - Brasil (Remoto)",
    period: "03/2018 - 07/2021",
    description: "Plataforma de e-commerce de travel tech para passagens de onibus.",
    highlights: [
      "Reduzi tempo de carregamento em 60% (de 10s para 4s) migrando frontend legado para React com SSR, lazy loading e cache Redis",
      "Recuperei ~5% de pedidos perdidos (~500) com API REST Node.js e bot TypeScript para retentativas automaticas de pagamento",
      "Aumentei taxa de conversao do e-commerce em 30% (de ~2% para ~2.6%) em plataforma com milhoes de pedidos anuais",
      "Diminui tentativas de fraude em 14% (~2.800/ano) otimizando validacao de pagamento e integracao Adyen",
      "Reduzi arquivos CSS legados em 69% (80 para 25) consolidando em SCSS estruturado",
    ],
  },
] as const;

const educationEn = [
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

const educationPtBR = [
  {
    degree: "Pos-Graduacao em Inteligencia Competitiva e Inovacao em Marketing",
    institution: "Universidade Estacio de Sa",
    location: "Brasil",
    year: "2018",
  },
  {
    degree: "Bacharelado em Sistemas de Informacao",
    institution: "Universidade Estacio de Sa",
    location: "Brasil",
    year: "2016",
  },
] as const;

export const experience = experienceEn;
export const education = educationEn;

export function getLocalizedExperience(locale: string) {
  return locale === "pt-BR" ? experiencePtBR : experienceEn;
}

export function getLocalizedEducation(locale: string) {
  return locale === "pt-BR" ? educationPtBR : educationEn;
}

export const languages = [
  { name: "English", level: "Advanced / Fluent (C2)" },
  { name: "Portuguese", level: "Native" },
  { name: "Spanish", level: "Intermediate (Fluent reading)" },
] as const;
