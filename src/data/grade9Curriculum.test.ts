import test from 'node:test';
import assert from 'node:assert/strict';
import {
  GRADE_9_CURRICULUM,
  flattenGrade9Topics,
} from './grade9Curriculum';

test('grade 9 curriculum preserves exact order of part, 4 chapters, and 1-§..43-§ + chapter reviews', () => {
  assert.equal(GRADE_9_CURRICULUM.parts.length, 1);
  assert.equal(
    GRADE_9_CURRICULUM.parts[0].title,
    'MOLEKULYAR FIZIKA VA TERMODINAMIKA ASOSLARI'
  );

  const chapters = GRADE_9_CURRICULUM.parts[0].chapters;
  assert.equal(chapters.length, 4);
  assert.deepEqual(
    chapters.map((c) => c.title),
    [
      'I BOB MODDA TUZILISHINING MOLEKULYAR-KINETIK NAZARIYASI ASOSLARI',
      'II BOB ICHKI ENERGIYA VA TERMODINAMIKA ELEMENTLARI',
      'III BOB ISSIQLIK DVIGATELLARI',
      'IV BOB SUYUQLIK VA QATTIQ JISMLARNING XOSSALARI',
    ]
  );

  const allTopics = flattenGrade9Topics();
  // 43 § paragraphs + 8 chapter review items (2 per chapter) = 51 items
  assert.equal(allTopics.length, 51);

  const paragraphTopics = allTopics.filter((t) => /^\d+-§\./.test(t.title));
  assert.equal(paragraphTopics.length, 43);

  paragraphTopics.forEach((topic, index) => {
    const expectedPrefix = `${index + 1}-§.`;
    assert.ok(
      topic.title.startsWith(expectedPrefix),
      `Expected "${topic.title}" to start with "${expectedPrefix}"`
    );
  });

  chapters.forEach((chapter) => {
    const lastTwo = chapter.topics.slice(-2);
    assert.ok(lastTwo[0].title.includes('takrorlash uchun test topshiriqlari'));
    assert.ok(lastTwo[1].title.includes('yuzasidan muhim xulosalar'));
  });

  const ids = new Set(allTopics.map((t) => t.id));
  assert.equal(ids.size, allTopics.length);
});
