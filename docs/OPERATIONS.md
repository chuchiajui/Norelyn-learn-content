# Norelyn Learn Content — Proposed Owner Operations and Incident Handling

> 2026-10-28. This repository is a public content **skeleton**. No production runbook steps have been executed or automated from here.

## Before first publication
1. Check actual public repository selection in Learn server-only `LEARN_PUBLIC_CONTENT_REPO`. Its presence cannot be assumed because this repository happens to be named Learn Content.
2. Verify independent D1 migration/backups, owner `usr_*` allowlist, reviewed Learn branch, publisher/read flags and actual deployed SHA. Never re-run migration `0007` based on an old doc; inspect current database first.
3. Validate exact approved export. The public Markdown and manifest pair must have verified title/hash, source rights and no sensitive data.
4. In a **staging public repository** manually upload the exact pair, then invoke the reviewed owner-only verification flow in staging and confirm D1 published index, anonymous read and retries.
5. Run full rollback/takedown/reader-disabled behavior before shipping; keep a record of source SHA, commit and decision.

## Proposed publish procedure
- Owner exports the frozen approved Markdown/manifest in Learn.
- Owner verifies authorship/rights/redaction, then reviews GitHub diff and commits the two exact files to public `main`.
- Owner explicitly requests publication verification in Learn. No direct browser content path input is allowed.
- Server must prove exact bytes/manifest, D1 approval, `main` commit and publisher role; update published index and report actual result.
- Confirm public reader and discoverability only after D1 registration. A file visible on GitHub is **not** evidence it is authorized for the Learn public app.

## Failure handling
| Failure | Safe response |
| --- | --- |
| Missing manifest or wrong hash | Do not publish; regenerate from approved D1 export |
| Git main advanced | Reverify exact pair against current commit; no force push |
| Git commit succeeded but D1 registration failed | Leave invisible in public reader; use explicit owner retry/reconciliation |
| Review approval revoked | Stop publication; do not auto-resubmit stale snapshot |
| Private content accidentally committed | Disable public serving/index immediately, incident-escalate public Git history/cache exposure |
| Reader shows unpublished version | Treat as high-severity access-control/index regression, rollback independently of Git |
| License/attribution disputed | Suspend public serving; verify rights before any new commit |
| Stale SEO/AI cache | Invalidate article/revision/commit indexes and check tombstones |

## No false erasure
An unpublish, `git rm` or force push cannot erase Git clones, search caches or third-party copies. Be precise about exposure and mitigation. Keep incident evidence access controlled; do not repost confidential text or screenshots in a public issue.

## Current deployment state
No deployed workflow exists **in this repository**. The separate Learn app's API and Pages deployment state must be inspected directly, not copied from dated branch docs. This documentation-only PR does **not** change D1, publish flags, repo secrets or GitHub App credentials.

[Status](STATUS.md), [Privacy](SECURITY_AND_LICENSING.md), [Testing](DEVELOPMENT_AND_TESTING.md).
