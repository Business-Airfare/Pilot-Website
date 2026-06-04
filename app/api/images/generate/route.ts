import { NextResponse } from "next/server";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { generateImage } from "@/lib/nano-banana";
import {
  LANDING_IMAGE_PROMPTS,
  LANDING_IMAGE_SLOTS,
  type LandingImageSlot,
} from "@/lib/landing-image-config";

const ALLOWED_IDS = new Set(LANDING_IMAGE_SLOTS.map((s) => s.id));

/**
 * POST /api/images/generate
 * Body: { "id": "hero" } | { "id": "all" }
 *
 * Disabled in production unless IMAGE_GENERATE_SECRET matches header x-generate-secret.
 */
export async function POST(request: Request) {
  const isDev = process.env.NODE_ENV === "development";
  const secret = process.env.IMAGE_GENERATE_SECRET;
  const headerSecret = request.headers.get("x-generate-secret");

  if (!isDev) {
    if (!secret || headerSecret !== secret) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json(
      { error: "GEMINI_API_KEY is not configured" },
      { status: 500 }
    );
  }

  let body: { id?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const id = body.id ?? "all";
  const slots =
    id === "all"
      ? LANDING_IMAGE_SLOTS
      : LANDING_IMAGE_SLOTS.filter((s) => s.id === id);

  if (!slots.length || (id !== "all" && !ALLOWED_IDS.has(id as LandingImageSlot["id"]))) {
    return NextResponse.json(
      { error: "Invalid id. Use hero, cabin, aircraft, lounge, or all" },
      { status: 400 }
    );
  }

  const manifestPath = path.join(process.cwd(), "lib", "generated-images.json");
  const manifest: Record<string, boolean> = JSON.parse(
    await readFile(manifestPath, "utf-8")
  );
  const publicDir = path.join(process.cwd(), "public");
  const generated: string[] = [];

  try {
    for (const slot of slots) {
      const spec = LANDING_IMAGE_PROMPTS[slot.id];
      const outFile = path.join(publicDir, slot.generated.replace(/^\//, ""));
      await generateImage({
        prompt: spec.prompt,
        aspectRatio: spec.aspectRatio,
        imageSize: spec.imageSize ?? "2K",
        outputPath: outFile,
      });
      manifest[slot.id] = true;
      generated.push(slot.generated);
    }

    await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n");

    return NextResponse.json({
      ok: true,
      generated,
      model: process.env.GEMINI_IMAGE_MODEL ?? "gemini-2.5-flash-image",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
