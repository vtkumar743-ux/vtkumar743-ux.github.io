"use client";

import { useState } from "react";
import { Mail, Send } from "lucide-react";
import { WhatsappIcon } from "@/components/BrandIcons";
import { site } from "@/content/site";
import { SectionHeading } from "@/components/ui";

const field =
  "w-full rounded-xl border border-line bg-white/[0.02] px-4 py-3 text-sm text-text placeholder:text-muted-2 transition-colors duration-200 focus:border-accent/60 focus:outline-none";
const label = "font-mono text-[0.66rem] uppercase tracking-[0.18em] text-muted-2";

export default function Contact() {
  const [sent, setSent] = useState(false);

  /**
   * No backend yet — the form composes a pre-filled email and hands it to the
   * visitor's mail client. Swap this for a POST to /api/contact (Resend, Formspree,
   * whatever you pick) without touching the markup.
   */
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (f.get("company_website")) return; // honeypot

    const body = [
      `Name: ${f.get("name")}`,
      `Email: ${f.get("email")}`,
      `Business: ${f.get("business") || "—"}`,
      `Project type: ${f.get("type")}`,
      `Timeline: ${f.get("timeline")}`,
      "",
      String(f.get("message") ?? ""),
    ].join("\n");

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      `Project enquiry from ${f.get("name")}`,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <section id="contact" aria-labelledby="contact-heading" className="section border-t border-line bg-bg-2">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div id="contact-heading">
            <SectionHeading
              eyebrow="Get in touch"
              light="Tell me what"
              bold="you're building"
              sub="Share the project and the timeline. I read everything and reply within a working day. Hiring rather than contracting? Say so and send the role."
            />

            <div className="mt-10 flex flex-col gap-3">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-3 rounded-xl border border-line bg-surface px-5 py-4 text-sm transition-colors duration-300 hover:border-accent/50"
              >
                <Mail size={16} className="text-accent" />
                {site.email}
              </a>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-3 rounded-xl border border-line bg-surface px-5 py-4 text-sm transition-colors duration-300 hover:border-accent/50"
              >
                <WhatsappIcon size={16} className="text-accent" />
                WhatsApp {site.phoneDisplay}
              </a>
              <p className="mt-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted-2">
                {site.locationLong}
              </p>
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="flex flex-col gap-5 rounded-card border border-line bg-surface p-7 shadow-card sm:p-9"
          >
            <div className="hidden" aria-hidden>
              <label htmlFor="company_website">Leave this field empty</label>
              <input id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className={label} htmlFor="name">
                  Your name
                </label>
                <input id="name" name="name" required className={field} placeholder="Jane Doe" />
              </div>
              <div className="flex flex-col gap-2">
                <label className={label} htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={field}
                  placeholder="jane@company.com"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className={label} htmlFor="business">
                Business or company (optional)
              </label>
              <input id="business" name="business" className={field} placeholder="Company name" />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className={label} htmlFor="type">
                  What do you need?
                </label>
                <select id="type" name="type" required defaultValue="" className={field}>
                  <option value="" disabled>
                    Pick one
                  </option>
                  <option>Full-time role</option>
                  <option>Web application or MVP</option>
                  <option>API or backend architecture</option>
                  <option>AI agent or retrieval layer</option>
                  <option>UI/UX design or redesign</option>
                  <option>Business website</option>
                  <option>Ongoing maintenance</option>
                  <option>Something else</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className={label} htmlFor="timeline">
                  Timeline (optional)
                </label>
                <select id="timeline" name="timeline" defaultValue="" className={field}>
                  <option value="" disabled>
                    When do you need it?
                  </option>
                  <option>As soon as possible</option>
                  <option>Within 1–2 months</option>
                  <option>In 3+ months</option>
                  <option>Just exploring for now</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className={label} htmlFor="message">
                A bit more about it
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className={field}
                placeholder="What are you building, who is it for, and what does done look like?"
              />
            </div>

            <button
              type="submit"
              className="group mt-1 inline-flex items-center justify-center gap-3 rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-bg transition-colors duration-300 hover:bg-text"
            >
              Send it over
              <Send size={15} className="transition-transform duration-300 motion-safe:group-hover:translate-x-0.5" />
            </button>

            <p aria-live="polite" className="min-h-5 text-xs text-muted-2">
              {sent
                ? "Your mail client should have opened with the message ready to send."
                : "Nothing is stored on this site. The form opens your mail client with the details filled in."}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
