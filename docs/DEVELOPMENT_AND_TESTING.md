# Norelyn Learn Content — Current Development and Proposed Validation

> Source inventory 2026-10-28. **This repository has no package.json, Cargo workspace, test runner, build script or GitHub Actions.** Commands and test matrices for the separate Learn app must run in the *Learn* repo, not here.

## Current safe workflow
~~~bash
git clone https://github.com/chuchiajui/Norelyn-learn-content.git
cd Norelyn-learn-content
git status
git branch -a
git log --oneline -5
~~~

A checkout of main currently contains only one-line `README.md`. The unmerged Draft PR #1 supplies the fuller README. This docs PR adds policies only; there are **no real article fixtures** to validate.

## For future content validation (NOT IMPLEMENTED)
- File path exactly matches `articles/art_<32hex>/rev_<32hex>.md` and `.json`; each public pair complete.
- Manifest only contains allowed keys with types, approved hash and revision consistent with Learn server export.
- Markdown bytes match approved D1 frozen revision. Do not normalize line endings after export.
- Source provenance, copyright/attribution, sensitive data, image/video URL policy pass human review.
- No executable HTML, unsafe URI, embedded scripts or private identity leaks.
- Reject malformed, oversized, duplicate, conflicting, unapproved, future-version and partially uploaded content.
- Prove idempotent manual upload and explicit owner publication index registration.
- Test cross-account isolation, moderator-not-publisher restriction, publisher fail-closed, D1 CAS, unpublish and anonymous reader.
- Record actual SHA and terminal/browser logs, not an assumed CI pass.

## Separate Learn app source gates
The Learn feature branch documents `npm run check` and `npm run build` in **`chuchiajui/Norelyn-learn`**, plus staging Worker/D1 migration and actual browser tests. These tests do not currently run through this public content repository. Applying D1 migration `0006` or `0007`, changing `LEARN_PUBLIC_*` flags, deploying Workers/Pages or enabling GitHub permissions requires explicit separate owner approval.

## Proposed automation milestones
1. Check only public-safe manifest, file completeness, MIME/size and schema; a new standalone validator may eventually be added to this repo.
2. Use a staging public repository and sanitized synthetic approved records; never use actual author drafts as tests.
3. Add separate Markdown/link/HTML-safety/lint checks and artifact consistency tests, but remember human licensing/privacy review cannot be automated away.
4. If CI is added, use read-only permissions; **never grant an unreviewed PR a publication token** or enable unattended production publishing.

## Required evidence
~~~text
Content repo ref/commit:
Learn app/API ref and environment:
Public content repo configured destination:
Approved server-export pair + digest (no private content logged):
Static validation result:
Human privacy/rights reviewer:
Owner publication intent:
Git pair commit SHA:
D1 published index result / anonymous read:
Unpublish/rollback test:
PASS / FAIL / NOT RUN:
~~~

[Handoff](HANDOFF.md), [Publication](PUBLICATION_WORKFLOW.md), [Operations](OPERATIONS.md).
