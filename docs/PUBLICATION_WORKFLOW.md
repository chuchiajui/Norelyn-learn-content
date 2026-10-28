# Norelyn Learn Content — Proposed D1-first Owner Publication Workflow

> **DESIGN/INTEGRATION REFERENCE ONLY**. This public content repo does not contain a publisher, upload endpoint or workflow. Source grounding: separate Learn `feat/learn-content-contracts-20261024`, Draft PR #25 documents dated 2026-10-25. Live environment state is not independently confirmed in this documentation pass.

## Responsibility split
1. **Authenticated author in Learn** creates/edits a private D1 submission; no unreviewed markdown enters public Git.
2. **Reviewer/admin in Learn** checks the frozen revision and approves. Approval ≠ publication.
3. **Single authorized publisher/owner** exports both approved public-safe files from Learn via server-checked admin flow.
4. **Owner manually uploads** the exact `.md` and `.json` pair to the designated public content repo's `main`. Do not supply Git write tokens to the browser.
5. **Owner explicitly triggers verification and publication** in Learn. The API independently reads the public repo's current main SHA, fetches both exact files, validates frozen D1 approved hash and manifest, and commits a CAS-protected published index record.
6. **Public reader** serves only a D1-allowlisted published article/revision pinned to a verified commit, rendered with conservative Markdown sanitization. A public Git commit alone is not a published article.

## States and human controls
The Learn content model has draft, in_review, changes_requested, rejected, approved, publishing, published, withdrawn, unpublished. Only approved frozen revisions are eligible for owner publication; resubmission creates new review revision. Unpublishing hides the article from public serving/indexing even if Git history still exists.

API verifies `LEARN_PUBLISHER_USER_ID` is exactly one canonical `usr_*` and also a permitted admin. `LEARN_PUBLIC_PUBLISH_ENABLED` and `LEARN_PUBLIC_READ_ENABLED` are server-side gates. This docs repo may not infer whether they are configured or enabled.

## Conflicts and idempotence
- Partial pair, changed Markdown, extra manifest keys, incorrect hash, wrong revision or unapproved review must fail without public visibility.
- Competing Git main changes require revisiting SHA and revalidating exact pair; no force push.
- If the Git pair exists but D1 publication index write fails, keep it unpublished and repeat the owner-controlled registration/recovery flow; do not guess whether previous attempt succeeded.
- Unpublish must disable D1 serving and derived search/AI discoverability; don't promise public Git clones or crawlers are erased.
- Avoid reviving an unpublished record on background reconciliation. Public read should rely on exact version/commit allowlist, not just file presence.

## Migration warning
Early Learn content design mentioned a private GitHub submission repo and GitHub App automated publication. The later **D1-first manual owner** path supersedes it; don't automatically configure the older repo, GitHub App or migration `0005`. Verify the current accepted Learn code/production status before applying any step.

## Staging release gate
Prove author isolation, reviewer decision, owner-only publish, content equality, tampering rejection, main branch race, retry, D1 index, anonymous reader, unpublished filtering, feature flags and rollback in an isolated test account/content repo **before** using this public repository.

[File contract](CONTENT_CONTRACT.md), [Sync/index](SYNC_AND_INDEXING.md), [Operations](OPERATIONS.md).
