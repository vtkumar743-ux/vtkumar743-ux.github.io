export const site = {
  name: "Venkat Thanmai Kumar V",
  short: "Venkat",
  wordmark: ".venkat",
  role: "Full-Stack Software Engineer · UI/UX",
  location: "Bangalore, India",
  locationLong: "Bangalore, India — open to remote, worldwide",
  availability: "Open to full-time roles and freelance work",
  email: "vtkumar743@gmail.com",
  phone: "+918861944492",
  phoneDisplay: "+91 88619 44492",
  whatsapp: "https://wa.me/918861944492",
  github: "https://github.com/vtkumar743-ux",
  linkedin: "https://linkedin.com/in/venkatthanmai",
  url: "https://venkat.dev", // TODO: replace with the real domain once bought
  resume: "/resume.pdf",

  headline: "I build production software end to end, from the data model to the last pixel.",
  lede:
    "A .NET and React engineer who also designs the interface. I take a product from schema and API through to a shipped, responsive UI on the cloud — and lately, to AI agents that can actually use it.",
  credential: {
    count: "5 platforms shipped",
    stack: ".NET · React · SQL Server · Azure · AI",
  },
} as const;

export const nav = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Stack", href: "/#stack" },
  { label: "About", href: "/about" },
  { label: "Pricing", href: "/#pricing" },
] as const;
