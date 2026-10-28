# Norelyn Learn Content — Publication, Index and Reader Boundaries

> 2026-10-28 **design reference**, based on separate Learn feature branch. No sync or index job exists **in this public repo** today.

## Authority matrix

| Item | Authoritative system | Projection |
| --- | --- | --- |
| Private draft, owner, reviewer, approval | Learn D1 `learn_submission_records` | Authenticated Learn UI |
| Approved frozen content/hash | Learn D1 review snapshot | Owner-safe exported pair |
| Public Markdown/manifest bytes and commit history | Designated public GitHub repository (if configured) | Git commit SHA-pinned reader |
| Anonymous serving permission | Learn D1 `learn_publication_index` | Knowledge list/article page |
| Search/Explore UI | Verified published-only metadata | Rebuilt search/list cache |
| Future AI retrieval | Currently published revision/commit, separately filtered | Optional lexical/vector index |

Committing a pair to public Git is **not** the same thing as approval, D1 index registration or a Pages deployment. Deleting a public file also cannot rewind Git history.

## Current proposed V1 sequence
Owner uploads the two exact approved files to chosen public repository main → clicks Learn's explicit verify/publication action → Learn reads current Git `main`, confirms SHA and exact Markdown/manifest equals D1 approved snapshot → CAS-updates D1 publication state/index → reader pins that commit/revision. No site-level publish in this repository, no automatic schedule and no browser-provided arbitrary path.

The public repo must not serve private drafts or be used as a collection of all D1 submissions. Reader access should be filtered by the published index even if other Git files happen to exist.

## What synchronization would need later
1. A chosen destination `owner/repo` confirmed from server-only Learn configuration.
2. Versioned event identity `articleId + revisionId + commitSha`, idempotent retries and provenance.
3. Search/article index consumers that reject unpublished/withdrawn revisions, including after cache replication lag.
4. A plan for existing static Learn articles hosted in the **separate Norelyn Site / Learn source**: single writer/authority, canonical routes, migration without duplicated search results.
5. Content update/withdrawal semantics, future revisions without overwriting prior approved artifacts and explicit D1 visibility change.
6. Rollback, CDN/SEO revalidation and security review for any future automated GitHub publisher.

## Future AI policy
Only approved, currently published text may be indexed; attach source article/revision/commit for citations and invalidate tombstones. The content is **untrusted**, not system instructions. An AI index cannot become a hidden way to reveal an unpublished item or ignore takedown.

This is a proposed contract, **not active integration or evidence of production site indexing**.

[Publication](PUBLICATION_WORKFLOW.md), [Content contract](CONTENT_CONTRACT.md), [Status](STATUS.md).
