# Norelyn Learn Content — Operational Roadmap

> 2026-10-28. This repository contains no course/article implementation; all milestones below are **proposals or dependencies on separate Learn code**. No release date or automatic publication is implied.

## P0 — Define a safe first public article
| ID | Work | Exit gate |
| --- | --- | --- |
| LC-P0-01 | Confirm public destination and source authority | Actual Learn `LEARN_PUBLIC_CONTENT_REPO` value, repo ownership and review approval |
| LC-P0-02 | Freeze public format | Exact server-approved Markdown + manifest v1, immutable IDs and digest |
| LC-P0-03 | Prove privacy and content rights | Author permission, content/media licensing, no secret/private draft leakage |
| LC-P0-04 | Verify D1 approval and publisher authority | Immutable approved revision, unique publisher, CAS, feature-flag denial cases |
| LC-P0-05 | Stage manual upload + verification | Exact two files on Git staging main, verified commit, D1 index/read eligibility |
| LC-P0-06 | Prove rollback/unpublish | Reader and search refuse revoked revision, Git history limitations disclosed |
| LC-P0-07 | Establish validation and reviewer checklists | Reproducible tests, human rights/privacy signoff, no arbitrary GitHub App write |
| LC-P0-08 | Reconcile separate static Learn content | No conflicting canonical URLs, duplicate SEO/search or copied manuscripts |

## P1 — Content repository maintainability
- Introduce a documented, read-only public manifest validator and test corpus *after* frozen Learn consumer contract.
- Maintain correction/errata workflow with immutable revisions, review repeat and clear published-version changes.
- Add provenance, attribution and media handling with rights approvals; determine whether assets live in R2 or another service.
- Establish content category and stable slug/canonical link mapping via Learn, not by editing Git paths.
- Document support for imports from current static Learn pages after explicit ownership/SEO decisions.
- Establish availability and durability/backup evidence for the public Git revision and D1 indexed version pair.

## P2 — Later, conditional systems
- Safe optional automation or GitHub App only after a separate security review and verified rollback, not as a hidden prerequisite.
- Search/Knowledge/Agent indexing limited to current published approved revisions with per-source citations and unpublish tombstones.
- Translation, rich media, contributor attribution and external course imports with independent license/consent gates.
- Future release tags and semantic versioning for schema evolution without revealing private author/reviewer identity.

## Done definition
First real item requires complete reviewed source + public-safe export + owner-approved Git main commit + verified D1 published index + anonymous reader result + unpublish/recovery tests. Merely opening the repository or Draft PR is not completion.

[Status](STATUS.md), [Workflow](PUBLICATION_WORKFLOW.md), [Development/QA](DEVELOPMENT_AND_TESTING.md).
