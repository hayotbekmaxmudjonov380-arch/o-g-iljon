import test from 'node:test';
import assert from 'node:assert/strict';
import {
  GRADE_7_CURRICULUM,
  flattenGrade7Topics,
} from './grade7Curriculum';

test('Grade 7 curriculum preserves exact 3 parts, 7 chapters, and 46 sequential paragraphs plus intro and appendices', () => {
  assert.equal(GRADE_7_CURRICULUM.intro.title, 'Kirish');
  assert.equal(GRADE_7_CURRICULUM.parts.length, 3);

  const allChapters = GRADE_7_CURRICULUM.parts.flatMap((p) => p.chapters);
  assert.equal(allChapters.length, 7);

  const paragraphTopics = allChapters.flatMap((c) => c.topics);
  assert.equal(paragraphTopics.length, 46);

  paragraphTopics.forEach((topic, idx) => {
    const expectedPrefix = `${idx + 1}-§.`;
    assert.ok(
      topic.title.startsWith(expectedPrefix),
      `Expected "${topic.title}" to start with "${expectedPrefix}"`
    );
  });

  assert.equal(GRADE_7_CURRICULUM.appendices.length, 3);

  const flattened = flattenGrade7Topics();
  assert.equal(flattened.length, 50);
  const uniqueIds = new Set(flattened.map((t) => t.id));
  assert.equal(uniqueIds.size, 50);
});
