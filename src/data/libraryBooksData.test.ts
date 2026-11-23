import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  getLibraryBookByGrade,
  LIBRARY_BOOKS,
  LIBRARY_GRADES,
} from './libraryBooksData';

const PUBLIC_DIR = path.resolve(process.cwd(), 'public');

test('library covers all 5 school grades in order (7-11)', () => {
  assert.deepEqual(LIBRARY_GRADES, [7, 8, 9, 10, 11]);
  assert.deepEqual(
    LIBRARY_BOOKS.map((b) => b.grade),
    [7, 8, 9, 10, 11]
  );
});

test('uploaded grade 7, 10, 11 textbooks reference existing public PDFs and valid chapter pages', () => {
  for (const grade of [7, 10, 11] as const) {
    const book = getLibraryBookByGrade(grade);
    assert.ok(book, `${grade}-sinf kitobi topilishi kerak`);
    assert.ok(book.pdfUrl, `${grade}-sinf PDF manzili bo‘lishi kerak`);
    assert.ok(
      book.pageCount && book.pageCount > 0,
      `${grade}-sinf sahifalar soni musbat bo‘lishi kerak`
    );

    const diskPdf = path.join(PUBLIC_DIR, book.pdfUrl.replace(/^\//, ''));
    assert.equal(
      fs.existsSync(diskPdf),
      true,
      `Public PDF mavjud bo‘lishi kerak: ${diskPdf}`
    );

    if (book.coverImageUrl) {
      const diskCover = path.join(
        PUBLIC_DIR,
        book.coverImageUrl.replace(/^\//, '')
      );
      assert.equal(
        fs.existsSync(diskCover),
        true,
        `Public muqova rasmi mavjud bo‘lishi kerak: ${diskCover}`
      );
    }

    assert.ok(
      book.chapters.length >= 7,
      `${grade}-sinf boblar ro‘yxati bo‘lishi kerak`
    );
    for (const ch of book.chapters) {
      assert.ok(
        ch.pdfPage >= 1 && ch.pdfPage <= book.pageCount,
        `${grade}-sinf ${ch.title} sahifa raqami diapazondan tashqarida: ${ch.pdfPage}`
      );
    }
  }
});

test('grades 8 and 9 honestly report unavailable PDF files', () => {
  for (const grade of [8, 9] as const) {
    const book = getLibraryBookByGrade(grade);
    assert.ok(book);
    assert.equal(book.pdfUrl, null);
    assert.equal(book.chapters.length, 0);
  }
});
