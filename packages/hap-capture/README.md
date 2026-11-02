# HAP Capture — developer preview

Manifest V3 browser extension, portable evidence format, and local Studio reviewer. No backend or model key required.

## Install

In Chrome or Edge's extension manager, enable developer mode, choose **Load unpacked**, and select `packages/hap-capture` from this repository. This is not a store-published extension. Only `activeTab`, `scripting`, and local `storage` permissions are requested; there are no host permissions or background scripts.

1. Open the extension and start a project.
2. Select text in a normal webpage (including Claude), then open the extension and choose **Read selected text**. It captures exactly the selection, not the full conversation, attachments, or hidden history. Alternatively enter source material or a decision manually.
3. Review the preview, label the checkpoint, choose its type, and link earlier checkpoint numbers. Save explicitly. Editing selected text changes its origin to creator declaration.
4. Export JSON and open it at `/studio/evidence`. Review occurs in memory; nothing is uploaded.
5. Export before deleting a project or uninstalling. One active project is supported; unsaved popup inputs are lost when the popup closes. Local extension storage and exports are unencrypted. The browser's storage quota applies.

The companion `skills/hap-evidence` folder is portable to assistants supporting SKILL.md and local Node execution. Copy the whole folder to `~/.codex/skills/hap-evidence` for Codex discovery. Other assistants can follow SKILL.md manually; this is not a hosted tool plugin or MCP server.

## Evidence format 0.1

Independent of HAP record v2.1 and the legacy HCS. Metadata seeds a SHA-256 chain. Every event includes its preceding digest, sequence, local capture time, type, declared capture origin, label, full text, reference and links to earlier events. Canonical encoding recursively sorts object keys and preserves array order; no Unicode normalization, not RFC 8785. Unknown fields are rejected. `head` identifies the latest event, null for empty history.

Checks detect inconsistent edits, reordering, invalid references and broken chains. A valid package can still be fabricated, rewritten, or truncated with its head recomputed. This preview has no signatures, identity verification, trusted receipt, encrypted vault, automatic session recorder, or proof of completeness. Browser selection does not establish who authored the text or spoke a message. Capture time is not the source creation date.

## Verify and develop

`node --test tests/evidence.test.mjs` (repository root).
`node skills/hap-evidence/scripts/hap.mjs verify /path/to/export.json`.

`packages/hap-capture/evidence.mjs` is the reference implementation. Keep the standalone skill copy in sync; the tests enforce parity. Later work: signed checkpoints with independent time receipts, encrypted multi-project storage, provider-specific capture adapters, and reviewer-approved source-to-output mappings. Do not claim these features are currently available.
