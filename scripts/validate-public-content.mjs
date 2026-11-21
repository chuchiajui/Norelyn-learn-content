import { createHash } from 'node:crypto';
import { lstat, readdir, readFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const KEYS = ['schemaVersion', 'articleId', 'revisionId', 'sourceSubmissionId',
  'sourceContentRevision', 'sourceContentHash', 'title', 'summary', 'categoryId',
  'tags', 'youtubeVideoIds', 'approvedAt'];
const PATH = /^(art_[0-9a-f]{32})\/(rev_[0-9a-f]{32})\.(md|json)$/;
const PRIVACY = [
  ['email address', /[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9-]+(?:\.[A-Z0-9-]+)+/i],
  ['private user ID', /\busr_[A-Za-z0-9_]+/],
  ['GitHub token', /\b(?:gh[pousr]_[A-Za-z0-9_]+|github_pat_[A-Za-z0-9_]+)/],
  ['JWT', /\beyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/],
  ['signed URL parameter', /[?&](?:x-amz-(?:signature|credential|security-token)|x-goog-(?:signature|credential)|sig|signature|token|access_token)=/i],
  ['private filesystem path', /(?:\/(?:home|Users|root|tmp|private|var|etc)\/|(?<![A-Z0-9])[A-Z]:[\\/]|\\\\[A-Za-z0-9_.-]+\\)/i],
  ['forbidden private field', /\b(?:authorUserId|reviewerUserId|reviewerNotes|moderationComments)\b/]
];

function privacy(text, report) {
  for (const [label, pattern] of PRIVACY) {
    if (label === 'email address' && !text.includes('@')) continue;
    if (pattern.test(text)) report(`privacy: ${label}`);
  }
}

function manifestPrivacy(value, report) {
  if (typeof value === 'string') privacy(value, report);
  else if (Array.isArray(value)) {
    for (const item of value) manifestPrivacy(item, report);
  } else if (value && typeof value === 'object') {
    for (const [key, item] of Object.entries(value)) {
      privacy(key, report);
      manifestPrivacy(item, report);
    }
  }
}

export function validatePair(markdown, rawManifest, articleId, revisionId, report) {
  if (markdown.length > 100_000 || !markdown.trim()) report('markdown must be nonblank and at most 100000 UTF-16 code units');
  if (rawManifest.length > 20_000) report('manifest exceeds 20000 UTF-16 code units');
  privacy(markdown, report);
  let row;
  try { row = JSON.parse(rawManifest); } catch { report('invalid manifest JSON'); return; }
  if (!row || typeof row !== 'object' || Array.isArray(row)) {
    report('manifest must be an object'); return;
  }
  manifestPrivacy(row, report);
  if (Object.keys(row).length !== KEYS.length || KEYS.some((key) => !Object.hasOwn(row, key))) report('manifest must contain exactly the public v1 keys');
  const string = (v, max) => typeof v === 'string' && v.length <= max;
  const strings = (v, max, check) => Array.isArray(v) && v.length <= max && v.every(check);
  const valid = row.schemaVersion === 1 && row.articleId === articleId &&
    row.revisionId === revisionId &&
    row.sourceSubmissionId === articleId.replace(/^art_/, 'sub_') &&
    Number.isSafeInteger(row.sourceContentRevision) && row.sourceContentRevision >= 1 &&
    typeof row.sourceContentHash === 'string' && /^[0-9a-f]{64}$/.test(row.sourceContentHash) &&
    revisionId === 'rev_' + row.sourceContentHash.slice(0, 32) &&
    string(row.title, 200) && !!row.title.trim() && string(row.summary, 1200) &&
    (row.categoryId === null || (typeof row.categoryId === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(row.categoryId))) &&
    strings(row.tags, 12, (v) => string(v, 40)) &&
    strings(row.youtubeVideoIds, 8, (v) => typeof v === 'string' && /^[A-Za-z0-9_-]{11}$/.test(v)) &&
    string(row.approvedAt, 40) && Number.isFinite(Date.parse(row.approvedAt));
  if (!valid) { report('invalid manifest field type, limit, identity, or revision/hash relationship'); return; }
  const content = { title: row.title, summary: row.summary, bodyMarkdown: markdown,
    categoryId: row.categoryId, tags: row.tags, youtubeVideoIds: row.youtubeVideoIds };
  const digest = createHash('sha256').update(JSON.stringify(content), 'utf8').digest('hex');
  if (digest !== row.sourceContentHash) report('sourceContentHash does not match canonical public content');
}

export async function validateDirectory(root) {
  if (root instanceof URL) root = fileURLToPath(root);
  const errors = [];
  const files = new Map();
  const report = (path, message) => errors.push(`${path}: ${message}`);
  async function walk(directory, relative = '') {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const name = relative ? `${relative}/${entry.name}` : entry.name;
      if (entry.isDirectory()) {
        if (!relative && /^art_[0-9a-f]{32}$/.test(entry.name)) await walk(join(directory, entry.name), name);
        else report(name, 'unexpected directory');
      } else if (!entry.isFile() || !PATH.test(name)) report(name, 'unexpected path or non-regular file');
      else files.set(name, join(directory, entry.name));
    }
  }
  try {
    let stat;
    try { stat = await lstat(root); } catch (error) { if (error.code === 'ENOENT') return errors; throw error; }
    if (!stat.isDirectory() || stat.isSymbolicLink()) { report('articles', 'must be a real directory'); return errors; }
    await walk(root);
    const decoded = new Map();
    for (const [name, path] of files) {
      try {
        const bytes = await readFile(path);
        if (bytes.length > 400_000) { report(name, 'file exceeds 400000 bytes'); continue; }
        decoded.set(name, new TextDecoder('utf-8', { fatal: true }).decode(bytes));
      } catch { report(name, 'cannot read valid UTF-8'); }
      const other = name.replace(/\.(md|json)$/, name.endsWith('.md') ? '.json' : '.md');
      if (!files.has(other)) report(name, 'missing paired ' + other);
    }
    for (const [name, markdown] of decoded) {
      if (!name.endsWith('.md')) continue;
      const manifestName = name.replace(/\.md$/, '.json');
      if (!decoded.has(manifestName)) continue;
      const [, articleId, revisionId] = PATH.exec(name);
      validatePair(markdown, decoded.get(manifestName), articleId, revisionId,
        (message) => report(`${name} + ${manifestName}`, message));
    }
  } catch (error) { report('articles', `cannot inspect directory (${error.code ?? 'error'})`); }
  return errors;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '../articles');
  const errors = await validateDirectory(root);
  if (errors.length) {
    for (const error of errors) console.error(error);
    process.exitCode = 1;
  } else console.log('Public content validation passed (absent/empty articles is allowed).');
}
