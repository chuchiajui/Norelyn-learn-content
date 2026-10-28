# Norelyn Learn Content — Source, Test and Publication Status

> 2026-10-28 · repository source inspection only. Docs branch is based on Draft PR #1's README foundation.

| Item | Observed state |
| --- | --- |
| Repository | `chuchiajui/Norelyn-learn-content` |
| Default main | `3f11c346d4057d29785a8e0f9150d3d1ce3b85a1` (2026-10-25) |
| Main file inventory | Exactly one `README.md` containing just a title |
| Open existing PR | Draft #1 `docs/readme-foundation-20261028` @ `7195d76804976de40b2a706c8878ef45fe126e44`; one README edit |
| Articles / courses / public manifests | **0** |
| Build scripts / validators | **None** |
| GitHub Actions workflows / CI | **None** |
| Publisher and reader in this repo | **None** |
| Confirmed destination for Learn Worker | **NOT VERIFIED** (requires actual `LEARN_PUBLIC_CONTENT_REPO`) |
| Actual Learn public publication | **NOT VERIFIED** in this documentation pass |

## Cross-repo source observations (not an activation claim)
The separate `chuchiajui/Norelyn-learn` branch `feat/learn-content-contracts-20261024` contains:
- D1-first private submission design (migration `0007`), author/admin routes and owner export.
- A proposed manual publication flow: export approved Markdown + manifest, owner uploads to public GitHub `main`, owner explicitly requests verified publication.
- Exact public file paths `articles/<articleId>/<revisionId>.md` and `.json`, frozen approved hash check, D1 publication index and feature gates.
- Older automated GitHub App publication classes as **historical/unmounted alternatives**, not the active manual-owner V1.
- Documentation dated 2026-10-25 says related source exists in Draft PR #25 and components of the D1-first submission system had been deployed at that time. This was **not independently rechecked** and does not establish current publication enablement.

## Not implemented here
No editing UI, CMS, D1 store, private-review repository, GitHub App, Pages content generator, job scheduler, indexing pipeline or article renderer. Do not add a misleading `npm test` or fake Release checklist claiming those features exist.

## Evidence required before calling it operational
Record public content repo configured name, actual live Learn Worker SHA and flags, publisher authorization, D1 migration state, staging test Git commit, exact file validation, D1 index transition, safe replay/unpublish, anonymous read results and operator approval.

[Handoff](HANDOFF.md) · [Publication workflow](PUBLICATION_WORKFLOW.md) · [Roadmap](CURRENT_ROADMAP.md).
