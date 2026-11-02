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
