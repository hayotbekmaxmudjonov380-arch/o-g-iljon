import { useMemo, useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Download,
  Library,
  Search,
  X,
} from 'lucide-react';
import {
  getLibraryBookByGrade,
  LIBRARY_BOOKS,
  LIBRARY_GRADES,
  type LibraryGrade,
  type LibraryTextbook,
} from '../data/libraryBooksData';
import {
  filterLibraryBooks,
  groupLibraryBooksByClass,
  type LibraryClassFilter,
} from '../utils/libraryReader';
import PdfBookReader from './PdfBookReader';

const LAST_PAGE_STORAGE_KEY = 'fizlab_library_last_pages_v1';

interface LibraryViewProps {
  selectedGrade?: LibraryGrade | null;
  onSelectGrade?: (grade: LibraryGrade | null) => void;
  onBackToSections?: () => void;
}

function readSavedPagesMap(): Record<string, number> {
  try {
    const raw = localStorage.getItem(LAST_PAGE_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, number>) : {};
  } catch {
    return {};
  }
}

function TextbookCoverThumbnail({ book }: { book: LibraryTextbook }) {
  const [imgFailed, setImgFailed] = useState(false);

  if (book.coverImageUrl && !imgFailed) {
    return (
      <div className="w-[74px] sm:w-[86px] aspect-[3/4] rounded-xl overflow-hidden shrink-0 border border-slate-900/12 dark:border-white/15 bg-slate-100 dark:bg-slate-900 shadow-sm">
        <img
          src={book.coverImageUrl}
          alt={book.coverAlt}
          referrerPolicy="no-referrer"
          onError={() => setImgFailed(true)}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`w-[74px] sm:w-[86px] aspect-[3/4] rounded-xl overflow-hidden shrink-0 border border-white/25 p-2.5 flex flex-col justify-between text-white shadow-sm ${
        book.pdfUrl ? '' : 'opacity-70 saturate-50'
      }`}
      style={{ background: book.accentGradient }}
      aria-hidden="true"
    >
      <div className="flex items-center justify-between text-[10px] font-semibold tracking-wide opacity-90">
        <span>FIZIKA</span>
        <span className="font-mono-tabular">{book.grade}</span>
      </div>
      <div className="space-y-0.5">
        <div className="font-display text-xl font-bold leading-none font-mono-tabular">
          {book.grade}
        </div>
        <div className="text-[10px] opacity-90 leading-tight">sinf</div>
      </div>
    </div>
  );
}

export default function LibraryView({
  selectedGrade: controlledGrade,
  onSelectGrade,
  onBackToSections,
}: LibraryViewProps) {
  const [internalGrade, setInternalGrade] = useState<LibraryGrade | null>(null);
  const [activeClassFilter, setActiveClassFilter] =
    useState<LibraryClassFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedChaptersGrade, setExpandedChaptersGrade] =
    useState<LibraryGrade | null>(null);
  const [readerInitialPage, setReaderInitialPage] = useState<
    number | undefined
  >(undefined);

  const activeGrade =
    controlledGrade !== undefined ? controlledGrade : internalGrade;

  const setActiveGrade = (grade: LibraryGrade | null, page?: number) => {
    setReaderInitialPage(page);
    if (onSelectGrade) {
      onSelectGrade(grade);
    } else {
      setInternalGrade(grade);
    }
  };

  const selectedBook = getLibraryBookByGrade(activeGrade);

  const filteredBooks = useMemo(
    () => filterLibraryBooks(LIBRARY_BOOKS, activeClassFilter, searchQuery),
    [activeClassFilter, searchQuery]
  );
  const classGroups = useMemo(
    () => groupLibraryBooksByClass(filteredBooks),
    [filteredBooks]
  );

  // 1. Active Textbook PDF Reader (Grades 7, 10, 11)
  if (selectedBook && selectedBook.pdfUrl) {
    return (
      <PdfBookReader
        key={`${selectedBook.grade}-${readerInitialPage ?? 'resume'}`}
        book={selectedBook}
        initialPage={readerInitialPage}
        onBack={() => setActiveGrade(null)}
      />
    );
  }

  // 2. Empty / Not Uploaded State for Grades without PDF (Grades 8, 9)
  if (selectedBook && !selectedBook.pdfUrl) {
    return (
      <div className="fizlab-quiz-scope w-full max-w-[880px] mx-auto my-auto py-2 space-y-4">
        <div className="fizlab-neo-card">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <span className="fizlab-neo-icon font-display font-bold text-sm">
                {selectedBook.grade}
              </span>
              <h2 className="fizlab-neo-heading">
                {selectedBook.grade}-sinf · Kutubxona
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setActiveGrade(null)}
              className="fizlab-neo-btn !w-auto !m-0 !px-4 !py-2 text-xs inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <ArrowLeft size={14} aria-hidden="true" />
              <span>Orqaga</span>
            </button>
          </div>

          <div
            className="fizlab-neo-well min-h-[300px] flex flex-col items-center justify-center text-center p-6 space-y-2.5"
            aria-label={`${selectedBook.grade}-sinf darslik holati`}
          >
            <BookOpen
              size={30}
              className="text-sky-600 dark:text-sky-400"
              aria-hidden="true"
            />
            <h3 className="font-display text-base font-bold text-slate-900 dark:text-slate-100">
              {selectedBook.grade}-sinf elektron darsligi hali yuklanmagan
            </h3>
            <p className="max-w-md text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Hozircha 7-sinf, 10-sinf va 11-sinf darsliklari kutubxonaga
              joylashtirilgan. {selectedBook.grade}-sinf PDF fayli yuklanishi
              bilan shu bo‘limda o‘qish va yuklab olish mumkin bo‘ladi.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 3. Categorized Library View Organized by Classes
  const savedPages = readSavedPagesMap();
  const readyCount = LIBRARY_BOOKS.filter((b) => Boolean(b.pdfUrl)).length;

  return (
    <div className="fizlab-quiz-scope w-full max-w-[940px] mx-auto my-auto py-2 space-y-4">
      {/* Top Library Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-3 min-w-0">
          <span className="fizlab-neo-icon shrink-0">
            <Library size={16} strokeWidth={2} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <h2 className="fizlab-neo-heading">
              Kutubxona · Elektron darsliklar
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-mono-tabular">
              {LIBRARY_GRADES.length} ta sinf toifasi · {readyCount} ta tayyor
              PDF darslik
            </p>
          </div>
        </div>

        {onBackToSections && (
          <button
            type="button"
            onClick={onBackToSections}
            className="fizlab-neo-btn !w-auto !m-0 !px-4 !py-2 text-xs inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            <span>Orqaga</span>
          </button>
        )}
      </div>

      {/* Class Category Tabs + Search Bar */}
      <div className="fizlab-neo-card space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Interactive Class Filter Tabs */}
          <div
            role="group"
            aria-label="Sinflar bo‘yicha toifalash"
            className="fizlab-lib-tab-bar"
          >
            <button
              type="button"
              aria-pressed={activeClassFilter === 'all'}
              onClick={() => setActiveClassFilter('all')}
              className="fizlab-lib-tab"
            >
              Barcha sinflar
            </button>

            {LIBRARY_GRADES.map((grade) => {
              const selected = activeClassFilter === grade;
              return (
                <button
                  key={grade}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActiveClassFilter(grade)}
                  className="fizlab-lib-tab font-mono-tabular"
                >
                  {grade}-sinf
                </button>
              );
            })}
          </div>

          {/* Textbook / Chapter Search */}
          <div className="relative w-full md:w-64 shrink-0">
            <label htmlFor="library-search-input" className="sr-only">
              Darslik yoki bob nomi bo‘yicha qidirish
            </label>
            <Search
              size={14}
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400"
            />
            <input
              id="library-search-input"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Darslik yoki bob qidirish..."
              className="fizlab-lib-search"
            />
            {searchQuery && (
              <button
                type="button"
                aria-label="Qidiruvni tozalash"
                onClick={() => setSearchQuery('')}
                className="fizlab-lib-clear-btn"
              >
                <X size={13} aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Categorized Sections Organized by Class */}
      {classGroups.length === 0 ? (
        <div className="fizlab-neo-card !p-8 text-center space-y-2.5">
          <BookOpen
            size={28}
            className="mx-auto text-sky-600 dark:text-sky-400"
            aria-hidden="true"
          />
          <h3 className="font-display text-base font-bold text-slate-900 dark:text-slate-100">
            Mos darslik yoki bob topilmadi
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Qidiruv so‘zini o‘zgartiring yoki barcha sinflarni tanlang.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveClassFilter('all');
              setSearchQuery('');
            }}
            className="fizlab-lib-btn mx-auto"
          >
            Filtrlarni tiklash
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {classGroups.map((group) => (
            <section
              key={group.grade}
              aria-labelledby={`library-class-heading-${group.grade}`}
              className="fizlab-neo-card space-y-3"
            >
              {/* Class Category Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-900/10 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <span className="fizlab-neo-icon font-display font-bold text-sm">
                    {group.grade}
                  </span>
                  <h3
                    id={`library-class-heading-${group.grade}`}
                    className="fizlab-neo-heading"
                  >
                    {group.label} fizika darsliklari
                  </h3>
                </div>

                <div className="text-xs font-mono-tabular text-slate-600 dark:text-slate-400">
                  {group.availableCount > 0
                    ? `${group.availableCount} ta darslik · ${group.totalChapters} ta bob`
                    : 'PDF fayli hali yuklanmagan'}
                </div>
              </div>

              {/* Textbooks inside this Class Category */}
              <div className="space-y-3">
                {group.books.map((book) => {
                  const isAvailable = Boolean(book.pdfUrl);
                  const lastPage = savedPages[String(book.grade)];
                  const chaptersExpanded =
                    expandedChaptersGrade === book.grade;

                  return (
                    <article
                      key={book.grade}
                      className="fizlab-neo-well !p-3.5 sm:!p-4 space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-stretch gap-3.5">
                        <TextbookCoverThumbnail book={book} />

                        <div className="flex-1 min-w-0 flex flex-col justify-between gap-2">
                          <div className="space-y-1">
                            <h4 className="font-display text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">
                              {book.title}
                            </h4>
                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                              {book.subtitle}
                            </p>
                            <div className="text-xs text-slate-600 dark:text-slate-400">
                              {isAvailable
                                ? `${book.authors}${
                                    book.year ? ` · ${book.year}` : ''
                                  }`
                                : 'PDF darslik fayli hali yuklanmagan'}
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
                            <div className="text-xs font-mono-tabular text-slate-500 dark:text-slate-400">
                              {isAvailable
                                ? `${book.pageCount} sahifa · ${book.fileSizeLabel} · ${book.language}`
                                : 'Fayl kutilmoqda'}
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                              {isAvailable ? (
                                <>
                                  {book.chapters.length > 0 && (
                                    <button
                                      type="button"
                                      aria-expanded={chaptersExpanded}
                                      onClick={() =>
                                        setExpandedChaptersGrade((prev) =>
                                          prev === book.grade
                                            ? null
                                            : book.grade
                                        )
                                      }
                                      className="fizlab-lib-btn"
                                    >
                                      <span>
                                        Boblar ({book.chapters.length})
                                      </span>
                                      {chaptersExpanded ? (
                                        <ChevronUp
                                          size={14}
                                          aria-hidden="true"
                                        />
                                      ) : (
                                        <ChevronDown
                                          size={14}
                                          aria-hidden="true"
                                        />
                                      )}
                                    </button>
                                  )}

                                  {book.pdfUrl && (
                                    <a
                                      href={book.pdfUrl}
                                      download={
                                        book.downloadFileName ?? undefined
                                      }
                                      className="fizlab-lib-btn"
                                    >
                                      <Download size={14} aria-hidden="true" />
                                      <span>Yuklab olish</span>
                                    </a>
                                  )}

                                  <button
                                    type="button"
                                    onClick={() => setActiveGrade(book.grade)}
                                    className="fizlab-neo-btn !w-auto !m-0 !px-3.5 !py-2 text-xs inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
                                  >
                                    <span>
                                      {lastPage && lastPage > 1
                                        ? `Davom ettirish (${lastPage}-sahifa)`
                                        : 'Darslikni ochish'}
                                    </span>
                                    <ChevronRight
                                      size={14}
                                      aria-hidden="true"
                                    />
                                  </button>
                                </>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => setActiveGrade(book.grade)}
                                  className="fizlab-lib-btn"
                                >
                                  <span>Batafsil</span>
                                  <ChevronRight size={14} aria-hidden="true" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Expandable Mundarija Chapter Quick-Jump List */}
                      {isAvailable &&
                        chaptersExpanded &&
                        book.chapters.length > 0 && (
                          <div className="pt-2.5 border-t border-slate-900/10 dark:border-white/10">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                              {book.chapters.map((chapter) => (
                                <button
                                  key={chapter.id}
                                  type="button"
                                  onClick={() =>
                                    setActiveGrade(book.grade, chapter.pdfPage)
                                  }
                                  className="fizlab-neo-topic-row !py-2 !px-3"
                                >
                                  <span className="truncate text-xs">
                                    {chapter.title}
                                  </span>
                                  <span className="text-[11px] font-mono-tabular text-sky-700 dark:text-sky-300 shrink-0">
                                    {chapter.pdfPage}-sahifa
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
