"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { AnimatedSection } from "./AnimatedSection";
import { getLandingImage, imageSrcForSlot } from "@/lib/landing-image-config";
import { luxuryEase } from "./motion-config";

const loungeImage = getLandingImage("lounge");

export function Experience() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const imageScale = useTransform(scrollYProgress, [0.2, 0.5], [1.08, 1]);

  return (
    <AnimatedSection className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-[var(--color-cta)]">
              The experience
            </p>
            <h2 className="mt-4 font-serif text-3xl font-medium leading-tight text-[var(--color-text)] md:text-4xl lg:text-5xl">
              Beyond the ticket —
              <span className="block text-[var(--color-text-muted)]">
                the lounge, the connection, the calm.
              </span>
            </h2>
            <p className="mt-8 text-base font-light leading-relaxed text-[var(--color-text-muted)]">
              We coordinate every touchpoint of premium air travel: alliance
              benefits, ground transfers, schedule volatility, and last-minute
              cabin changes — so you arrive as composed as you depart.
            </p>
            <ul className="mt-10 space-y-4 border-l border-[var(--color-cta)]/40 pl-6">
              {[
                "Lounge access & connection timing optimized",
                "Discreet handling for high-profile travelers",
                "Corporate billing & multi-traveler programs",
              ].map((item) => (
                <li
                  key={item}
                  className="text-sm font-light text-[var(--color-text-muted)]"
                >
                  {item}
                </li>
              ))}
            </ul>
            <motion.a
              href="#contact"
              className="mt-10 inline-flex items-center text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-cta)] transition-colors duration-300 hover:text-[var(--color-champagne)] cursor-pointer"
              whileHover={reduced ? undefined : { x: 4 }}
              transition={{ duration: 0.35, ease: luxuryEase }}
            >
              Begin your itinerary →
            </motion.a>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-lg iridescent-border lg:aspect-[3/4]">
            <motion.div
              className="absolute inset-0"
              style={reduced ? undefined : { scale: imageScale }}
            >
              <Image
                src={imageSrcForSlot("lounge")}
                alt={loungeImage.alt}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 40vw, 100vw"
                unoptimized={imageSrcForSlot("lounge").startsWith("/images/")}
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)]/90 via-transparent to-[var(--color-background)]/20" />
            <div className="absolute bottom-6 left-6 right-6 glass-panel rounded-lg p-5">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-text-subtle)]">
                White-glove coordination
              </p>
              <p className="mt-1 font-serif text-lg text-[var(--color-text)]">
                One agent. Full context. Every channel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
