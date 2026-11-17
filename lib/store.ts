import "server-only";
import { promises as fs } from "fs";
import path from "path";
import { cacheTag } from "next/cache";
import { seedTechnicians, type Technician } from "@/lib/data";

// Technicians live in a JSON file so the admin can edit them without a database.
// This works on a normal Node server. Serverless hosts (e.g. Vercel) have a read-only filesystem, so move this to a database there.
const FILE = path.join(process.cwd(), "data", "technicians.json");

export const TECHNICIANS_TAG = "technicians";

async function readAll(): Promise<Technician[]> {
  try {
    return JSON.parse(await fs.readFile(FILE, "utf8")) as Technician[];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code !== "ENOENT") throw err;
    await writeAll(seedTechnicians);
    return seedTechnicians;
  }
}

export async function writeAll(list: Technician[]) {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  const tmp = `${FILE}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(list, null, 2), "utf8");
  await fs.rename(tmp, FILE);
}

/** Technicians visible on the public site. Cached; the admin actions expire the tag after every change. */
export async function getTechnicians(): Promise<Technician[]> {
  "use cache";
  cacheTag(TECHNICIANS_TAG);
  return (await readAll()).filter((t) => t.active !== false);
}

/** Every technician including hidden ones, for the admin dashboard. Never cached. */
export async function getAllTechnicians(): Promise<Technician[]> {
  return readAll();
}
