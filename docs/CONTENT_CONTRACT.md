# Norelyn Learn Content — Proposed Public File Contract

> **CONTRACT CANDIDATE, NOT IMPLEMENTED IN THIS REPO.** Based on the unmerged Learn source branch `feat/learn-content-contracts-20261024` at audit 2026-10-28. The public repository contains no `articles/` files yet.

## Exact future path convention
The separate Learn `apps/api/src/content/publication.ts` derives paths from an immutable approved submission:
- `articles/art_<32-lowercase-hex>/rev_<32-lowercase-hex>.md`
- `articles/art_<32-lowercase-hex>/rev_<32-lowercase-hex>.json`

The `articleId` derives from server-generated `sub_<32hex>`; `revisionId` is based on the approved SHA-256 digest. User-supplied title, slug, path, author email or browser-selected revision **must never** choose Git paths.

Markdown is the frozen, approved `bodyMarkdown` bytes; preserve exact encoding and bytes from trusted export (no editor reformatting, CRLF conversion, manual replacement or markdown frontmatter addition). Any byte change invalidates hash matching against the D1 approved snapshot.

## Exact public manifest v1 (from Learn source)
The proposed manifest's **exact keys**, no extras:
| Field | Public meaning |
| --- | --- |
| `schemaVersion: 1` | Version of public publication manifest |
| `articleId` | Stable server-derived `art_*` |
| `revisionId` | Immutable `rev_*` |
| `sourceSubmissionId` | Server-generated submission identifier, not a user ID |
| `sourceContentRevision` | Frozen approved content revision number |
| `sourceContentHash` | SHA-256 of canonical serialized approved content object |
| `title` / `summary` | Approved public editorial fields |
| `categoryId` | Normalized category key or null |
| `tags` | Approved public labels |
| `youtubeVideoIds` | Validated canonical 11-character video IDs |
| `approvedAt` | Review approval time without reviewer identity |

**Do not add** `authorUserId`, `reviewerUserId`, reviewer notes, moderation status history, storage locations, emails, payment data or user tokens. Publication-side verification uses byte-identical Markdown and exact manifest structure; arbitrary extra fields cause rejection. Even `sourceSubmissionId` can enable public correlation, so treat retention as an explicit contract decision.

## Distinct kinds of hashes
- `sourceContentHash` is SHA-256 of `JSON.stringify(content)`, **not** automatically SHA-256 of Markdown alone.
- `revisionId` uses the first 32 hex characters of that digest.
- Git commit SHA identifies the public snapshot including both files, **not** the content digest.
- D1 `learn_publication_index` is the serving allowlist and pins the selected revision/commit; merely committing files does not make them authorized for public reader use.

## Draft input versus public artifact
Learn's draft validator allows `title` (1–200 chars), `summary` (up to 1200 chars), `bodyMarkdown` (up to 100,000 chars), optional category, up to 12 tags and up to 8 validated YouTube URLs. This is an **API-side** contract, not an import parser present here. The API normalizes YouTube URLs to IDs and strips client ownership/status control.

Never hand-generate a manifest in this public repo before testing the current Learn export/verify implementation. The exact schema and signing/authorization must be versioned together with the actual Learn consumer.

[Publication](PUBLICATION_WORKFLOW.md), [Security](SECURITY_AND_LICENSING.md), [Status](STATUS.md).
