import { createHash } from "node:crypto";

/** Recursively sort object keys, preserve array order, and retain JSON semantics.
 * Hash the exact record snapshot; adding storage/anchor metadata changes the hash.
 * This is a project-specific canonical encoding, not an RFC 8785 implementation.
 */
export function canonicalRecordJSON(value: unknown): string {
  const normalized = JSON.parse(JSON.stringify(value));
  function sort(item: unknown): unknown {
    if (Array.isArray(item)) return item.map(sort);
    if (item !== null && typeof item === "object") {
      return Object.fromEntries(Object.entries(item).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0).map(([key, val]) => [key, sort(val)]));
    }
    return item;
  }
  return JSON.stringify(sort(normalized));
}

export function recordDigest(value: unknown): string {
  return createHash("sha256").update(canonicalRecordJSON(value)).digest("hex");
}
