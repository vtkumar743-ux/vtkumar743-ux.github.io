export type Project = {
  slug: string;
  name: string;
  tagline: string;      // "one-liner · tech, tech, tech"
  blurb: string;
  hue: string;          // card gradient wash
  year: string;
  role: string;
  stack: string[];
  highlights: string[];
  featured: boolean;
  repo?: string;        // only for public repos
  live?: string;
  visibility: "public" | "private";
};

/**
 * Employer identity is stripped from every entry. Applications are named for what
 * they do, never for who they were built for.
 */
export const projects: Project[] = [
  {
    slug: "conduit",
    name: "Conduit",
    tagline: "ai agent service · fastapi, tool-calling, rag",
    blurb:
      "A standalone Python service that gives any host application a tool-calling assistant — with the guardrails an enterprise actually needs before it lets a model touch its data.",
    hue: "#7B8CFF",
    year: "2026",
    role: "Sole engineer",
    stack: ["Python", "FastAPI", "LLM tool-calling", "Vector search", "RAG", "SSE"],
    highlights: [
      "Multi-step agent loop with self-correction and streamed responses over server-sent events.",
      "Write actions gated behind a propose, confirm and commit flow using single-use expiring tokens, so the model can never act unilaterally.",
      "Retrieval with heading-aware chunking, inline citations, and an explicit 'I don't know' gate instead of a confident guess.",
      "A 22-case evaluation suite with three graders, covering permission boundaries, prompt injection and honesty.",
      "JWT passthrough so the agent inherits the calling user's permissions rather than holding its own.",
    ],
    featured: true,
    visibility: "private",
  },
  {
    slug: "taskflow",
    name: "TaskFlow",
    tagline: "role-based work platform · react, .net 9, sql server",
    blurb:
      "A task and project management platform built around one hard rule: every person files a progress update every day, and every level of management can drill straight down to it.",
    hue: "#5EE9C0",
    year: "2026",
    role: "Full-stack engineer",
    stack: ["React", "TypeScript", "ASP.NET Core 9", "EF Core", "SQL Server", "JWT"],
    highlights: [
      "Five-level analytics drill-down: organisation, manager, user, task, then the individual daily update.",
      "Role-based authorisation across Admin, Manager and User, enforced in the API rather than the UI.",
      "Multi-department structure with mandatory daily progress capture.",
      "Code-first schema that creates, migrates and seeds itself on first run.",
      "Multiple task views so the same data reads as a board, a list or a timeline.",
    ],
    featured: true,
    visibility: "private",
  },
  {
    slug: "forge",
    name: "Forge",
    tagline: "multi-branch gym platform · react 19, .net 8, ef core",
    blurb:
      "A three-surface product for a multi-branch fitness business: a CMS-driven public website, a member portal, and an operations admin panel — sharing one API and one design language.",
    hue: "#FF9A62",
    year: "2026",
    role: "Design and engineering",
    stack: ["React 19", "Vite", "Tailwind v4", "ASP.NET Core 8", "EF Core", "SQL Server"],
    highlights: [
      "Every word and image on the public site is editable from the admin CMS, so marketing never waits on a deploy.",
      "One seeded owner account manages all branches, with a role model ready for branch managers and trainers.",
      "A written design system, 'Dark Luxe Performance', covering palette, type pairing, photography grading and motion.",
      "Researched against the leading gym-management platforms before a line was written.",
    ],
    featured: true,
    repo: "https://github.com/vtkumar743-ux/FORGE",
    visibility: "public",
  },
  {
    slug: "ledger",
    name: "Ledger",
    tagline: "rent & wage ledgers · react, .net 10, modular monolith",
    blurb:
      "One login, two ledgers. It replaces a landlord's rent notebook and a contractor's wage register in a single platform, built so either half can be lifted out and shipped alone.",
    hue: "#C48BFF",
    year: "2026",
    role: "Architect and engineer",
    stack: ["React", "Vite", ".NET 10", "SQL Server", "JWT", "Background worker"],
    highlights: [
      "A strict dependency rule: both modules may point into shared code, never sideways at each other. Delete one folder and the other still builds.",
      "Domain, application, infrastructure and API layers kept separate per module.",
      "A background worker that runs a daily reminder ladder for unpaid rent.",
      "UPI and card payment flow wired end to end against a stubbed provider.",
    ],
    featured: true,
    visibility: "private",
  },
  {
    slug: "crm",
    name: "CRM",
    tagline: "mobile-first sales crm · react, asp.net core, ocr",
    blurb:
      "A customer relationship platform covering contacts, accounts, deals and email — rebuilt mobile-first, with a camera that turns a business card into a populated account record.",
    hue: "#FF7A90",
    year: "2025 — 2026",
    role: "Full-stack engineer",
    stack: ["React", "ASP.NET Core", "SQL Server", "JWT", "Azure", "Nginx"],
    highlights: [
      "Business-card scanning from the device camera during account creation, so field sales stop typing.",
      "Role-based access control on every endpoint, with a multi-step password recovery flow.",
      "Rebuilt every screen mobile-first with touch targets at or above forty-four pixels.",
      "SQL Server schema design and query tuning for high-volume record operations.",
      "Deployed to Azure on Linux behind Nginx as a reverse proxy.",
      "Real-time industrial device telemetry surfaced live inside the same application.",
    ],
    featured: true,
    visibility: "private",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
