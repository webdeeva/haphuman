// Run against a local dev server: node tests/knowledge-api.mjs
// Record creation only; this test never requests publication or anchoring.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const context = JSON.parse(await readFile(new URL('./fixtures/knowledge-context.json', import.meta.url), 'utf8'));
const base = 'http://localhost:3000';
const request = {
  domain_profile: 'written_content',
  recipe: { style: 'Nonfiction' },
  voice: { voice_id: '', voice_permissions: { licensed_uses: [], prohibited_uses: [], expiry: '', revocable: false } },
  inputs: { knowledge_context: context },
  pin_to_ipfs: false,
};
const post = body => fetch(`${base}/api/v1/records`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
const response = await post(request);
assert.equal(response.status, 201);
const { record } = await response.json();
assert.deepEqual(record.inputs.knowledge_context, context);
assert.equal(record.inputs.text, undefined, 'Expertise records do not require an original-text excerpt');
for (const patch of [{ schema_version: 'unsupported' }, { ai_methods: ['unknown_method'] }, { sources: [{ ...context.sources[0], title: ' ' }] }]) {
  const invalid = await post({ ...request, inputs: { knowledge_context: { ...context, ...patch } } });
  assert.equal(invalid.status, 400);
}
const legacy = await post({ ...request, inputs: { text: 'An original passage from a legacy writing client.' } });
assert.equal(legacy.status, 201);
const schema = await (await fetch(`${base}/api/v1/schemas`)).json();
assert.equal(schema.properties.inputs.properties.knowledge_context.properties.schema_version.const, '1.0');
console.log('PASS: provenance round trip, excerpt optional, schema version and methods validated, blank source rejected, legacy compatibility, schema endpoint');
