export const services = [
  {
    key: "web",
    tab: "Web Apps",
    kicker: "React · ASP.NET Core",
    title: "Full-Stack Web Applications",
    body: "A real application, not a brochure with a login. Role-based access, a schema built for the queries you will actually run, and an API that stays maintainable after I hand it over.",
    timeline: "About 6–10 weeks",
    built: "React · TypeScript · ASP.NET Core · SQL Server",
  },
  {
    key: "api",
    tab: "APIs & Architecture",
    kicker: ".NET · SQL Server",
    title: "APIs, Data Models & Architecture",
    body: "For teams with a frontend and no backend to stand behind it. Layered .NET APIs, a normalised schema, migrations that run themselves, and query tuning for the tables that get large.",
    timeline: "About 3–6 weeks",
    built: "ASP.NET Core · EF Core · SQL Server · JWT",
  },
  {
    key: "ai",
    tab: "AI Integration",
    kicker: "Python · FastAPI",
    title: "AI Agents & Retrieval",
    body: "Adding an assistant to a product you already have. Tool-calling against your own API, retrieval with citations, a confirmation step before anything is written, and an evaluation suite so you can prove it behaves.",
    timeline: "About 4–8 weeks",
    built: "Python · FastAPI · Vector search · RAG · Evals",
  },
  {
    key: "ui",
    tab: "UI/UX & Redesign",
    kicker: "Design · Frontend",
    title: "Interface Design & Rebuilds",
    body: "Taking something that works but does not feel like it does. A design system, a mobile-first rebuild of every screen, and accessible components, designed and implemented by the same person so nothing is lost in handover.",
    timeline: "About 2–5 weeks",
    built: "Figma · React · Tailwind · Design tokens",
  },
] as const;

export const pricing = [
  {
    key: "site",
    tab: "Website",
    title: "Business Website",
    desc: "A credible presence for a business that does not have one yet.",
    inr: "₹25,000 – ₹55,000",
    usd: "$300 – $650",
    duration: "About 2 weeks",
    features: [
      "Five to seven designed sections",
      "Responsive from phone to desktop",
      "Contact form and WhatsApp button",
      "On-page SEO and social preview cards",
      "Deployed live on your own hosting",
    ],
  },
  {
    key: "app",
    tab: "Web App / MVP",
    title: "Web App or MVP",
    desc: "The first real version of a product, built to be extended rather than thrown away.",
    inr: "₹90,000 – ₹2,20,000",
    usd: "$1,100 – $2,600",
    duration: "About 6–10 weeks",
    features: [
      "Auth, roles and permissions",
      "Database design and migrations",
      "REST API on a layered architecture",
      "Admin panel plus the user-facing app",
      "Cloud deployment and handover",
    ],
  },
  {
    key: "aiadd",
    tab: "AI Integration",
    title: "AI Layer",
    desc: "An assistant bolted onto a product you already run, with guardrails.",
    inr: "₹70,000 – ₹1,80,000",
    usd: "$850 – $2,100",
    duration: "About 4–8 weeks",
    features: [
      "Tool-calling against your existing API",
      "Retrieval with citations over your documents",
      "Confirm-before-write on every action",
      "Evaluation suite covering permissions and injection",
      "Streaming responses in your UI",
    ],
  },
  {
    key: "care",
    tab: "Maintenance",
    title: "Ongoing Support",
    desc: "For a product that is live and needs someone who knows it.",
    inr: "₹15,000 – ₹40,000 / month",
    usd: "$180 – $480 / month",
    duration: "Rolling, cancel any month",
    features: [
      "Bug fixes and small features",
      "Dependency and security updates",
      "Database and performance monitoring",
      "Deployment support",
      "A named person who answers",
    ],
  },
] as const;

export const faqs = [
  {
    q: "Are you available for full-time roles or only freelance?",
    a: "Both. I am open to full-time engineering roles and I take freelance projects alongside. If you are hiring, look through the work below, then email or message me.",
  },
  {
    q: "How long does a typical project take?",
    a: "A business website is about two weeks. A web application or MVP runs six to ten weeks. An AI layer on an existing product is four to eight weeks. You get a firm timeline in writing before anything starts.",
  },
  {
    q: "Do you work with clients outside India?",
    a: "Yes. I work remotely and keep overlap hours with your timezone. Payment is straightforward in either rupees or dollars.",
  },
  {
    q: "Who owns the code and the accounts?",
    a: "You do, from the first commit. The repository is yours, the cloud accounts are in your name, and nothing is hosted on infrastructure you cannot access.",
  },
  {
    q: "Why are some projects not linked to a repository?",
    a: "Several were built under employment or for clients. I can talk through the architecture and walk you through the code on a call, but I do not publish work that is not mine to publish.",
  },
  {
    q: "What do you need from me to get started?",
    a: "A description of the problem, any screens or documents you already have, and who the users are. If you do not have a specification, that is fine. Writing one is part of the first week.",
  },
] as const;
