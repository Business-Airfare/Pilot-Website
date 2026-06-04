"use client";

import { motion, useReducedMotion } from "motion/react";
import { AnimatedSection } from "./AnimatedSection";
import { DotPattern } from "./primitives";
import { staggerContainer, staggerItem } from "./motion-config";

const stats = [
  {
    value: "2,400+",
    label: "Executive itineraries annually",
    detail: "Corporate & private clients worldwide",
  },
  {
    value: "< 15 min",
    label: "Average agent response",
    detail: "Phone, email, or WhatsApp — same team",
  },
  {
    value: "98%",
    label: "Client retention rate",
    detail: "Relationships measured in years, not trips",
  },
];

export function StatsBand() {
  const reduced = useReducedMotion();

  return (
    <AnimatedSection className="relative overflow-hidden py-20 md:py-28">
      <DotPattern className="opacity-20" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {reduced ? (
          <div className="grid gap-6 md:grid-cols-3">
            {stats.map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>
        ) : (
          <motion.div
            className="grid gap-6 md:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
          >
            {stats.map((s) => (
              <motion.div key={s.label} variants={staggerItem}>
                <StatCard {...s} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </AnimatedSection>
  );
}

function StatCard({
  value,
  label,
  detail,
}: {
  value: string;
  label: string;
  detail: string;
}) {
  return (
    <article className="iridescent-border glass-panel group rounded-lg p-8 md:p-10 transition-shadow duration-500 hover:shadow-[var(--shadow-glow-gold)]">
      <p className="font-serif text-4xl font-medium text-[var(--color-text)] stat-glow md:text-5xl">
        {value}
      </p>
      <p className="mt-4 text-sm font-medium uppercase tracking-[0.15em] text-[var(--color-text)]">
        {label}
      </p>
      <p className="mt-3 text-sm font-light leading-relaxed text-[var(--color-text-muted)]">
        {detail}
      </p>
    </article>
  );
}
