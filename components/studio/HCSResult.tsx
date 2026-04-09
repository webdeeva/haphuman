"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, ExternalLink, Loader2, Shield, Zap } from "lucide-react";
import { tierLabel, tierColor } from "@/lib/hap/hcs";
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

const SEGMENT_COLORS: Record<string, string> = {
  recipe: "#06B6D4",
  inputs: "#10B981",
  voice: "#8B5CF6",
  iteration: "#F59E0B",
  curation: "#EC4899",
};

function MiniRing({ score }: { score: number }) {
  const size = 160;
  const stroke = 12;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const filled = circumference * score;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth={stroke} />
        <motion.circle
          cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke={tierColor(record.hcs_tier ?? "ai_generated")}
          strokeWidth={stroke} strokeLinecap="round"
          initial={{ strokeDasharray: `0 ${circumference}` }}
          animate={{ strokeDasharray: `${filled} ${circumference}` }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ filter: `drop-shadow(0 0 6px ${tierColor(record.hcs_tier ?? "ai_generated")}80)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="text-3xl font-bold font-mono gradient-text"
        >
          {Math.round(score * 100)}%
        </motion.div>
        <div className="text-[10px] font-mono text-slate-500 mt-0.5">HCS</div>
      </div>
    </div>
  );
}

// Need to declare record at module level for MiniRing
let record: HAPRecord;

export default function HCSResult({ record: r, onAnchor, onPin, pinning, anchoring, ipfsCid, txHash }: Props) {
  record = r;
  const [copied, setCopied] = useState(false);
  const json = JSON.stringify(r, null, 2);

  const copyJson = () => {
    navigator.clipboard.writeText(json);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tc = tierColor(r.hcs_tier);
  const tl = tierLabel(r.hcs_tier);

  return (
    <div className="space-y-6">
      {/* Score + tier */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-8"
        style={{ border: `1px solid ${tc}25` }}
      >
        <MiniRing score={r.contribution_score} />

        <div className="flex-1 w-full">
          <div className="text-xs font-mono mb-1" style={{ color: tc }}>{r.record_id}</div>
          <div className="text-xl font-bold text-white mb-1">{tl}</div>
          <div className="text-xs text-slate-500 font-mono mb-4">HCS {r.contribution_score.toFixed(2)} · Music Profile</div>

          {/* Component bars */}
          <div className="space-y-2">
            {Object.entries(r.hcs_components).map(([key, val]) => (
              <div key={key}>
                <div className="flex justify-between text-[11px] font-mono mb-0.5">
                  <span style={{ color: SEGMENT_COLORS[key] }}>{key}</span>
                  <span className="text-slate-600">{(val * 100).toFixed(0)}%</span>
                </div>
                <div className="h-1 rounded-full bg-slate-800">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${val * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="h-full rounded-full"
                    style={{ background: SEGMENT_COLORS[key] }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* IPFS + Anchor actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid sm:grid-cols-2 gap-4"
      >
        {/* IPFS */}
        <div className="glass rounded-2xl p-5" style={{ border: "1px solid rgba(16,185,129,0.2)" }}>
          <div className="flex items-center gap-2 mb-3">
            <Zap size={14} className="text-emerald-400" />
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">IPFS</span>
          </div>
          {ipfsCid ? (
            <div>
              <p className="text-[11px] font-mono text-slate-400 break-all mb-2">{ipfsCid}</p>
              <a
                href={`https://gateway.pinata.cloud/ipfs/${ipfsCid}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-300"
              >
                View on IPFS <ExternalLink size={11} />
              </a>
            </div>
          ) : (
            <div>
              <p className="text-xs text-slate-500 mb-3">Pin this record to IPFS for permanent storage.</p>
              <button
                onClick={onPin}
                disabled={pinning}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-mono font-bold transition-all disabled:opacity-60"
                style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.3)", color: "#10B981" }}
              >
                {pinning ? <><Loader2 size={12} className="animate-spin" /> Pinning...</> : "Pin to IPFS"}
              </button>
            </div>
          )}
        </div>

        {/* Guapcoin */}
        <div className="glass rounded-2xl p-5" style={{ border: "1px solid rgba(245,158,11,0.2)" }}>
          <div className="flex items-center gap-2 mb-3">
            <Shield size={14} className="text-amber-400" />
            <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">Guapcoin</span>
          </div>
          {txHash ? (
            <div>
              <p className="text-[11px] font-mono text-slate-400 break-all mb-1">{txHash}</p>
              <p className="text-[11px] font-mono text-emerald-400">Anchored on-chain</p>
            </div>
          ) : (
            <div>
              <p className="text-xs text-slate-500 mb-3">
                {ipfsCid ? "Anchor the IPFS CID on Guapcoin for immutable proof." : "Pin to IPFS first, then anchor on Guapcoin."}
              </p>
              <button
                onClick={onAnchor}
                disabled={anchoring || !ipfsCid}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-mono font-bold transition-all disabled:opacity-40"
                style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)", color: "#F59E0B" }}
              >
                {anchoring ? <><Loader2 size={12} className="animate-spin" /> Anchoring...</> : "Anchor to Guapcoin"}
              </button>
            </div>
          )}
        </div>
      </motion.div>

      {/* JSON record */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-2xl overflow-hidden"
        style={{ background: "rgba(4,8,18,0.95)", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800/50">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          </div>
          <span className="text-xs font-mono text-slate-600">{r.record_id}.json</span>
          <button
            onClick={copyJson}
            className="flex items-center gap-1.5 text-xs font-mono transition-colors"
            style={{ color: copied ? "#10B981" : "#64748b" }}
          >
            {copied ? <Check size={11} /> : <Copy size={11} />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <pre className="p-5 text-xs font-mono text-slate-300 overflow-auto max-h-72 leading-relaxed">
          {json}
        </pre>
      </motion.div>
    </div>
  );
}
