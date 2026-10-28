# Norelyn Learn Content — Public Data, Privacy and License Policy

> 2026-10-28. **No public article content is present here**, so no article-level license grant, media permission or contributor release can be assumed.

## Public Git is irreversible in normal use
A public commit, pull request, issue attachment or generated preview can be cloned, cached or indexed. Deleting a file in a later commit is not erasure of its old bytes. Never push private drafts or personal identifiers here, even briefly. Do not publish student work, medical/financial records, school identifiers, course/private exam materials or editorial notes without a documented lawful basis and specific consent where required.

### Publication allowlist
Only server-approved export with exact public Markdown/manifest fields may enter `articles/`. Submission ownership and moderation records remain in Learn's private D1. Review public Markdown for embedded links, quoted private text and identifying anecdotes **in addition to** the manifest.

### Licenses and attribution — decision pending
- This repository currently **does not declare a general content license**. Being publicly readable does not mean the content is CC BY, CC0 or free for reuse/training.
- Before the first article, decide a clear content license and rights/attribution/withdrawal policy; record who owns a submitted work and whether derivative media are permitted.
- Don't add a blanket `LICENSE` or assert rights on behalf of all authors without explicit authorization.
- Track external image, code snippet, chart, quotation and video rights individually, with source links, attribution and license compatibility. Copyrighted books/media may not be republished merely because someone submitted them.
- Approved YouTube IDs refer to offsite content; do not copy/embed arbitrary video files or bypass video platform policy.

### Untrusted Markdown
Markdown can carry unsafe HTML, scripts, embedded iframes and deceptive links. Public ingestion must sanitize/escape content and restrict URL protocols; the Learn reader must not trust repository content as HTML or execution instructions. Index/search/AI retrieval of public text must treat it as untrusted and never turn it into system/tool instructions.

### Secret and metadata scan
Reject OAuth tokens, GitHub App credentials, Worker secrets, URLs with signed query tokens, private filesystem paths, author/reviewer `usr_*` IDs, email addresses, moderation comments and accidental exported D1 JSON. Audit both current diff and public history when a leak is reported.

### Removal and response
If a harmful item is discovered: disable D1 public index and caches first, then coordinate GitHub/crawlers/CDN remediation and affected people. Do not claim `git rm` or force push cures all copies. For actual incidents preserve a private, access-controlled record without reposting the content.

[Publication flow](PUBLICATION_WORKFLOW.md), [Operations](OPERATIONS.md), [Decisions](DECISIONS.md).
