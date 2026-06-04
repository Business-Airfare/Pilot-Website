"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { IconArrowRight } from "./icons";
import { staggerContainer, staggerItem } from "./motion-config";
import { getLandingImage, imageSrcForSlot } from "@/lib/landing-image-config";
import {
  AmbientOrbs,
  DotPattern,
  GlassButton,
  GridOverlay,
} from "./primitives";

const heroImage = getLandingImage("hero");

const stats = [
  { value: "24/7", label: "Live agent desk" },
  { value: "180+", label: "Global carriers" },
  { value: "15+", label: "Years concierge expertise" },
];

function HeroContent() {
  const reduced = useReducedMotion();

  const wrap = (content: ReactNode, key?: string) =>
    reduced ? (
      <div key={key}>{content}</div>
    ) : (
      <motion.div key={key} variants={staggerItem}>
        {content}
      </motion.div>
    );

  const inner = (
    <>
      {wrap(
        <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-[var(--color-border-strong)] bg-white/[0.04] px-4 py-2 backdrop-blur-md">
          <span className="rounded-full bg-[var(--color-cta)] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#0c0a09]">
            Concierge
          </span>
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--color-text-muted)]">
            Executive Air Travel
          </span>
        </div>,
        "badge"
      )}
      {wrap(
        <h1 className="max-w-[14ch] font-serif text-[2.75rem] font-medium leading-[1.05] tracking-tight text-[var(--color-text)] sm:text-5xl md:text-6xl lg:text-[4.25rem]">
          First &amp; business class,
          <span className="mt-2 block gold-gradient-text">reserved for the discerning.</span>
        </h1>,
        "h1"
      )}
      {wrap(
        <p className="mt-8 max-w-lg text-base font-light leading-relaxed text-[var(--color-text-muted)] md:text-lg">
          A private desk of senior travel agents — never bots — crafting bespoke
          itineraries, securing premium cabins, and standing by across every
          timezone.
        </p>,
        "sub"
      )}
      {wrap(
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <GlassButton href="#contact" variant="primary" className="group">
            Request Itinerary
            <IconArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </GlassButton>
          <GlassButton href="#how-it-works" variant="ghost">
            How We Work
          </GlassButton>
        </div>,
        "cta"
      )}
      {wrap(
        <dl className="mt-16 grid grid-cols-3 gap-4 border-t border-[var(--color-border)] pt-10 sm:gap-8">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="font-serif text-2xl text-[var(--color-text)] stat-glow md:text-3xl">
                {s.value}
              </dt>
              <dd className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-text-subtle)]">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>,
        "stats"
      )}
    </>
  );

  if (reduced) {
    return (
      <div className="relative z-10 flex flex-col justify-center px-6 pb-20 pt-32 lg:px-10 lg:pt-36">
        {inner}
      </div>
    );
  }

  return (
    <motion.div
      className="relative z-10 flex flex-col justify-center px-6 pb-20 pt-32 lg:px-10 lg:pt-36"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      {inner}
    </motion.div>
  );
}

export function Hero() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 500], [0, reduced ? 0 : 60]);
  const contentY = useTransform(scrollY, [0, 500], [0, reduced ? 0 : 24]);
  const overlayOpacity = useTransform(scrollY, [0, 400], [0.55, 0.75]);

  return (
    <section className="relative min-h-[100vh] overflow-hidden" aria-labelledby="hero-heading">
      <div className="hero-mesh absolute inset-0" aria-hidden />
      <div className="light-beams" aria-hidden>
        <div className="light-beams__group">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="light-beams__bar" />
          ))}
        </div>
      </div>
      <AmbientOrbs />
      <DotPattern />
      <GridOverlay />

      <div className="relative mx-auto grid min-h-[100vh] max-w-7xl lg:grid-cols-[1fr_1.05fr] lg:gap-8">
        <motion.div style={reduced ? undefined : { y: contentY }}>
          <h2 id="hero-heading" className="sr-only">
            Business Airfare — Premium business and first class travel concierge
          </h2>
          <HeroContent />
        </motion.div>

        <div className="relative hidden lg:block">
          <motion.div
            className="absolute inset-0 overflow-hidden rounded-lg iridescent-border"
            style={reduced ? undefined : { y: imageY }}
          >
            <Image
              src={imageSrcForSlot("hero")}
              alt={heroImage.alt}
              fill
              priority
              className="object-cover object-center scale-105"
              sizes="(min-width: 1024px) 50vw, 0px"
              unoptimized={imageSrcForSlot("hero").startsWith("/images/")}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-[var(--color-background)]/40 to-transparent"
              style={reduced ? undefined : { opacity: overlayOpacity }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-background)] via-transparent to-transparent" />

            <div className="absolute bottom-8 left-8 right-8 glass-panel-strong rounded-lg p-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-cta)]">
                Now boarding
              </p>
              <p className="mt-2 font-serif text-xl text-[var(--color-text)]">
                Singapore · London · Dubai
              </p>
              <p className="mt-2 text-xs font-light text-[var(--color-text-muted)]">
                Premium cabins sourced across Star Alliance, oneworld &amp; SkyTeam.
              </p>
            </div>
          </motion.div>

          <div
            className="pointer-events-none absolute -right-4 top-1/4 h-32 w-32 rounded-full border border-[var(--color-cta)]/20"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -left-8 bottom-1/3 h-px w-24 bg-[var(--color-cta)]/40"
            aria-hidden
          />
        </div>
      </div>

      <div className="section-divider mx-auto max-w-7xl px-6 pb-6 lg:px-10" />
    </section>
  );
}
