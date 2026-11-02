export type EvidenceEvent = { sequence: number; captured_at: string; kind: string; origin: string; label: string; content: string; reference: string; links: number[]; previous: string; hash: string };
export type EvidenceBundle = { format: string; version: string; id: string; title: string; created_at: string; events: EvidenceEvent[]; head: string | null };
export const kinds: string[];
export const origins: string[];
export function canonical(value: unknown): string;
export function digest(value: unknown): Promise<string>;
export function createBundle(title: string): EvidenceBundle;
export function verifyBundle(bundle: unknown): Promise<EvidenceBundle>;
export function appendEvent(bundle: EvidenceBundle, input: {kind: string; origin: string; label: string; content: string; reference?: string; links?: number[]}): Promise<EvidenceBundle>;
