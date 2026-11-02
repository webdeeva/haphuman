"use client";

import { useState } from "react";
import KnowledgeSummary from "./KnowledgeSummary";
import { tierLabel } from "@/lib/hap/hcs";
import type { HAPRecord } from "@/lib/hap/types";

interface Props {
  record: HAPRecord;
  onAnchor: () => Promise<void>;
  onPin: () => Promise<void>;
  pinning: boolean;
  anchoring: boolean;
  ipfsCid?: string;
  txHash?: string;
}

export default function HCSResult({ record, onAnchor, onPin, pinning, anchoring, ipfsCid, txHash }: Props) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");
  const json = JSON.stringify(record, null, 2);
  async function copyJson() {
    try { await navigator.clipboard.writeText(json); setCopyStatus("copied"); }
    catch { setCopyStatus("error"); }
  }
  return <div className="record-result">
    <div className="record-identity"><span>RECORD / {record.hap_version}</span><code>{record.record_id}</code></div>
    {record.inputs.knowledge_context && <KnowledgeSummary context={record.inputs.knowledge_context} />}
    <section className="record-score" aria-labelledby="score-heading"><div><p className="hap-eyebrow">Documentation / Legacy HCS</p><div className="score-number">{record.contribution_score.toFixed(2)}<span>/ 1.00</span></div><h2 id="score-heading">{record.inputs.knowledge_context ? "A partial view of the process" : tierLabel(record.hcs_tier)}</h2><p>{record.domain_profile === "written_content" ? "Written works" : record.domain_profile === "music" ? "Music" : "Visual art"} profile</p></div><dl className="score-components">{Object.entries(record.hcs_components).map(([key, value]) => <div key={key}><dt>{key}</dt><dd>{value.toFixed(2)}<meter min={0} max={1} value={value} aria-label={`${key} weighted contribution`} /></dd></div>)}</dl><p className="score-context">HCS is a self-reported documentation heuristic, not a percentage of human authorship. It does not measure original knowledge, source material, or knowledge-base preparation. Legacy tier labels do not verify identity, originality, or ownership.</p></section>
    <section className="record-publication" aria-label="Optional publication"><article><p className="hap-eyebrow">01 / Public storage</p><h2>Publish to IPFS</h2>{ipfsCid ? <><code>{ipfsCid}</code><a className="hap-text-link" href={`https://gateway.pinata.cloud/ipfs/${ipfsCid}`} target="_blank" rel="noopener noreferrer">View published record ↗</a></> : <><p>Anyone with the CID can read the full record. Review your sources and drafts before publishing. Availability depends on continued hosting.</p><button className="hap-secondary" onClick={onPin} disabled={pinning}>{pinning ? "Publishing…" : "Pin to IPFS ↗"}</button></>}</article><article><p className="hap-eyebrow">02 / Integrity anchor</p><h2>Anchor to Guapcoin</h2>{txHash ? <><code>{txHash}</code><p role="status">Anchored on-chain.</p></> : <><p>{ipfsCid ? "Record a fingerprint of the published record in a blockchain transaction." : "Publish to IPFS first, then anchor the record. Anchoring requires the service to be configured."}</p><button className="hap-secondary" onClick={onAnchor} disabled={anchoring || !ipfsCid}>{anchoring ? "Anchoring…" : "Anchor record ↗"}</button></>}</article></section>
    <section className="record-json"><header><div><p className="hap-eyebrow">Your portable record</p><h2>Keep the full story.</h2></div><button className="hap-secondary" onClick={copyJson}>{copyStatus === "copied" ? "Copied ✓" : "Copy JSON ↗"}</button></header><p className="copy-feedback" role="status">{copyStatus === "error" ? "Clipboard unavailable. Select and copy the JSON below." : copyStatus === "copied" ? "Record copied to clipboard." : ""}</p><pre tabIndex={0} aria-label="Authorship record JSON"><code>{json}</code></pre></section>
  </div>;
}
