import { GoogleGenAI } from "@google/genai";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

export type GenerateImageOptions = {
  prompt: string;
  /** Gemini image model (Nano Banana family). */
  model?: string;
  aspectRatio?: string;
  imageSize?: "512" | "1K" | "2K" | "4K";
  outputPath: string;
};

const DEFAULT_MODEL =
  process.env.GEMINI_IMAGE_MODEL ?? "gemini-2.5-flash-image";

function getClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY is missing. Get a key at https://aistudio.google.com/apikey and add it to .env.local"
    );
  }
  return new GoogleGenAI({ apiKey });
}

/**
 * Generate an image with Google Gemini (Nano Banana image models).
 * @see https://ai.google.dev/gemini-api/docs/image-generation
 */
export async function generateImage({
  prompt,
  model = DEFAULT_MODEL,
  aspectRatio = "16:9",
  imageSize = "2K",
  outputPath,
}: GenerateImageOptions): Promise<string> {
  const ai = getClient();

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseModalities: ["IMAGE"],
      imageConfig: {
        aspectRatio,
        imageSize,
      },
    },
  });

  const parts = response.candidates?.[0]?.content?.parts;
  if (!parts?.length) {
    throw new Error("No response parts returned from Gemini image generation.");
  }

  let imageBase64: string | undefined;
  for (const part of parts) {
    if (part.inlineData?.data) {
      imageBase64 = part.inlineData.data;
      break;
    }
  }

  if (!imageBase64) {
    throw new Error(
      "No image data in response. Try a different model via GEMINI_IMAGE_MODEL."
    );
  }

  const dir = path.dirname(outputPath);
  await mkdir(dir, { recursive: true });
  await writeFile(outputPath, Buffer.from(imageBase64, "base64"));

  return outputPath;
}
