# Senior Frontend Engineer Portfolio: Technical Implementation Plan

**Document Version:** 1.0
**Last Updated:** January 22, 2026
**Purpose:** Comprehensive technical specification for implementing a high-performance, accessible portfolio website based on the Marketing Strategy document.

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Tech Stack Selection](#tech-stack-selection)
3. [Project Structure](#project-structure)
4. [Component Architecture](#component-architecture)
5. [Routing Strategy](#routing-strategy)
6. [Data Management](#data-management)
7. [Styling Approach](#styling-approach)
8. [Performance Strategy](#performance-strategy)
9. [SEO Implementation](#seo-implementation)
10. [Accessibility Implementation](#accessibility-implementation)
11. [Animation & Interaction](#animation--interaction)
12. [Testing Strategy](#testing-strategy)
13. [Deployment Strategy](#deployment-strategy)
14. [Development Workflow](#development-workflow)
15. [Implementation Phases](#implementation-phases)

---

## Executive Summary

### Goals

Build a portfolio website that:
- Achieves **90+ Lighthouse scores** across all categories
- Meets **WCAG 2.1 AA accessibility** standards
- Loads in **under 2.5 seconds** (LCP) on 3G connections
- Is **mobile-first** and fully responsive
- Is **easy to maintain** with content updates
- Demonstrates **senior-level engineering** through its implementation

### Technical Requirements Summary

| Requirement | Target |
|-------------|--------|
| Lighthouse Performance | 95+ |
| Lighthouse Accessibility | 100 |
| Lighthouse Best Practices | 100 |
| Lighthouse SEO | 100 |
| First Contentful Paint (FCP) | < 1.8s |
| Largest Contentful Paint (LCP) | < 2.5s |
| Cumulative Layout Shift (CLS) | < 0.1 |
| Time to Interactive (TTI) | < 3.8s |
| Initial JS Bundle | < 100KB gzipped |
| Total Page Weight | < 500KB first load |

---

## Tech Stack Selection

### Framework: Next.js 14+ (App Router)

**Rationale:**
- **Server Components by default**: Reduces client-side JavaScript bundle
- **Static Site Generation (SSG)**: Perfect for portfolio content that rarely changes
- **Incremental Static Regeneration (ISR)**: Allows content updates without full rebuilds
- **Image Optimization**: Built-in `next/image` with automatic WebP conversion, lazy loading, and responsive images
- **Font Optimization**: `next/font` for zero layout shift and automatic font subsetting
- **Built-in SEO Support**: Metadata API for comprehensive SEO implementation
- **Edge Runtime**: Fast response times globally
- **Industry Standard**: Demonstrates proficiency with modern React ecosystem

### Core Dependencies

```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0"
  }
}
```

### Styling: Tailwind CSS 3.4+

**Rationale:**
- **Utility-first**: Rapid development with consistent design tokens
- **Zero runtime CSS**: Fully compiled at build time
- **Purging unused styles**: Minimal CSS bundle size (typically < 10KB)
- **Dark mode support**: Built-in `dark:` variant
- **Responsive design**: Mobile-first breakpoint system
- **Design system integration**: Easy to enforce consistent spacing, colors, typography

```json
{
  "devDependencies": {
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0"
  }
}
```

### UI Components: shadcn/ui + Radix UI

**Rationale:**
- **Copy-paste components**: Full control, no dependency lock-in
- **Accessible by default**: Built on Radix UI primitives
- **Customizable**: Styled with Tailwind, easy to modify
- **Tree-shakeable**: Only include components you use
- **TypeScript native**: Full type safety

Components to install:
- `button` - CTAs and actions
- `card` - Project cards, testimonials
- `dialog` - Mobile navigation, image lightbox
- `navigation-menu` - Desktop navigation
- `sheet` - Mobile drawer navigation
- `separator` - Visual dividers
- `tooltip` - Icon explanations
- `form` - Contact form (with react-hook-form)
- `input` - Form fields
- `textarea` - Contact message
- `badge` - Technology tags

### Animation: Framer Motion

**Rationale:**
- **Declarative API**: Easy to understand and maintain
- **Performance optimized**: Hardware-accelerated animations
- **Gesture support**: Touch and mouse interactions
- **Layout animations**: Smooth list reordering
- **Reduced motion support**: Built-in `useReducedMotion` hook
- **Server Component compatible**: Can be used in Client Components only where needed

```json
{
  "dependencies": {
    "framer-motion": "^11.0.0"
  }
}
```

### Content Management: MDX

**Rationale:**
- **Developer-friendly**: Write content in Markdown with JSX components
- **Type-safe frontmatter**: Define content structure with TypeScript
- **No external dependencies**: Content lives in the repository
- **Version controlled**: Full Git history for content changes
- **Fast builds**: Pre-compiled at build time
- **Custom components**: Embed interactive elements in prose

```json
{
  "dependencies": {
    "@next/mdx": "^14.2.0",
    "@mdx-js/loader": "^3.0.0",
    "@mdx-js/react": "^3.0.0",
    "gray-matter": "^4.0.3",
    "reading-time": "^1.5.0"
  }
}
```

### Additional Dependencies

```json
{
  "dependencies": {
    "react-hook-form": "^7.51.0",
    "@hookform/resolvers": "^3.3.0",
    "zod": "^3.22.0",
    "lucide-react": "^0.350.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0"
  },
  "devDependencies": {
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.2.0",
    "prettier": "^3.2.0",
    "prettier-plugin-tailwindcss": "^0.5.0",
    "@next/bundle-analyzer": "^14.2.0"
  }
}
```

### Alternative Consideration: Astro

While Astro was considered for its:
- Zero JS by default
- Island architecture
- Multi-framework support

**Next.js was chosen because:**
1. More aligned with demonstrating React/TypeScript expertise (aligns with job targets)
2. Better ecosystem for interactive components
3. Stronger resume value for React-focused roles
4. Superior developer experience for React developers
5. Better ISR support for future blog content

---

## Project Structure

```
martinsrenan.dev/
├── .github/
│   └── workflows/
│       ├── ci.yml                    # Lint, type-check, test on PR
│       └── lighthouse.yml            # Performance monitoring
│
├── public/
│   ├── fonts/                        # Self-hosted fonts (if needed)
│   ├── images/
│   │   ├── projects/                 # Project screenshots/assets
│   │   ├── og/                       # Open Graph images
│   │   └── icons/                    # Favicons, app icons
│   ├── robots.txt                    # Search engine directives
│   ├── sitemap.xml                   # Generated at build time
│   └── manifest.json                 # PWA manifest
│
├── src/
│   ├── app/
│   │   ├── (marketing)/              # Route group for main pages
│   │   │   ├── page.tsx              # Homepage
│   │   │   ├── about/
│   │   │   │   └── page.tsx          # About page
│   │   │   ├── projects/
│   │   │   │   ├── page.tsx          # Projects index
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx      # Individual project
│   │   │   ├── writing/
│   │   │   │   ├── page.tsx          # Blog index
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx      # Individual post
│   │   │   └── contact/
│   │   │       └── page.tsx          # Contact page
│   │   │
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts          # Contact form handler
│   │   │
│   │   ├── layout.tsx                # Root layout (fonts, analytics)
│   │   ├── not-found.tsx             # 404 page
│   │   ├── error.tsx                 # Error boundary
│   │   ├── loading.tsx               # Global loading state
│   │   └── globals.css               # Global styles, Tailwind imports
│   │
│   ├── components/
│   │   ├── ui/                       # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   ├── badge.tsx
│   │   │   └── ...
│   │   │
│   │   ├── layout/                   # Layout components
│   │   │   ├── header.tsx            # Navigation header
│   │   │   ├── footer.tsx            # Site footer
│   │   │   ├── mobile-nav.tsx        # Mobile navigation drawer
│   │   │   ├── skip-link.tsx         # Accessibility skip link
│   │   │   └── container.tsx         # Content container
│   │   │
│   │   ├── sections/                 # Page sections
│   │   │   ├── hero.tsx              # Homepage hero
│   │   │   ├── featured-projects.tsx # Projects showcase
│   │   │   ├── skills.tsx            # Skills/expertise section
│   │   │   ├── testimonials.tsx      # Social proof section
│   │   │   ├── contact-cta.tsx       # Contact call-to-action
│   │   │   └── about-intro.tsx       # About page intro
│   │   │
│   │   ├── projects/                 # Project-specific components
│   │   │   ├── project-card.tsx      # Project preview card
│   │   │   ├── project-grid.tsx      # Projects layout grid
│   │   │   ├── project-header.tsx    # Case study header
│   │   │   ├── project-metrics.tsx   # Impact metrics display
│   │   │   ├── tech-stack.tsx        # Technology tags
│   │   │   └── related-projects.tsx  # Related projects section
│   │   │
│   │   ├── blog/                     # Blog components
│   │   │   ├── post-card.tsx         # Blog post preview
│   │   │   ├── post-header.tsx       # Article header
│   │   │   ├── post-footer.tsx       # Article footer with CTAs
│   │   │   ├── table-of-contents.tsx # TOC for long articles
│   │   │   └── reading-progress.tsx  # Progress indicator
│   │   │
│   │   ├── contact/                  # Contact components
│   │   │   ├── contact-form.tsx      # Main contact form
│   │   │   ├── form-success.tsx      # Success state
│   │   │   └── social-links.tsx      # Social media links
│   │   │
│   │   ├── mdx/                      # MDX custom components
│   │   │   ├── callout.tsx           # Highlighted callout box
│   │   │   ├── code-block.tsx        # Syntax highlighted code
│   │   │   ├── image.tsx             # Optimized MDX image
│   │   │   ├── video.tsx             # Embedded video
│   │   │   └── index.tsx             # MDX components export
│   │   │
│   │   └── shared/                   # Shared utility components
│   │       ├── animated-section.tsx  # Scroll-triggered animation wrapper
│   │       ├── external-link.tsx     # External link with icon
│   │       ├── image-zoom.tsx        # Zoomable image component
│   │       ├── theme-toggle.tsx      # Dark/light mode toggle
│   │       └── seo.tsx               # SEO meta component (if needed)
│   │
│   ├── content/
│   │   ├── projects/                 # Project MDX files
│   │   │   ├── project-one.mdx
│   │   │   ├── project-two.mdx
│   │   │   └── project-three.mdx
│   │   │
│   │   └── posts/                    # Blog post MDX files
│   │       ├── post-one.mdx
│   │       └── post-two.mdx
│   │
│   ├── lib/
│   │   ├── content.ts                # Content fetching utilities
│   │   ├── mdx.ts                    # MDX processing utilities
│   │   ├── utils.ts                  # General utilities (cn, etc.)
│   │   ├── constants.ts              # Site-wide constants
│   │   └── validations.ts            # Zod schemas for forms
│   │
│   ├── hooks/
│   │   ├── use-media-query.ts        # Responsive breakpoint detection
│   │   ├── use-scroll-position.ts    # Scroll position tracking
│   │   ├── use-reduced-motion.ts     # Reduced motion preference
│   │   └── use-intersection.ts       # Intersection Observer hook
│   │
│   ├── styles/
│   │   └── code-theme.css            # Code syntax highlighting theme
│   │
│   └── types/
│       ├── project.ts                # Project type definitions
│       ├── post.ts                   # Blog post type definitions
│       └── index.ts                  # Shared types
│
├── .env.example                      # Environment variables template
├── .env.local                        # Local environment variables
├── .eslintrc.json                    # ESLint configuration
├── .prettierrc                       # Prettier configuration
├── components.json                   # shadcn/ui configuration
├── next.config.mjs                   # Next.js configuration
├── postcss.config.mjs                # PostCSS configuration
├── tailwind.config.ts                # Tailwind configuration
├── tsconfig.json                     # TypeScript configuration
└── package.json
```

---

## Component Architecture

### Component Hierarchy

```
App (Root Layout)
├── SkipLink
├── Header
│   ├── Logo
│   ├── DesktopNav
│   │   └── NavLink[]
│   ├── ThemeToggle
│   └── MobileNav (Sheet)
│       └── NavLink[]
│
├── Main (Page Content)
│   │
│   ├── [Homepage]
│   │   ├── Hero
│   │   │   ├── Heading
│   │   │   ├── Tagline
│   │   │   ├── CTAButtons
│   │   │   └── TrustSignals
│   │   ├── FeaturedProjects
│   │   │   └── ProjectCard[]
│   │   ├── Skills
│   │   │   └── SkillCategory[]
│   │   ├── Testimonials
│   │   │   └── TestimonialCard[]
│   │   └── ContactCTA
│   │
│   ├── [About]
│   │   ├── AboutHero
│   │   ├── Story (MDX Content)
│   │   ├── Values
│   │   └── ContactCTA
│   │
│   ├── [Projects Index]
│   │   ├── PageHeader
│   │   └── ProjectGrid
│   │       └── ProjectCard[]
│   │
│   ├── [Project Detail]
│   │   ├── ProjectHeader
│   │   │   ├── Title
│   │   │   ├── Meta (role, timeline)
│   │   │   └── TechStack
│   │   ├── HeroImage
│   │   ├── ProjectContent (MDX)
│   │   │   ├── Callout[]
│   │   │   ├── CodeBlock[]
│   │   │   └── Image[]
│   │   ├── ProjectMetrics
│   │   ├── RelatedProjects
│   │   └── ContactCTA
│   │
│   ├── [Writing Index]
│   │   ├── PageHeader
│   │   └── PostList
│   │       └── PostCard[]
│   │
│   ├── [Post Detail]
│   │   ├── PostHeader
│   │   │   ├── Title
│   │   │   ├── Meta (date, reading time)
│   │   │   └── Tags
│   │   ├── TableOfContents
│   │   ├── ReadingProgress
│   │   ├── PostContent (MDX)
│   │   ├── PostFooter
│   │   │   └── SocialShare
│   │   └── RelatedPosts
│   │
│   ├── [Contact]
│   │   ├── PageHeader
│   │   ├── ContactForm
│   │   │   ├── Input (name)
│   │   │   ├── Input (email)
│   │   │   ├── Textarea (message)
│   │   │   └── Button (submit)
│   │   ├── FormSuccess
│   │   └── AlternativeContact
│   │       └── SocialLinks
│   │
│   └── [404]
│       ├── ErrorMessage
│       └── NavigationSuggestions
│
└── Footer
    ├── FooterNav
    ├── SocialLinks
    └── Copyright
```

### Component Specifications

#### Layout Components

##### Header (`/components/layout/header.tsx`)
- **Type:** Client Component (requires interactivity)
- **Responsibilities:**
  - Display logo/name linking to homepage
  - Render desktop navigation links
  - Handle scroll-based visibility (hide on scroll down, show on scroll up)
  - Apply backdrop blur when scrolled
  - Render theme toggle
  - Conditionally render mobile navigation trigger
- **Props:**
  ```typescript
  interface HeaderProps {
    // No props needed - uses internal state and hooks
  }
  ```
- **States:**
  - `isScrolled: boolean` - Whether page has been scrolled
  - `isVisible: boolean` - Whether header is visible (hide on scroll)
- **Accessibility:**
  - `<header>` semantic element
  - `role="banner"`
  - Skip link target

##### Footer (`/components/layout/footer.tsx`)
- **Type:** Server Component
- **Responsibilities:**
  - Display secondary navigation links
  - Render social media links
  - Show copyright and "built with" info
  - Display current availability status (from constants)
- **Props:**
  ```typescript
  interface FooterProps {
    // No props - uses constants for content
  }
  ```
- **Accessibility:**
  - `<footer>` semantic element
  - `role="contentinfo"`
  - Proper link labels

##### MobileNav (`/components/layout/mobile-nav.tsx`)
- **Type:** Client Component
- **Responsibilities:**
  - Full-screen navigation overlay
  - Animated slide-in drawer
  - Close on navigation
  - Close on Escape key
  - Trap focus when open
- **Props:**
  ```typescript
  interface MobileNavProps {
    isOpen: boolean;
    onClose: () => void;
  }
  ```
- **Accessibility:**
  - Focus trap when open
  - `aria-modal="true"`
  - `aria-label="Main navigation"`
  - Return focus on close

#### Section Components

##### Hero (`/components/sections/hero.tsx`)
- **Type:** Server Component (with Client Component children for animations)
- **Responsibilities:**
  - Display name with primary heading
  - Show tagline/value proposition
  - Render primary and secondary CTAs
  - Display trust signals (years experience, companies, etc.)
  - Optional: professional photo
- **Props:**
  ```typescript
  interface HeroProps {
    name: string;
    tagline: string;
    description: string;
    primaryCTA: {
      text: string;
      href: string;
    };
    secondaryCTA: {
      text: string;
      href: string;
    };
    stats?: Array<{
      value: string;
      label: string;
    }>;
  }
  ```
- **Accessibility:**
  - Single `<h1>` for the page
  - Meaningful link text for CTAs

##### FeaturedProjects (`/components/sections/featured-projects.tsx`)
- **Type:** Server Component
- **Responsibilities:**
  - Fetch and display 3-5 featured projects
  - Responsive grid layout
  - "View All Projects" link
- **Props:**
  ```typescript
  interface FeaturedProjectsProps {
    projects: Project[];
    title?: string;
    showViewAll?: boolean;
  }
  ```

##### Skills (`/components/sections/skills.tsx`)
- **Type:** Server Component
- **Responsibilities:**
  - Display skills organized by category
  - Show proficiency levels (Expert/Advanced/Proficient)
  - Responsive grid for skill categories
- **Props:**
  ```typescript
  interface SkillsProps {
    categories: Array<{
      name: string;
      skills: Array<{
        name: string;
        level: 'expert' | 'advanced' | 'proficient';
      }>;
    }>;
  }
  ```

##### Testimonials (`/components/sections/testimonials.tsx`)
- **Type:** Client Component (for carousel/animation)
- **Responsibilities:**
  - Display 2-4 testimonial quotes
  - Auto-advance carousel (respecting reduced motion)
  - Manual navigation controls
  - Pause on hover/focus
- **Props:**
  ```typescript
  interface TestimonialsProps {
    testimonials: Array<{
      quote: string;
      author: string;
      title: string;
      company: string;
      relationship: string;
      image?: string;
    }>;
  }
  ```
- **Accessibility:**
  - `aria-live="polite"` for auto-advance
  - Keyboard navigation for controls
  - Pause on focus for screen readers

#### Project Components

##### ProjectCard (`/components/projects/project-card.tsx`)
- **Type:** Client Component (for hover animations)
- **Responsibilities:**
  - Display project thumbnail
  - Show project title and brief description
  - Display technology tags (limited to 4-5)
  - Show key impact metric
  - Hover state with additional info
  - Link to full case study
- **Props:**
  ```typescript
  interface ProjectCardProps {
    project: {
      slug: string;
      title: string;
      description: string;
      thumbnail: string;
      technologies: string[];
      metric?: {
        value: string;
        label: string;
      };
      featured?: boolean;
    };
  }
  ```
- **Accessibility:**
  - Entire card is a link (not nested links)
  - Image alt text describing project
  - Focus visible state

##### ProjectHeader (`/components/projects/project-header.tsx`)
- **Type:** Server Component
- **Responsibilities:**
  - Display project title as H1
  - Show project metadata (role, timeline, company)
  - Display technology stack with badges
  - External links (live demo, GitHub)
- **Props:**
  ```typescript
  interface ProjectHeaderProps {
    title: string;
    role: string;
    timeline: string;
    company?: string;
    technologies: string[];
    liveUrl?: string;
    githubUrl?: string;
  }
  ```

##### ProjectMetrics (`/components/projects/project-metrics.tsx`)
- **Type:** Client Component (for count-up animation)
- **Responsibilities:**
  - Display impact metrics in grid
  - Animate numbers on scroll into view
  - Show before/after comparisons
- **Props:**
  ```typescript
  interface ProjectMetricsProps {
    metrics: Array<{
      value: string | number;
      label: string;
      prefix?: string;
      suffix?: string;
      type: 'number' | 'percentage' | 'time' | 'text';
    }>;
  }
  ```
- **Accessibility:**
  - Metrics announced correctly by screen readers
  - Animation respects `prefers-reduced-motion`

#### Contact Components

##### ContactForm (`/components/contact/contact-form.tsx`)
- **Type:** Client Component
- **Responsibilities:**
  - Validate form inputs with Zod
  - Handle form submission
  - Display loading/success/error states
  - Rate limiting (basic client-side)
- **Props:**
  ```typescript
  interface ContactFormProps {
    onSuccess?: () => void;
  }
  ```
- **Form Fields:**
  - Name (required, min 2 chars)
  - Email (required, valid email)
  - Company (optional)
  - Message (required, min 10 chars)
- **States:**
  - `idle` - Initial state
  - `submitting` - Form being submitted
  - `success` - Submission successful
  - `error` - Submission failed
- **Accessibility:**
  - Labels associated with inputs
  - Error messages linked with `aria-describedby`
  - Focus management on error
  - Submit button disabled during submission

#### MDX Components

##### Callout (`/components/mdx/callout.tsx`)
- **Type:** Server Component
- **Responsibilities:**
  - Display highlighted information box
  - Support variants (info, warning, success, error)
- **Props:**
  ```typescript
  interface CalloutProps {
    type?: 'info' | 'warning' | 'success' | 'error';
    title?: string;
    children: React.ReactNode;
  }
  ```
- **Accessibility:**
  - `role="note"` or appropriate ARIA role
  - Icon has `aria-hidden="true"`

##### CodeBlock (`/components/mdx/code-block.tsx`)
- **Type:** Client Component (for copy button)
- **Responsibilities:**
  - Syntax highlighting with Shiki or Prism
  - Display language label
  - Copy-to-clipboard button
  - Line numbers (optional)
  - Line highlighting (optional)
- **Props:**
  ```typescript
  interface CodeBlockProps {
    code: string;
    language: string;
    filename?: string;
    showLineNumbers?: boolean;
    highlightLines?: number[];
  }
  ```
- **Accessibility:**
  - `<pre>` and `<code>` elements
  - Copy button has accessible label
  - Screen reader announces copy success

---

## Routing Strategy

### Route Structure

```
/                       → Homepage (marketing/page.tsx)
/about                  → About page (marketing/about/page.tsx)
/projects               → Projects index (marketing/projects/page.tsx)
/projects/[slug]        → Project detail (marketing/projects/[slug]/page.tsx)
/writing                → Blog index (marketing/writing/page.tsx)
/writing/[slug]         → Blog post (marketing/writing/[slug]/page.tsx)
/contact                → Contact page (marketing/contact/page.tsx)
/api/contact            → Contact form API (api/contact/route.ts)
```

### Route Group: (marketing)

Using a route group to:
1. Share common layout (header/footer) for all marketing pages
2. Keep API routes separate
3. Allow future expansion (e.g., `/dashboard` for admin)

### Static vs Dynamic Routes

| Route | Type | Reason |
|-------|------|--------|
| `/` | Static (SSG) | Content rarely changes |
| `/about` | Static (SSG) | Content rarely changes |
| `/projects` | Static (SSG) | List generated from MDX files |
| `/projects/[slug]` | Static (SSG) | Content generated from MDX files |
| `/writing` | Static (SSG) | List generated from MDX files |
| `/writing/[slug]` | Static (SSG) | Content generated from MDX files |
| `/contact` | Static (SSG) | Form is client-side |
| `/api/contact` | Dynamic (Edge) | Handles form submissions |

### Static Generation Implementation

```typescript
// src/app/(marketing)/projects/[slug]/page.tsx

import { getProjectBySlug, getAllProjectSlugs } from '@/lib/content';
import { notFound } from 'next/navigation';

interface PageProps {
  params: { slug: string };
}

// Generate static paths at build time
export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const project = await getProjectBySlug(params.slug);
  if (!project) return {};

  return {
    title: `${project.title} | Renan Martins`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.ogImage],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}
```

### Navigation Configuration

```typescript
// src/lib/constants.ts

export const NAV_ITEMS = [
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Writing', href: '/writing' },
  { label: 'Contact', href: '/contact' },
] as const;

export const FOOTER_NAV = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Writing', href: '/writing' },
  { label: 'Contact', href: '/contact' },
  { label: 'RSS', href: '/feed.xml' },
] as const;
```

---

## Data Management

### Content Strategy: File-Based MDX

**Why MDX over a CMS:**
1. **Developer Experience**: Content lives in the codebase, version controlled
2. **Performance**: No API calls at runtime, fully static
3. **Flexibility**: Custom components embedded in content
4. **Cost**: No CMS subscription needed
5. **Type Safety**: Frontmatter validated with TypeScript/Zod
6. **Portfolio Scope**: Content volume is manageable without a CMS

### Content Type Definitions

```typescript
// src/types/project.ts

import { z } from 'zod';

export const projectFrontmatterSchema = z.object({
  title: z.string(),
  description: z.string().max(160), // SEO optimized
  slug: z.string(),
  publishedAt: z.string().datetime(),
  updatedAt: z.string().datetime().optional(),
  featured: z.boolean().default(false),
  thumbnail: z.string(),
  ogImage: z.string().optional(),
  role: z.string(),
  timeline: z.string(),
  company: z.string().optional(),
  technologies: z.array(z.string()),
  liveUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
  metrics: z.array(z.object({
    value: z.string(),
    label: z.string(),
    type: z.enum(['number', 'percentage', 'time', 'text']),
  })).optional(),
});

export type ProjectFrontmatter = z.infer<typeof projectFrontmatterSchema>;

export interface Project extends ProjectFrontmatter {
  content: string;
  readingTime: string;
}
```

```typescript
// src/types/post.ts

import { z } from 'zod';

export const postFrontmatterSchema = z.object({
  title: z.string(),
  description: z.string().max(160),
  slug: z.string(),
  publishedAt: z.string().datetime(),
  updatedAt: z.string().datetime().optional(),
  featured: z.boolean().default(false),
  ogImage: z.string().optional(),
  tags: z.array(z.string()),
  draft: z.boolean().default(false),
});

export type PostFrontmatter = z.infer<typeof postFrontmatterSchema>;

export interface Post extends PostFrontmatter {
  content: string;
  readingTime: string;
  headings: Array<{ level: number; text: string; id: string }>;
}
```

### MDX File Structure

```mdx
// src/content/projects/ecommerce-performance.mdx

---
title: "E-commerce Performance Optimization"
description: "How I reduced JavaScript bundle size by 60% for a React e-commerce platform, improving LCP by 2.3s and increasing mobile conversions by 18%."
slug: "ecommerce-performance"
publishedAt: "2025-08-15T00:00:00Z"
featured: true
thumbnail: "/images/projects/ecommerce-perf-thumb.webp"
ogImage: "/images/og/ecommerce-perf.png"
role: "Senior Frontend Engineer"
timeline: "6 months (2025)"
company: "TechCorp Inc."
technologies: ["React", "TypeScript", "Webpack", "Vite", "React Query"]
liveUrl: "https://example.com"
metrics:
  - value: "60"
    label: "Bundle size reduction"
    type: "percentage"
  - value: "2.3s"
    label: "LCP improvement"
    type: "time"
  - value: "18"
    label: "Mobile conversion increase"
    type: "percentage"
---

## The Challenge

E-commerce company was experiencing high bounce rates on mobile devices...

<Callout type="info">
  This project won the internal "Engineering Excellence" award for Q3 2025.
</Callout>

## Technical Approach

### Architecture Analysis

First, I conducted a comprehensive bundle analysis...

```javascript
// webpack-bundle-analyzer output showed...
const heavyDependencies = [
  'moment',      // 232KB - replaced with date-fns
  'lodash',      // 71KB - tree-shaking implemented
  'chart.js',    // 178KB - lazy loaded
];
```

### Solution Implementation

<Image
  src="/images/projects/bundle-before-after.png"
  alt="Bundle size comparison showing 60% reduction"
  width={1200}
  height={600}
/>

## Results & Impact

After implementing these optimizations...

<ProjectMetrics />

## Key Learnings

What I'd do differently next time...
```

### Content Utilities

```typescript
// src/lib/content.ts

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import {
  projectFrontmatterSchema,
  type Project
} from '@/types/project';

const PROJECTS_PATH = path.join(process.cwd(), 'src/content/projects');
const POSTS_PATH = path.join(process.cwd(), 'src/content/posts');

export async function getAllProjects(): Promise<Project[]> {
  const files = fs.readdirSync(PROJECTS_PATH);

  const projects = files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const filePath = path.join(PROJECTS_PATH, file);
      const source = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(source);

      // Validate frontmatter
      const frontmatter = projectFrontmatterSchema.parse(data);

      return {
        ...frontmatter,
        content,
        readingTime: readingTime(content).text,
      };
    })
    .sort((a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

  return projects;
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getAllProjects();
  return projects.filter((p) => p.featured).slice(0, 5);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const filePath = path.join(PROJECTS_PATH, `${slug}.mdx`);
    const source = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(source);

    const frontmatter = projectFrontmatterSchema.parse(data);

    return {
      ...frontmatter,
      content,
      readingTime: readingTime(content).text,
    };
  } catch {
    return null;
  }
}

export async function getAllProjectSlugs(): Promise<string[]> {
  const projects = await getAllProjects();
  return projects.map((p) => p.slug);
}

// Similar functions for posts...
```

### Site Configuration

```typescript
// src/lib/constants.ts

export const SITE_CONFIG = {
  name: 'Renan Martins',
  title: 'Senior Frontend Engineer',
  tagline: 'Engineering delightful web experiences at scale',
  description: 'Senior Frontend Engineer specializing in React, TypeScript, and performance optimization. Building scalable, accessible web applications.',
  url: 'https://martinsrenan.dev',
  ogImage: '/images/og/default.png',
  links: {
    github: 'https://github.com/renanmartins',
    linkedin: 'https://linkedin.com/in/renanmartins',
    twitter: 'https://twitter.com/renanmartins',
    email: 'hello@martinsrenan.dev',
  },
  availability: {
    status: 'open', // 'open' | 'selective' | 'closed'
    message: 'Currently accepting full-time opportunities and select consulting projects',
  },
} as const;

export const SKILLS = {
  core: [
    { name: 'React', level: 'expert' },
    { name: 'TypeScript', level: 'expert' },
    { name: 'JavaScript (ES2024+)', level: 'expert' },
    { name: 'HTML5', level: 'expert' },
    { name: 'CSS3', level: 'expert' },
  ],
  stateManagement: [
    { name: 'React Query', level: 'expert' },
    { name: 'Zustand', level: 'advanced' },
    { name: 'Redux', level: 'advanced' },
    { name: 'Context API', level: 'expert' },
  ],
  styling: [
    { name: 'Tailwind CSS', level: 'expert' },
    { name: 'CSS Modules', level: 'advanced' },
    { name: 'Styled Components', level: 'advanced' },
    { name: 'Sass', level: 'proficient' },
  ],
  testing: [
    { name: 'Vitest', level: 'expert' },
    { name: 'React Testing Library', level: 'expert' },
    { name: 'Playwright', level: 'advanced' },
    { name: 'Jest', level: 'advanced' },
  ],
  buildTools: [
    { name: 'Vite', level: 'expert' },
    { name: 'Webpack', level: 'advanced' },
    { name: 'esbuild', level: 'advanced' },
    { name: 'Turbopack', level: 'proficient' },
  ],
  performance: [
    { name: 'Core Web Vitals', level: 'expert' },
    { name: 'Code Splitting', level: 'expert' },
    { name: 'SSR/SSG', level: 'expert' },
    { name: 'Bundle Analysis', level: 'expert' },
  ],
  architecture: [
    { name: 'Design Systems', level: 'expert' },
    { name: 'Component Libraries', level: 'expert' },
    { name: 'Micro-frontends', level: 'advanced' },
  ],
  accessibility: [
    { name: 'WCAG 2.1 AA/AAA', level: 'expert' },
    { name: 'ARIA', level: 'expert' },
    { name: 'Screen Reader Testing', level: 'advanced' },
  ],
  devOps: [
    { name: 'Vercel', level: 'expert' },
    { name: 'GitHub Actions', level: 'advanced' },
    { name: 'Docker', level: 'proficient' },
    { name: 'CI/CD', level: 'advanced' },
  ],
} as const;
```

---

## Styling Approach

### Tailwind Configuration

```typescript
// tailwind.config.ts

import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1200px', // Content max-width
      },
    },
    extend: {
      colors: {
        // Modern Professional Palette
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      fontSize: {
        // Fluid type scale
        'display': ['clamp(2rem, 5vw, 3.5rem)', { lineHeight: '1.1', fontWeight: '700' }],
        'h1': ['clamp(1.75rem, 4vw, 2.5rem)', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['clamp(1.5rem, 3vw, 2rem)', { lineHeight: '1.25', fontWeight: '600' }],
        'h3': ['clamp(1.25rem, 2.5vw, 1.5rem)', { lineHeight: '1.3', fontWeight: '600' }],
        'h4': ['clamp(1.125rem, 2vw, 1.25rem)', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['clamp(1.125rem, 1.5vw, 1.25rem)', { lineHeight: '1.75' }],
        'body': ['clamp(1rem, 1.25vw, 1.125rem)', { lineHeight: '1.75' }],
        'body-sm': ['clamp(0.875rem, 1vw, 1rem)', { lineHeight: '1.5' }],
        'caption': ['clamp(0.75rem, 0.875vw, 0.875rem)', { lineHeight: '1.4' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      maxWidth: {
        'prose': '65ch',
        'content': '1200px',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-in-left': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
        'slide-in-left': 'slide-in-left 0.3s ease-out',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
};

export default config;
```

### CSS Variables (Theme)

```css
/* src/app/globals.css */

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222 47% 11%;

    --muted: 210 40% 96%;
    --muted-foreground: 215 16% 47%;

    --popover: 0 0% 100%;
    --popover-foreground: 222 47% 11%;

    --card: 0 0% 100%;
    --card-foreground: 222 47% 11%;

    --border: 214 32% 91%;
    --input: 214 32% 91%;

    --primary: 222 47% 11%;
    --primary-foreground: 210 40% 98%;

    --secondary: 210 40% 96%;
    --secondary-foreground: 222 47% 11%;

    --accent: 217 91% 60%;
    --accent-foreground: 210 40% 98%;

    --success: 142 71% 45%;
    --success-foreground: 210 40% 98%;

    --destructive: 0 84% 60%;
    --destructive-foreground: 210 40% 98%;

    --ring: 217 91% 60%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222 47% 11%;
    --foreground: 210 40% 98%;

    --muted: 217 33% 17%;
    --muted-foreground: 215 20% 65%;

    --popover: 222 47% 11%;
    --popover-foreground: 210 40% 98%;

    --card: 222 47% 11%;
    --card-foreground: 210 40% 98%;

    --border: 217 33% 17%;
    --input: 217 33% 17%;

    --primary: 210 40% 98%;
    --primary-foreground: 222 47% 11%;

    --secondary: 217 33% 17%;
    --secondary-foreground: 210 40% 98%;

    --accent: 217 91% 60%;
    --accent-foreground: 210 40% 98%;

    --success: 142 71% 45%;
    --success-foreground: 222 47% 11%;

    --destructive: 0 84% 60%;
    --destructive-foreground: 210 40% 98%;

    --ring: 217 91% 60%;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground antialiased;
    font-feature-settings: "rlig" 1, "calt" 1;
  }

  /* Focus visible styles */
  :focus-visible {
    @apply outline-none ring-2 ring-ring ring-offset-2 ring-offset-background;
  }

  /* Reduce motion */
  @media (prefers-reduced-motion: reduce) {
    *,
    ::before,
    ::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  /* Selection */
  ::selection {
    @apply bg-accent/20;
  }
}

@layer utilities {
  /* Prose improvements */
  .prose {
    @apply max-w-prose;
  }

  .prose :where(code):not(:where([class~="not-prose"] *)) {
    @apply bg-muted px-1.5 py-0.5 rounded font-mono text-sm;
  }

  .prose :where(pre):not(:where([class~="not-prose"] *)) {
    @apply bg-muted border border-border;
  }

  /* Balance text */
  .text-balance {
    text-wrap: balance;
  }

  /* Skip link */
  .skip-link {
    @apply sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-background focus:px-4 focus:py-2 focus:rounded;
  }
}
```

### Typography Plugin Configuration

```typescript
// tailwind.config.ts (typography section)

typography: ({ theme }: { theme: (path: string) => string }) => ({
  DEFAULT: {
    css: {
      '--tw-prose-body': theme('colors.foreground'),
      '--tw-prose-headings': theme('colors.foreground'),
      '--tw-prose-lead': theme('colors.muted.foreground'),
      '--tw-prose-links': theme('colors.accent.DEFAULT'),
      '--tw-prose-bold': theme('colors.foreground'),
      '--tw-prose-counters': theme('colors.muted.foreground'),
      '--tw-prose-bullets': theme('colors.muted.foreground'),
      '--tw-prose-hr': theme('colors.border'),
      '--tw-prose-quotes': theme('colors.foreground'),
      '--tw-prose-quote-borders': theme('colors.accent.DEFAULT'),
      '--tw-prose-captions': theme('colors.muted.foreground'),
      '--tw-prose-code': theme('colors.foreground'),
      '--tw-prose-pre-code': theme('colors.foreground'),
      '--tw-prose-pre-bg': theme('colors.muted.DEFAULT'),
      '--tw-prose-th-borders': theme('colors.border'),
      '--tw-prose-td-borders': theme('colors.border'),
      maxWidth: '65ch',
      a: {
        textDecoration: 'underline',
        textUnderlineOffset: '4px',
        textDecorationThickness: '1px',
        '&:hover': {
          textDecorationThickness: '2px',
        },
      },
      'h1, h2, h3, h4': {
        scrollMarginTop: '6rem',
      },
    },
  },
}),
```

---

## Performance Strategy

### Image Optimization

```typescript
// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
  },
};

export default nextConfig;
```

**Image Component Usage:**

```tsx
// Project thumbnail (responsive)
<Image
  src={project.thumbnail}
  alt={`Screenshot of ${project.title}`}
  width={600}
  height={400}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  placeholder="blur"
  blurDataURL={project.blurDataURL}
  className="object-cover"
/>

// Hero image (priority load)
<Image
  src="/images/hero.webp"
  alt=""
  width={1200}
  height={800}
  priority
  sizes="100vw"
/>
```

### Font Optimization

```typescript
// src/app/layout.tsx

import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

### Code Splitting Strategy

```typescript
// Lazy load heavy components
import dynamic from 'next/dynamic';

// Contact form (only needed on contact page)
const ContactForm = dynamic(() => import('@/components/contact/contact-form'), {
  loading: () => <ContactFormSkeleton />,
});

// Testimonials carousel (client-side only)
const Testimonials = dynamic(
  () => import('@/components/sections/testimonials'),
  { ssr: false }
);

// Code syntax highlighter (only for blog/project pages)
const CodeBlock = dynamic(() => import('@/components/mdx/code-block'));
```

### Bundle Analysis

```javascript
// next.config.mjs

import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... other config
};

export default withBundleAnalyzer(nextConfig);
```

Run analysis: `ANALYZE=true npm run build`

### Performance Checklist

- [ ] Images use `next/image` with appropriate `sizes`
- [ ] Hero image has `priority` prop
- [ ] Fonts use `next/font` with `display: swap`
- [ ] Heavy components are lazy loaded
- [ ] Third-party scripts use `next/script` with appropriate strategy
- [ ] Unused CSS is purged by Tailwind
- [ ] Bundle size monitored with analyzer
- [ ] Lighthouse CI runs on every PR

### Caching Strategy

```typescript
// next.config.mjs

const nextConfig = {
  headers: async () => [
    {
      source: '/images/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
    {
      source: '/fonts/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ],
};
```

---

## SEO Implementation

### Metadata API Implementation

```typescript
// src/app/layout.tsx

import type { Metadata, Viewport } from 'next';
import { SITE_CONFIG } from '@/lib/constants';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} | ${SITE_CONFIG.title}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    'Senior Frontend Engineer',
    'React Developer',
    'TypeScript Expert',
    'Web Performance',
    'Frontend Architecture',
    'Accessibility',
  ],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} - ${SITE_CONFIG.title}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
    creator: '@renanmartins',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_CONFIG.url,
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
};
```

### Page-Specific Metadata

```typescript
// src/app/(marketing)/projects/[slug]/page.tsx

import type { Metadata } from 'next';
import { getProjectBySlug, getAllProjectSlugs } from '@/lib/content';
import { SITE_CONFIG } from '@/lib/constants';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} | ${SITE_CONFIG.name}`,
      description: project.description,
      type: 'article',
      publishedTime: project.publishedAt,
      modifiedTime: project.updatedAt,
      images: [
        {
          url: project.ogImage || SITE_CONFIG.ogImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: [project.ogImage || SITE_CONFIG.ogImage],
    },
  };
}
```

### Structured Data (JSON-LD)

```typescript
// src/components/seo/json-ld.tsx

import { SITE_CONFIG } from '@/lib/constants';

export function PersonSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_CONFIG.name,
    jobTitle: SITE_CONFIG.title,
    url: SITE_CONFIG.url,
    sameAs: [
      SITE_CONFIG.links.github,
      SITE_CONFIG.links.linkedin,
      SITE_CONFIG.links.twitter,
    ],
    knowsAbout: [
      'React',
      'TypeScript',
      'Web Performance',
      'Frontend Architecture',
      'Accessibility',
      'Design Systems',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebsiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    author: {
      '@type': 'Person',
      name: SITE_CONFIG.name,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ArticleSchema({
  title,
  description,
  publishedAt,
  updatedAt,
  image
}: {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  image?: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: image || SITE_CONFIG.ogImage,
    datePublished: publishedAt,
    dateModified: updatedAt || publishedAt,
    author: {
      '@type': 'Person',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    publisher: {
      '@type': 'Person',
      name: SITE_CONFIG.name,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

### Sitemap Generation

```typescript
// src/app/sitemap.ts

import type { MetadataRoute } from 'next';
import { getAllProjects } from '@/lib/content';
import { getAllPosts } from '@/lib/content';
import { SITE_CONFIG } from '@/lib/constants';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getAllProjects();
  const posts = await getAllPosts();

  const projectUrls = projects.map((project) => ({
    url: `${SITE_CONFIG.url}/projects/${project.slug}`,
    lastModified: project.updatedAt || project.publishedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const postUrls = posts.map((post) => ({
    url: `${SITE_CONFIG.url}/writing/${post.slug}`,
    lastModified: post.updatedAt || post.publishedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: SITE_CONFIG.url,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_CONFIG.url}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_CONFIG.url}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_CONFIG.url}/writing`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_CONFIG.url}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    ...projectUrls,
    ...postUrls,
  ];
}
```

### Robots.txt

```typescript
// src/app/robots.ts

import type { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
  };
}
```

---

## Accessibility Implementation

### Skip Link

```tsx
// src/components/layout/skip-link.tsx

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="skip-link"
    >
      Skip to main content
    </a>
  );
}
```

### Focus Management

```tsx
// src/hooks/use-focus-trap.ts

import { useEffect, useRef } from 'react';

export function useFocusTrap<T extends HTMLElement>(isActive: boolean) {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    // Store previously focused element
    const previouslyFocused = document.activeElement as HTMLElement;

    // Focus first element
    firstElement?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    }

    container.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [isActive]);

  return containerRef;
}
```

### Reduced Motion Hook

```tsx
// src/hooks/use-reduced-motion.ts

import { useEffect, useState } from 'react';

export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    function handleChange(event: MediaQueryListEvent) {
      setReducedMotion(event.matches);
    }

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return reducedMotion;
}
```

### Accessible Form Example

```tsx
// src/components/contact/contact-form.tsx

'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof formSchema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    // Handle submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Name <span aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <Input
            id="name"
            type="text"
            autoComplete="name"
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            {...register('name')}
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-sm text-destructive" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email <span aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            {...register('email')}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-sm text-destructive" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Message <span aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </label>
          <Textarea
            id="message"
            rows={5}
            aria-required="true"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
            {...register('message')}
          />
          {errors.message && (
            <p id="message-error" className="mt-1 text-sm text-destructive" role="alert">
              {errors.message.message}
            </p>
          )}
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </div>
    </form>
  );
}
```

### Accessibility Testing Checklist

**Automated Testing:**
- [ ] axe-core integration in CI/CD
- [ ] Lighthouse accessibility audit > 95
- [ ] ESLint jsx-a11y plugin configured

**Manual Testing:**
- [ ] Keyboard navigation (Tab, Shift+Tab, Enter, Escape, Arrow keys)
- [ ] Screen reader testing (VoiceOver on Mac, NVDA on Windows)
- [ ] Color contrast verification (4.5:1 minimum)
- [ ] Focus indicators visible
- [ ] Zoom to 200% without horizontal scroll
- [ ] Reduced motion preferences respected

---

## Animation & Interaction

### Animation Philosophy

Based on the marketing strategy, animations should:
1. **Enhance understanding**, not distract
2. **Be subtle and purposeful**
3. **Respect user preferences** (reduced motion)
4. **Improve perceived performance**

### Framer Motion Setup

```tsx
// src/components/shared/animated-section.tsx

'use client';

import { motion, type Variants } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

const variants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const reducedVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
}: AnimatedSectionProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={reducedMotion ? reducedVariants : variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

### Staggered Children Animation

```tsx
// src/components/projects/project-grid.tsx

'use client';

import { motion } from 'framer-motion';
import { ProjectCard } from './project-card';
import type { Project } from '@/types/project';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {projects.map((project) => (
        <motion.div key={project.slug} variants={itemVariants}>
          <ProjectCard project={project} />
        </motion.div>
      ))}
    </motion.div>
  );
}
```

### Hover Interactions

```tsx
// src/components/projects/project-card.tsx

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`}>
      <motion.article
        className="group relative bg-card rounded-lg overflow-hidden border border-border"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <div className="p-6">
          <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {project.description}
          </p>
        </div>
      </motion.article>
    </Link>
  );
}
```

### Page Transitions

```tsx
// src/app/(marketing)/layout.tsx

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
```

### Number Counter Animation

```tsx
// src/components/shared/animated-counter.tsx

'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

export function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 2,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const reducedMotion = useReducedMotion();

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      if (reducedMotion) {
        setDisplayValue(value);
      } else {
        motionValue.set(value);
      }
    }
  }, [isInView, value, motionValue, reducedMotion]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(Math.round(latest));
    });
    return () => unsubscribe();
  }, [springValue]);

  return (
    <span ref={ref}>
      {prefix}{displayValue}{suffix}
    </span>
  );
}
```

---

## Testing Strategy

### Unit Testing (Vitest)

```typescript
// vitest.config.ts

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### Component Testing

```typescript
// src/components/projects/__tests__/project-card.test.tsx

import { render, screen } from '@testing-library/react';
import { ProjectCard } from '../project-card';
import { mockProject } from '@/test/mocks';

describe('ProjectCard', () => {
  it('renders project title and description', () => {
    render(<ProjectCard project={mockProject} />);

    expect(screen.getByRole('heading', { name: mockProject.title })).toBeInTheDocument();
    expect(screen.getByText(mockProject.description)).toBeInTheDocument();
  });

  it('links to project detail page', () => {
    render(<ProjectCard project={mockProject} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/projects/${mockProject.slug}`);
  });

  it('displays project thumbnail with alt text', () => {
    render(<ProjectCard project={mockProject} />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt', mockProject.title);
  });
});
```

### Accessibility Testing

```typescript
// src/test/accessibility.test.tsx

import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ContactForm } from '@/components/contact/contact-form';

expect.extend(toHaveNoViolations);

describe('Accessibility', () => {
  it('ContactForm has no accessibility violations', async () => {
    const { container } = render(<ContactForm />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### E2E Testing (Playwright)

```typescript
// e2e/navigation.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('can navigate through main pages', async ({ page }) => {
    await page.goto('/');

    // Navigate to About
    await page.click('text=About');
    await expect(page).toHaveURL('/about');
    await expect(page.locator('h1')).toContainText('About');

    // Navigate to Projects
    await page.click('text=Projects');
    await expect(page).toHaveURL('/projects');

    // Navigate to Contact
    await page.click('text=Contact');
    await expect(page).toHaveURL('/contact');
  });

  test('keyboard navigation works', async ({ page }) => {
    await page.goto('/');

    // Tab to skip link
    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toHaveText('Skip to main content');

    // Tab through navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toHaveText('About');
  });
});
```

```typescript
// e2e/contact-form.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test('submits form successfully', async ({ page }) => {
    await page.goto('/contact');

    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('textarea[name="message"]', 'This is a test message.');

    await page.click('button[type="submit"]');

    await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
  });

  test('shows validation errors', async ({ page }) => {
    await page.goto('/contact');

    await page.click('button[type="submit"]');

    await expect(page.locator('#name-error')).toBeVisible();
    await expect(page.locator('#email-error')).toBeVisible();
    await expect(page.locator('#message-error')).toBeVisible();
  });
});
```

### Lighthouse CI

```yaml
# .github/workflows/lighthouse.yml

name: Lighthouse CI

on:
  pull_request:
    branches: [main]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci
      - run: npm run build

      - name: Run Lighthouse
        uses: treosh/lighthouse-ci-action@v11
        with:
          configPath: './lighthouserc.json'
          uploadArtifacts: true
          temporaryPublicStorage: true
```

```json
// lighthouserc.json

{
  "ci": {
    "collect": {
      "numberOfRuns": 3,
      "startServerCommand": "npm run start",
      "url": [
        "http://localhost:3000/",
        "http://localhost:3000/about",
        "http://localhost:3000/projects",
        "http://localhost:3000/contact"
      ]
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 0.95 }],
        "categories:best-practices": ["error", { "minScore": 0.9 }],
        "categories:seo": ["error", { "minScore": 0.95 }]
      }
    }
  }
}
```

---

## Deployment Strategy

### Platform: Vercel (Recommended)

**Rationale:**
- **Native Next.js support**: Zero-config deployment
- **Edge Network**: Global CDN for fast delivery
- **Automatic HTTPS**: SSL certificates included
- **Preview Deployments**: Every PR gets a preview URL
- **Analytics**: Built-in Web Vitals monitoring
- **Free tier**: Sufficient for portfolio traffic

### Vercel Configuration

```json
// vercel.json

{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm ci",
  "regions": ["iad1"],
  "headers": [
    {
      "source": "/fonts/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/images/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/blog/:slug",
      "destination": "/writing/:slug",
      "permanent": true
    }
  ]
}
```

### CI/CD Pipeline

```yaml
# .github/workflows/ci.yml

name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lint-and-type-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci
      - run: npm run lint
      - run: npm run type-check

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci
      - run: npm run test:coverage

      - uses: codecov/codecov-action@v4
        with:
          file: ./coverage/lcov.info

  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run build
      - run: npm run test:e2e

      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/

  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci
      - run: npm run build
```

### Environment Variables

```bash
# .env.example

# Site
NEXT_PUBLIC_SITE_URL=https://martinsrenan.dev

# Contact Form (using Resend)
RESEND_API_KEY=re_xxxxxxxxxxxx

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=martinsrenan.dev

# Vercel (auto-set)
VERCEL_URL=
VERCEL_ENV=
```

### Domain Configuration

1. Purchase domain (Namecheap, Google Domains, etc.)
2. Add domain to Vercel project
3. Configure DNS:
   - A record: `@` -> `76.76.21.21`
   - CNAME: `www` -> `cname.vercel-dns.com`
4. Enable automatic HTTPS

### Alternative: Netlify

If Vercel is not preferred, Netlify is a solid alternative with similar features:
- Next.js support via adapter
- Edge functions
- Preview deployments
- Good free tier

```toml
# netlify.toml

[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

---

## Development Workflow

### Scripts

```json
// package.json

{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "type-check": "tsc --noEmit",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "test": "vitest",
    "test:coverage": "vitest run --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "analyze": "ANALYZE=true next build",
    "prepare": "husky install"
  }
}
```

### Git Hooks (Husky + lint-staged)

```json
// package.json

{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md,mdx,css}": [
      "prettier --write"
    ]
  }
}
```

```bash
# .husky/pre-commit

#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

```bash
# .husky/pre-push

#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run type-check
npm run test -- --run
```

### ESLint Configuration

```json
// .eslintrc.json

{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsx-a11y/recommended",
    "prettier"
  ],
  "plugins": ["@typescript-eslint", "jsx-a11y"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        "components": ["Link"],
        "aspects": ["invalidHref", "preferButton"]
      }
    ]
  }
}
```

### Prettier Configuration

```json
// .prettierrc

{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### VS Code Settings

```json
// .vscode/settings.json

{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

---

## Implementation Phases

### Phase 1: Foundation (Week 1-2)

**Week 1: Project Setup**
- [ ] Initialize Next.js project with TypeScript
- [ ] Configure Tailwind CSS with design tokens
- [ ] Install and configure shadcn/ui
- [ ] Set up ESLint, Prettier, Husky
- [ ] Configure VS Code workspace
- [ ] Create folder structure
- [ ] Set up CI pipeline (lint, type-check)

**Week 2: Core Layout**
- [ ] Implement design system (colors, typography, spacing)
- [ ] Build Header component with responsive navigation
- [ ] Build Footer component
- [ ] Create Container and layout primitives
- [ ] Implement SkipLink for accessibility
- [ ] Add dark mode support with ThemeToggle
- [ ] Create 404 page

### Phase 2: Homepage & About (Week 3)

**Homepage:**
- [ ] Hero section with animations
- [ ] Featured Projects section
- [ ] Skills section
- [ ] Contact CTA section
- [ ] Trust signals/stats

**About Page:**
- [ ] Professional narrative content
- [ ] Technical philosophy section
- [ ] Personal story element
- [ ] ContactCTA at bottom

### Phase 3: Projects (Week 4)

**Project Infrastructure:**
- [ ] Create project MDX content files (3-5 projects)
- [ ] Implement content utilities (getAllProjects, getProjectBySlug)
- [ ] Create project type definitions

**Project Components:**
- [ ] ProjectCard with hover animations
- [ ] ProjectGrid with staggered animations
- [ ] ProjectHeader for detail pages
- [ ] ProjectMetrics with animated counters
- [ ] TechStack badges component
- [ ] RelatedProjects section

**Pages:**
- [ ] Projects index page
- [ ] Dynamic project detail pages
- [ ] MDX rendering with custom components

### Phase 4: Writing/Blog (Week 5)

**Blog Infrastructure:**
- [ ] Create blog post MDX content files (2-3 posts)
- [ ] Implement blog content utilities
- [ ] Create post type definitions

**Blog Components:**
- [ ] PostCard for index page
- [ ] PostHeader for detail pages
- [ ] TableOfContents (sticky)
- [ ] ReadingProgress indicator
- [ ] PostFooter with social share
- [ ] RelatedPosts section

**Pages:**
- [ ] Writing index page
- [ ] Dynamic blog post pages

### Phase 5: Contact & Forms (Week 6)

**Contact Page:**
- [ ] Page layout and copy
- [ ] Availability status indicator
- [ ] Alternative contact methods

**Contact Form:**
- [ ] Form validation with Zod
- [ ] react-hook-form integration
- [ ] Loading/success/error states
- [ ] Accessible form markup
- [ ] API route for form handling
- [ ] Email notification (Resend)

### Phase 6: SEO & Optimization (Week 7)

**SEO:**
- [ ] Metadata for all pages
- [ ] Open Graph images
- [ ] JSON-LD structured data
- [ ] Sitemap generation
- [ ] Robots.txt configuration
- [ ] RSS feed

**Performance:**
- [ ] Image optimization audit
- [ ] Bundle size analysis
- [ ] Lazy loading review
- [ ] Core Web Vitals testing
- [ ] Lighthouse CI configuration

### Phase 7: Testing & Polish (Week 8)

**Testing:**
- [ ] Unit tests for utilities
- [ ] Component tests for key components
- [ ] Accessibility tests (axe-core)
- [ ] E2E tests for critical paths
- [ ] Cross-browser testing
- [ ] Mobile device testing

**Polish:**
- [ ] Animation refinement
- [ ] Loading state skeletons
- [ ] Error boundary implementation
- [ ] Content proofreading
- [ ] Final design review

### Phase 8: Launch (Week 9)

**Pre-Launch:**
- [ ] Domain configuration
- [ ] Analytics setup (GA4 or Plausible)
- [ ] Error monitoring (Sentry optional)
- [ ] Final accessibility audit
- [ ] Performance regression check
- [ ] Backup content in Git

**Launch Day:**
- [ ] Deploy to production
- [ ] Verify all pages
- [ ] Submit sitemap to Google Search Console
- [ ] Update LinkedIn profile
- [ ] Update GitHub profile
- [ ] Announce on social media

**Post-Launch:**
- [ ] Monitor analytics
- [ ] Check for errors
- [ ] Gather initial feedback
- [ ] Plan first content update

---

## Summary

This technical plan provides a comprehensive blueprint for building a modern, performant, and accessible portfolio website that:

1. **Demonstrates Senior-Level Engineering**: The tech choices, architecture decisions, and attention to detail reflect senior frontend expertise.

2. **Meets Performance Targets**: Static generation, optimized images, minimal JavaScript, and proper caching ensure 90+ Lighthouse scores.

3. **Prioritizes Accessibility**: From skip links to focus management to reduced motion support, accessibility is built into every component.

4. **Enables Easy Content Updates**: MDX-based content with TypeScript validation makes adding new projects and posts straightforward.

5. **Supports SEO Goals**: Comprehensive metadata, structured data, sitemaps, and semantic HTML drive discoverability.

6. **Provides Professional UX**: Thoughtful animations, responsive design, and clear navigation create a polished user experience.

7. **Maintains Code Quality**: TypeScript, ESLint, Prettier, and automated testing ensure maintainable code.

The implementation timeline of 8-9 weeks allows for thorough development while maintaining quality standards. Each phase builds on the previous, with testing and accessibility considerations integrated throughout rather than tacked on at the end.

---

**Document End**

*This technical plan should be used alongside the Marketing Strategy document for implementation guidance.*
