import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { flattenGrade7Topics } from './grade7Curriculum';
import { GRADE_7_THEORY_CONTENT, type TheoryBlock } from './grade7TheoryContent';

const CYRILLIC_RE = /[\u0400-\u04FF]/;

function assertCleanString(value: string, context: string) {
  assert.ok(value.trim().length > 0, `${context} must not be empty`);
  assert.ok(!value.includes('\xad'), `${context} must not contain soft hyphens`);
  assert.ok(
    !CYRILLIC_RE.test(value),
    `${context} must not contain Cyrillic characters: ${value}`
  );
}

test('Grade 7 theory content keys match curriculum and blocks are clean and complete', () => {
  const validIds = new Set(flattenGrade7Topics().map((t) => t.id));

  for (const [topicId, blocks] of Object.entries(GRADE_7_THEORY_CONTENT)) {
    assert.ok(validIds.has(topicId), `Unknown topicId: ${topicId}`);
    assert.ok(blocks.length > 0, `${topicId} must have at least one block`);

    blocks.forEach((block: TheoryBlock, idx: number) => {
      const ctx = `${topicId}[${idx}] (${block.type})`;
      switch (block.type) {
        case 'sectionTitle':
        case 'paragraph':
        case 'definition':
          assertCleanString(block.text, ctx);
          break;
        case 'figure': {
          assertCleanString(block.caption, ctx);
          assert.ok(block.src.startsWith('/books/grade7/'), `${ctx} src path`);
          const diskPath = path.join(process.cwd(), 'public', block.src.slice(1));
          assert.ok(
            fs.existsSync(diskPath),
            `Figure asset missing on disk: ${diskPath}`
          );
          break;
        }
        case 'numberedList':
          if (block.intro) assertCleanString(block.intro, `${ctx}.intro`);
          assert.ok(block.items.length > 0, `${ctx} items non-empty`);
          block.items.forEach((item, j) => assertCleanString(item, `${ctx}[${j}]`));
          break;
        case 'keyTerms':
          assert.ok(block.terms.length > 0, `${ctx} terms non-empty`);
          block.terms.forEach((term, j) => assertCleanString(term, `${ctx}[${j}]`));
          break;
        case 'questions':
          assert.ok(block.items.length > 0, `${ctx} items non-empty`);
          block.items.forEach((item, j) => assertCleanString(item, `${ctx}[${j}]`));
          break;
        case 'example':
          if (block.title) assertCleanString(block.title, `${ctx}.title`);
          block.given.forEach((line, j) => assertCleanString(line, `${ctx}.given[${j}]`));
          block.find.forEach((line, j) => assertCleanString(line, `${ctx}.find[${j}]`));
          block.formula.forEach((line, j) => assertCleanString(line, `${ctx}.formula[${j}]`));
          block.solution.forEach((line, j) => assertCleanString(line, `${ctx}.solution[${j}]`));
          assertCleanString(block.answer, `${ctx}.answer`);
          break;
      }
    });
  }

  // Verify Topic 1 completeness specifically
  const m1 = GRADE_7_THEORY_CONTENT['mavzu-1'];
  assert.ok(m1, 'mavzu-1 must be defined');
  assert.deepEqual(
    m1.filter((b) => b.type === 'sectionTitle').map((b) => b.text),
    ['Mexanik harakat', 'Harakatning nisbiyligi', 'Sanoq jism', 'Sanoq sistemasi']
  );
  assert.equal(m1.filter((b) => b.type === 'definition').length, 4);
  assert.equal(m1.filter((b) => b.type === 'figure').length, 3);
  assert.equal(m1.filter((b) => b.type === 'numberedList').length, 1);
  assert.equal(m1.filter((b) => b.type === 'keyTerms').length, 1);
  assert.equal(m1.filter((b) => b.type === 'questions').length, 1);
});
