'use client';
import { useState } from 'react';
import { verifyBundle, type EvidenceBundle } from '@/packages/hap-capture/evidence.mjs';
export default function EvidenceReview() {
  const [bundle, setBundle] = useState<EvidenceBundle | null>(null);
  const [status, setStatus] = useState('Choose an exported JSON package, up to 8 MB.');
  const [busy, setBusy] = useState(false);
  return <section className="evidence-review hap-section">
    <label className="hap-button">Open evidence JSON<input aria-label="Open evidence JSON" type="file" accept=".json,application/json" disabled={busy} onChange={async event => {
      const file = event.target.files?.[0]; if (!file) return;
      setBusy(true); setBundle(null); setStatus('Checking package…');
      try { if (file.size > 8 * 1024 * 1024) throw Error('Choose a file smaller than 8 MB.'); const checked = await verifyBundle(JSON.parse(await file.text())); setBundle(checked); setStatus('Internal hashes and checkpoint links match. Identity, completeness, and timestamps are not verified.'); }
      catch (error) { setStatus(error instanceof Error ? error.message : 'Unable to read this package.'); }
      finally { setBusy(false); event.target.value = ''; }
    }} /></label>
    <p role="status" style={{ margin: '24px 0' }}>{status}</p>
    {bundle && <><h2>{bundle.title}</h2><p>{bundle.events.length} checkpoints · Local creation time: {bundle.created_at}</p><p>Anyone with the contents can rebuild this unsigned chain. Compare the head below with a separately retained receipt to detect replacement or truncation. No trusted receipt is included in this preview.</p><p className="evidence-hash">Package head: {bundle.head ?? 'Empty history'}</p><button className="hap-button" onClick={() => { setBundle(null); setStatus('Package cleared from this view.'); }}>Clear review</button>
    <ol className="capture-timeline">{bundle.events.map(event => <li key={event.sequence} id={`checkpoint-${event.sequence}`}><p className="hap-eyebrow">{event.sequence} / {event.kind} / {event.origin.replaceAll('_', ' ')}</p><h3>{event.label}</h3><p>Local checkpoint time: {event.captured_at}</p>{event.reference && <p>Reference: {event.reference}</p>}{event.links.length > 0 && <p>Related checkpoints: {event.links.map(n => <a key={n} href={`#checkpoint-${n}`} style={{ marginRight: 12 }}>#{n}</a>)}</p>}<details><summary>Read preserved text</summary><pre>{event.content}</pre></details><p className="evidence-hash">SHA-256: {event.hash}</p></li>)}</ol></>}
    <div className="hap-section"><h2>Capture while you work.</h2><p>The extension saves selected browser text on demand. The companion skill helps assistants preserve source material, drafts, decisions, and gaps in the same format.</p><p>Install instructions and source are in the repository under packages/hap-capture and skills/hap-evidence. This is a developer preview; no extension-store listing, background recorder, identity verification, or trusted timestamp service is included.</p></div>
  </section>;
}
