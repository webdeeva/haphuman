import test from 'node:test';
import assert from 'node:assert/strict';
import { recordDigest, canonicalRecordJSON } from '../lib/hap/hash.ts';
import { calculateHCS } from '../lib/hap/hcs.ts';

test('fingerprint includes nested drafts, edits, and permissions', () => {
  const record = { recipe: { style: 'Essay' }, inputs: { text: 'Original passage' }, iterations: [{ notes: 'Rewrote ending' }], voice: { voice_permissions: { licensed_uses: ['reading'] } } };
  for (const change of [r => r.inputs.text = 'Different passage', r => r.iterations[0].notes = 'Kept ending', r => r.voice.voice_permissions.licensed_uses[0] = 'broadcast', r => r.recipe.style = 'Poetry']) {
    const edited = structuredClone(record);
    change(edited);
    assert.notEqual(recordDigest(record), recordDigest(edited));
  }
});
test('fingerprint ignores object key order but preserves array order', () => {
  assert.equal(recordDigest({ b: { z: 2, a: 1 }, a: 0 }), recordDigest({ a: 0, b: { a: 1, z: 2 } }));
  assert.notEqual(recordDigest({ drafts: ['v1', 'v2'] }), recordDigest({ drafts: ['v2', 'v1'] }));
  assert.equal(canonicalRecordJSON({ absent: undefined, entries: [undefined] }), '{"entries":[null]}');
});
test('writing scores original text without a vocal identity, retaining legacy lyrics compatibility', () => {
  const record = { domain_profile: 'written_content', recipe: { style: 'Essay', structure: 'Three parts', tone: 'Personal', constraints: ['No invented quotations'] }, voice: { voice_id: '', voice_permissions: {} }, inputs: { text: 'A substantive original passage for the writing record.', note: 'Revised the argument and ending.', intent: 'Explain' }, iterations: [], curation: { decision: 'primary_keep' } };
  const result = calculateHCS(record);
  assert.equal(result.components.inputs, .4);
  assert.equal(result.components.voice, 0);
  assert.ok(result.score >= 0 && result.score <= 1);
  assert.deepEqual(calculateHCS({ ...record, inputs: { ...record.inputs, text: undefined, lyrics: record.inputs.text } }), result);
});

test('knowledge provenance is hash-protected without inflating the legacy score', async () => {
  const { readFile } = await import('node:fs/promises');
  const context = JSON.parse(await readFile(new URL('./fixtures/knowledge-context.json', import.meta.url), 'utf8'));
  const record = { domain_profile: 'written_content', recipe: { style: 'Nonfiction' }, voice: { voice_id: '', voice_permissions: {} }, inputs: { knowledge_context: context }, iterations: [], curation: { decision: 'primary_keep' } };
  assert.deepEqual(calculateHCS(record), calculateHCS({ ...record, inputs: {} }), 'Legacy score must not silently claim to quantify expertise');
  for (const change of [r => r.inputs.knowledge_context.sources[0].contribution = 'Changed source role', r => r.inputs.knowledge_context.ai_methods.push('fine_tuning'), r => r.inputs.knowledge_context.human_role = 'Different human contribution']) {
    const edited = structuredClone(record);
    change(edited);
    assert.notEqual(recordDigest(record), recordDigest(edited));
  }
});

test('publishing a validated snapshot preserves identity, timestamps, and nested evidence', async () => {
  const { recordSnapshotSchema } = await import('../lib/hap/validation.ts');
  const { pinRecord } = await import('../lib/hap/ipfs.ts');
  const record = {
    hap_version: '2.1', record_id: 'hap_record_20261102_aabbccdd', created_at: '2026-11-02T12:00:00.000Z', domain_profile: 'written_content',
    recipe: { recipe_id: 'hap_recipe_aabbccdd', style: 'Essay', structure: '', tone: '', constraints: [] },
    voice: { voice_id: '', voice_permissions: { licensed_uses: [], prohibited_uses: [], expiry: '', revocable: false } },
    inputs: { text: 'Original draft preserved exactly.' }, iterations: [],
    curation: { decision: 'primary_keep', timestamp: '2026-11-02T12:00:00.000Z', hcs_contribution: 0 },
  };
  const { score, tier, components } = calculateHCS(record);
  Object.assign(record, { hcs_components: components, contribution_score: score, hcs_tier: tier });
  record.curation.hcs_contribution = components.curation;
  const parsed = recordSnapshotSchema.parse(record);
  assert.equal(recordDigest(parsed), recordDigest(record));
  assert.equal(recordSnapshotSchema.safeParse({ ...record, record_id: 'invalid' }).success, false);
  const originalFetch = globalThis.fetch;
  const originalJWT = process.env.PINATA_JWT;
  let published;
  try {
    process.env.PINATA_JWT = 'local-test-only';
    globalThis.fetch = async (url, options) => {
      assert.equal(url, 'https://api.pinata.cloud/pinning/pinJSONToIPFS');
      published = JSON.parse(options.body).pinataContent;
      return new Response(JSON.stringify({ IpfsHash: 'bafy-local-mock' }), { status: 200 });
    };
    assert.equal(await pinRecord(parsed), 'bafy-local-mock');
    assert.deepEqual(published, record);
  } finally {
    globalThis.fetch = originalFetch;
    if (originalJWT === undefined) delete process.env.PINATA_JWT;
    else process.env.PINATA_JWT = originalJWT;
  }
});
