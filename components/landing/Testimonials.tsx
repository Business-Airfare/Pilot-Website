"use client";

import { motion, useReducedMotion } from "motion/react";
import { AnimatedSection } from "./AnimatedSection";
import { SectionHeader } from "./primitives";
import { staggerContainer, staggerItem } from "./motion-config";

const testimonials = [
  {
    quote:
      "Our leadership team travels constantly. Business Airfare has become the only channel we use for long-haul business class — responsive, discreet, and consistently ahead of schedule changes.",
    name: "Victoria Ashford",
    role: "Chief of Staff",
    company: "Global Asset Management",
    type: "Corporate",
    featured: true,
    initials: "VA",
  },
  {
    quote:
      "I needed a complex multi-city itinerary within forty-eight hours. One agent owned the entire process, kept me updated on WhatsApp, and delivered seats I could not find anywhere online.",
    name: "Marcus Chen",
    role: "Managing Director",
    company: "Private Equity",
    type: "Executive",
    featured: false,
    initials: "MC",
  },
  {
    quote:
      "For leisure travel at this level, details matter — lounge access, connection timing, seat preferences. They anticipate what I would have asked for before I ask.",
    name: "Elena Moretti",
    role: "Board Member",
    company: "Philanthropy",
    type: "Luxury Leisure",
    featured: false,
    initials: "EM",
  },
];

const featured = testimonials.find((t) => t.featured)!;
const others = testimonials.filter((t) => !t.featured);

export function Testimonials() {
  const reduced = useReducedMotion();

  const grid = (
    <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
      <FeaturedCard {...featured} className="sm:col-span-2 lg:row-span-2" />
      {others.map((t) => (
        <CompactCard key={t.name} {...t} />
      ))}
    </div>
  );

  return (
    <AnimatedSection id="clients" className="py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="Clients"
          title="Trusted by those who travel without compromise."
          description="Executives, corporate programs, and discerning leisure travelers — united by an expectation of human expertise."
          align="center"
          className="mx-auto"
        />

        {reduced ? (
          grid
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
          >
            <motion.div variants={staggerItem}>{grid}</motion.div>
          </motion.div>
        )}
      </div>
    </AnimatedSection>
  );
}

function FeaturedCard({
  quote,
  name,
  role,
  company,
  type,
  initials,
  className,
}: (typeof testimonials)[number] & { className?: string }) {
  return (
    <article
      className={`iridescent-border glass-panel-strong relative flex flex-col justify-between overflow-hidden rounded-lg p-8 md:p-10 lg:p-12 ${className}`}
    >
      <span
        className="pointer-events-none absolute right-8 top-6 font-serif text-[8rem] leading-none text-[var(--color-text)]/[0.04]"
        aria-hidden
      >
        &ldquo;
      </span>
      <p className="relative font-serif text-xl font-light italic leading-relaxed text-[var(--color-text)] md:text-2xl md:leading-relaxed">
        &ldquo;{quote}&rdquo;
      </p>
      <footer className="relative mt-10 flex items-center gap-4 border-t border-[var(--color-border)] pt-8">
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[var(--color-cta)]/30 bg-[var(--color-cta)]/10 font-serif text-lg text-[var(--color-cta)]"
          aria-hidden
        >
          {initials}
        </div>
        <div>
          <p className="font-medium text-[var(--color-text)]">{name}</p>
          <p className="text-sm text-[var(--color-text-muted)]">
            {role}, {company}
          </p>
          <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--color-cta)]">
            {type}
          </p>
        </div>
      </footer>
    </article>
  );
}

function CompactCard({
  quote,
  name,
  role,
  type,
  initials,
}: (typeof testimonials)[number]) {
  return (
    <article className="glass-panel flex flex-col justify-between rounded-lg p-6 transition-[border-color,box-shadow] duration-500 hover:border-[var(--color-border-strong)] hover:shadow-[var(--shadow-glass)]">
      <p className="font-serif text-base font-light italic leading-relaxed text-[var(--color-text)]">
        &ldquo;{quote}&rdquo;
      </p>
      <footer className="mt-8 flex items-center gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--color-border-strong)] bg-white/[0.04] text-xs text-[var(--color-silver)]"
          aria-hidden
        >
          {initials}
        </div>
        <div>
          <p className="text-sm font-medium text-[var(--color-text)]">{name}</p>
          <p className="text-xs text-[var(--color-text-muted)]">{role}</p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[var(--color-cta)]">
            {type}
          </p>
        </div>
      </footer>
    </article>
  );
}
