/**
 * Landing page imagery: prefer Nano Banana outputs in /public/images/generated/
 * when present (run `npm run generate:images`). Falls back to Unsplash.
 */

import manifest from "./generated-images.json";

export type LandingImageSlot = {
  id: string;
  /** Path under /public when generated */
  generated: string;
  fallback: string;
  alt: string;
};

export const LANDING_IMAGE_SLOTS: LandingImageSlot[] = [
  {
    id: "hero",
    generated: "/images/generated/hero.png",
    fallback:
      "https://images.unsplash.com/photo-1540962351504-2db4462be548?auto=format&fit=crop&w=1600&q=80",
    alt: "Premium first class aircraft cabin, cinematic lighting",
  },
  {
    id: "cabin",
    generated: "/images/generated/cabin.png",
    fallback:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80",
    alt: "Aircraft wing above clouds at golden hour",
  },
  {
    id: "aircraft",
    generated: "/images/generated/aircraft.png",
    fallback:
      "https://images.unsplash.com/photo-1529074963764-98f47c6a70a2?auto=format&fit=crop&w=1200&q=80",
    alt: "Luxury commercial aircraft on private tarmac",
  },
  {
    id: "lounge",
    generated: "/images/generated/lounge.png",
    fallback:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=80",
    alt: "Exclusive airport lounge and luxury hospitality",
  },
];

export const LANDING_IMAGE_PROMPTS: Record<
  LandingImageSlot["id"],
  { prompt: string; aspectRatio: string; imageSize?: "1K" | "2K" | "4K" }
> = {
  hero: {
    prompt:
      "Cinematic ultra-luxury first class airline suite interior, deep charcoal and champagne gold accents, soft ambient lighting, empty seat with plush bedding, floor-to-ceiling window showing night sky, photorealistic, editorial travel photography, no people, no text, no logos, 8k mood",
    aspectRatio: "3:4",
    imageSize: "2K",
  },
  cabin: {
    prompt:
      "Business class airplane window view at sunset, wing silhouette, dramatic clouds, deep blue and gold tones, minimal, premium aviation aesthetic, photorealistic, no text, no logos",
    aspectRatio: "16:9",
    imageSize: "2K",
  },
  aircraft: {
    prompt:
      "Wide body luxury jet on dark wet tarmac at dusk, subtle gold runway lights, sleek modern aircraft, private aviation mood, photorealistic, cinematic, no text, no airline logos",
    aspectRatio: "16:9",
    imageSize: "2K",
  },
  lounge: {
    prompt:
      "High-end airport first class lounge interior, marble and dark wood, floor-to-ceiling windows, muted warm lighting, empty sophisticated space, luxury hospitality, photorealistic, no people, no text",
    aspectRatio: "3:4",
    imageSize: "2K",
  },
};

export function getLandingImage(id: LandingImageSlot["id"]) {
  const slot = LANDING_IMAGE_SLOTS.find((s) => s.id === id);
  if (!slot) throw new Error(`Unknown image slot: ${id}`);
  return slot;
}

/** Resolved src: local generated file if manifest says it exists, else Unsplash. */
export function imageSrcForSlot(id: LandingImageSlot["id"]): string {
  const slot = getLandingImage(id);
  const hasGenerated = manifest[id as keyof typeof manifest] === true;
  return hasGenerated ? slot.generated : slot.fallback;
}

export function isGeneratedImage(id: LandingImageSlot["id"]): boolean {
  return manifest[id as keyof typeof manifest] === true;
}
