# Norelyn Learn Content — Decisions, Proposals and Unresolved Questions

> 2026-10-28. This is a policy/architecture index, not a completed protocol or formal source-code implementation.

## Source-of-truth order
1. This repository's **actual files** and exact Git revision establish what is truly public here.
2. [Status](STATUS.md) for what is absent, provisional, implemented elsewhere or production-verified.
3. [Content contract](CONTENT_CONTRACT.md), [Publication](PUBLICATION_WORKFLOW.md), [Privacy](SECURITY_AND_LICENSING.md) document **proposed future integration**, not working code in this repo.
4. Separate `chuchiajui/Norelyn-learn` accepted source and active API/D1 configuration govern real submission/publication; its 2026-10-24 feature branch/PR #25 remains a **branch snapshot** to recheck, not an automatic contract adoption.
5. Earlier Learn design of private GitHub draft storage / auto GitHub publisher is historical and superseded by the later D1-first/manual owner plan.

## Established facts
- Public content repo currently has no articles or GitHub publishing automation.
- It is not appropriate to store private drafts or credentials in its Git history.
- A separate Learn feature branch defines immutable `art_*` and `rev_*`, exact Markdown/manifest pair, D1-approved source and owner-only manual publish verification.
- Public Git version and D1 serving authorization are distinct; the published index pins verified commit/revision.
- Only already-approved published content may be used for public reader or future AI/Knowledge retrieval.

## Decisions still required
1. Is `chuchiajui/Norelyn-learn-content` the designated `LEARN_PUBLIC_CONTENT_REPO`? Verify live value and permissions rather than assuming.
2. Should the exact public v1 manifest be adopted as the authoritative content-repo contract? Version together with the Learn reader.
3. Is the owner manual upload process final for V1, including any GitHub reviewers/branch protection?
4. What is the default license and attribution/derivative-media policy for authored educational content? No general content license exists here.
5. How to handle author consent, correction rights, unpublish requests and irreversible public Git retention?
6. Whether and when static Norelyn Site Learn pages migrate to the publication pipeline, and who owns canonical URL/SEO at transition?
7. If any future automatic publisher is needed, how to hold narrow tokens, sign commits, audit approvals, stop/retry and recover?
8. Which public metadata are privacy-safe long term, including stable source submission IDs and future author display names?
9. Which search/AI stores are allowed and what retention/tombstone guarantees they can achieve?

Use a dated ADR for changes: context, decision, alternatives, format migration, privacy/license impact, cross-repo consumers, tests, rollback, approver.
