"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { AnimatedSection } from "./AnimatedSection";
import { getLandingImage, imageSrcForSlot } from "@/lib/landing-image-config";
import { BentoCard, SectionHeader } from "./primitives";
import { staggerContainer, staggerItem } from "./motion-config";

function ImageGraphic({ id }: { id: "cabin" | "aircraft" }) {
  const slot = getLandingImage(id);
  const src = imageSrcForSlot(id);
  return (
    <div className="absolute inset-0">
      <Image
        src={src}
        alt={slot.alt}
        fill
        className="object-cover opacity-70"
        sizes="(min-width: 768px) 50vw, 100vw"
        unoptimized={src.startsWith("/images/")}
      />
      <div className="absolute inset-0 bg-[var(--color-surface)]/30 mix-blend-multiply" />
    </div>
  );
}

function GradientGraphic({ variant }: { variant: "gold" | "silver" | "mesh" }) {
  const styles = {
    gold: "from-[var(--color-cta)]/25 via-transparent to-[var(--color-background)]",
    silver: "from-[var(--color-silver)]/15 via-[var(--color-secondary)]/30 to-[var(--color-background)]",
    mesh: "from-[#1c1917] via-[#44403c]/40 to-[var(--color-background)]",
  };
  return (
    <div
      className={`absolute inset-0 bg-gradient-to-br ${styles[variant]}`}
      aria-hidden
    />
  );
}

function LineArtGraphic() {
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-30"
      viewBox="0 0 400 200"
      fill="none"
      aria-hidden
    >
      <path
        d="M0 120 Q100 80 200 100 T400 90"
        stroke="rgba(202,138,4,0.4)"
        strokeWidth="1"
      />
      <path
        d="M40 160 Q180 40 360 140"
        stroke="rgba(196,188,180,0.25)"
        strokeWidth="0.75"
      />
      <circle cx="320" cy="60" r="40" stroke="rgba(202,138,4,0.2)" strokeWidth="1" />
    </svg>
  );
}

export function Services() {
  const reduced = useReducedMotion();

  const grid = (
    <div className="mt-16 grid grid-cols-1 gap-4 lg:grid-cols-6 lg:grid-rows-2">
      <BentoCard
        eyebrow="Ticketing"
        title="Business & First Class"
        description="Negotiated fares and premium cabin access across global carriers — held by agents who understand your standards, not an algorithm."
        className="lg:col-span-3 lg:row-span-2 lg:rounded-tl-2xl"
        graphic={<ImageGraphic id="cabin" />}
      />
      <BentoCard
        eyebrow="Planning"
        title="Custom Itineraries"
        description="Multi-city, long-haul, and urgent departures with lounge access and connection timing refined to the minute."
        className="lg:col-span-3 lg:rounded-tr-2xl"
        graphic={<GradientGraphic variant="gold" />}
      />
      <BentoCard
        eyebrow="Corporate"
        title="VIP Client Management"
        description="Dedicated accounts for executives, family offices, and corporate programs — discreet billing, priority response."
        className="lg:col-span-2"
        graphic={<LineArtGraphic />}
      />
      <BentoCard
        eyebrow="Support"
        title="Always Reachable"
        description="Phone, email, WhatsApp — one assigned team, full context, every time you need to change course."
        className="lg:col-span-2 lg:rounded-br-2xl"
        graphic={<GradientGraphic variant="silver" />}
      />
      <BentoCard
        eyebrow="Global"
        title="Worldwide Cabin Access"
        description="Star Alliance, oneworld, SkyTeam — and beyond. Your agent navigates alliances you do not have to."
        className="lg:col-span-2 lg:rounded-bl-2xl max-lg:rounded-b-2xl"
        graphic={<ImageGraphic id="aircraft" />}
      />
    </div>
  );

  return (
    <AnimatedSection id="services" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="Services"
          title="A private aviation standard, applied to commercial premium travel."
          description="Four disciplines — one accountable team. Every engagement begins with a senior agent and ends with a flawless departure."
        />

        {reduced ? (
          grid
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            <motion.div variants={staggerItem}>{grid}</motion.div>
          </motion.div>
        )}
      </div>
    </AnimatedSection>
  );
}
