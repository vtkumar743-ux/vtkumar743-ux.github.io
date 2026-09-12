import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

export function cx(...v: (string | false | null | undefined)[]) {
  return v.filter(Boolean).join(" ");
}

/* ---------------------------------------------------------------- Button */

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
  className?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  external,
  className,
}: ButtonProps) {
  const base =
    "group inline-flex items-center justify-between gap-3 rounded-full py-2 pl-6 pr-2 text-sm font-medium transition-colors duration-300 sm:justify-start";
  const look =
    variant === "primary"
      ? "bg-accent text-bg hover:bg-text"
      : "border border-line bg-white/[0.03] text-text hover:border-accent/50 hover:text-accent";
  const badge =
    variant === "primary"
      ? "bg-bg/15 text-bg"
      : "border border-line bg-transparent text-text group-hover:border-accent/50";

  const inner = (
    <>
      {children}
      <span className={cx("grid h-9 w-9 shrink-0 place-items-center rounded-full", badge)}>
        <ArrowUpRight
          size={16}
          className="transition-transform duration-300 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
        />
      </span>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className={cx(base, look, className)}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cx(base, look, className)}>
      {inner}
    </Link>
  );
}

/* ------------------------------------------------------------- Eyebrow */

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-2.5 font-mono text-[0.68rem] font-medium uppercase tracking-[0.2em] text-accent">
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      {children}
    </p>
  );
}

/* ------------------------------------------------------- SectionHeading */

export function SectionHeading({
  eyebrow,
  light,
  bold,
  sub,
  align = "left",
}: {
  eyebrow?: string;
  light: string;
  bold: string;
  sub?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cx(
        "reveal flex flex-col gap-4",
        align === "center" && "mx-auto max-w-2xl items-center text-center",
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="font-display text-[clamp(2.1rem,6.6vw,3.5rem)] leading-[1.04] tracking-[-0.035em]">
        <span className="font-light text-muted">{light} </span>
        <span className="font-semibold text-text">{bold}</span>
      </h2>
      {sub && <p className="max-w-lede text-pretty text-[0.95rem] leading-[1.7] text-muted">{sub}</p>}
    </div>
  );
}

/* ---------------------------------------------------------------- Chip */

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-line bg-white/[0.03] px-3 py-1 font-mono text-[0.68rem] tracking-wide text-muted">
      {children}
    </span>
  );
}

/* ------------------------------------------------------------ Backdrop */

export function Backdrop({ glow = true }: { glow?: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 gridlines" />
      <div className="absolute inset-0 grain opacity-[0.35]" />
      {glow && (
        <>
          <div className="absolute -top-40 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-accent/[0.10] blur-[150px]" />
          <div className="absolute -bottom-40 right-[8%] h-[26rem] w-[26rem] rounded-full bg-accent-2/[0.05] blur-[150px]" />
        </>
      )}
    </div>
  );
}
