import * as path from 'path';

/**
 * Dynamically imports music-metadata and returns the duration of an audio file in seconds.
 * Returns null if the duration cannot be determined.
 */
export async function getAudioDuration(filePath: string): Promise<number | null> {
  try {
    // Dynamic import workaround to load ESM-only music-metadata inside CommonJS
    const { parseFile } = await (Function('return import("music-metadata")')() as Promise<typeof import('music-metadata')>);
    const metadata = await parseFile(filePath);
    return metadata.format.duration || null;
  } catch (error) {
    console.error(`[Audio Utility] Failed to parse audio duration for ${path.basename(filePath)}:`, error);
    return null;
  }
}
