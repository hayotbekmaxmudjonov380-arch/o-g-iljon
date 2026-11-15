import test from 'node:test';
import assert from 'node:assert/strict';
import {
  GRADE_10_CURRICULUM,
  flattenGrade10Topics,
} from './grade10Curriculum';

test('grade 10 curriculum preserves MEXANIKA, I-IX bob, 1-mavzu..45-mavzu, chapter reviews, and bibliography', () => {
  assert.equal(GRADE_10_CURRICULUM.chapters.length, 10);
  assert.deepEqual(
    GRADE_10_CURRICULUM.chapters.map((c) => c.title),
    [
      'MEXANIKA',
      'I bob. KINEMATIKA',
      'II bob. DINAMIKA',
      'III bob. MEXANIKADA SAQLANISH QONUNLARI',
      'IV bob. STATIKA VA GIDRODINAMIKA',
      'V bob. MEXANIK TEBRANISHLAR VA TO‘LQINLAR',
      'VI bob. TERMODINAMIKA ASOSLARI',
      'VII bob. ELEKTRODINAMIKA',
      'VIII bob. O‘ZGARMAS TOK QONUNLARI',
      'IX bob. TURLI MUHITLARDA ELEKTR TOKI',
    ]
  );

  const allTopics = flattenGrade10Topics();
  // 45 mavzu + 18 chapter reviews (I..IX bob) + 1 appendix = 64
  assert.equal(allTopics.length, 64);

  const numberedTopics = allTopics.filter((t) => /^\d+-mavzu\./.test(t.title));
  assert.equal(numberedTopics.length, 45);

  numberedTopics.forEach((topic, index) => {
    const expectedPrefix = `${index + 1}-mavzu.`;
    assert.ok(
      topic.title.startsWith(expectedPrefix),
      `Expected "${topic.title}" to start with "${expectedPrefix}"`
    );
  });

  GRADE_10_CURRICULUM.chapters.slice(1).forEach((chapter) => {
    const lastTwo = chapter.topics.slice(-2);
    assert.ok(lastTwo[0].title.includes('yakunlash yuzasidan test savollari'));
    assert.ok(
      lastTwo[1].title.includes('eng muhim tushuncha, qoida va qonunlar')
    );
  });

  assert.equal(
    GRADE_10_CURRICULUM.appendices[0].title,
    'FOYDALANILGAN ADABIYOTLAR'
  );

  const ids = new Set(allTopics.map((t) => t.id));
  assert.equal(ids.size, allTopics.length);
});
