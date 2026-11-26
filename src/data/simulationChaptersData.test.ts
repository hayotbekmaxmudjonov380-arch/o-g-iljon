import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getSimulationChapterById,
  SIMULATION_CHAPTERS,
} from './simulationChaptersData';

test('simulation section contains exact 6 physics chapters I–VI in order', () => {
  assert.equal(SIMULATION_CHAPTERS.length, 6);
  assert.deepEqual(
    SIMULATION_CHAPTERS.map((c) => c.roman),
    ['I', 'II', 'III', 'IV', 'V', 'VI']
  );
  assert.equal(
    SIMULATION_CHAPTERS[0].title,
    'Modda tuzilishining molekulyar-kinetik nazariyasi asoslari'
  );
  assert.equal(SIMULATION_CHAPTERS[0].sectionRange, '1-§ – 14-§');
  assert.equal(
    SIMULATION_CHAPTERS[5].title,
    'Geliotexnika va olamning yagona fizik manzarasi'
  );
  assert.equal(SIMULATION_CHAPTERS[5].sectionRange, '57-§ – 59-§');
});

test('each chapter contains 3 distinct 3D scenarios with valid parameter defaults', () => {
  const seenIds = new Set<string>();
  for (const chapter of SIMULATION_CHAPTERS) {
    assert.equal(chapter.scenarios.length, 3);
    chapter.scenarios.forEach((sc, idx) => {
      assert.equal(sc.index, idx + 1);
      assert.ok(!seenIds.has(sc.id), `Duplicate scenario id: ${sc.id}`);
      seenIds.add(sc.id);
      assert.ok(sc.paramA.defaultValue >= sc.paramA.min && sc.paramA.defaultValue <= sc.paramA.max);
      assert.ok(sc.paramB.defaultValue >= sc.paramB.min && sc.paramB.defaultValue <= sc.paramB.max);
      assert.ok(sc.formula.length > 0);
    });
  }
  assert.equal(seenIds.size, 18);
});

test('getSimulationChapterById resolves valid chapters and returns undefined for null', () => {
  assert.equal(getSimulationChapterById(null), undefined);
  assert.equal(getSimulationChapterById('sim-bob-3')?.roman, 'III');
  assert.equal(getSimulationChapterById('unknown'), undefined);
});
