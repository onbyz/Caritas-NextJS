import { spawn } from "node:child_process";
import path from "node:path";

const ROOT = process.cwd();
const DB_PATH = path.join(ROOT, "data", "legacy-db.sqlite3");
const SCRIPT = path.join(ROOT, "scripts", "insert-form-submission.py");

export type FormType =
  | "enquire"
  | "contact-us"
  | "home-care"
  | "book-consultation"
  | "international"
  | "health-package"
  | "nri-health-package"
  | "robotics"
  | "dbs"
  | "contact";

export async function insertFormSubmission(
  type: FormType,
  data: Record<string, string | number | boolean | null | undefined>,
): Promise<{ id: number } | null> {
  return new Promise((resolve) => {
    const proc = spawn("python3", [SCRIPT, type], {
      stdio: ["pipe", "pipe", "pipe"],
    });

    let stdout = "";
    let stderr = "";

    proc.stdout.on("data", (chunk: Buffer) => {
      stdout += chunk.toString();
    });
    proc.stderr.on("data", (chunk: Buffer) => {
      stderr += chunk.toString();
    });

    proc.on("close", (code) => {
      if (code !== 0) {
        console.error(`[forms] Failed to insert ${type}:`, stderr || stdout);
        resolve(null);
        return;
      }
      try {
        resolve(JSON.parse(stdout.trim()) as { id: number });
      } catch {
        console.error(`[forms] Invalid insert response for ${type}:`, stdout);
        resolve(null);
      }
    });

    proc.stdin.write(JSON.stringify({ ...data, db_path: DB_PATH }));
    proc.stdin.end();
  });
}
