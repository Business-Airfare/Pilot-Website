"use client";

import { motion, useReducedMotion } from "motion/react";
import { AnimatedSection } from "./AnimatedSection";
import { SectionHeader } from "./primitives";
import { staggerContainer, staggerItem } from "./motion-config";

const steps = [
  {
    step: "01",
    title: "Consult",
    subtitle: "Share your objectives",
    description:
      "Speak directly with a senior agent about routes, cabin preferences, timing, and confidentiality. No chatbots — only professionals who have managed thousands of premium departures.",
  },
  {
    step: "02",
    title: "Curate",
    subtitle: "We source and refine",
    description:
      "Tailored options across carriers and alliances, negotiated terms, and refinements until the itinerary meets your exact expectations — down to seat and lounge preference.",
  },
  {
    step: "03",
    title: "Fly",
    subtitle: "Travel with confidence",
    description:
      "Tickets issued, changes managed in real time, and support available before, during, and after every segment via phone, email, or WhatsApp.",
  },
];

export function HowItWorks() {
  const reduced = useReducedMotion();

  return (
    <AnimatedSection
      id="how-it-works"
      className="relative overflow-hidden border-y border-[var(--color-border)] bg-[var(--color-surface)]/40 py-24 md:py-36"
    >
      <div className="absolute left-1/2 top-0 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[var(--color-cta)]/30 to-transparent" aria-hidden />

      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="How It Works"
          title="Consult. Curate. Fly."
          description="Three deliberate movements — each led by a human expert accountable from first call to wheels up."
          align="center"
          className="mx-auto"
        />

        {reduced ? (
          <ol className="mt-20 grid gap-8 md:grid-cols-3">
            {steps.map((item) => (
              <StepCard key={item.step} {...item} />
            ))}
          </ol>
        ) : (
          <motion.ol
            className="relative mt-20 grid gap-8 md:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
          >
            <div
              className="pointer-events-none absolute left-[16.66%] right-[16.66%] top-12 hidden h-px bg-gradient-to-r from-[var(--color-cta)]/50 via-[var(--color-border-strong)] to-[var(--color-cta)]/50 md:block"
              aria-hidden
            />
            {steps.map((item) => (
              <motion.li key={item.step} variants={staggerItem}>
                <StepCard {...item} />
              </motion.li>
            ))}
          </motion.ol>
        )}
      </div>
    </AnimatedSection>
  );
}

function StepCard({
  step,
  title,
  subtitle,
  description,
}: (typeof steps)[number]) {
  return (
    <article className="group relative flex flex-col">
      <div className="mb-8 flex items-start justify-between">
        <span className="font-serif text-5xl font-light text-[var(--color-cta)]/40 transition-colors duration-500 group-hover:text-[var(--color-cta)]/70">
          {step}
        </span>
        <span className="mt-2 h-2 w-2 rounded-full bg-[var(--color-cta)] shadow-[0_0_12px_var(--color-cta)]" aria-hidden />
      </div>
      <h3 className="font-serif text-2xl text-[var(--color-cta)]">{title}</h3>
      <p className="mt-2 text-sm font-medium uppercase tracking-[0.15em] text-[var(--color-text)]">
        {subtitle}
      </p>
      <p className="mt-5 text-sm font-light leading-relaxed text-[var(--color-text-muted)]">
        {description}
      </p>
      <div className="mt-8 h-px w-full bg-gradient-to-r from-[var(--color-border-strong)] to-transparent md:hidden" />
    </article>
  );
}
