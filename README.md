# HAP — Human Authorship Protocol

**haphuman.xyz**

> Proving Human Creativity in the Age of AI

The Human Authorship Protocol (HAP) is a framework for identifying, structuring, and verifying human creative contribution within AI-generated works.

## Core Premise

Authorship is not just the output. Authorship is the system behind the output.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion**
- **tsParticles**

## Pages

- `/` — Landing page with animated prompting framework demo
- `/whitepaper` — Full HAP whitepaper

## Run Locally

```bash
npm install
npm run dev
```

---

**Created by:** Aquarius Maximus — Founder of HAP  
**Co-produced with:** Claude (Anthropic)

© 2025 Human Authorship Protocol

### HAP Capture developer preview

Capture selected browser text and creative checkpoints locally, then inspect the exported package at `/studio/evidence`. See [extension setup and evidence limitations](packages/hap-capture/README.md). The [HAP evidence skill](skills/hap-evidence/SKILL.md) provides the same workflow for assistants with local Node execution. Capture evidence format 0.1 is separate from record v2.1 and does not use the legacy authorship score.

Run `node --test tests/evidence.test.mjs` for capture integrity, extension workflow, and assistant CLI checks.
