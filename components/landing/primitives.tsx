"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { luxuryEase } from "./motion-config";

export function AmbientOrbs() {
  const reduced = useReducedMotion();
  if (reduced) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="ambient-orb absolute -right-[20%] top-[10%] h-[28rem] w-[28rem] opacity-60" />
      <div className="ambient-orb ambient-orb--silver absolute -left-[15%] bottom-[20%] h-[22rem] w-[22rem] opacity-40" />
      <div className="absolute right-[15%] top-[45%] h-px w-[40%] rotate-[-12deg] bg-gradient-to-r from-transparent via-[var(--color-cta)]/30 to-transparent blur-[1px]" />
    </div>
  );
}

export function DotPattern({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(ellipse_at_center,transparent,black_70%)]",
        className
      )}
      aria-hidden
      style={{
        backgroundImage: "radial-gradient(rgba(250,250,249,0.08) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    />
  );
}

export function GridOverlay({ className }: { className?: string }) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 grid-overlay opacity-60", className)}
      aria-hidden
    />
  );
}

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <header
      className={cn(
        align === "center" && "mx-auto max-w-3xl text-center",
        className
      )}
    >
      <p className="text-xs font-medium uppercase tracking-[0.35em] text-[var(--color-cta)]">
        {eyebrow}
      </p>
      <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight text-[var(--color-text)] md:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
        {title}
      </h2>
      {description && (
        <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-[var(--color-text-muted)]">
          {description}
        </p>
      )}
    </header>
  );
}

type BentoCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
  graphic?: ReactNode;
  children?: ReactNode;
};

export function BentoCard({
  eyebrow,
  title,
  description,
  className,
  graphic,
  children,
}: BentoCardProps) {
  const reduced = useReducedMotion();

  const inner = (
    <>
      <div className="relative min-h-[12rem] shrink-0 overflow-hidden md:min-h-[14rem]">
        {graphic}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-[var(--color-surface)]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-cta)]/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
      <div className="relative z-10 -mt-20 flex flex-col justify-end p-8 pt-0 md:p-10">
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-cta)]">
          {eyebrow}
        </span>
        <h3 className="mt-3 font-serif text-xl font-medium text-[var(--color-text)] md:text-2xl">
          {title}
        </h3>
        <p className="mt-3 max-w-xl text-sm font-light leading-relaxed text-[var(--color-text-muted)]">
          {description}
        </p>
        {children}
      </div>
    </>
  );

  if (reduced) {
    return (
      <article
        className={cn(
          "group relative flex flex-col overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-glass)]",
          className
        )}
      >
        {inner}
      </article>
    );
  }

  return (
    <motion.article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-glass)] transition-[border-color,box-shadow] duration-500 hover:border-[var(--color-border-strong)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.45)]",
        className
      )}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.45, ease: luxuryEase }}
    >
      {inner}
    </motion.article>
  );
}

export function Marquee({
  items,
  speed = 40,
}: {
  items: string[];
  speed?: number;
}) {
  const reduced = useReducedMotion();
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[var(--color-background)] to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[var(--color-background)] to-transparent"
        aria-hidden
      />
      <div
        className={cn(
          "flex w-max gap-16 whitespace-nowrap py-2",
          !reduced && "animate-marquee"
        )}
        style={reduced ? undefined : { animationDuration: `${speed}s` }}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-serif text-sm tracking-[0.2em] text-[var(--color-text-subtle)] transition-colors duration-300 hover:text-[var(--color-text-muted)]"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function GlassButton({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  const reduced = useReducedMotion();

  const styles =
    variant === "primary"
      ? "border-[var(--color-cta)] bg-[var(--color-cta)] text-[#0c0a09] hover:bg-[var(--color-cta-hover)] hover:border-[var(--color-cta-hover)]"
      : "border-[var(--color-border-strong)] bg-white/[0.06] text-[var(--color-text)] backdrop-blur-md hover:border-[var(--color-silver)] hover:bg-white/[0.1]";

  return (
    <motion.a
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-sm border px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] transition-colors duration-300 cursor-pointer",
        styles,
        className
      )}
      whileHover={reduced ? undefined : { scale: 1.02 }}
      whileTap={reduced ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.35, ease: luxuryEase }}
    >
      {children}
    </motion.a>
  );
}
