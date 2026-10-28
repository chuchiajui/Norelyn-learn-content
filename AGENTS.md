# Norelyn Learn Content — Maintainer and AI Contributor Rules

> 2026-10-28 · baseline: `docs/readme-foundation-20261028@7195d76804976de40b2a706c8878ef45fe126e44`. **This is a public, effectively empty repository.** Documentation-only contracts are proposals, not deployed behaviors.

## First checks
1. Read [Handoff](docs/HANDOFF.md), [Status](docs/STATUS.md), [Content contract](docs/CONTENT_CONTRACT.md), [Publication](docs/PUBLICATION_WORKFLOW.md), [Privacy](docs/SECURITY_AND_LICENSING.md).
2. Check exact GitHub refs before writing. `main@3f11c346d4057d29785a8e0f9150d3d1ce3b85a1` has only a one-line README. Draft PR #1 expands it but is not merged.
3. Cross-check technical expectations in **separate** `chuchiajui/Norelyn-learn` feature branch `feat/learn-content-contracts-20261024` and actual active Worker/D1 configuration. Never equate unmerged source with live capability.
4. Be explicit: **proposed**, **code in another repo**, **verified live**, **not implemented here** are different statuses.

## Public-repo rules
- Never commit private drafts, rejected/withdrawn items, author IDs, reviewer IDs, email, moderation comments, API tokens, user records, signed URLs, or unlicensed images. Public Git history is durable even after deleting a file.
- Do not write directly from a browser or treat a Git commit as permission to serve an article. The intended Learn owner-only V1 requires an **approved immutable D1 revision**, manually uploaded public files, exact Git SHA/hash verification and a D1 published index.
- Public content files must be derived from server-approved export, **not hand-invented IDs/paths**. The separate Learn source proposes `articles/art_<32hex>/rev_<32hex>.md` plus matching `.json` manifest.
- The manifest is an exact, minimal allowlist. Author/reviewer IDs, private comments or extra metadata are not approved for public emission.
- The separate Learn feature branch's D1-first flow **supersedes its older private GitHub submission repository plan**. Do not reintroduce the private-repo design or run legacy migration 0005 without a migration plan.
- A content repo is not a publication engine. No GitHub App, Worker cron, CI, R2, API, sanitizer, index, or Pages build is present here.
- Treat Markdown as untrusted text; never enable raw HTML/iframe or arbitrary URL rendering just because GitHub accepted it.
- Do not store private user data in search/vector/AI indexes; only approved published revisions may be indexed, and unpublish requires removal from serving/index projections.
- Never force-push/rewrite public content history as a purported privacy erasure; escalate to the owner with realistic retention limitations.

## Work practice
- Work on isolated branch and Draft PR; preserve pending Draft PR #1.
- For new content, require source-verified manifest pair, owner review, privacy/license signoff and an explicit publication grant **in Learn's own API**.
- No tests, publishing or automation may be claimed unless actually run at a recorded SHA. This repo currently has **no package scripts, tests or GitHub Actions**.
- Documentation changes must not insert sample 'approved' articles into public branches, modify Learn Worker/D1, create secret bindings, merge or deploy.
