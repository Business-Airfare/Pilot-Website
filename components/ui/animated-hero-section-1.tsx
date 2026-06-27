"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface NavLink {
  label: string;
  href: string;
}

interface AnimatedHeroProps {
  backgroundImageUrl: string;
  logo: React.ReactNode;
  navLinks: NavLink[];
  topRightAction?: React.ReactNode;
  title: string;
  description: string;
  ctaButton: {
    text: string;
    onClick: () => void;
  };
  secondaryCta?: {
    text: string;
    onClick: () => void;
  };
  className?: string;
}

export interface AnimatedHeroContentProps {
  title: string;
  description: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  ctaButton?: {
    text: string;
    onClick: () => void;
  };
  secondaryCta?: {
    text: string;
    onClick: () => void;
  };
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const glassButtonClassName =
  "cursor-pointer bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-colors";

/** Text-only overlay — use inside an existing hero (e.g. scroll-scrub video). */
export function AnimatedHeroContent({
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
  ctaButton,
  secondaryCta,
}: AnimatedHeroContentProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        "relative z-10 flex w-full max-w-4xl flex-col items-start justify-center text-left text-white",
        className,
      )}
    >
      <motion.h1
        variants={itemVariants}
        className={cn(
          titleClassName
            ? titleClassName
            : "text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl",
        )}
      >
        {title}
      </motion.h1>
      <motion.p
        variants={itemVariants}
        className={cn(
          "mt-6 max-w-2xl text-lg leading-8 text-white/80",
          descriptionClassName,
        )}
      >
        {description}
      </motion.p>
      {(ctaButton || secondaryCta) && (
        <motion.div
          variants={itemVariants}
          className="pointer-events-auto mt-10 flex items-center gap-x-4"
        >
          {ctaButton && (
            <Button
              onClick={ctaButton.onClick}
              size="lg"
              className={glassButtonClassName}
            >
              {ctaButton.text}
            </Button>
          )}
          {secondaryCta && (
            <Button
              onClick={secondaryCta.onClick}
              size="lg"
              className={glassButtonClassName}
            >
              {secondaryCta.text}
            </Button>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

export const AnimatedHero = ({
  backgroundImageUrl,
  logo,
  navLinks,
  topRightAction,
  title,
  description,
  ctaButton,
  secondaryCta,
  className,
}: AnimatedHeroProps) => {
  return (
    <div
      className={cn(
        "relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background",
        className,
      )}
    >
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute top-0 z-20 flex h-20 w-full items-center justify-between px-6 text-white md:px-12"
      >
        <div className="flex items-center gap-2">{logo}</div>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="cursor-pointer text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:block">{topRightAction}</div>
      </motion.header>

      <AnimatedHeroContent
        className="px-6 md:px-12"
        title={title}
        description={description}
        ctaButton={ctaButton}
        secondaryCta={secondaryCta}
      />
    </div>
  );
};
