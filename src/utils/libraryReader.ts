import type {
  LibraryChapterBookmark,
  LibraryGrade,
  LibraryTextbook,
} from '../data/libraryBooksData';

export type LibraryClassFilter = 'all' | LibraryGrade;

export interface LibraryClassGroup {
  grade: LibraryGrade;
  label: string;
  books: LibraryTextbook[];
  availableCount: number;
  totalChapters: number;
}

export const MIN_READER_ZOOM = 0.6;
export const MAX_READER_ZOOM = 2.2;
export const READER_ZOOM_STEP = 0.15;

export function clampBookPage(page: number, totalPages: number): number {
  if (!Number.isFinite(totalPages) || totalPages <= 0) return 1;
  if (!Number.isFinite(page)) return 1;
  const rounded = Math.trunc(page);
  return Math.max(1, Math.min(totalPages, rounded));
}

export function clampReaderZoom(zoom: number): number {
  if (!Number.isFinite(zoom)) return 1;
  const clamped = Math.max(MIN_READER_ZOOM, Math.min(MAX_READER_ZOOM, zoom));
  return Math.round(clamped * 100) / 100;
}

export function stepReaderZoom(currentZoom: number, delta: number): number {
  return clampReaderZoom(currentZoom + delta);
}

export function formatZoomPercent(zoom: number): string {
  return `${Math.round(clampReaderZoom(zoom) * 100)}%`;
}

export function getReadingProgressPercent(
  page: number,
  totalPages: number
): number {
  if (!Number.isFinite(totalPages) || totalPages <= 0) return 0;
  const safePage = clampBookPage(page, totalPages);
  return Math.round((safePage / totalPages) * 100);
}

export function findActiveChapterBookmark(
  bookmarks: readonly LibraryChapterBookmark[],
  currentPage: number
): LibraryChapterBookmark | null {
  if (!bookmarks.length) return null;
  let active: LibraryChapterBookmark | null = null;
  for (const item of bookmarks) {
    if (item.pdfPage <= currentPage) {
      if (!active || item.pdfPage >= active.pdfPage) {
        active = item;
      }
    }
  }
  return active ?? bookmarks[0];
}

export function filterLibraryBooks(
  books: readonly LibraryTextbook[],
  gradeFilter: LibraryClassFilter,
  searchQuery = ''
): LibraryTextbook[] {
  const normalized = searchQuery.trim().toLowerCase();
  return books.filter((book) => {
    if (gradeFilter !== 'all' && book.grade !== gradeFilter) {
      return false;
    }
    if (!normalized) return true;
    const haystack = [
      `${book.grade}-sinf`,
      book.title,
      book.subtitle,
      book.authors,
      book.publisher,
      ...book.chapters.map((ch) => ch.title),
    ]
      .join(' ')
      .toLowerCase();
    return haystack.includes(normalized);
  });
}

export function groupLibraryBooksByClass(
  books: readonly LibraryTextbook[]
): LibraryClassGroup[] {
  const byGrade = new Map<LibraryGrade, LibraryTextbook[]>();
  for (const book of books) {
    const existing = byGrade.get(book.grade) ?? [];
    existing.push(book);
    byGrade.set(book.grade, existing);
  }

  return Array.from(byGrade.entries())
    .sort(([a], [b]) => a - b)
    .map(([grade, classBooks]) => ({
      grade,
      label: `${grade}-sinf`,
      books: classBooks,
      availableCount: classBooks.filter((b) => Boolean(b.pdfUrl)).length,
      totalChapters: classBooks.reduce(
        (sum, b) => sum + b.chapters.length,
        0
      ),
    }));
}

