export const stats = [
  { label: "Platforms shipped", value: "5", note: "end to end" },
  { label: "Technologies", value: "20+", note: "web, APIs, data and AI" },
  { label: "Core stacks", value: "3", note: ".NET · React · Python" },
] as const;

export const experience = [
  {
    title: ".NET Full Stack Developer",
    // NOTE: employer name deliberately genericised. Change this one string if you
    // decide you want the real company name on the experience section.
    company: "IT Solutions Company",
    location: "Bangalore, India",
    period: "2025 — Present",
    current: true,
    points: [
      "Built and maintained a full-stack CRM on React and ASP.NET Core, covering end-to-end business workflows.",
      "Designed REST APIs on a layered architecture with the repository pattern, keeping the code testable.",
      "Integrated live industrial device telemetry into the web application for real-time monitoring.",
      "Owned SQL Server schema design, optimisation and query tuning for high-volume operations.",
      "Deployed to Azure on Linux with Nginx as a reverse proxy.",
    ],
  },
] as const;

export const education = [
  {
    title: "B.Tech, Computer Science & Engineering",
    org: "New Horizon College of Engineering, Bangalore",
  },
  { title: "Intermediate (PUC)", org: "Sri Chaitanya PU College" },
  { title: "SSC", org: "Sri Chaitanya Techno School" },
] as const;

export const certifications = [
  ".NET Full Stack Development",
  "ASP.NET Core Web API",
  "React & Modern Frontend",
  "SQL Server Design & Tuning",
  "Azure Cloud Deployment",
  "AI Agents & RAG Systems",
] as const;

export const languages = ["English", "Tamil", "Telugu", "Hindi", "Kannada"] as const;

export const skillGroups = [
  {
    title: "Backend",
    items: [".NET", "ASP.NET Core", "C#", "Web API", "EF Core", "ADO.NET", "Python", "FastAPI"],
  },
  {
    title: "Frontend",
    items: ["React", "TypeScript", "Angular", "Tailwind CSS", "HTML5", "Vite", "Next.js"],
  },
  {
    title: "Data",
    items: ["SQL Server", "Schema design", "Query tuning", "Vector search", "EF migrations"],
  },
  {
    title: "Cloud & tooling",
    items: ["Azure", "Linux", "Nginx", "JWT auth", "REST", "IoT integration", "Git"],
  },
] as const;

export const process = [
  {
    n: "01",
    title: "Scope",
    body: "We agree what ships and what does not. You get the screens, the integrations and the timeline in writing before any code exists.",
  },
  {
    n: "02",
    title: "Model",
    body: "The data model and API contract come first. Get these right and the interface becomes straightforward. Get them wrong and nothing else saves you.",
  },
  {
    n: "03",
    title: "Build",
    body: "Vertical slices, not layers. Each week ends with something you can open and click rather than a status update.",
  },
  {
    n: "04",
    title: "Ship",
    body: "Deployed to your cloud, on your accounts, with the repository handed over. You own everything from day one.",
  },
] as const;

export const values = [
  "Layered architecture",
  "Typed end to end",
  "Mobile-first UI",
  "Tuned SQL, not ORM guesswork",
  "Deployed, not demoed",
  "You own the code",
] as const;
