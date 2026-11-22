import test from 'node:test';
import assert from 'node:assert/strict';
import { GRADE_7_THEORY_CONTENT, type TheoryBlock } from '../data/grade7TheoryContent';
import { buildTheoryLayout } from './theoryLayout';

test('buildTheoryLayout pairs Topic 1 figures with their accompanying text blocks', () => {
  const layout = buildTheoryLayout(GRADE_7_THEORY_CONTENT['mavzu-1']);
  const asideItems = layout.filter((item) => item.kind === 'asideFigure');

  assert.equal(asideItems.length, 3);

  // 2-rasm pairs with [paragraph 1, paragraph 2, definition]
  assert.equal(asideItems[0].figureEntry.block.src, '/books/grade7/rasm-2.png');
  assert.deepEqual(
    asideItems[0].textEntries.map((e) => e.block.type),
    ['paragraph', 'paragraph', 'definition']
  );

  // 3-rasm pairs only with the paragraph describing 3-rasm, stopping at the earlier definition
  assert.equal(asideItems[1].figureEntry.block.src, '/books/grade7/rasm-3.png');
  assert.deepEqual(
    asideItems[1].textEntries.map((e) => e.block.type),
    ['paragraph']
  );

  // 4-rasm pairs with the first paragraph under Sanoq sistemasi
  assert.equal(asideItems[2].figureEntry.block.src, '/books/grade7/rasm-4.png');
  assert.deepEqual(
    asideItems[2].textEntries.map((e) => e.block.type),
    ['paragraph']
  );
});

test('buildTheoryLayout keeps center-placed or heading-only figures standalone', () => {
  const sample: TheoryBlock[] = [
    { type: 'sectionTitle', text: 'Bolim' },
    {
      type: 'figure',
      src: '/books/grade7/rasm-2.png',
      caption: '2-rasm. Namuna',
    },
    { type: 'paragraph', text: 'Matn.' },
    {
      type: 'figure',
      src: '/books/grade7/rasm-3.png',
      caption: '3-rasm. Markaziy',
      placement: 'center',
    },
  ];

  const layout = buildTheoryLayout(sample);
  assert.equal(layout.length, 4);
  assert.ok(layout.every((item) => item.kind === 'block'));
});
