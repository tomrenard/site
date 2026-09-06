// Single source of truth for the /work page and the resume PDF.
// Edit here, then run `pnpm resume` to regenerate public/Tom_Renard_Resume.pdf.

export interface Bullet {
  /** Short bold lead-in, kept to two or three words. */
  label?: string;
  text: string;
  /** Set false to keep it on /work but off the one page resume. Defaults to true. */
  onResume?: boolean;
}

export interface Role {
  company: string;
  title: string;
  location: string;
  /** Human readable, e.g. "Jun 2026". */
  start: string;
  /** "now" renders as Present on the resume. */
  end: string;
  blurb?: string;
  tech?: string[];
  bullets?: Bullet[];
}

export interface SkillGroup {
  name: string;
  items: string[];
}

export const profile = {
  name: "Tom Renard",
  title: "Senior Product Engineer",
  email: "renard.tom35@gmail.com",
  site: "tomrenard.site",
  github: "github.com/tomrenard",
  linkedin: "linkedin.com/in/tom-renard-2021",
  location: "Berlin, Germany",
};

export const summary =
  "Senior product engineer with 6+ years building customer facing web products, mostly React and TypeScript. I own features end to end: shaping the requirement with product and design, building across the stack, then owning the rollout and the read on the result. Deepest in frontend, comfortable in the Go and Ruby services behind it and the infrastructure in front.";

export const skills: SkillGroup[] = [
  { name: "Languages", items: ["TypeScript", "JavaScript", "Go", "Ruby", "SQL"] },
  {
    name: "Frontend",
    items: [
      "React 19",
      "Next.js (App Router, RSC)",
      "Astro",
      "Tailwind CSS",
      "WCAG 2.2",
    ],
  },
  {
    name: "Platform",
    items: [
      "GraphQL",
      "Postgres",
      "Terraform",
      "CloudFront",
      "Docker",
      "GitHub Actions",
      "Datadog",
      "Playwright",
      "Vitest",
      "Claude Code",
    ],
  },
];

export const roles: Role[] = [
  {
    company: "Aroundhome",
    title: "Senior Software Engineer",
    location: "Berlin, DE",
    start: "Jun 2026",
    end: "now",
    blurb:
      "Two-sided marketplace for home improvement: homeowners describe a project, Aroundhome matches them with vetted local trade companies, and the partner pays for the introduction. Thousands of requests a week.",
    tech: ["React", "TypeScript", "Astro", "Go", "Ruby", "Terraform"],
    bullets: [
      {
        label: "Contact flow",
        text: "kept customers on the brand site they arrived on for the contact step instead of redirecting them to our main domain. Shipped across frontend, backend services and CDN routing, live on nine domains. Adding another is now configuration, not a project.",
      },
      {
        label: "Feature ownership",
        text: "own customer facing features end to end, from shaping the requirement with product and design through to the rollout and the read on the result.",
      },
      {
        label: "Design to code",
        text: "co-own the design to code rollout: design tokens, a Tailwind v4 config and the shared component library out to its consumer apps, sequenced through a tracker I maintain.",
      },
      {
        label: "Across the stack",
        text: "debug and ship in the Go and Ruby services when that is where the problem is, using coding agents to move quickly in code I did not write.",
        onResume: false,
      },
    ],
  },
  {
    company: "Doodle",
    title: "Senior Frontend Engineer",
    location: "Berlin, DE",
    start: "Apr 2023",
    end: "May 2026",
    blurb: "Scheduling platform used by millions of people a month.",
    tech: ["Next.js", "TypeScript", "GraphQL", "Nx"],
    bullets: [
      {
        label: "Feature adoption",
        text: "launched the Sign-up Sheets product, which drove a 25% increase in active product usage.",
      },
      {
        label: "Core flow",
        text: "reworked the participation flow, which lifted completed polls by 5% across millions of monthly users.",
      },
      {
        label: "Next.js migration",
        text: "moved three production applications to the App Router, improving reliability and developer velocity.",
      },
      {
        label: "Testing stack",
        text: "migrated to Vitest and Playwright, cutting CI pipeline duration by 40%.",
      },
      {
        label: "Accessibility",
        text: "took the UI to WCAG 2.1 AA ahead of the European Accessibility Act deadline.",
      },
    ],
  },
  {
    company: "Aklamio",
    title: "Frontend Engineer",
    location: "Berlin, DE",
    start: "Sep 2021",
    end: "Mar 2023",
    blurb: "Referral platform for enterprise clients, 100k+ monthly users.",
    tech: ["React", "TypeScript", "Redux"],
    bullets: [
      {
        label: "Enterprise scale",
        text: "built and maintained the React and TypeScript applications behind the platform.",
      },
      {
        label: "Internal tooling",
        text: "extended the core internal JavaScript libraries the other squads built on, with high test coverage and cross-browser support.",
        onResume: false,
      },
    ],
  },
  {
    company: "Freelance",
    title: "Full Stack / Frontend Engineer",
    location: "Berlin, DE",
    start: "Sep 2020",
    end: "Sep 2021",
    blurb: "Client work for e-commerce sites and small agencies.",
    tech: ["Next.js", "Gatsby", "Sanity"],
    bullets: [
      {
        text: "Delivered production Next.js applications with optimised SEO and caching for e-commerce clients.",
      },
      {
        text: "Implemented CMS integrations and performant UI architectures, resulting in 90+ PageSpeed scores.",
        onResume: false,
      },
    ],
  },
  {
    company: "N26",
    title: "Web Content Specialist",
    location: "Berlin, DE",
    start: "Jan 2019",
    end: "Jun 2020",
    blurb:
      "Web content and user flows for the digital banking product. The conversion funnels, before I was the one building them.",
  },
];

/**
 * Resume only. The /projects page carries the longer prose version;
 * keep the facts here in step with it.
 */
export const projects = [
  {
    name: "Repères 2027",
    tech: "Astro, TypeScript",
    text: "Voting advice app for the French presidential election. Every candidate position carries a dated source and the build fails without one.",
  },
  {
    name: "Wattson and Sparfuchs",
    tech: "Python, Claude Code",
    text: "Personal endurance coach and tax advisor: deterministic scripts do every calculation, the model only does judgement.",
  },
];

export const education = [
  { what: "Full Stack Web Development", where: "Le Wagon, Berlin", year: "2020" },
  { what: "Master in Management", where: "EM Normandie", year: "2018" },
];
