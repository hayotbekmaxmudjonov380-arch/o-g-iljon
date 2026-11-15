import test from 'node:test';
import assert from 'node:assert/strict';
import {
  GRADE_11_CURRICULUM,
  flattenGrade11Topics,
} from './grade11Curriculum';

test('grade 11 curriculum preserves Kirish, I-VII bob, 1-mavzu..45-mavzu, and bibliography', () => {
  assert.equal(GRADE_11_CURRICULUM.intro.title, 'Kirish');
  assert.equal(GRADE_11_CURRICULUM.chapters.length, 7);
  assert.deepEqual(
    GRADE_11_CURRICULUM.chapters.map((c) => c.title),
    [
      'I bob. MAGNIT MAYDON',
      'II bob. ELEKTROMAGNIT INDUKSIYA',
      'III bob. ELEKTROMAGNIT TEBRANISHLAR',
      'IV bob. ELEKTROMAGNIT TO‘LQINLAR VA TO‘LQIN OPTIKASI',
      'V bob. NISBIYLIK NAZARIYASI',
      'VI bob. KVANT FIZIKASI',
      'VII bob. ATOM VA YADRO FIZIKASI. ATOM ENERGETIKASINING FIZIK ASOSLARI',
    ]
  );

  const allTopics = flattenGrade11Topics();
  // Kirish + 45 mavzu + 1 appendix = 47
  assert.equal(allTopics.length, 47);

  const numberedTopics = allTopics.filter((t) => /^\d+-mavzu\./.test(t.title));
  assert.equal(numberedTopics.length, 45);

  numberedTopics.forEach((topic, index) => {
    const expectedPrefix = `${index + 1}-mavzu.`;
    assert.ok(
      topic.title.startsWith(expectedPrefix),
      `Expected "${topic.title}" to start with "${expectedPrefix}"`
    );
  });

  assert.equal(
    GRADE_11_CURRICULUM.appendices[0].title,
    'FOYDALANILGAN ADABIYOTLAR'
  );

  const ids = new Set(allTopics.map((t) => t.id));
  assert.equal(ids.size, allTopics.length);
});
