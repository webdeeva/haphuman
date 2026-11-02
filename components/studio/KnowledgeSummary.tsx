import type { HAPKnowledgeContext } from "@/lib/hap/types";

const methodLabels = {
  context: "Supplied context", retrieval: "Knowledge-base retrieval", instructions: "Custom instructions / curriculum",
  fine_tuning: "Model-weight training / fine-tuning", other: "Other method",
};
const relationshipLabels = {
  own_work: "Creator’s original work", licensed: "Licensed material", public_domain: "Public-domain material", third_party: "Third-party material",
};

export default function KnowledgeSummary({ context }: { context: HAPKnowledgeContext }) {
  return <section className="knowledge-summary space-y-5">
    <div><p className="text-xs text-slate-400 mb-2">Creator-declared contribution profile</p><h2 className="text-2xl">Knowledge-led collaboration</h2><p className="text-sm text-slate-400 mt-3 leading-relaxed">This record includes contributions made before and during co-writing. Read the source history and roles alongside the draft history; the legacy score does not assess these contributions.</p></div>
    <dl className="space-y-4">{([
      ["Domain expertise", context.domain_expertise], ["Preparation & teaching", context.preparation],
      ["Human contribution", context.human_role], ["AI system", context.ai_system], ["AI contribution", context.ai_role],
    ] as const).filter(([, value]) => value?.trim()).map(([label, value]) => <div key={label}><dt className="text-sm font-medium">{label}</dt><dd className="text-sm text-slate-300 mt-1 whitespace-pre-wrap break-words">{value}</dd></div>)}</dl>
    {context.ai_methods.length > 0 && <p className="text-sm text-slate-300">Methods: {context.ai_methods.map(method => methodLabels[method]).join(" · ")}</p>}
    {context.sources.length > 0 && <div><h3 className="text-sm font-medium mb-3">Source material</h3><ul className="space-y-4">{context.sources.map((source, index) => <li className="border-t border-slate-700 pt-3" key={index}><p className="font-medium break-words">{source.title}</p><p className="text-xs text-slate-400 mt-1">{source.kind.replaceAll("_", " ")} · {relationshipLabels[source.relationship]}</p>{source.contribution && <p className="text-sm text-slate-300 mt-2 whitespace-pre-wrap break-words">{source.contribution}</p>}{source.reference && <p className="text-xs text-slate-400 mt-2 break-all">Reference: {source.reference}</p>}</li>)}</ul></div>}
    <p className="text-xs text-slate-400">Source ownership, expertise, and roles are declared by the creator. No independent review has been performed.</p>
  </section>;
}
