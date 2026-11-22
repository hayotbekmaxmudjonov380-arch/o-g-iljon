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

  // Verify Topic 2 completeness
  const m2 = GRADE_7_THEORY_CONTENT['mavzu-2'];
  assert.ok(m2, 'mavzu-2 must be defined');
  assert.deepEqual(
    m2.filter((b) => b.type === 'sectionTitle').map((b) => b.text),
    [
      'Fazoning cheksizligi',
      'Fazoni uch o‘lchamli koordinatalarda tasvirlash',
      'Vaqtni bir o‘lchamli koordinatalarda tasvirlash',
    ]
  );
  assert.equal(m2.filter((b) => b.type === 'example').length, 1);
  assert.equal(m2.filter((b) => b.type === 'definition').length, 2);
  assert.equal(m2.filter((b) => b.type === 'figure').length, 4);
  assert.equal(m2.filter((b) => b.type === 'keyTerms').length, 1);
  assert.equal(m2.filter((b) => b.type === 'questions').length, 1);

  // Verify Topic 3 completeness
  const m3 = GRADE_7_THEORY_CONTENT['mavzu-3'];
  assert.ok(m3, 'mavzu-3 must be defined');
  assert.deepEqual(
    m3.filter((b) => b.type === 'sectionTitle').map((b) => b.text),
    [
      'Moddiy nuqta',
      'Trayektoriya',
      'Yo‘l va ko‘chish',
      'Mexanik harakat',
      'Ilgarilanma harakat',
    ]
  );
  assert.equal(m3.filter((b) => b.type === 'definition').length, 6);
  assert.equal(m3.filter((b) => b.type === 'figure').length, 5);
  assert.equal(m3.filter((b) => b.type === 'keyTerms').length, 1);
  assert.equal(m3.filter((b) => b.type === 'questions').length, 1);

  // Verify Topic 4 completeness
  const m4 = GRADE_7_THEORY_CONTENT['mavzu-4'];
  assert.ok(m4, 'mavzu-4 must be defined');
  assert.deepEqual(
    m4.filter((b) => b.type === 'sectionTitle').map((b) => b.text),
    [
      'Skalyar kattaliklar',
      'Vektor kattaliklar',
      'Vektor kattaliklarni qo‘shish va ayirish',
      'Vektor kattaliklarni songa ko‘paytirish va bo‘lish',
      'Vektor kattaliklarning proyeksiyasi',
    ]
  );
  assert.equal(m4.filter((b) => b.type === 'definition').length, 7);
  assert.equal(m4.filter((b) => b.type === 'figure').length, 10);
  assert.equal(m4.filter((b) => b.type === 'keyTerms').length, 1);
  assert.equal(m4.filter((b) => b.type === 'questions').length, 2);
});
