# HAP protocol review

Reviewed 2026-11-02 against the v2.1 implementation.

The core idea makes sense: preserve creative decisions as structured evidence rather than infer authorship from a finished artifact. The strongest product is a portable process record. The current score and trust claims go further than the implementation can substantiate.

## Implemented in this revision

- Written works now have a Studio entry point, writing brief, original-text field, editorial notes, draft history, and final selection. The voice step is omitted for writing; an empty voice object preserves the existing record shape.
- `inputs.text` is supported by the API, exported schema, core types, SDK types, and scoring engine. Existing lyrics records remain supported.
- Record hashing recursively sorts object keys and includes nested content. The old JSON replacer could omit nested fields, including the material meant to be protected. Legacy anchors require explicit legacy verification; they cannot substantiate integrity of omitted fields. New and old hashes differ. No deployed records were migrated or re-anchored.
- Landing-page and Studio claims now distinguish self-reporting, integrity, and verification. Whitepaper implementation notes identify proposed capabilities and scoring limitations.

## Priorities for the next protocol version

1. **Replace authorship inference with evidence coverage.** HCS currently rewards field presence, text length, iteration count, and keeping an output. A script can fill those fields. Do not interpret it as a percentage of human authorship, originality, or ownership. Preserve old scores; introduce a named, versioned rubric and validate it against reviewed examples before making stronger claims.
2. **Make profiles genuinely domain-specific.** Writing still inherits a 5% vocal-identity weight and music-based recipe criteria. Its maximum without voice, BPM, or key is 0.89. A new rubric should mark non-applicable components explicitly and normalize relevant weights. Narrative voice and a licensed vocal identity must remain distinct.
3. **Bind decisions to artifacts.** Introduce source and final artifact hashes, parent draft hashes, passage-level revisions, declared tool/model usage, contributor roles, and evidence references. Keep self-declared timestamps distinct from independently attested receipt times.
4. **Version the trust model.** Store hash/canonicalization and scoring versions. Distinguish creator declarations, signed attestations, and independent review. The current recursively sorted JSON encoding is project-specific, not a claim of RFC 8785 conformance. Specify whether receipts are outside the hashed payload.
5. **Fix publication identity before production use.** The Studio now validates and publishes the exact generated snapshot through /api/v1/records/pin, preserving record ID, timestamps, scores, and source fields. Publication and anchor failures are visible, and reverted transactions no longer report success. Publication idempotency, authentication/rate limits for server-funded operations, and further chain verification remain outstanding.
6. **Protect unpublished writing.** Public pinning exposes the entire record. Support private evidence storage and selectively published commitments. IPFS availability requires ongoing hosting; a CID alone does not promise permanence or deletion.
7. **Align specification and implementation.** Serve versioned schemas from stable URLs, validate response records, and add conformance fixtures shared with the SDK. Dispute resolution, collaboration agreements, C2PA integration, identity checks, and marketplaces remain proposals. Legal assertions in the older whitepaper need a separate current expert review.

## Verification

Production build and TypeScript check pass. Regression tests cover nested-content hashing, key ordering, array ordering, and original-text scoring with legacy lyrics compatibility. The landing page was visually inspected in the local browser. No IPFS content was published and no blockchain transaction was submitted.

Full-repository lint reports existing errors in `ContributionScore.tsx` (render-time accumulator mutation) and `PromptFramework.tsx` (synchronous state updates in an effect). These legacy landing components are not rendered by the new homepage.


## Knowledge-led collaboration

The writing workflow now includes an optional `inputs.knowledge_context` extension, version 1.0. It captures domain expertise; original writing, datasets, lectures, knowledge bases, and training material; the creator’s relationship to each source; private references or digests; source-specific contributions; preparation work; AI methods; and human/AI roles.

This addresses the expert who co-writes with Claude using their own body of Cardology knowledge, rather than starting from general model output. It does not presume the model lacked all prior knowledge of the topic or that supplying a knowledge base necessarily changed model weights. Context, retrieval, custom instructions, and fine-tuning are recorded separately.

These dimensions are displayed ahead of the legacy score. HCS remains unchanged and does not classify this expanded contribution profile in the UI. The exported legacy tier remains for API compatibility and must not be treated as an assessment of knowledge contribution. A future score requires a versioned, validated methodology; counting sources or claiming expertise is not enough. Distinguish source provenance, preparation, domain judgment, and final expression without counting the same contribution several times.


## UI and consistency pass

Studio, all record stages, contribution results, whitepaper, copy controls, and the not-found page now share the landing page’s graphite/sage palette and editorial layout. The whitepaper and its Markdown export use the same content source.

The whitepaper now describes implemented behavior directly: no AI-remainder equation, no ownership-deed claim, no fictional operational dispute service, and no mismatched sample scores or mandatory anchor/identity fields. Its worked example and executable request cover expert co-writing with original sources. Proposed integrations and production requirements are labeled explicitly. The review concerns technical consistency; it is not a legal/compliance review.
