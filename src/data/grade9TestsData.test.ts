import test from 'node:test';
import assert from 'node:assert/strict';
import { GRADE_9_TEST_CHAPTERS } from './grade9TestsData';

test('grade 9 tests contain 6 chapters, 59 topics, and 590 verified questions', () => {
  assert.equal(GRADE_9_TEST_CHAPTERS.length, 6);

  const topics = GRADE_9_TEST_CHAPTERS.flatMap((ch) => ch.topics);
  assert.equal(topics.length, 59);

  let totalQuestions = 0;
  topics.forEach((topic, idx) => {
    const expectedNum = idx + 1;
    assert.equal(topic.sectionNumber, expectedNum);
    assert.ok(
      topic.title.startsWith(`${expectedNum}-§. `),
      `Topic "${topic.title}" should start with "${expectedNum}-§. "`
    );
    assert.equal(topic.questions.length, 10);

    topic.questions.forEach((q, qIdx) => {
      assert.equal(q.id, qIdx + 1);
      assert.ok(q.question.length > 0);
      assert.ok(['A', 'B', 'C', 'D'].includes(q.correctAnswer));
      (['A', 'B', 'C', 'D'] as const).forEach((key) => {
        assert.ok(
          q.options[key].length > 0,
          `Missing option ${key} in topic ${expectedNum}, question ${q.id}`
        );
      });
      totalQuestions += 1;
    });
  });

  assert.equal(totalQuestions, 590);
});

test('grade 9 tests match exact spot-checked questions and keys from docx', () => {
  const ch1 = GRADE_9_TEST_CHAPTERS[0];
  const t1 = ch1.topics[0];
  assert.equal(
    t1.title,
    '1-§. Modda tuzilishining molekulyar-kinetik nazariyasi'
  );
  assert.equal(
    t1.questions[0].question,
    'Molekulyar-kinetik nazariya (MKN) nimani o‘rganadi?'
  );
  assert.equal(t1.questions[0].correctAnswer, 'B');
  assert.equal(t1.questions[9].correctAnswer, 'B');

  const t3 = ch1.topics[2];
  assert.ok(
    t3.questions[5].options.D.includes('Nₐ'),
    'Expected Nₐ subscript formatting to be preserved'
  );

  const ch6 = GRADE_9_TEST_CHAPTERS[5];
  const t59 = ch6.topics[ch6.topics.length - 1];
  assert.equal(
    t59.title,
    '59-§. Fizika va texnika taraqqiyoti. O‘zbekistonda fizika sohasidagi tadqiqotlar'
  );
  assert.equal(t59.questions[0].correctAnswer, 'C');
  assert.equal(t59.questions[9].correctAnswer, 'A');
});
