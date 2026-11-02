"use client";

import type { HAPKnowledgeContext, HAPKnowledgeSource } from "@/lib/hap/types";

const inputClass = "w-full rounded-sm border border-slate-600 bg-slate-950 px-4 py-3 text-sm text-white";
const sourceKinds: [HAPKnowledgeSource["kind"], string][] = [
  ["original_writing", "Original writing"], ["dataset", "Dataset"], ["lecture", "Lecture / transcript"],
  ["knowledge_base", "Knowledge base"], ["training_material", "Training / instruction material"], ["other", "Other"],
];
const methods: [HAPKnowledgeContext["ai_methods"][number], string][] = [
  ["context", "Provided documents or conversation context"],
  ["retrieval", "Retrieved from a knowledge base (RAG)"],
  ["instructions", "Custom instructions, examples, or curriculum"],
  ["fine_tuning", "Fine-tuned or trained model weights"],
  ["other", "Other / describe below"],
];

export default function KnowledgeContextFields({ value, onChange }: {
  value?: HAPKnowledgeContext;
  onChange: (value: HAPKnowledgeContext) => void;
}) {
  const context: HAPKnowledgeContext = value ?? { schema_version: "1.0", sources: [], ai_methods: [] };
  const update = (patch: Partial<HAPKnowledgeContext>) => onChange({ ...context, ...patch });
  const updateSource = (index: number, patch: Partial<HAPKnowledgeSource>) =>
    update({ sources: context.sources.map((source, i) => i === index ? { ...source, ...patch } : source) });

  return <fieldset className="space-y-6 border-t border-slate-700 pt-7">
    <legend className="text-lg pt-7">Knowledge & source contribution</legend>
    <p className="text-sm text-slate-400 leading-relaxed">Your contribution can begin years before the draft. Record your original research, data, lectures, and the knowledge you bring to the collaboration. You can cite a private reference without uploading its contents.</p>
    <label className="block space-y-2"><span>Domain expertise & original knowledge</span><textarea className={inputClass} rows={3} value={context.domain_expertise ?? ""} onChange={e => update({ domain_expertise: e.target.value })} placeholder="Describe your field, original framework, research, or interpretive method and how it informed this work." /></label>
    {context.sources.map((source, index) => <fieldset className="space-y-4 border border-slate-700 rounded-sm p-4" key={index}>
      <legend className="px-2 text-sm">Source {index + 1}</legend>
      <label className="block space-y-2"><span>Source title *</span><input className={inputClass} value={source.title} onChange={e => updateSource(index, { title: e.target.value })} placeholder="Original lecture series / research dataset / manuscript" /></label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-2"><span>Source type</span><select className={inputClass} value={source.kind} onChange={e => updateSource(index, { kind: e.target.value as HAPKnowledgeSource["kind"] })}>{sourceKinds.map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></label>
        <label className="block space-y-2"><span>Your relationship to it</span><select className={inputClass} value={source.relationship} onChange={e => updateSource(index, { relationship: e.target.value as HAPKnowledgeSource["relationship"] })}><option value="own_work">My original work</option><option value="licensed">Licensed material</option><option value="public_domain">Public-domain material</option><option value="third_party">Other third-party material</option></select></label>
      </div>
      <label className="block space-y-2"><span>Reference / version / digest (optional)</span><input className={inputClass} value={source.reference ?? ""} onChange={e => updateSource(index, { reference: e.target.value })} placeholder="Private catalog ID, version, URL, or SHA-256 digest" /></label>
      <label className="block space-y-2"><span>What this source contributed</span><textarea className={inputClass} rows={2} value={source.contribution ?? ""} onChange={e => updateSource(index, { contribution: e.target.value })} placeholder="Which ideas, examples, interpretations, data, or passages shaped this work?" /></label>
      <button type="button" className="text-sm text-slate-300 underline underline-offset-4" onClick={() => update({ sources: context.sources.filter((_, i) => i !== index) })}>Remove source {index + 1}</button>
    </fieldset>)}
    <button type="button" className="border border-slate-500 rounded-sm px-4 py-2 text-sm" onClick={() => update({ sources: [...context.sources, { title: "", kind: "original_writing", relationship: "own_work" }] })}>+ Add source material</button>
    <fieldset className="space-y-3"><legend className="mb-3">How the AI used your material</legend>{methods.map(([key, label]) => <label key={key} className="flex items-start gap-3 text-sm"><input className="mt-1" type="checkbox" checked={context.ai_methods.includes(key)} onChange={e => update({ ai_methods: e.target.checked ? [...context.ai_methods, key] : context.ai_methods.filter(method => method !== key) })} /><span>{label}</span></label>)}<p className="text-xs text-slate-400">Documents, retrieval, and instructions can guide a model without changing its weights. Select fine-tuning only if that happened; you can record several methods.</p></fieldset>
    {([
      ["preparation", "Preparation & teaching work", "Describe how you wrote, organized, annotated, or adapted your material for the AI."],
      ["ai_system", "AI collaborator / system", "For example: Claude; include a model or project version if known."],
      ["human_role", "Your role in the resulting work", "Domain knowledge, original argument, interpretations, source selection, co-writing, corrections, final approval…"],
      ["ai_role", "The AI’s role in the resulting work", "Describe what the AI drafted, proposed, organized, or revised, and where you directed or corrected it."],
    ] as const).map(([key, label, placeholder]) => <label className="block space-y-2" key={key}><span>{label}</span><textarea className={inputClass} rows={key === "ai_system" ? 2 : 3} value={context[key] ?? ""} onChange={e => update({ [key]: e.target.value })} placeholder={placeholder} /></label>)}
    <p className="text-xs text-slate-400">These contributions are preserved in the record and displayed separately. The legacy HCS does not measure expertise, source originality, or the work of preparing a knowledge base.</p>
  </fieldset>;
}
