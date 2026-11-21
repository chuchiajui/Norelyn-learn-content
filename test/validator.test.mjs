import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { test } from 'node:test';
import { cp, mkdtemp, mkdir, readFile, readdir, rm, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { validateDirectory, validatePair } from '../scripts/validate-public-content.mjs';

const fixture = new URL('./fixtures/articles/', import.meta.url);
const article = (await readdir(fixture))[0];
const directory = new URL(article + '/', fixture);
const manifestName = (await readdir(directory)).find((name) => name.endsWith('.json'));
const revision = manifestName.slice(0, -5);
const manifest = JSON.parse(await readFile(new URL(manifestName, directory), 'utf8'));
const markdown = await readFile(new URL(revision + '.md', directory), 'utf8');
function errors(row = manifest, body = markdown, id = revision) {
  const found = [];
  validatePair(body, typeof row === 'string' ? row : JSON.stringify(row, null, 2), article, id, (e) => found.push(e));
  return found;
}
function validErrors(summary, body = markdown) {
  const content = { title: manifest.title, summary, bodyMarkdown: body,
    categoryId: manifest.categoryId, tags: manifest.tags, youtubeVideoIds: manifest.youtubeVideoIds };
  const sourceContentHash = createHash('sha256').update(JSON.stringify(content)).digest('hex');
  const revisionId = 'rev_' + sourceContentHash.slice(0, 32);
  return errors({ ...manifest, summary, sourceContentHash, revisionId }, body, revisionId);
}
async function tree(t, copy = true) {
  const root = await mkdtemp(join(tmpdir(), 'synthetic-content-test-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const target = join(root, 'articles');
  if (copy) await cp(fixture, target, { recursive: true });
  return target;
}

test('Learn-generated synthetic pair is accepted', async () => {
  assert.deepEqual(await validateDirectory(fixture), []);
  assert.deepEqual(errors(), []);
});
test('noncanonical manifests cannot hide overwritten private values', () => {
  const canonical = JSON.stringify(manifest, null, 2);
  const duplicate = canonical.replace('{', '{\n  "summary": "usr_abc123 secret",');
  assert.deepEqual(JSON.parse(duplicate), manifest);
  for (const raw of [duplicate, canonical + '\n', JSON.stringify(manifest)]) {
    assert.ok(errors(raw).some((e) => e.startsWith('manifest must use Learn export JSON serialization')));
  }
});
test('absent and empty articles directories pass', async (t) => {
  const root = await tree(t, false);
  assert.deepEqual(await validateDirectory(root), []);
  await mkdir(root);
  assert.deepEqual(await validateDirectory(root), []);
});
test('extra/missing keys, field types, limits, and identities fail', () => {
  const variants = [null, [], {}, { ...manifest, extra: true },
    ...Object.keys(manifest).map((key) => ({ ...manifest, [key]: undefined })),
    ...Object.keys(manifest).map((key) => ({ ...manifest, [key]: {} })),
    { ...manifest, title: ' ' }, { ...manifest, title: 'a'.repeat(201) },
    { ...manifest, summary: 'a'.repeat(1201) },
    { ...manifest, tags: Array(13).fill('x') }, { ...manifest, tags: ['x'.repeat(41)] },
    { ...manifest, youtubeVideoIds: Array(9).fill('SYNTHETIC01') },
    { ...manifest, youtubeVideoIds: ['bad'] }, { ...manifest, categoryId: 'Bad_category' },
    { ...manifest, approvedAt: 'invalid' }, { ...manifest, approvedAt: ' '.repeat(41) },
    { ...manifest, sourceContentRevision: 0 }, { ...manifest, sourceContentRevision: 1.5 },
    { ...manifest, sourceContentHash: 'f'.repeat(64) },
    { ...manifest, sourceSubmissionId: 'sub_' + '1'.repeat(32) },
    { ...manifest, articleId: 'art_' + '1'.repeat(32) }];
  for (const row of variants) assert.ok(errors(row).length, JSON.stringify(row));
  assert.ok(errors('{').length);
  assert.ok(errors(' '.repeat(20001)).length);
  assert.ok(errors(manifest, markdown, 'rev_' + 'f'.repeat(32)).length);
});
test('byte changes and empty/oversized markdown fail', () => {
  for (const body of [markdown + 'x', markdown.replaceAll('\n', '\r\n'), '', ' ', 'x'.repeat(100001)]) {
    assert.ok(errors(manifest, body).length);
  }
});
test('privacy rules scan body and decoded manifest, without printing sensitive matches', () => {
  for (const text of ['synthetic@example.invalid', 'usr_synthetic', 'ghp_synthetic',
    'github_pat_synthetic', 'eyJsynthetic.payload.signature',
    'https://example.invalid/?X-Amz-Signature=synthetic',
    'https://example.invalid/?sig=synthetic', '/home/synthetic/file',
    'C:\\Users\\synthetic\\file', 'authorUserId', 'reviewerUserId']) {
    assert.ok(errors(manifest, text).some((e) => e.startsWith('privacy:')));
    assert.ok(errors({ ...manifest, summary: text }).some((e) => e.startsWith('privacy:')));
  }
  const escaped = JSON.stringify({ ...manifest, summary: 'usr_synthetic' }).replace('usr_', '\\u0075sr_');
  assert.ok(errors(escaped).some((e) => e.startsWith('privacy:')));
});
test('drive paths reject private paths without rejecting URLs or escaped prose', () => {
  assert.deepEqual(validErrors(manifest.summary, 'https://example.com/page'), []);
  assert.deepEqual(validErrors('Note:\nnext'), []);
  for (const path of ['C:\\Users\\alice', 'D:/data']) {
    assert.ok(validErrors(manifest.summary, path).includes('privacy: private filesystem path'));
  }
});
test('decoded manifest keys and string values are scanned individually and recursively', () => {
  for (const summary of ['first\nusr_abc123', 'first\nreach me at a@b.co']) {
    assert.ok(validErrors(summary).some((e) => e.startsWith('privacy:')));
  }
  for (const extra of [
    { nested: [{ value: 'first\nusr_abc123' }] },
    { nested: [{ 'usr_abc123': null }] },
    { nested: ['first\nreach me at a@b.co'] }
  ]) {
    assert.ok(errors({ ...manifest, extra }).some((e) => e.startsWith('privacy:')));
  }
  const escaped = JSON.stringify({ ...manifest, summary: 'first\nusr_abc123' })
    .replace('usr_', '\\u0075sr_');
  assert.ok(errors(escaped).includes('privacy: private user ID'));
  assert.deepEqual(validErrors(''), []);
  assert.deepEqual(validErrors('Note:\nnext'), []);
});
test('orphans, unexpected paths, symlinks, malformed UTF-8, and oversized files fail', async (t) => {
  for (const mode of ['orphan', 'path', 'directory', 'symlink', 'utf8', 'size', 'root-symlink', 'root-file']) {
    await t.test(mode, async (t) => {
      const root = await tree(t);
      const path = join(root, article, revision + '.md');
      if (mode === 'orphan') await rm(path);
      if (mode === 'path') await writeFile(join(root, 'unexpected.txt'), 'synthetic');
      if (mode === 'directory') await mkdir(join(root, 'unexpected'));
      if (mode === 'symlink') { await rm(path); await symlink('/nonexistent-synthetic', path); }
      if (mode === 'utf8') await writeFile(path, Buffer.from([0xc3, 0x28]));
      if (mode === 'size') await writeFile(path, Buffer.alloc(400001, 97));
      if (mode.startsWith('root-')) {
        await rm(root, { recursive: true });
        if (mode === 'root-file') await writeFile(root, 'synthetic');
        else await symlink(fixture, root);
      }
      assert.ok((await validateDirectory(root)).length);
    });
  }
});
