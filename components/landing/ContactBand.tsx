"use client";

import { motion, useReducedMotion } from "motion/react";
import { FormEvent, useState } from "react";
import { AnimatedSection } from "./AnimatedSection";
import { DotPattern, GlassButton, SectionHeader } from "./primitives";
import { IconChat, IconEnvelope, IconPhone } from "./icons";
import { luxuryEase, staggerContainer, staggerItem } from "./motion-config";

const channels = [
  {
    label: "Phone",
    value: "+1 (888) 555-0142",
    href: "tel:+18885550142",
    icon: IconPhone,
  },
  {
    label: "Email",
    value: "agents@business-airfare.com",
    href: "mailto:agents@business-airfare.com",
    icon: IconEnvelope,
  },
  {
    label: "WhatsApp",
    value: "Message your agent",
    href: "https://wa.me/18885550142",
    icon: IconChat,
  },
];

export function ContactBand() {
  const reduced = useReducedMotion();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <AnimatedSection id="contact" className="relative overflow-hidden py-24 md:py-36">
      <DotPattern className="opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-cta)]/[0.03] to-transparent" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="Contact"
          title="A live agent is standing by."
          description="No queues. No ticket numbers. Reach the same team who knows your preferences — tonight, tomorrow, or six months from now."
          align="center"
          className="mx-auto"
        />

        {reduced ? (
          <ContactContent submitted={submitted} onSubmit={handleSubmit} />
        ) : (
          <motion.div
            className="mt-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
          >
            <motion.div variants={staggerItem}>
              <ContactContent submitted={submitted} onSubmit={handleSubmit} />
            </motion.div>
          </motion.div>
        )}
      </div>
    </AnimatedSection>
  );
}

function ContactContent({
  submitted,
  onSubmit,
}: {
  submitted: boolean;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}) {
  const reduced = useReducedMotion();

  return (
    <>
      <div className="grid gap-4 md:grid-cols-3">
        {channels.map(({ label, value, href, icon: Icon }) => (
          <motion.a
            key={label}
            href={href}
            className="group relative overflow-hidden rounded-lg border border-[var(--color-border)] bg-white/[0.04] p-6 backdrop-blur-xl transition-all duration-500 hover:border-[var(--color-border-strong)] hover:bg-white/[0.07] cursor-pointer"
            whileHover={reduced ? undefined : { y: -4 }}
            transition={{ duration: 0.4, ease: luxuryEase }}
            {...(href.startsWith("http")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-cta)]/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[var(--color-cta)]/25 bg-[var(--color-cta)]/10 text-[var(--color-cta)] transition-colors duration-300 group-hover:bg-[var(--color-cta)]/20">
                <Icon />
              </span>
              <span>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--color-text-subtle)]">
                  {label}
                </span>
                <span className="mt-2 block text-sm font-medium text-[var(--color-text)]">
                  {value}
                </span>
              </span>
            </div>
          </motion.a>
        ))}
      </div>

      <div className="mt-8 iridescent-border overflow-hidden rounded-2xl glass-panel-strong">
        <div className="grid lg:grid-cols-[1.1fr_1fr]">
          <div className="border-b border-[var(--color-border)] p-10 md:p-14 lg:border-b-0 lg:border-r">
            <h3 className="font-serif text-2xl text-[var(--color-text)] md:text-3xl">
              Request a bespoke itinerary
            </h3>
            <p className="mt-4 max-w-md text-sm font-light leading-relaxed text-[var(--color-text-muted)]">
              Share your travel window and destinations. A senior agent will
              respond with curated options — typically within the hour.
            </p>
            <div className="mt-10">
              <GlassButton href="tel:+18885550142" variant="primary">
                Speak With an Agent
              </GlassButton>
            </div>
          </div>

          <div className="p-10 md:p-14">
            {submitted ? (
              <div className="flex h-full min-h-[280px] flex-col justify-center">
                <p className="font-serif text-2xl text-[var(--color-text)]">
                  Thank you.
                </p>
                <p className="mt-3 text-sm font-light text-[var(--color-text-muted)]">
                  An agent will reach out shortly to begin your itinerary.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-6">
                <FormField id="contact-name" label="Name" required placeholder="Your name" />
                <FormField
                  id="contact-email"
                  label="Email"
                  type="email"
                  required
                  placeholder="you@company.com"
                />
                <FormField
                  id="contact-dates"
                  label="Travel dates & route"
                  placeholder="e.g. 12–18 March, JFK → Singapore"
                />
                <motion.button
                  type="submit"
                  className="w-full rounded-lg border border-[var(--color-border-strong)] bg-gradient-to-r from-white/[0.06] to-white/[0.02] px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-text)] transition-all duration-300 hover:border-[var(--color-silver)] hover:from-white/[0.1] cursor-pointer"
                  whileHover={reduced ? undefined : { scale: 1.01 }}
                  whileTap={reduced ? undefined : { scale: 0.99 }}
                  transition={{ duration: 0.35, ease: luxuryEase }}
                >
                  Submit Request
                </motion.button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function FormField({
  id,
  label,
  type = "text",
  required,
  placeholder,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-text-subtle)]"
      >
        {label}
      </label>
      <input
        id={id}
        name={id.replace("contact-", "")}
        type={type}
        required={required}
        autoComplete={type === "email" ? "email" : "name"}
        placeholder={placeholder}
        className="mt-2 w-full rounded-sm border border-[var(--color-border)] bg-white/[0.03] px-4 py-3.5 text-sm text-[var(--color-text)] transition-[border-color,background] duration-300 placeholder:text-[var(--color-text-subtle)] focus:border-[var(--color-cta)]/50 focus:bg-white/[0.05] focus:outline-none"
      />
    </div>
  );
}
