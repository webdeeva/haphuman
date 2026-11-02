import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, mkdtemp, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { createBundle, appendEvent, verifyBundle } from '../packages/hap-capture/evidence.mjs';
const input = { kind: 'source', origin: 'creator_declared', label: 'Lecture', content: 'Original lecture text.' };
test('source-to-final chain roundtrips; changes, reorder, metadata and truncation fail', async () => {
  let b = await appendEvent(createBundle('Book'), input);
  b = await appendEvent(b, { ...input, kind: 'final', links: [1] });
  await verifyBundle(JSON.parse(JSON.stringify(b)));
  for (const mutate of [x => x.events[0].content += 'changed', x => x.events.reverse(), x => x.title = 'Different title', x => x.events.pop(), x => x.events[1].links = [3], x => x.extra = true]) {
    const copy = structuredClone(b); mutate(copy); await assert.rejects(verifyBundle(copy));
  }
});
test('rejects unknown origin, empty sources, invalid links and excessive content', async () => {
  for (const change of [{ origin: 'verified' }, { content: '' }, { links: [1] }, { content: 'a'.repeat(200001) }]) await assert.rejects(appendEvent(createBundle('Test'), { ...input, ...change }));
});
test('standalone assistant implementation stays identical', async () => {
  assert.equal(await readFile('packages/hap-capture/evidence.mjs', 'utf8'), await readFile('skills/hap-evidence/scripts/evidence.mjs', 'utf8'));
});
test('skill CLI creates a valid package and refuses overwrite', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'hap-evidence-')); const file = join(dir, 'record.json');
  const cli = 'skills/hap-evidence/scripts/hap.mjs';
  execFileSync(process.execPath, [cli, 'init', file, 'My book']);
  await verifyBundle(JSON.parse(await readFile(file, 'utf8')));
  assert.throws(() => execFileSync(process.execPath, [cli, 'init', file, 'Overwrite'], { stdio: 'pipe' }));
  const checkpoint = join(dir, 'input.json');
  await writeFile(checkpoint, JSON.stringify({ ...input, origin: 'assistant_recorded' }));
  execFileSync(process.execPath, [cli, 'append', file, checkpoint]);
  const updated = await verifyBundle(JSON.parse(await readFile(`${file}.next.json`, 'utf8')));
  assert.equal(updated.events[0].origin, 'assistant_recorded');
  assert.equal(JSON.parse(await readFile(file, 'utf8')).events.length, 0);
  assert.match(execFileSync(process.execPath, [cli, 'verify', `${file}.next.json`], { encoding: 'utf8' }), /unverified/);
});
test('extension saves selection, downgrades edited text, and survives storage failure', async () => {
  const { runInNewContext } = await import('node:vm');
  const ids = ['title','start','project','kind','selection','label','content','reference','links','origin','save','export','delete','status'];
  const elements = Object.fromEntries(ids.map(id => [id, { value: '', textContent: '', addEventListener(type, handler) { this[type] = handler; } }]));
  let stored; let fail = false;
  const chrome = { storage: { local: {
    async get() { return { project: stored }; },
    async set(value) { if (fail) throw Error('Storage full'); stored = structuredClone(value.project); },
  } }, tabs: { async query() { return [{ id: 1 }]; } }, scripting: { async executeScript() { return [{ result: { text: 'Selected lecture text', url: 'https://claude.ai/chat/test' } }]; } } };
  const source = (await readFile('packages/hap-capture/popup.js', 'utf8')).split('\n').slice(1).join('\n');
  runInNewContext(source, { chrome, createBundle, appendEvent, verifyBundle, document: { getElementById: id => elements[id], querySelectorAll: () => [] } });
  elements.title.value = 'Example'; await elements.start.click();
  await elements.selection.click(); elements.label.value = 'Source'; elements.kind.value = 'source'; await elements.save.click();
  assert.equal(stored.events[0].origin, 'browser_selection');
  await elements.selection.click(); elements.content.value = 'Edited interpretation'; elements.content.input(); elements.label.value = 'Revision';
  await elements.save.click(); assert.equal(stored.events[1].origin, 'creator_declared');
  const original = structuredClone(stored); fail = true; elements.content.value = 'New note'; elements.label.value = 'Note';
  await elements.save.click(); assert.deepEqual(stored, original); assert.equal(elements.status.textContent, 'Storage full');
});
