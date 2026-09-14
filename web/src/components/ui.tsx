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
  align = "center",
  immediate = false,
}: {
  eyebrow?: string;
  light: string;
  bold: string;
  sub?: string;
  align?: "left" | "center";
  /** Above the fold? Use the CSS animation, which does not wait for hydration. */
  immediate?: boolean;
}) {
  return (
    <div
      className={cx(
        immediate ? "rise" : "reveal",
        "flex flex-col gap-4",
        align === "center" && "mx-auto max-w-2xl items-center text-center",
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="font-display text-[clamp(2.2rem,7vw,3.8rem)] leading-[1.02] tracking-[-0.04em]">
        <span className="font-light text-muted">{light} </span>
        <span className="font-semibold text-text">{bold}</span>
      </h2>
      {sub && (
        <p
          className={cx(
            "max-w-lede text-pretty text-[0.95rem] leading-[1.7] text-muted",
            align === "center" && "mx-auto",
          )}
        >
          {sub}
        </p>
      )}
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
      <div className="absolute inset-0 starfield opacity-70" />
      <div className="absolute inset-0 gridlines" />
      <div className="absolute inset-0 grain opacity-[0.3]" />
      {glow && (
        <>
          <div className="absolute -top-48 left-1/2 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-accent/[0.11] blur-[160px]" />
          <div className="absolute -bottom-40 right-[6%] h-[26rem] w-[26rem] rounded-full bg-accent-2/[0.05] blur-[150px]" />
        </>
      )}
    </div>
  );
}

/* --------------------------------------------------------- Segmented tabs */

export function TabTrack({
  items,
  active,
  onSelect,
  idPrefix,
  label,
}: {
  items: readonly { key: string; tab: string }[];
  active: number;
  onSelect: (i: number) => void;
  idPrefix: string;
  label: string;
}) {
  return (
    <div className="flex justify-center">
      <div className="tab-track max-w-full flex-wrap justify-center" role="tablist" aria-label={label}>
        {items.map((it, i) => (
          <button
            key={it.key}
            type="button"
            role="tab"
            id={`${idPrefix}-tab-${it.key}`}
            aria-selected={i === active}
            aria-controls={`${idPrefix}-panel-${it.key}`}
            onClick={() => onSelect(i)}
            className={cx(
              "rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300",
              i === active
                ? "bg-accent text-bg shadow-[0_6px_20px_-8px_var(--color-accent)]"
                : "text-muted hover:text-text",
            )}
          >
            {it.tab}
          </button>
        ))}
      </div>
    </div>
  );
}
