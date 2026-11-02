"use client";
import { useState } from "react";

export default function CopyForLLM({ content }: { content: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  async function copy() {
    try { await navigator.clipboard.writeText(content); setStatus("copied"); }
    catch { setStatus("error"); }
  }
  return <div className="document-copy"><button type="button" className="hap-secondary" onClick={copy}>{status === "copied" ? "Copied ✓" : "Copy for LLMs ↗"}</button><span role="status">{status === "error" ? "Clipboard unavailable. Select and copy the text below." : status === "copied" ? "Full whitepaper copied as Markdown." : ""}</span></div>;
}
