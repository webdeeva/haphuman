import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CopyForLLM from "@/components/CopyForLLM";

type Section = {
  id: string;
  number: string;
  title: string;
  color: string;
  content?: string;
  subsections?: { title: string; body: string; code?: string }[];
  table?: { headers: string[]; rows: string[][]; colors?: string[] };
  comparisonTable?: { headers: string[]; rows: string[][] };
  codeBlock?: string;
  codeLabel?: string;
  bullets?: string[];
  steps?: { number: string; title: string; body: string; code?: string }[];
  callout?: string;
  disclaimer?: string;
};

const sections: Section[] = [
  {
    "id": "implementation-status",
    "number": "00",
    "title": "Implementation status",
    "color": "#b7c9a5",
    "callout": "HAP records creative contributions and their context. A record is a declaration; verification requires evidence beyond the declaration itself.",
    "table": {
      "headers": [
        "Available in this prototype",
        "Not yet implemented"
      ],
      "rows": [
        [
          "Studio workflows for writing and music",
          "Independent identity or authorship verification"
        ],
        [
          "Original knowledge, source references, and human/AI roles",
          "Evidence review or expertise scoring"
        ],
        [
          "JSON records, a legacy HCS heuristic, and a schema endpoint",
          "Dispute resolution, collaboration splits, and marketplaces"
        ],
        [
          "Optional Pinata/IPFS publication and Guapcoin anchoring when configured",
          "Automatic source uploads, private evidence storage, or C2PA verification"
        ]
      ]
    },
    "content": "This document distinguishes current behavior from proposed infrastructure. Examples are illustrative. HAP does not generate the creative work itself; you document a process carried out with your own tools."
  },
  {
    "id": "abstract",
    "number": "01",
    "title": "Abstract",
    "color": "#b7c9a5",
    "content": "The Human Authorship Protocol is an open framework for recording the human contribution to AI-assisted work. It connects creative direction, original material, domain knowledge, preparation, revisions, and selection in a portable record.\n\nHuman contribution is not confined to the words typed during a generation session. A creator may bring years of original research, lectures, data, and writing to a collaboration. HAP preserves that foundation alongside the roles of the person and the AI."
  },
  {
    "id": "introduction",
    "number": "02",
    "title": "Introduction",
    "color": "#b7c9a5",
    "content": "The same AI tool can participate in very different creative processes. One person may ask for a generic draft. Another may build the underlying knowledge base, supply original interpretations, co-write the argument, and revise the result. The finished text alone does not describe that difference.\n\nHAP starts with a structured account of the process. It preserves information that a reader or reviewer can examine, while distinguishing what was declared from what was independently established."
  },
  {
    "id": "authorship-problem",
    "number": "03",
    "title": "The documentation gap",
    "color": "#b7c9a5",
    "subsections": [
      {
        "title": "Output and process",
        "body": "A final artifact can omit the source work, teaching material, choices, and judgment that shaped it. Records should describe those contributions without assuming that AI-assisted work necessarily involved little human effort."
      },
      {
        "title": "Evidence and declarations",
        "body": "Record who claims to have contributed what, the source references they supply, and the decisions they describe. Identity, source access, timestamps, and independent review are separate questions. A complete-looking form is not proof that its claims are true."
      }
    ]
  },
  {
    "id": "defining-authorship",
    "number": "04",
    "title": "What HAP documents",
    "color": "#b7c9a5",
    "callout": "The original knowledge, material, preparation, and creative decisions a person contributes before and during an AI-assisted process.",
    "content": "This is an operational description of what the record captures, not a legal definition of authorship. Source authorship, domain expertise, system preparation, and final expression are related but distinct contributions. HAP does not automatically turn any one of them into ownership of a finished work."
  },
  {
    "id": "core-components",
    "number": "05",
    "title": "The contribution record",
    "color": "#b7c9a5",
    "subsections": [
      {
        "title": "Creative brief — recipe",
        "body": "Record style or form, structure, tone, and constraints. Music may also specify tempo and key. A brief captures declared direction; it is not an automatically registered or licensed asset."
      },
      {
        "title": "Voice permissions — music",
        "body": "Record a vocal-model identifier and declared permitted/prohibited uses, expiry, and revocability. The Studio does not create, authenticate, or license a voice model. Narrative voice in writing belongs in the brief, not this vocal-identity field."
      },
      {
        "title": "Original inputs and knowledge",
        "body": "Use inputs.text for prose, poetry, or scripts, and inputs.lyrics for music. Notes and intent describe editorial direction and purpose. The optional inputs.knowledge_context extension captures prior work, sources, expertise, preparation, methods, and human/AI roles."
      },
      {
        "title": "Draft and version history",
        "body": "Log each version and the reasons you retained or rejected it. These notes are not an automatic edit log or an independently verified history. Timestamps supplied by a creator or assigned by the server are not proof of when the underlying work was made."
      },
      {
        "title": "Final selection",
        "body": "Record whether the work is being kept, archived, or discarded. An optional selected_cid can reference the final artifact. The Studio does not upload the artifact or enforce a unique selected draft."
      }
    ]
  },
  {
    "id": "knowledge-contribution",
    "number": "06",
    "title": "Knowledge-led collaboration",
    "color": "#b7c9a5",
    "content": "A Cardology expert who co-writes with Claude may contribute original interpretations, datasets, writings, lectures, and a knowledge base they prepared. The record should describe that foundation and how it shaped the work, alongside what Claude drafted or revised. It should not reduce the human role to prompting or counting edited sentences.",
    "subsections": [
      {
        "title": "Source provenance",
        "body": "For each source, record its title, type, your relationship to it, a reference or version, and its specific contribution. Source types include original writing, datasets, lectures, knowledge bases, and training material. Relationships distinguish your original work from licensed, public-domain, or other third-party material. These are declarations, not validated ownership claims."
      },
      {
        "title": "Preparation and teaching",
        "body": "Describe how you wrote, organized, annotated, or adapted material for the AI. Distinguish documents supplied as context, knowledge-base retrieval, custom instructions or curriculum, and actual fine-tuning of model weights. Several methods may apply; providing material alone does not establish that weights changed."
      },
      {
        "title": "Human and AI roles",
        "body": "Describe your original ideas, expertise, interpretation, co-writing, corrections, and final decisions. Separately identify the AI system and its drafting, organization, or revision role. This describes contributions without assigning an unsupported numerical ownership split."
      },
      {
        "title": "Private references",
        "body": "A private catalog reference or digest can document a source without including its contents. This prototype does not upload or verify the referenced source. If the record is later published, its references and descriptions are public too."
      },
      {
        "title": "Version and scoring",
        "body": "The extension uses inputs.knowledge_context.schema_version = 1.0 within a v2.1 record. The legacy HCS does not measure this extension. Studio foregrounds the contribution profile and identifies the score as a partial legacy view. It assigns no arbitrary bonus for expertise claims or source counts."
      }
    ]
  },
  {
    "id": "hcs",
    "number": "07",
    "title": "Human Contribution Score — legacy heuristic",
    "color": "#b7c9a5",
    "callout": "HCS is not a percentage of human authorship. 1 − HCS is not an estimate of AI contribution.",
    "content": "The implemented v2.1 engine multiplies field-presence values by domain weights, adds the components, and rounds the result to two decimal places. It does not assess the originality or truth of those fields. The API keeps legacy tier identifiers for compatibility; their names must not be treated as verified authorship classifications.",
    "subsections": [
      {
        "title": "What the engine actually counts",
        "body": "Recipe: populated style, structure, tone, BPM, key, and constraints. Inputs: text/lyrics length, note length, and presence of intent. Voice: identifier and permission fields. Iteration: number of versions, rejected versions, and notes. Curation: keep, archive, or discard. This rewards documentation patterns, not independently measured creative effort."
      },
      {
        "title": "What it misses",
        "body": "The heuristic does not measure original knowledge, source creation, domain expertise, preparation of a knowledge base, or the substantive contribution of co-writing. A sparse record can describe extensive human work, and a filled-out record can be fabricated. Scores should not be compared across domains."
      },
      {
        "title": "Next scoring revision — proposed",
        "body": "Separate documentation coverage, reviewed evidence, and contribution descriptions. Normalize only applicable fields, version the rubric, evaluate it against independently reviewed examples, and avoid double-counting a source across preparation, input, and final expression. Preserve existing scores rather than silently recalculating their meaning."
      }
    ]
  },
  {
    "id": "domain-profiles",
    "number": "08",
    "title": "Domain profiles and legacy tiers",
    "color": "#b7c9a5",
    "table": {
      "headers": [
        "Profile",
        "Recipe",
        "Inputs",
        "Voice",
        "Iteration",
        "Curation"
      ],
      "rows": [
        [
          "Music",
          "30%",
          "25%",
          "20%",
          "15%",
          "10%"
        ],
        [
          "Visual art",
          "35%",
          "20%",
          "5%",
          "25%",
          "15%"
        ],
        [
          "Written works",
          "25%",
          "40%",
          "5%",
          "20%",
          "10%"
        ]
      ]
    },
    "content": "Writing and music have dedicated Studio workflows. Visual art is currently an API profile. The inherited writing rubric still allocates weight to a vocal identity and rewards music-specific recipe fields. A writing record with no vocal identity, BPM, or key can reach at most 0.89 under this rubric. This limitation is explicit; it is not a judgment about the writer.",
    "subsections": [
      {
        "title": "Legacy tier mapping",
        "body": "0.80–1.00: primary_human_authorship; 0.50–0.79: collaborative_authorship; 0.20–0.49: ai_assisted_creation; below 0.20: ai_generated. These historical labels are returned by the API. For knowledge-context records, Studio instead foregrounds the declared contribution profile. No tier establishes human agency, originality, or ownership."
      }
    ]
  },
  {
    "id": "data-structure",
    "number": "09",
    "title": "Data structure",
    "color": "#b7c9a5",
    "content": "The example below is a creation request for POST /api/v1/records, not a fabricated receipt. The server adds record and recipe IDs, a creation timestamp, curation contribution, HCS components, score, and legacy tier. inputs is an object. Anchoring and owner_identity are optional. Original-text excerpts are optional when documenting a knowledge-led collaboration.",
    "codeLabel": "create-writing-record.json",
    "codeBlock": "{\n  \"domain_profile\": \"written_content\",\n  \"recipe\": {\n    \"style\": \"Nonfiction\",\n    \"structure\": \"Question, interpretation, examples\",\n    \"tone\": \"Reflective\"\n  },\n  \"voice\": {\n    \"voice_id\": \"\",\n    \"voice_permissions\": {\n      \"licensed_uses\": [],\n      \"prohibited_uses\": [],\n      \"expiry\": \"\",\n      \"revocable\": false\n    }\n  },\n  \"inputs\": {\n    \"knowledge_context\": {\n      \"schema_version\": \"1.0\",\n      \"domain_expertise\": \"Original Cardology interpretations and teaching material.\",\n      \"sources\": [\n        {\n          \"title\": \"Example original lecture series\",\n          \"kind\": \"lecture\",\n          \"relationship\": \"own_work\",\n          \"reference\": \"private-catalog:lectures-v2\",\n          \"contribution\": \"Concepts and examples used in the chapter.\"\n        }\n      ],\n      \"ai_methods\": [\n        \"context\",\n        \"instructions\"\n      ],\n      \"preparation\": \"Organized original lectures and writings into instructions.\",\n      \"ai_system\": \"Claude; model version unspecified\",\n      \"human_role\": \"Original framework, interpretation, co-writing, and final review.\",\n      \"ai_role\": \"Proposed structure and revised transitions under direction.\"\n    }\n  },\n  \"iterations\": [\n    {\n      \"version\": \"draft_1\",\n      \"selected\": true,\n      \"notes\": \"Retained the interpretation; rewrote the conclusion.\"\n    }\n  ],\n  \"curation\": {\n    \"decision\": \"primary_keep\"\n  },\n  \"pin_to_ipfs\": false\n}"
  },
  {
    "id": "blockchain",
    "number": "10",
    "title": "Publication and integrity",
    "color": "#b7c9a5",
    "content": "Generate and review the JSON record before choosing to publish. Pinning stores the full record on IPFS through Pinata when configured. Anchoring fetches that stored snapshot and submits its hash and CID to the configured Guapcoin contract. This repository does not implement additional chain backends.",
    "subsections": [
      {
        "title": "Publication sequence",
        "body": "1. Generate the record and copy it for your own records.\n2. Review every draft excerpt and source description.\n3. Pin the existing record to IPFS without recreating its identity or timestamps.\n4. Optionally anchor the stored record on the configured chain.\n5. Keep the publication CID and transaction receipt separately from the original snapshot."
      },
      {
        "title": "What the fingerprint covers",
        "body": "The current hash encoder recursively sorts object keys, preserves array order, and hashes the JSON snapshot with SHA-256. It includes nested source and role fields. This is a project-specific canonical encoding, not a claim of RFC 8785 conformance. Adding publication metadata to the snapshot changes its fingerprint."
      },
      {
        "title": "Legacy hash limitation",
        "body": "Earlier prototype hashing used a top-level key whitelist that could omit nested creative decisions. Those hashes do not protect omitted fields. Retain original bytes and identify the legacy hashing method when assessing old records. This revision does not migrate or re-anchor existing records."
      },
      {
        "title": "What an anchor does not establish",
        "body": "An anchor connects a submitted fingerprint and CID with a transaction. The current integration uses a service-controlled signing account; it does not verify the human creator’s wallet. A creator-provided identity string is not authenticated. The API receipt timestamp reflects server processing, not an independently verified creation date."
      },
      {
        "title": "Availability and confidentiality",
        "body": "IPFS publication is public and requires continued hosting for availability. Never assume a CID guarantees permanence or deletion. Private source storage, encryption, selective disclosure, signed creator attestations, authentication, and rate-limited anchoring remain production requirements."
      }
    ]
  },
  {
    "id": "ownership",
    "number": "11",
    "title": "Attribution and permissions",
    "color": "#b7c9a5",
    "content": "A HAP record documents claimed contributions and declared permissions. It is not a deed of ownership, a rights registry, or a license agreement. Source ownership, permission to use a source, permission to use a vocal identity, and claims about the finished work must remain distinguishable.",
    "subsections": [
      {
        "title": "Original sources",
        "body": "Document your relationship to each source and what it contributed. A source being your own work does not, by itself, establish every right in the resulting collaboration."
      },
      {
        "title": "Permissions",
        "body": "The prototype stores permission statements; it does not enforce them, revoke third-party copies, or verify that the person making a declaration can grant those permissions. Any actual agreement belongs outside this prototype and requires appropriate review."
      }
    ]
  },
  {
    "id": "monetization",
    "number": "12",
    "title": "Licensing and marketplaces — proposed",
    "color": "#b7c9a5",
    "content": "Structured contribution records could support discussions about attribution and licensing. This repository does not implement sales, licensing contracts, royalty distribution, revenue shares, or a marketplace. An HCS score must not be converted directly into a payment or ownership allocation."
  },
  {
    "id": "privacy",
    "number": "13",
    "title": "Privacy and source handling",
    "color": "#b7c9a5",
    "content": "Record creation returns JSON; the Studio holds the record in the current browser session. It does not provide an account archive or autosaved draft history. Copy the record before leaving or reloading. Optional publication exposes the record’s complete contents.",
    "subsections": [
      {
        "title": "Data minimization",
        "body": "Prefer source references and versions when full unpublished material is unnecessary. Do not put private credentials, sensitive personal details, or restricted source contents into a public record."
      },
      {
        "title": "Voice and source data",
        "body": "The Studio stores declared voice identifiers and permission metadata, not a generated or authenticated voice model. Secure storage, consent management, retention controls, and deletion workflows would need to be designed for any future source-hosting or voice-processing service. This document is not a compliance assessment."
      }
    ]
  },
  {
    "id": "implementation",
    "number": "14",
    "title": "Implementation and API",
    "color": "#b7c9a5",
    "table": {
      "headers": [
        "Route",
        "Current behavior"
      ],
      "rows": [
        [
          "POST /api/v1/records",
          "Validate inputs and return a new record; optional publication at creation."
        ],
        [
          "POST /api/v1/records/pin",
          "Validate and publish an existing record snapshot."
        ],
        [
          "GET /api/v1/records/[id]",
          "Fetch by IPFS CID. Direct record-ID lookup is not implemented."
        ],
        [
          "POST /api/v1/records/[id]/anchor",
          "Fetch by CID and submit an anchor through the configured service account."
        ],
        [
          "GET /api/v1/schemas",
          "Return the current authorship JSON Schema."
        ]
      ]
    },
    "content": "Studio uses the same creation API for music and writing. Music currently includes a voice-identifier step; writing omits that step and records an empty vocal-identity object. The SDK includes the optional knowledge-context types. Public deployment still needs authentication, abuse controls, and operational monitoring."
  },
  {
    "id": "disputes",
    "number": "15",
    "title": "Disputes and multi-party attribution — proposed",
    "color": "#b7c9a5",
    "content": "HAP does not currently operate a dispute service, resolver registry, similarity checker, arbitration workflow, or contributor split system. Earlier numerical similarity thresholds, deadlines, and token-stake ideas were unvalidated proposals, not product commitments.",
    "subsections": [
      {
        "title": "Evidence handling",
        "body": "A future system should preserve disputed claims and supporting evidence without treating an earlier timestamp or a higher score as decisive."
      },
      {
        "title": "Collaboration",
        "body": "Future multi-person records should identify each contributor, describe their work, and attach explicit agreements where appropriate. Commercial splits and contribution descriptions are distinct. The current human/AI role fields do not implement multi-party ownership or royalty distribution."
      }
    ]
  },
  {
    "id": "c2pa",
    "number": "16",
    "title": "Provenance integrations — proposed",
    "color": "#b7c9a5",
    "content": "Future work could connect HAP contribution records with signed media-provenance manifests, including C2PA integrations. This repository does not create or verify C2PA manifests. A linked manifest should be evaluated separately from the truth of the creative-contribution claims; no integration should convert a record into a deed of ownership."
  },
  {
    "id": "worked-example",
    "number": "17",
    "title": "Worked example — expert co-writing",
    "color": "#b7c9a5",
    "content": "Illustrative workflow: a Cardology expert uses original lectures, interpretations, and a prepared knowledge base while co-writing a chapter with Claude. This example does not claim what the model previously knew or that model weights were changed.",
    "steps": [
      {
        "number": "01",
        "title": "Describe the foundation",
        "body": "Identify your original sources and their versions. Explain the ideas, examples, or interpretations each source contributed. Use private references where full contents should not be public."
      },
      {
        "number": "02",
        "title": "Describe the preparation",
        "body": "Record the curriculum, annotations, instructions, or retrieval setup you created. Select actual fine-tuning only if model weights were updated."
      },
      {
        "number": "03",
        "title": "Describe the collaboration",
        "body": "Record the human’s domain judgment, original argument, writing, and review alongside the AI’s drafting or revision role. Retain draft decisions and reasons."
      },
      {
        "number": "04",
        "title": "Review the contribution profile",
        "body": "Studio presents the knowledge and source history ahead of the legacy HCS. The score does not quantify the expertise or original source work and does not define an AI remainder."
      },
      {
        "number": "05",
        "title": "Keep or publish the record",
        "body": "Copy the JSON for your records. If publishing, review every field first, then pin the snapshot and optionally anchor it. These are separate actions from generating the record."
      }
    ]
  },
  {
    "id": "schemas",
    "number": "18",
    "title": "Schema and compatibility",
    "color": "#b7c9a5",
    "content": "The implemented schema is served at /api/v1/schemas. It describes the authorship record and the optional knowledge-context extension. Separate dispute and collaboration schemas are not deployed services. Static /schemas/v2.1/ files are not currently served.",
    "subsections": [
      {
        "title": "Required and optional fields",
        "body": "The current published schema requires hap_version, record_id, domain_profile, recipe, voice, hcs_components, contribution_score, and hcs_tier. The record factory also supplies created_at, inputs, iterations, and curation. owner_identity, ipfs_cid, and onchain_anchor are optional; a generated record need not be publicly stored or anchored."
      },
      {
        "title": "Knowledge context",
        "body": "inputs.knowledge_context is optional. When present, it requires schema_version = 1.0, sources, and ai_methods. Source entries require title, kind, and relationship. Prior writing clients can continue using inputs.text or inputs.lyrics without this extension."
      },
      {
        "title": "Versioning",
        "body": "Keep hap_version and extension schema versions with exported records. The current scoring weights remain v2.1. Future revisions need explicit scoring and hash-encoding versions, reproducible fixtures, migration notes, and a policy for legacy verification. This is a remaining protocol design requirement."
      }
    ]
  },
  {
    "id": "limitations",
    "number": "19",
    "title": "Limitations",
    "color": "#b7c9a5",
    "callout": "Documentation, integrity, and independent verification are different layers.",
    "bullets": [
      "A creator declaration can be incomplete or false; identity and evidence review are not implemented.",
      "HCS measures field patterns and does not assess originality, effort, expertise, or ownership.",
      "Version notes are supplied by the creator; they are not an automatically captured edit history.",
      "Source references and digests are stored but not independently verified.",
      "An anchor does not authenticate the creator or prove when the underlying work was created.",
      "The prototype is not a legal service, a rights determination, or a production-ready dispute and licensing system."
    ]
  },
  {
    "id": "future",
    "number": "20",
    "title": "Next protocol revision",
    "color": "#b7c9a5",
    "bullets": [
      "Normalize domain-specific scoring and separate evidence coverage from reviewed contribution.",
      "Version the hash encoding and scoring rubric explicitly.",
      "Add artifact digests, parent-draft links, and signed creator attestations.",
      "Design private evidence storage and selective disclosure.",
      "Add authentication, rate limits, publication idempotency, and operational controls.",
      "Validate the schemas and SDK against shared conformance fixtures.",
      "Design independent review and multi-party attribution before introducing ownership or revenue features."
    ]
  },
  {
    "id": "conclusion",
    "number": "21",
    "title": "Conclusion",
    "color": "#b7c9a5",
    "callout": "Let the work carry its human story.",
    "content": "HAP’s value is in preserving a fuller account of creative work: the knowledge that preceded it, the system a person prepared, and the decisions made during collaboration. A clear record can support understanding and review without pretending that a single number settles authorship."
  },
  {
    "id": "disclaimer",
    "number": "22",
    "title": "Scope of this document",
    "color": "#b7c9a5",
    "disclaimer": "This is a technical description of a prototype and its proposed development. It is not legal, financial, or compliance advice. No record, score, permission field, or blockchain transaction establishes rights by itself. Legal and operational questions require separate, current review in the relevant context."
  }
];

export const metadata = {
  title: "Whitepaper — Human Authorship Protocol",
  description: "The HAP framework, implementation notes, knowledge provenance, and proposed protocol architecture.",
};

function CodeBlock({ code, label = "record.json" }: { code: string; label?: string }) {
  return <figure className="document-code"><figcaption>{label}</figcaption><pre tabIndex={0}><code>{code}</code></pre></figure>;
}

function DataTable({ table }: { table: { headers: string[]; rows: string[][] } }) {
  return <div className="document-table" role="region" aria-label={table.headers.join(", ")} tabIndex={0}><table><thead><tr>{table.headers.map(h => <th key={h} scope="col">{h}</th>)}</tr></thead><tbody>{table.rows.map((row, i) => <tr key={i}>{row.map((cell, j) => j === 0 ? <th scope="row" key={j}>{cell}</th> : <td key={j}>{cell}</td>)}</tr>)}</tbody></table></div>;
}

function SectionBlock({ section }: { section: Section }) {
  return <section className="document-section" id={section.id}>
    <header><span>{section.number}</span><h2>{section.title}</h2></header>
    {section.callout && <blockquote>{section.callout}</blockquote>}
    {section.content && <p>{section.content}</p>}
    {section.disclaimer && <p className="document-disclaimer">{section.disclaimer}</p>}
    {section.subsections?.map(sub => <div className="document-subsection" key={sub.title}><h3>{sub.title}</h3><p>{sub.body}</p>{sub.code && <CodeBlock code={sub.code} />}</div>)}
    {section.table && <DataTable table={section.table} />}
    {section.comparisonTable && <DataTable table={section.comparisonTable} />}
    {section.codeBlock && <CodeBlock code={section.codeBlock} label={section.codeLabel} />}
    {section.bullets && <ul>{section.bullets.map(b => <li key={b}>{b}</li>)}</ul>}
    {section.steps && <ol className="document-steps">{section.steps.map(step => <li key={step.number}><h3>{step.number}. {step.title}</h3><p>{step.body}</p>{step.code && <CodeBlock code={step.code} />}</li>)}</ol>}
  </section>;
}

// Export the same content the reader sees, including current implementation notes.
const fence = String.fromCharCode(96).repeat(3);
const markdownCode = (code?: string) => code ? `\n\n${fence}json\n${code}\n${fence}` : "";
const markdown = ["# Human Authorship Protocol\n\nWhitepaper v2.1 · Aquarius Maximus\n\nStatus: Prototype / proposal", ...sections.map(s => [
  `## ${s.title}`, s.callout, s.content, s.disclaimer,
  ...(s.subsections ?? []).map(sub => `### ${sub.title}\n\n${sub.body}${markdownCode(sub.code)}`),
  ...[s.table, s.comparisonTable].filter(t => t !== undefined).map(t => [t.headers.join(" | "), t.headers.map(() => "---").join(" | "), ...t.rows.map(row => row.join(" | "))].join("\n")),
  markdownCode(s.codeBlock),
  ...(s.bullets ?? []).map(b => `- ${b}`),
  ...(s.steps ?? []).map(step => `### ${step.number}. ${step.title}\n\n${step.body}${markdownCode(step.code)}`),
].filter(Boolean).join("\n\n"))].join("\n\n");

export default function WhitepaperPage() {
  return <div className="hap-surface"><a className="skip-link" href="#main">Skip to whitepaper</a><Navbar />
    <main id="main" className="hap-wrap">
      <header className="interior-heading document-heading"><Link className="hap-text-link" href="/">← Back to HAP</Link><p className="hap-eyebrow">The protocol / Whitepaper v2.1</p><h1>Human Authorship<br /><em>Protocol.</em></h1><p>A framework for documenting creative contribution, from original knowledge and source material to the decisions behind a finished work.</p><div className="document-meta"><span>By Aquarius Maximus</span><span>2026 / v2.1</span><span>Prototype & proposal</span></div><CopyForLLM content={markdown} /></header>
      <div className="document-layout"><nav className="document-toc" aria-label="Whitepaper contents"><p className="hap-eyebrow">In this document</p>{sections.map(section => <a key={section.id} href={`#${section.id}`}><span>{section.number}</span>{section.title}</a>)}</nav><article className="document-body">{sections.map(section => <SectionBlock key={section.id} section={section} />)}<div className="interior-bottom-links"><Link className="hap-button" href="/studio">Put it into practice ↗</Link><a className="hap-text-link" href="#main">Back to top ↑</a></div></article></div>
    </main><Footer />
  </div>;
}
