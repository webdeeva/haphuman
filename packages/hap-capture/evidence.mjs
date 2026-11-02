/** HAP Evidence 0.1. Local integrity checks, not identity or trusted time. */
export const kinds = ['source', 'exchange', 'draft', 'decision', 'final', 'gap'];
export const origins = ['creator_declared', 'browser_selection', 'imported', 'assistant_recorded'];
export function canonical(value) {
  if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`;
  if (value && typeof value === 'object') return `{${Object.keys(value).sort().map(k => `${JSON.stringify(k)}:${canonical(value[k])}`).join(',')}}`;
  return JSON.stringify(value);
}
export async function digest(value) {
  return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(canonical(value)))), b => b.toString(16).padStart(2, '0')).join('');
}
export function createBundle(title) {
  if (typeof title !== 'string' || !title.trim() || title.length > 300) throw Error('Give the project a title (up to 300 characters).');
  return { format: 'hap-evidence', version: '0.1', id: crypto.randomUUID(), title: title.trim(), created_at: new Date().toISOString(), events: [], head: null };
}
function fields(value, keys) {
  if (!value || typeof value !== 'object' || Array.isArray(value) || Object.keys(value).sort().join() !== [...keys].sort().join()) throw Error('Unsupported or missing evidence fields.');
}
function validText(s, max, required = false) { return typeof s === 'string' && s.length <= max && (!required || !!s.trim()); }
export async function verifyBundle(bundle) {
  fields(bundle, ['format', 'version', 'id', 'title', 'created_at', 'events', 'head']);
  if (bundle.format !== 'hap-evidence' || bundle.version !== '0.1' || !validText(bundle.id, 100, true) || !validText(bundle.title, 300, true) || !validText(bundle.created_at, 40, true) || !Number.isFinite(Date.parse(bundle.created_at)) || !Array.isArray(bundle.events) || bundle.events.length > 500) throw Error('Invalid or unsupported evidence package.');
  let previous = await digest({ format: bundle.format, version: bundle.version, id: bundle.id, title: bundle.title, created_at: bundle.created_at });
  for (const [index, event] of bundle.events.entries()) {
    fields(event, ['sequence', 'captured_at', 'kind', 'origin', 'label', 'content', 'reference', 'links', 'previous', 'hash']);
    if (event.sequence !== index + 1 || !kinds.includes(event.kind) || !origins.includes(event.origin) || !validText(event.captured_at, 40, true) || !Number.isFinite(Date.parse(event.captured_at)) || !validText(event.label, 300, true) || !validText(event.content, 200000, true) || !validText(event.reference, 2000) || !Array.isArray(event.links) || event.links.some(n => !Number.isInteger(n) || n < 1 || n > index) || event.previous !== previous) throw Error(`Invalid event or broken chain at checkpoint ${index + 1}.`);
    const { hash, ...payload } = event;
    if (hash !== await digest(payload)) throw Error(`Content changed at checkpoint ${index + 1}.`);
    previous = hash;
  }
  if (bundle.head !== (bundle.events.length ? previous : null)) throw Error('Package head does not match its history.');
  return bundle;
}
export async function appendEvent(bundle, input) {
  await verifyBundle(bundle);
  const previous = bundle.head ?? await digest({ format: bundle.format, version: bundle.version, id: bundle.id, title: bundle.title, created_at: bundle.created_at });
  const event = { sequence: bundle.events.length + 1, captured_at: new Date().toISOString(), kind: input.kind, origin: input.origin, label: input.label, content: input.content, reference: input.reference ?? '', links: input.links ?? [], previous };
  const hash = await digest(event);
  const next = { ...bundle, events: [...bundle.events, { ...event, hash }], head: hash };
  if (new TextEncoder().encode(JSON.stringify(next)).byteLength > 8 * 1024 * 1024) throw Error("Package exceeds 8 MB. Start another project after exporting this one.");
  await verifyBundle(next);
  return next;
}
