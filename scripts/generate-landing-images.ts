/**
 * Generate landing page images via Google Gemini (Nano Banana).
 *
 * Setup:
 *   1. Create .env.local with GEMINI_API_KEY=your_key
 *   2. npm run generate:images
 *
 * @see https://ai.google.dev/gemini-api/docs/image-generation
 */

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { config } from "dotenv";
import { generateImage } from "../lib/nano-banana";
import {
  LANDING_IMAGE_PROMPTS,
  LANDING_IMAGE_SLOTS,
} from "../lib/landing-image-config";

config({ path: ".env.local" });
config({ path: ".env" });

const publicDir = path.join(process.cwd(), "public");
const generatedDir = path.join(publicDir, "images", "generated");
const manifestPath = path.join(process.cwd(), "lib", "generated-images.json");

async function main() {
  const only = process.argv[2];
  const slots = only
    ? LANDING_IMAGE_SLOTS.filter((s) => s.id === only)
    : LANDING_IMAGE_SLOTS;

  if (only && slots.length === 0) {
    console.error(`Unknown slot "${only}". Use: hero | cabin | aircraft | lounge`);
    process.exit(1);
  }

  const manifest: Record<string, boolean> = JSON.parse(
    await readFile(manifestPath, "utf-8")
  );

  console.log("Nano Banana / Gemini image generation");
  console.log(`Model: ${process.env.GEMINI_IMAGE_MODEL ?? "gemini-2.5-flash-image"}`);
  console.log(`Output: ${generatedDir}\n`);

  for (const slot of slots) {
    const spec = LANDING_IMAGE_PROMPTS[slot.id];
    const outFile = path.join(publicDir, slot.generated.replace(/^\//, ""));

    console.log(`→ ${slot.id}...`);
    await generateImage({
      prompt: spec.prompt,
      aspectRatio: spec.aspectRatio,
      imageSize: spec.imageSize ?? "2K",
      outputPath: outFile,
    });
    manifest[slot.id] = true;
    console.log(`  saved ${slot.generated}\n`);
  }

  await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
  console.log("Done. Restart dev server to load new images.");
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
