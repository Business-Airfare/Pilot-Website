import Link from "next/link";

const legalLinks = [
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Terms of Service" },
  { href: "#", label: "Accessibility" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)] py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div>
            <Link
              href="/"
              className="font-serif text-xl font-medium tracking-wide text-[var(--color-text)] transition-opacity duration-300 hover:opacity-80 cursor-pointer"
            >
              Business Airfare
            </Link>
            <p className="mt-4 max-w-sm text-sm font-light leading-relaxed text-[var(--color-text-muted)]">
              Premium concierge for business and first class airline travel.
              Human agents. Global access. Available 24/7.
            </p>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--color-text-subtle)]">
                Contact
              </p>
              <ul className="mt-4 space-y-2 text-sm text-[var(--color-text-muted)]">
                <li>
                  <a
                    href="tel:+18885550142"
                    className="transition-colors duration-300 hover:text-[var(--color-text)] cursor-pointer"
                  >
                    +1 (888) 555-0142
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:agents@business-airfare.com"
                    className="transition-colors duration-300 hover:text-[var(--color-text)] cursor-pointer"
                  >
                    agents@business-airfare.com
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--color-text-subtle)]">
                Legal
              </p>
              <ul className="mt-4 space-y-2">
                {legalLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[var(--color-text-muted)] transition-colors duration-300 hover:text-[var(--color-text)] cursor-pointer"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="section-divider mt-12 mb-8" />

        <p className="text-xs text-[var(--color-text-subtle)]">
          &copy; {year} Business Airfare. All rights reserved. Business-Airfare.com
        </p>
      </div>
    </footer>
  );
}
