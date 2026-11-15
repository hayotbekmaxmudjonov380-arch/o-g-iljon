import test from 'node:test';
import assert from 'node:assert/strict';
import {
  GRADE_8_CURRICULUM,
  flattenGrade8Topics,
} from './grade8Curriculum';

test('Grade 8 curriculum preserves 5 chapters, 60 sequential paragraphs, chapter reviews, intro, and answer key', () => {
  assert.equal(GRADE_8_CURRICULUM.intro.title, 'Kirish');
  assert.equal(GRADE_8_CURRICULUM.chapters.length, 5);

  const paragraphTopics = GRADE_8_CURRICULUM.chapters.flatMap((c) =>
    c.topics.filter((t) => /^\d+-§\./.test(t.title))
  );
  assert.equal(paragraphTopics.length, 60);

  paragraphTopics.forEach((topic, idx) => {
    const expectedPrefix = `${idx + 1}-§.`;
    assert.ok(
      topic.title.startsWith(expectedPrefix),
      `Expected "${topic.title}" to start with "${expectedPrefix}"`
    );
  });

  // Each chapter ends with its test & summary items
  GRADE_8_CURRICULUM.chapters.forEach((chapter) => {
    const lastTwo = chapter.topics.slice(-2);
    assert.ok(lastTwo[0].title.includes('takrorlash uchun test topshiriqlari'));
    assert.ok(lastTwo[1].title.includes('yuzasidan muhim xulosalar'));
  });

  assert.equal(GRADE_8_CURRICULUM.appendices.length, 1);
  assert.equal(
    GRADE_8_CURRICULUM.appendices[0].title,
    'Mashqlarning javoblari'
  );

  const flattened = flattenGrade8Topics();
  assert.equal(flattened.length, 72);
  const uniqueIds = new Set(flattened.map((t) => t.id));
  assert.equal(uniqueIds.size, 72);
});
