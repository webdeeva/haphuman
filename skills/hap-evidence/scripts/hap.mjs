#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';
import { createBundle, appendEvent, verifyBundle } from './evidence.mjs';
const [command, file, ...args] = process.argv.slice(2);
try {
  if (!file) throw Error('Usage: node hap.mjs init PACKAGE TITLE | append PACKAGE INPUT.json | verify PACKAGE');
  if (command === 'init') {
    await writeFile(file, JSON.stringify(createBundle(args.join(' ')), null, 2), { flag: 'wx', mode: 0o600 });
    console.log('Created local package. No trusted timestamp or signature.');
  } else {
    const bundle = await verifyBundle(JSON.parse(await readFile(file, 'utf8')));
    if (command === 'verify') console.log(`Internal integrity matches: ${bundle.events.length} checkpoints; head ${bundle.head}. Identity, timestamps, completeness and originality are unverified.`);
    else if (command === 'append') {
      const input = JSON.parse(await readFile(args[0], 'utf8'));
      if (!['assistant_recorded', 'imported', 'creator_declared'].includes(input.origin)) throw Error('CLI entries must be assistant_recorded, imported or creator_declared.');
      const next = await appendEvent(bundle, input);
      // Exclusive output preserves the previous package and prevents silent overwrite.
      const output = `${file}.next.json`;
      await writeFile(output, JSON.stringify(next, null, 2), { flag: 'wx', mode: 0o600 });
      console.log(`Saved ${output}; previous package preserved. Continue from this new file.`);
    } else throw Error('Unknown command. Use init, append, or verify.');
  }
} catch (error) { console.error(error.message); process.exitCode = 1; }
