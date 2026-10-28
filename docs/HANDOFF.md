# Norelyn Learn Content — Maintainer Handoff

> Audited 2026-10-28. Repository baseline `docs/readme-foundation-20261028@7195d76804976de40b2a706c8878ef45fe126e44` (Draft PR #1). The actual default `main@3f11c346d4057d29785a8e0f9150d3d1ce3b85a1` contains only `README.md` with a single title.

## What this repository is
A **public repository reserved for approved Norelyn Learn knowledge/learning content**. It is *not yet populated*. It does not contain articles, importers, format validators, GitHub Actions, deployment settings, authentication or operational publishing code.

Its purpose is to hold an audited, versioned public content artifact. It is **not** the authoring/review backend and must never store unapproved submissions.

## Adjacent systems and ownership
| System | Data / authority | Status relevant to this repository |
| --- | --- | --- |
| `chuchiajui/Norelyn-learn-content` | Future approved public Markdown + exact metadata at Git commits | **Empty skeleton; not configured as verified publication target** |
| `chuchiajui/Norelyn-learn` | Learn frontend/API; private submissions in D1 and owner publication logic | D1-first work in unmerged feature branch; rollout state must be rechecked |
| Norelyn ID | Server-verified `usr_*` principal | Separate login/auth service |
| Learn public index in D1 | Current published-revision allowlist | Separate migration + feature gate, not part of this repo |
| Norelyn public site | Public static Learn marketing/lesson HTML | Separate source and indexing; no automatic sync guaranteed |

## Branch and design drift
- Default content repo `main`: only one-line README.
- Content repo Draft PR #1: initial README foundation: public/private boundary and gaps; **no files to publish**.
- Learn feature branch `feat/learn-content-contracts-20261024`: earlier GitHub-private submission architecture is superseded by **D1-first** private submissions. Latest owner-only V1 assumes **manual GitHub upload** of the exact approved pair, followed by a separate verified owner publish action. Source exists on Draft PR #25, but this docs pass did not verify deployment.

## P0 next actions
1. Determine explicitly whether this public repo is the configured `LEARN_PUBLIC_CONTENT_REPO`. Do not infer from its name.
2. Verify current Learn Worker, D1 backup/migrations, server-only publisher allowlist and publishing/read feature flags. **Read-only checks first**.
3. Agree on exact source-generated file pair and human privacy/licensing acceptance.
4. Build a test-only approved D1 submission in a separate staging environment. Export and upload its exact files to a designated **staging** public test repo (not live content).
5. Verify Git main SHA, Markdown/manifest equality and D1 published index transition using the currently reviewed Learn code; test conflict, unpublish, replay/rollback.
6. Establish actual content publication and takedown runbooks before first live entry.

## Documentation map
[Status](STATUS.md) · [Content contract](CONTENT_CONTRACT.md) · [Review and publication](PUBLICATION_WORKFLOW.md) · [Security/licensing](SECURITY_AND_LICENSING.md) · [Sync and indexing](SYNC_AND_INDEXING.md) · [Development and QA](DEVELOPMENT_AND_TESTING.md) · [Operations](OPERATIONS.md) · [Roadmap](CURRENT_ROADMAP.md) · [Decisions](DECISIONS.md).

## Evidence limits
No content, operational tests, Git writes of articles, D1 access, production publication, preview fetches or deployed configuration were performed in this docs pass. A design based on the separate Learn feature branch is **not** proof that this public repo can publish anything today.
