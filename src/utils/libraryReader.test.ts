import test from 'node:test';
import assert from 'node:assert/strict';
import { LIBRARY_BOOKS } from '../data/libraryBooksData';
import {
  clampBookPage,
  clampReaderZoom,
  filterLibraryBooks,
  findActiveChapterBookmark,
  formatZoomPercent,
  getReadingProgressPercent,
  groupLibraryBooksByClass,
  MAX_READER_ZOOM,
  MIN_READER_ZOOM,
  stepReaderZoom,
} from './libraryReader';

test('clampBookPage keeps page numbers within valid bounds', () => {
  assert.equal(clampBookPage(0, 170), 1);
  assert.equal(clampBookPage(-12, 170), 1);
  assert.equal(clampBookPage(25, 170), 25);
  assert.equal(clampBookPage(999, 170), 170);
  assert.equal(clampBookPage(4.9, 170), 4);
  assert.equal(clampBookPage(Number.NaN, 170), 1);
  assert.equal(clampBookPage(5, 0), 1);
});

test('zoom helpers enforce bounds and format percentages cleanly', () => {
  assert.equal(clampReaderZoom(0.1), MIN_READER_ZOOM);
  assert.equal(clampReaderZoom(5.0), MAX_READER_ZOOM);
  assert.equal(clampReaderZoom(1.25), 1.25);
  assert.equal(stepReaderZoom(1.0, 0.15), 1.15);
  assert.equal(stepReaderZoom(0.6, -0.5), MIN_READER_ZOOM);
  assert.equal(formatZoomPercent(1.15), '115%');
});

test('getReadingProgressPercent calculates rounded percentage', () => {
  assert.equal(getReadingProgressPercent(1, 100), 1);
  assert.equal(getReadingProgressPercent(50, 100), 50);
  assert.equal(getReadingProgressPercent(170, 170), 100);
  assert.equal(getReadingProgressPercent(5, 0), 0);
});

test('findActiveChapterBookmark resolves the latest chapter starting at or before current page', () => {
  const bookmarks = [
    { id: 'c1', title: 'I bob', pdfPage: 1 },
    { id: 'c2', title: 'II bob', pdfPage: 19 },
    { id: 'c3', title: 'III bob', pdfPage: 49 },
  ];
  assert.equal(findActiveChapterBookmark(bookmarks, 1)?.id, 'c1');
  assert.equal(findActiveChapterBookmark(bookmarks, 18)?.id, 'c1');
  assert.equal(findActiveChapterBookmark(bookmarks, 19)?.id, 'c2');
  assert.equal(findActiveChapterBookmark(bookmarks, 75)?.id, 'c3');
  assert.equal(findActiveChapterBookmark([], 10), null);
});

test('filterLibraryBooks filters by class grade and chapter/title search query', () => {
  const allBooks = filterLibraryBooks(LIBRARY_BOOKS, 'all', '');
  assert.equal(allBooks.length, 5);

  const grade10 = filterLibraryBooks(LIBRARY_BOOKS, 10, '');
  assert.deepEqual(
    grade10.map((b) => b.grade),
    [10]
  );

  const relativityMatches = filterLibraryBooks(
    LIBRARY_BOOKS,
    'all',
    'Nisbiylik'
  );
  assert.deepEqual(
    relativityMatches.map((b) => b.grade),
    [11]
  );

  const noMatches = filterLibraryBooks(LIBRARY_BOOKS, 7, 'Kvant fizikasi');
  assert.equal(noMatches.length, 0);
});

test('groupLibraryBooksByClass organizes textbooks in ascending class order with accurate counts', () => {
  const groups = groupLibraryBooksByClass(LIBRARY_BOOKS);
  assert.deepEqual(
    groups.map((g) => g.label),
    ['7-sinf', '8-sinf', '9-sinf', '10-sinf', '11-sinf']
  );
  assert.equal(groups[0].availableCount, 1);
  assert.equal(groups[1].availableCount, 0);
  assert.equal(groups[3].availableCount, 1);
  assert.ok(groups[4].totalChapters >= 8);
});

