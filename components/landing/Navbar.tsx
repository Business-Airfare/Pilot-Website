"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { IconClose, IconMenu } from "./icons";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#clients", label: "Clients" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const reduced = useReducedMotion();
  const Header = reduced ? "header" : motion.header;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <Header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "py-3 glass-panel-strong border-b border-[var(--color-border)] shadow-[var(--shadow-glass)]"
          : "bg-transparent py-5"
      )}
      {...(reduced ? {} : { initial: { y: -20, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { duration: 0.7 } })}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 lg:px-10"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="group flex items-center gap-2.5 cursor-pointer"
        >
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-cta)]/40 bg-[var(--color-cta)]/10 text-[10px] font-semibold text-[var(--color-cta)]"
            aria-hidden
          >
            BA
          </span>
          <span className="font-serif text-lg font-medium tracking-wide text-[var(--color-text)] transition-opacity duration-300 group-hover:opacity-80">
            Business Airfare
          </span>
        </Link>

        <ul className="hidden items-center gap-1 rounded-full border border-[var(--color-border)] bg-white/[0.03] p-1 backdrop-blur-xl md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="block rounded-full px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)] transition-all duration-300 hover:bg-white/[0.06] hover:text-[var(--color-text)] cursor-pointer"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <a
            href="#contact"
            className="inline-flex items-center rounded-full border border-[var(--color-cta)] bg-[var(--color-cta)] px-6 py-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0c0a09] shadow-[var(--shadow-glow-gold)] transition-all duration-300 hover:bg-[var(--color-cta-hover)] hover:border-[var(--color-cta-hover)] cursor-pointer"
          >
            Speak With an Agent
          </a>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-white/[0.04] text-[var(--color-text)] md:hidden cursor-pointer"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? <IconClose /> : <IconMenu />}
        </button>
      </nav>

      {mobileOpen && (
        <div
          id="mobile-menu"
          className="glass-panel-strong border-t border-[var(--color-border)] px-6 py-8 md:hidden"
        >
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block rounded-lg px-4 py-3 text-sm font-medium uppercase tracking-[0.15em] text-[var(--color-text-muted)] transition-colors duration-300 hover:bg-white/[0.05] hover:text-[var(--color-text)] cursor-pointer"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-4">
              <a
                href="#contact"
                className="flex w-full justify-center rounded-full border border-[var(--color-cta)] bg-[var(--color-cta)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#0c0a09] cursor-pointer"
                onClick={() => setMobileOpen(false)}
              >
                Speak With an Agent
              </a>
            </li>
          </ul>
        </div>
      )}
    </Header>
  );
}
