import { Marquee } from "./primitives";

const partners = [
  "Emirates",
  "Singapore Airlines",
  "Lufthansa",
  "Qatar Airways",
  "British Airways",
  "Cathay Pacific",
  "Air France",
  "Swiss International",
];

export function TrustStrip() {
  return (
    <section
      className="relative border-y border-[var(--color-border)] bg-[var(--color-surface)]/80 py-12"
      aria-label="Trust indicators"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="shrink-0 lg:max-w-xs">
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[var(--color-cta)]">
              Global network
            </p>
            <p className="mt-2 font-serif text-lg text-[var(--color-text)]">
              Preferred access across leading carriers
            </p>
          </div>

          <div className="min-w-0 flex-1">
            <Marquee items={partners} speed={50} />
          </div>

          <div className="flex shrink-0 flex-col gap-6 sm:flex-row sm:gap-10 lg:flex-col lg:gap-4 xl:flex-row xl:gap-10">
            <div className="glass-panel rounded-lg px-5 py-4">
              <p className="font-serif text-2xl text-[var(--color-text)]">24/7</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-subtle)]">
                Human agents
              </p>
            </div>
            <div className="glass-panel rounded-lg px-5 py-4">
              <p className="font-serif text-2xl text-[var(--color-text)]">First</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-subtle)]">
                &amp; business class
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
