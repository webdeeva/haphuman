import { createBundle, appendEvent, verifyBundle } from './evidence.mjs';
const $ = id => document.getElementById(id);
let origin = 'creator_declared';
let selectedText = null;
async function current() { return (await chrome.storage.local.get('project')).project; }
async function refresh() { const p = await current(); $('project').textContent = p ? `${p.title} · ${p.events.length} checkpoints` : 'No active project'; }
function action(id, fn) {
  $(id).addEventListener('click', async () => {
    const buttons = [...document.querySelectorAll('button')]; buttons.forEach(b => b.disabled = true);
    try { await fn(); await refresh(); } catch (e) { $('status').textContent = e.message; }
    finally { buttons.forEach(b => b.disabled = false); }
  });
}
action('start', async () => {
  if (await current()) throw Error('Export and delete the current project before starting another.');
  await chrome.storage.local.set({ project: createBundle($('title').value) }); $('status').textContent = 'Project started. Nothing is captured automatically.';
});
action('selection', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const [result] = await chrome.scripting.executeScript({ target: { tabId: tab.id }, func: () => ({ text: window.getSelection()?.toString() || '', url: location.origin + location.pathname }) });
  if (!result?.result?.text?.trim()) throw Error('Select the passage on the page first, then open HAP Capture again. Restricted browser pages cannot be captured.');
  if (result.result.text.length > 200000) throw Error('Select a smaller passage (maximum 200,000 characters).');
  selectedText = result.result.text; $('content').value = selectedText; $('reference').value = result.result.url; origin = 'browser_selection'; $('origin').textContent = 'Evidence origin: selected browser text (speaker and authorship unverified)'; $('status').textContent = 'Review the text and reference, then save. Only this selection will be preserved.';
});
$('content').addEventListener('input', () => { if ($('content').value !== selectedText) { origin = 'creator_declared'; $('origin').textContent = 'Evidence origin: creator declaration (edited or entered text)'; } });
action('save', async () => {
  const p = await current(); if (!p) throw Error('Start a project first.');
  const links = $('links').value.trim() ? $('links').value.split(',').map(s => Number(s.trim())) : [];
  const next = await appendEvent(p, { kind: $('kind').value, origin, label: $('label').value, content: $('content').value, reference: $('reference').value, links });
  await chrome.storage.local.set({ project: next }); $('status').textContent = `Saved checkpoint ${next.events.length}.`; $('content').value = ''; $('label').value = ''; $('reference').value = ''; $('links').value = ''; origin = 'creator_declared'; selectedText = null; $('origin').textContent = 'Evidence origin: creator declaration';
});
action('export', async () => {
  const p = await verifyBundle(await current()); const url = URL.createObjectURL(new Blob([JSON.stringify(p, null, 2)], { type: 'application/json' })); const a = document.createElement('a'); a.href = url; a.download = `hap-${p.id}.json`; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); $('status').textContent = 'Export requested. Import the JSON in Studio → Review evidence.';
});
action('delete', async () => { if (confirm('Delete this local project? Export first to keep a copy.')) { await chrome.storage.local.remove('project'); $('status').textContent = 'Local project deleted.'; } });
refresh().catch(e => $('status').textContent = e.message);
